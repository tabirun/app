# request-id

Middleware for adding unique request IDs for tracing.

## Installation

```typescript
import { requestId } from "@tabirun/app/request-id";
```

## Usage

```typescript
app.use(requestId());

app.get("/", (c) => {
  const id = c.get("requestId");
  c.text(`Request: ${id}`);
});
```

## Options

| Option       | Type           | Default             | Description           |
| ------------ | -------------- | ------------------- | --------------------- |
| `generator`  | `() => string` | `crypto.randomUUID` | ID generator function |
| `headerName` | `string`       | `"X-Request-ID"`    | Header name           |

## Notes

- Reuses client-provided IDs for distributed tracing
- Adds ID to response headers for correlation
- Available in context via `c.get("requestId")`
