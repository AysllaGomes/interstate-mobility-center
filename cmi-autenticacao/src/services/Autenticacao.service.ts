/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroExterno,
  ERRO_EXTERNO_TOKEN_DOS_PARCEIROS,
} from "../errors/erro.externo";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_PARCEIRO_DESATIVADO_NO_BD,
} from "../errors/erro.negocial";
import {
  ErroSQL,
  ERRO_AO_VERIFICAR_SE_O_PARCEIRO_ESTA_ATIVO_NO_MONGODB,
} from "../errors/erro.sql";
import { IHealthServices } from "../model/interfaces/HealthServices";
import ParceiroModel, { IParceiro } from "../model/Parceiro";
import { ConexaoMongoEnum } from "../model/enums/ConexaoMongo.enum";
import { AutenticacaoNockService } from "./AutenticacaoNock.service";
import { AutenticacaoStrangerService } from "./AutenticacaoStranger.service";
import { IAutenticacaoParceiroInterface } from "./interfaces/AutenticacaoParceiro.interface";

export class AutenticacaoService {
  public async getParceirosServices(): Promise<any> {
    logger.debug("Instanciando services de parceiros habilitados");

    const arrObjParceiro: Array<IParceiro> = await ParceiroModel.find({ ativo: true });

    let objParceirosAtivos = {};
    arrObjParceiro.forEach((objParceiro) => {
      objParceirosAtivos = {
        ...objParceirosAtivos,
        [objParceiro.codigoParceiro]: AutenticacaoService.criarObjetoParceiro(objParceiro.codigoParceiro),
      };
    });

    return objParceirosAtivos;
  }

  private static criarObjetoParceiro(parceiro: string): IAutenticacaoParceiroInterface {
    const listParceiros: { [key: string]: IAutenticacaoParceiroInterface } = {
      stranger: new AutenticacaoStrangerService(),
      nock: new AutenticacaoNockService(),
    };

    return listParceiros[parceiro];
  }

  public async retornaToken(nomeParceiro: string): Promise<string | undefined> {
    const parceiroAtivo = await this.verificaSeParceiroEstaAtivo(nomeParceiro);

    if (parceiroAtivo) {
      const serviceParceiro: IAutenticacaoParceiroInterface = AutenticacaoService.criarObjetoParceiro(nomeParceiro);
      return serviceParceiro.retornaToken();
    }

    logger.error(`
      ERRO no MS "${environment.app.name}", método "retornaToken".
      <'ERRO'>
        message: Erro ao buscar o token do parceiro ${nomeParceiro}...
      Parâmetros da requisição:
        NOME DO PARCEIRO: ${nomeParceiro}
      Resposta:
      <'ERRO NEGOCIAL'>
        message: O parceiro ${nomeParceiro} não está ativo no bd.
    `);
    throw new ErroNegocial(...ERRO_NEGOCIAL_PARCEIRO_DESATIVADO_NO_BD).formatMessage(nomeParceiro);
  }

  public async verificaSeParceiroEstaAtivo(nomeParceiro: string): Promise<boolean> {
    logger.debug(`Verificando se o parceiro ${nomeParceiro} está ativo no bd...`);

    try {
      const parceiro: Array<IParceiro> = await ParceiroModel.find({
        codigoParceiro: nomeParceiro,
        ativo: true,
      });

      return parceiro.length > 0;
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "verificaSeParceiroEstaAtivo".
        <'ERRO'>
          message: ERRO ao verificar se o parceiro ${nomeParceiro} está ativo no bd...
        Parâmetros da requisição:
          NOME DO PARCEIRO: ${nomeParceiro}
        Resposta:
        <'ERRO DB'>
          sqlcode: ${error.code}
          message: ${error.message}.
      `);

      throw new ErroSQL(...ERRO_AO_VERIFICAR_SE_O_PARCEIRO_ESTA_ATIVO_NO_MONGODB).formatMessage(nomeParceiro, error.message);
    }
  }

  public async retornaTokenParceiros(): Promise<any> {
    let objRetorno = {};
    const objParceirosServices = await this.getParceirosServices();

    const arrPromises: any = [];
    Object.keys(objParceirosServices).forEach(async (nomeParceiro: string) => {
      arrPromises.push(
        Promise.resolve(objParceirosServices[nomeParceiro].retornaToken())
          .then((data) => ({ data, nomeParceiro })),
      );
    });

    await Promise.all(arrPromises)
      .then((promisesResolvidas: any) => {
        promisesResolvidas.forEach((tokenDoParceiro:any) => {
          if (tokenDoParceiro) {
            objRetorno = {
              ...objRetorno,
              [tokenDoParceiro.value.nomeParceiro]: tokenDoParceiro.value.data,
            };
          }
        });
      })
      .catch((error: Error) => {
        logger.error(`ERRO ao buscar token do parceiro: ${error}`);
      });

    if (JSON.stringify(objRetorno) === "{}") {
      throw new ErroExterno(...ERRO_EXTERNO_TOKEN_DOS_PARCEIROS);
    }

    return objRetorno;
  }

  public async healthServices(): Promise<IHealthServices> {
    const objParceirosServices = await this.getParceirosServices();
    let objRetorno = {
      mongoDb: mongoose.connection.readyState === ConexaoMongoEnum.connected ? "ok" : "INDISPONÍVEL",
    };

    const arrPromises: any = [];
    Object.keys(objParceirosServices).forEach(async (nomeParceiro: string) => {
      arrPromises.push(
        Promise.resolve(objParceirosServices[nomeParceiro].health())
          .then((data) => ({ data, nomeParceiro })),
      );
    });

    await Promise.all(arrPromises)
      .then((promisesResolvidas: any) => {
        promisesResolvidas.forEach((tokenDoParceiro:any) => {
          if (tokenDoParceiro) {
            objRetorno = {
              ...objRetorno,
              [tokenDoParceiro.value.nomeParceiro]: tokenDoParceiro.value.data,
            };
          }
        });
      })
      .catch((e: Error) => {
        logger.error(`Erro no heath check ao verificar a situação do ${e}`);
      });

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return objRetorno;
  }
}
