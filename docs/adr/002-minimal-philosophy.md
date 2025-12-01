# ADR-002: Minimal Framework Philosophy

**Status:** Accepted

## Context

Web frameworks exist on a spectrum:

**Batteries-included** (Rails, Django, Nest.js):

- Prescriptive structure and conventions
- Built-in ORM, auth, sessions, templating
- Faster initial development, steeper learning curve
- Harder to deviate from conventions

**Minimal** (Express, Fastify, Hono):

- Core routing and middleware only
- Bring your own everything else
- More setup, more flexibility
- Explicit over implicit

Tabi needs to choose where on this spectrum to position itself.

## Decision

Tabi follows a minimal, explicit, no-magic philosophy.

Core principles:

- **No implicit behavior** - Every feature must be explicitly enabled
- **No hidden state** - Request/response flow is predictable and traceable
- **No framework lock-in** - Standard interfaces over proprietary abstractions
- **Composition over inheritance** - Build applications by composing small
  pieces

The framework provides:

- Request/response handling
- Routing
- Middleware composition
- Core utilities (cookies, validation, compression)

The framework does not provide:

- Database/ORM layer
- Authentication/authorization
- Session management
- Templating engine
- Background jobs
- Email sending

## Consequences

### Benefits

- Smaller bundle size (only include what you use)
- Easier to understand (less magic to learn)
- Predictable behavior (explicit composition)
- Flexible architecture (no prescribed patterns)
- Easier to test (fewer hidden dependencies)
- Security benefits (smaller attack surface)

### Drawbacks

- More initial setup for common features
- Must choose and integrate third-party solutions
- Less guidance for application structure
- Potential for inconsistency across applications

### Implications

- Documentation must clearly show composition patterns
- Example applications should demonstrate common setups
- Middleware should be independently useful
- Each feature should have single, clear responsibility
