import { IProcesso } from "./Processo";
import { TipoApiEnum } from "../enums/TipoApi.enum";
import { CategoriaEnum } from "../enums/Categoria.enum";
import { PlataformaEnum } from "../enums/Plataforma.enum";

/**
 * @swagger
 *
 * definitions:
 *   IInputLogMobilidade:
 *     type: object
 *     required:
 *       - categoria
 *       - processo
 *       - tsDoConsumoDaApi
 *     properties:
 *       categoria:
 *         type: string
 *         enum:
 *          - Consumo API
 *          - Log ERRO
 *          - Log INFO
 *          - Log DEBUG
 *       processo:
 *         $ref: '#/definitions/IProcesso'
 *       usuarioLogado:
 *         type: string
 *       tsDoConsumoDaApi:
 *         type: string
 *       tipoApi:
 *        type: string
 *        enum:
 *         - Geocoding
 *         - ReverseGeocoding
 *         - PlacesAutoComplete
 *         - Directions
 *         - MapSDKAndroid
 *         - MapSDKiOS
 *       plataforma:
 *        type: string
 *        enum:
 *         - App
 *         - Microserviço
 *     example:
 *      [
 *          {
 *              categoria: "Consumo API",
 *              processo: {
 *                  tipoProcesso: "App",
 *                  versao: "1.0.0",
 *                  classe: "NomeDaClasse",
 *                  metodo: "NomeDoMetodo"
 *              },
 *              usuarioLogado: "Joaozinho",
 *              tsDoConsumoDaApi: "2021-07-02T19:17:43.770Z",
 *              tipoApi: "Geocoding",
 *              plataforma: "App"
 *          }
 *      ]
 */
export interface IInputLogMobilidade {
    categoria: CategoriaEnum;
    processo: IProcesso;
    usuarioLogado?: string;
    tsDoConsumoDaApi: string;
    tipoApi?: TipoApiEnum;
    plataforma: PlataformaEnum;
}
