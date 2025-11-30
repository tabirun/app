import { TabiContext } from "./context.ts";
import { compose } from "./compose.ts";
import { LinearRouter } from "../linear-router/linear-router.ts";
import type { TabiMiddleware, TabiRouter } from "./router.ts";
import { options } from "./options.ts";
import { notFound } from "./not-found.ts";
import { methodNotAllowed } from "./method-not-allowed.ts";
import { statusText } from "../status/mod.ts";
import type { Status } from "../status/mod.ts";
import { TabiRequest } from "./request.ts";
import { TabiError } from "./error.ts";

/**
 * Options for creating a TabiApp
 */
export interface TabiAppOptions {
  /** Custom router implementation (defaults to LinearRouter) */
  router?: TabiRouter;
}

/**
 * TabiApp is the main class for creating and running Tabi applications.
 */
export class TabiApp {
  private _router: TabiRouter;

  constructor(options?: TabiAppOptions) {
    this._router = options?.router ?? new LinearRouter();
  }

  /**
   * Register global middleware that runs for every request.
   */
  public use(...middleware: (TabiMiddleware | TabiMiddleware[])[]): void {
    this._router.use(...middleware);
  }

  /**
   * Register middleware for all HTTP methods.
   * Accepts optional route pattern to limit which paths the middleware runs for.
   */
  public all(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void {
    this._router.all(routenameOrMiddleware, ...middleware);
  }

  /**
   * Register middleware for GET and HEAD requests.
   */
  public get(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void {
    this._router.get(routenameOrMiddleware, ...middleware);
  }

  /**
   * Register middleware for POST requests.
   */
  public post(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void {
    this._router.post(routenameOrMiddleware, ...middleware);
  }

  /**
   * Register middleware for PUT requests.
   */
  public put(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void {
    this._router.put(routenameOrMiddleware, ...middleware);
  }

  /**
   * Register middleware for DELETE requests.
   */
  public delete(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void {
    this._router.delete(routenameOrMiddleware, ...middleware);
  }

  /**
   * Register middleware for PATCH requests.
   */
  public patch(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void {
    this._router.patch(routenameOrMiddleware, ...middleware);
  }

  /**
   * Register middleware for OPTIONS requests.
   */
  public options(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void {
    this._router.options(routenameOrMiddleware, ...middleware);
  }

  /**
   * Register middleware for HEAD requests.
   */
  public head(
    routenameOrMiddleware: string | TabiMiddleware | TabiMiddleware[],
    ...middleware: (TabiMiddleware | TabiMiddleware[])[]
  ): void {
    this._router.head(routenameOrMiddleware, ...middleware);
  }

  /** Handler function that processes incoming requests and returns responses */
  public handler: (req: Request) => Promise<Response> = this._handler.bind(
    this,
  );

  private async _handler(req: Request) {
    const url = new URL(req.url);

    try {
      const matchResult = this._router.match(url, req.method);

      const c: TabiContext = new TabiContext({
        req: new TabiRequest(req, {
          params: matchResult.params,
          wildcard: matchResult.wildcard,
        }),
      });

      const getAllowedMethods = () => this._router.getAvailableMethods(url);

      const middleware = [
        options({
          getAllowedMethods,
        }),
        ...matchResult.middleware,
      ];

      if (!matchResult.matchedRoutename) {
        middleware.push(notFound());
      }

      if (!matchResult.matchedMethod) {
        middleware.push(
          methodNotAllowed({
            getAllowedMethods,
          }),
        );
      }

      await compose(middleware)(c);

      return c.res.finalize();
    } catch (error) {
      let status: Status = 500;
      if (error instanceof TabiError) {
        status = error.status;
      }

      const c: TabiContext = new TabiContext({
        req: new TabiRequest(req, {
          params: {},
        }),
      });

      c.text(
        statusText(status),
        status,
      );

      return c.res.finalize();
    }
  }
}
