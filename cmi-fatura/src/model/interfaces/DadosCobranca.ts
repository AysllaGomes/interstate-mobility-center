/**
 * @swagger
 *
 * definitions:
 *   IDadosCobranca:
 *     type: object
 *     required:
 *       - agencia
 *       - contaCorrente
 *     properties:
 *       agencia:
 *         type: number
 *       contaCorrente:
 *         type: string
 *     example:
 *      agencia: 9999
 *      contaCorrente: 99999
 */
export interface IDadosCobranca {
    agencia: number;
    contaCorrente: number;
}
