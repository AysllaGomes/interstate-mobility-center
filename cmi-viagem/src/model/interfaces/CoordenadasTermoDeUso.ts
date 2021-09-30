/**
 * @swagger
 *
 * definitions:
 *   ICoordenadasTermoDeUso:
 *     type: object
 *     required:
 *       - posicaoUsuario
 *     properties:
 *       posicaoUsuarioCMU:
 *         type: number
 *     example:
 *      {
 *          posicaoUsuario: [-15.670982, -47.843966]
 *      }
 */
export interface ICoordenadasTermoDeUso {
    posicaoUsuario: [number, number];
}
