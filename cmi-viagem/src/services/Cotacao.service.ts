import { NextFunction } from "express";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  retornarErroValidacao,
  formataValorPraDuasCasasDecimais,
} from "../util/utils";
import {
  ErroExterno,
  ERRO_EXTERNO_VIAGEM_EM_ANDAMENTO,
} from "../errors/erro.externo";
import {
  ErroSQL,
  ERRO_SQL_AO_SALVAR_COTACAO_DE_VIAGEM,
} from "../errors/erro.sql";
import {
  ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS,
} from "../errors/erro.negocial";
import Viagem from "../model/Viagem";
import { IUsuario } from "../model/Usuario";
import { ViagemService } from "./Viagem.service";
import { UsuarioService } from "./Usuario.service";
import { ParceiroService } from "./Parceiro.service";
import { IParceiro } from "../model/interfaces/Parceiro";
import { ViagemNockService } from "./ViagemNock.service";
import { StatusViagemService } from "./StatusViagem.service";
import { AutenticacaoService } from "./Autenticacao.service";
import { ViagemStrangerService } from "./ViagemStranger.service";
import { UsuarioParceiros } from "./interfaces/UsuarioParceiros";
import { ServiceValidator } from "../validators/Service.validator";
import { StatusViagemEnum } from "../model/enums/StatusViagem.enum";
import { IRealizaCotacao } from "../model/interfaces/RealizaCotacao";
import { IRetornaCotacao } from "../model/interfaces/RetornaCotacao";
import { IInterfaceViagem } from "../model/interfaces/InterfaceViagem";
import { ViagemParceiroAbstract } from "./abstracts/ViagemParceiro.abstract";
import CotacaoVencedora, { ICotacaoVencedora } from "../model/CotacaoVencedora";

export class CotacaoService {
  private serviceValidator = new ServiceValidator();

  private statusViagemService = new StatusViagemService();

  public async getCotacoesService(nomeParceiro?: string): Promise<object | ViagemParceiroAbstract> {
    const result = {};

    if (!nomeParceiro) { await this.retornaParceirosAtivos(result); }

    CotacaoService.retornaServiceParceiro(nomeParceiro, result);

    return result;
  }

  private async retornaParceirosAtivos(result: {}): Promise<void> {
    const parceirosAtivos = await ParceiroService.retornaDadosParceirosComToken();

    parceirosAtivos.forEach((parceiro: IParceiro) => {
      if (parceiro.codigoParceiro === "nock") {
        Object.assign(result, { nock: new ViagemNockService() });
      }

      if (parceiro.codigoParceiro === "stranger") {
        Object.assign(result, { stranger: new ViagemStrangerService() });
      }
    });
  }

  private static retornaServiceParceiro(nomeParceiro: string | undefined, result: {}): void {
    if (nomeParceiro === "nock") {
      Object.assign(result, { nock: new ViagemNockService() });
    }

    if (nomeParceiro === "stranger") {
      Object.assign(result, { stranger: new ViagemStrangerService() });
    }
  }

  public async cotacao(body: IRealizaCotacao, next: NextFunction): Promise<IRetornaCotacao | undefined> {
    const resultadoValidacao = this.serviceValidator.validarRetornaMelhorCotacao(body);
    retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS);

