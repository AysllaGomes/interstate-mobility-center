export interface TermoDeUsoInterface {
    _id?: string;
    versao: number;
    conteudo: string;
    criticidade: string;
    tsDeInicioVigencia: Date;
    tsDeExpiracaoVigencia?: Date;
}
