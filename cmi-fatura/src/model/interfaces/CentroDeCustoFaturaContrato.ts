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
 *       - numeroDeIdentificacaoDoCentroDeCusto_@CMU
 *       - numeroNotaDebito
 *       - estadoNotaDebito
 *       - finalidadeNotaDebito
 *       - valorFaturadoDoCentroDeCusto
 *       - viagens
 *     properties:
 *        numeroDeIdentificacaoDoCentroDeCusto_@CMU:
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
 *              nomeParceiro: Wappa,
 *              idContratoMobilidade_@CMU: 609194210562734c162a76c1,
 *              numeroDeIdentificacaoContratoMobilidade_@CMU: 3,
 *              nomeCliente_@MCI: Wappa
 *          }
 */
export interface ICentroDeCustoFaturaContrato {
    "numeroDeIdentificacaoDoCentroDeCusto_@CMU": number;
    numeroNotaDebito: number;
    estadoNotaDebito: EstadoNotaDebitoEnum;
    finalidadeNotaDebito: FinalidadeNotaDebitoEnum;
    valorFaturadoDoCentroDeCusto: number;
    viagens: Array<IViagemCentroDeCustoFaturaContrato>
}
