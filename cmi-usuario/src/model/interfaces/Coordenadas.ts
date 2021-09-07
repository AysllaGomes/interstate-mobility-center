/**
 * @swagger
 *
 * definitions:
 *   ICoordenadas:
 *     type: object
 *     required:
 *       - posicaoUsuarioCMU
 *     properties:
 *       posicaoUsuarioCMU:
 *         type: number
 *     example:
 *      {
 *          posicaoUsuarioCMU: [-15.670982, -47.843966]
 *      }
 */
export interface ICoordenadas {
    posicaoUsuarioCMU: [number, number];
}
