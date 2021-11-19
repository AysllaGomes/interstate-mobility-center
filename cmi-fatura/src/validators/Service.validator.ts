import { messages } from "joi-translation-pt-br";
import Joi, { CustomHelpers, ValidationResult } from "@hapi/joi";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import { formataValorPraDuasCasasDecimais } from "../util/utils";
import {
  ErroSQL,
  ERRO_SQL_AO_REALIZAR_A_BUSCA_DA_FATURA_COM_A_SITUACAO_ESTADO_DA_FATURA,
} from "../errors/erro.sql";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_FATURA_COM_INCONSISTENCIAS,
} from "../errors/erro.negocial";
import FaturaContratoMobilidade, { IFatura } from "../model/Fatura";
import { IAberturaFatura } from "../model/interfaces/AberturaFatura";
import { IViagemDaFatura } from "../model/interfaces/ViagemDaFatura";
import { EstadoDaFaturaEnum } from "../model/enums/EstadoDaFatura.enum";
import { IEncerrarFatura } from "../model/interfaces/EncerrarFatura";
import { TipoDaInconsistenciaEnum } from "../model/enums/TipoDaInconsistencia.enum";
import { ICentroDeCustoFormatado } from "../model/interfaces/CentroDeCustoFormatado";
import { EstadoDaInconsistenciaEnum } from "../model/enums/EstadoDaInconsistencia.enum";
import { MotivoDaInconsistenciaEnum } from "../model/enums/MotivoDaInconsistencia.enum";
import InconsistenciaFatura, { IInconsistenciaFatura } from "../model/InconsistenciaFatura";
import { EstadoDoPagamentoDaFaturaEnum } from "../model/enums/EstadoDoPagamentoDaFatura.enum";
import { ICentroDeCustoFaturaContrato } from "../model/interfaces/CentroDeCustoFaturaContrato";
import { IDadosDaInconsistenciaDaFatura } from "../model/interfaces/DadosDaInconsistenciaDaFatura";
import { IViagemCentroDeCustoFaturaContrato } from "../model/interfaces/ViagemCentroDeCustoFaturaContrato";

export class ServiceValidator {
  private static faturaMobilidade: IFatura;

  private motivoDaInconsistencia: Array<MotivoDaInconsistenciaEnum> = [];

  private dadosDaInconsistencia: Array<IDadosDaInconsistenciaDaFatura> = [];

  public static validarMes(mes: number, helpers: CustomHelpers): number | Joi.ErrorReport {
    if (
      mes === 0 || mes >= 13
    ) { return helpers.error("any.invalid"); }
    return mes;
  }

  public static validarAno(ano: number, helpers: CustomHelpers): number | Joi.ErrorReport {
    if (
      ano === 0 || ano > 2200
    ) { return helpers.error("any.invalid"); }
    return ano;
  }

  public validaNovaFatura(body: IAberturaFatura): ValidationResult {
    logger.debug("Validando a abertura da fatura...");

    const schema = Joi.object({
      idContratoMobilidade: Joi.string()
        .min(24)
        .max(24)
        .required(),
      mesDeReferencia: Joi.number().required().custom(ServiceValidator.validarMes, "validar mês"),
      anoDeReferencia: Joi.number().required().custom(ServiceValidator.validarAno, "validar ano"),
    });

    return schema.validate(body, { messages });
  }

  public validaFechamentoFatura(body: IEncerrarFatura): ValidationResult {
    logger.debug("Validando o fechamento da fatura...");

    const schema = Joi.object({
      idFaturaContratoMobilidade: Joi.string()
        .min(24)
        .max(24)
        .required(),
    });

    return schema.validate(body, { messages });
  }

  public async verificaInconsistenciasNaFatura(idFaturaContratoMobilidade: string, arrObjViagem: IViagemDaFatura[]): Promise<ErroNegocial | void> {
    const fatura: IFatura | undefined = await this.buscarFatura(idFaturaContratoMobilidade);

    if (fatura) {
      this.verificarValorTotalViagemEFatura(fatura, arrObjViagem);

      await this.verificarValorTotalPorCentroDeCusto(fatura.centrosDeCusto, arrObjViagem);

      this.verificarIdFaturaNaViagem(arrObjViagem, idFaturaContratoMobilidade);

      await this.verificarListaDeViagem(fatura, arrObjViagem);

      if (this.motivoDaInconsistencia.length > 0) {
        await this.salvaInconsistenciaDaFatura(idFaturaContratoMobilidade, this.motivoDaInconsistencia, this.dadosDaInconsistencia);

        await fatura.update({ estadoDaFatura: EstadoDaFaturaEnum.COM_INCONSISTENCIA });

        throw new ErroNegocial(...ERRO_NEGOCIAL_FATURA_COM_INCONSISTENCIAS).formatMessage(idFaturaContratoMobilidade);
      }
    }
  }

