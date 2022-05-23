
/**
 * @swagger
 *
 * definitions:
 *   IDadosPagamento:
 *     type: object
 *     required:
 *       - idViagem
 *       - ultimosQuatroDigitos
 *       - cvc
 *       - dataDeVencimento
 *       - nomeDoTitularDoCartao
 *       - cpfDoTitularDoCartao
 *     properties:
 *       idViagem:
 *         type: string
 *       ultimosQuatroDigitos:
 *         type: number
 *       cvc:
 *         type: number
 *       dataDeVencimento:
 *         type: string
 *       nomeDoTitularDoCartao:
 *         type: string
 *       cpfDoTitularDoCartao:
 *         type: string
 *     example:
 *      {
 *          idUsuario: "6137e55a3faa33026260185e",
 *          idViagem: "6137e55a3faa33026260185e",
 *          ultimosQuatroDigitos: 9999,
 *          cvc: 999,
 *          dataDeVencimento: "12/2028",
 *          nomeDoTitularDoCartao: "Some Chick",
 *          cpfDoTitularDoCartao: "99999999999",
 *      }
 */
export interface IDadosDoPagamento {
  idUsuario: string;
  idViagem: string;
  ultimosQuatroDigitos: number;
  cvc: number;
  dataDeVencimento: string;
  nomeDoTitularDoCartao: string;
  cpfDoTitularDoCartao: string;
}
