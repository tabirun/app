# ADR-001: Use Deno as the Single Runtime

**Status:** Accepted

## Context

Modern web frameworks can target multiple JavaScript runtimes:

- **Node.js** - Mature ecosystem, widespread adoption, CommonJS/ESM complexity
- **Deno** - Native TypeScript, secure by default, modern standards
- **Bun** - Fast startup, Node.js compatible, newer/less stable
- **Runtime-agnostic** - Maximum compatibility, lowest common denominator
  features

Each approach has trade-offs in ecosystem access, security model, developer
experience, and maintenance burden.

## Decision

Tabi targets Deno exclusively, requiring version 2.5.6 or higher.

We will not maintain Node.js compatibility layers or abstract runtime-specific
APIs behind adapters.

## Consequences

### Benefits

- Native TypeScript execution without build step or configuration
- Built-in security permissions model (network, filesystem, env access must be
  explicit)
- Standard library (`@std/*`) for common utilities without third-party
  dependencies
- Modern web standards (Fetch API, Web Crypto, Streams) as first-class citizens
- Single lockfile format and dependency resolution strategy
- Publish to JSR with native TypeScript support

### Drawbacks

- Smaller ecosystem than Node.js
- Some npm packages may not work without compatibility layer
- Users must install Deno (less ubiquitous than Node.js)
- Deployment targets limited to Deno-supporting platforms

### Neutral

- Version pinning via `.dvmrc` for team consistency
- Deno Deploy as natural deployment target (but not required)
