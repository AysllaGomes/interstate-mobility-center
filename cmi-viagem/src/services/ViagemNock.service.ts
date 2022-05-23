import axios, { AxiosResponse } from "axios";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroExterno,
  ERRO_EXTERNO_DO_PARCEIRO,
  ERRO_EXTERNO_AO_CONSULTAR_STATUS_DA_VIAGEM,
} from "../errors/erro.externo";
import { UsuarioService } from "./Usuario.service";
import { StatusViagemEnum } from "../model/enums/StatusViagem.enum";
import { IInterfaceViagem } from "../model/interfaces/InterfaceViagem";
import { ISolicitacaoViagem } from "../model/interfaces/SolicitaViagem";
import { ViagemParceiroAbstract } from "./abstracts/ViagemParceiro.abstract";
import { IStatusViagemParceiro } from "../model/interfaces/StatusViagemParceiro";
import CotacaoVencedoraModel, { ICotacaoVencedora } from "../model/CotacaoVencedora";
import { ISolicitacaoViagemParceiro } from "../model/interfaces/SolicitaViagemParceiro";

export class ViagemNockService extends ViagemParceiroAbstract {
  public async retornaCotacao(req: any, userIdParceiro: number, token: string): Promise<any | undefined> {
    try {
      logger.info("Buscando cotacoes da Nock");

      // eslint-disable-next-line max-len
      const endpoint = `${environment.parceiros.host}/rides/estimate/${userIdParceiro}?fromLat=${req.latitudeOrigem}&fromLng=${req.longitudeOrigem}&toLat=${req.latitudeDestino}&toLng=${req.longitudeDestino}`;

      const config = {
        headers: {
          "x-api-key": `${token}`,
        },
      };

      const result = await axios.get(endpoint, config);

      return result.data;
    } catch (error) {
      logger.error(`ERRO na busca de cotações da Nock: ${error}`);

      return {
        erro: {
          parceiro: "Nock",
          mensagemErro: error,
        },
      };
    }
  }

  public menorPreco(arrayCotacoes: any): ICotacaoVencedora {
    let cotacao: any;

    if (arrayCotacoes) {
      Object.keys(arrayCotacoes).forEach((value1: any) => {
        if (arrayCotacoes[value1] instanceof Object) {
          if (!cotacao) {
            cotacao = {
              ...arrayCotacoes[value1],
              idUsuarioParceiro: arrayCotacoes.idUsuarioParceiro,
            };
          }

          if (cotacao.estimate.upperFare > arrayCotacoes[value1].estimate.upperFare) {
            cotacao = {
              ...arrayCotacoes[value1],
              idUsuarioParceiro: arrayCotacoes.idUsuarioParceiro,
            };
          }
        }
      });
    }

    return this.atribuirCotacacao(cotacao);
  }

  public atribuirCotacacao(cotacoes: any): ICotacaoVencedora {
    const cotacao = new CotacaoVencedoraModel();

    cotacao.parceiro = "nock";
    cotacao.idUsuarioParceiro = cotacoes.idUsuarioParceiro;
    cotacao.produto = cotacoes.category.name;
    cotacao.objIdParceiro = {
      category: {
        id: cotacoes.category.id,
        name: cotacoes.name,
        descricao: cotacoes.category.description,
      },
    };
    cotacao.valor = cotacoes.estimate.lowerFare;
    cotacao.icone = environment.parceiros.logo;
    cotacao.tsCriacao = new Date();

    return cotacao;
  }

  formataPrecoEmReais(precoCotacao: number): number {
    return precoCotacao;
  }

