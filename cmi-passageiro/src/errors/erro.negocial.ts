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
export const ERRO_NEGOCIAL_CPF_REPETIDO: [string, string] = ["003", "Ocorreu um erro com o CPF, ele já foi cadastrado"];
export const ERRO_NEGOCIAL_BUSCAR_DADOS_VIAGEM_VINCULADAS_AO_PASSAGEIRO: [string, string] = ["004", "Ocorreu um erro ao ir no MS Viagem, para retornar os dados da viagem: '{0}'."];
export const ERRO_NEGOCIAL_BUSCAR_DADOS_DADOS_PASSAGEIRO: [string, string] = ["005", "Ocorreu um erro ao ir no MS Usuário, para retornar os dados do usuário: '{0}'."];

export const listErroNegocio = [
  new ErroNegocial(...ERRO_NEGOCIAL_NA_VALIDACAO),
  new ErroNegocial(...ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS),
  new ErroNegocial(...ERRO_NEGOCIAL_CPF_REPETIDO),
  new ErroNegocial(...ERRO_NEGOCIAL_BUSCAR_DADOS_VIAGEM_VINCULADAS_AO_PASSAGEIRO),
  new ErroNegocial(...ERRO_NEGOCIAL_BUSCAR_DADOS_DADOS_PASSAGEIRO),
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
