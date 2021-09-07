import express from "express";
import { ApiRouter } from "./api.router";
import { UsuarioController } from "../controllers/Usuario.controller";

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
       *        name: ICadastroPassageiro
       *        description: Um objeto do tipo ICadastroPassageiro
       *        required: true
       *        schema:
       *          $ref: '#/definitions/ICadastroPassageiro'
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
    }
}
