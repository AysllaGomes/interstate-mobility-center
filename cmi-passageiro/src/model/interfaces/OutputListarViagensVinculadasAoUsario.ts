/**
 * @swagger
 *
 * definitions:
 *   IOutputListarViagensVinculadasAoUsario:
 *     type: object
 *     required:
 *       - idUsuario
 *       - idPassageiro
 *       - dataReferencia
 *       - destino
 *       - preco
 *     properties:
 *       idUsuario:
 *         type: string
 *       idPassageiro:
 *         type: string
 *       dataReferencia:
 *         type: string
 *       destino:
 *         type: string
 *       preco:
 *         type: number
 *     example:
 *      {
 *          "idUsuario": "628b6b66fe37f03142107b9a",
 *          "dataReferencia": "17/06/2022",
 *          "destino": "Distrito Federal",
 *          "preco": 2000,
 *      }
 */
export interface IOutputListarViagensVinculadasAoUsario {
    idUsuario: string;
    idPassageiro: string;
    dataReferencia: string;
    destino: string;
    preco: number;
}
