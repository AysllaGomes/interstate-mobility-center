import { EstadoTermoDeUsoEnum } from "./enums/EstadoTermoDeUso.enum";

export interface ITermoDeUso {
    _id: string;
    versao: number;
    conteudo: string;
    criticidade: string;
    estadoTermoDeUso: EstadoTermoDeUsoEnum;
    tsDeInicioVigencia: Date;
    tsDeExpiracaoVigencia?: Date;
}
