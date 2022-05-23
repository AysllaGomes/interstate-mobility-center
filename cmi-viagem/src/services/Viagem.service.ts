import { NextFunction } from "express";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroExterno,
  AREA_NAO_ATENDIDA_POR_NENHUM_PARCEIRO,
} from "../errors/erro.externo";
import { IRetornaCotacao } from "../model/interfaces/RetornaCotacao";
import { ICotacaoVencedora } from "../model/interfaces/CotacaoVencedora";

export class ViagemService {
  public static setaRetornoCotaco(idDaCotacao: string, cotacaoVencedora: ICotacaoVencedora, next: NextFunction): IRetornaCotacao | undefined {
    try {
      if (cotacaoVencedora.parceiro) {
        const nomeFantasiaParceiro = cotacaoVencedora.parceiro;

        return {
          idViagem: idDaCotacao,
          parceiro: nomeFantasiaParceiro,
          produto: cotacaoVencedora.produto,
          valor: cotacaoVencedora.valor,
          icone: cotacaoVencedora.icone,
        };
      }
      next(new ErroExterno(...AREA_NAO_ATENDIDA_POR_NENHUM_PARCEIRO).formatMessage());
    } catch (error) {
      logger.error(`
      ERRO no MS "${environment.app.name}", método "setaRetornoCotaco".
      <'ERRO'>
        message: Houve um erro ao tentar setar retorno da cotacao...
      Parâmetros da requisição:
        ID COTACAO: ${idDaCotacao}
        PARCEIRO: ${cotacaoVencedora.parceiro}
        VALOR: ${cotacaoVencedora.valor}
        PRODUTO: ${cotacaoVencedora.produto}
        VALOR ECONOMIZADO: ${cotacaoVencedora.valorEconomizado}
        OBJETO ID PARCEIRO: ${cotacaoVencedora.objIdParceiro}
      `);
      throw new ErroExterno(...AREA_NAO_ATENDIDA_POR_NENHUM_PARCEIRO);
    }
  }
}
