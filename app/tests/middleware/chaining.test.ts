import { afterAll, beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { TabiTestServer } from "../../../test-utils/server.ts";
import type { TabiMiddleware } from "../../mod.ts";

let server: TabiTestServer;

const increment: TabiMiddleware = async (c, next) => {
  const value = c.get<number | undefined>("value") ?? 0;
  c.set("value", value + 1);
  await next();
};

beforeAll(() => {
  server = new TabiTestServer();

  server.app.use(
    increment,
    [increment, increment],
  );

  server.app.get("/four", (c) => {
    c.text(c.get<number>("value").toString());
  });

  server.app.get("/five", increment, (c) => {
    c.text(c.get<number>("value").toString());
  });

  server.start();
});

afterAll(async () => {
  await server.stop();
});

describe("middleware - chaining", () => {
  it("should apply middleware to all routes - three", async () => {
    const response = await fetch(server.url("/four"), {
      method: "GET",
    });

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("3");
  });

  it("should apply middleware to specific routes - four", async () => {
    const response = await fetch(server.url("/five"), {
      method: "GET",
    });

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("4");
  });
});
