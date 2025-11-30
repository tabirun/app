# body-size

Middleware for limiting request body size.

## Installation

```typescript
import { bodySize } from "@tabirun/app/body-size";
```

## Usage

```typescript
app.use(bodySize({ maxSize: 1048576 })); // 1MB
```

## Options

| Option    | Type     | Default | Description                |
| --------- | -------- | ------- | -------------------------- |
| `maxSize` | `number` | 1MB     | Maximum body size in bytes |

## Notes

- Checks `Content-Length` header for fast rejection
- Returns 413 Payload Too Large when exceeded
