/**
 * @swagger
 *
 * definitions:
 *   IAberturaFatura:
 *     type: object
 *     required:
 *       - idContratoMobilidade
 *       - mesDeReferencia
 *       - anoDeReferencia
 *     properties:
 *       idContratoMobilidade:
 *         type: string
 *       mesDeReferencia:
 *         type: number
 *       anoDeReferencia:
 *         type: number
 *     example:
 *      {
 *          idContratoMobilidade: "615275cfae51bb002ea736d2",
 *          mesDeReferencia: 11,
 *          anoDeReferencia: 2021,
 *      }
 */
export interface IAberturaFatura {
    idContratoMobilidade: string;
    mesDeReferencia: number;
    anoDeReferencia: number;
}
