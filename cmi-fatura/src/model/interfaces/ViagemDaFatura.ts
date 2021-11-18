import { IDadosEfetivo } from "./DadosEfetivos";
import { ICotacaoVencedoraViagem } from "./CotacaoVencedoraViagem";
import { IDadosFaturamentoViagem } from "./DadosFaturamentoViagem";

export interface IViagemDaFatura {
    _id: string;
    statusViagem: string;
    dadosEfetivo: IDadosEfetivo;
    cotacaoVencedora: ICotacaoVencedoraViagem;
    dadosDeFaturamento?: IDadosFaturamentoViagem;
    tsCriacao: Date;
}
