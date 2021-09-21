
/**
 * @swagger
 *
 * definitions:
 *   ICadastroUsuario:
 *     type: object
 *     required:
 *       - cpf
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
 *          cpf: "99999999999",
 *          nome: "Some Chick",
 *          email: "some_chick@example.com",
 *          dataDeNascimento: "01-01-1990",
 *          numeroTelefoneCelular: "99999999999",
 *      }
 */
export interface ICadastroUsuario {
  cpf: string;
  nome: string;
  email: string;
  dataDeNascimento: string;
  numeroTelefoneCelular: string;
}
