/**
 * @swagger
 *
 * definitions:
 *   IPeriodoReferencia:
 *     type: object
 *     required:
 *       - dataInicio
 *       - dataFim
 *     properties:
 *       dataInicio:
 *         type: string
 *         format: "date-time"
 *       dataFim:
 *         type: string
 *         format: "date-time"
 *     example:
 *      {
 *          dataInicio: 2021-06-01T03:00:00.000Z,
 *          dataFim: 2021-06-30T23:59:59.999Z
 *      }
 */

export interface IPeriodoReferencia {
    dataInicio: Date;
    dataFim: Date;
}
