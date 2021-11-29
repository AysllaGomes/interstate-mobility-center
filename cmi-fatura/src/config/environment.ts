import { convertNumber } from "../util/utils";

export interface IEnvironment {
  app: {
    name: string;
    nameUnderscore: string;
    version: string;
    description: string;
    host: string;
    hostCMIViagemParceiro: string;
    port: number;
    env: string;
    logLevel: string;
  };
  db: {
    uri: string;
  };
  isValid: () => boolean;
}

export const environment: IEnvironment = {
  app: {
    name: process.env.npm_package_name || "cmi-fatura",
    nameUnderscore: (process.env.npm_package_name || "").split("-").join("_") || "cmi-fatura".split("-").join("_"),
    version: process.env.npm_package_version || "?.?.?",
    description: process.env.npm_package_description || "cmi-fatura in node with expressjs",
    host: process.env.APP_HOST || "localhost:3006",
    hostCMIViagemParceiro: process.env.CMI_VIAGEM_PARCEIRO_HOST || "http://localhost:3002",
    env: process.env.NODE_ENV || "local",
    port: convertNumber(process.env.API_PORT, 3006),
    logLevel: process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : "debug",
  },
  db: {
    uri: process.env.BD_URI || "mongodb+srv://mongocmi:n1E8DxRjR4INjLws@cmi.q6k96.mongodb.net/cmi",
  },
  isValid() {
    return true;
  },
};
