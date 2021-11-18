import mongoose, { Document, Schema } from "mongoose";
import { IContratoFatura } from "./interfaces/ContratoFatura";
import { EstadoDaFaturaEnum } from "./enums/EstadoDaFatura.enum";
import { MeioDePagamentoEnum } from "./enums/MeioDePagamento.enum";
import { IPeriodoReferencia } from "./interfaces/PeriodoReferencia";
import { ModalidadeDeRecebimentoEnum } from "./enums/ModalidadeDeRecebimento.enum";
import { EstadoDoPagamentoDaFaturaEnum } from "./enums/EstadoDoPagamentoDaFatura.enum";
import { ICentroDeCustoFaturaContrato } from "./interfaces/CentroDeCustoFaturaContrato";

export interface IFatura extends Document {
  _id: string;
  numeroFatura: number;
  contrato: IContratoFatura;
  periodoReferencia: IPeriodoReferencia;
  dataDeVencimento: Date;
  valorTotalDaFatura: number;
  centrosDeCusto: Array<ICentroDeCustoFaturaContrato>
  estadoDaFatura: EstadoDaFaturaEnum;
  estadoDoPagamentoDaFatura: EstadoDoPagamentoDaFaturaEnum;
  meioDePagamento: MeioDePagamentoEnum;
  modalidadeDeRecebimento: ModalidadeDeRecebimentoEnum;
  dataCriacao: Date;
  dataUltimaAtualizacao: Date;
}

/**
 * @swagger
 *
 * definitions:
 *   FaturaContratoMobilidade:
 *     type: object
 *     required:
 *       - numeroFatura
 *       - contrato
 *       - periodoReferencia
 *       - dataDeVencimento
 *       - valorTotalDaFatura
 *       - centrosDeCusto
 *       - estadoDaFatura
 *       - estadoDoPagamentoDaFatura
 *       - meioDePagamento
 *       - modalidadeDeRecebimento
 *       - dataCriacao
 *       - dataUltimaAtualizacao
 *     properties:
 *       numeroFatura:
 *         type: number
 *       contrato:
 *         $ref: '#/definitions/IContratoFatura'
 *       periodoReferencia:
 *         $ref: '#/definitions/IPeriodoReferencia'
 *       dataDeVencimento:
 *         type: date
 *       valorTotalDaFatura:
 *         type: number
 *       centrosDeCusto:
 *         $ref: '#/definitions/ICentroDeCustoFaturaContrato'
 *       estadoDaFatura:
 *         type: string
 *         description: "Estado da fatura"
 *         enum:
 *         - Iniciada
 *         - Em Processamento
 *         - Com Inconsistência
 *         - Concluída
 *         - Cancelada
 *       estadoDoPagamentoDaFatura:
 *         type: string
 *         description: "Estado de pagamento da fatura"
 *         enum:
 *         - A pagar
 *         - Pago
 *         - Cancelado
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
 *     example:
 *      {
 *          numeroFatura: 1001,
 *          contrato: {
 *              idContratoMobilidade: 615275cfae51bb002ea736d2,
 *              numeroDeIdentificacaoContratoMobilidade: 3,
 *              nomeCliente: Nome de uma Matriz
 *          },
 *          periodoReferencia: {
 *              dataInicio: 2021-11-01T03:00:00.000Z,
 *              dataFim: 2021-11-30T23:59:59.999Z
 *          },
 *          dataDeVencimento: 2021-12-20T00:00:00.000Z,
 *          valorTotalDaFatura: 60.6,
 *          centrosDeCusto: [
 *              {
 *                  numeroDeIdentificacaoDoCentroDeCusto: 550,
 *                  numeroNotaDebito: 1,
 *                  estadoNotaDebito: Em Aberto,
 *                  finalidadeNotaDebito: Despesas com serviços de transporte individual de passageiros,
 *                  valorFaturadoDoCentroDeCusto: 60.6,
 *                  viagens: [
 *                      {
 *                          idViagem: 60c8d8855c11ec345ba919ff,
 *                          nomePassageiro: Steph Gingrich,
 *                          cpf: 02373315009,
 *                          nomeParceiro : Nock,
 *                          iconeParceiro : https://avatars.githubusercontent.com/u/17545810?s=280&v=4,
 *                          valorViagem : 10.1,
 *                          dataViagem" : 2021-11-10T17:33:20.301Z
 *                      }
 *                  ]
 *              }
 *          ],
 *          estadoDaFatura : Iniciada,
 *          estadoDoPagamentoDaFatura : A pagar,
 *          meioDePagamento : Débito em conta corrente,
 *          modalidadeDeRecebimento : Após o fechamento da fatura,
 *          dataCriacao : 2021-11-10T17:42:09.905Z,
 *          dataUltimaAtualizacao : 2021-11-15T17:42:09.905Z
 *      }
 */

const FaturaSchema: Schema = new Schema({
  numeroFatura: {
    type: Number,
    required: true,
  },
  contrato: {
    type: Object,
    required: true,
  },
  periodoReferencia: {
    type: Object,
    required: true,
  },
  dataDeVencimento: {
    type: Date,
    required: true,
  },
  valorTotalDaFatura: {
    type: Number,
    required: true,
  },
  centrosDeCusto: {
    type: Array,
    required: true,
  },
  estadoDaFatura: {
    type: Object,
    required: true,
  },
  estadoDoPagamentoDaFatura: {
    type: Object,
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

export default mongoose.model<IFatura>("Fatura", FaturaSchema, "fatura");
