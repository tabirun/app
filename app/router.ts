import type { TabiContext } from "./context.ts";

/**
 * Middleware function signature for Tabi applications.
 */
export type TabiMiddleware = (
  /**
   * The context for the current request.
   */
  context: TabiContext,
  /**
   * The next middleware function in the chain. Don't call this if you want to
   * stop the chain and return a response.
   */
  next: () => Promise<void> | void,
) => Promise<void> | void;

/**
 * Result returned from router matching
 */
export interface MatchResult {
  middleware: TabiMiddleware[];
  matchedRoutename: boolean;
  matchedMethod: boolean;
  params: { [key: string]: string };
  wildcard?: string;
}

/**
 * Router interface that all router implementations must follow.
 *
 * Implementations:
 * - LinearRouter (default): O(n) linear search, simple and predictable
 * - RadixRouter (future): O(log n) tree-based, for apps with many routes
 */
export interface TabiRouter {
  /**
   * Match middleware for a given request and extract parameters.
   */
  match(url: URL, method: string): MatchResult;

  /**
   * Get available methods for a given pathname.
   */
  getAvailableMethods(url: URL): string[];

  /**
   * Adds middleware to the router that will be run for every request.
   */
  use(...middleware: (TabiMiddleware | TabiMiddleware[])[]): void;

  /**
   * Adds middleware that will be run for every method.
   */
  all(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void;

  /**
   * Adds middleware for GET requests.
   */
  get(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void;

  /**
   * Adds middleware for POST requests.
   */
  post(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void;

  /**
   * Adds middleware for PUT requests.
   */
  put(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void;

  /**
   * Adds middleware for DELETE requests.
   */
  delete(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void;

  /**
   * Adds middleware for PATCH requests.
   */
  patch(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void;

  /**
   * Adds middleware for OPTIONS requests.
   */
  options(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void;

  /**
   * Adds middleware for HEAD requests.
   */
  head(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void;
}

// Re-export LinearRouter as default implementation
export { LinearRouter } from "../linear-router/mod.ts";
