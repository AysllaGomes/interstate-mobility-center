import express from "express";
import { logger } from "./util/logger";
import { DocsApi } from "./routes/docs.api";
import { MainApi } from "./routes/main.api";
import { ErrorApi } from "./routes/error.api";
import { handleError } from "./util/error.handler";
import { TermoDeUsoApi } from "./routes/TermoDeUso.api";
import { verificaConexaoMongoMiddleware } from "./util/middleware";

const getApiControllers = (): (ErrorApi | MainApi | DocsApi | TermoDeUsoApi)[] => [
  new ErrorApi(), new MainApi(), new DocsApi(), new TermoDeUsoApi(),
];

const app = express();

const rotasPostVerificadas: Array<string> = [
  "/termoDeUso/aberturaTermoDeUso",
  "/termoDeUso/detalhar",
  "/termoDeUso/verificaSituacaoVigencia",
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
