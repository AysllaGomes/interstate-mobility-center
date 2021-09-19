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

  public active(): boolean {
    return true;
  }

  public async applyRoutes(server: express.Application): Promise<void> {
    /**
     * @swagger
     * /cotacao:
     *   post:
     *     description: Retorna a melhor cotação
     *     summary: Retorna a melhor cotação
     *     parameters:
     *      - in: body
     *        name: body
     *        required: true
     *        schema:
     *            $ref: '#/definitions/Cotacao'
     *        description: Objeto da cotação
     *     tags:
     *       - Cotacao
     *     responses:
     *       200:
     *         description: Retorna a melhor cotação
     *         schema:
     *             $ref: '#/definitions/CotacaoVencedora'
     *       412:
     *           $ref: '#/definitions/Error'
     *       500:
     *           $ref: '#/definitions/Error'
     */
    server.post(this.path, async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
      try {
        resp.json(await this.controller.retornaMelhorCotacao(req.body));
      } catch (error) {
        next(error);
      }
    });
  }
}
