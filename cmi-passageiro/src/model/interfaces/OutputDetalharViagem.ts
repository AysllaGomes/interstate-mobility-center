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
 *          "imagem": "https://firebasestorage.googleapis.com/v0/b/tcc-react-9a14e.appspot.com/o/imgs-tcc-project%2Fbrasilia.jpeg?alt=media&token=b20d2065-9268-4d0f-a8fa-68752d624511",
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
