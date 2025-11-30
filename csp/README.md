# csp

Middleware for Content Security Policy headers.

## Installation

```typescript
import { csp } from "@tabirun/app/csp";
```

## Usage

```typescript
app.use(csp({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://cdn.example.com"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
  },
}));
```

## Options

| Option       | Type                                    | Description                |
| ------------ | --------------------------------------- | -------------------------- |
| `directives` | `CSPDirectives \| (c) => CSPDirectives` | Static or dynamic policies |

## Notes

- Secure defaults if no directives specified
- Use function form for dynamic policies (e.g., per-request nonces)
