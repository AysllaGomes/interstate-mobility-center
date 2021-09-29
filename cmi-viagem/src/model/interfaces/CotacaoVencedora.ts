export interface ICotacaoVencedora {
    parceiro: string;
    idUsuarioParceiro: any;
    produto: string;
    objIdParceiro: any;
    valor: number;
    tempoEspera: number;
    premium: boolean;
    icone: string;
    tsCriacao: Date;
    valorEconomizado: number;
}
