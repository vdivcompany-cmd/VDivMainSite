const fs = require('fs');
const path = require('path');

const chunksDir = path.join(process.cwd(), '.next/static/chunks');
const files = fs.readdirSync(chunksDir);

console.log('--- CHUNK CONTENT ANALYSIS ---');
files.forEach(f => {
  if (!f.endsWith('.js')) return;
  const filePath = path.join(chunksDir, f);
  const content = fs.readFileSync(filePath, 'utf8');
  const sizeKb = (content.length / 1024).toFixed(2);

  // Search for known libraries or component names
  const matches = [];
  if (content.includes('react-dom')) matches.push('react-dom');
  if (content.includes('react/jsx-runtime')) matches.push('react/jsx-runtime');
  if (content.includes('gsap') || content.includes('ScrollTrigger')) matches.push('gsap/ScrollTrigger');
  if (content.includes('lenis')) matches.push('lenis');
  if (content.includes('ogl')) matches.push('ogl');
  if (content.includes('three')) matches.push('three');
  if (content.includes('lucide')) matches.push('lucide-react');
  if (content.includes('next-intl')) matches.push('next-intl');
  if (content.includes('next-themes')) matches.push('next-themes');
  if (content.includes('react-fast-marquee')) matches.push('react-fast-marquee');
  if (content.includes('Reveal') || content.includes('data-reveal')) matches.push('Reveal/Animation');
  if (content.includes('Navbar')) matches.push('Navbar');
  if (content.includes('Footer')) matches.push('Footer');
  if (content.includes('Hero')) matches.push('Hero');
  if (content.includes('CoreCapabilities')) matches.push('CoreCapabilities');
  if (content.includes('WhyTrimax')) matches.push('WhyTrimax');
  if (content.includes('FeaturedProjects')) matches.push('FeaturedProjects');
  if (content.includes('InteractiveMap')) matches.push('InteractiveMap');
  if (content.includes('Threads')) matches.push('Threads');
  if (content.includes('DotGrid')) matches.push('DotGrid');
  if (content.includes('LightRays')) matches.push('LightRays');

  // Look for comments or module headers
  const sourceMatches = content.match(/\[project\]\/([^\s"',;()]+)/g) || [];
  const nodeModulesMatches = content.match(/node_modules\/([^\s"',;()/]+)/g) || [];
  const uniqueSources = Array.from(new Set(sourceMatches.map(s => s.replace('[project]/', '')))).slice(0, 10);
  const uniqueModules = Array.from(new Set(nodeModulesMatches.map(s => s.replace('node_modules/', '')))).slice(0, 10);

  console.log(`\nChunk: ${f} (${sizeKb} KB)`);
  console.log(`  Identified Libraries/Tags: ${matches.join(', ') || 'unknown/framework'}`);
  if (uniqueModules.length > 0) {
    console.log(`  Node Modules: ${uniqueModules.join(', ')}`);
  }
  if (uniqueSources.length > 0) {
    console.log(`  Included Project Sources (${uniqueSources.length}):`);
    uniqueSources.forEach(s => console.log(`    - ${s}`));
  }
  console.log(`  Snippet: ${content.substring(0, 150)}...`);
});
