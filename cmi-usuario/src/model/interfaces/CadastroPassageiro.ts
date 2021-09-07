
/**
 * @swagger
 *
 * definitions:
 *   ICadastroPassageiro:
 *     type: object
 *     required:
 *       - nome
 *       - email
 *       - dataDeNascimento
 *       - numeroTelefoneCelular
 *     properties:
 *       nome:
 *         type: string
 *       email:
 *         type: string
 *       dataDeNascimento:
 *         type: string
 *       numeroTelefoneCelular:
 *         type: string
 *     example:
 *      {
 *          nome: "Ayslla Caroline Prates Gomes",
 *          email: "ayslla.gomes@outlook.com",
 *          dataDeNascimento: "16-12-1998",
 *          numeroTelefoneCelular: "61982072218",
 *      }
 */
export interface ICadastroPassageiro {
  nome: string;
  email: string;
  dataDeNascimento: string;
  numeroTelefoneCelular: string;
}
