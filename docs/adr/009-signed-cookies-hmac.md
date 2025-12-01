# ADR-009: Signed Cookies with HMAC-SHA256

**Status:** Accepted

## Context

Cookies storing user data (preferences, session IDs, tokens) are vulnerable to
tampering. A malicious user can modify cookie values to impersonate others or
escalate privileges.

Protection options:

**Server-side sessions:**

- Cookie contains only session ID
- All data stored server-side
- Requires shared storage for horizontal scaling

**Encrypted cookies:**

- Data encrypted, unreadable by client
- Key management complexity
- Larger cookies due to encryption overhead

**Signed cookies:**

- Data readable but tamper-evident
- HMAC signature validates integrity
- Stateless, no server storage needed

## Decision

Support signed cookies using HMAC-SHA256 with constant-time signature
comparison.

Format: `s:value.signature`

```typescript
// Setting a signed cookie
setCookie(c, "userId", "12345", {
  secret: COOKIE_SECRET,
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
});
// Result: userId=s:12345.HmacSignatureHere

// Reading validates signature automatically
const userId = getCookie(c, "userId", { secret: COOKIE_SECRET });
// Returns "12345" if valid, undefined if tampered
```

## Consequences

### Benefits

- Detects tampering without server-side state
- Web Crypto API provides native HMAC-SHA256
- Constant-time comparison prevents timing attacks
- Cookie value remains readable for debugging
- Stateless - works with any number of server instances

### Drawbacks

- Secret key management required
- Signed cookies are larger than unsigned (~44 chars for signature)
- Key rotation requires supporting multiple keys temporarily
- Value is visible (not encrypted) - don't store sensitive data

### Security Requirements

- Secret must be cryptographically random, minimum 32 bytes
- Secret must not be committed to version control
- Use constant-time comparison to prevent timing attacks
- Always combine with `HttpOnly`, `Secure`, `SameSite` attributes

### Key Rotation

When rotating secrets:

1. Accept signatures from both old and new keys
2. Sign new cookies with new key only
3. After cookie max-age expires, remove old key
