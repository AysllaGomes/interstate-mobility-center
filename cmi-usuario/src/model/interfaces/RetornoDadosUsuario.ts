import { ITermosDeUso } from "./TermosDeUso";

export interface IRetornoDadosUsuario {

    id: string;
    nome: string;
    email: string;
    numeroTelefoneCelular: string;
    termosDeUso?: ITermosDeUso[];
}
