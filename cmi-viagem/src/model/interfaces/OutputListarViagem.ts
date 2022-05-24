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
    estadoOrigem: string;
    estadoDestino: string;
    dataInicioVigencia: Date;
    dataFimVigencia: Date;
}
