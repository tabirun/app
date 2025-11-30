import { describe, it } from "@std/testing/bdd";
import { assertSpyCall, spy } from "@std/testing/mock";
import { TabiLogger } from "../logger.ts";

const logSpy = spy(console, "log");
const infoSpy = spy(console, "info");
const warnSpy = spy(console, "warn");
const errorSpy = spy(console, "error");

describe("TabiLogger", () => {
  it("should log a message with the 'success' level", () => {
    const logger = new TabiLogger("Tabi");
    logger.success("Test message");

    assertSpyCall(logSpy, 0, {
      args: ["\x1b[35m[Tabi]\x1b[0m\x1b[32m[Success]\x1b[0m Test message"],
    });
  });

  it("should log a message with the 'info' level", () => {
    const logger = new TabiLogger("Tabi");
    logger.info("Test message");

    assertSpyCall(infoSpy, 0, {
      args: ["\x1b[35m[Tabi]\x1b[0m\x1b[94m[Info]\x1b[0m Test message"],
    });
  });

  it("should log a message with the 'warn' level", () => {
    const logger = new TabiLogger("Tabi");
    logger.warn("Test message");

    assertSpyCall(warnSpy, 0, {
      args: ["\x1b[35m[Tabi]\x1b[0m\x1b[33m[Warn]\x1b[0m Test message"],
    });
  });

  it("should log a message with the 'error' level", () => {
    const logger = new TabiLogger("Tabi");
    logger.error("Test message");

    assertSpyCall(errorSpy, 0, {
      args: ["\x1b[35m[Tabi]\x1b[0m\x1b[31m[Error]\x1b[0m Test message"],
    });
  });

  it("should log an error object", () => {
    const logger = new TabiLogger("Tabi");
    logger.error(new Error("Test error"));

    assertSpyCall(errorSpy, 0, {
      args: ["\x1b[35m[Tabi]\x1b[0m\x1b[31m[Error]\x1b[0m Test message"],
    });
  });
});
