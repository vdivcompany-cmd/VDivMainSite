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

async function profileHydration(wsDebuggerUrl, cpuThrottleRate = 4) {
  console.log(`\n======================================================`);
  console.log(`PROFILING HYDRATION: http://localhost:3005/en (CPU Throttling: ${cpuThrottleRate}x)`);
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
  
  if (cpuThrottleRate > 1) {
    await pageSession.send('Emulation.setCPUThrottlingRate', { rate: cpuThrottleRate });
  }

  // Set precise sampling interval (100 microseconds = 0.1ms for high accuracy)
  await pageSession.send('Profiler.setSamplingInterval', { interval: 100 });

  console.log(`Starting CPU Profiler BEFORE navigation...`);
  await pageSession.send('Profiler.start');

  const navStart = Date.now();
  console.log(`Navigating to http://localhost:3005/en ...`);
  await pageSession.send('Page.navigate', { url: 'http://localhost:3005/en' });

  // Record for 4.5 seconds to cover navigation, HTML parse, JS evaluation, and full hydration
  await delay(4500);

  console.log(`Stopping CPU profile...`);
  const { profile } = await pageSession.send('Profiler.stop');

  // Close tab
  await pageSession.send('Page.close');
  pageSession.close();
  browserSession.close();

  // Process CPU Profile
  const samples = profile.samples || [];
  const timeDeltas = profile.timeDeltas || [];
  const nodes = profile.nodes || [];
  const nodeMap = new Map();
  nodes.forEach(n => nodeMap.set(n.id, n));

  let totalDuration = 0;
  timeDeltas.forEach(td => totalDuration += td);

  const functionSelfTime = new Map();
  const chunkSelfTime = new Map();
  let idleTime = 0;
  let programTime = 0;
  let gcTime = 0;

  // Track Long Tasks (> 50ms continuous non-idle execution)
  const longTasks = [];
  let currentTask = null;

  for (let i = 0; i < samples.length; i++) {
    const nodeId = samples[i];
    const deltaMs = (timeDeltas[i] || 0) / 1000;
    const node = nodeMap.get(nodeId);
    if (!node) continue;

    const fnName = node.callFrame.functionName || '(anonymous)';
    const url = node.callFrame.url || '';
    const scriptId = node.callFrame.scriptId;
    const line = node.callFrame.lineNumber;
    const key = `${fnName} @ ${url ? path.basename(url) : 'internal'}:${line}`;

    const isIdle = fnName === '(idle)' || fnName === '(root)';
    const isProgram = fnName === '(program)';
    const isGC = fnName === '(garbage collector)';

    if (isIdle) {
      idleTime += deltaMs;
      if (currentTask) {
        if (currentTask.duration >= 50) {
          longTasks.push(currentTask);
        }
        currentTask = null;
      }
    } else {
      if (isProgram) programTime += deltaMs;
      else if (isGC) gcTime += deltaMs;
      else {
        functionSelfTime.set(key, (functionSelfTime.get(key) || 0) + deltaMs);
        const chunkKey = url ? path.basename(url) : 'inline/eval';
        chunkSelfTime.set(chunkKey, (chunkSelfTime.get(chunkKey) || 0) + deltaMs);
      }

      if (!currentTask) {
        currentTask = {
          startTime: (timeDeltas.slice(0, i).reduce((a, b) => a + b, 0)) / 1000,
          duration: deltaMs,
          samples: [key],
          fnBreakdown: new Map([[key, deltaMs]])
        };
      } else {
        currentTask.duration += deltaMs;
        currentTask.samples.push(key);
        currentTask.fnBreakdown.set(key, (currentTask.fnBreakdown.get(key) || 0) + deltaMs);
      }
    }
  }

  if (currentTask && currentTask.duration >= 50) {
    longTasks.push(currentTask);
  }

  const totalMs = totalDuration / 1000;
  const activeJsMs = totalMs - idleTime - programTime - gcTime;

  // Calculate Total Blocking Time (TBT)
  let totalBlockingTime = 0;
  longTasks.forEach(t => {
    totalBlockingTime += (t.duration - 50);
  });

  console.log(`\n------------------------------------------------------`);
  console.log(`--- HYDRATION SUMMARY (CPU Throttle: ${cpuThrottleRate}x, Window: ${(totalMs/1000).toFixed(2)}s) ---`);
  console.log(`------------------------------------------------------`);
  console.log(`Total Window:        ${totalMs.toFixed(2)} ms`);
  console.log(`Idle Time:           ${idleTime.toFixed(2)} ms (${((idleTime/totalMs)*100).toFixed(1)}%)`);
  console.log(`Program/Parse Time:  ${programTime.toFixed(2)} ms (${((programTime/totalMs)*100).toFixed(1)}%)`);
  console.log(`GC Time:             ${gcTime.toFixed(2)} ms`);
  console.log(`Active JS Execution: ${activeJsMs.toFixed(2)} ms (${((activeJsMs/totalMs)*100).toFixed(1)}%)`);
  console.log(`\n>>> TOTAL BLOCKING TIME (TBT): ${totalBlockingTime.toFixed(2)} ms <<<`);
  console.log(`>>> NUMBER OF LONG TASKS (>50ms): ${longTasks.length} <<<`);

  console.log(`\n--- LONG TASKS BREAKDOWN (>50ms) ---`);
  longTasks.forEach((t, idx) => {
    console.log(`\nLong Task #${idx + 1}: Duration = ${t.duration.toFixed(2)} ms (Blocking: ${(t.duration - 50).toFixed(2)} ms)`);
    // Sort functions in this task
    const sortedFns = Array.from(t.fnBreakdown.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);
    sortedFns.forEach(([fn, time]) => {
      console.log(`   - [${time.toFixed(2)} ms] ${fn}`);
    });
  });

  console.log(`\n--- TOP 15 FUNCTIONS BY SELF TIME ---`);
  const sortedFns = Array.from(functionSelfTime.entries()).sort((a, b) => b[1] - a[1]).slice(0, 15);
  sortedFns.forEach(([fn, time], idx) => {
    console.log(`${idx + 1}. [${time.toFixed(2)} ms] ${fn}`);
  });

  console.log(`\n--- JS EXECUTION BY SCRIPT CHUNK ---`);
  const sortedChunks = Array.from(chunkSelfTime.entries()).sort((a, b) => b[1] - a[1]);
  sortedChunks.forEach(([chunk, time], idx) => {
    console.log(`${idx + 1}. [${time.toFixed(2)} ms] ${chunk}`);
  });

  return {
    cpuThrottleRate,
    totalMs,
    idleTime,
    activeJsMs,
    totalBlockingTime,
    longTasksCount: longTasks.length,
    longTasks: longTasks.map(t => ({
      duration: t.duration,
      blocking: t.duration - 50,
      topFns: Array.from(t.fnBreakdown.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5)
    })),
    topFns: sortedFns,
    topChunks: sortedChunks
  };
}

async function main() {
  console.log('Starting Chrome in clean isolated headless mode for hydration profiling...');
  const os = require('os');
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-prof-clean-'));

  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${tmpDir}`,
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--disable-default-apps',
    '--disable-background-networking',
    '--disable-sync',
    '--disable-component-extensions-with-background-pages',
    '--incognito',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  try {
    await delay(2000);
    const versionInfo = await getJson(`http://localhost:${PORT}/json/version`);
    const wsDebuggerUrl = versionInfo.webSocketDebuggerUrl;

    // Run with 4x CPU throttle (PageSpeed Mobile emulation)
    const mobileResult = await profileHydration(wsDebuggerUrl, 4);

    fs.writeFileSync('hydration_profile_results.json', JSON.stringify({ mobileResult }, null, 2));
    console.log('\nHydration profile results saved to hydration_profile_results.json');
  } catch (err) {
    console.error('Profiling error:', err);
  } finally {
    chromeProc.kill();
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (_) {}
  }
}

main();
