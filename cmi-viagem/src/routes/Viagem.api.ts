import express from "express";
import { ApiRouter } from "./api.router";
import { ViagemController } from "../controllers/Viagem.controller";
import { IInputListarViagem } from "../model/interfaces/InputListarViagem";
import { ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS, ErroNegocial } from "../errors/erro.negocial";

export class ViagemApi extends ApiRouter {
  private readonly path: string;

  private readonly controller = new ViagemController({});

  constructor() {
    super();
    this.path = "/viagem";
  }

  public active(): boolean { return true; }

  public async applyRoutes(server: express.Application): Promise<void> {
    server.get(`${this.path}/listar`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
      try {
        const body: IInputListarViagem = {
          titulo: request.headers.titulo ? String(request.headers.titulo) : undefined,
          preco: request.headers.preco ? Number(request.headers.preco) : undefined,
          duracao: request.headers.duracao ? Number(request.headers.duracao) : undefined,
          estadoOrigem: request.headers["estado-origem"] ? String(request.headers["estado-origem"]) : undefined,
          estadoDestino: request.headers["estado-destino"] ? String(request.headers["estado-destino"]) : undefined,
          dataInicio: request.headers["data-inicio"] ? String(request.headers["data-inicio"]) : undefined,
          dataFim: request.headers["data-fim"] ? String(request.headers["data-fim"]) : undefined,
        };

        return response.json(await this.controller.listar(body));
      } catch (error) { next(error); }
    });

    server.get(`${this.path}/id/:idViagem`, async (request: express.Request, response: express.Response, next: express.NextFunction) => {
      try {
        if (request.params.idViagem) {
          return response.json(await this.controller.retornaDadosViagem(request.params.idViagem.toString()));
        }

        next(new ErroNegocial(...ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS).formatMessage("idViagem"));
      } catch (error) { next(error); }
    });
  }
}
