# status

Utilities and types for HTTP status codes.

## Installation

```typescript
import { statusText, type Status } from "@tabirun/app/status";
```

## Usage

```typescript
statusText(404); // "Not Found"
statusText(200); // "OK"
```

## API

- `statusText(code)` - Get status text for code

## Types

- `InfoStatus` - 1xx
- `SuccessStatus` - 2xx
- `RedirectStatus` - 3xx
- `ClientErrorStatus` - 4xx
- `ServerErrorStatus` - 5xx
- `Status` - All valid codes
- `ContentfulStatus` - Codes with body
- `ContentlessStatus` - Codes without body
