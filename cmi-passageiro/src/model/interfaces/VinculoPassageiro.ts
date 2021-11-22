/**
 * @swagger
 *
 * definitions:
 *   IVinculoPassageiro:
 *     type: object
 *     required:
 *       - idUsuario
 *       - idViagem
 *       - nome
 *       - cpf
 *       - dataDeNascimento
 *       - numeroTelefoneCelular
 *     properties:
 *       idUsuario:
 *         type: string
 *       idViagem:
 *         type: string
 *       nome:
 *         type: string
 *       cpf:
 *         type: string
 *       dataDeNascimento:
 *         type: string
 *       numeroTelefoneCelular:
 *         type: string
 *     example:
 *      {
 *         idUsuario: "6137e55a3faa33026260185e",
 *         idViagem: "6137e55a3faa33026260185e",
 *         nome: "Some Chick",
 *         cpf: "99999999999",
 *         dataDeNascimento: "01/01/2000",
 *         numeroTelefoneCelular: "99999999999",
 *      }
 */
export interface IVinculoPassageiro {
    idUsuario: string;
    idViagem: string;
    nome: string;
    cpf: string;
    dataDeNascimento: string;
    numeroTelefoneCelular: string;
}

