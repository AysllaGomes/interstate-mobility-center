import axios, { AxiosResponse } from "axios";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroSQL,
  ERRO_SQL_AO_RETORNAR_O_TOKEN_DOS_PARCEIROS,
} from "../errors/erro.sql";

export class AutenticacaoService {
  public static async retornaTokenParceiros(): Promise<AxiosResponse> {
    try {
      logger.debug("Buscando token dos parceiros");

      const response = await axios({
        method: "get",
        url: `${environment.app.hostCMIAutenticacao}/autenticacao/token`,
      });

      return response.data;
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "AutenticacaoService -> retornaTokenParceiros".
        <'ERRO'>
          message: ERRO ao retornar o token dos parceiros...
          sugestão: Verifique se existe algum parceiro ativo no BD ou se eles estão disponíveis
        Resposta:
        <'ERRO DB/Externo'>
          code: ${error.code}
          message: ${error.message}.
      `);

      throw new ErroSQL(...ERRO_SQL_AO_RETORNAR_O_TOKEN_DOS_PARCEIROS).formatMessage(error.message);
    }
  }
}