    try {
      const usuarioPossuiViagemEmAndamento = await this.statusViagemService.verificaSeUsuarioPossuiViagemEmAndamento(body.idUsuario);

      if (!usuarioPossuiViagemEmAndamento) {
        const usuario = await UsuarioService.retornaDadosPassageiro(body.idUsuario);
        const cotacoes = await this.realizarCotacao(body);
        const cotacaoVencedora = await this.definirMelhorCotacao(cotacoes);

        let viagem = this.formataCotacaoViagem(body, usuario, cotacaoVencedora, cotacoes);
        viagem = await this.salvarCotacoes(viagem);

        // eslint-disable-next-line no-underscore-dangle
        return ViagemService.setaRetornoCotaco(viagem._id, cotacaoVencedora, next);
      }
      throw new ErroExterno(...ERRO_EXTERNO_VIAGEM_EM_ANDAMENTO).formatMessage();
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "retornaMelhorCotacao".
        <'ERRO'>
          message: Houve um erro ao realizar a cotacao... \n ${error}.
        PARAMETROS:
          ID USUÁRIO: ${body.idUsuario},
          ORIGEM: ${body.localOrigemViagem},
          DESTINO: ${body.localDestinoViagem},
          DATA IDA: ${body.tsIdaViagem},
          DATA RETORNO: ${body.tsVoltaViagem}.
      `);

      throw new ErroExterno(...ERRO_EXTERNO_VIAGEM_EM_ANDAMENTO).formatMessage();
    }
  }

  public async realizarCotacao(body: IRealizaCotacao): Promise<object | void> {
    const cotacao = await this.getCotacoesService();
    const usuarioParceiro = await UsuarioService.consultaUsuarioDoParceiro(body);

    if (Object.keys(usuarioParceiro.data).length !== 0) {
      const token = await AutenticacaoService.retornaTokenParceiros();

      const promisesResolvidas = await Promise.all(
        Object.keys(cotacao).map(async (nomeParceiro) => {
          if (nomeParceiro) {
            return {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
              data: await Promise.resolve(cotacao[nomeParceiro].retornaCotacao(body, usuarioParceiro.data[nomeParceiro].id, token[nomeParceiro])),
              nomeParceiro,
            };
          }
          return null;
        }),
      );
      return this.formatarCotacoesPorParceiro(usuarioParceiro, promisesResolvidas);
    }
  }

  public async definirMelhorCotacao(cotacoes: any): Promise<ICotacaoVencedora> {
    const parceirosCotados = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const nomeParceiro of Object.keys(cotacoes)) {
      // eslint-disable-next-line no-await-in-loop
      Object.assign(parceirosCotados, await this.getCotacoesService(nomeParceiro));
    }
    let cotacaoVencedora = new CotacaoVencedora();
    try {
      logger.info("Definindo a melhor cotação");

      const objCotacaoService: any = parceirosCotados;
      let objMelhoresCotacoes: any;
      let valorEconomizado;

      Object.keys(objCotacaoService).forEach((nomeParceiro: string) => {
        if (cotacoes[nomeParceiro] && !cotacoes[nomeParceiro].erro) {
          const cotacao: ICotacaoVencedora = objCotacaoService[nomeParceiro].menorPreco(cotacoes[nomeParceiro]);

          logger.info(`Formatando o menor valor do parceiro ${nomeParceiro} para reais.`);
          cotacao.valor = objCotacaoService[nomeParceiro].formataPrecoEmReais(cotacao.valor);

          logger.info(`Fixando o valor ${cotacao.valor} para apenas 2 casas decimais.`);
          cotacao.valor = formataValorPraDuasCasasDecimais(cotacao.valor);

          objMelhoresCotacoes = {
            ...objMelhoresCotacoes,
            [nomeParceiro]: cotacao,
          };
        }
      });

      if (objMelhoresCotacoes) {
        Object.keys(objMelhoresCotacoes).forEach((value: string, index: number, arr) => {
          if (!cotacaoVencedora.valor) {
            cotacaoVencedora = objMelhoresCotacoes[arr[index]];
          }

          if (objMelhoresCotacoes[arr[index + 1]]) {
            if (cotacaoVencedora.valor > objMelhoresCotacoes[arr[index + 1]].valor) {
              cotacaoVencedora = objMelhoresCotacoes[arr[index + 1]];
            }
          }
        });
        valorEconomizado = this.calculaValorEconomizadoPorViagem(objMelhoresCotacoes);
      }

      return Object.assign(cotacaoVencedora, { valorEconomizado });
    } catch (error) {
      logger.error(`ERRO ao definir a melhor cotação: ${error}`);

      return cotacaoVencedora;
    }
  }

  public calculaValorEconomizadoPorViagem(melhorCotacao: object): number {
    const cotacaoVencedora = Object.values(melhorCotacao);

    const menorValorCotacoes: Array<number> = [];

    cotacaoVencedora.forEach((parceiro) => menorValorCotacoes.push(parceiro.valor));

    const maiorValorCotacao = Math.max(...menorValorCotacoes);
    const menorValorCotacao = Math.min(...menorValorCotacoes);

    let valorEconomizado = maiorValorCotacao - menorValorCotacao;
    valorEconomizado = formataValorPraDuasCasasDecimais(valorEconomizado);

    return valorEconomizado;
  }

  public formatarCotacoesPorParceiro(parceiros: UsuarioParceiros, promisesResolvidas: any): object {
    let objCotacoes = {};
    const erroParceiro: Array<object> = [];

    promisesResolvidas.forEach((cotacao: { data: any, nomeParceiro: string } | null) => {
      if (cotacao && cotacao.data) {
        if (!cotacao.data.erro) {
          objCotacoes = {
            ...objCotacoes,
            [cotacao.nomeParceiro]: {
              ...cotacao.data,
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              idUsuarioParceiro: parceiros.data[cotacao.nomeParceiro].id,
            },
          };
        } else {
          logger.debug(`Parceiro: ${cotacao.nomeParceiro} \n Erro: ${cotacao.data.erro.mensagemErro}`);
          erroParceiro.push({
            parceiro: cotacao.data.erro.parceiro,
            erro: cotacao.data.erro.mensagemErro,
          });
        }
      }
    });

    return { ...objCotacoes, erroCotacaoParceiros: erroParceiro };
  }

  public formataCotacaoViagem(body: IRealizaCotacao, usuario: IUsuario, cotacaoVencedora: ICotacaoVencedora, cotacoes: object | void): IInterfaceViagem {
    return new Viagem({
      idUsuario: body.idUsuario,
      statusViagem: [
        {
          statusViagem: StatusViagemEnum.COTADO,
          dtCriacao: new Date(),
        },
      ],
      coordenadas: {
        origemViagem: body.localOrigemViagem,
        destinoViagem: body.localDestinoViagem,
        tsIdaViagem: body.tsIdaViagem,
        tsVoltaViagem: body.tsVoltaViagem,
      },
      cotacaoVencedora,
      parceirosCotados: cotacoes,
      tsCriacao: new Date(),
    });
  }

  public async salvarCotacoes(viagem: IInterfaceViagem): Promise<IInterfaceViagem> {
    try {
      return new Viagem(viagem).save();
    } catch (error) {
      logger.error(`
      ERRO no MS "${environment.app.name}", método "salvarCotacoes".
      <'ERRO'>
        message: Aconteceu um erro ao tentar salvar uma cotacao...
      Parâmetros da requisição:
        ID USUARIO: ${viagem.idUsuario}
        STATUS VIAGEM: ${viagem.statusViagem}       
        COORDENADAS: ${viagem.coordenadas}        
    `);

      throw new ErroSQL(...ERRO_SQL_AO_SALVAR_COTACAO_DE_VIAGEM);
    }
  }
}
