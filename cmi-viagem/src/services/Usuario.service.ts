import axios from "axios";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroExterno,
  ERRO_EXTERNO_AO_CONSULTAR_USUARIO,
  ERRO_EXTERNO_NA_BUSCA_DO_USUARIO_NOS_PARCEIROS,
} from "../errors/erro.externo";
import { IUsuario } from "../model/Usuario";
import { IRealizaCotacao } from "../model/interfaces/RealizaCotacao";
import { IUsuarioParceiro } from "../model/interfaces/UsuarioParceiro";

export class UsuarioService {
  static async retornaDadosPassageiro(idUsuario: string): Promise<IUsuario> {
    try {
      logger.debug(`Consultando os dados do usuario: ${idUsuario}`);

      const result = await axios({
        method: "get",
        url: `${environment.app.hostCMIUsuarioParceiro}/usuario/${idUsuario}`,
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

  static async consultaUsuarioDoParceiro(body: IRealizaCotacao): Promise<IUsuarioParceiro> {
    try {
      logger.debug(`Consulta do usuário ${body.idUsuario} nos parceiros...`);

      const result = await axios({
        method: "get",
        url: `${environment.app.hostCMIUsuarioParceiro}/parceiro/usuarios/${body.idUsuario}`,
      });

      return result.data;
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "consultaUsuarioDoParceiro".
        <'ERRO'>
          message: ERRO ao realizar a consulta do usuario ${body.idUsuario} nos parceiros...
        Parâmetros da requisição:
          ID USUÁRIO: ${body.idUsuario}
      `);

      throw new ErroExterno(...ERRO_EXTERNO_NA_BUSCA_DO_USUARIO_NOS_PARCEIROS).formatMessage(body.idUsuario, error.message);
    }
  }
}
