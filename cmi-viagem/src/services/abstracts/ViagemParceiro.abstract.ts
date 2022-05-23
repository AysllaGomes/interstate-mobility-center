import { IViagem } from "../../model/Viagem";
import { ICotacaoVencedora } from "../../model/CotacaoVencedora";
import { IStatusViagemParceiro } from "../../model/interfaces/StatusViagemParceiro";
import { ICotacaoParceiroInterface } from "../interfaces/CotacaoParceiro.interface";
import { ISolicitacaoViagemParceiro } from "../../model/interfaces/SolicitaViagemParceiro";
import { ISolicitacaoViagemParceiroInterface } from "../interfaces/SolicitacaoViagemParceiro.interface";

export abstract class ViagemParceiroAbstract implements ICotacaoParceiroInterface, ISolicitacaoViagemParceiroInterface {
  abstract retornaCotacao(idUsuario: any, userIdParceiro: number, token: string): Promise<any | undefined>;

  abstract menorPreco(arrayCotacoesCabify: any): ICotacaoVencedora;

  abstract solicitaViagem(solicitacaoViagem: ISolicitacaoViagemParceiro, token: string): any;

  abstract setaDadosNoFormatoDoJsonDoParceiro(solicitacaoViagem: ISolicitacaoViagemParceiro): any;

  abstract pegaStatusAdapter(viagem: IViagem, token: string): Promise<IStatusViagemParceiro>;

  abstract cancelarViagem(idViagemNoParceiro: string, token: string): Promise<boolean>;

  abstract formataPrecoEmReais(precoCotacao: number): number;
}
