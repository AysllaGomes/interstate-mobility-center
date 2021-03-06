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
export const ERRO_SQL_AO_SALVAR_PASSAGEIRO: [string, string] = ["998", "Não foi possível salvar o passageiro."];
export const ERRO_SQL_AO_BUSCAR_DADOS_DA_VIAGEM_COM_O_USUARIO: [string, string] = ["997", "Não foi encontrado os dados da viagem com o usuário vinnculado."];
export const ERRO_SQL_AO_BUSCAR_PASSAGEIRO: [string, string] = ["996", "Não foi possível buscar o passageiro '{0}'."];
export const ERRO_SQL_DESABILITAR_OS_DADOS_DO_PASSAGEIRO_DA_VIAGEM: [string, string] = ["995", "Não foi possível desabilitar a viagem do passageiro: '{0}'."];
export const ERRO_SQL_AO_VERIFICAR_SE_O_CONTRATO_TEM_CONDICOES_PARA_DESATIVAR_MODO_SUSPENSO: [string, string] = ["994", "O passageiro '{0}' não pode suspender a viagem. Pois, encontra-se suspenso!"]

export const listErroSQL = [
  new ErroSQL(...ERRO_NA_CONEXAO_COM_O_MONGODB),
  new ErroSQL(...ERRO_SQL_AO_SALVAR_PASSAGEIRO),
  new ErroSQL(...ERRO_SQL_AO_BUSCAR_PASSAGEIRO),
  new ErroSQL(...ERRO_SQL_AO_BUSCAR_DADOS_DA_VIAGEM_COM_O_USUARIO),
  new ErroSQL(...ERRO_SQL_AO_VERIFICAR_SE_O_CONTRATO_TEM_CONDICOES_PARA_DESATIVAR_MODO_SUSPENSO),
];
