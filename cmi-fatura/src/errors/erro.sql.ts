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
export const ERRO_SQL_FATURA_NAO_ENCONTRADA: [string, string] = ["995", "Não foi encontrado nenhuma fatura, verifique os filtros usados."];
export const ERRO_SQL_AO_REALIZAR_A_BUSCA_DA_FATURA_COM_A_SITUACAO_ESTADO_DA_FATURA: [string, string] = [
  "994", "A fatura: {0}, não está na situação \"INICIADA\" ou \"EM PROCESSAMENTO\" OU o registro não foi encontrado na base de dados.",
];
export const ERRO_SQL_AO_ATUALIZAR_REGISTRO_PARA_FECHAMENTO_FATURA: [string, string] = ["993", "Ocorreu um erro, na fatura: {0}, e seu registro não foi atualizado."];

export const listErroSQL = [
  new ErroSQL(...ERRO_NA_CONEXAO_COM_O_MONGODB),
  new ErroSQL(...ERRO_SQL_REGISTRO_NAO_ENCONTRADO),
  new ErroSQL(...ERRO_SQL_AO_INCREMENTAR_NUMERO_DA_FATURA),
  new ErroSQL(...ERRO_SQL_AO_SALVAR_DADOS_DE_FATURA),
  new ErroSQL(...ERRO_SQL_FATURA_NAO_ENCONTRADA),
  new ErroSQL(...ERRO_SQL_AO_REALIZAR_A_BUSCA_DA_FATURA_COM_A_SITUACAO_ESTADO_DA_FATURA),
  new ErroSQL(...ERRO_SQL_AO_ATUALIZAR_REGISTRO_PARA_FECHAMENTO_FATURA),
];
