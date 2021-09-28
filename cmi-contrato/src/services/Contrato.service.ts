import { logger } from "../util/logger";
import { environment } from "../config/environment";
import { retornarErroValidacao } from "../util/utils";
import {
  ERRO_NEGOCIAL_NA_VALIDACAO,
} from "../errors/erro.negocial";
import {
  ErroSQL,
  ERRO_SQL_AO_SALVAR_CONTRATO,
  ERRO_SQL_AO_INCREMENTAR_NUMERO_DE_IDENTIFICACAO_DO_CONTRATO,
} from "../errors/erro.sql";
import Contrato, { IContrato } from "../model/Contrato";
import { ServiceValidator } from "../validators/Service.validator";
import VariaveisDeAmbienteModel from "../model/VariaveisDeAmbiente";
import { IAberturaContrato } from "../model/interfaces/AberturaContrato";
import { MeioDePagamentoEnum } from "../model/enums/MeioDePagamento.enum";
import { DiaDoVencimentoDaFaturaEnum } from "../model/enums/DiaDoVencimentoDaFatura.enum";
import { ModalidadeDeRecebimentoEnum } from "../model/enums/ModalidadeDeRecebimento.enum";
import { EstadoContradoMobilidadeEnum } from "../model/enums/EstadoContradoMobilidade.enum";

export class ContratoService {
  private serviceValidator = new ServiceValidator();

  public async abertura(contrato: IAberturaContrato): Promise<IContrato> {
    const resultadoValidacao = this.serviceValidator.validaAberturaContrato(contrato);
    retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);

    const identificadorDoContrato: number = await this.incrementaNumeroDeIdentificacaoContrato();

    const formatoContrato = this.formataContrato(identificadorDoContrato, contrato);

    return this.salvarContrato(formatoContrato);
  }

  public async incrementaNumeroDeIdentificacaoContrato(): Promise<number> {
    try {
      logger.debug("Incrementando número de identificação do contrato...");

      const result = await VariaveisDeAmbienteModel.find();

      const proximoNumero = result[0].sequencialNumeroDeIdentificacaoContrato + 1;

      // eslint-disable-next-line no-underscore-dangle
      const filtro = { _id: result[0]._id };
      const update = { sequencialNumeroDeIdentificacaoContrato: proximoNumero };

      await VariaveisDeAmbienteModel.findOneAndUpdate(filtro, update);

      return proximoNumero;
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "incrementaNumeroDeIdentificacaoContrato".
        <'ERRO'>          
          message: ERRO ao incrementar número de identificação do contrato...
        Resposta:
        <'ERRO SQL'>
          code: ${error.code}
          message: ${error.message}.
      `);

      throw new ErroSQL(...ERRO_SQL_AO_INCREMENTAR_NUMERO_DE_IDENTIFICACAO_DO_CONTRATO).formatMessage(error.message);
    }
  }

  public formataContrato(identificadorDoContrato: number, contrato: IAberturaContrato): IContrato {
    logger.debug(`Criando novo contrato com a seguinte número de identificação: ${identificadorDoContrato}...`);

    return new Contrato({
      numeroDeIdentificacao: identificadorDoContrato,
      periodoDeVigencia: {
        dataInicio: contrato.periodoDeVigencia.dataInicio,
        dataFim: contrato.periodoDeVigencia.dataFim,
      },
      estado: EstadoContradoMobilidadeEnum.VIGENTE,
      valorDoPercentualTotalDoContrato: contrato.valorDoPercentualTotalDoContrato,
      // @todo melhorar a estruturação do centro de custo
      centrosDeCusto: [
        {
          numeroDeIdentificacao: contrato.centroDeCusto[0].numeroIdentificacaoCentroCusto,
          nome: contrato.centroDeCusto[0].nome,
          descricao: contrato.centroDeCusto[0].descricao,
          orcamento: contrato.centroDeCusto[0].orcamento,
          dataUltimaAtualizacao: new Date(),
          estado: contrato.centroDeCusto[0].estado,
          dadosCobranca: contrato.centroDeCusto[0].dadosCobranca,
        },
      ],
      diaDoVencimentoDaFatura: DiaDoVencimentoDaFaturaEnum.VINTE,
      agenciaResponsavelConducao: contrato.agenciaResponsavelConducao,
      meioDePagamento: MeioDePagamentoEnum.DEBITO_EM_CONTA_CORRENTE,
      modalidadeDeRecebimento: ModalidadeDeRecebimentoEnum.APOS_FECHAMENTO_DA_FATURA,
      tsCriacao: new Date(),
      tsUltimaAtualizacao: new Date(),
    });
  }

  public async salvarContrato(contrato: IContrato): Promise<IContrato> {
    try {
      logger.debug("Salvando contrato...");
      return new Contrato(contrato).save();
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "salvarContrato".
        <'ERRO NEGOCIAL'>
          message:  Não foi possível salvar o contrato, na base de dados...
        Parâmetros da requisição:
          NÚMERO DE IDENTIFICAÇÃO: ${contrato.numeroDeIdentificacao},
          PERCENTUAL CONTRATO: ${contrato.valorDoPercentualTotalDoContrato},
          PERÍODO DE VIGÊNCIA: {
            INÍCIO: ${contrato.periodoDeVigencia.dataInicio}
            FIM: ${contrato.periodoDeVigencia.dataFim}
          }
        Resposta:
        <'ERRO'>
          code: ${error.code},
          message: ${error.message}.
      `);

      throw new ErroSQL(...ERRO_SQL_AO_SALVAR_CONTRATO);
    }
  }
}
