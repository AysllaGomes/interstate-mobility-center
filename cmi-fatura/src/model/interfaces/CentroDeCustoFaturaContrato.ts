import { EstadoNotaDebitoEnum } from "../enums/EstadoNotaDebito.enum";
import { FinalidadeNotaDebitoEnum } from "../enums/FinalidadeNotaDebito.enum";
import { IViagemCentroDeCustoFaturaContrato } from "./ViagemCentroDeCustoFaturaContrato";

/**
 * @swagger
 *
 * definitions:
 *   ICentroDeCustoFaturaContrato:
 *     type: object
 *     required:
 *       - numeroDeIdentificacaoDoCentroDeCusto
 *       - numeroNotaDebito
 *       - estadoNotaDebito
 *       - finalidadeNotaDebito
 *       - valorFaturadoDoCentroDeCusto
 *       - viagens
 *     properties:
 *        numeroDeIdentificacaoDoCentroDeCusto:
 *           type: number
 *        numeroNotaDebito:
 *           type: number
 *        estadoNotaDebito:
 *           type: string
 *           enum:
 *           - Em Aberto
 *           - Pago
 *        finalidadeNotaDebito:
 *           type: string
 *           enum:
 *           - Despesas com serviços de transporte individual de passageiros
 *        valorFaturadoDoCentroDeCusto:
 *           type: number
 *        viagens:
 *           $ref: '#/definitions/IViagemCentroDeCustoFaturaContrato'
 *     example:
 *          {
 *              numeroIdentificacaoContrato: 3,
 *              nomeParceiro: Nock,
 *              idContratoMobilidade: 615275cfae51bb002ea736d2,
 *              numeroDeIdentificacaoContratoMobilidade: 3,
 *              nomeCliente: Nock
 *          }
 */
export interface ICentroDeCustoFaturaContrato {
    numeroDeIdentificacaoDoCentroDeCusto: number;
    numeroNotaDebito: number;
    estadoNotaDebito: EstadoNotaDebitoEnum;
    finalidadeNotaDebito: FinalidadeNotaDebitoEnum;
    valorFaturadoDoCentroDeCusto: number;
    viagens: Array<IViagemCentroDeCustoFaturaContrato>
}
