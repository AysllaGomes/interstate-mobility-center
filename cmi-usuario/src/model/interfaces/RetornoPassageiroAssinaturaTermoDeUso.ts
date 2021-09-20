/**
 * @swagger
 *
 * definitions:
 *   IRetornoPassageiroAssinaturaTermoDeUso:
 *     type: object
 *     required:
 *       - ok
 *     properties:
 *       assinado:
 *         type: boolean
 *       versao:
 *         type: number
 *       ok:
 *         type: conteudo
 *     example:
 *      {
 *          "assinado": false,
 *          "versao": 3,
 *          "conteudo": "<html><body><p>Exemplo de retorno do conteúdo Termo de Uso.</p></body></html>"
 *      }
 */
export interface IRetornoPassageiroAssinaturaTermoDeUso {
    assinado: boolean;
    versao: number;
    conteudo: string;
}

/**
 * @swagger
 *
 * definitions:
 *   IConsultaAssinaturaTermoUsuario:
 *     type: object
 *     required:
 *       - "idUsuario"
 *     properties:
 *       "idUsuario":
 *         type: string
 *     example:
 *      {
 *          "idUsuario": "61427765a5f55703004d051a",
 *      }
 */
