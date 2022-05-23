import { ISolicitacaoViagemParceiro } from "../../model/interfaces/SolicitaViagemParceiro";

export interface ISolicitacaoViagemParceiroInterface {

  solicitaViagem(solicitacaoViagem: ISolicitacaoViagemParceiro, token: string): any;

  setaDadosNoFormatoDoJsonDoParceiro(solicitacaoViagem: ISolicitacaoViagemParceiro): any;

  cancelarViagem(idViagemNoParceiro: string, token: string): Promise<boolean>;
}
