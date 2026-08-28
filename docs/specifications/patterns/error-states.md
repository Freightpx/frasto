---
title: Error states
description: Keep errors specific, local, recoverable, and proportional to their scope.
---

## Scope the failure

| Scope | Treatment |
| --- | --- |
| field | associated message beside the control |
| action | inline result near the trigger or affected content |
| region | local error preserving the rest of the page |
| resource/page | clear full-content error only when primary data is unavailable |
| application | shell-level recovery for genuine global failure |

## Content

State what could not be completed, preserve known context, and offer a relevant next action. Avoid exposing internal stack traces, request IDs without explanation, or blame-oriented language.

## Recovery

Retry should repeat a safe operation and communicate progress. Preserve form input and useful data. Destructive operations need clarity about whether the operation may have partially succeeded.

## Accessibility

Field errors remain associated with controls. New asynchronous errors receive focus or announcement only when appropriate to their scope. Do not move focus for every background failure.

## Ownership

The application maps technical failures to domain messages and retry behavior. Frasto provides consistent structures and semantics.
