/**
 * @swagger
 *
 * definitions:
 *   ICotacaoVencedoraViagem:
 *     type: object
 *     properties:
 *       parceiro:
 *         type: string
 *       idUsuarioParceiro:
 *         type: string
 *       produto:
 *         type: string
 *       objIdParceiro:
 *         type: object
 *       valor:
 *         type: number
 *       tempoEspera:
 *         type: number
 *       premium:
 *         type: boolean
 *       icone:
 *         type: string
 *       tsCriacao:
 *         type: Date
 *       valorEconomizado:
 *         type: number
 */
export interface ICotacaoVencedoraViagem {

    parceiro: string;
    idUsuarioParceiro: string|number;
    produto: string;
    objIdParceiro: object;
    valor: number;
    tempoEspera: number;
    premium: boolean;
    icone: string;
    tsCriacao: Date;
    valorEconomizado: number;
}
