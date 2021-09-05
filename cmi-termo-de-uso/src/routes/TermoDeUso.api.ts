import express from "express";
import { ApiRouter } from "./api.router";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS,
} from "../errors/erro.negocial";
import { TermoDeUsoController } from "../controllers/TermoDeUso.controller";

export class TermoDeUsoApi extends ApiRouter {
    private readonly path: string;

    private readonly controller = new TermoDeUsoController({});

    constructor() {
      super();
      this.path = "/termoDeUso";
    }

    public active(): boolean {
      return true;
    }

    public async applyRoutes(server: express.Application): Promise<void> {
      /**
       * @swagger
       *   /termoDeUso/aberturaTermoDeUso:
       *   post:
       *     description: Realiza a abertura de um novo termo de uso, caso seja possível
       *     summary: EndPoint que realiza a abertura de um novo termo de uso, caso seja possível
       *     tags:
       *       - Termo de Uso
       *     parameters:
       *      - in: body
       *        name: IAberturaTermoDeUso
       *        description: Um objeto do tipo IAberturaTermoDeUso
       *        required: true
       *        schema:
       *          $ref: '#/definitions/IAberturaTermoDeUso'
       *     responses:
       *       200:
       *         description: Lista de resposta que contem todos os objetos que foram salvos no banco de dados
       *         schema:
       *             $ref: '#/definitions/TermoDeUso'
       */
      server.post(`${this.path}/aberturaTermoDeUso`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          if (request.body.conteudo) {
            return response.json(await this.controller.aberturaTermoDeUso(request.body));
          }
          next(new ErroNegocial(...ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS));
        } catch (error) { next(error); }
      });

      /**
       * @swagger
       *   /termoDeUso/detalhar:
       *   get:
       *     description: Realiza o detalhamento do termo a partir de um número de versão informado.
       *     summary: EndPoint que realiza detalhamento do termo a partir de um número de versão informado.
       *     tags:
       *       - Termo de Uso
       *     parameters:
       *      - in: body
       *        name: IDetalharTermoDeUso
       *        description: Um objeto do tipo IDetalharTermoDeUso
       *        required: true
       *        schema:
       *          $ref: '#/definitions/IDetalharTermoDeUso'
       *     responses:
       *       200:
       *         description: Lista de resposta que contem todos os objetos que foram retornados pela consulta no banco de dados
       *         schema:
       *             $ref: '#/definitions/TermoDeUso'
       */
      server.get(`${this.path}/detalhar`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          if (request.body.versao) {
            return response.json(await this.controller.detalharTermoDeUso(request.body));
          }
          next(new ErroNegocial(...ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS));
        } catch (error) { next(error); }
      });

      /**
       * @swagger
       *   /termoDeUso/verificaSituacaoVigencia:
       *   post:
       *     description: Realiza uma busca para ver se há algum termo de uso.
       *     summary: EndPoint que realiza uma busca para ver se há algum termo de uso.
       *     tags:
       *       - Termo de Uso
       *     parameters:
       *      - in: body
       *        name: Verificar situação de vigência
       *        description: Um objeto vazio
       *        required: false
       *     responses:
       *       200:
       *         description: Lista de resposta que contem todos os objetos que foram retornados pela consulta no banco de dados
       *         schema:
       *             $ref: '#/definitions/TermoDeUso'
       */
      server.post(`${this.path}/verificaSituacaoVigencia`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          return response.json(await this.controller.verificaSeExisteSituacaoVigenteNoTermoDeUso());
        } catch (error) { next(error); }
      });
    }
}
