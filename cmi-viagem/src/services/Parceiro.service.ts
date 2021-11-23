import axios from "axios";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroSQL,
  ERRO_SQL_AO_RETORNAR_O_TOKEN_DOS_PARCEIROS,
} from "../errors/erro.sql";
import {
  ErroExterno,
  ERRO_EXTERNO_DADOS_PARC_AUTENTICACAO,
} from "../errors/erro.externo";
import { IParceiro } from "../model/interfaces/Parceiro";

export class ParceiroService {
  public static async retornaDadosParceirosComToken(): Promise<Array<IParceiro>> {
    try {
      logger.debug("Buscando token dos parceiros...");

      const res = await axios({
        method: "get",
        url: `${environment.app.hostCMIAutenticacao}/parceiro/dados`,
      });
      return res.data;
    } catch (err) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "ParceiroService -> retornaDadosParceirosComToken".
        <'ERRO'>
          message: ERRO ao retornar os dados dos parceiros...
          sugestão: Verifique se existe algum parceiro ativo no BD ou se eles estão indisponíveis
        Resposta:
        <'ERRO DB/Externo'>
          code: ${err.code}
          message: ${err.message}.
      `);

      throw new ErroSQL(...ERRO_SQL_AO_RETORNAR_O_TOKEN_DOS_PARCEIROS).formatMessage(err.message);
    }
  }

  public static async retornaDadosParceiros(graficoPerformance?: boolean): Promise<Array<IParceiro>> {
    try {
      logger.info("Buscando dados dos parceiros...");

      let endpoint = `${environment.app.hostCMIAutenticacao}/parceiro/dadosParceiro`;

      if (graficoPerformance) endpoint = `${environment.app.hostCMIAutenticacao}/parceiro/dadosParceiro?todosOsParceiros=true`;

      const res = await axios({
        method: "get",
        url: endpoint,
      });
      return res.data;
    } catch (err) {
      logger.error("Erro ao dados dos parceiros");

      throw new ErroExterno(...ERRO_EXTERNO_DADOS_PARC_AUTENTICACAO).formatMessage(
        err.code,
        err.hostname,
        // eslint-disable-next-line no-underscore-dangle
        err.request._options.path,
      );
    }
  }
}
