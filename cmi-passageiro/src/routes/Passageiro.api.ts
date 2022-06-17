import express from "express";
import { ApiRouter } from "./api.router";
import { PassageiroController } from "../controllers/Passageiro.controller";
import { IInputDetalharViagem } from "../model/interfaces/InputDetalharViagem";
import { IInputListarViagensVincularAoUsario } from "../model/interfaces/InputListarViagensVincularAoUsario";

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

      server.get(`${this.path}/listarViagensVinculadoAoUsuario`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          const body: IInputListarViagensVincularAoUsario = {
            idUsuario: request.headers["id-usuario"] ? String(request.headers["id-usuario"]) : "",
          };

          return response.json(await this.passageiroController.listarViagensVinculadoAoUsuario(body));
        } catch (error) { next(error); }
      });

      server.get(`${this.path}/detalharViagem`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          const body: IInputDetalharViagem = {
            idPassageiro: request.headers["id-passageiro"] ? String(request.headers["id-passageiro"]) : "",
          };

          return response.json(await this.passageiroController.detalharViagem(body));
        } catch (error) { next(error); }
      });

      /**
       * @swagger
       *   /passageiro/desativar:
       *   put:
       *     description: Busca um passageiro e desativa a viagem, caso se possível
       *     summary: Realiza a busca de um passageiro e realiza a desativação da viagem, caso seja possível
       *     parameters:
       *      - in: body
       *        name: IInputDesativarViagem
       *        description: Objeto do tipo IInputDesativarViagem
       *        required: true
       *        schema:
       *          $ref: '#/definitions/IInputDesativarViagem'
       *     tags:
       *       - Passageiro
       *     responses:
       *       200:
       *         description: Retorna os dados do passageiro.
       *         schema:
       *             $ref: '#/definitions/IOutputDesativarViagem'
       *       422-1:
       *         description: Erro Negocial
       *         schema:
       *            $ref: '#/definitions/Erro_SQL_ao_Desativar_Passageiro'
       *       422-2:
       *         description: Erro SQL não encontrando o passageiro informado.
       *         schema:
       *            $ref: '#/definitions/Erro_SQL_ao_Verificar_se_Passageiro_Existe_na_base_de_dados'
       *       422-3:
       *         description: Erro SQL estado Suspenso.
       *         schema:
       *            $ref: '#/definitions/Erro_SQL_ao_Verificar_se_Passageiro_tem_Condicoes_para_Desativar'
       */
      server.put(`${this.path}/desativar`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          return response.json(await this.passageiroController.desativar(request.body));
        } catch (error) { next(error); }
      });
    }
}
