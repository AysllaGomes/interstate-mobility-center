import bodyParser from "body-parser";
import express from "express";
import {
  middlewareForLog,
  mergePatchBodyParser,
  verificaConexaoMongoMiddleware,
} from "./util/middleware";
import { logger } from "./util/logger";
import { DocsApi } from "./routes/docs.api";
import { MainApi } from "./routes/main.api";
import { ErrorApi } from "./routes/error.api";
import { ViagemApi } from "./routes/Viagem.api";
import { environment } from "./config/environment";
import { handleError } from "./util/error.handler";

const getApiControllers = (): (ErrorApi | MainApi | DocsApi | ViagemApi)[] => [
  new ErrorApi(), new MainApi(), new DocsApi(), new ViagemApi(),
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
