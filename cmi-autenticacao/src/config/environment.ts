import { convertNumber } from "../util/utils";

export interface IEnvironment {
  app: {
    name: string;
    nameUnderscore: string;
    version: string;
    description: string;
    host: string;
    port: number;
    env: string;
    logLevel: string;
    tempoRequestTimeout: number;
  };
  db: {
    uri: string;
  };
  stranger: {
    host?: string,
    user?: string,
    pwd?: string,
  };
  nock: {
    host?: string,
    key?: string,
  };
  isValid: () => boolean;
}

export const environment: IEnvironment = {
  app: {
    name: process.env.npm_package_name || "cmi-autenticacao",
    nameUnderscore: (process.env.npm_package_name || "").split("-").join("_") || "cmi-autenticacao".split("-").join("_"),
    version: process.env.npm_package_version || "?.?.?",
    description: process.env.npm_package_description || "cmi-autenticacao in node with expressjs",
    host: process.env.APP_HOST || "localhost:3000",
    env: process.env.NODE_ENV || "local",
    port: convertNumber(process.env.API_PORT, 3000),
    logLevel: process.env.LOG_LEVEL ? process.env.LOG_LEVEL.toLowerCase() : "debug",
    tempoRequestTimeout: convertNumber(process.env.tempo_request_timeout, 20000),
  },
  db: {
    uri: process.env.BD_URI || "mongodb+srv://mongocmi:n1E8DxRjR4INjLws@cmi.q6k96.mongodb.net/cmi",
  },
  nock: {
    host: process.env.NOCK_HOST || "https://sandbox-api-corp.nockapp.com/v2",
    key: process.env.KEY_PWD || "TOCAdtdwh63mwUPAuPQLP2bR17kAXFzY5WkzzDJL",
  },
  stranger: {
    host: process.env.STRANGER_HOST || "https://qa-clientintegration.stranger.in",
    user: process.env.STRANGER_USER || "61bbina002",
    pwd: process.env.STRANGER_PWD || "00457340",
  },
  isValid() {
    return true;
  },
};
