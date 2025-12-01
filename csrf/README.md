# csrf

Stateless CSRF protection using Fetch Metadata and Origin validation.

## Installation

```typescript
import { csrf } from "@tabirun/app/csrf";
```

## Usage

```typescript
// Same-origin only (default)
app.use(csrf());

// Allow specific origins
app.use(csrf({
  origin: ["https://example.com", "https://app.example.com"],
}));

// Custom validation
app.use(csrf({
  origin: (origin, c) => origin.endsWith(".example.com"),
}));
```

## Options

| Option         | Type                             | Default         | Description                   |
| -------------- | -------------------------------- | --------------- | ----------------------------- |
| `origin`       | `string \| string[] \| function` | Request origin  | Allowed origins               |
| `secFetchSite` | `string \| string[] \| function` | `"same-origin"` | Allowed Sec-Fetch-Site values |

## Notes

- Uses `Sec-Fetch-Site` header (cannot be forged by browsers)
- Falls back to `Origin` header for older browsers
- Only validates unsafe methods (POST, PUT, DELETE, PATCH) with form content
  types
- Returns 403 Forbidden on validation failure
