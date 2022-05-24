/**
 * @swagger
 *
 * definitions:
 *   IInputListarViagem:
 *     type: object
 *     properties:
 *       titulo:
 *         type: string
 *       preco:
 *         type: number
 *       duracao:
 *         type: number
 *       estado-origem:
 *         type: string
 *       estado-destino:
 *         type: number
 *       data-inicio:
 *         type: string
 *       data-fim:
 *         type: string
 *     example:
 *      {
 *          "titulo" : "99999999991",
 *          "preco" : 999999991,
 *          "duracao" : "Vigente",
 *          "estado-origem" : "Pix",
 *          "estado-destino" : 20,
 *          "data-inicio" : "2022-04-11",
 *          "data-fim" : "2024-01-01",
 *      }
 */
export interface IInputListarViagem {
    titulo?: string;
    preco?: number;
    duracao?: number;
    estadoOrigem?: string;
    estadoDestino?: string;
    dataInicio?: string;
    dataFim?: string;
}
