import { logger } from "../../util/logger";
import { nockTestes } from "../../util/middleware";
import { environment } from "../../config/environment";
import AutenticacaoModel from "../../model/Autenticacao";
import { IAutenticacaoParceiroInterface } from "../interfaces/AutenticacaoParceiro.interface";

export abstract class AutenticacaoParceiroAbstract implements IAutenticacaoParceiroInterface {
  nomeParceiro = "anonimo";

  abstract gerarNovoToken():Promise<any|undefined>;

  abstract health(): Promise<string>;

  async retornaToken(): Promise<string|undefined> {
    return this.verificaValidadeToken();
  }

  async salvarTokenNaBase(res: any): Promise<void> {
    try {
      logger.info(`Processo de salvar token do parceiro ${this.nomeParceiro}...`);

      const objParceiro = await AutenticacaoModel.findOne({ parceiro: this.nomeParceiro });

      if (objParceiro !== null) {
        logger.debug(`Deletando token antigo do parceiro ${this.nomeParceiro} ...`);
        await AutenticacaoModel.deleteOne({ _id: objParceiro?._id });
      }

      if (res && res.data) {
        const req = {
          parceiro: this.nomeParceiro,
          token: res.data.access_token,
          tsCriacao: new Date(),
          tsVencimento: await this.definirDataVencimento(res),
        };

        logger.debug(`Salvando novo token do parceiro ${this.nomeParceiro}...`);

        await new AutenticacaoModel(req)
          .save();
      } else {
        logger.error(`ERRO ao salvar token do parceiro ${this.nomeParceiro}, não foi retornado dados para salvar o token`);
      }
    } catch (err) {
      logger.error(`ERRO ao salvar token do parceiro ${this.nomeParceiro}: ${err}`);
    }
  }

  protected async verificaValidadeToken() : Promise<string|undefined> {
    try {
      logger.debug(`Verificando validade token do parceiro ${this.nomeParceiro}`);

      let tokenRetorno: any;
      const dataAtual = new Date();
      const objParceiro = await AutenticacaoModel.findOne({ parceiro: this.nomeParceiro });

      if (!objParceiro || (objParceiro.tsVencimento.getTime() < dataAtual.getTime())) {
        logger.debug(`O token não existia ou estava vencido, tentando gerar novo token do parceiro ${this.nomeParceiro}...`);
        tokenRetorno = await this.gerarNovoToken();
        if (tokenRetorno) {
          logger.debug(`Token do parceiro ${this.nomeParceiro} gerado`);
          await this.salvarTokenNaBase(tokenRetorno);
          return tokenRetorno.data.access_token;
        }
        logger.error(`ERRO ao tentar criar token no parceiro ${this.nomeParceiro}`);
      }

      return objParceiro?.token;
    } catch (err) {
      logger.error(`ERRO ao verificar token do ${this.nomeParceiro}: ${err}`);
      return undefined;
    }
  }

  public async definirDataVencimento(res: any): Promise<Date> {
    if (environment.app.env !== "prod" && await nockTestes()) {
      return new Date();
    }

    const dataVencimento = new Date();

    dataVencimento.setSeconds(dataVencimento.getSeconds() + res.data.expires_in);
    return dataVencimento;
  }
}
