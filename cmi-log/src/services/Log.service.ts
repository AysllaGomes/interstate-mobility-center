import LogMobilidadeModel, { ILog } from "../model/Log";
import {
  ErroSQL,
  ERRO_AO_SALVAR_REGISTRO_DE_LOG,
} from "../errors/erro.sql";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import { retornarErroValidacao } from "../util/utils";
import { ServiceValidator } from "../validators/Service.validator";
import { ERRO_NEGOCIAL_NA_VALIDACAO } from "../errors/erro.negocial";
import { IInputLogMobilidade } from "../model/interfaces/InputLogMobilidade";

export class LogService {
  private serviceValidator = new ServiceValidator();

  public async gerenciaLog(input: Array<IInputLogMobilidade>): Promise<Array<ILog>> {
    logger.debug("Salvando registros de log no banco de dados...");

    return Promise.all(
      input.map(async (objDoLog: IInputLogMobilidade) => {
        const resultadoValidacao = this.serviceValidator.validaInputLogMobilidade(objDoLog);
        retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);

        return this.salvaLogNoBancoDeDados(objDoLog);
      }),
    );
  }

  public async salvaLogNoBancoDeDados(body: IInputLogMobilidade): Promise<ILog> {
    try {
      const result = new LogMobilidadeModel({
        tsDeRegistroDoLog: new Date(),
        categoria: body.categoria,
        processo: body.processo,
        usuarioLogado: body.usuarioLogado,
        tsDoConsumoDaApi: new Date(body.tsDoConsumoDaApi),
        tipoApi: body.tipoApi,
        plataforma: body.plataforma,
      });

      return new LogMobilidadeModel(result).save();
    } catch (err) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "salvaLogNoBancoDeDados".
        <'ERRO'>
          message: Erro ao salvar registro de logs no bd: ${err.message}
        Resposta:
        <'ERRO'>
          code: ${err.code},
          message: ${err.message}.
      `);

      throw new ErroSQL(...ERRO_AO_SALVAR_REGISTRO_DE_LOG).formatMessage(err.message);
    }
  }
}
