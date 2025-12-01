# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs) for Tabi.

## What is an ADR?

An ADR captures an architecturally significant decision along with its context
and consequences. ADRs are immutable once accepted; superseding decisions create
new ADRs that reference the original.

## ADR Status

- **Proposed** - Under discussion
- **Accepted** - Decision made and in effect
- **Deprecated** - No longer applies but kept for historical context
- **Superseded** - Replaced by a newer ADR (link to replacement)

## Index

| ADR                                          | Title                                              | Status   |
| -------------------------------------------- | -------------------------------------------------- | -------- |
| [001](001-deno-runtime.md)                   | Use Deno as the Single Runtime                     | Accepted |
| [002](002-minimal-philosophy.md)             | Minimal Framework Philosophy                       | Accepted |
| [003](003-monorepo-composable-modules.md)    | Monorepo with Independently Composable Modules     | Accepted |
| [004](004-standard-schema-validation.md)     | Standard Schema for Validation Library Agnosticism | Accepted |
| [005](005-linear-router-default.md)          | Linear Router as Default Implementation            | Accepted |
| [006](006-lazy-response-materialization.md)  | Lazy Response Materialization                      | Accepted |
| [007](007-memoized-request-body.md)          | Memoized Request Body Parsing                      | Accepted |
| [008](008-csrf-fetch-metadata.md)            | CSRF Protection via Fetch Metadata Headers         | Accepted |
| [009](009-signed-cookies-hmac.md)            | Signed Cookies with HMAC-SHA256                    | Accepted |
| [010](010-test-against-running-server.md)    | Test Against Running Server                        | Accepted |
| [011](011-context-based-state.md)            | Context-Based Request State                        | Accepted |
| [012](012-composable-security-middleware.md) | Composable Security Middleware                     | Accepted |

## Creating a New ADR

1. Copy the template below
2. Use the next sequential number
3. Write in past tense for context, present tense for decision
4. Submit PR for review

### Template

```markdown
# ADR-NNN: Title

**Status:** Proposed | Accepted | Deprecated | Superseded by
[ADR-NNN](NNN-title.md)

**Date:** YYYY-MM-DD

## Context

What is the issue that we're seeing that is motivating this decision or change?

## Decision

What is the change that we're proposing and/or doing?

## Consequences

What becomes easier or more difficult to do because of this change?
```
