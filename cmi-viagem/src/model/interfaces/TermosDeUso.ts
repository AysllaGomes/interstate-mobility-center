import { IDadosDoDispositivo } from "./DadosDoDispositivo";
import { ICoordenadasTermoDeUso } from "./CoordenadasTermoDeUso";

export interface ITermosDeUso {
  "idTermoDeUso": string;
  "tsDataDeAceite": Date;
  dadosDispositivo: IDadosDoDispositivo;
  coordenadasUsuario: ICoordenadasTermoDeUso;
}
