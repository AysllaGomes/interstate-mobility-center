import { IDadosCobranca } from "./DadosCobranca";
import { IOrcamentoCentroDeCusto } from "./OrcamentoCentroDeCusto";
import { EstadoCentroDeCustoEnum } from "../enums/EstadoCentroDeCusto.enum";

/**
 * @swagger
 *
 * definitions:
 *   CentroDeCusto:
 *     type: object
 *     required:
 *       - numeroDeIdentificacao
 *       - nome
 *       - descricao
 *       - orcamento
 *       - tsUltimaAtualizacao
 *       - estado
 *       - dadosCobranca
 *     properties:
 *       numeroDeIdentificacao:
 *         type: number
 *       nome:
 *         type: string
 *       descricao:
 *         type: string
 *       orcamento:
 *         $ref: '#/definitions/OrcamentoCentroDeCusto'
 *       tsUltimaAtualizacao:
 *         type: string
 *         format: date-time
 *       estado:
 *         type: string
 *         enum:
 *          - Vigente
 *          - Encerrado
 *       dadosCobranca:
 *         $ref: '#/definitions/IDadosCobranca'
 *     example:
 *      [
 *        {
 *            numeroIdentificacaoCentroCusto: 550,
 *            nome: "Matriz",
 *            descricao: "Matriz da padaria de Aguiar Bono, localizada no centro da cidade.",
 *            orcamento: {
 *                periodicidade: "Mensal",
 *                valor: 2000
 *            },
 *            tsUltimaAtualizacao: "2021-01-04T16:53:07.520Z",
 *            estado: "Vigente",
 *            dadosCobranca: {
 *                agencia: 3333,
 *                contaCorrente: 33333
 *            }
 *        }
 *      ]
 */
export interface ICentroDeCusto {
    numeroDeIdentificacao: number;
    nome: string;
    descricao: string;
    orcamento: IOrcamentoCentroDeCusto;
    tsUltimaAtualizacao: Date;
    estado: EstadoCentroDeCustoEnum;
    dadosCobranca: IDadosCobranca;
}
