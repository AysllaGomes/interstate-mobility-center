import { logger } from "../util/logger";
import ParceiroModel from "../model/Parceiro";
import { AutenticacaoService } from "./Autenticacao.service";

export class ParceiroService {
  public async retornaDadosDosParceiros(todosOsParceiros?: string): Promise<Array<object>> {
    logger.info("Buscando dados dos parceiros...");

    if (todosOsParceiros) {
      return ParceiroModel.find();
    }

    return ParceiroModel.find({ ativo: true });
  }

  public async retornaDadosDosParceirosComToken(): Promise<Array<object>> {
    logger.info("Buscando dados dos parceiros...");

    const autenticacaoService = new AutenticacaoService();

    const arrParceiros = await ParceiroModel.find({ ativo: true });
    const arrTokenParceiros = await autenticacaoService.retornaTokenParceiros();
    const arrRetorno:Array<object> = [];

    arrParceiros.forEach((parceiro) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      let dadosToken = { ...parceiro._doc };

      if (arrTokenParceiros[parceiro.codigoParceiro]) {
        dadosToken = {
          ...dadosToken,
          token: arrTokenParceiros[parceiro.codigoParceiro],
        };
      }

      arrRetorno.push(dadosToken);
    });

    return arrRetorno;
  }
}
