/**
 * @swagger
 *
 * definitions:
 *   IDadosPagamento:
 *     type: object
 *     required:
 *       - anoCartao
 *       - mesCartao
 *       - cvcCartao
 *       - numeroCartao
 *       - cpfTitular
 *       - nomeTitularCartao
 *     properties:
 *       anoCartao:
 *         type: string
 *       mesCartao:
 *         type: string
 *       cvcCartao:
 *         type: string
 *       numeroCartao:
 *         type: string
 *       cpfTitular:
 *         type: string
 *       nomeTitularCartao:
 *         type: string
 *     example:
 *      {
 *         anoCartao: "23",
 *         mesCartao: "01",
 *         cvcCartao: "999",
 *         numeroCartao: "9999999999999999",
 *         cpfTitular: "99999999999",
 *         nomeTitularCartao: "Some Chick",
 *      }
 */
export interface IDadosPagamento {
    anoCartao: string;
    mesCartao: string;
    cvcCartao: string;
    numeroCartao: string;
    cpfTitular: string;
    nomeTitularCartao: string;
}

