import express from "express";
import { logger } from "./util/logger";
import { DocsApi } from "./routes/docs.api";
import { MainApi } from "./routes/main.api";
import { ErrorApi } from "./routes/error.api";
import { handleError } from "./util/error.handler";
import { verificaConexaoMongoMiddleware } from "./util/middleware";

const getApiControllers = (): (ErrorApi | MainApi | DocsApi)[] => [
  new ErrorApi(), new MainApi(), new DocsApi(),
];

const app = express();

const rotasPostVerificadas: Array<string> = [
];

rotasPostVerificadas.forEach((nomeDaRota: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  app.post(nomeDaRota, verificaConexaoMongoMiddleware);
});

logger.info("Configurando Rotas");
for (let i = 0; i < getApiControllers().length; i++) {
  const router = getApiControllers()[i];
  if (router.active()) {
    router.applyRoutes(app);
    logger.info(`Rota ${router.constructor ? router.constructor.name : ""} configurada`);
  }
}

app.use(handleError);
logger.info("Rotas Configuradas");

export default app;
