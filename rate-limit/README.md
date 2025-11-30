# rate-limit

Middleware for rate limiting requests.

## Installation

```typescript
import { rateLimit, InMemoryRateLimitStore } from "@tabirun/app/rate-limit";
```

## Usage

```typescript
app.use(rateLimit({
  max: 100,
  windowMs: 60000,
  store: new InMemoryRateLimitStore({ maxKeys: 5000 }),
}));
```

## Options

| Option         | Type             | Default        | Description                 |
| -------------- | ---------------- | -------------- | --------------------------- |
| `max`          | `number`         | `100`          | Max requests per window     |
| `windowMs`     | `number`         | `60000` (1min) | Time window in milliseconds |
| `store`        | `RateLimitStore` | In-memory      | Storage backend             |
| `keyGenerator` | `function`       | Extract IP     | Key generation function     |
| `message`      | `string`         | Too Many...    | Error message               |
| `headers`      | `boolean`        | `true`         | Include rate limit headers  |

## Custom Store

Implement `RateLimitStore` interface for Redis, DynamoDB, etc:

```typescript
interface RateLimitStore {
  hit(key: string, windowMs: number): Promise<number>;
  reset(key: string): Promise<void>;
}
```

## Notes

- Returns 429 Too Many Requests when exceeded
- Includes `X-RateLimit-*` and `Retry-After` headers
- Default key generator uses `X-Forwarded-For`, `X-Real-IP`, or connection IP
