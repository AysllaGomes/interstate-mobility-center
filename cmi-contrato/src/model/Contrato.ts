import mongoose, { Schema, Document } from "mongoose";
import { ICentroDeCusto } from "./interfaces/CentroDeCusto";
import { MeioDePagamentoEnum } from "./enums/MeioDePagamento.enum";
import { IPeriodoDeVigencia } from "./interfaces/PeriodoDeVigencia";
import { ModalidadeDeRecebimentoEnum } from "./enums/ModalidadeDeRecebimento.enum";
import { EstadoContradoMobilidadeEnum } from "./enums/EstadoContradoMobilidade.enum";

export interface IContratoMobilidade extends Document {
  _id: string;
  numeroDeIdentificacao: number;
  periodoDeVigencia: IPeriodoDeVigencia;
  estado: EstadoContradoMobilidadeEnum;
  valorDoPercentualTotalDoContrato: number;
  centrosDeCusto: Array<ICentroDeCusto>;
  diaDoVencimentoDaFatura: number;
  agenciaResponsavelConducao: number;
  meioDePagamento: MeioDePagamentoEnum;
  modalidadeDeRecebimento: ModalidadeDeRecebimentoEnum;
  dataCriacao: Date;
  dataUltimaAtualizacao: Date;
}

/**
 * @swagger
 *
 * definitions:
 *   ContratoMobilidade:
 *     type: object
 *     required:
 *       - numeroDeIdentificacao
 *       - contratante
 *       - periodoDeVigencia
 *       - estado
 *       - valorDoPercentualTotalDoContrato
 *       - centrosDeCusto
 *       - agenciaResponsavelConducao
 *       - meioDePagamento
 *       - modalidadeDeRecebimento
 *       - dataCriacao
 *       - dataUltimaAtualizacao
 *     properties:
 *       numeroDeIdentificacao:
 *         type: number
 *       periodoDeVigencia:
 *         type: object
 *       estado:
 *         type: string
 *         enum:
 *         - Em contratação
 *         - Vigente
 *         - Encerrado
 *         - Suspenso
 *       valorDoPercentualTotalDoContrato:
 *         type: number
 *       centrosDeCusto:
 *         type: array
 *       diaDoVencimentoDaFatura:
 *         type: number
 *       agenciaResponsavelConducao:
 *         type: number
 *       meioDePagamento:
 *         type: string
 *         enum:
 *         - Débito em conta corrente
 *         - Cartão de crédito
 *         - Pix
 *         - TED
 *       modalidadeDeRecebimento:
 *         type: string
 *         enum:
 *         - Após o fechamento da fatura
 *         - Antes de cada viagem
 *       dataCriacao:
 *         type: date
 *       dataUltimaAtualizacao:
 *         type: date
 */

const ContratoSchema: Schema = new Schema({
  numeroDeIdentificacao: {
    type: Number,
    required: true,
  },
  centrosDeCusto: {
    type: Array,
    required: true,
  },
  periodoDeVigencia: {
    type: Object,
    required: true,
  },
  estado: {
    type: Object,
    required: true,
  },
  valorDoPercentualTotalDoContrato: {
    type: Number,
    required: true,
  },
  diaDoVencimentoDaFatura: {
    type: Number,
    required: true,
  },
  agenciaResponsavelConducao: {
    type: Number,
    required: true,
  },
  meioDePagamento: {
    type: String,
    required: true,
  },
  modalidadeDeRecebimento: {
    type: String,
    required: true,
  },
  dataCriacao: {
    type: Date,
    required: true,
  },
  dataUltimaAtualizacao: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<IContratoMobilidade>("Contrato", ContratoSchema, "contrato");
