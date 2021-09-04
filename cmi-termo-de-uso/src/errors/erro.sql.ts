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
export const ERRO_SQL_AO_INCREMENTAR_O_NUMERO_DA_VERSAO_TERMO_DE_USO: [string, string] = ["998", "Ocorreu um erro ao incrementar o número da versão do termo de uso, erro: {0}"];
export const ERRO_SQL_AO_SALVAR_TERMO_DE_USO: [string, string] = ["997", "Não foi possível salvar o termo de uso."];
export const ERRO_SQL_AO_INCREMENTAR_NUMERO_DA_VERSAO_TERMO_DE_USO: [string, string] = ["996", "Ocorreu um erro ao incrementar o número da versão do termo de uso, erro: {0}"];
export const ERRO_SQL_TERMO_DE_USO_NAO_ENCONTRADO: [string, string] = ["995", "Não foi encontrado nenhum termo de uso, verifique os filtros usados."];
export const ERRO_SQL_NAO_FOI_ENCONTRANDO_TERMOS_VIGENTE_NO_MOMENTO: [string, string] = ["994", "Não foi encontrado nenhum termo vigênte no momento."];

export const listErroSQL = [
  new ErroSQL(...ERRO_NA_CONEXAO_COM_O_MONGODB),
  new ErroSQL(...ERRO_SQL_AO_INCREMENTAR_O_NUMERO_DA_VERSAO_TERMO_DE_USO),
  new ErroSQL(...ERRO_SQL_AO_SALVAR_TERMO_DE_USO),
  new ErroSQL(...ERRO_SQL_AO_INCREMENTAR_NUMERO_DA_VERSAO_TERMO_DE_USO),
  new ErroSQL(...ERRO_SQL_TERMO_DE_USO_NAO_ENCONTRADO),
  new ErroSQL(...ERRO_SQL_NAO_FOI_ENCONTRANDO_TERMOS_VIGENTE_NO_MOMENTO),
];
