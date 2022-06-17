/**
 * @swagger
 *
 * definitions:
 *   IInputDesativarViagem:
 *     type: object
 *     required:
 *       - idPassageiro
 *     properties:
 *       idPassageiro:
 *         type: string
 *     example:
 *      {
 *         idPassageiro: "6186d82da341c53dcc2c4d04",
 *      }
 */
export interface IInputDesativarViagem {
    idPassageiro: string;
}

