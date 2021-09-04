
/**
 * @swagger
 *
 * definitions:
 *   IAberturaTermoDeUso:
 *     type: object
 *     required:
 *       - conteudo
 *       - criticidade
 *     properties:
 *       conteudo:
 *         type: string
 *       criticidade:
 *         type: string
 *     example:
 *      {
 *          conteudo: "Um exemplo de texto de conteúdo de termo de uso",
 *          criticidade: "Alto",
 *      }
 */
export interface IAberturaTermoDeUso {
  conteudo: string;
  criticidade?: string;
}
