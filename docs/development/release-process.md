# Release Process

Frasto is pre-alpha and has not established a stable public API. Releases should remain deliberate even during `0.x` development.

## Before a release

1. confirm the intended component maturity and public exports
2. update component documentation and examples
3. add user-visible changes to `CHANGELOG.md`
4. run repository checks and relevant browser verification
5. verify package contents and metadata
6. confirm that planned specifications are not presented as released APIs

## Versioning

Frasto follows Semantic Versioning. Before `1.0`, minor releases may include breaking API changes, but those changes still require changelog notes and migration guidance when users could reasonably depend on the previous API.

## Publication

Package publishing and automated release credentials are intentionally deferred until the public-alpha gate. Do not publish from an unreviewed local working tree.
