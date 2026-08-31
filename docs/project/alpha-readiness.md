# Public Alpha Readiness

This score measures launch evidence, not the number of planned components. The 33-family public-alpha inventory is frozen and remains Experimental.

| Milestone | Status | Readiness |
| --- | --- | ---: |
| Initial audited repository | Complete | 72% |
| Gate A — quality and API audit | Complete | 84% |
| Gate B — package and public content | Complete | 94% |
| Gate C — manual validation and publication | In progress | 100% when complete |

The repository is approximately **94% ready for public alpha**. The remaining work is manual keyboard/NVDA/device validation plus registry, production, and GitHub release verification; it is not component development.

## Remaining launch blockers

- [x] Complete and record keyboard-only automated evidence for every interactive family.
- [x] Record browser, operating-system, and tool versions plus known limitations.
- [x] Fix critical defects discovered by local visual and keyboard review.
- [x] Run the final build, package audit, named-import tarball consumer, and three-engine matrix.
- [ ] Complete an independent human keyboard review immediately before publication.
- [ ] Run the basic Windows NVDA scenarios for forms, SearchInput, Tabs, Accordion, Dropdown, Dialog, and Drawer.
- [ ] Record a physical-phone smoke check if a device is available.

See [Public Alpha Validation Record](./alpha-validation.md) for the exact environment, results, and evidence boundary.

## Authorized separately

These steps change external state and require explicit authorization:

- publish `@freightpx/frasto@0.1.0-alpha.1` with the `next` tag;
- install and verify the real registry package in a clean Astro project;
- deploy `apps/web/dist`, configure DNS/HTTPS, and verify production routes;
- create the GitHub prerelease and release notes.

## Immediate post-alpha evidence

- VoiceOver and a broader physical-device matrix;
- installation and API feedback from real projects;
- critical fixes in later, never-overwritten alpha versions; and
- publishing or deployment automation only when manual releases become burdensome.
