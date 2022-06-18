import { IPeriodoDeVigencia } from "./PeriodoDeVigencia";

/**
 * @swagger
 *
 * definitions:
 *   IOutputDetalharViagem:
 *     type: object
 *     required:
 *       - imagem
 *       - preco
 *       - destino
 *       - usuarioLogado
 *       - listarPassageiros
 *       - quantidadePassageiro
 *       - periodoReferenciaViagem
 *       - dataRefenciaSolicitacao
 *     properties:
 *       imagem:
 *         type: string
 *       preco:
 *         type: number
 *       destino:
 *         type: string
 *       usuarioLogado:
 *         type: string
 *       listarPassageiros:
 *         type: string
 *       quantidadePassageiro:
 *         type: number
 *       periodoReferenciaViagem:
 *         $ref: '#/definitions/IPeriodoDeVigencia'
 *       dataRefenciaSolicitacao:
 *         type: string
 *     example:
 *      {
 *          "imagem": "https://firebasestorage.googleapis.com/v0/b/tcc-react-9a14e.appspot.com/o/imgs-tcc-project%2Fbrasilia.jpeg?alt=media&token=b20d2065-9268-4d0f-a8fa-68752d624511",
 *          "preco": 2000,
 *          "destino": "Encerrado",
 *          "usuarioLogado": "Some Chick",
 *          "listarPassageiros": [],
 *          "periodoReferenciaViagem": {
 *              "dataInicio": "2022-10-11T06:30:20.202Z",
 *              "dataFim": "2022-10-31T06:50:20.202Z"
 *          },
 *          "dataRefenciaSolicitacao": 17/06/2022
 *      }
 */
export interface IOutputDetalharViagem {
    imagem: string;
    preco: number;
    destino: string;
    usuarioLogado: string;
    listarPassageiros: string[];
    quantidadePassageiro: number;
    periodoReferenciaViagem: IPeriodoDeVigencia;
    dataRefenciaSolicitacao: string;
}
