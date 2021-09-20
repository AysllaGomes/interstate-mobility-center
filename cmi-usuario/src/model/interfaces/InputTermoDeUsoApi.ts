
/**
 * @swagger
 *
 * definitions:
 *   IInputTermoDeUsoApi:
 *     type: object
 *     required:
 *       - idUsuario
 *     properties:
 *       idUsuario:
 *         type: string
 *     example:
 *      {
 *          idUsuario: "61427765a5f55703004d051a",
 *      }
 */
export interface IInputTermoDeUsoApi {
  idUsuario: string;
}
