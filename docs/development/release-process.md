# Release Process

Frasto uses public alpha releases to gather real-project evidence before establishing a stable API. Releases remain deliberate throughout `0.x` development.

## Before a release

1. confirm the intended component maturity and public exports
2. update component documentation and examples
3. add user-visible changes to `CHANGELOG.md`
4. run repository checks and relevant browser verification
5. verify package contents and metadata
6. confirm that planned specifications are not presented as released APIs

## Versioning

Frasto follows Semantic Versioning. Before `1.0`, minor releases may include breaking API changes, but those changes still require changelog notes and migration guidance when users could reasonably depend on the previous API.

## Local alpha publication

The first alpha uses a reviewed local build. Do not publish from an unreviewed or dirty working tree.

1. set the package and exported version to the same prerelease value
2. run `pnpm check`, `pnpm build`, `pnpm test`, and `git diff --check`
3. run `pnpm test:package` and `pnpm test:consumer`
4. inspect the `pnpm pack --dry-run --json` file list
5. create the tarball with `pnpm pack` from `packages/ui`
6. build a fresh Astro consumer from that exact tarball
7. publish the tarball with `npm publish <tarball> --access public --tag next`
8. verify installation from npm in a clean Astro project
9. create the matching Git tag and GitHub prerelease only after registry verification

Never overwrite a published alpha. Deprecate a faulty version and release the next prerelease number.

## Website publication

Run `pnpm web:build` and deploy `apps/web/dist` through the existing server workflow after the package is visible on npm. Verify the homepage, documentation, demo, themes, narrow layouts, links, sitemap, and HTTPS on the public domain.
