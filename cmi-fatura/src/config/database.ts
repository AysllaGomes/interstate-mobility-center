import mongoose from "mongoose";
import { logger } from "../util/logger";
import { environment } from "./environment";
import { ConexaoMongoEnum } from "../model/enums/ConexaoMongo.enum";

class Database {
  static async conectar(): Promise<number> {
    try {
      await mongoose
        .connect(environment.db.uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        });

      if (this.verificaConexao() === ConexaoMongoEnum.connected) {
        logger.info("Mongo DB conectado com sucesso");
        return ConexaoMongoEnum.connected;
      }

      return ConexaoMongoEnum.disconnected;
    } catch (err) {
      logger.error(`Erro ao conectar ao Mongo DB \n ${err}`);
      return ConexaoMongoEnum.disconnected;
    }
  }

  static verificaConexao(): number {
    return mongoose.connection.readyState;
  }
}

export default Database;