import fs from 'node:fs';
import assert from 'node:assert/strict';
const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
assert.equal(config.builds[0].config.distDir, 'dist');
const rewrite = (config.rewrites || []).find(r => r.source === '/(.*)' && r.destination === '/index.html');
assert(rewrite, 'Rewrite for index.html missing');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
assert.equal(pkg.scripts.build, 'vite build');
console.log('All tests passed');

