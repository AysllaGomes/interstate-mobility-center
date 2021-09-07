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
export const ERRO_NEGOCIAL_EMAIL_REPETIDO: [string, string] = ["003", "Você indicou que é um usuário novo, porém já existe uma conta com o e-mail. Experimente outro."];
export const ERRO_NEGOCIAL_REGISTRO_REPETIDO: [string, string] = ["004", "Ocorreu um erro com o REGISTRO, ele já foi cadastrado"];
export const ERRO_NEGOCIAL_CPF_REPETIDO: [string, string] = ["005", "Ocorreu um erro com o CPF, ele já foi cadastrado"];

export const listErroNegocio = [
  new ErroNegocial(...ERRO_NEGOCIAL_NA_VALIDACAO),
  new ErroNegocial(...ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS),
  new ErroNegocial(...ERRO_NEGOCIAL_EMAIL_REPETIDO),
  new ErroNegocial(...ERRO_NEGOCIAL_REGISTRO_REPETIDO),
  new ErroNegocial(...ERRO_NEGOCIAL_CPF_REPETIDO),
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
