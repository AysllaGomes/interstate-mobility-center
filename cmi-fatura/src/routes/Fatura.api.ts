import express from "express";
import { ApiRouter } from "./api.router";
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
      /**
         * @swagger
         *   /fatura/aberturaFatura:
         *   post:
         *     description: Realiza a abertura de uma nova fatura, caso seja possível
         *     summary: EndPoint que realiza de um nova fatura, caso seja possível
         *     tags:
         *       - Usuário
         *     parameters:
         *      - in: body
         *        name: IAberturaFatura
         *        description: Um objeto do tipo IAberturaFatura
         *        required: true
         *        schema:
         *          $ref: '#/definitions/IAberturaFatura'
         *     responses:
         *       200:
         *         description: Lista de resposta que contem todos os objetos que foram salvos no banco de dados
         *         schema:
         *             $ref: '#/definitions/FaturaContratoMobilidade'
         */
      server.post(`${this.path}/aberturaFatura`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          return response.json(await this.faturaController.aberturaFatura(request.body));
        } catch (error) { next(error); }
      });

      /**
         * @swagger
         *   /fatura/encerrar:
         *   post:
         *     description: Fechar a fatura do idFaturaContratoMobilidade informado.
         *     summary: Fechar a fatura
         *     parameters:
         *      - in: body
         *        name: 'idFaturaContratoMobilidade'
         *        required: true
         *     tags:
         *       - Fatura
         *     responses:
         *       200:
         *         description: Retorna um false em caso de erro ou a FaturaContratoMobilidadeInterface no caso ok
         *         type: FaturaContratoMobilidadeInterface | false
         */
      server.post(`${this.path}/encerrar`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          response.json(await this.faturaController.encerrarFatura(request.body));
        } catch (error) { next(error); }
      });
    }
}
