import { IListaPassageiros } from "./ListaPassageiros";
import { IDadosPagamento } from "./DadosPagamento";

// /**
//  * @swagger
//  *
//  * definitions:
//  *   IVinculoPassageiro:
//  *     type: object
//  *     required:
//  *       - idUsuario
//  *       - idViagem
//  *       - usuarioPassageiro
//  *       - listaPassageiros
//  *       - dadosPagamento
//  *     properties:
//  *       idUsuario:
//  *         type: string
//  *       idViagem:
//  *         type: string
//  *       usuarioPassageiro:
//  *         type: string
//  *       listaPassageiros:
//  *         type: string
//  *       dadosPagamento:
//  *         type: string
//  *     example:
//  *      {
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         numeroTelefoneCelular: "99999999999",
//  *         usuarioPassageiro: false
//  *      }
//  */
export interface IVinculoPassageiro {
    idUsuario: string;
    idViagem: string;
    usuarioPassageiro: boolean;
    listaPassageiro: Array<IListaPassageiros>;
    dadosPagamento: IDadosPagamento;
}
