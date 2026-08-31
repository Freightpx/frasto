import { cp, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageRoot = join(repositoryRoot, 'packages', 'ui');
const fixtureRoot = join(repositoryRoot, 'fixtures', 'consumer-astro');
const temporaryRoot = await mkdtemp(join(tmpdir(), 'frasto-consumer-'));
const packageOutput = join(temporaryRoot, 'package');
const consumerOutput = join(temporaryRoot, 'consumer');
const pnpm = 'pnpm';

function run(command, args, cwd) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
    child.on('error', rejectPromise);
    child.on('exit', (code) => {
      if (code === 0) resolvePromise();
      else rejectPromise(new Error(`${command} ${args.join(' ')} exited with ${code}`));
    });
  });
}

try {
  await cp(fixtureRoot, consumerOutput, { recursive: true });
  await run(pnpm, ['pack', '--pack-destination', packageOutput], packageRoot);

  const archive = (await readdir(packageOutput)).find((entry) => entry.endsWith('.tgz'));
  if (!archive) throw new Error('pnpm pack did not create an archive');

  const manifestPath = join(consumerOutput, 'package.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  manifest.dependencies['@freightpx/frasto'] = `file:${join(packageOutput, archive)}`;
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  await run(pnpm, ['install', '--frozen-lockfile=false'], consumerOutput);
  await run(pnpm, ['build'], consumerOutput);

  const namedImportHtml = await readFile(
    join(consumerOutput, 'dist', 'named-import', 'index.html'),
    'utf8',
  );
  const stylesheetPaths = Array.from(
    namedImportHtml.matchAll(/href="([^"]+\.css)"/g),
    ([, path]) => path,
  );
  if (stylesheetPaths.length === 0) {
    throw new Error('Named-import consumer did not emit a stylesheet link');
  }

  const namedImportCss = (
    await Promise.all(
      stylesheetPaths.map((path) =>
        readFile(join(consumerOutput, 'dist', path.replace(/^\//, '')), 'utf8'),
      ),
    )
  ).join('\n');
  if (!namedImportCss.includes('--frasto-bg:') || !namedImportCss.includes('[data-frasto-button]')) {
    throw new Error('Named-import consumer is missing Frasto tokens or Button styles');
  }
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
