import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  retornarErroValidacao,
  retornarInicioEFimDoDia,
} from "../util/utils";
import {
  ErroSQL,
  ERRO_SQL_AO_LISTAR_VIAGEM,
  ERRO_SQL_BUSCA_DADOS_VIAGEM,
} from "../errors/erro.sql";
import {
  ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS,
} from "../errors/erro.negocial";
import Viagem, { IViagem } from "../model/Viagem";
import { ServiceValidator } from "../validators/Service.validator";
import { IInputListarViagem } from "../model/interfaces/InputListarViagem";
import { IOutputListarViagem } from "../model/interfaces/OutputListarViagem";

export class ViagemService {
  private serviceValidator = new ServiceValidator();

  public async listar(body: IInputListarViagem): Promise<Array<IOutputListarViagem>> {
    const resultadoValidacao = this.serviceValidator.validarListarViagem(body);
    retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS);

    const query: object = await this.formatarFiltroContrato(body);

    return this.filtrarViagem(query);
  }

  public async formatarFiltroContrato(input: IInputListarViagem): Promise<object> {
    logger.debug("Formatando filtros para as viagens...");

    let filtrosFind: object = { };

    if (input.titulo) {
      filtrosFind = {
        ...filtrosFind,
        titulo: input.titulo,
      };
    }

    if (input.preco) {
      filtrosFind = {
        ...filtrosFind,
        preco: Number(input.preco),
      };
    }

    if (input.duracao) {
      filtrosFind = {
        ...filtrosFind,
        duracao: Number(input.duracao),
      };
    }

    if (input.estadoOrigem) {
      filtrosFind = {
        ...filtrosFind,
        estadoOrigem: input.estadoOrigem,
      };
    }

    if (input.estadoDestino) {
      filtrosFind = {
        ...filtrosFind,
        estadoDestino: input.estadoDestino,
      };
    }

    if (!input.dataInicio && input.dataFim) {
      const result = retornarInicioEFimDoDia(input.dataFim);
      const dataFim = result.dataFimDia;

      filtrosFind = {
        ...filtrosFind,
        "periodoDeVigencia.dataFim": { $lte: new Date(dataFim) },
      };
    }

    if (input.dataInicio && !input.dataFim) {
      const result = retornarInicioEFimDoDia(input.dataInicio);
      const dataInicio = result.dataInicioDia;

      filtrosFind = {
        ...filtrosFind,
        "periodoDeVigencia.dataInicio": { $gte: new Date(dataInicio) },
      };
    }

    if (input.dataInicio && input.dataFim) {
      const result = retornarInicioEFimDoDia(input.dataInicio, input.dataFim);
      const dataInicio = result.dataInicioDia;
      const dataFim = result.dataFimDia;

      filtrosFind = {
        ...filtrosFind,
        $and: [
          { "periodoDeVigencia.dataInicio": { $gte: new Date(dataInicio) } },
          { "periodoDeVigencia.dataFim": { $lte: new Date(dataFim) } },
        ],
      };
    }

    return filtrosFind;
  }

  public async filtrarViagem(query: object): Promise<Array<IOutputListarViagem>> {
    try {
      logger.debug("Listando as viagens...");

      const resultado: Array<IViagem> = await Viagem.find(query).sort({ preco: 1 });

      if (resultado.length !== 0) {
        logger.debug("Listando dados das viagens...");
        return await this.formatarRetornoListarContrato(resultado);
      }

      return [];
    } catch (error) {
      const erroFormatado = (`
        ERRO no MS "${environment.app.name}", m??todo "filtrarViagem".
        <'ERRO'>
          message: N??o encontrada a(s) viagem(s) na base de dados...
        Par??metros da requisi????o:
          Esse endpoint n??o tem parametros de requisi????o obrigat??rios...
          QUERY: ${query}
        Resposta:
        <'ERRO'>
          code: ${error.code}
          message: ${error.message}.
      `);

      logger.error(erroFormatado);

      throw new ErroSQL(...ERRO_SQL_AO_LISTAR_VIAGEM);
    }
  }

  public async formatarRetornoListarContrato(viagens: Array<IViagem>): Promise<Array<IOutputListarViagem>> {
    const retorno: Array<IOutputListarViagem> = [];

    viagens.forEach((viagem: IViagem) => retorno.push({
      // eslint-disable-next-line no-underscore-dangle
      _id: viagem._id,
      titulo: viagem.titulo,
      preco: viagem.preco,
      duracao: viagem.duracao,
      image: viagem.image,
      parceiro: viagem.nomeParceiro,
      descricao: viagem.descricao,
      estadoOrigem: viagem.estadoOrigem,
      estadoDestino: viagem.estadoDestino,
      dataInicioVigencia: viagem.periodoDeVigencia.dataInicio,
      dataFimVigencia: viagem.periodoDeVigencia.dataFim,
    }));

    return retorno;
  }

  public async retornaDadosViagem(idViagem: string): Promise<IViagem> {
    try {
      logger.info(`Realizando consulta para pegar dados do usu??rio: ${idViagem}...`);
      const viagem = await Viagem.findById(idViagem);

      if (viagem) return viagem;

      logger.debug(`N??o foi encontrado o ID: ${idViagem}, na base de dados...`);
      throw new ErroSQL(...ERRO_SQL_BUSCA_DADOS_VIAGEM).formatMessage(idViagem);
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", m??todo "retornaDadosViagem".
        <'ERRO'>
          message: N??o foi encontrado o ID: ${idViagem}, na base de dados...
        Par??metros da requisi????o:
          ID: ${idViagem}
      `);
      throw new ErroSQL(...ERRO_SQL_BUSCA_DADOS_VIAGEM).formatMessage(idViagem);
    }
  }
}
