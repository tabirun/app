# ADR-011: Context-Based Request State

**Status:** Accepted

## Context

Middleware needs to share data through the request lifecycle:

- Authentication middleware sets user info
- Validation middleware sets parsed/validated input
- Request ID middleware sets correlation ID
- Handlers read data set by earlier middleware

Options:

**Mutate request object:**

- Simple but loses type safety
- Risk of property collisions
- Difficult to track what's set where

**Dependency injection:**

- Type-safe but complex setup
- Requires container configuration
- Over-engineering for simple cases

**Context object with get/set:**

- Explicit storage and retrieval
- Can be type-safe with generics
- Clear ownership of data

## Decision

Use `TabiContext` with `set(key, value)` / `get<T>(key)` for request-scoped
state.

```typescript
// Generic context storage
app.use(async (c, next) => {
  c.set("requestTime", Date.now());
  await next();
});

app.get("/", (c) => {
  const time = c.get<number>("requestTime");
  return c.json({ time });
});
```

For validated input, provide type-safe accessor pattern:

```typescript
const { validate, valid } = validator({
  json: z.object({ name: z.string() }),
  query: z.object({ page: z.coerce.number() }),
});

app.post("/users", validate, (c) => {
  const { json, query } = valid(c); // Fully typed
  // json.name is string, query.page is number
});
```

## Consequences

### Benefits

- Simple API for ad-hoc state sharing
- No global state - scoped to request
- Validator pattern provides full type safety
- UUID-based internal keys prevent collisions
- Explicit data flow (set before get)

### Drawbacks

- Generic `get<T>()` requires explicit type annotation
- Key management is application responsibility
- No compile-time guarantee that key was set
- Validator setup adds complexity for type safety

### Patterns

```typescript
// Constants for keys prevent typos
const USER_KEY = "auth:user";
c.set(USER_KEY, user);
const user = c.get<User>(USER_KEY);

// Middleware can check if value exists
if (c.get("auth:user")) {
  // Authenticated
}
```

### Type Safety Spectrum

1. **Weakest:** `c.get("key")` - returns `unknown`
2. **Medium:** `c.get<Type>("key")` - typed but not verified
3. **Strongest:** `valid(c).json` - compile-time type from schema
