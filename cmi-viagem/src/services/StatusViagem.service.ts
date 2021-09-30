import { IViagem } from "../model/Viagem";
import { StatusViagemEnum } from "../model/enums/StatusViagem.enum";

export class StatusViagemService {
  public async obterUltimoStatusFinalizado(viagens: Array<IViagem>): Promise<IViagem[] | undefined> {
    let arrObjViagemFiltrado: Array<IViagem> = [];
    viagens.forEach((viagem) => {
      const objtUltimoStatus = viagem.statusViagem[viagem.statusViagem.length - 1];
      if (
        objtUltimoStatus.statusViagem === StatusViagemEnum.FINALIZADO
          || objtUltimoStatus.statusViagem === StatusViagemEnum.NO_SHOW
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
}
