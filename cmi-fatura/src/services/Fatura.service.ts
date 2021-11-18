import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  retornarErroValidacao,
  calcularPeriodoReferenciaEDataVencimento,
} from "../util/utils";
import {
  ErroSQL,
  ERRO_SQL_REGISTRO_NAO_ENCONTRADO,
  ERRO_SQL_AO_SALVAR_DADOS_DE_FATURA,
  ERRO_SQL_AO_INCREMENTAR_NUMERO_DA_FATURA,
} from "../errors/erro.sql";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS,
  ERRO_NEGOCIAL_JA_EXISTE_FATURA_ABERTA_PRA_ESSE_CONTRATO_NESSE_PERIODO,
} from "../errors/erro.negocial";
import ContratoModel, { IContrato } from "../model/Contrato";
import { ServiceValidator } from "../validators/Service.validator";
import { IAberturaFatura } from "../model/interfaces/AberturaFatura";
import { EstadoDaFaturaEnum } from "../model/enums/EstadoDaFatura.enum";
import { EstadoDoPagamentoDaFaturaEnum } from "../model/enums/EstadoDoPagamentoDaFatura.enum";
import FaturaContratoMobilidade, { IFaturaContratoMobilidade } from "../model/FaturaContratoMobilidade";
import { IDatasFatura } from "../model/interfaces/DatasFatura";

export class FaturaService {
    private serviceValidator = new ServiceValidator();

    public async aberturaFatura(body: IAberturaFatura): Promise<IFaturaContratoMobilidade | undefined> {
      const resultadoValidacao = this.serviceValidator.validaNovaFatura(body);
      retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS);

      const { idContratoMobilidade } = body;

      logger.debug(`Buscando dados do contrato de id: ${idContratoMobilidade}...`);
      const contratoMobilidade: IContrato | null = await ContratoModel.findById(idContratoMobilidade);

      if (contratoMobilidade) {
        // eslint-disable-next-line no-underscore-dangle
        const idContrato = contratoMobilidade._id;

        const datas = calcularPeriodoReferenciaEDataVencimento(body, contratoMobilidade.diaDoVencimentoDaFatura);

        const existeFaturaAberta = await this.verificaSeJaExisteFaturaAbertaProContratoNessePeriodo(datas.primeiroDiaDoMes, datas.ultimoDiaDoMes, idContrato);

        if (!existeFaturaAberta) {
          const fatura: IFaturaContratoMobilidade = await this.formataAberturaFatura(contratoMobilidade, datas);

          return this.salvarFatura(fatura);
        }

        logger.error(`
        ERRO no MS "${environment.app.name}", método "aberturaFatura".
        <'ERRO NEGOCIAL'>
          message: Já existe uma fatura aberta nesse período para o contrato: ${idContrato}...
        Parâmetros da requisição:
          ID CONTRATO: ${idContrato},
          DATA DE VENCIMENTO: ${datas.dataDeVencimentoDaFatura.toLocaleDateString()},
          PERÍODO REFERÊNCIA DO CONTRATO: ${datas.primeiroDiaDoMes.toLocaleDateString()} - ${datas.ultimoDiaDoMes.toLocaleDateString()}
      `);
        throw new ErroNegocial(...ERRO_NEGOCIAL_JA_EXISTE_FATURA_ABERTA_PRA_ESSE_CONTRATO_NESSE_PERIODO).formatMessage(idContrato);
      }

