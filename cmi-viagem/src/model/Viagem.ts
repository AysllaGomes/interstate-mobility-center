import mongoose, { Schema, Document } from "mongoose";
import { ICoordenadas } from "./interfaces/Coordenadas";
import { IStatusViagem } from "./interfaces/StatusViagem";
import { IAvaliacaoViagem } from "./interfaces/AvaliacaoViagem";
import { ICotacaoVencedora } from "./interfaces/CotacaoVencedora";
import { IPeriodoDeVigencia } from "./interfaces/PeriodoDeVigencia";
import { IDadosDeFaturamento } from "./interfaces/DadosDeFaturamento";

export interface IViagem extends Document {
  _id: string;
  titulo: string;
  preco: number;
  duracao: number;
  image: string;
  descricao: string;
  nomeParceiro: string;
  estadoOrigem: string;
  estadoDestino: string;
  periodoDeVigencia: IPeriodoDeVigencia;
  idUsuario: string;
  coordenadas: ICoordenadas;
  cotacaoVencedora: ICotacaoVencedora;
  parceirosCotados: object;
  tsCriacao: Date;
  idViagemNoParceiro: string | number,
  statusViagem: Array<IStatusViagem>;
  avaliacaoViagem?: IAvaliacaoViagem;
  motivoDaViagem: string;
  dadosDeFaturamento?: IDadosDeFaturamento;
  situacaoViagem?: string;
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
  nomeParceiro: {
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
  coordenadas: {
    type: Object,
    required: true,
  },
  cotacaoVencedora: {
    type: Object,
    required: false,
  },
  parceirosCotados: {
    type: Object,
    required: true,
  },
  tsCriacao: {
    type: Date,
    required: true,
  },
  idViagemNoParceiro: {
    type: String,
    required: false,
  },
  statusViagem: {
    type: Array,
    required: false,
  },
  avaliacaoViagem: {
    type: Object,
    required: false,
  },
  motivoDaViagem: {
    type: String,
    required: false,
  },
  dadosDeFaturamento: {
    type: Object,
    required: false,
  },
  situacaoViagem: {
    type: String,
    required: false,
  },
});

export default mongoose.model<IViagem>("Viagem", ViagemSchema, "viagem");
