import axios from "axios";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_BUSCAR_DADOS_DADOS_PASSAGEIRO,
} from "../errors/erro.negocial";

export class UsuarioService {
  public static async retornarDadosUsuario(idUsuario: string): Promise<any> {
    try {
      logger.debug(`Consulta de dados do passageiro ${idUsuario}`);

      const result = await axios({
        method: "get",
        url: `${environment.app.hostCMIUsuario}/usuario/${idUsuario}`,
      });

      return result.data;
    } catch (error) {
      const erroFormatado = (`
        ERRO no MS "${environment.app.name}", método "retornarDadosUsuario".
        <'ERRO'>
          message: Erro na buscar os dados do usuário: ${idUsuario}
        Parâmetros da requisição:
          ID USUÁRIO: ${idUsuario}
        Resposta:
        <'ERRO EXTERNO'>
          code: ${error.code}
          message: ${error.message}.
      `);

      logger.error(erroFormatado);

      throw new ErroNegocial(...ERRO_NEGOCIAL_BUSCAR_DADOS_DADOS_PASSAGEIRO).formatMessage(idUsuario);
    }
  }
}