  public async solicitaViagem(solicitacaoViagem: ISolicitacaoViagemParceiro, token: string): Promise<any> {
    try {
      logger.debug("Solicitando viagem na Nock");

      const endpoint = `${environment.parceiros.host}/rides/`;

      logger.debug("Setando dados no formato do json da Nock");
      const body: ISolicitacaoViagem = await this.setaDadosNoFormatoDoJsonDoParceiro(solicitacaoViagem);

      const config = {
        headers: {
          "x-api-key": `${token}`,
        },
      };

      const result = await axios.post(endpoint, body, config);

      return result.data.rideID;
    } catch (err) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "solicitaViagem - do parceiro 99".
        <'ERRO'>
          message: ERRO ao solicitar viagem no parceiro: 99...
        Parâmetros da requisição:
          BODY: ${solicitacaoViagem}
        Resposta:
        <'ERRO NEGOCIAL'>
          sqlcode: ${err.code}
          message: ${err.message}.
      `);

      throw new ErroExterno(...ERRO_EXTERNO_DO_PARCEIRO).formatMessage(
        "NoveNovePop",
      );
    }
  }

  public async setaDadosNoFormatoDoJsonDoParceiro(solicitacaoViagem: ISolicitacaoViagemParceiro): Promise<ISolicitacaoViagem> {
    const usuario = await UsuarioService.retornaDadosPassageiro(solicitacaoViagem.idUsuario);

    return {
      categoryID: solicitacaoViagem.objIdParceiro.category.id,
      costCenterID: environment.parceiros.centroDeCustoNock,
      employeeID: Number(solicitacaoViagem.idUsuarioParceiro),
      from: {
        latitude: solicitacaoViagem.origemViagem.latitudeOrigem,
        longitude: solicitacaoViagem.origemViagem.longitudeOrigem,
      },
      phoneNumber: usuario.numeroTelefoneCelular,
      to: {
        latitude: solicitacaoViagem.destinoViagem.latitudeDestino,
        longitude: solicitacaoViagem.destinoViagem.longitudeDestino,
      },
    };
  }

  public async pegaStatusAdapter(viagem: IInterfaceViagem, token: string): Promise<IStatusViagemParceiro> {
    try {
      logger.info("Buscando status da viagem no parceiro Nock");

      const jsonResult: AxiosResponse | undefined = await ViagemNockService.requestStatus(viagem, token);

      let status: StatusViagemEnum;
      logger.info(`Status retornado pelo parceiro 99: ${jsonResult?.data.status}`);
      switch (jsonResult?.data.status) {
        case "WAITING_DRIVERS_ANSWERS":
          status = StatusViagemEnum.CONTRATANDO;
          break;
        case "CAR_ON_THE_WAY":
          status = StatusViagemEnum.CONTRATADO;
          break;
        case "CANCELED_BY_PASSENGER":
          status = StatusViagemEnum.CANCELADO_PASSAGEIRO;
          break;
        case "IN_PROGRESS":
          status = StatusViagemEnum.FATURADO;
          break;
        case "RIDE_ENDED":
          status = StatusViagemEnum.PRE_FATURADO;
          break;
        default:
          status = StatusViagemEnum.DESCONHECIDO;
      }

      return {
        statusViagem: status,
        origemViagem: viagem.coordenadas.origemViagem,
        destinoViagem: viagem.coordenadas.destinoViagem,
      };
    } catch (error) {
      logger.error(`ERRO na busca de status da viagem no parceiro Nock: ${error}`);

      return {
        statusViagem: StatusViagemEnum.DESCONHECIDO,
        motivoErro: error.message,
      };
    }
  }

  private static async requestStatus(viagem: IInterfaceViagem, token: string): Promise<AxiosResponse | undefined> {
    // eslint-disable-next-line no-underscore-dangle
    const idViagem = viagem._id;

    try {
      const endpoint = `${environment.parceiros.host}/rides/${viagem.idViagemNoParceiro}`;

      const config = {
        headers: {
          "x-api-key": `${token}`,
        },
      };

      return await axios.get(endpoint, config);
    } catch (err) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "requestStatus - do parceiro 99".
        <'ERRO'>
          message: ERRO ao retornar status de viagem do parceiro Nock...
        Parâmetros da requisição:
          ID VIAGEM: ${idViagem}
          ID VIAGEM NO PARCEIRO: ${viagem.idViagemNoParceiro}
        Resposta:
        <'ERRO NEGOCIAL'>
          sqlcode: ${err.code}
          message: ${err.message}.
      `);
      throw new ErroExterno(...ERRO_EXTERNO_AO_CONSULTAR_STATUS_DA_VIAGEM).formatMessage(idViagem, err.message);
    }
  }

  public async cancelarViagem(idViagemNoParceiro: string, token: string): Promise<boolean> {
    try {
      logger.info("Cancelando viagem na Nock...");

      const endpoint = `${environment.parceiros.host}/rides/${idViagemNoParceiro}`;

      const config = {
        headers: {
          "x-api-key": `${token}`,
        },
      };

      await axios.delete(endpoint, config);

      return true;
    } catch (err) {
      logger.error(`ERRO ao cancelar viagem no parceiro Nock: ${err}`);

      throw new ErroExterno(...ERRO_EXTERNO_DO_PARCEIRO).formatMessage("Nock");
    }
  }
}
