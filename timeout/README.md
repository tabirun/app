# timeout

Middleware for enforcing request timeouts.

## Installation

```typescript
import { timeout } from "@tabirun/app/timeout";
```

## Usage

```typescript
app.use(timeout({ ms: 30000 })); // 30 seconds
```

## Options

| Option | Type     | Default | Description                    |
| ------ | -------- | ------- | ------------------------------ |
| `ms`   | `number` | `30000` | Maximum duration in ms         |

## Notes

- Returns 408 Request Timeout when exceeded
- Timeout includes all downstream middleware
