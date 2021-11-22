import mongoose, { Schema, Document } from "mongoose";

export interface IPassageiro extends Document {
    idUsuario: string;
    idViagem: string;
    nome: string;
    cpf: string;
    dataDeNascimento: string;
    numeroTelefoneCelular: string;
    tsCriacao: Date;
}

/**
 * @swagger
 *
 * definitions:
 *   Passageiro:
 *     type: object
 *     required:
 *       - _id
 *       - idUsuario
 *       - idViagem
 *       - nome
 *       - cpf
 *       - dataDeNascimento
 *       - numeroTelefoneCelular
 *       - tsCriacao
 *       - __v
 *     properties:
 *       _id:
 *         type: string
 *       idUsuario:
 *         type: string
 *       idViagem:
 *         type: string
 *       nome:
 *         type: string
 *       cpf:
 *         type: string
 *       dataDeNascimento:
 *         type: string
 *       numeroTelefoneCelular:
 *         type: string
 *       tsCriacao:
 *         type: string
 *         format: date-time
 *       __v:
 *         type: string
 *     example:
 *      {
 *         _id: "619bf890a130d001ef9a9eb5",
 *         idUsuario: "6156346773d1a10041da8d4d",
 *         idViagem: "6137e55a3faa33026260185e",
 *         nome: "Some Chick",
 *         cpf: "99999999999",
 *         dataDeNascimento: "01/01/2000",
 *         numeroTelefoneCelular: "99999999999",
 *         tsCriacao: "2021-11-15T21:57:49.871Z",
 *         __v: 0
 *      }
 */

const PassageiroSchema: Schema = new Schema({
  idUsuario: {
    type: String,
    required: true,
  },
  idViagem: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  dataDeNascimento: {
    type: String,
    required: true,
  },
  numeroTelefoneCelular: {
    type: String,
    required: true,
  },
  tsCriacao: {
    type: Date,
    required: false,
  },
});

export default mongoose.model<IPassageiro>("Passageiro", PassageiroSchema, "passageiro");