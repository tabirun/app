# Multi-Runtime Support (Node.js, Bun)

## Summary

Tabirun is Deno-first. Most of the codebase is already cross-runtime compatible
because it's built on web standards (Request, Response, Headers, URL,
crypto.subtle, fetch, etc.).

Only a handful of Deno-specific APIs need shimming.

## Strategy

- **Deno** remains the primary development and testing runtime
- **Core tests** stay Deno-only - no duplication
- **Smoke tests** added for Node.js and Bun runtimes
- **npm distribution** ships a bundled JS build (via dnt, esbuild, or tsup)
- **Bun** can consume TypeScript directly (native support)

## APIs Requiring Adapters

| API                            | Location                    | Purpose              |
| ------------------------------ | --------------------------- | -------------------- |
| `Deno.serve()`                 | `test-utils/server.ts`      | Test server creation |
| `Deno.stat()`                  | `serve-files/middleware.ts` | File existence/info  |
| `Deno.upgradeWebSocket()`      | `app/context.ts`            | WebSocket upgrade    |
| `Deno.stdout.writeSync()`      | `logs/logger.ts`            | Colored log output   |
| `serveFile()` from `@std/http` | `serve-files/middleware.ts` | Static file serving  |

## Proposed Structure

```
runtime/
├── mod.ts        # Runtime detection, re-exports correct implementation
├── types.ts      # Shared interfaces
├── deno.ts       # Deno.* implementations
├── node.ts       # node:fs, node:http equivalents
└── bun.ts        # Bun.file(), Bun.serve() equivalents
```

## Build Targets

| Target     | Format                  | TypeScript        |
| ---------- | ----------------------- | ----------------- |
| JSR (Deno) | Source `.ts`            | Native            |
| npm (Node) | Bundled `.js` + `.d.ts` | Compiled          |
| npm (Bun)  | Same bundle             | Native TS support |

## What's Already Cross-Runtime

- Middleware architecture (pure functions)
- Request/Response/Headers/URL
- crypto.subtle (Node 18+, Bun)
- TextEncoder/TextDecoder
- fetch
- Zod validation (npm package)
