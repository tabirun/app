# cache-control

Middleware for setting HTTP Cache-Control headers.

## Installation

```typescript
import { cacheControl } from "@tabirun/app/cache-control";
```

## Usage

```typescript
app.use(cacheControl({ maxAge: 3600, public: true }));
```

## Options

| Option                 | Type      | Description                         |
| ---------------------- | --------- | ----------------------------------- |
| `maxAge`               | `number`  | Seconds response can be cached      |
| `sMaxAge`              | `number`  | Seconds for shared cache (CDN)      |
| `noCache`              | `boolean` | Must revalidate before use          |
| `noStore`              | `boolean` | No caching allowed                  |
| `noTransform`          | `boolean` | Don't transform cached content      |
| `mustRevalidate`       | `boolean` | Must revalidate stale cache         |
| `proxyRevalidate`      | `boolean` | Must revalidate (shared cache only) |
| `private`              | `boolean` | Private cache only                  |
| `public`               | `boolean` | Public cache allowed                |
| `immutable`            | `boolean` | Response won't change while fresh   |
| `staleWhileRevalidate` | `number`  | Seconds to use stale while updating |
| `staleIfError`         | `number`  | Seconds to use stale on error       |

## Notes

- Throws if conflicting directives used (e.g., `public` + `private`)
