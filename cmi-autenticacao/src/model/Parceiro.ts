import mongoose, { Schema, Document } from "mongoose";

export interface IParceiro extends Document {
  _id: string;
  nome: string;
  codigoParceiro: string;
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
 *       cnpj:
 *         type: string
 *       parametros:
 *         type: object
 *       ativo:
 *         type: boolean
 *     example:
 *       nome: "Nome do parceiro"
 *       codigoParceiro: "99999"
 *       cnpj: "99999999999999"
 *       parametros: "Parametros especificos do parceiro"
 *       ativo: true
 */

const ParceiroSchema: Schema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  codigoParceiro: {
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
});

export default mongoose.model<IParceiro>("Parceiro", ParceiroSchema, "parceiro");

