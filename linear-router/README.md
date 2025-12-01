# linear-router

Default router using linear search for route matching.

## Installation

```typescript
import { LinearRouter } from "@tabirun/app/linear-router";
```

## Usage

LinearRouter is the default - no explicit setup needed:

```typescript
const app = new TabiApp();

app.get("/users", handler); // Static route
app.get("/users/:id", handler); // Parameterized route
app.get("/files/*", handler); // Wildcard route

// Explicit usage
const app = new TabiApp({
  router: new LinearRouter(),
});
```

## Route Types

```typescript
// Static
app.get("/users", handler);

// Parameters - access via c.req.params
app.get("/users/:id", (c) => c.json({ id: c.req.params.id }));

// Wildcard - access via c.req.wildcard
app.get("/files/*", (c) => c.json({ path: c.req.wildcard }));
```

## Notes

- Routes match by specificity: static > parameterized > wildcard
- Returns 405 with `Allow` header when method doesn't match
- Returns 404 when no route matches
- Path traversal attempts are blocked with 400
- Duplicate route patterns throw at registration time
