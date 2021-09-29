import express from "express";
import { ApiRouter } from "./api.router";
import { ContratoController } from "../controllers/Contrato.controller";

export class ContratoApi extends ApiRouter {
    private readonly path: string;

    private readonly controller = new ContratoController({});

    constructor() {
      super();
      this.path = "/contrato";
    }

    public active(): boolean {
      return true;
    }

    public async applyRoutes(server: express.Application): Promise<void> {
      /**
         * @swagger
         *   /contrato/abertura:
         *   post:
         *     description: Realiza a abertura de um contrato
         *     summary: EndPoint que realiza a abertura de um contrato
         *     tags:
         *       - Contrato
         *     parameters:
         *      - in: body
         *        name: IAberturaContrato
         *        description: Um objeto do tipo IAberturaContrato
         *        required: true
         *        schema:
         *          $ref: '#/definitions/IAberturaContrato'
         *     responses:
         *       200:
         *         description: Lista de resposta que contem todos os objetos que foram salvos no banco de dados
         *         schema:
         *             $ref: '#/definitions/Contrato'
         */
      server.post(`${this.path}/abertura`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          return response.json(await this.controller.abertura(request.body));
        } catch (error) {
          next(error);
        }
      });
    }
}
