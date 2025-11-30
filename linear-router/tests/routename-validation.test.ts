import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { LinearRouter } from "../linear-router.ts";
import { TabiError } from "../../app/error.ts";

describe("LinearRouter - routename validation", () => {
  it("should allow valid root route", () => {
    const router = new LinearRouter();

    expect(() => {
      router.get("/", () => {});
    }).not.toThrow();
  });

  it("should allow valid static routes", () => {
    const router = new LinearRouter();

    expect(() => {
      router.get("/users", () => {});
      router.get("/api/users", () => {});
      router.get("/api/v1/users", () => {});
    }).not.toThrow();
  });

  it("should allow valid parameterized routes", () => {
    const router = new LinearRouter();

    expect(() => {
      router.get("/users/:id", () => {});
      router.get("/users/:userId/posts/:postId", () => {});
    }).not.toThrow();
  });

  it("should allow valid wildcard routes", () => {
    const router = new LinearRouter();

    expect(() => {
      router.get("/files/*", () => {});
      router.get("/docs/:section/*", () => {});
    }).not.toThrow();
  });

  it("should throw for empty route pattern", () => {
    const router = new LinearRouter();

    let error: unknown;
    try {
      router.get("", () => {});
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(TabiError);
    expect((error as TabiError).message).toContain("cannot be empty");
    expect((error as TabiError).message).toContain('Use "/" for root');
  });

  it("should throw for route not starting with /", () => {
    const router = new LinearRouter();

    let error: unknown;
    try {
      router.get("users/:id", () => {});
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(TabiError);
    expect((error as TabiError).message).toContain('must start with "/"');
    expect((error as TabiError).message).toContain("users/:id");
  });

  it("should throw for consecutive slashes in route pattern", () => {
    const router = new LinearRouter();

    let error: unknown;
    try {
      router.get("/users//posts", () => {});
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(TabiError);
    expect((error as TabiError).message).toContain(
      "consecutive slashes",
    );
    expect((error as TabiError).message).toContain("/users//posts");
  });

  it("should throw for wildcard in middle of route", () => {
    const router = new LinearRouter();

    let error: unknown;
    try {
      router.get("/files/*/download", () => {});
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(TabiError);
    expect((error as TabiError).message).toContain(
      'Wildcard "*" must be the last segment',
    );
    expect((error as TabiError).message).toContain("/files/*/download");
  });

  it("should throw for multiple wildcards", () => {
    const router = new LinearRouter();

    let error: unknown;
    try {
      router.get("/files/*/backup/*", () => {});
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(TabiError);
    expect((error as TabiError).message).toContain(
      'Wildcard "*" must be the last segment',
    );
  });

  it("should throw for duplicate parameter names", () => {
    const router = new LinearRouter();

    let error: unknown;
    try {
      router.get("/users/:id/posts/:id", () => {});
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(TabiError);
    expect((error as TabiError).message).toContain(
      "Duplicate parameter name",
    );
    expect((error as TabiError).message).toContain(":id");
  });

  it("should throw for empty parameter name", () => {
    const router = new LinearRouter();

    let error: unknown;
    try {
      router.get("/users/:", () => {});
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(TabiError);
    expect((error as TabiError).message).toContain(
      "Parameter name cannot be empty",
    );
    expect((error as TabiError).message).toContain("/users/:");
  });

  it("should allow same param name in different routes", () => {
    const router = new LinearRouter();

    expect(() => {
      router.get("/users/:id", () => {});
      router.get("/posts/:id", () => {}); // Different route, same param name is OK
    }).not.toThrow();
  });

  it("should throw for multiple validation errors (consecutive slashes example)", () => {
    const router = new LinearRouter();

    // First error encountered should be thrown
    expect(() => {
      router.get("/users///:id//posts", () => {});
    }).toThrow(TabiError);
  });

  it("should validate all HTTP method registration functions", () => {
    const router = new LinearRouter();

    // All these should throw for invalid wildcard position
    expect(() => router.all("/files/*/download", () => {})).toThrow(
      TabiError,
    );
    expect(() => router.get("/files/*/download", () => {})).toThrow(
      TabiError,
    );
    expect(() => router.post("/files/*/download", () => {})).toThrow(
      TabiError,
    );
    expect(() => router.put("/files/*/download", () => {})).toThrow(
      TabiError,
    );
    expect(() => router.delete("/files/*/download", () => {})).toThrow(
      TabiError,
    );
    expect(() => router.patch("/files/*/download", () => {})).toThrow(
      TabiError,
    );
    expect(() => router.options("/files/*/download", () => {})).toThrow(
      TabiError,
    );
    expect(() => router.head("/files/*/download", () => {})).toThrow(
      TabiError,
    );
  });

  it("should allow complex valid routes", () => {
    const router = new LinearRouter();

    expect(() => {
      router.get(
        "/api/v1/users/:userId/posts/:postId/comments/:commentId",
        () => {},
      );
      router.get("/docs/:lang/:version/*", () => {});
      router.get("/a/b/c/d/e/f/g", () => {}); // Many segments
    }).not.toThrow();
  });

  it("should throw descriptive errors for trailing slashes in pattern", () => {
    const router = new LinearRouter();

    // Note: Trailing slash creates empty segment
    let error: unknown;
    try {
      router.get("/users/", () => {});
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(TabiError);
    // This triggers empty segment error (from trailing slash)
    expect((error as TabiError).message).toContain("empty segment");
  });
});
