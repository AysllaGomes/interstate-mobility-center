import { StatusViagemEnum } from "../enums/StatusViagem.enum";

export interface IStatusViagemParceiro {
  statusViagem: StatusViagemEnum;
  origemViagem?: Array<number>;
  destinoViagem?: Array<number>;
}

