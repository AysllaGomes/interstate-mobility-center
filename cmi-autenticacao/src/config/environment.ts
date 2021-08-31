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
    proxy: string;
    proxyUse: string;
  };
  db: {
    pwd: string;
    url: string;
    user: string;
  };
  wappa: {
    host?: string,
    hostGestor?: string,
    user?: string,
    pwd?: string,
  };
  cabify: {
    host?: string,
    user?: string,
    pwd?: string,
  };
  noveNovePop: {
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
    proxy: process.env.proxy_http || "http://cachebb.psc-proxy:80",
    proxyUse: process.env.proxy_use || "false",
  },
  db: {
    url: process.env.BD_URL || "mongodb://mongo-cmi.servicos.com.br:27017/cmi",
    user: process.env.BD_USER || "mongocmi",
    pwd: process.env.BD_PWD || "MongoCmi@123",
  },
  wappa: {
    host: process.env.WAPPA_HOST || "https://qa-clientintegration.wappa.in",
    hostGestor: process.env.WAPPA_GESTOR_HOST || "https://qa-gestor-api.wappa.in",
    user: process.env.WAPPA_USER || "61bbina002",
    pwd: process.env.WAPPA_PWD || "00457340",
  },
  cabify: {
    host: process.env.CABIFY_HOST || "https://sandbox.cabify-testing.com",
    user: process.env.CABIFY_USER || "7b6441e4f5e542efb51eeec20b1dff9e",
    pwd: process.env.CABIFY_PWD || "zZNQIYVdauWlAK_G",
  },
  noveNovePop: {
    host: process.env.NOVENOVE_HOST || "https://sandbox-api-corp.99app.com/v2",
    key: process.env.KEY_PWD || "TOCAdtdwh63mwUPAuPQLP2bR17kAXFzY5WkzzDJL",
  },
  isValid() {
    return true;
  },
};
