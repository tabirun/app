import { afterAll, beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import { TabiTestServer } from "../../../test-utils/server.ts";

let server: TabiTestServer;

beforeAll(() => {
  server = new TabiTestServer();

  server.start();
});

afterAll(async () => {
  await server.stop();
});

describe("routing - not found", () => {
  it("should send 404 when route not matched", async () => {
    const response = await fetch(server.url("/"), {
      method: "GET",
    });

    expect(response.status).toEqual(404);
    expect(await response.text()).toBe("Not Found");
  });

  it("should not handle OPTIONS requests", async () => {
    const response = await fetch(server.url("/"), {
      method: "OPTIONS",
    });

    expect(response.status).toEqual(204);
    expect(response.headers.get("Allow")).toBe("");
    expect(await response.text()).toBe("");
  });
});
