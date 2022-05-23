import express from "express";
import { ApiRouter } from "./api.router";
import { ParceiroController } from "../controllers/Parceiro.controller";

export class ParceiroApi extends ApiRouter {
  private readonly path: string;

  private readonly controller = new ParceiroController({});

  constructor() {
    super();
    this.path = "/parceiro";
  }

  public active(): boolean { return true; }

  public async applyRoutes(server: express.Application): Promise<void> {
    /**
     * @swagger
     * /parceiro/dados:
     *   get:
     *     description: Retorna dados dos parceiros
     *     summary: Retorna dados dos parceiros
     *     parameters:
     *     tags:
     *       - parceiro
     *     responses:
     *       200:
     *         description: Retorna um token
     *         type: String
     *       412:
     *           $ref: '#/definitions/Error'
     *       500:
     *           $ref: '#/definitions/Error'
     */
    server.get(`${this.path}/dados`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
      try {
        return response.json(await this.controller.retornaDadosDosParceirosComToken());
      } catch (error) {
        next(error);
      }
    });

    /**
     * @swagger
     * /parceiro/dados:
     *   get:
     *     description: Retorna dados dos parceiros
     *     summary: Retorna dados dos parceiros
     *     parameters:
     *     tags:
     *       - parceiro
     *     responses:
     *       200:
     *         description: Retorna um token
     *         type: String
     *       412:
     *           $ref: '#/definitions/Error'
     *       500:
     *           $ref: '#/definitions/Error'
     */
    server.get(`${this.path}/dadosParceiro`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
      try {
        return response.json(await this.controller.retornaDadosDosParceiros(request.query.todosOsParceiros?.toString()));
      } catch (error) {
        next(error);
      }
    });
  }
}
