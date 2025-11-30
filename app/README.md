# app

Core framework providing routing, middleware composition, and request/response handling.

## Installation

```typescript
import {
  TabiApp,
  type TabiContext,
  TabiError,
  type TabiMiddleware,
} from "@tabirun/app";
```

## Usage

```typescript
const app = new TabiApp();

app.use((c, next) => {
  console.log(`${c.req.method} ${c.req.url.pathname}`);
  return next();
});

app.get("/", (c) => c.text("Hello World"));

app.get("/ws", (c) => {
  c.webSocket((socket) => {
    socket.onmessage = (e) => socket.send(`Echo: ${e.data}`);
  });
});

Deno.serve(app.handler);
```

## API

**TabiApp**

- `use(...middleware)` - Add global middleware
- `get|post|put|patch|delete|options|head(path, ...middleware)` - Route handlers
- `all(path, ...middleware)` - Handle all methods
- `handler` - Request handler for `Deno.serve()`

**TabiContext**

- `req` - TabiRequest instance
- `header(name, value)` - Set response header
- `text(body, status?)` - Text response
- `json(data, status?)` - JSON response
- `html(body, status?)` - HTML response
- `empty(status?)` - Empty response (default 204)
- `file(path)` - File response
- `redirect(url, status?)` - Redirect (default 307)
- `rewrite(url)` - Internal rewrite
- `notFound(text?)` - 404 response
- `forbidden(text?)` - 403 response
- `webSocket(handler)` - WebSocket upgrade
- `get<T>(key)` / `set(key, value)` - Context storage

**TabiRequest**

- `raw` - Raw Request object
- `method` - HTTP method
- `url` - URL object
- `params` - Route parameters
- `wildcard` - Wildcard match
- `header(name)` - Get header
- `searchParam(name)` - Get query param
- `json()` / `text()` / `formData()` / `arrayBuffer()` / `blob()` - Body parsing (memoized)
- `valid<T>(source)` - Get validated data

**TabiError**

- `new TabiError(message, status?)` - Error with HTTP status

## Notes

- Request body is memoized for multiple middleware access
- Routes match by specificity (static > params > wildcards)
- Middleware executes in order; use `await next()` to continue chain
