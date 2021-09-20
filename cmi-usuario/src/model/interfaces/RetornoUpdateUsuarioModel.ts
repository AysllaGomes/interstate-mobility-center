/**
 * @swagger
 *
 * definitions:
 *   IRetornoUpdateModel:
 *     type: object
 *     required:
 *       - n
 *       - nModified
 *       - ok
 *     properties:
 *       n:
 *         type: number
 *       nModified:
 *         type: number
 *       ok:
 *         type: number
 *     example:
 *      {
 *          n: 1,
 *          nModified: 0,
 *          ok: 1,
 *      }
 */
export interface IRetornoUpdateUsuarioModel {
    n: number;
    nModified: number;
    ok: number;
}
