import express from "express";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS,
} from "../errors/erro.negocial";
import { ApiRouter } from "./api.router";
import { ICoordenadas } from "../model/interfaces/Coordenadas";
import { UsuarioController } from "../controllers/Usuario.controller";
import { IDadosDoDispositivo } from "../model/interfaces/DadosDoDispositivo";

export class UsuarioApi extends ApiRouter {
    private readonly path: string;

    private readonly controller = new UsuarioController({});

    constructor() {
      super();
      this.path = "/usuario";
    }

    public active(): boolean {
      return true;
    }

    public async applyRoutes(server: express.Application): Promise<void> {
      /**
       * @swagger
       *   /usuario/cadastro:
       *   post:
       *     description: Realiza a abertura de um novo usuário, caso seja possível
       *     summary: EndPoint que realiza de um novo usuário, caso seja possível
       *     tags:
       *       - Usuário
       *     parameters:
       *      - in: body
       *        name: ICadastroUsuario
       *        description: Um objeto do tipo ICadastroUsuario
       *        required: true
       *        schema:
       *          $ref: '#/definitions/ICadastroUsuario'
       *     responses:
       *       200:
       *         description: Lista de resposta que contem todos os objetos que foram salvos no banco de dados
       *         schema:
       *             $ref: '#/definitions/Usuario'
       */
      server.post(`${this.path}/cadastro`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          return response.json(await this.controller.cadastrarUsuario(request.body));
        } catch (error) { next(error); }
      });

      /**
        * @swagger
        *   /usuario/detalhar:
        *   get:
        *     description: Realiza o detalhamento do usuário a partir de um e-mail informado.
        *     summary: EndPoint que realiza detalhamento do usuário a partir de um e-mail informado.
        *     tags:
        *       - Usuário
        *     parameters:
        *      - in: body
        *        name: IDetalharUsuario
        *        description: Um objeto do tipo IDetalharUsuario
        *        required: true
        *        schema:
        *          $ref: '#/definitions/IDetalharUsuario'
        *     responses:
        *       200:
        *         description: Lista de resposta que contem todos os objetos que foram retornados pela consulta no banco de dados
        *         schema:
        *             $ref: '#/definitions/Usuario'
        */
      server.get(`${this.path}/detalhar`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          if (request.body.email) {
            return response.json(await this.controller.detalharUsuario(request.body));
          }
          next(new ErroNegocial(...ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS));
        } catch (error) { next(error); }
      });

      /**
        * @swagger
        *   /usuario/assinaturaTermoDeUso:
        *   post:
        *     description: Realiza uma atualização nos dados do passageiro para adicionar termos de uso.
        *     summary: EndPoint que realiza uma atualização nos dados do passageiro para adicionar termos de uso.
        *     tags:
        *       - Passageiro
        *     parameters:
        *      - in: headers
        *        name: Headers
        *        required: true
        *        schema:
        *          $ref: '#/definitions/IDadosDoDispositivo&Coordenadas&MCI'
        *     responses:
        *       200:
        *         description: Lista de retorno dos dados atualizados
        *         schema:
        *             $ref: '#/definitions/IRetornoUpdateModel'
        */
      server.post(`${this.path}/assinaturaTermoDeUso`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          const dadosDoDispositivo: IDadosDoDispositivo = {
            versaoDoApp: request.headers["app-version"],
            brand: request.headers.brand,
            os: request.headers.os,
            "os-version": request.headers["os-version"],
            modeloDoAparelho: request.headers.model,
          };

          const coordenadas: ICoordenadas = {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            posicaoUsuarioCMU: [Number(request.headers["current-position"]?.split(/\s*,\s*/)[0]), Number(request.headers["current-position"]?.split(/\s*,\s*/)[1])],
          };

          return response.json(await this.controller.assinaturaTermoDeUso(request.body, dadosDoDispositivo, coordenadas));
        } catch (error) { next(error); }
      });
    }
}
