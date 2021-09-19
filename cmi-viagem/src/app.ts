import nock from "nock";
import bodyParser from "body-parser";
import express, { NextFunction } from "express";
import {
  nockTestes,
  middlewareForLog,
  mergePatchBodyParser,
  verificaConexaoMongoMiddleware,
} from "./util/middleware";
import { logger } from "./util/logger";
import { DocsApi } from "./routes/docs.api";
import { MainApi } from "./routes/main.api";
import { executaNocks } from "./nocks/Nock";
import { ErrorApi } from "./routes/error.api";
import { CotacaoApi } from "./routes/Cotacao.api";
import { environment } from "./config/environment";
import { handleError } from "./util/error.handler";

const getApiControllers = (): (ErrorApi | MainApi | DocsApi | CotacaoApi)[] => [
  new ErrorApi(), new MainApi(), new DocsApi(), new CotacaoApi(),
];

const app = express();

if (environment.app.env !== "prod") {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (await nockTestes()) {
      if (!nock.isActive()) nock.activate();

      executaNocks();
    } else if (nock.isActive()) {
      nock.restore();
    }

    next();
  });
}

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
