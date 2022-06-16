/**
 * @swagger
 *
 * definitions:
 *   IInputDetalhamentoViagem:
 *     type: object
 *     required:
 *       - idUsuario
 *       - idViagem
 *       - dataRefencia
 *     properties:
 *       idUsuario:
 *         type: string
 *       idViagem:
 *         type: string
 *       dataRefencia:
 *         type: date
 *     example:
 *      {
 *         idUsuario: "6186d82da341c53dcc2c4d04",
 *         idViagem: "628b6b66fe37f03142107b9a",
 *         dataRefencia: "2022-06-16",
 *      }
 */
export interface IInputDetalhamentoViagem {
    idUsuario: string;
    idViagem: string;
    dataRefencia: string;
}

