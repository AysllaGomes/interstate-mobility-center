/**
 * @swagger
 *
 * definitions:
 *   IListaPassageiros:
 *     type: object
 *     required:
 *       - nome
 *       - cpf
 *       - dataDeNascimento
 *       - numeroTelefoneCelular
 *     properties:
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
 *         nome: "Some Chick",
 *         cpf: "99999999999",
 *         dataDeNascimento: "1990-01-01",
 *         numeroTelefoneCelular: "99999999999",
 *      }
 */
export interface IListaPassageiros {
    nome: string;
    cpf: string;
    dataDeNascimento: string;
    numeroTelefoneCelular: string;
}

