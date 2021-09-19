import { TipoProcessoEnum } from "../enums/TipoProcesso.enum";

/**
 * @swagger
 *
 * definitions:
 *   IProcesso:
 *     type: object
 *     required:
 *       - tipoProcesso
 *       - versao
 *       - classe
 *       - metodo
 *     properties:
 *       tipoProcesso:
 *         type: string
 *         enum:
 *          - App
 *          - cmi-autenticacao
 *          - cmi-usuario
 *          - cmi-viagem
 *       versao:
 *         type: string
 *       classe:
 *         type: string
 *       metodo:
 *         type: string
 *     example:
 *       tipoProcesso: "App"
 *       versao: "1.0.0"
 *       classe: "NomeDaClasse"
 *       metodo: "NomeDoMetodo"
 */
export interface IProcesso {
    tipoProcesso: TipoProcessoEnum;
    versao: string;
    classe: string;
    metodo: string;
}
