import mongoose, { Schema, Document } from "mongoose";

export interface IParceiro extends Document {
  _id: string;
  nome: string;
  codigoParceiro: string;
  codigoMci: string;
  cnpj: string;
  parametros: object;
  ativo: boolean;
}

/**
 * @swagger
 *
 * definitions:
 *   Parceiro:
 *     type: object
 *     properties:
 *       nome:
 *         type: string
 *       codigoParceiro:
 *         type: string
 *       codigoMci:
 *         type: string
 *       cnpj:
 *         type: string
 *       parametros:
 *         type: object
 *       ativo:
 *         type: boolean
 *     example:
 *       nome: "nome parceiro"
 *       codigoParceiro: "parceiro"
 *       codigoMci: "MCI do parceiro"
 *       cnpj: "CNPJ do parceiro"
 *       parametros: "Parametros especificos do parceiro"
 *       ativo: true
 */
export class Parceiro {
}

const ParceiroSchema: Schema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  codigoParceiro: {
    type: String,
    required: true,
  },
  codigoMci: {
    type: String,
    required: true,
  },
  cnpj: {
    type: String,
    required: true,
  },
  parametros: {
    type: Object,
    required: false,
  },
  ativo: {
    type: Boolean,
    required: true,
  },
},
{
  bufferCommands: false,
});

export default mongoose.model<IParceiro>("Parceiro", ParceiroSchema, "parceiro");

