import express, { NextFunction } from "express";
import { middlewareTracer } from "jaeger-tracer-decorator";
import { v1 as uuidv1 } from "uuid";
import { logger } from "./logger";
import Database from "../config/database";
import { ConexaoMongoEnum } from "../model/enums/ConexaoMongo.enum";
import { ERRO_NA_CONEXAO_COM_O_MONGODB, ErroSQL } from "../errors/erro.sql";

export const endpointForMiddleware = (path: string): boolean => (path !== "/metrics")
  && (path !== "/info")
  && (path !== "/health")
  && (path !== "/errors")
  && !path.includes("/assets")
  && !path.includes("/api-docs");

export const endpointOperation = (path: string): string => {
  switch (true) {
    case path.startsWith("/v0/savingsAccount/balance/"):
      return "SavingsAccount_Balace_API";
    default:
      return path;
  }
};

export const middlewareForLog = (req: express.Request, resp: express.Response, next: express.NextFunction) => {
  if (endpointForMiddleware(req.path)) {
    const uuid = uuidv1();
    req.headers.requestId = uuid;

    logger.info("Request Endpoint:", { requestID: req.headers.requestId, details: { path: req.path, method: req.method } });

    resp.on("finish", () => logger.info("Response Endpoint", { requestID: req.headers.requestId, details: { path: req.path, method: req.method } }));
    resp.on("close", () => logger.info("Response Endpoint", { requestID: req.headers.requestId, details: { path: req.path, method: req.method } }));
    return next();
  }
  return next();
};

export const mergePatchBodyParser = (req: express.Request, resp: express.Response, next: express.NextFunction) => {
  const mpContentType = "application/merge-patch+json";
  if (req.headers["content-type"] === mpContentType && req.method === "PATCH") {
    (req as any).rawBody = req.body;
    try {
      req.body = JSON.parse(req.body);
    } catch (e) {
      return resp.status(400).send(`Invalid content: ${e.message}`);
    }
  }
  return next();
};

export const middlewareTracing = (tracer: any) => {
  const options = {
    tracer,
    endpointForTracing: endpointForMiddleware,
    transformPathInSpanName: endpointOperation,
  };

  return middlewareTracer(options);
};

export const verificaConexaoMongoMiddleware = (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  logger.info("Verificando conexão com o MongoDB.");
  const conexao = Database.verificaConexao();

  if (conexao !== ConexaoMongoEnum.connected) {
    const tentaConexaoNovamente = await Database.conectar();

    if (tentaConexaoNovamente === ConexaoMongoEnum.disconnected) {
      logger.error("Erro ao estabelecer conexão com o MongoDB.");
      next(new ErroSQL(...ERRO_NA_CONEXAO_COM_O_MONGODB));
    }
    next();
  }

  next();
});
