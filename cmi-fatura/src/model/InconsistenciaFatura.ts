import mongoose, { Schema, Document } from "mongoose";
import { TipoDaInconsistenciaEnum } from "./enums/TipoDaInconsistencia.enum";
import { MotivoDaInconsistenciaEnum } from "./enums/MotivoDaInconsistencia.enum";
import { EstadoDaInconsistenciaEnum } from "./enums/EstadoDaInconsistencia.enum";
import { IDadosDaInconsistenciaDaFatura } from "./interfaces/DadosDaInconsistenciaDaFatura";

export interface IInconsistenciaFatura extends Document {
  _id: string;
  tipoDaInconsistencia: TipoDaInconsistenciaEnum;
  motivoDaInconsistencia: Array<MotivoDaInconsistenciaEnum>;
  idViagem?: string;
  idFaturaContratoMobilidade?: string;
  dadosDaInconsistencia?: IDadosDaInconsistenciaDaFatura;
  dataDaCriacao: Date;
  estadoDaInconsistencia: EstadoDaInconsistenciaEnum;
  dataDaResolucao?: Date;
}

const InconsistenciaFaturaSchema: Schema = new Schema({
  tipoDaInconsistencia: {
    type: Object,
    required: true,
  },
  motivoDaInconsistencia: {
    type: Object,
    required: true,
  },
  idViagem: {
    type: String,
    required: false,
  },
  idFaturaContratoMobilidade: {
    type: String,
    required: false,
  },
  dadosDaInconsistencia: {
    type: Object,
    required: false,
  },
  dataDaCriacao: {
    type: Date,
    required: true,
  },
  estadoDaInconsistencia: {
    type: Object,
    required: true,
  },
  dataDaResolucao: {
    type: Date,
    required: false,
  },
});

export default mongoose.model<IInconsistenciaFatura>("InconsistenciaFatura", InconsistenciaFaturaSchema, "inconsistenciaFatura");
