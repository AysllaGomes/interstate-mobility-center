import axios from "axios";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroSQL,
  ERRO_SITAUCAO_VIGENCIA_TERMO_DE_USO_NAO_ENCONTRADO,
} from "../errors/erro.sql";
import { ITermoDeUso } from "../model/TermoDeUso";

export class TermoDeUsoService {
  public static async retornaTermoDeUsoSituacaoVigente(): Promise<ITermoDeUso> {
    try {
      logger.debug("Verificando se há termos de uso com vigência");

      const endpoint = `${environment.app.hostCMITermoDeUso}/termoDeUso/verificaSituacaoVigencia`;

      const body = { };

      const response = await axios.post(endpoint, body);
      return response.data;
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "retornaTermoDeUsoSituacaoVigente".
        <'ERRO NEGOCIAL'>
          message: Não foi possível encontrar um termo de uso com a situação de vigência no momento.
        Parâmetros da requisição:
          URL DA REQUISIÇÃO: ${environment.app.hostCMITermoDeUso}/termoDeUso/verificaSituacaoVigencia
          MOTIVO: ${error.message},
          ERRO: ${error}.
      `);

      throw new ErroSQL(...ERRO_SITAUCAO_VIGENCIA_TERMO_DE_USO_NAO_ENCONTRADO).formatMessage(error);
    }
  }
}
