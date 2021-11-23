import { ICotacaoVencedora } from "../../model/CotacaoVencedora";

export interface ICotacaoParceiroInterface {
  retornaCotacao(idUsuario: string, userIdParceiro: number, token: string):Promise<any>;

  menorPreco(arrayCotacao: any): ICotacaoVencedora;
}
