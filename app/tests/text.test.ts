import { afterAll, beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { TabiTestServer } from "../../test-utils/server.ts";

let server: TabiTestServer;

beforeAll(() => {
  server = new TabiTestServer();

  server.app.get("/", (c) => {
    c.text("Hello, World!");
  });

  server.start();
});

afterAll(async () => {
  await server.stop();
});

describe("responses - text", () => {
  it("should return text response", async () => {
    const response = await fetch(server.url("/"), {
      method: "GET",
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe(
      "text/plain; charset=UTF-8",
    );
    expect(await response.text()).toBe("Hello, World!");
  });
});
