import { PeriodicidadeOrcamentoCentroDeCustoEnum } from "../enums/PeriodicidadeOrcamentoCentroDeCusto.enum";

/**
 * @swagger
 *
 * definitions:
 *   OrcamentoCentroDeCusto:
 *     type: object
 *     required:
 *       - periodicidade
 *       - valor
 *     properties:
 *       periodicidade:
 *         type: string
 *         enum:
 *          - Semanal
 *          - Quinzenal
 *          - Mensal
 *          - Trimestral
 *          - Semestral
 *          - Anual
 *       valor:
 *         type: number
 *     example:
 *        {
 *            periodicidade: "Mensal",
 *            valor: 2000
 *        }
 */
export interface IOrcamentoCentroDeCusto {
    periodicidade: PeriodicidadeOrcamentoCentroDeCustoEnum;
    valor: number;
}
