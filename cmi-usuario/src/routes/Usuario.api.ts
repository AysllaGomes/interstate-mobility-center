import express from "express";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS,
} from "../errors/erro.negocial";
import { ApiRouter } from "./api.router";
import { ICoordenadas } from "../model/interfaces/Coordenadas";
import { UsuarioController } from "../controllers/Usuario.controller";
import { IDadosDoDispositivo } from "../model/interfaces/DadosDoDispositivo";
import { IRetornoPassageiroAssinaturaTermoDeUso } from "../model/interfaces/RetornoPassageiroAssinaturaTermoDeUso";

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
        *       - Usuário
        *     parameters:
        *      - in: headers
        *        name: Headers
        *        required: true
        *        schema:
        *          $ref: '#/definitions/IDadosDoDispositivo'
        *      - in: body
        *        name: Body
        *        required: true
        *        schema:
        *          $ref: '#/definitions/IInputTermoDeUsoApi'
        *     responses:
        *       200:
        *         description: Lista de retorno dos dados atualizados
        *         schema:
        *             $ref: '#/definitions/IRetornoUpdateUsuarioModel'
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
            posicaoUsuario: [Number(request.headers["current-position"]?.split(/\s*,\s*/)[0]), Number(request.headers["current-position"]?.split(/\s*,\s*/)[1])],
          };

          return response.json(await this.controller.assinaturaTermoDeUso(request.body, dadosDoDispositivo, coordenadas));
        } catch (error) { next(error); }
      });

      /**
       * @swagger
       *   /usuario/consultaAssinaturaTermoUsuario:
       *   get:
       *     description: Realiza uma consulta a partir do id do usuário informado no body da requisição para verificar se há o termo de uso vinculado.
       *     summary: EndPoint que realiza uma consulta a partir do id do usuário informado no body da requisição para verificar se há o termo de uso vinculado.
       *     tags:
       *       - Usuário
       *     parameters:
       *      - in: body
       *        name: IUsuarioAssinaturaTermoDeUso
       *        required: true
       *        schema:
       *          $ref: '#/definitions/IUsuarioAssinaturaTermoDeUso'
       *     responses:
       *       200:
       *         description: Retorno dos dados to Termo para o usuário informado
       *         schema:
       *             $ref: '#/definitions/IRetornoPassageiroAssinaturaTermoDeUso'
       */
      server.get(`${this.path}/consultaAssinaturaTermoUsuario`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        try {
          if (request.body.idUsuario) {
            const result: IRetornoPassageiroAssinaturaTermoDeUso = await this.controller.usuarioAssinaturaTermoDeUso(request.body);

            return response.json(
              {
                assinado: result?.assinado,
                versao: result?.versao,
                conteudo: `<html><body><p>${result?.conteudo}</p></body></html>`,
              },
            );
          }
          next(new ErroNegocial(...ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS).formatMessage("idUsuario"));
        } catch (error) { next(error); }
      });

      /**
       * @swagger
       *   /usuario/{idUsuario}:
       *   get:
       *     description: Realiza o detalhamento do usuário a partir do id informado.
       *     summary: EndPoint que realiza detalhamento do usuário a partir do id informado.
       *     tags:
       *       - Usuário
       *     parameters:
       *      - name: "idUsuario"
       *        in: "path"
       *        required: true
       *        type: "string"
       *     responses:
       *       200:
       *         description: Lista de resposta que contem todos os objetos que foram retornados pela consulta no banco de dados
       *         schema:
       *             $ref: '#/definitions/Usuario'
       */
      server.get(`${this.path}/:idUsuario`, async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
        try {
          if (req.params.idUsuario) {
            return resp.json(await this.controller.retornaDadosUsuario(req.params.idUsuario.toString()));
          }
          next(new ErroNegocial(...ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS).formatMessage("idUsuario"));
        } catch (error) { next(error); }
      });
    }
}
