import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose";
import { EstadoViagemEnum } from "./enums/EstadoViagem.enum";
import { IDadosPagamento } from "./interfaces/DadosPagamento";
import { IListaPassageiros } from "./interfaces/ListaPassageiros";

export interface IPassageiro extends Document {
    idUsuario: string;
    idViagem: string;
    viagemCancelada: boolean;
    estado: EstadoViagemEnum;
    usuarioPassageiro: boolean;
    listaPassageiros: Array<IListaPassageiros>;
    dadosPagamento: IDadosPagamento;
    dataCriacao: string;
    dataUltimaAtualizacao: Date;
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
 *       dataCriacao:
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
 *         dataCriacao: "2021-11-15",
 *         __v: 0
 *      }
 */

const PassageiroSchema: Schema = new Schema({
  idUsuario: {
    type: ObjectId,
    required: true,
  },
  idViagem: {
    type: ObjectId,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  viagemCancelada: {
    type: Boolean,
    required: true,
  },
  usuarioPassageiro: {
    type: Boolean,
    required: true,
  },
  listaPassageiros: {
    type: Array,
    required: false,
  },
  dadosPagamento: {
    type: Object,
    required: false,
  },
  dataCriacao: {
    type: String,
    required: true,
  },
  dataUltimaAtualizacao: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<IPassageiro>("Passageiro", PassageiroSchema, "passageiro");
