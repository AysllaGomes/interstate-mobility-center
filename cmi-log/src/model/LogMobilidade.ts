import mongoose, { Document, Schema } from "mongoose";
import { CategoriaEnum } from "./enums/Categoria.enum";
import { IProcesso } from "./interfaces/Processo";
import { TipoApiEnum } from "./enums/TipoApi.enum";
import { PlataformaEnum } from "./enums/Plataforma.enum";

export interface ILogMobilidade extends Document {

    tsDeRegistroDoLog: Date;
    categoria: CategoriaEnum;
    processo: IProcesso;
    usuarioLogado?: string;
    tsDoConsumoDaApi: Date;
    tipoApi?: TipoApiEnum;
    plataforma: PlataformaEnum;
}

/**
 * @swagger
 *
 * definitions:
 *   LogMobilidade:
 *     type: object
 *     required:
 *       - tsDeRegistroDoLog
 *       - categoria
 *       - processo
 *       - tsDoConsumoDaApi
 *     properties:
 *       tsDeRegistroDoLog:
 *         type: string
 *         format: date-time
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
 *             tsDeRegistroDoLog: "2021-07-02T19:17:43.770Z",
 *             categoria: "Consumo API",
 *             processo: {
 *               tipoProcesso: "App",
 *               versao: "1.0.0",
 *               classe: "NomeDaClasse",
 *               metodo: "NomeDoMetodo"
 *             },
 *             usuarioLogado: "Joaozinho",
 *             tsDoConsumoDaApi: "2021-07-02T19:17:43.770Z",
 *             tipoApi: "Geocoding",
 *             plataforma: "App"
 *          }
 *      ]
 */

const LogMobilidadeSchema: Schema = new Schema({
  tsDeRegistroDoLog: {
    type: Date,
    required: true,
  },
  categoria: {
    type: Object,
    required: true,
  },
  processo: {
    type: Object,
    required: true,
  },
  usuarioLogado: {
    type: String,
    required: false,
  },
  tsDoConsumoDaApi: {
    type: Date,
    required: true,
  },
  tipoApi: {
    type: Object,
    required: false,
  },
  plataforma: {
    type: String,
    required: true,
  },
});

export default mongoose.model<ILogMobilidade>("LogMobilidade", LogMobilidadeSchema, "logMobilidade");
