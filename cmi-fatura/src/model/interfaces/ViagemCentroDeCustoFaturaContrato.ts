/**
 * @swagger
 *
 * definitions:
 *   IViagemCentroDeCustoFaturaContrato:
 *     type: object
 *     required:
 *       - idViagem
 *       - nomePassageiro
 *       - cpf
 *       - nomeParceiro
 *       - iconeParceiro
 *       - valorViagem
 *       - dataViagem
 *     properties:
 *        idViagem:
 *           type: string
 *        nomePassageiro:
 *           type: string
 *        cpf:
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
 *              nomePassageiro: Steph Gingrich,
 *              cpf: 02373315009,
 *              nomeParceiro : Nock,
 *              iconeParceiro : https://avatars.githubusercontent.com/u/17545810?s=280&v=4,
 *              valorViagem : 10.1,
 *              dataViagem" : 2021-11-10T17:33:20.301Z
 *          }
 */
export interface IViagemCentroDeCustoFaturaContrato {
    idViagem: string;
    nomePassageiro: string;
    cpf: string;
    nomeParceiro: string;
    iconeParceiro: string;
    valorViagem: number;
    dataViagem: Date;
}
