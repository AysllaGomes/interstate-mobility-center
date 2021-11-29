/**
 * @swagger
 *
 * definitions:
 *   IContratoFatura:
 *     type: object
 *     required:
 *       - idContratoMobilidade
 *     properties:
 *        idContratoMobilidade:
 *           type: string
 *        numeroDeIdentificacaoContratoMobilidade:
 *           type: number
 *        nomeCliente:
 *           type: string
 *        numeroIdentificacaoContrato:
 *           type: number
 *        nomeParceiro:
 *           type: string
 *     example:
 *          {
 *              numeroIdentificacaoContrato: 3,
 *              nomeParceiro: Nock,
 *              idContratoMobilidade: 615275cfae51bb002ea736d2,
 *              numeroDeIdentificacaoContratoMobilidade: 3,
 *              nomeCliente: Nock
 *          }
 */
export interface IContratoFatura {
    idContratoMobilidade: string;
    numeroDeIdentificacaoContratoMobilidade?: number;
    nomeCliente?: string;
    nomeParceiro?: string;
    numeroIdentificacaoContrato?: number;
}
