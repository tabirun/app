# ADR-007: Memoized Request Body Parsing

**Status:** Accepted

## Context

The Fetch API's `Request` body can only be consumed once:

```typescript
const json = await request.json(); // Works
const text = await request.text(); // Throws: body already consumed
```

In a middleware architecture, multiple middleware may need to read the request
body:

- Validation middleware reads JSON to validate
- Logging middleware reads body for audit
- Handler reads body to process

Options:

1. **Clone request** - Memory overhead, complexity
2. **Parse once, pass through context** - Coupling between middleware
3. **Memoize parsed results** - Parse on first access, cache result

## Decision

Memoize parsed request body per format. First access parses and caches;
subsequent accesses return cached result.

```typescript
class TabiRequest {
  private jsonCache?: unknown;
  private textCache?: string;
  // ... other formats

  async json<T>(): Promise<T> {
    if (this.jsonCache === undefined) {
      this.jsonCache = await this.raw.json();
    }
    return this.jsonCache as T;
  }
}
```

Supported formats:

- `json()` - Parse as JSON
- `text()` - Parse as string
- `formData()` - Parse as FormData
- `arrayBuffer()` - Parse as ArrayBuffer
- `blob()` - Parse as Blob

## Consequences

### Benefits

- Multiple middleware can read same body
- No "body already consumed" errors
- Transparent to middleware authors
- Consistent parsing across request lifecycle

### Drawbacks

- Memory overhead for cached parsed bodies
- First accessor determines parse success/failure
- Cannot re-parse with different options (e.g., different JSON reviver)
- Large bodies stay in memory for request duration

### Behavior Notes

- Parsing happens lazily (only when accessed)
- Parse errors throw on first access, cached for subsequent access
- Different formats are independent (can call both `json()` and `text()`)
- Original `Request` body is consumed on first parse of any format
