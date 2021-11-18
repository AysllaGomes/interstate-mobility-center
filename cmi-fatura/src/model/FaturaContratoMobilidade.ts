import mongoose, { Document, Schema } from "mongoose";
import { IContratoFatura } from "./interfaces/ContratoFatura";
import { EstadoDaFaturaEnum } from "./enums/EstadoDaFatura.enum";
import { MeioDePagamentoEnum } from "./enums/MeioDePagamento.enum";
import { IPeriodoReferencia } from "./interfaces/PeriodoReferencia";
import { ModalidadeDeRecebimentoEnum } from "./enums/ModalidadeDeRecebimento.enum";
import { EstadoDoPagamentoDaFaturaEnum } from "./enums/EstadoDoPagamentoDaFatura.enum";
import { ICentroDeCustoFaturaContrato } from "./interfaces/CentroDeCustoFaturaContrato";

export interface IFaturaContratoMobilidade extends Document {

  _id: string;
  numeroFatura: number;
  contrato: IContratoFatura;
  periodoReferencia: IPeriodoReferencia;
  dataDeVencimento: Date;
  valorTotalDaFatura: number;
  centrosDeCusto: Array<ICentroDeCustoFaturaContrato>
  estadoDaFatura: EstadoDaFaturaEnum;
  estadoDoPagamentoDaFatura: EstadoDoPagamentoDaFaturaEnum;
  "meioDePagamento_@CMU": MeioDePagamentoEnum;
  "modalidadeDeRecebimento_@CMU": ModalidadeDeRecebimentoEnum;
  dataCriacao: Date;
  dataUltimaAtualizacao: Date;
  quantidadeViagem?: number;
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
 *       - meioDePagamento_@CMU
 *       - modalidadeDeRecebimento_@CMU
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
 *       meioDePagamento_@CMU:
 *         type: string
 *         enum:
 *         - Débito em conta corrente
 *         - Cartão de crédito
 *         - Pix
 *         - TED
 *       modalidadeDeRecebimento_@CMU:
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
 *              idContratoMobilidade_@CMU: 609194210562734c162a76c1,
 *              numeroDeIdentificacaoContratoMobilidade_@CMU: 3,
 *              nomeCliente_@MCI: Padaria de Aguiar Bono
 *          },
 *          periodoReferencia: {
 *              dataInicio: 2021-06-01T03:00:00.000Z,
 *              dataFim: 2021-06-30T23:59:59.999Z
 *          },
 *          dataDeVencimento: 2021-08-01T00:00:00.000Z,
 *          valorTotalDaFatura: 60.6,
 *          centrosDeCusto: [
 *              {
 *                  numeroDeIdentificacaoDoCentroDeCusto_@CMU: 550,
 *                  numeroNotaDebito: 1,
 *                  estadoNotaDebito: Em Aberto,
 *                  finalidadeNotaDebito: Despesas com serviços de transporte individual de passageiros,
 *                  valorFaturadoDoCentroDeCusto: 60.6,
 *                  lancamentosEVT: [],
 *                  viagens: [
 *                      {
 *                          idViagem_@CMU: 60c8d8855c11ec345ba919ff,
 *                          nomePassageiro_@CMU: Ana Maria Abras da Fonseca,
 *                          cpfCnpj_@CMU: 01943847053,
 *                          codigoCliente_@CMU : 105001310,
 *                          nomeParceiro_@CMU : noveNovePop,
 *                          iconeParceiro_@CMU : https://img.ibxk.com.br/2018/9/programas/15870025155352397.png,
 *                          valorViagem_@CMU : 10.1,
 *                          dataViagem_@CMU" : 2021-06-12T17:33:20.301Z
 *                      }
 *                  ]
 *              }
 *          ],
 *          estadoDaFatura : Iniciada,
 *          estadoDoPagamentoDaFatura : A pagar,
 *          meioDePagamento_@CMU : Débito em conta corrente,
 *          modalidadeDeRecebimento_@CMU : Após o fechamento da fatura,
 *          dataCriacao : 2021-06-01T17:42:09.905Z,
 *          dataUltimaAtualizacao : 2021-06-15T17:42:09.905Z
 *      }
 */

const FaturaContratoMobilidadeSchema: Schema = new Schema({
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
  "meioDePagamento_@CMU": {
    type: String,
    required: true,
  },
  "modalidadeDeRecebimento_@CMU": {
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

export default mongoose.model<IFaturaContratoMobilidade>("FaturaContratoMobilidade", FaturaContratoMobilidadeSchema, "faturaContratoMobilidade");
