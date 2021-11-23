import { convertNumber } from "../util/utils";

export interface IEnvironment {
  app: {
    name: string;
    nameUnderscore: string;
    version: string;
    description: string;
    host: string;
    hostCMIAutenticacao: string;
    hostCMIUsuarioParceiro: string;
    port: number;
    env: string;
    logLevel: string;
  };
  db: {
    uri: string;
  };
  parceiros: {
    host: string;
    logo: string;
    centroDeCustoNock: number;
  };
  isValid: () => boolean;
}

export const environment: IEnvironment = {
  app: {
    name: process.env.npm_package_name || "cmi-viagem",
    nameUnderscore: (process.env.npm_package_name || "").split("-").join("_") || "cmi-viagem".split("-").join("_"),
    version: process.env.npm_package_version || "?.?.?",
    description: process.env.npm_package_description || "cmi-viagem in node with expressjs",
    host: process.env.APP_HOST || "localhost:3002",
    hostCMIAutenticacao: process.env.CMI_AUTENTICACAO_HOST || "http://localhost:3000",
    hostCMIUsuarioParceiro: process.env.CMI_USUARIO_PARCEIRO_HOST || "http://localhost:3001",
    env: process.env.NODE_ENV || "local",
    port: convertNumber(process.env.API_PORT, 3002),
    logLevel: process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : "debug",
  },
  db: {
    uri: process.env.BD_URI || "mongodb+srv://mongocmi:n1E8DxRjR4INjLws@cmi.q6k96.mongodb.net/cmi",
  },
  parceiros: {
    host: process.env.PARCEIRO_HOST || "https://qa-clientintegration.nock.in",
    logo: process.env.LOGO_PARCEIRO || "https://avatars.githubusercontent.com/u/17545810?s=280&v=4",
    centroDeCustoNock: convertNumber(process.env.CENTRO_DE_CUSTO_NOCK, 0),
  },
  isValid() {
    return true;
  },
};
