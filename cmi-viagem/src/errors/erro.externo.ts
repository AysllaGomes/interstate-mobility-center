import { ErroPadrao, ErrorTypes } from "./erro";

export class ErroExterno extends ErroPadrao {
  constructor(
    code: string,
    message: string,
    userHelp?: string,
    developerMessage?: string,
    moreInfo?: string,
  ) {
    super(code, message, 500, userHelp, developerMessage, moreInfo);
    this.name = ErrorTypes.TIPO_ERRO_EXTERNO;
  }
}

export const ERRO_EXTERNO_VIAGEM_EM_ANDAMENTO: [string, string] = ["101", "Ocorreu um erro na busca de viagem, verifique se já existe uma viagem em andamento"];
export const ERRO_EXTERNO_AO_CONSULTAR_USUARIO: [string, string] = ["102", "Ocorreu um erro na requisição do usuario: {0}"];
export const ERRO_EXTERNO_AO_CONSULTAR_TOKEN_PARCEIRO: [string, string] = ["13", "Ocorreu um erro na requisição para o retorno do parceiro: {0}"];
export const ERRO_EXTERNO_NA_BUSCA_DO_USUARIO_NOS_PARCEIROS: [string, string, string] = [
  "111", "Ocorreu um erro ao buscar o usuario '{0}' no parceiros, erro: {1}",
  "Verifique se existe algum parceiro ativo no BD, verifique se eles estão disponíveis e/ou se o usuario está cadastrado em algum deles",
];

export const listErroExterno = [
  new ErroExterno(...ERRO_EXTERNO_VIAGEM_EM_ANDAMENTO),
  new ErroExterno(...ERRO_EXTERNO_AO_CONSULTAR_USUARIO),
  new ErroExterno(...ERRO_EXTERNO_AO_CONSULTAR_TOKEN_PARCEIRO),
  new ErroExterno(...ERRO_EXTERNO_NA_BUSCA_DO_USUARIO_NOS_PARCEIROS),
];
