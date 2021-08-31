import mongoose, { Schema, Document } from "mongoose";

export interface IVariaveisDeAmbiente extends Document {
    _id: string;
    habilitaNock: INocksMS;
}

export interface INocksMS {
    MSAutentica: boolean,
    MSPassageiro: boolean,
    MSViagem: boolean
}

const VariaveisDeAmbienteSchema: Schema = new Schema({
  habilitaNock: {
    type: Object,
    required: true,
  },
});

export default mongoose.model<IVariaveisDeAmbiente>("VariaveisDeAmbiente", VariaveisDeAmbienteSchema, "variaveisDeAmbiente");

