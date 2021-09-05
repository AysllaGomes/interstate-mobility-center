import express from "express";
import { ApiRouter } from "./api.router";
import { environment } from "../config/environment";

export class HealthApi extends ApiRouter {
  public active(): boolean {
    return true;
  }

  public applyRoutes(server: express.Application): void {
    server.get(
      "/health",
      async (
        req: express.Request,
        resp: express.Response,
        next: express.NextFunction,
      ) => {
        try {
          resp.json("pong");
          return next();
        } catch (error) {
          return next(error);
        }
      },
    );
    server.get(
      "/info",
      async (
        req: express.Request,
        resp: express.Response,
        next: express.NextFunction,
      ) => {
        try {
          resp.json(environment);
          return next();
        } catch (error) {
          return next(error);
        }
      },
    );
  }
}
