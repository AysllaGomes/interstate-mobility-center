/**
 * @swagger
 *
 * definitions:
 *   IPeriodoDeVigencia:
 *     type: object
 *     required:
 *       - dataInicio
 *       - dataFim
 *     properties:
 *       dataInicio:
 *         type: string
 *         format: date-time
 *       dataFim:
 *         type: string
 *         format: date-time
 *     example:
 *      {
 *          dataInicio: "2021-09-25T09:40:00.000Z",
 *          dataFim: "2022-09-25T09:40:00.000Z"
 *      }
 */
export interface IPeriodoDeVigencia {
    dataInicio: Date;
    dataFim: Date;
}
