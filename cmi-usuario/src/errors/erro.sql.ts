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
export const ERRO_SQL_BUSCA_DADOS_USUARIO: [string, string] = ["996", "Ocorreu um erro na busca do usuário {0}, não foi encontrado na base de dados."];
export const ERRO_AO_ATUALIZAR_TERMO_DE_USO_USUARIO: [string, string] = ["995", "Ocorreu um erro ao atualizar os dados do termo de uso: {0}."];
export const ERRO_SITAUCAO_VIGENCIA_TERMO_DE_USO_NAO_ENCONTRADO: [string, string] = ["994", "Não há termo vigente no momento: {0}."];
export const ERRO_AO_ATUALIZAR_DADOS_DE_PAGAMENTO_USUARIO: [string, string] = ["993", "Ocorreu um erro ao atualizar os dados de pagamento: {0}."];

export const listErroSQL = [
  new ErroSQL(...ERRO_NA_CONEXAO_COM_O_MONGODB),
  new ErroSQL(...ERRO_SQL_AO_SALVAR_USUARIO),
  new ErroSQL(...ERRO_SQL_EMAIL_INFORMADO_DO_USUARIO_NAO_ENCONTRADO),
  new ErroSQL(...ERRO_SQL_BUSCA_DADOS_USUARIO),
  new ErroSQL(...ERRO_AO_ATUALIZAR_TERMO_DE_USO_USUARIO),
  new ErroSQL(...ERRO_SITAUCAO_VIGENCIA_TERMO_DE_USO_NAO_ENCONTRADO),
  new ErroSQL(...ERRO_AO_ATUALIZAR_DADOS_DE_PAGAMENTO_USUARIO),
];
