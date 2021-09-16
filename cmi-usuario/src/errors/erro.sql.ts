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
export const ERRO_SQL_AO_SALVAR_USUARIO: [string, string] = ["998", "Não foi possível salvar o usuário."];
export const ERRO_SQL_EMAIL_INFORMADO_DO_USUARIO_NAO_ENCONTRADO: [string, string] = ["997", "Não foi encontrado nenhum usuário, verifique os filtros usados."];

export const listErroSQL = [
  new ErroSQL(...ERRO_NA_CONEXAO_COM_O_MONGODB),
  new ErroSQL(...ERRO_SQL_AO_SALVAR_USUARIO),
  new ErroSQL(...ERRO_SQL_EMAIL_INFORMADO_DO_USUARIO_NAO_ENCONTRADO),
];
