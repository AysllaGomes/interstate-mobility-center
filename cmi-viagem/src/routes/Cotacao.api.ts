import express from "express";
import { ApiRouter } from "./api.router";
import { CotacaoController } from "../controllers/Cotacao.controller";

export class CotacaoApi extends ApiRouter {
  private readonly path: string;

  private readonly controller = new CotacaoController({});

  constructor() {
    super();
    this.path = "/cotacao";
  }

  public active(): boolean { return true; }

  public async applyRoutes(server: express.Application): Promise<void> {
    server.post(this.path, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
      try {
        return response.json(await this.controller.cotacao(request.body));
      } catch (error) { next(error); }
    });
  }
}
