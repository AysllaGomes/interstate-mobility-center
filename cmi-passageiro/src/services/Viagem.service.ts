import axios from "axios";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_BUSCAR_DADOS_VIAGEM_VINCULADAS_AO_PASSAGEIRO,
} from "../errors/erro.negocial";

export class ViagemService {
  public static async buscarViagem(idViagem: string): Promise<any> {
    try {
      logger.debug(`Consulta do passageiro para buscar a viagem: ${idViagem}`);

      const result = await axios({
        method: "get",
        headers: {
          "id-viagem": `${idViagem}`,
        },
        url: `${environment.app.hostCMIViagem}/viagem/detalhar`,
      });

      return result.data;
    } catch (error) {
      const erroFormatado = (`
        ERRO no MS "${environment.app.name}", método "buscarViagem".
        <'ERRO'>
          message: Erro na buscar a viagem: ${idViagem}
        Parâmetros da requisição:
          ID VIAGEM: ${idViagem}
        Resposta:
        <'ERRO EXTERNO'>
          code: ${error.code}
          message: ${error.message}.
      `);

      logger.error(erroFormatado);

      throw new ErroNegocial(...ERRO_NEGOCIAL_BUSCAR_DADOS_VIAGEM_VINCULADAS_AO_PASSAGEIRO).formatMessage(idViagem);
    }
  }
}
