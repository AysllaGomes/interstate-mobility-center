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
 *          dataInicio: "2022-10-11T00:00:00.000Z",
 *          dataFim: "2022-10-31T00:00:00.000Z"
 *      }
 */
export interface IPeriodoDeVigencia {
    dataInicio: Date;
    dataFim: Date;
}
