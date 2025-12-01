# ADR-008: CSRF Protection via Fetch Metadata Headers

**Status:** Accepted

## Context

Cross-Site Request Forgery (CSRF) attacks trick authenticated users into
submitting malicious requests. Traditional protections include:

**Synchronizer token pattern:**

- Server generates token, embeds in forms
- Server validates token on submission
- Requires server-side token storage
- Session affinity or shared storage needed

**Double-submit cookie:**

- Token in cookie and request body/header
- Stateless but vulnerable to subdomain attacks
- Cookie scope issues

**Fetch Metadata headers:**

- Browser sends `Sec-Fetch-Site`, `Sec-Fetch-Mode`, `Sec-Fetch-Dest`
- Cannot be set by JavaScript (browser-enforced)
- Stateless, no token management
- Modern browsers only (Safari 16.4+, Chrome 76+, Firefox 90+)

## Decision

Implement CSRF protection using Fetch Metadata headers (`Sec-Fetch-Site`) with
`Origin` header as fallback for older browsers.

```typescript
// Protection logic
if (isStateChangingRequest(method) && hasFormContentType(contentType)) {
  const site = headers.get("Sec-Fetch-Site");

  if (site && site !== "same-origin" && site !== "same-site") {
    return forbidden();
  }

  // Fallback: check Origin header
  if (!site) {
    const origin = headers.get("Origin");
    if (origin && !isSameOrigin(origin, requestUrl)) {
      return forbidden();
    }
  }
}
```

## Consequences

### Benefits

- No server-side token storage
- No token synchronization between server instances
- Browser-enforced (cannot be spoofed by JavaScript)
- Simpler implementation than token-based approaches
- No token in forms or AJAX headers

### Drawbacks

- Older browsers fall back to Origin check (less reliable)
- Only protects requests with form content types
- Cross-origin APIs require explicit CORS configuration
- Cannot protect GET requests (by design - GET should be safe)

### Protected Scenarios

- `POST`/`PUT`/`DELETE` with `application/x-www-form-urlencoded`
- `POST`/`PUT`/`DELETE` with `multipart/form-data`

### Not Protected (by design)

- `GET` requests (should be idempotent)
- JSON API requests (require explicit `Content-Type`, mitigates CSRF)
- Requests from same origin/site
