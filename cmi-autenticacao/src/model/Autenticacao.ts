import mongoose, { Schema, Document } from "mongoose";

export interface IAutenticacao extends Document {
    _id: string;
    parceiro: string;
    apiParceiro: string;
    token: string;
    tsCriacao: Date;
    tsVencimento: Date;
}

/**
 * @swagger
 *
 * definitions:
 *   Autenticacao:
 *     type: object
 *     properties:
 *       parceiro:
 *         type: string
 *       token:
 *         type: string
 *     example:
 *       parceiro: "nome parceiro"
 *       token: "6IkpXVCJ9.eyJuYW1laWQiOiI0Nzc3NTExIiwidW5pcXVlX25hbWUiOiJpbnRlZ3JhY2FvIJxu"
 */
export class Autenticacao {}

const AutenticacaoSchema: Schema = new Schema({
  apiParceiro: {
    type: String,
    required: false,
  },
  parceiro: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
  tsCriacao: {
    type: Date,
    required: false,
  },
  tsVencimento: {
    type: Date,
    required: false,
  },
}, {
  bufferCommands: false,
});

export default mongoose.model<IAutenticacao>("Autenticacao", AutenticacaoSchema, "autenticacao");

