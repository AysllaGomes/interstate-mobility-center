/**
 * @swagger
 *
 * definitions:
 *   IInputListarViagensVincularAoUsario:
 *     type: object
 *     required:
 *       - idUsuario
 *     properties:
 *       idUsuario:
 *         type: string
 *     example:
 *      {
 *         idUsuario: "6186d82da341c53dcc2c4d04",
 *      }
 */
export interface IInputListarViagensVincularAoUsario {
    idUsuario: string;
}

