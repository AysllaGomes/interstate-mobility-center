import app from "./app";
import { logger } from "./util/logger";
import Database from "./config/database";
import { environment } from "./config/environment";

app.listen(environment.app.port, async () => {
  if (app) {
    logger.info(`${environment.app.name} inicializado e rodando na porta: ${environment.app.port}`, app.locals.name);

    logger.info("Iniciando conexão com Mongo DB...");
    await Database.conectar();
  }
});
