# cookies

Utilities for cookie management with optional HMAC-SHA256 signing.

## Installation

```typescript
import { deleteCookie, getCookie, setCookie } from "@tabirun/app/cookies";
```

## Usage

```typescript
app.post("/login", async (c) => {
  await setCookie(c, "session", "abc123", {
    secret: "my-secret",
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 3600,
  });
  c.text("Logged in");
});

app.get("/profile", async (c) => {
  const session = await getCookie(c, "session", "my-secret");
  if (!session) return c.text("Unauthorized", 401);
  c.text(`Session: ${session}`);
});
```

## API

- `setCookie(c, name, value, options?)` - Set cookie
- `getCookie(c, name, secret?)` - Get cookie (returns `null` if missing or
  invalid)
- `deleteCookie(c, name, options?)` - Delete cookie

## Options

| Option     | Type                          | Description          |
| ---------- | ----------------------------- | -------------------- |
| `secret`   | `string`                      | HMAC-SHA256 signing  |
| `maxAge`   | `number`                      | Max age in seconds   |
| `expires`  | `Date`                        | Expiration date      |
| `path`     | `string`                      | Cookie path          |
| `domain`   | `string`                      | Cookie domain        |
| `secure`   | `boolean`                     | HTTPS only           |
| `httpOnly` | `boolean`                     | No JavaScript access |
| `sameSite` | `"Strict" \| "Lax" \| "None"` | Cross-site behavior  |

## Notes

- Signed cookies return `null` if tampered
- `maxAge` takes precedence over `expires`
