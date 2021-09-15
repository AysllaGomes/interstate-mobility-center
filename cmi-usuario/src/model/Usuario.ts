import mongoose, { Schema, Document } from "mongoose";
import { ITermosDeUso } from "./interfaces/TermosDeUso";

export interface IUsuario extends Document {
    nome: string;
    rg: string;
    cpf: string;
    email: string;
    dataDeNascimento: Date;
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
 *         format: date-time
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
 *         nome: "Some Chick",
 *         email: "some_chick@example.com",
 *         dataDeNascimento: "1990-01-01T02:00:00.000Z",
 *         numeroTelefoneCelular: "99999999999",
 *         tsCriacao: "2021-09-15T21:57:49.871Z",
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
    type: Date,
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
