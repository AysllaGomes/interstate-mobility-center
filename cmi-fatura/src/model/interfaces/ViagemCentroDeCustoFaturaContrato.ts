/**
 * @swagger
 *
 * definitions:
 *   IViagemCentroDeCustoFaturaContrato:
 *     type: object
 *     required:
 *       - idViagem
 *       - nomePassageiro
 *       - cpfCnpj
 *       - nomeParceiro
 *       - iconeParceiro
 *       - valorViagem
 *       - dataViagem
 *     properties:
 *        idViagem:
 *           type: string
 *        nomePassageiro:
 *           type: string
 *        cpfCnpj:
 *           type: string
 *        nomeParceiro:
 *           type: string
 *        iconeParceiro:
 *           type: string
 *        valorViagem:
 *           type: number
 *        dataViagem:
 *           type: string
 *           format: "date-time"
 *     example:
 *          {
 *              idViagem: 60c8d8855c11ec345ba919ff,
 *              nomePassageiro: Ana Maria Abras da Fonseca,
 *              cpfCnpj: 01943847053,
 *              nomeParceiro : noveNovePop,
 *              iconeParceiro : https://img.ibxk.com.br/2018/9/programas/15870025155352397.png,
 *              valorViagem : 10.1,
 *              dataViagem" : 2021-06-12T17:33:20.301Z
 *          }
 */
export interface IViagemCentroDeCustoFaturaContrato {
    idViagem: string;
    nomePassageiro: string;
    cpfCnpj: string;
    nomeParceiro: string;
    iconeParceiro: string;
    valorViagem: number;
    dataViagem: Date;
}
