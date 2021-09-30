export interface IRealizaCotacao {
    idUsuario: string;
    latitudePosicao?: number;
    longitudePosicao?: number;
    latitudeOrigem: number;
    longitudeOrigem: number;
    latitudeDestino: number;
    longitudeDestino: number;
    tituloOrigemViagem: string;
    tituloDestinoViagem: string;
}
