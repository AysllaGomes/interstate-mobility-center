/**
 * @swagger
 *
 * definitions:
 *   IOutputDetalharViagem:
 *     type: object
 *     required:
 *       - imagem
 *       - preco
 *       - destino
 *       - dataRefencia
 *     properties:
 *       imagem:
 *         type: string
 *       preco:
 *         type: number
 *       destino:
 *         type: string
 *       dataRefencia:
 *         type: string
 *     example:
 *      {
 *          "imagem": 2000,
 *          "preco": 2000,
 *          "destino": "Encerrado",
 *          "dataRefencia": true,
 *      }
 */
export interface IOutputDetalharViagem {
    imagem: string;
    preco: number;
    destino: string;
    dataRefencia: string;
}
