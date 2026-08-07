const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;

function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function createCDPSession(wsUrl) {
  const ws = new globalThis.WebSocket(wsUrl);
  let id = 1;
  const callbacks = new Map();
  const eventListeners = new Map();

  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.id && callbacks.has(data.id)) {
      const { resolve, reject } = callbacks.get(data.id);
      callbacks.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    } else if (data.method) {
      const listeners = eventListeners.get(data.method) || [];
      listeners.forEach(l => l(data.params));
    }
  });

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const currentId = id++;
      callbacks.set(currentId, { resolve, reject });
      ws.send(JSON.stringify({ id: currentId, method, params }));
    });
  }

  function on(method, cb) {
    if (!eventListeners.has(method)) eventListeners.set(method, []);
    eventListeners.get(method).push(cb);
  }

  const ready = new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve);
    ws.addEventListener('error', reject);
  });

  return { ws, send, on, ready, close: () => ws.close() };
}

async function profilePage(wsDebuggerUrl, pagePath) {
  console.log(`\n======================================================`);
  console.log(`PROFILING PAGE: http://localhost:3005${pagePath}`);
  console.log(`======================================================`);

  const browserSession = createCDPSession(wsDebuggerUrl);
  await browserSession.ready;

  // Create a new target / tab
  const { targetId } = await browserSession.send('Target.createTarget', { url: 'about:blank' });
  const pageWsUrl = `ws://localhost:${PORT}/devtools/page/${targetId}`;
  
  const pageSession = createCDPSession(pageWsUrl);
  await pageSession.ready;

  await pageSession.send('Page.enable');
  await pageSession.send('Profiler.enable');
  await pageSession.send('Performance.enable');

  // Navigate to page
  console.log(`Navigating to http://localhost:3005${pagePath} ...`);
  await pageSession.send('Page.navigate', { url: `http://localhost:3005${pagePath}` });

  // Wait 3 seconds for initial load and hydration to settle
  await delay(3000);

  // Start 10-second CPU profiling
  console.log(`Starting 10-second idle CPU Profiler recording...`);
  await pageSession.send('Profiler.start');
  
  await delay(10000);

  console.log(`Stopping CPU profile...`);
  const { profile } = await pageSession.send('Profiler.stop');

  // Calculate self time for each function node
  const nodes = profile.nodes;
  const samples = profile.samples || [];
  const timeDeltas = profile.timeDeltas || [];

  const selfTimes = new Map();
  let totalSampleTime = 0;

  for (let i = 0; i < samples.length; i++) {
    const nodeId = samples[i];
    const delta = timeDeltas[i] || 0;
    selfTimes.set(nodeId, (selfTimes.get(nodeId) || 0) + delta);
    totalSampleTime += delta;
  }

  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // Aggregate results by function name + url
  const aggregated = new Map();
  for (const [nodeId, timeUs] of selfTimes.entries()) {
    const node = nodeMap.get(nodeId);
    if (!node) continue;
    const name = node.callFrame.functionName || '(anonymous)';
    const url = node.callFrame.url || '';
    const line = node.callFrame.lineNumber;
    const col = node.callFrame.columnNumber;
    const key = `${name} @ ${url}:${line}:${col}`;

    if (!aggregated.has(key)) {
      aggregated.set(key, {
        name,
        url,
        line,
        col,
        timeMs: 0
      });
    }
    aggregated.get(key).timeMs += (timeUs / 1000);
  }

  const sorted = Array.from(aggregated.values()).sort((a, b) => b.timeMs - a.timeMs);

  let idleTime = 0;
  let programTime = 0;
  let gcTime = 0;
  let jsTime = 0;

  sorted.forEach(item => {
    if (item.name === '(idle)') idleTime += item.timeMs;
    else if (item.name === '(program)') programTime += item.timeMs;
    else if (item.name === '(garbage collector)') gcTime += item.timeMs;
    else jsTime += item.timeMs;
  });

  const totalRecordedMs = totalSampleTime / 1000;

  console.log(`\n--- Summary for ${pagePath} (10s window) ---`);
  console.log(`Total Recorded: ${totalRecordedMs.toFixed(2)} ms`);
  console.log(`Idle Time:      ${idleTime.toFixed(2)} ms (${((idleTime/totalRecordedMs)*100).toFixed(1)}%)`);
  console.log(`Program Time:   ${programTime.toFixed(2)} ms (${((programTime/totalRecordedMs)*100).toFixed(1)}%)`);
  console.log(`GC Time:        ${gcTime.toFixed(2)} ms (${((gcTime/totalRecordedMs)*100).toFixed(1)}%)`);
  console.log(`Active JS Time: ${jsTime.toFixed(2)} ms (${((jsTime/totalRecordedMs)*100).toFixed(1)}%)`);

  console.log(`\nTop 15 Functions by Self Time:`);
  sorted.slice(0, 15).forEach((item, idx) => {
    const shortUrl = item.url ? item.url.split('/').slice(-2).join('/') : 'internal';
    console.log(`${idx + 1}. [${item.timeMs.toFixed(2)} ms] ${item.name} @ ${shortUrl}:${item.line}`);
  });

  // Clean up tab
  await pageSession.send('Target.closeTarget', { targetId });
  pageSession.close();
  browserSession.close();

  return {
    pagePath,
    totalRecordedMs,
    idleTime,
    programTime,
    gcTime,
    jsTime,
    topFunctions: sorted.slice(0, 15)
  };
}

async function main() {
  console.log('Spawning Chrome...');
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--user-data-dir=' + path.join(process.cwd(), '.chrome-profile-test')
  ]);

  await delay(2000);

  const versionInfo = await getJson(`http://localhost:${PORT}/json/version`);
  const wsDebuggerUrl = versionInfo.webSocketDebuggerUrl;

  const pages = ['/en', '/en/about', '/en/projects', '/en/contact'];
  const allResults = [];

  for (const p of pages) {
    try {
      const res = await profilePage(wsDebuggerUrl, p);
      allResults.push(res);
    } catch (e) {
      console.error(`Error profiling ${p}:`, e);
    }
  }

  fs.writeFileSync('multipage_profile_results.json', JSON.stringify(allResults, null, 2));
  console.log('\nAll results saved to multipage_profile_results.json');

  chromeProc.kill();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
