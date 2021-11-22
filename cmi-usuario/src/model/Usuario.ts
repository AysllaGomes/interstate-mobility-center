import mongoose, { Schema, Document } from "mongoose";
import { ITermosDeUso } from "./interfaces/TermosDeUso";
import { IDadosDoPagamento } from "./interfaces/DadosPagamento";

export interface IUsuario extends Document {
    nome: string;
    rg: string;
    cpf: string;
    email: string;
    dataDeNascimento: string;
    certidaoDeNascimento: string;
    numeroTelefoneCelular: string;
    termosDeUso?: Array<ITermosDeUso>;
    dadosDePagamento?: Array<IDadosDoPagamento>;
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
 *       cpf:
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
 *         dataDeNascimento: "01/01/2000",
 *         numeroTelefoneCelular: "99999999999",
 *         termosDeUso: [],
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
    type: Array,
    required: false,
  },
  dadosDePagamento: {
    type: Object,
    required: false,
  },
  tsCriacao: {
    type: Date,
    required: false,
  },
});

export default mongoose.model<IUsuario>("Usuario", UsuarioSchema, "usuario");
