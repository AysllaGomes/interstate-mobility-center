import mongoose, { Document, Schema } from "mongoose";
import { EstadoTermoDeUsoEnum } from "./enums/EstadoTermoDeUso.enum";

export interface ITermoDeUso extends Document {
    versao: number;
    conteudo: string;
    criticidade: string;
    estadoTermoDeUso: EstadoTermoDeUsoEnum;
    tsDeInicioVigencia: Date;
    tsDeExpiracaoVigencia?: Date;
}

/**
 * @swagger
 *
 * definitions:
 *   TermoDeUso:
 *     type: object
 *     required:
 *       - versao
 *       - conteudo
 *       - estadoTermoDeUso
 *       - criticidade
 *       - tsDeInicioVigencia
 *     properties:
 *       versao:
 *         type: number
 *       conteudo:
 *         type: string
 *       estadoTermoDeUso:
 *         type: string
 *         enum:
 *          - "Vigente"
 *          - "Encerrado"
 *       criticidade:
 *         type: string
 *       tsDeInicioVigencia:
 *         type: string
 *         format: date-time
 *       tsDeExpiracaoVigencia:
 *         type: string
 *         format: date-time
 *     example:
 *      {
 *         versao: 9999,
 *         conteudo: "Texto de conteúdo de exemplificação",
 *         criticidade: "Irrelevante",
 *         estadoTermoDeUso: "Vigente",
 *         tsDeInicioVigencia: "2021-09-04T00:00:00.000Z",
 *      }
 */

const TermoDeUsoSchema: Schema = new Schema({
  versao: {
    type: Number,
    required: true,
  },
  conteudo: {
    type: String,
    required: true,
  },
  estadoTermoDeUso: {
    type: String,
    required: true,
  },
  criticidade: {
    type: String,
    required: true,
  },
  tsDeInicioVigencia: {
    type: Date,
    required: true,
  },
  tsDeExpiracaoVigencia: {
    type: Date,
    required: false,
  },
});

export default mongoose.model<ITermoDeUso>("TermoDeUso", TermoDeUsoSchema, "termoDeUso");
