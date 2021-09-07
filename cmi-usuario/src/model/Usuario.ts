import mongoose, { Schema, Document } from "mongoose";
import { ITermosDeUso } from "./interfaces/TermosDeUso";

export interface IUsuario extends Document {
    nome: string;
    rg: string;
    cpf: string;
    email: string;
    dataDeNascimento: string;
    certidaoDeNascimento: string;
    numeroTelefoneCelular: string;
    termosDeUso?: ITermosDeUso;
    tsCriacao: Date;
}

/**
 * @swagger
 *
 * definitions:
 *   Usuario:
 *     type: object
 *     required:
 *       - _id
 *       - nome
 *       - email
 *       - dataDeNascimento
 *       - numeroTelefoneCelular
 *       - tsCriacao
 *       - __v
 *     properties:
 *       _id:
 *         type: string
 *       nome:
 *         type: string
 *       email:
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
 *         _id: "6137e55a3faa33026260185e",
 *         nome: "Reisson Ramos Silva",
 *         email: "reisson.ramos@outlook.com",
 *         dataDeNascimento: "24-02-1999",
 *         numeroTelefoneCelular: "6199366676",
 *         tsCriacao: "2021-09-07T22:19:06.988Z",
 *         __v: 0
 *      }
 */

const UsuarioSchema: Schema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
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
  cpf: {
    type: String,
    required: false,
  },
  rg: {
    type: String,
    required: false,
  },
  certidaoDeNascimento: {
    type: String,
    required: false,
  },
  termosDeUso: {
    type: Object,
    required: false,
  },
  tsCriacao: {
    type: Date,
    required: false,
  },
});

export default mongoose.model<IUsuario>("Usuario", UsuarioSchema, "usuario");
