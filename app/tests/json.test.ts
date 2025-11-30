import { afterAll, beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { TabiTestServer } from "../../test-utils/server.ts";

let server: TabiTestServer;

beforeAll(() => {
  server = new TabiTestServer();

  server.app.get("/", (c) => {
    c.json({ message: "Hello, World!" });
  });

  server.start();
});

afterAll(async () => {
  await server.stop();
});

describe("responses - json", () => {
  it("should return json response", async () => {
    const response = await fetch(server.url("/"), {
      method: "GET",
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe(
      "application/json; charset=UTF-8",
    );
    expect(await response.json()).toEqual({ message: "Hello, World!" });
  });
});
