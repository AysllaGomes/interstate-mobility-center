import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  retornarErroValidacao,
  calcularPeriodoReferenciaEDataVencimento,
} from "../util/utils";
import {
  ErroSQL,
  ERRO_SQL_FATURA_NAO_ENCONTRADA,
  ERRO_SQL_REGISTRO_NAO_ENCONTRADO,
  ERRO_SQL_AO_SALVAR_DADOS_DE_FATURA,
  ERRO_SQL_AO_INCREMENTAR_NUMERO_DA_FATURA,
  ERRO_SQL_AO_ATUALIZAR_REGISTRO_PARA_FECHAMENTO_FATURA,
} from "../errors/erro.sql";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS,
  ERRO_NEGOCIAL_JA_EXISTE_FATURA_ABERTA_PRA_ESSE_CONTRATO_NESSE_PERIODO,
} from "../errors/erro.negocial";
import { ViagemService } from "./Viagem.service";
import ContratoModel, { IContrato } from "../model/Contrato";
import { IDatasFatura } from "../model/interfaces/DatasFatura";
import { ServiceValidator } from "../validators/Service.validator";
import FaturaContratoMobilidade, { IFatura } from "../model/Fatura";
import { IAberturaFatura } from "../model/interfaces/AberturaFatura";
import { IViagemDaFatura } from "../model/interfaces/ViagemDaFatura";
import { IEncerrarFatura } from "../model/interfaces/EncerrarFatura";
import { EstadoDaFaturaEnum } from "../model/enums/EstadoDaFatura.enum";
import { EstadoDoPagamentoDaFaturaEnum } from "../model/enums/EstadoDoPagamentoDaFatura.enum";

export class FaturaService {
    private serviceValidator = new ServiceValidator();

    public async aberturaFatura(body: IAberturaFatura): Promise<IFatura | undefined> {
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
          const fatura: IFatura = await this.formataAberturaFatura(contratoMobilidade, datas);

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
      throw new ErroSQL(...ERRO_SQL_REGISTRO_NAO_ENCONTRADO).formatMessage("Contrato");
    }

    public async formataAberturaFatura(contratoMobilidade: IContrato, datas: IDatasFatura): Promise<IFatura> {
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

        const fatura: IFatura | null = await FaturaContratoMobilidade.findOne({
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

        const fatura: IFatura | null = await FaturaContratoMobilidade
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

    public async salvarFatura(fatura: IFatura): Promise<IFatura> {
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

    public async encerrarFatura(body: IEncerrarFatura): Promise<IFatura | null> {
      const resultadoValidacao = this.serviceValidator.validaFechamentoFatura(body);
      retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS);

      const { idFaturaContratoMobilidade } = body;

      if (idFaturaContratoMobilidade) {
        const arrObjViagem: IViagemDaFatura[] = await ViagemService.buscarViagensFinalizadaPorIdFatura(body);

        await new ServiceValidator().verificaInconsistenciasNaFatura(idFaturaContratoMobilidade, arrObjViagem);

        return this.atualizaDadosParaFechamentoDaFatura(idFaturaContratoMobilidade);
      }

      logger.error(`
        ERRO no MS "${environment.app.name}", método "fecharFatura".
        <'ERRO NEGOCIAL'>
          message: Não foi encontrado a fatura: ${idFaturaContratoMobilidade}, na base de dados...
        Parâmetros da requisição:
          ID FATURA: ${idFaturaContratoMobilidade}
      `);
      throw new ErroSQL(...ERRO_SQL_FATURA_NAO_ENCONTRADA).formatMessage(idFaturaContratoMobilidade);
    }

    public async atualizaDadosParaFechamentoDaFatura(idFaturaContratoMobilidade: string): Promise<IFatura | null> {
      try {
        logger.debug("Atualizando a fatura...");

        return FaturaContratoMobilidade.findOneAndUpdate(
          { _id: idFaturaContratoMobilidade },
          { estadoDaFatura: EstadoDaFaturaEnum.CONCLUIDA },
          { upsert: true },
          (error, doc) => doc,
        );
      } catch (error) {
        logger.error(`
          ERRO no MS "${environment.app.name}", método "atualizaDadosParaFechamentoDaFatura".
          <'ERRO'>
            message: Não foi possível atualizar a fatura: ${idFaturaContratoMobilidade}...
          Parâmetros da requisição:
            ID FATURA: ${idFaturaContratoMobilidade}
          Resposta:
          <'ERRO DB'>
            sqlcode: ${error.code}
            message: ${error.message}.
        `);

        throw new ErroSQL(...ERRO_SQL_AO_ATUALIZAR_REGISTRO_PARA_FECHAMENTO_FATURA).formatMessage(idFaturaContratoMobilidade);
      }
    }
}
