# ADR-004: Standard Schema for Validation Library Agnosticism

**Status:** Accepted

## Context

Runtime validation at API boundaries is essential for security and type safety.
Popular validation libraries include:

- **Zod** - TypeScript-first, excellent inference, large bundle
- **Valibot** - Smaller bundle, modular design
- **ArkType** - Fast runtime, complex syntax
- **Yup** - Mature, widespread adoption
- **Joi** - Battle-tested, verbose API

Each has different APIs, performance characteristics, and bundle sizes. Coupling
the framework to one library forces that choice on all users.

The `@standard-schema/spec` initiative defines a common interface that
validation libraries can implement, enabling interoperability.

## Decision

Use the Standard Schema interface (`@standard-schema/spec`) for all validation
integration. Provide Zod as the reference implementation in documentation and
examples.

```typescript
import type { StandardSchemaV1 } from "@standard-schema/spec";

interface ValidatorConfig {
  json?: StandardSchemaV1;
  query?: StandardSchemaV1;
  params?: StandardSchemaV1;
  form?: StandardSchemaV1;
}
```

Users can use any Standard Schema-compatible library:

```typescript
// With Zod
import { z } from "zod";
const schema = z.object({ name: z.string() });

// With Valibot
import * as v from "valibot";
const schema = v.object({ name: v.string() });

// Both work with Tabi's validator
const { validate, valid } = validator({ json: schema });
```

## Consequences

### Benefits

- No lock-in to specific validation library
- Users choose based on their preferences (bundle size, API, performance)
- Middleware remains library-agnostic
- Future libraries automatically compatible if they implement Standard Schema

### Drawbacks

- Slightly more complex type signatures
- Must document which libraries support Standard Schema
- Error message format varies by library
- Testing should cover multiple schema implementations

### Implementation Notes

- Validator middleware accepts any `StandardSchemaV1` compliant schema
- Type inference works through Standard Schema's `InferOutput` type
- Error reporting can be customized via `onError` option
