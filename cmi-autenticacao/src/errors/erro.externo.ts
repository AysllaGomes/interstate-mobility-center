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

export const ERRO_EXTERNO_TOKEN_DOS_PARCEIROS: [string, string, string] = [
  "100",
  "Não foi possível se comunicar com nenhum dos parceiros.",
  "Não foi possível recuperar o token de nenhum dos parceiros ativos",
];

export const listErroExterno = [
  new ErroExterno(...ERRO_EXTERNO_TOKEN_DOS_PARCEIROS),
];
