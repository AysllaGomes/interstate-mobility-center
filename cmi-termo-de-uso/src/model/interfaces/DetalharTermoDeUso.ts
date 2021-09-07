
/**
 * @swagger
 *
 * definitions:
 *   IDetalharTermoDeUso:
 *     type: object
 *     required:
 *       - versao
 *     properties:
 *       versao:
 *         type: number
 *     example:
 *      {
 *          versao: 9999,
 *      }
 */
export interface IDetalharTermoDeUso {
  versao: number;
}
