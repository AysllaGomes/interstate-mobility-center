/**
 * @swagger
 *
 * definitions:
 *   IInputDetalhamentoViagem:
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
export interface IInputDetalhamentoViagem {
    idUsuario: string;
}

