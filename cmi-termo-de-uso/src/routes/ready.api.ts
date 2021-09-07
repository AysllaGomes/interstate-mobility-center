import express from "express";
import { ApiRouter } from "./api.router";

export class ReadyApi extends ApiRouter {
  public active(): boolean {
    return true;
  }

  public applyRoutes(server: express.Application): void {
    server.get("/ready", async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
      try {
        resp.json("ok");
        return next();
      } catch (error) {
        return next(error);
      }
    });
  }
}
