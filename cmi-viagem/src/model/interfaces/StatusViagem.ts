import { IAtualizacaoStatus } from "./AtualizacaoStatus";
import { StatusViagemEnum } from "../enums/StatusViagem.enum";

export interface IStatusViagem {
    statusViagem: StatusViagemEnum;
    coordenadasTrajeto?: [number, number];
    dtCriacao: Date;
    atualizacaoStatus?: Array<IAtualizacaoStatus>;
}
