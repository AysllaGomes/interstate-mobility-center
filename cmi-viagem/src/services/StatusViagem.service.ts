import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_NA_VERIFICACAO_DE_STATUS_USUARIO,
} from "../errors/erro.negocial";
import Viagem, { IViagem } from "../model/Viagem";
import { StatusViagemEnum } from "../model/enums/StatusViagem.enum";

export class StatusViagemService {
  public async obterUltimoStatusFinalizado(viagens: Array<IViagem>): Promise<IViagem[] | undefined> {
    let arrObjViagemFiltrado: Array<IViagem> = [];
    viagens.forEach((viagem) => {
      const objtUltimoStatus = viagem.statusViagem[viagem.statusViagem.length - 1];
      if (
        objtUltimoStatus.statusViagem === StatusViagemEnum.FATURADO
          || objtUltimoStatus.statusViagem === StatusViagemEnum.CANCELADO_PASSAGEIRO
      ) {
        arrObjViagemFiltrado = [
          ...arrObjViagemFiltrado, viagem,
        ];
      }
    });

    if (arrObjViagemFiltrado) {
      return arrObjViagemFiltrado;
    }
  }

  public async verificaSeUsuarioPossuiViagemEmAndamento(idUsuario: string): Promise<boolean> {
    const statusEmViagem = [
      StatusViagemEnum.CONTRATANDO,
      StatusViagemEnum.CONTRATADO,
    ];

    try {
      logger.info(`Buscando ultima viagem do usuário ${idUsuario}...`);

      const objViagem = await Viagem.findOne({
        idUsuarioCMU: idUsuario,
        statusViagem: { $exists: true },
      }).sort({ tsCriacao: "desc" });

      logger.info(`Verificando se o usuario ${idUsuario} possui viagem em andamento`);

      if (objViagem) {
        return statusEmViagem.includes(objViagem.statusViagem[objViagem.statusViagem.length - 1].statusViagem);
      }

      return false;
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "verificaSeUsuarioPossuiViagemEmAndamento".
        <'ERRO'>
          message: Houve um erro na verificação de status da viagem do usuário...
        Parâmetros da requisição:
          ID USUARIO: ${idUsuario}
      `);

      throw new ErroNegocial(...ERRO_NEGOCIAL_NA_VERIFICACAO_DE_STATUS_USUARIO);
    }
  }
}
