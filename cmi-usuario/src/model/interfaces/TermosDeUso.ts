import { ICoordenadas } from "./Coordenadas";
import { IDadosDoDispositivo } from "./DadosDoDispositivo";

export interface ITermosDeUso {
  "idTermoDeUso_@CMU": string;
  "tsDataDeAceite": Date;
  dadosDispositivo: IDadosDoDispositivo;
  coordenadasUsuario: ICoordenadas;
}
