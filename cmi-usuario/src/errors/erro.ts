/**
 * Classe para representar a estrutura da mensagem de erro conforme descrito no padrao de erros, aonde:
 *
 * Obrigatorios
 * code               : Contém o código do erro. Deve ser numérico e conter no máximo 3 dígitos
 * source             : Nome do módulo ou da classe ou, quando operação IIB, número sequencial do erro
 * message            : Mensagem de erro para o usuário
 *
 * Opcionais
 * userHelp           : Orientação sobre como o usuário pode resolver o problema
 * developerMessage   : Mensagem técnica para o desenvolvedor
 * moreInfo           : Complemento do erro para o desenvolvedor
 */

export class ErroPadrao extends Error {
  code: string;

  source: string;

  userHelp?: string;

  developerMessage?: string;

  moreInfo?: string;

  readonly statusCode: number;

  constructor(code: string, message: string, statusCode: number, userHelp?: string,
    developerMessage?: string, moreInfo?: string) {
    super(message);
    this.code = code;
    this.source = (this.stack as string).split("\n")[1].replace("at", "").trim();
    this.userHelp = userHelp || "";
    this.developerMessage = developerMessage || "";
    this.moreInfo = moreInfo || "";
    this.statusCode = statusCode;
  }

  public toJSON(): {
    code: string,
    source: string,
    message: string,
    userHelp?: string,
    developerMessage?: string,
    moreInfo?: string,
    } {
    const erroJSON: {
      code: string,
      source: string,
      message: string,
      userHelp?: string,
      developerMessage?: string,
      moreInfo?: string,
    } = {
      code: this.code,
      source: this.source,
      message: this.message,
    };
    if (this.userHelp) {
      erroJSON.userHelp = this.userHelp;
    }
    if (this.developerMessage) {
      erroJSON.developerMessage = this.developerMessage;
    }
    if (this.moreInfo) {
      erroJSON.moreInfo = this.moreInfo;
    }
    return erroJSON;
  }

  StringFormat = (str: string, ...args: string[]): string => str.replace(/{(\d+)}/g, (match, index) => args[index] || "");

  public formatMessage(...args: string[]): ErroPadrao {
    this.message = this.StringFormat(this.message as string, ...args);
    return this;
  }

  public formatUserHelp(...args: string[]): ErroPadrao {
    this.userHelp = this.StringFormat(this.userHelp as string, ...args);
    return this;
  }

  public formatDeveloperMessage(...args: string[]): ErroPadrao {
    this.developerMessage = this.StringFormat(this.developerMessage as string, ...args);
    return this;
  }

  public formatMoreInfo(...args: string[]): ErroPadrao {
    this.moreInfo = this.StringFormat(this.moreInfo as string, ...args);
    return this;
  }
}

// Erros
export enum ErrorTypes {
  TIPO_ERRO_NEGOCIAL = "ErroNegocial",
  TIPO_ERRO_SQL = "ErroSQL",
  TIPO_ERRO_EXTERNO = "ErroExterno"
}
