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
 *       - viagemCancelada
 *       - usuarioLogado
 *       - listarPassageiros
 *       - quantidadePassageiro
 *       - dataInicio
 *       - dataFim
 *       - dataRefenciaSolicitacao
 *     properties:
 *       imagem:
 *         type: string
 *       preco:
 *         type: number
 *       destino:
 *         type: string
 *       viagemCancelada:
 *         type: string
 *       usuarioLogado:
 *         type: string
 *       listarPassageiros:
 *         type: string
 *       quantidadePassageiro:
 *         type: number
 *       dataInicio:
 *         type: string
 *       dataFim:
 *         type: string
 *       dataRefenciaSolicitacao:
 *         type: string
 *     example:
 *      {
 *          "imagem": "https://firebasestorage.googleapis.com/v0/b/tcc-react-9a14e.appspot.com/o/imgs-tcc-project%2Fbrasilia.jpeg?alt=media&token=b20d2065-9268-4d0f-a8fa-68752d624511",
 *          "preco": 2000,
 *          "destino": "Encerrado",
 *          "viagemCancelada": "Sim",
 *          "usuarioLogado": "Não",
 *          "listarPassageiros": [],
 *          "dataInicio": "11/10/2022",
 *          "dataFim": "31/10/2022",
 *          "dataRefenciaSolicitacao": 17/06/2022
 *      }
 */
export interface IOutputDetalharViagem {
    imagem: string;
    preco: number;
    destino: string;
    viagemCancelada: string;
    usuarioLogado: string;
    listarPassageiros: string[];
    quantidadePassageiro: number;
    dataInicio: string;
    dataFim: string;
    dataRefenciaSolicitacao: string;
}
