# serve-files

Middleware for serving static files.

## Installation

```typescript
import { serveFiles } from "@tabirun/app/serve-files";
```

## Usage

```typescript
app.get(
  "/static/*",
  serveFiles({
    directory: "./public",
  }),
);

// Custom 404 handling
app.get(
  "/*",
  serveFiles({
    directory: "./dist",
    onNotFound: (c) => c.html("<h1>Not Found</h1>", 404),
  }),
);
```

## Options

| Option       | Type       | Default        | Description               |
| ------------ | ---------- | -------------- | ------------------------- |
| `directory`  | `string`   | (required)     | Directory to serve from   |
| `serveIndex` | `boolean`  | `true`         | Serve index.html for dirs |
| `onNotFound` | `function` | `c.notFound()` | Custom 404 handler        |

## Notes

- Must use wildcard routes (e.g., `/static/*`)
- Only serves GET and HEAD (returns 405 for others)
- Path traversal attacks are blocked
