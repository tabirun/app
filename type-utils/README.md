# type-utils

Type utilities for internal use.

## Installation

```typescript
import { type PublicOf } from "@tabirun/app/type-utils";
```

## Usage

```typescript
class MyClass {
  private _secret = "hidden";
  public name = "visible";
  public greet() {
    return "hello";
  }
}

type MyPublicAPI = PublicOf<MyClass>;
// { name: string; greet: () => string }
```

## Types

- `PublicOf<T>` - Extracts public interface of a class or object
