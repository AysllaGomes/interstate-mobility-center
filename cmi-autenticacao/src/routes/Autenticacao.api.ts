import express from "express";
import { ApiRouter } from "./api.router";
import { AutenticacaoController } from "../controllers/Autenticacao.controller";

export class AutenticacaoApi extends ApiRouter {
  private readonly path: string;

  private readonly controller = new AutenticacaoController({});

  constructor() {
    super();
    this.path = "/autenticacao";
  }

  public active(): boolean { return true; }

  public async applyRoutes(server: express.Application): Promise<void> {
    /**
     * @swagger
     * /autenticacao/token/{parceiro}:
     *   get:
     *     description: Retorna o token do parceiro
     *     summary: Retorna o token do parceiro
     *     parameters:
     *      - in: path
     *        name: parceiro
     *        required: true
     *     tags:
     *       - Autenticacao
     *     responses:
     *       200:
     *         description: Retorna um token
     *         type: String
     *       412:
     *           $ref: '#/definitions/Error'
     *       500:
     *           $ref: '#/definitions/Error'
     */
    server.get(`${this.path}/token/:parceiro`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
      try {
        response.json(await this.controller.token(request.params.parceiro));
        next();
      } catch (error) {
        next(error);
      }
    });

    /**
     * @swagger
     * /autenticacao/token:
     *   get:
     *     description: Retorna o(s) parceiro(s) e seu(s) respectivo(s) token(s)
     *     summary: Retorna o(s) parceiro(s) e seu(s) respectivo(s) token(s)
     *     tags:
     *       - Autenticacao
     *     responses:
     *       200:
     *         description: Retorna o(s) parceiro(s) e seu(s) respectivo(s) token(s)
     *         schema:
     *             $ref: '#/definitions/Autenticacao'
     *       412:
     *           $ref: '#/definitions/Error'
     *       500:
     *           $ref: '#/definitions/Error'
     */
    server.get(`${this.path}/token`, async (req: express.Request, response: express.Response, next: express.NextFunction) => {
      try {
        response.json(await this.controller.tokenParceiros());
        next();
      } catch (error) {
        next(error);
      }
    });
  }
}
