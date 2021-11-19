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

export const ERRO_EXTERNO_VIAGEM_BUSCA_PELO_ID_FATURA: [string, string] = ["101", "ERRO ao buscar a viagem referênte ao contrato: {0} "];

export const listErroExterno = [
  new ErroExterno(...ERRO_EXTERNO_VIAGEM_BUSCA_PELO_ID_FATURA),
];
