/**
 * @swagger
 *
 * definitions:
 *   IOutputListarViagem:
 *     type: object
 *     required:
 *       - _id
 *       - titulo
 *       - preco
 *       - duracao
 *       - image
 *       - estadoOrigem
 *       - estadoDestino
 *       - dataInicioVigencia
 *       - dataFimVigencia
 *     properties:
 *       _id:
 *         type: string
 *       titulo:
 *         type: string
 *       preco:
 *         type: number
 *       duracao:
 *         type: number
 *       image:
 *         type: string
 *       estadoOrigem:
 *         type: string
 *       estadoDestino:
 *         type: string
 *       dataInicioVigencia:
 *         type: string
 *         format: date-time
 *       dataFimVigencia:
 *         type: string
 *         format: date-time
 *     example:
 *      {
 *          "_id": "6255b8b457095d518c426209",
 *          "titulo": "Nome do Cliente",
 *          "preco": 2000,
 *          "duracao": 15,
 *          "image": "https://img.ibxk.com.br/2018/9/programas/15870025155352397.png",
 *          "estadoOrigem": "São Paulo",
 *          "estadoDestino": "Rio de Janeiro",
 *          "dataInicioVigencia": "2022-04-12T17:37:03.892Z",
 *          "dataFimVigencia": "2025-01-01T00:00:00.000Z"
 *      }
 */
export interface IOutputListarViagem {
    _id: string;
    titulo: string;
    preco: number;
    duracao: number;
    image: string;
    descricao: string;
    estadoOrigem: string;
    estadoDestino: string;
    dataInicioVigencia: Date;
    dataFimVigencia: Date;
}