      logger.error(`
      ERRO no MS "${environment.app.name}", método "aberturaFatura".
      <'ERRO NEGOCIAL'>
        message: O contrato: '${idContratoMobilidade}, não foi encontrado na base de dados...
      Parâmetros da requisição:
        ID CONTRATO: ${idContratoMobilidade},
    `);
      throw new ErroSQL(...ERRO_SQL_REGISTRO_NAO_ENCONTRADO).formatMessage("ContratoMobilidade");
    }

    public async formataAberturaFatura(contratoMobilidade: IContrato, datas: IDatasFatura): Promise<IFaturaContratoMobilidade> {
      // eslint-disable-next-line no-underscore-dangle
      const idContrato = contratoMobilidade._id;

      logger.debug(`Criando nova fatura para o contrato: ${idContrato}...`);
      const proximoNumeroFatura = await this.incrementarNumeroFatura(idContrato);

      return new FaturaContratoMobilidade({
        numeroFatura: proximoNumeroFatura,
        contrato: {
          idContratoMobilidade: idContrato,
          numeroDeIdentificacaoContratoMobilidade: contratoMobilidade.numeroDeIdentificacao,
        },
        periodoReferencia: {
          dataInicio: datas.primeiroDiaDoMes,
          dataFim: datas.ultimoDiaDoMes,
        },
        dataDeVencimento: datas.dataDeVencimentoDaFatura,
        valorTotalDaFatura: 0,
        centrosDeCusto: [],
        estadoDaFatura: EstadoDaFaturaEnum.INICIADA,
        estadoDoPagamentoDaFatura: EstadoDoPagamentoDaFaturaEnum.A_PAGAR,
        meioDePagamento: contratoMobilidade.meioDePagamento,
        modalidadeDeRecebimento: contratoMobilidade.modalidadeDeRecebimento,
        dataCriacao: new Date(),
        dataUltimaAtualizacao: new Date(),
      });
    }

    public async verificaSeJaExisteFaturaAbertaProContratoNessePeriodo(dataInicio: Date, dataFim: Date, idContrato: string): Promise<boolean> {
      try {
        logger.debug(`Verificando se já existe uma fatura aberta nesse período pro contrato: ${idContrato}...`);

        const fatura: IFaturaContratoMobilidade | null = await FaturaContratoMobilidade.findOne({
          "contrato.idContratoMobilidade": idContrato,
          estadoDaFatura: EstadoDaFaturaEnum.INICIADA,
          $and: [
            { "periodoReferencia.dataInicio": dataInicio },
            { "periodoReferencia.dataFim": dataFim },
          ],
        });

        return !!fatura;
      } catch (error) {
        logger.error(`
        ERRO no MS "${environment.app.name}", método "verificaSeJaExisteFaturaAbertaProContratoNessePeriodo".
        <'ERRO NEGOCIAL'>
          message: Não foi possível verificar se já existe fatura aberta para o contrato: ${idContrato}
        Parâmetros da requisição:
          ID CONTRATO: ${idContrato},
          PERÍODO: ${dataInicio} - ${dataFim}
        Resposta:
        <'ERRO'>
          code: ${error.code},
          source: ${error.source},
          message: ${error.message}.
      `);

        throw new ErroSQL(...ERRO_SQL_REGISTRO_NAO_ENCONTRADO).formatMessage("FaturaContratoMobilidade");
      }
    }

    public async incrementarNumeroFatura(idContrato: string): Promise<number> {
      try {
        logger.debug("Incrementando numero da fatura...");

        const fatura: IFaturaContratoMobilidade | null = await FaturaContratoMobilidade
          .findOne({
            "contrato.idContratoMobilidade": idContrato,
          }).sort({ dataCriacao: "desc" });

        let qtdAtualFaturas = 1;

        if (fatura) {
          qtdAtualFaturas = fatura.numeroFatura + 1;
        }

        return qtdAtualFaturas;
      } catch (error) {
        logger.error(`
        ERRO no MS "${environment.app.name}", método "incrementarNumeroFatura".
        <'ERRO'>          
          message: ERRO ao incrementar número da fatura...
        Resposta:
        <'ERRO SQL'>
          code: ${error.code}
          message: ${error.message}.
      `);

        throw new ErroSQL(...ERRO_SQL_AO_INCREMENTAR_NUMERO_DA_FATURA).formatMessage(error.message);
      }
    }

    public async salvarFatura(fatura: IFaturaContratoMobilidade): Promise<IFaturaContratoMobilidade> {
      const identificadorFatura = fatura.numeroFatura;
      const { idContratoMobilidade } = fatura.contrato;
      try {
        logger.debug("Salvando fatura...");
        return new FaturaContratoMobilidade(fatura).save();
      } catch (error) {
        logger.error(`
        ERRO no MS "${environment.app.name}", método "salvarFatura".
        <'ERRO NEGOCIAL'>
          message:  Não foi possível salvar a fatura: ${identificadorFatura}, do seguinte contrato ${idContratoMobilidade}, na base de dados...
        Parâmetros da requisição:
          NUMERO FATURA: ${identificadorFatura},
          ID CONTRATO: ${idContratoMobilidade},
          DATA DE VENCIMENTO: ${fatura.dataDeVencimento},
          PERÍODO REFERÊNCIA: ${fatura.periodoReferencia.dataInicio} - ${fatura.periodoReferencia.dataFim},
        Resposta:
        <'ERRO'>
          code: ${error.code},
          source: ${error.source},
          message: ${error.message}.
      `);

        throw new ErroNegocial(...ERRO_SQL_AO_SALVAR_DADOS_DE_FATURA).formatMessage(String(identificadorFatura), idContratoMobilidade);
      }
    }
}
