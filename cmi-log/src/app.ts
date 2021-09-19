import express from "express";
import bodyParser from "body-parser";
import { logger } from "./util/logger";
import { LogApi } from "./routes/Log.api";
import { DocsApi } from "./routes/docs.api";
import { MainApi } from "./routes/main.api";
import { ErrorApi } from "./routes/error.api";
import { environment } from "./config/environment";
import { handleError } from "./util/error.handler";
import { mergePatchBodyParser, middlewareForLog, verificaConexaoMongoMiddleware } from "./util/middleware";

const getApiControllers = (): (ErrorApi | MainApi | DocsApi | LogApi)[] => [
  new ErrorApi(), new MainApi(), new DocsApi(), new LogApi(),
];

const app = express();

const rotasPostVerificadas: Array<string> = [
];

rotasPostVerificadas.forEach((nomeDaRota: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  app.post(nomeDaRota, verificaConexaoMongoMiddleware);
});

app.locals.name = environment.app.name;
app.locals.version = environment.app.version;

app.use(bodyParser.json());

app.use(middlewareForLog);
app.use(mergePatchBodyParser);

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