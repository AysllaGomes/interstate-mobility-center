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
 *      agencia: 4444
 *      contaCorrente: 55555
 */
export interface IDadosCobranca {
    agencia: number;
    contaCorrente: number;
}
