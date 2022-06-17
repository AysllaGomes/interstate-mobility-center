import mongoose, { Schema, Document } from "mongoose";
import { IPeriodoDeVigencia } from "./interfaces/PeriodoDeVigencia";

export interface IViagem extends Document {
  _id: string;
  titulo: string;
  preco: number;
  duracao: number;
  image: string;
  descricao: string;
  estadoOrigem: string;
  estadoDestino: string;
  periodoDeVigencia: IPeriodoDeVigencia;
}

const ViagemSchema: Schema = new Schema({
  idUsuario: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  duracao: {
    type: Object,
    required: true,
  },
  estadoOrigem: {
    type: String,
    required: true,
  },
  estadoDestino: {
    type: String,
    required: true,
  },
  periodoDeVigencia: {
    type: Object,
    required: false,
  },
});

export default mongoose.model<IViagem>("Viagem", ViagemSchema, "viagem");
