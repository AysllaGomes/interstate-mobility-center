import axios from "axios";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroExterno,
  ERRO_EXTERNO_AO_CONSULTAR_USUARIO,
} from "../errors/erro.externo";
import { IUsuario } from "../model/Usuario";

export class UsuarioService {
  static async retornaDadosPassageiro(idUsuario: string): Promise<IUsuario> {
    try {
      logger.debug(`Consultando os dados do usuario: ${idUsuario}`);

      const result = await axios({
        method: "get",
        url: `${environment.app.hostCMIUsuarioParceiro}/dados/usuario/${idUsuario}`,
      });

      return result.data;
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "retornaDadosPassageiro".
        <'ERRO'>
          message: ERRO na consulta dos dados do usuario: \n ${error}
        Parâmetros da requisição:
          ID USUARIO: ${idUsuario}
      `);

      throw new ErroExterno(...ERRO_EXTERNO_AO_CONSULTAR_USUARIO).formatMessage(error.message);
    }
  }
}
