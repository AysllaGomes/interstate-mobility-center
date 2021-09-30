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

export const ERRO_EXTERNO_VIAGEM_EM_ANDAMENTO: [string, string] = ["101", "ERRO na busca de viagem, verifique se já existe uma viagem em andamento"];
export const ERRO_EXTERNO_AO_CONSULTAR_USUARIO: [string, string] = ["102", "Ocorreu um erro na requisição do usuario: {0}"];

export const listErroExterno = [
  new ErroExterno(...ERRO_EXTERNO_VIAGEM_EM_ANDAMENTO),
  new ErroExterno(...ERRO_EXTERNO_AO_CONSULTAR_USUARIO),
];
