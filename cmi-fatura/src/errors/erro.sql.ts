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
export const ERRO_SQL_REGISTRO_NAO_ENCONTRADO: [string, string] = ["998", "Registro nao localizado na tabela de {0}"];
export const ERRO_SQL_AO_INCREMENTAR_NUMERO_DA_FATURA: [string, string] = ["997", "Ocorreu um erro ao incrementar o número da fatura, erro: {0}"];
export const ERRO_SQL_AO_SALVAR_DADOS_DE_FATURA: [string, string, string] = ["996", "Não foi possível salvar a fatura {0}.", "Referente ao seguinte contrato {0}."];

export const listErroSQL = [
  new ErroSQL(...ERRO_NA_CONEXAO_COM_O_MONGODB),
  new ErroSQL(...ERRO_SQL_REGISTRO_NAO_ENCONTRADO),
  new ErroSQL(...ERRO_SQL_AO_INCREMENTAR_NUMERO_DA_FATURA),
  new ErroSQL(...ERRO_SQL_AO_SALVAR_DADOS_DE_FATURA),
];
