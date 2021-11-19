import axios from "axios";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import { IViagemDaFatura } from "../model/interfaces/ViagemDaFatura";
import { IEncerrarFatura } from "../model/interfaces/EncerrarFatura";
import {
  ErroExterno,
  ERRO_EXTERNO_VIAGEM_BUSCA_PELO_ID_FATURA,
} from "../errors/erro.externo";

export class ViagemService {
  public static async buscarViagensFinalizadaPorIdFatura(fechamentoFatura: IEncerrarFatura): Promise<IViagemDaFatura[]> {
    const { idFaturaContratoMobilidade } = fechamentoFatura;

    try {
      logger.debug(`Consulta da viagem para buscar a fatura: ${idFaturaContratoMobilidade}`);

      const result = await axios({
        method: "get",
        headers: {
          "id-Fatura-Contrato-Mobilidade": `${idFaturaContratoMobilidade}`,
        },
        url: `${environment.app.hostCMIViagemParceiro}/viagem/fatura`,
      });

      return result.data;
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "buscarViagensFinalizadaPorIdFatura".
        <'ERRO'>
          message: Erro na buscar da viagem pela fatura: ${idFaturaContratoMobilidade}
        Parâmetros da requisição:
          ID FATURA: ${idFaturaContratoMobilidade}
        Resposta:
        <'ERRO EXTERNO'>
          code: ${error.code}
          message: ${error.message}.
      `);

      throw new ErroExterno(...ERRO_EXTERNO_VIAGEM_BUSCA_PELO_ID_FATURA).formatMessage(idFaturaContratoMobilidade);
    }
  }
}
