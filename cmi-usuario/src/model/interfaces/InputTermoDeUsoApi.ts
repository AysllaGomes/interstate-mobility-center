
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
 *          idUsuario: "5ececf3feb61577603b058e1",
 *      }
 */
export interface IInputTermoDeUsoApi {
  idUsuario: string;
}
