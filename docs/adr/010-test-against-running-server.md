# ADR-010: Test Against Running Server

**Status:** Accepted

## Context

Framework tests can be structured as:

**Unit tests with mocks:**

- Mock request/response objects
- Test functions in isolation
- Fast execution
- May miss integration issues

**Integration tests against real server:**

- Start actual HTTP server
- Make real network requests
- Slower but higher confidence
- Tests match production behavior

**Hybrid approach:**

- Unit tests for pure functions
- Integration tests for HTTP behavior

## Decision

All Tabi tests use `TabiTestServer` to run actual HTTP requests against a real
server instance.

```typescript
describe("routing - parameters", () => {
  let server: TabiTestServer;

  beforeAll(() => {
    const app = new TabiApp();
    app.get("/users/:id", (c) => {
      return c.json({ id: c.req.param("id") });
    });

    server = new TabiTestServer(app);
    server.start(); // Random port
  });

  it("extracts route parameters", async () => {
    const res = await fetch(server.url("/users/123"));
    const json = await res.json();
    expect(json.id).toBe("123");
  });

  afterAll(async () => {
    await server.stop();
  });
});
```

## Consequences

### Benefits

- Tests verify actual behavior, not mocked behavior
- Catches integration issues (header handling, encoding, content negotiation)
- Test execution path matches production
- No complex mocking infrastructure
- Tests serve as executable documentation

### Drawbacks

- Slower than unit tests (network overhead)
- Requires port management (use port 0 for random assignment)
- Tests are inherently integration-level
- Harder to test internal edge cases
- Parallel test execution needs care (port conflicts)

### Test Infrastructure

`TabiTestServer` provides:

- Automatic random port assignment
- URL builder for requests
- Clean start/stop lifecycle
- Works with BDD-style tests (describe/it/beforeAll/afterAll)

### Test Philosophy

- Test behavior, not implementation
- One test file per feature
- Realistic test data (no "foo", "bar", "test123")
- Mock only at true system boundaries (if ever)
