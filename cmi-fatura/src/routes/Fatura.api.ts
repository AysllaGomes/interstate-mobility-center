import express from "express";
import { ApiRouter } from "./api.router";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import { FaturaController } from "../controllers/Fatura.controller";

export class FaturaApi extends ApiRouter {
    private readonly path: string;

    private readonly faturaController = new FaturaController({});

    constructor() {
      super();
      this.path = "/fatura";
    }

    public active(): boolean { return true; }

    public async applyRoutes(server: express.Application): Promise<void> {
      server.post(`${this.path}/aberturaFatura`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          return response.json(await this.faturaController.aberturaFatura(request.body));
        } catch (error) {
          logger.error(`
          ERRO no MS "${environment.app.name}", método "API ${this.path}/aberturaFatura".
          <'ERRO'>
            message: Não foi possível realizar a abertura da fatura, com os paramêtros informados...
          Parâmetros da requisição:
            URL DE REQUISIÇão: ${this.path}/aberturaFatura
            ERRO: ${error}
        `);
          next(error);
        }
      });
    }
}
