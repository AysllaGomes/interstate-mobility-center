/**
 * @swagger
 *
 * definitions:
 *   IContratoFatura:
 *     type: object
 *     required:
 *       - idContratoMobilidade
 *     properties:
 *        numeroIdentificacaoContrato:
 *           type: number
 *        nomeParceiro:
 *           type: string
 *        idContratoMobilidade:
 *           type: string
 *        numeroDeIdentificacaoContratoMobilidade:
 *           type: number
 *        nomeCliente:
 *           type: string
 *     example:
 *          {
 *              numeroIdentificacaoContrato: 3,
 *              nomeParceiro: Wappa,
 *              idContratoMobilidade: 609194210562734c162a76c1,
 *              numeroDeIdentificacaoContratoMobilidade: 3,
 *              nomeCliente: Wappa
 *          }
 */
export interface IContratoFatura {
    numeroIdentificacaoContrato?: string;
    nomeParceiro?: string;
    idContratoMobilidade: string;
    numeroDeIdentificacaoContratoMobilidade?: number;
    nomeCliente?: string;
}
