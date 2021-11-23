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
  ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS,
} from "../errors/erro.negocial";
import { UsuarioService } from "./Usuario.service";
import { ParceiroService } from "./Parceiro.service";
import { IParceiro } from "../model/interfaces/Parceiro";
import { ViagemNockService } from "./ViagemNock.service";
import { StatusViagemService } from "./StatusViagem.service";
import { AutenticacaoService } from "./Autenticacao.service";
import { ViagemStrangerService } from "./ViagemStranger.service";
import { ServiceValidator } from "../validators/Service.validator";
import { IRealizaCotacao } from "../model/interfaces/RealizaCotacao";
import { IRetornaCotacao } from "../model/interfaces/RetornaCotacao";
import { ViagemParceiroAbstract } from "./abstracts/ViagemParceiro.abstract";

export class CotacaoService {
  private serviceValidator = new ServiceValidator();

  private statusViagemService = new StatusViagemService();

  public async getCotacoesService(nomeParceiro?: string): Promise<object | ViagemParceiroAbstract> {
    const result = {};

    if (!nomeParceiro) { await this.retornaParceirosAtivos(result); }

    this.retornaServiceParceiro(nomeParceiro, result);

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

  private retornaServiceParceiro(nomeParceiro: string | undefined, result: {}): void {
    if (nomeParceiro === "nock") {
      Object.assign(result, { nock: new ViagemNockService() });
    }

    if (nomeParceiro === "stranger") {
      Object.assign(result, { stranger: new ViagemStrangerService() });
    }
  }

  public async cotacao(body: IRealizaCotacao): Promise<IRetornaCotacao | undefined> {
    const resultadoValidacao = this.serviceValidator.validarRetornaMelhorCotacao(body);
    retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS);

    try {
      const usuarioPossuiViagemEmAndamento = await this.statusViagemService.verificaSeUsuarioPossuiViagemEmAndamento(body.idUsuario);

      if (!usuarioPossuiViagemEmAndamento) {
        // const usuario = await UsuarioService.retornaDadosPassageiro(body.idUsuario);
        const cotacoes = await this.realizarCotacao(body);
        // const cotacaoVencedora = await this.definirMelhorCotacao(cotacoes);

        console.log("cotacoes", cotacoes);

        // let viagem = this.formataCotacaoViagem(body, usuario, cotacaoVencedora, cotacoes);

        return;
      }
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
    const token = await AutenticacaoService.retornaTokenParceiros();

    console.log("cotacao", cotacao);

    console.log("usuarioParceiro", usuarioParceiro);

    if (Object.keys(usuarioParceiro.data).length !== 0) {
      const promisesResolvidas = await Promise.all(
        Object.keys(cotacao).map(async (nomeParceiro) => {
          console.log("nomeParceiro", nomeParceiro);

          if (nomeParceiro) {
            return {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
              data: await Promise.resolve(cotacao[nomeParceiro].retornaCotacao(req, usuarioParceiro.data[nomeParceiro].id, token[nomeParceiro])),
              nomeParceiro,
            };
          }
          return null;
        }),
      );

      console.log("promisesResolvidas", promisesResolvidas);
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
}
