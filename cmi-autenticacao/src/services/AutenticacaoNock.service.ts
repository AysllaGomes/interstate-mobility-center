import { logger } from "../util/logger";
import { environment } from "../config/environment";
import { AutenticacaoParceiroAbstract } from "./abstracts/AutenticacaoParceiro.abstract";
import { IAutenticacaoParceiroInterface } from "./interfaces/AutenticacaoParceiro.interface";

export class AutenticacaoNockService extends AutenticacaoParceiroAbstract implements IAutenticacaoParceiroInterface {
  nomeParceiro = "nock";

  token: string | undefined;

  async gerarNovoToken(): Promise<object|undefined> {
    try {
      logger.debug("Gerar novo token para: Nock");

      return {
        data: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          access_token: environment.nock.key,
          // eslint-disable-next-line @typescript-eslint/camelcase
          expires_in: 999999999,
        },
      };
    } catch (err) {
      logger.error(`ERRO ao gerar token para Nock: ${err}`);
      return undefined;
    }
  }

  async health(): Promise<string> {
    try {
      logger.debug("Verificando disponibilidade do parceiro: Nock...");
      return "EM IMPLEMENTAÇÃO";
    } catch (error) {
      logger.error(`ERRO ao validar a disponibilidade do parceiro: Nock: ${error}`);
      return "INDISPONÍVEL";
    }
  }
}
