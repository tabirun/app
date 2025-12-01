# ADR-003: Monorepo with Independently Composable Modules

**Status:** Accepted

## Context

The framework consists of multiple features: core routing, validation, various
middleware (CORS, CSRF, compression, etc.), and utilities. These can be
organized as:

**Single monolithic package:**

- One import, one version
- All features always available
- Larger bundle if tree-shaking fails

**Separate packages with independent versions:**

- Import only what you need
- Version compatibility matrix complexity
- More release management overhead

**Single package with submodule exports:**

- One version to track
- Import specific modules
- Tree-shaking friendly
- Simpler release process

## Decision

Organize as a monorepo with a single JSR package (`@tabirun/app`) that exposes
submodule exports, each independently importable.

```typescript
// Import only what you need
import { TabiApp } from "@tabirun/app/app";
import { cors } from "@tabirun/app/cors";
import { rateLimit } from "@tabirun/app/rate-limit";
```

Each module:

- Has its own directory with `mod.ts` as public API
- Contains colocated tests
- Has independent README documentation
- Exports only public types and functions

## Consequences

### Benefits

- Single version number for entire framework
- Simpler dependency management for users
- Tree-shaking removes unused modules
- Easier cross-module testing
- Consistent release cycle
- No version compatibility matrix

### Drawbacks

- Breaking change in any module bumps entire package version
- Cannot patch individual modules independently
- All modules must maintain same quality bar

### Module Structure

```
module-name/
├── mod.ts           # Public exports only
├── middleware.ts    # Implementation
├── types.ts         # Types (if needed)
├── README.md        # Usage documentation
└── tests/           # Module tests
```
