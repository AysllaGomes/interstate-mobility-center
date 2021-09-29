import express from "express";
import { ApiRouter } from "./api.router";
import { LogController } from "../controllers/Log.controller";

export class LogApi extends ApiRouter {
    private readonly path: string;

    private readonly logController = new LogController({});

    constructor() {
      super();
      this.path = "/log";
    }

    public active(): boolean {
      return true;
    }

    public async applyRoutes(server: express.Application): Promise<void> {
      /**
         * @swagger
         *   /log/api:
         *   post:
         *     description: Salva uma lista de logs que o App informa
         *     summary: Endpoint responsável por salvar uma lista de logs que o App informa
         *     tags:
         *       - Log
         *     parameters:
         *      - in: body
         *        name: Array<IInputLogMobilidade>
         *        description: Uma lista de objetos do tipo IInputLogMobilidade
         *        required: true
         *        schema:
         *          $ref: '#/definitions/IInputLogMobilidade'
         *     responses:
         *       200:
         *         description: Lista de resposta que contem todos os objetos que foram salvos no banco de dados
         *         schema:
         *             $ref: '#/definitions/LogMobilidade'
         */
      server.post(`${this.path}/api`, async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
        try {
          return resp.json(await this.logController.gerenciaLog(req.body));
        } catch (error) {
          next(error);
        }
      });
    }
}
