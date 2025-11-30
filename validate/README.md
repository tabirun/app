# validate

Type-safe request validation using Standard Schema.

## Installation

```typescript
import { validator } from "@tabirun/app/validate";
import { z } from "zod";
```

## Usage

```typescript
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { validate, valid } = validator({ json: userSchema });

app.post("/login", validate, (c) => {
  const { json } = valid(c); // Typed as { email: string; password: string }
  c.json({ email: json.email });
});
```

## Validation Sources

| Source   | Description          |
| -------- | -------------------- |
| `json`   | Request body as JSON |
| `form`   | Form data            |
| `search` | URL query parameters |
| `params` | Route parameters     |

## Options

| Option         | Type       | Default | Description                     |
| -------------- | ---------- | ------- | ------------------------------- |
| `reportErrors` | `boolean`  | `false` | Include errors in response      |
| `onError`      | `function` | -       | Custom error handler            |

## Notes

- Works with Zod, Valibot, ArkType, or any Standard Schema library
- Returns 400 Bad Request on validation failure
- Validated data is readonly
