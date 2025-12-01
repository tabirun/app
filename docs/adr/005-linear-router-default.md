# ADR-005: Linear Router as Default Implementation

**Status:** Accepted

## Context

Route matching algorithms have different trade-offs:

**Linear scan O(n):**

- Simple implementation
- Predictable matching order
- Performance degrades with route count
- Easy to debug

**Radix tree O(k) where k = path length:**

- Fast for large route sets
- Complex implementation
- Matching order less intuitive
- Harder to debug edge cases

**Compiled regex:**

- Very fast after compilation
- Complex to implement correctly
- Startup cost for compilation

For a minimal framework targeting small-to-medium applications, simplicity and
predictability may outweigh raw performance.

## Decision

Implement `LinearRouter` as the default router, with a pluggable `TabiRouter`
interface allowing alternative implementations.

```typescript
interface TabiRouter {
  add(method: string, path: string, handler: TabiHandler): void;
  match(method: string, path: string): RouteMatch | null;
}
```

Route matching priority:

1. Static routes (exact match)
2. Parameterized routes (`:id`)
3. Wildcard routes (`*`)

Within each category, first registered wins.

## Consequences

### Benefits

- Predictable matching (registration order within priority tiers)
- Simple debugging (linear search, clear priority rules)
- Easy to implement path traversal protection
- Sufficient performance for typical applications (<100 routes)
- Clear mental model for users

### Drawbacks

- O(n) matching per request
- Not suitable for applications with thousands of routes
- May need optimization for high-traffic scenarios

### Future Options

- `RadixRouter` can be added as alternative implementation
- Users can implement custom routers via `TabiRouter` interface
- Router choice doesn't affect application code (same API)

### Security

Linear router enables straightforward path traversal protection:

- Decode URL parameters
- Block `../`, `..\\`, and encoded variants
- Return 400 Bad Request on traversal attempts
