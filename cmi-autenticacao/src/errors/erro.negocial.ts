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

// Erro Generico para situações de erro em regra de negócio
export const ERRO_NEGOCIAL_GENERICO: [string, string] = ["001", "Ocorreu um erro ao processar a requisição"];

export const listErroNegocio = [
  new ErroNegocial(...ERRO_NEGOCIAL_GENERICO),
];
