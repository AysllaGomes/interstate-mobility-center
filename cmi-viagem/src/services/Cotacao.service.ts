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
import { ServiceValidator } from "../validators/Service.validator";
import { IRealizaCotacao } from "../model/interfaces/RealizaCotacao";
import { IRetornaCotacao } from "../model/interfaces/RetornaCotacao";
import { AutenticacaoService } from "./Autenticacao.service";

export class CotacaoService {
  private serviceValidator = new ServiceValidator();

  public async cotacao(body: IRealizaCotacao): Promise<IRetornaCotacao | undefined> {
    const resultadoValidacao = this.serviceValidator.validarRetornaMelhorCotacao(body);
    retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS);

    try {
      const usuario = await UsuarioService.retornaDadosPassageiro(body.idUsuario);

      console.log("usuario", usuario);

      const cotacoes = await this.realizarCotacao();

      console.log("cotacoes", cotacoes);

      return;
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

  public async realizarCotacao(): Promise<object | void> {
    const token = await AutenticacaoService.retornaTokenParceiros();

    console.log("token", token);
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
