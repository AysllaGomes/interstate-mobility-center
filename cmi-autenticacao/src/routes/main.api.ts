import express from "express";
import { environment } from "../config/environment";
import { ApiRouter } from "./api.router";

export class MainApi extends ApiRouter {
  public active(): boolean {
    return true;
  }

  public applyRoutes(server: express.Application): void {
    server.get(
      "/",
      async (
        req: express.Request,
        resp: express.Response,
        next: express.NextFunction,
      ) => {
        try {
          resp.json({
            app: {
              name: environment.app.name,
              version: environment.app.version,
            },
            paths: {
              main: "/",
              info: "/info",
              metrics: "/metrics",
              health: "/health",
              ready: "/ready",
              errors: "/errors",
              docs: "/api-docs",
            },
          });
          return next();
        } catch (error) {
          next(error);
        }
      },
    );
  }
}
