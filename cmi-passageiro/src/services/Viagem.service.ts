import axios from "axios";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_BUSCAR_DADOS_VIAGEM_VINCULADAS_AO_PASSAGEIRO,
} from "../errors/erro.negocial";
import { IViagem } from "../model/Viagem";

export class ViagemService {
  public static async retornaDadosViagem(idViagem: string): Promise<IViagem> {
    try {
      logger.debug(`Consulta do passageiro para buscar a viagem: ${idViagem}`);

      const result = await axios({
        method: "get",
        url: `${environment.app.hostCMIViagem}/viagem/id/${idViagem}`,
      });

      return result.data;
    } catch (error) {
      const erroFormatado = (`
        ERRO no MS "${environment.app.name}", método "retornaDadosViagem".
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
