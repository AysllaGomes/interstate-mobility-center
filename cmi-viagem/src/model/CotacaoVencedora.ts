import mongoose, { Schema, Document } from "mongoose";

export interface ICotacaoVencedora extends Document {
  parceiro: string;
  idUsuarioParceiro: string | number;
  produto: string;
  objIdParceiro: object;
  valor: number;
  icone: string;
  valorEconomizado: number;
  tsCriacao: Date;
}

/**
 * @swagger
 *
 * definitions:
 *   CotacaoVencedora:
 *     type: object
 *     properties:
 *       parceiro:
 *         type: string
 *       idUsuarioParceiro:
 *         type: string
 *       produto:
 *         type: string
 *       objIdParceiro:
 *         type: string
 *       valor:
 *         type: number
 *       icone:
 *         type: string
 *       tsCriacao:
 *         type: date
 *     example:
 *       parceiro: "parceiro vencedor"
 *       idUsuarioParceiro: "9999"
 *       produto: "Parceiro Chen"
 *       objIdParceiro: "1"
 *       valor: 123
 *       icone: "https://icone.com/icone.png"
 *       tsCriacao: "2021-10-01"
 */

const CotacaoVencedoraSchema: Schema = new Schema({
  parceiro: {
    type: String,
    required: true,
  },
  idUsuarioParceiro: {
    type: Object,
    required: true,
  },
  produto: {
    type: String,
    required: true,
  },
  objIdParceiro: {
    type: Object,
    required: false,
  },
  valor: {
    type: Number,
    required: true,
  },
  icone: {
    type: String,
    required: false,
  },
  valorEconomizado: {
    type: Number,
    required: true,
  },
  tsCriacao: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<ICotacaoVencedora>("CotacaoVencedora", CotacaoVencedoraSchema);
