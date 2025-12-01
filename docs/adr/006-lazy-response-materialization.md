# ADR-006: Lazy Response Materialization

**Status:** Accepted

## Context

Response construction can be handled two ways:

**Eager construction:**

- Create `Response` object immediately when handler sets response
- Simple mental model
- Difficult for middleware to modify response after it's set
- Multiple `Response` allocations if middleware transforms response

**Lazy construction:**

- Buffer response state (headers, body, status) throughout request lifecycle
- Construct final `Response` object once at the end
- Middleware can modify response at any point
- Single allocation

## Decision

`TabiResponse` buffers response state until `finalize()` is called, which
constructs the actual `Response` object.

```typescript
class TabiResponse {
  // Buffer state
  status(code: number): this;
  header(name: string, value: string): this;
  body(content: BodyInit): this;

  // Construct final Response
  finalize(): Response;
}

// Usage in handlers
c.json({ data: "value" }); // Buffers, doesn't create Response yet
c.header("X-Custom", "value"); // Can still modify

// Framework calls finalize() after all middleware complete
```

## Consequences

### Benefits

- Middleware can modify response after handler sets it
- Headers can be added/removed throughout request lifecycle
- Single `Response` construction reduces allocations
- Enables response transformation patterns (compression, caching headers)
- Cleaner separation between "building response" and "sending response"

### Drawbacks

- Cannot stream response body until finalized
- Must remember that response isn't sent until request completes
- Slightly more complex response internals

### Patterns Enabled

```typescript
// Compression middleware can check content-type before compressing
app.use(async (c, next) => {
  await next();
  if (shouldCompress(c.res)) {
    c.res.body(compress(c.res.getBody()));
  }
});

// Cache-control middleware can add headers based on response
app.use(async (c, next) => {
  await next();
  if (c.res.getStatus() === 200) {
    c.res.header("Cache-Control", "max-age=3600");
  }
});
```
