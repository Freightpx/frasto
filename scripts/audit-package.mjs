import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageRoot = join(repositoryRoot, 'packages', 'ui');
const manifest = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf8'));
const indexSource = await readFile(join(packageRoot, 'src', 'index.ts'), 'utf8');

const exportedVersion = indexSource.match(/export const version = '([^']+)'/)?.[1];
if (exportedVersion !== manifest.version) {
  throw new Error(`Exported version ${exportedVersion ?? '(missing)'} does not match package version ${manifest.version}`);
}

if (!manifest.sideEffects?.includes('./src/index.ts') || !manifest.sideEffects?.includes('**/*.css')) {
  throw new Error('Package sideEffects must preserve the stylesheet-loading entry point and CSS files');
}

function run(command, args, cwd) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, {
      cwd,
      shell: process.platform === 'win32',
      stdio: ['ignore', 'pipe', 'inherit'],
    });
    let output = '';
    child.stdout.on('data', (chunk) => { output += chunk; });
    child.on('error', rejectPromise);
    child.on('exit', (code) => {
      if (code === 0) resolvePromise(output);
      else rejectPromise(new Error(`${command} ${args.join(' ')} exited with ${code}`));
    });
  });
}

const output = await run('pnpm', ['pack', '--dry-run', '--json'], packageRoot);
const jsonStart = output.indexOf('{');
if (jsonStart === -1) throw new Error('Package dry run did not return JSON');
const pack = JSON.parse(output.slice(jsonStart));
const files = new Set(pack.files.map(({ path }) => path.replaceAll('\\', '/')));

const required = [
  'dist/styles.css',
  'LICENSE',
  'package.json',
  'README.md',
  'THIRD_PARTY_NOTICES.md',
  'src/index.ts',
  'src/styles/tokens.css',
];
for (const path of required) {
  if (!files.has(path)) throw new Error(`Package is missing required file: ${path}`);
}

const forbidden = ['tests/', 'fixtures/', 'docs/', 'bejamas/', 'node_modules/'];
for (const path of files) {
  if (forbidden.some((prefix) => path.startsWith(prefix))) {
    throw new Error(`Package contains workspace-only file: ${path}`);
  }
}

if (pack.name !== manifest.name || pack.version !== manifest.version) {
  throw new Error('Packed package identity does not match package.json');
}

console.log(`Package audit passed: ${pack.name}@${pack.version}, ${files.size} files`);
