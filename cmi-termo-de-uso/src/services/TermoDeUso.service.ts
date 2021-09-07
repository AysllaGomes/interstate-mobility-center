import { logger } from "../util/logger";
import { environment } from "../config/environment";
import { retornarErroValidacao } from "../util/utils";
import {
  ERRO_NEGOCIAL_NA_VALIDACAO,
} from "../errors/erro.negocial";
import {
  ErroSQL,
  ERRO_SQL_AO_SALVAR_TERMO_DE_USO,
  ERRO_SQL_TERMO_DE_USO_NAO_ENCONTRADO,
  ERRO_SQL_AO_INCREMENTAR_NUMERO_DA_VERSAO_TERMO_DE_USO,
  ERRO_SQL_NAO_FOI_ENCONTRANDO_TERMOS_VIGENTE_NO_MOMENTO,
} from "../errors/erro.sql";
import TermoDeUso, { ITermoDeUso } from "../model/TermoDeUso";
import { ServiceValidator } from "../validators/Service.validator";
import VariaveisDeAmbienteModel from "../model/VariaveisDeAmbiente";
import { EstadoTermoDeUsoEnum } from "../model/enums/EstadoTermoDeUso.enum";
import { IAberturaTermoDeUso } from "../model/interfaces/AberturaTermoDeUso";
import { IDetalharTermoDeUso } from "../model/interfaces/DetalharTermoDeUso";
import { TermoDeUsoInterface } from "../model/interfaces/TermoDeUsoInterface";

export class TermoDeUsoService {
  private serviceValidator = new ServiceValidator();

  public async aberturaTermoDeUso(termoDeUso: IAberturaTermoDeUso): Promise<TermoDeUsoInterface> {
    const resultadoValidacao = this.serviceValidator.validaAberturaTermoDeUso(termoDeUso);
    retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);

    const sequencial: number = await this.incrementaNumeroVersaoTermoDeUso();

    await this.verificaSeJaExisteTermoDeUso(sequencial);

    const termo = this.formataTermoDeUso(sequencial, termoDeUso);

    return this.salvarTermoDeUso(termo);
  }

  public async incrementaNumeroVersaoTermoDeUso(): Promise<number> {
    try {
      logger.debug("Incrementando número da versão do termo de uso...");

      const result = await VariaveisDeAmbienteModel.find();

      const proximoNumero = result[0].sequencialNumeroVersaoTermoDeUso + 1;

      // eslint-disable-next-line no-underscore-dangle
      const filtro = { _id: result[0]._id };
      const update = { sequencialNumeroVersaoTermoDeUso: proximoNumero };

      await VariaveisDeAmbienteModel.findOneAndUpdate(filtro, update);

      return proximoNumero;
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "incrementaNumeroVersaoTermoDeUso".
        <'ERRO'>          
          message: ERRO ao incrementar número da versão do termo de uso...
        Resposta:
        <'ERRO SQL'>
          code: ${error.code}
          message: ${error.message}.
      `);

      throw new ErroSQL(...ERRO_SQL_AO_INCREMENTAR_NUMERO_DA_VERSAO_TERMO_DE_USO).formatMessage(error.message);
    }
  }

  public async verificaSeJaExisteTermoDeUso(sequencial: number): Promise<boolean> {
    logger.debug(`Verificando o sequencial, se já existe no termo de uso: ${sequencial}...`);

    const termoDeUso: ITermoDeUso | null = await TermoDeUso.findOne({
      versao: sequencial,
    });

    if (sequencial !== 0 && !termoDeUso) {
      const versaoAtual = sequencial - 1;
      const filtro = { versao: versaoAtual };
      logger.debug(`Atualizando a versão atual: ${versaoAtual}, para expirar a vigência...`);

      await TermoDeUso.findOneAndUpdate(filtro, {
        estadoTermoDeUso: EstadoTermoDeUsoEnum.ENCERRADO,
        tsDeExpiracaoVigencia: new Date(),
      });
    }

    return !!termoDeUso;
  }

  public formataTermoDeUso(sequencial: number, termoDeUso: IAberturaTermoDeUso): TermoDeUsoInterface {
    logger.debug(`Criando novo termo de uso com a seguinte versão: ${sequencial}...`);

    return new TermoDeUso({
      versao: sequencial,
      conteudo: termoDeUso.conteudo,
      criticidade: termoDeUso.criticidade ? termoDeUso.criticidade : "--",
      estadoTermoDeUso: EstadoTermoDeUsoEnum.VIGENTE,
      tsDeInicioVigencia: new Date(),
    });
  }

  public async salvarTermoDeUso(termoDeUso: TermoDeUsoInterface): Promise<TermoDeUsoInterface> {
    try {
      logger.debug("Salvando termo de uso...");
      return new TermoDeUso(termoDeUso).save();
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "salvarTermoDeUso".
        <'ERRO NEGOCIAL'>
          message:  Não foi possível salvar o termo de uso, na base de dados...
        Parâmetros da requisição:
          CONTEUDO: ${termoDeUso.conteudo},
        Resposta:
        <'ERRO'>
          code: ${error.code},
          source: ${error.source},
          message: ${error.message}.
      `);

      throw new ErroSQL(...ERRO_SQL_AO_SALVAR_TERMO_DE_USO);
    }
  }

  public async detalharTermoDeUso(body: IDetalharTermoDeUso): Promise<TermoDeUsoInterface | undefined> {
    try {
      const resultadoValidacao = this.serviceValidator.validaDetalharTermoDeUso(body);
      retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);

      logger.debug(`Buscando dados da versão do termo de uso: ${body.versao}...`);
      const termo: TermoDeUsoInterface | null = await TermoDeUso
        .findOne({ versao: body.versao });

      if (termo) { return termo; }

      throw new ErroSQL(...ERRO_SQL_TERMO_DE_USO_NAO_ENCONTRADO);
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "detalharTermoDeUso".
        <'ERRO'>
          message: Não encontrado o termo de uso com a versão: ${body.versao}, na base de dados...
        Parâmetros da requisição:
          VERSAO: ${body.versao}
      `);

      throw new ErroSQL(...ERRO_SQL_TERMO_DE_USO_NAO_ENCONTRADO);
    }
  }

  public async verificaSeExisteSituacaoVigenteNoTermoDeUso(): Promise<TermoDeUsoInterface | ErroSQL> {
    try {
      logger.debug("Verificando se o termo está vigente...");

      const termoDeUso: ITermoDeUso | null = await TermoDeUso.findOne({
        estadoTermoDeUso: EstadoTermoDeUsoEnum.VIGENTE,
      });

      if (termoDeUso) { return termoDeUso; }

      throw new ErroSQL(...ERRO_SQL_NAO_FOI_ENCONTRANDO_TERMOS_VIGENTE_NO_MOMENTO);
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "verificaSeExisteSituacaoVigenteNoTermoDeUso".
        <'ERRO'>
          message: Não encontrado um termo de uso com a situação de vigente, na base de dados...
      `);

      throw new ErroSQL(...ERRO_SQL_NAO_FOI_ENCONTRANDO_TERMOS_VIGENTE_NO_MOMENTO);
    }
  }
}
