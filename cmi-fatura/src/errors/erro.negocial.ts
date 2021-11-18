import { ErroPadrao, ErrorTypes } from "./erro";

export class ErroNegocial extends ErroPadrao {
  constructor(
    code: string,
    message: string,
    userHelp?: string,
    developerMessage?: string,
    moreInfo?: string,
  ) {
    super(code, message, 422, userHelp, developerMessage, moreInfo);
    this.name = ErrorTypes.TIPO_ERRO_NEGOCIAL;
  }
}

export const ERRO_NEGOCIAL_NA_VALIDACAO: [string, string] = ["001", "Ocorreu um erro na validação: {0}"];
export const ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS: [string, string] = ["002", "Ocorreu um erro, existe(m) propriedade(s) obrigatória(s) não informada(s)."];
export const ERRO_NEGOCIAL_JA_EXISTE_FATURA_ABERTA_PRA_ESSE_CONTRATO_NESSE_PERIODO: [string, string] = ["003", "Ocorreu um erro, já existe uma fatura aberta nesse período para o contrato: '{0}'"];
export const ERRO_NEGOCIAL_FATURA_COM_INCONSISTENCIAS: [string, string] = ["004", "Ocorreu um erro, a fatura: '{0}' possui inconsistências"];

export const listErroNegocio = [
  new ErroNegocial(...ERRO_NEGOCIAL_NA_VALIDACAO),
  new ErroNegocial(...ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS),
  new ErroNegocial(...ERRO_NEGOCIAL_JA_EXISTE_FATURA_ABERTA_PRA_ESSE_CONTRATO_NESSE_PERIODO),
  new ErroNegocial(...ERRO_NEGOCIAL_FATURA_COM_INCONSISTENCIAS),
];

/**
 * @swagger
 *
 * definitions:
 *   Erro_Validacao:
 *     type: object
 *     example:
 *          {
 *              code: "001",
 *              source: "path_do_endpoint",
 *              message: "Ocorreu um erro na validação: \"CAMPO_AQUI\" é obrigatório",
 *          }
 */
