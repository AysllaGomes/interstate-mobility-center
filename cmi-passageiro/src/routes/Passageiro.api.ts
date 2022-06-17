import express from "express";
import { ApiRouter } from "./api.router";
import { PassageiroController } from "../controllers/Passageiro.controller";
import { IInputDetalhamentoViagem } from "../model/interfaces/InputDetalhamentoViagem";

export class PassageiroApi extends ApiRouter {
    private readonly path: string;

    private readonly passageiroController = new PassageiroController({});

    constructor() {
      super();
      this.path = "/passageiro";
    }

    public active(): boolean { return true; }

    public async applyRoutes(server: express.Application): Promise<void> {
      /**
         * @swagger
         *   /passageiro/vinculoPassageiro:
         *   post:
         *     description: Realiza a abertura de um novo passageiro, caso seja possível
         *     summary: EndPoint que realiza de um novo passageiro, caso seja possível
         *     tags:
         *       - Usuário
         *     parameters:
         *      - in: body
         *        name: Array<IVinculoPassageiro>
         *        description: Um objeto do tipo IVinculoPassageiro
         *        required: true
         *        schema:
         *          $ref: '#/definitions/IVinculoPassageiro'
         *     responses:
         *       200:
         *         description: Lista de resposta que contem todos os objetos que foram salvos no banco de dados
         *         schema:
         *             $ref: '#/definitions/Passageiro'
         */
      server.post(`${this.path}/vinculoPassageiro`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          return response.json(await this.passageiroController.vinculoPassageiro(request.body));
        } catch (error) { next(error); }
      });

      server.get(`${this.path}/detalhamentoViagem`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          const body: IInputDetalhamentoViagem = {
            idUsuario: request.headers["id-usuario"] ? String(request.headers["id-usuario"]) : "",
            idViagem: request.headers["id-viagem"] ? String(request.headers["id-viagem"]) : "",
            dataRefencia: request.headers.data ? String(request.headers.data) : "",
          };

          return response.json(await this.passageiroController.detalhamentoViagem(body));
        } catch (error) { next(error); }
      });
    }
}