  public async buscarFatura(idFaturaContratoMobilidade: string): Promise<IFatura | undefined> {
    try {
      logger.debug(`Buscando a fatura: ${idFaturaContratoMobilidade}...`);

      const fatura: IFatura | null = await FaturaContratoMobilidade.findOne({
        _id: idFaturaContratoMobilidade,
        estadoDoPagamentoDaFatura: EstadoDoPagamentoDaFaturaEnum.A_PAGAR,
        $or: [
          { estadoDaFatura: EstadoDaFaturaEnum.INICIADA },
          { estadoDaFatura: EstadoDaFaturaEnum.EM_PROCESSAMENTO },
        ],
      });

      if (fatura) {
        ServiceValidator.faturaMobilidade = fatura;
        return fatura;
      }

      throw new ErroSQL(...ERRO_SQL_AO_REALIZAR_A_BUSCA_DA_FATURA_COM_A_SITUACAO_ESTADO_DA_FATURA).formatMessage(idFaturaContratoMobilidade);
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "buscarFatura".
        <'ERRO'>
          message: A fatura: ${idFaturaContratoMobilidade}, não está na situação estadoDaFatura: ${EstadoDaFaturaEnum.INICIADA} ou ${EstadoDaFaturaEnum.EM_PROCESSAMENTO} 
          OU não foi encontrada no banco de dados...
        Parâmetros da requisição:
          ID FATURA: ${idFaturaContratoMobilidade}
        Resposta:
        <'ERRO'>
          code: ${error.code},
          message: ${error.message}.
      `);
      throw new ErroSQL(...ERRO_SQL_AO_REALIZAR_A_BUSCA_DA_FATURA_COM_A_SITUACAO_ESTADO_DA_FATURA).formatMessage(idFaturaContratoMobilidade);
    }
  }

  public verificarValorTotalViagemEFatura(fatura: IFatura, arrObjViagem: IViagemDaFatura[]): void {
    const valorTotalViagens = ServiceValidator.somarValorTotalViagem(arrObjViagem);

    const { valorTotalDaFatura } = fatura;

    if (valorTotalViagens !== valorTotalDaFatura) {
      logger.error(`O valor total das viagens $: ${valorTotalViagens}, não é igual ao valor total da fatura $: ${valorTotalDaFatura}.... `);

      this.adicionarNaListaDeInconsistencia(
        MotivoDaInconsistenciaEnum.INCOSISTENCIA_NA_FATURA__VALOR_DA_FATURA_DIFERENTE_DO_VALOR_DAS_VIAGENS_REALIZADAS_NO_PERIODO_DE_REFERENCIA,
        `Valor total das viagens: ${valorTotalViagens}. Valor total da fatura: ${valorTotalDaFatura}`,
      );
    }
  }

  static somarValorTotalViagem(arrObjViagem: Array<IViagemDaFatura>): number {
    logger.debug("Somando o valor total das viagens...");

    return arrObjViagem.length !== 0
      ? arrObjViagem.map((valores: IViagemDaFatura) => valores?.dadosEfetivo.valor).reduce((total, valor) => total + valor)
      : 0;
  }

  public adicionarNaListaDeInconsistencia(motivoInconsistencia: MotivoDaInconsistenciaEnum, mensagem: string): void {
    this.motivoDaInconsistencia.push(motivoInconsistencia);

    this.dadosDaInconsistencia.push({
      erro: motivoInconsistencia,
      mensagem,
    });
  }

  public async verificarValorTotalPorCentroDeCusto(arrCentroDeCusto: ICentroDeCustoFaturaContrato[], arrObjViagem: Array<IViagemDaFatura>): Promise<void> {
    const arrCentrosDeCustoFormatadoFatura = await this.agruparCentroDeCustoEValorDaFatura(arrCentroDeCusto);

    const arrCentroDeCustoFaturaOrdenado = await this.ordenarCentroCusto(arrCentrosDeCustoFormatadoFatura);

    const arrCentrosDeCustoFormatadoViagem = await this.agruparCentroDeCustoEValorDaViagem(arrObjViagem);

    const arrCentroDeCustoViagemOrdenado = await this.ordenarCentroCusto(arrCentrosDeCustoFormatadoViagem);

    const comparacaoDoCentroDeCusto = await this.compararCentroDeCustoEValor(arrCentroDeCustoFaturaOrdenado, arrCentroDeCustoViagemOrdenado);

    if (!comparacaoDoCentroDeCusto) {
      logger.error("O valor total das viagens por centro de custo na fatura é diferente do valor total da dos centro de custo das viagens.... ");
      this.adicionarNaListaDeInconsistencia(
        MotivoDaInconsistenciaEnum.INCOSISTENCIA_NA_FATURA__VALOR_TOTAL_DOS_CENTROS_DE_CUSTO_NA_FATURA_DIFERENTE_DO_VALOR_DAS_VIAGENS_POR_CENTRO_DE_CUSTOS,
        `Valor total centro de custos fatura:  ${JSON.stringify(arrCentroDeCustoFaturaOrdenado)}.
        Valor total centro de custo viagem:  ${JSON.stringify(arrCentroDeCustoViagemOrdenado)}`,
      );
    }
  }

  public async agruparCentroDeCustoEValorDaFatura(arrCentroDeCusto: ICentroDeCustoFaturaContrato[]): Promise<ICentroDeCustoFormatado[]> {
    logger.debug("Agrupando Centro de Custo e valor da fatura...");

    const arrCentrosDeCustosFormatado: Array<ICentroDeCustoFormatado> = [];

    arrCentroDeCusto.forEach((centroDeCusto: ICentroDeCustoFaturaContrato) => {
      arrCentrosDeCustosFormatado.push({
        centroDeCusto: centroDeCusto.numeroDeIdentificacaoDoCentroDeCusto,
        valor: centroDeCusto.valorFaturadoDoCentroDeCusto,
      });
    });

    return arrCentrosDeCustosFormatado;
  }

  public async ordenarCentroCusto(arrCentroDeCusto: ICentroDeCustoFormatado[]): Promise<ICentroDeCustoFormatado[]> {
    // eslint-disable-next-line no-confusing-arrow
    return arrCentroDeCusto.sort((a, b) => (Number(a.centroDeCusto) < Number(b.centroDeCusto)) ? -1 : 1);
  }

  public async compararCentroDeCustoEValor(arrCentrosDeCustoFatura: ICentroDeCustoFormatado[], arrCentrosDeCustoViagem: ICentroDeCustoFormatado[]): Promise<boolean> {
    let somaCentrosDeCustoFatura = 0;
    arrCentrosDeCustoFatura.forEach((obj: ICentroDeCustoFormatado) => {
      const valor = obj.valor ? obj.valor : 0;
      somaCentrosDeCustoFatura += formataValorPraDuasCasasDecimais(valor);
    });

    let somaCentrosDeCustoViagem = 0;
    arrCentrosDeCustoViagem.forEach((obj: ICentroDeCustoFormatado) => {
      const valor = obj.valor ? obj.valor : 0;
      somaCentrosDeCustoViagem += formataValorPraDuasCasasDecimais(valor);
    });

    return somaCentrosDeCustoFatura === somaCentrosDeCustoViagem;
  }

  public async agruparCentroDeCustoEValorDaViagem(arrObjViagem: IViagemDaFatura[]): Promise<ICentroDeCustoFormatado[]> {
    logger.debug("Agrupando valor da viagens por centro de custo");

    const viagensAgrupadasPorCentroDeCusto: Array<IViagemDaFatura> = [];

    arrObjViagem.forEach((viagem: IViagemDaFatura) => {
      const posicaoCentroDeCusto = viagensAgrupadasPorCentroDeCusto.findIndex(
        (c: IViagemDaFatura) => c.dadosDeFaturamento?.numeroDeIdentificacaoDoCentroDeCusto === viagem.dadosDeFaturamento?.numeroDeIdentificacaoDoCentroDeCusto,
      );

      logger.debug("Verificando se achou a posicao do centro de custos e somando o valor das viagens");
      // eslint-disable-next-line max-len,no-unused-expressions
      posicaoCentroDeCusto ? viagensAgrupadasPorCentroDeCusto.push(viagem) : viagensAgrupadasPorCentroDeCusto[posicaoCentroDeCusto].cotacaoVencedora.valor += viagem.cotacaoVencedora.valor;
    });

    const arrViagensAgrupadasPorCentroDeCustoFormatada: Array<ICentroDeCustoFormatado> = [];

    viagensAgrupadasPorCentroDeCusto.forEach((viagensAgrupadas: IViagemDaFatura) => {
      arrViagensAgrupadasPorCentroDeCustoFormatada.push({
        centroDeCusto: Number(viagensAgrupadas.dadosDeFaturamento?.numeroDeIdentificacaoDoCentroDeCusto),
        valor: formataValorPraDuasCasasDecimais(viagensAgrupadas.dadosEfetivo.valor),
      });
    });
    return arrViagensAgrupadasPorCentroDeCustoFormatada;
  }

  public verificarIdFaturaNaViagem(arrObjViagem: IViagemDaFatura[], idFaturaContratoMobilidade: string): void {
    const idfaturaNaViagem: Array<string | undefined> = [];

    logger.debug("Agrupando idFatura das viagens do período...");

    arrObjViagem.forEach((viagem: IViagemDaFatura) => {
      if (!idfaturaNaViagem.includes(viagem.dadosDeFaturamento?.idFaturaContratoMobilidade)) {
        idfaturaNaViagem.push(viagem.dadosDeFaturamento?.idFaturaContratoMobilidade);
      }
    });

    if (arrObjViagem.length !== 0 && idfaturaNaViagem.toString() !== idFaturaContratoMobilidade) {
      logger.error(`O valor id fatura na viagem: ${idfaturaNaViagem}, não é igual ao id fatura na fatura: ${idFaturaContratoMobilidade}.... `);

      this.adicionarNaListaDeInconsistencia(
        MotivoDaInconsistenciaEnum.INCOSISTENCIA_NA_FATURA__FATURA_NAO_LOCALIZADA_NAS_VIAGENS_DO_CONTRATO,
        `Id fatura nas viagens diferente da fatura em fechamento : ${JSON.stringify(idfaturaNaViagem)}`,
      );
    }
  }

  public async verificarListaDeViagem(fatura: IFatura, arrObjViagem: IViagemDaFatura[]): Promise<void> {
    const objViagemNaFatura: Array<string> = [];
    const objViagemNoPeriodo: Array<string> = [];

    fatura.centrosDeCusto.forEach((centroCustos: ICentroDeCustoFaturaContrato) => {
      centroCustos.viagens.forEach((viagem: IViagemCentroDeCustoFaturaContrato) => {
        objViagemNaFatura.push(viagem.idViagem);
      });
    });

    // eslint-disable-next-line no-underscore-dangle
    arrObjViagem.forEach((viagem: IViagemDaFatura) => objViagemNoPeriodo.push(viagem._id));

    const comparacaoListaDeViagem = await this.compararListaDeViagem(objViagemNaFatura, objViagemNoPeriodo);

    if (arrObjViagem.length !== 0 && !comparacaoListaDeViagem) {
      logger.error("A lista de viagens da fatura não corresponde a lista de viagens realizadas no periodo.... ");

      this.adicionarNaListaDeInconsistencia(
        MotivoDaInconsistenciaEnum.INCOSISTENCIA_NA_FATURA__QTD_DE_VIAGENS_DIFERENTE_DAS_VIAGENS_REALIZADAS_NO_PERIODO_DE_REFERENCIA,
        `Lista de viagens na fatura não corresponde com periodo de referência,
        fatura: ${JSON.stringify(objViagemNaFatura)} 
        viagens: ${JSON.stringify(objViagemNoPeriodo)}`,
      );
    }
  }

  public async compararListaDeViagem(objViagemNaFatura: string[], objViagemNoPeriodo: string[]): Promise<boolean> {
    return JSON.stringify(objViagemNaFatura.sort()) === JSON.stringify(objViagemNoPeriodo.sort());
  }

  public async salvaInconsistenciaDaFatura(
    idFaturaContratoMobilidade: string,
    motivoDaInconsistencia: MotivoDaInconsistenciaEnum[],
    dadosDaInconsistencia?: IDadosDaInconsistenciaDaFatura[],
  ): Promise<IInconsistenciaFatura> {
    logger.debug("Salvando inconsistencia(s) da fatura...");

    const inconsistencia = new InconsistenciaFatura({
      tipoDaInconsistencia: TipoDaInconsistenciaEnum.INCOSISTENCIA_NA_FATURA,
      motivoDaInconsistencia,
      idFaturaContratoMobilidade,
      dadosDaInconsistencia,
      dataDaCriacao: new Date(),
      estadoDaInconsistencia: EstadoDaInconsistenciaEnum.PENDENTE,
    });

    return new InconsistenciaFatura(inconsistencia).save();
  }
}
