/**
 * @swagger
 *
 * definitions:
 *   IOutputDetalharViagem:
 *     type: object
 *     required:
 *       - preco
 *       - destino
 *       - dataRefencia
 *     properties:
 *       preco:
 *         type: number
 *       destino:
 *         type: string
 *       dataRefencia:
 *         type: string
 *     example:
 *      {
 *          "preco": 2000,
 *          "destino": "Encerrado",
 *          "dataRefencia": true,
 *      }
 */
export interface IOutputDetalharViagem {
    preco: number;
    destino: string;
    dataRefencia: string;
}
