# cors

Middleware for Cross-Origin Resource Sharing.

## Installation

```typescript
import { cors } from "@tabirun/app/cors";
```

## Usage

```typescript
app.use(cors({
  origins: ["https://example.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  headers: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400,
}));
```

## Options

| Option          | Type              | Description                    |
| --------------- | ----------------- | ------------------------------ |
| `origins`       | `"*" \| string[]` | Allowed origins                |
| `methods`       | `"*" \| string[]` | Allowed HTTP methods           |
| `headers`       | `string[]`        | Allowed request headers        |
| `exposeHeaders` | `string[]`        | Headers exposed to browser     |
| `credentials`   | `boolean`         | Allow credentials              |
| `maxAge`        | `number`          | Preflight cache duration (sec) |

## Notes

- Wildcard origin (`*`) cannot be used with `credentials: true`
- Automatically handles OPTIONS preflight requests
