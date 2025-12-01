# security-headers

Middleware for common HTTP security headers.

## Installation

```typescript
import { securityHeaders } from "@tabirun/app/security-headers";
```

## Usage

```typescript
app.use(...securityHeaders({
  referrerPolicy: "strict-origin-when-cross-origin",
  permissionsPolicy: {
    geolocation: ["self"],
    camera: ["none"],
  },
}));
```

## Options

| Option                      | Type                       | Default                                 |
| --------------------------- | -------------------------- | --------------------------------------- |
| `csp`                       | `CSPOptions`               | Secure defaults                         |
| `referrerPolicy`            | `string`                   | `"no-referrer"`                         |
| `strictTransportSecurity`   | `string`                   | `"max-age=15552000; includeSubDomains"` |
| `xFrameOptions`             | `"DENY" \| "SAMEORIGIN"`   | `"SAMEORIGIN"`                          |
| `xContentTypeOptions`       | `boolean`                  | `true`                                  |
| `crossOriginOpenerPolicy`   | `string`                   | `"same-origin"`                         |
| `crossOriginResourcePolicy` | `string`                   | `"same-origin"`                         |
| `removeXPoweredBy`          | `boolean`                  | `true`                                  |
| `permissionsPolicy`         | `Record<string, string[]>` | -                                       |

## Notes

- Returns array of middleware (spread with `...securityHeaders()`)
- Includes CSP middleware automatically
