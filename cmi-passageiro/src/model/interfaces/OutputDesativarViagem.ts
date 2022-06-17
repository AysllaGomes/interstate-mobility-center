/**
 * @swagger
 *
 * definitions:
 *   IOutputDesativarViagem:
 *     type: object
 *     required:
 *       - id
 *       - estado
 *       - viagemCancelada
 *       - dataUltimaAtualizacao
 *     properties:
 *       id:
 *         type: string
 *       estado:
 *         type: string
 *       viagemCancelada:
 *         type: boolean
 *       dataUltimaAtualizacao:
 *         type: string
 *         format: date-time
 *     example:
 *      {
 *          "id": "628b6b66fe37f03142107b9a",
 *          "estado": "Encerrado",
 *          "viagemCancelada": true,
 *          "dataUltimaAtualizacao": "2022-06-17T00:00:00.000Z",
 *      }
 */
export interface IOutputDesativarViagem {
    id: string;
    estado: string;
    viagemCancelada: boolean;
    dataUltimaAtualizacao: Date;
}
