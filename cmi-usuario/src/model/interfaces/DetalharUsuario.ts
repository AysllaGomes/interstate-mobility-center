/**
 * @swagger
 *
 * definitions:
 *   IDetalharUsuario:
 *     type: object
 *     required:
 *       - email
 *     properties:
 *       email:
 *         type: string
 *     example:
 *      {
 *          email: "some_chick@example.com",
 *      }
 */
export interface IDetalharUsuario {
  email: string;
}
