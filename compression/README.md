# compression

Middleware for gzip compression of response bodies.

## Installation

```typescript
import { compression } from "@tabirun/app/compression";
```

## Usage

```typescript
app.use(compression());

// Custom thresholds
app.use(compression({
  threshold: 2048,
  maxSize: 5242880,
}));
```

## Options

| Option            | Type       | Default | Description                              |
| ----------------- | ---------- | ------- | ---------------------------------------- |
| `threshold`       | `number`   | 1KB     | Minimum size to compress                 |
| `maxSize`         | `number`   | 10MB    | Maximum size to compress                 |
| `bufferThreshold` | `number`   | 1MB     | Size threshold for streaming vs buffered |
| `contentTypes`    | `string[]` | text/*  | Content types to compress                |

## Notes

- Only compresses when client sends `Accept-Encoding: gzip`
- Responses below `bufferThreshold` set `Content-Length`; larger use chunked
  transfer
- Use CDN/reverse proxy compression for cacheable responses
