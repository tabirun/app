import type { TabiContext as PrivateTabiContext } from "./context.ts";
import type { TabiRequest as PrivateTabiRequest } from "./request.ts";
import type { PublicOf } from "../type-utils/utils.ts";

export { TabiApp } from "./app.ts";
export type { TabiAppOptions } from "./app.ts";
export type { MatchResult, TabiMiddleware, TabiRouter } from "./router.ts";
export { LinearRouter } from "../linear-router/mod.ts";
export { TabiError } from "./error.ts";
export { TabiResponse } from "./response.ts";

/**
 * Context object that is passed to each middleware. It persists throughout the
 * request/response cycle and is used to interact with the request and response.
 */
export type TabiContext = PublicOf<PrivateTabiContext>;

/**
 * Wrapper around the Request object that provides memoized access to the body.
 *
 * This is useful because the body of a request can only be read once. If you
 * read the body of a request, and then try to read it again, you will get an
 * error. This class memoizes the body of the request so that you can read it
 * multiple times by middleware.
 */
export type TabiRequest = PublicOf<PrivateTabiRequest>;
