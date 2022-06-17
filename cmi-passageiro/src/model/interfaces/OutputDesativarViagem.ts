/**
 * @swagger
 *
 * definitions:
 *   IOutputDesativarViagem:
 *     type: object
 *     required:
 *       - id
 *       - estado
 *       - viagemCancelada
 *       - dataUltimaAtualizacao
 *     properties:
 *       id:
 *         type: string
 *       estado:
 *         type: string
 *       viagemCancelada:
 *         type: boolean
 *       dataUltimaAtualizacao:
 *         type: string
 *         format: date-time
 *     example:
 *      {
 *          "id": "628b6b66fe37f03142107b9a",
 *          "estado": "Encerrado",
 *          "viagemCancelada": true,
 *          "dataUltimaAtualizacao": "2022-06-17T00:00:00.000Z",
 *      }
 */
export interface IOutputDesativarViagem {
    id: string;
    estado: string;
    viagemCancelada: boolean;
    dataUltimaAtualizacao: Date;
}

/**
 * @swagger
 *
 * definitions:
 *   Erro_SQL_ao_Desativar_Passageiro:
 *     type: object
 *     example:
 *          {
 *              code: "995",
 *              "sequential": "",
 *              source: "path_do_endpoint",
 *              message: "Não foi possível desabilitar a viagem do passageiro: 'x'...",
 *          }
 */

/**
 * @swagger
 *
 * definitions:
 *   Erro_SQL_ao_Verificar_se_Passageiro_Existe_na_base_de_dados:
 *     type: object
 *     example:
 *          {
 *              code: "996",
 *              "sequential": "",
 *              source: "path_do_endpoint",
 *              message: "Não foi possível buscar o passageiro 'x'.",
 *          }
 */

/**
 * @swagger
 *
 * definitions:
 *   Erro_SQL_ao_Verificar_se_Passageiro_tem_Condicoes_para_Desativar:
 *     type: object
 *     example:
 *          {
 *              code: "994",
 *              "sequential": "",
 *              source: "path_do_endpoint",
 *              message: "O passageiro 'x' não pode suspender a viagem. Pois, encontra-se suspenso!",
 *          }
 */
