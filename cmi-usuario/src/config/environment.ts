import { convertNumber } from "../util/utils";

export interface IEnvironment {
  app: {
    name: string;
    nameUnderscore: string;
    version: string;
    description: string;
    host: string;
    hostCMITermoDeUso: string;
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
    name: process.env.npm_package_name || "cmi-usuario",
    nameUnderscore: (process.env.npm_package_name || "").split("-").join("_") || "cmi-usuario".split("-").join("_"),
    version: process.env.npm_package_version || "?.?.?",
    description: process.env.npm_package_description || "cmi-usuario in node with expressjs",
    host: process.env.APP_HOST || "localhost:3001",
    hostCMITermoDeUso: process.env.CMI_TERMO_DE_USO_HOST || "http://localhost:3008",
    env: process.env.NODE_ENV || "local",
    port: convertNumber(process.env.API_PORT, 3001),
    logLevel: process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : "debug",
  },
  db: {
    uri: process.env.BD_URI || "mongodb+srv://mongocmi:n1E8DxRjR4INjLws@cmi.q6k96.mongodb.net/cmi",
  },
  isValid() {
    return true;
  },
};
