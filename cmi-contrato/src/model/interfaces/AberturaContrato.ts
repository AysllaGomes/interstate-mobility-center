import { IPeriodoDeVigencia } from "./PeriodoDeVigencia";
import { IAberturaContratoCentroDeCusto } from "./AberturaContratoCentroDeCusto";

/**
 * @swagger
 *
 * definitions:
 *   IAberturaContrato:
 *     type: object
 *     required:
 *       - periodoDeVigencia
 *       - valorDoPercentualTotalDoContrato
 *       - centroDeCusto
 *       - agenciaResponsavelConducao
 *     properties:
 *       periodoDeVigencia:
 *         $ref: '#/definitions/IPeriodoDeVigencia'
 *       valorDoPercentualTotalDoContrato:
 *         type: number
 *       centroDeCusto:
 *         $ref: '#/definitions/IAberturaContratoCentroDeCusto'
 *       agenciaResponsavelConducao:
 *         type: number
 *     example:
 *      {
 *          periodoDeVigencia: {
 *              dataInicio: "2021-09-25T09:40:00.000Z",
 *              dataFim: "2022-09-25T09:40:00.000Z"
 *          },
 *          valorDoPercentualTotalDoContrato: 20,
 *          centroDeCusto: [
 *            {
 *                numeroIdentificacaoCentroCusto: 111,
 *                nome: "Nome de uma Matriz",
 *                descricao: "Descrição de uma Matriz muito incrível e de reputação excelente.",
 *                dataUltimaAtualizacao: "2021-09-25T09:40:00.000Z",
 *                estado: "Vigente",
 *                dadosCobranca: {
 *                    agencia: 4444,
 *                    contaCorrente: 55555
 *                }
 *            }
 *          ],
 *          agenciaResponsavelConducao: 4444,
 *      }
 */
export interface IAberturaContrato {
  periodoDeVigencia: IPeriodoDeVigencia;
  valorDoPercentualTotalDoContrato: number;
  centroDeCusto: Array<IAberturaContratoCentroDeCusto>;
  agenciaResponsavelConducao: number;
}
