const { spawnSync } = require('child_process');
const path = require('path');

const major = Number(process.versions.node.split('.')[0]);
const env = { ...process.env };

// Webpack 4 (Gatsby 2) hashes with MD4. OpenSSL 3, shipped with Node 17+,
// rejects that algorithm unless the legacy provider is enabled.
// Node 16 does not accept this flag, so it stays off for the Netlify build.
if (major >= 17) {
  const current = env.NODE_OPTIONS || '';
  if (!current.includes('--openssl-legacy-provider')) {
    env.NODE_OPTIONS = `${current} --openssl-legacy-provider`.trim();
  }
}

const gatsbyCli = path.join(__dirname, '..', 'node_modules', 'gatsby', 'cli.js');
const result = spawnSync(process.execPath, [gatsbyCli, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env,
});

process.exit(result.status == null ? 1 : result.status);
