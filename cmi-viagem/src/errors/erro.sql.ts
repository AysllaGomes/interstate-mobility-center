import { ErroPadrao, ErrorTypes } from "./erro";

export class ErroSQL extends ErroPadrao {
  constructor(
    code: string,
    message: string,
    userHelp?: string,
    developerMessage?: string,
    moreInfo?: string,
  ) {
    super(code, message, 500, userHelp, developerMessage, moreInfo);
    this.name = ErrorTypes.TIPO_ERRO_SQL;
  }
}

export const ERRO_NA_CONEXAO_COM_O_MONGODB: [string, string] = ["999", "Ocorreu um erro, não foi possível se conectar ao o MongoDB."];
export const ERRO_SQL_AO_RETORNAR_O_TOKEN_DOS_PARCEIROS: [string, string] = ["998", "Ocorreu um erro ao retornar o token dos parceiros, erro: {0}"];

export const listErroSQL = [
  new ErroSQL(...ERRO_NA_CONEXAO_COM_O_MONGODB),
  new ErroSQL(...ERRO_SQL_AO_RETORNAR_O_TOKEN_DOS_PARCEIROS),
];
