import axios from "axios";
import FormData from "form-data";
import { logger } from "../util/logger";
import { nockTestes } from "../util/middleware";
import { environment } from "../config/environment";
import { AutenticacaoParceiroAbstract } from "./abstracts/AutenticacaoParceiro.abstract";
import { IAutenticacaoParceiroInterface } from "./interfaces/AutenticacaoParceiro.interface";

export class AutenticacaoStrangerService extends AutenticacaoParceiroAbstract implements IAutenticacaoParceiroInterface {
  nomeParceiro = "stranger";

  token: string | undefined;

  async gerarNovoToken(): Promise<any|undefined> {
    try {
      logger.info("Gerar novo token para Stranger");

      const formData = new FormData();
      formData.append("Username", environment.stranger.user);
      formData.append("Password", environment.stranger.pwd);

      return await axios.post(`${environment.stranger.host}/token`, formData, {
        timeout: environment.app.tempoRequestTimeout,
        headers: formData.getHeaders(),
      });
    } catch (error) {
      logger.error(`ERRO ao gerar token para Stranger: ${error.message}`);
      return undefined;
    }
  }

  public async definirDataVencimento(): Promise<Date> {
    if (environment.app.env !== "prod" && await nockTestes()) {
      return new Date();
    }

    const dataVencimento = new Date();
    dataVencimento.setHours(dataVencimento.getHours() + 11, 30);
    return dataVencimento;
  }

  async health(): Promise<string> {
    try {
      logger.info("Verificando disponibilidade do parceiro: Stranger...");
      const retorno = await axios.get(`${environment.stranger.host}/api/status`);

      return retorno.data === "Healthy" ? "ok" : "INDISPONÍVEL";
    } catch (error) {
      logger.error(`ERRO ao validar a disponibilidade do parceiro: Stranger: ${error.message}`);
      return "INDISPONÍVEL";
    }
  }
}
