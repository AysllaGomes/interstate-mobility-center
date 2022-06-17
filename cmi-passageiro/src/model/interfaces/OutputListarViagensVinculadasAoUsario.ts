/**
 * @swagger
 *
 * definitions:
 *   IOutputListarViagensVinculadasAoUsario:
 *     type: object
 *     required:
 *       - idUsuario
 *       - idPassageiro
 *       - imagem
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
 *          "imagem": "https://firebasestorage.googleapis.com/v0/b/tcc-react-9a14e.appspot.com/o/imgs-tcc-project%2Fbrasilia.jpeg?alt=media&token=b20d2065-9268-4d0f-a8fa-68752d624511",
 *          "dataReferencia": "17/06/2022",
 *          "destino": "Distrito Federal",
 *          "preco": 2000,
 *      }
 */
export interface IOutputListarViagensVinculadasAoUsario {
    idUsuario: string;
    idPassageiro: string;
    imagem: string;
    dataReferencia: string;
    destino: string;
    preco: number;
}
