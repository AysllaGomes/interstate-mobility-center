import { IDadosCobranca } from "./DadosCobranca";
import { EstadoCentroDeCustoEnum } from "../enums/EstadoCentroDeCusto.enum";

/**
 * @swagger
 *
 * definitions:
 *   IAberturaContratoCentroDeCusto:
 *     type: object
 *     required:
 *       - numeroDeIdentificacao
 *       - nome
 *       - descricao
 *       - orcamento
 *       - estado
 *       - dadosCobranca
 *     properties:
 *       numeroDeIdentificacao:
 *         type: number
 *       nome:
 *         type: string
 *       descricao:
 *         type: string
 *       orcamento:
 *         $ref: '#/definitions/OrcamentoCentroDeCusto'
 *       estado:
 *         type: string
 *         enum:
 *          - Vigente
 *          - Encerrado
 *       dadosCobranca:
 *         $ref: '#/definitions/IDadosCobranca'
 *     example:
 *      [
 *        {
 *            numeroIdentificacaoCentroCusto: 111,
 *            nome: "Nome de uma Matriz",
 *            descricao: "Descrição de uma Matriz muito incrível e de reputação excelente.",
 *            estado: "Vigente",
 *            dadosCobranca: {
 *                agencia: 4444,
 *                contaCorrente: 55555
 *            }
 *        }
 *      ]
 */
export interface IAberturaContratoCentroDeCusto {
  numeroIdentificacaoCentroCusto: number;
  nome: string;
  descricao: string;
  estado: EstadoCentroDeCustoEnum;
  dadosCobranca: IDadosCobranca;
}
