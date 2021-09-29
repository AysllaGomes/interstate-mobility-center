import mongoose, { Schema, Document } from "mongoose";

export interface INocksMS {
    MSAutentica: boolean,
    MSPassageiro: boolean,
    MSViagem: boolean,
    cenarioDaViagem : {
        cenario : number,
        cenariosDisponiveis : {
            1 : string,
            2 : string,
        }
    }
}

export interface IVariaveisDeAmbiente extends Document {
  _id: string;
  codigoVariavel : string;
  habilitaNock?: INocksMS;
  sequencialNumeroVersaoTermoDeUso: number;
  sequencialNumeroDeIdentificacaoContrato: number;
}

const VariaveisDeAmbienteSchema: Schema = new Schema({
  codigoVariavel: {
    type: String,
    required: true,
  },
  habilitaNock: {
    type: Object,
    required: false,
  },
  sequencialNumeroDeIdentificacaoContrato: {
    type: Number,
    required: true,
  },
  sequencialNumeroVersaoTermoDeUso: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IVariaveisDeAmbiente>("VariaveisDeAmbiente", VariaveisDeAmbienteSchema, "variaveisDeAmbiente");
