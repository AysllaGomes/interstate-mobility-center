import { ICoordenadas } from "./Coordenadas";
import { IStatusViagem } from "./StatusViagem";
import { IDadosEfetivo } from "./DadosEfetivo";
import { IAvaliacaoViagem } from "./AvaliacaoViagem";
import { ICotacaoVencedora } from "./CotacaoVencedora";
import { IDadosDeFaturamento } from "./DadosDeFaturamento";

export interface IInterfaceViagem {
    _id: string;
    idUsuario: string;
    coordenadas: ICoordenadas;
    cotacaoVencedora: ICotacaoVencedora;
    parceirosCotados: object;
    idViagemNoParceiro?: string | number,
    dadosEfetivo?: IDadosEfetivo,
    dadosDeFaturamento?: IDadosDeFaturamento,
    statusViagem: Array<IStatusViagem>;
    avaliacaoViagem?: IAvaliacaoViagem;
    tsCriacao: Date;
}
