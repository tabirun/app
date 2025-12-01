# ADR-012: Composable Security Middleware

**Status:** Accepted

## Context

Security features can be packaged as:

**Monolithic security layer:**

- Single "security" middleware with all features
- One configuration object
- All-or-nothing approach
- Simpler to enable "secure by default"

**Composable security middleware:**

- Each feature is independent middleware
- Applications compose what they need
- More configuration, more control
- Explicit security posture

## Decision

Each security feature is a separate, independently usable middleware.

```typescript
import { securityHeaders } from "@tabirun/app/security-headers";
import { csrf } from "@tabirun/app/csrf";
import { cors } from "@tabirun/app/cors";
import { rateLimit } from "@tabirun/app/rate-limit";
import { bodySize } from "@tabirun/app/body-size";

const app = new TabiApp();

// Compose security middleware explicitly
app.use(securityHeaders({ referrerPolicy: "strict-origin" }));
app.use(csrf());
app.use(cors({ origin: "https://example.com" }));
app.use(rateLimit({ max: 100, windowMs: 60_000 }));
app.use(bodySize({ maxBytes: 1024 * 1024 })); // 1MB
```

## Consequences

### Benefits

- Applications include only needed protections
- Each middleware has clear, testable responsibility
- Configuration is explicit per feature
- Can compose in custom order
- Easier to understand individual security measures
- Can disable specific protections when needed (e.g., CSRF for API routes)

### Drawbacks

- More setup for comprehensive security
- Easy to forget a middleware (no "secure by default")
- Must understand each security measure
- Documentation must show recommended composition

### Security Modules

| Module             | Purpose                               |
| ------------------ | ------------------------------------- |
| `security-headers` | CSP, HSTS, X-Frame-Options, etc.      |
| `csrf`             | Cross-Site Request Forgery protection |
| `cors`             | Cross-Origin Resource Sharing         |
| `csp`              | Content Security Policy (detailed)    |
| `rate-limit`       | Request rate limiting                 |
| `body-size`        | Request body size limits              |

### Recommended Composition

For typical web applications:

```typescript
// Apply to all routes
app.use(securityHeaders());
app.use(bodySize());
app.use(rateLimit());

// Apply to browser-facing routes
app.use("/app/*", csrf());

// Apply to API routes
app.use("/api/*", cors({ origin: ALLOWED_ORIGINS }));
```

### Documentation Requirements

- Clear explanation of what each middleware protects against
- Recommended defaults for common scenarios
- Examples showing composition patterns
- Warnings about common misconfigurations
