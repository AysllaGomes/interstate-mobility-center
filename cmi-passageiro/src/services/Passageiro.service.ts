import { Types } from "mongoose";
import {
  ErroSQL,
  ERRO_SQL_AO_SALVAR_PASSAGEIRO,
} from "../errors/erro.sql";
import {
  ERRO_NEGOCIAL_NA_VALIDACAO,
} from "../errors/erro.negocial";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import { retornarErroValidacao } from "../util/utils";
import Passageiro, { IPassageiro } from "../model/Passageiro";
import { ServiceValidator } from "../validators/Service.validator";
import { IListaPassageiros } from "../model/interfaces/ListaPassageiros";
import { IVinculoPassageiro } from "../model/interfaces/VinculoPassageiro";

export class PassageiroService {
    private serviceValidator = new ServiceValidator();

    public async vinculoPassageiro(body: IVinculoPassageiro): Promise<any> {
      logger.debug("Entrando no método 'vinculoPassageiro'...");

      const resultadoValidacao = this.serviceValidator.validarVinculoPassageiro(body);
      retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);

      logger.debug("Finalizando o 'resultadoValidacao'...");

      const vinculoPassageiro = this.formatarPassageiro(body);

      return this.salvarPassageiro(vinculoPassageiro);
    }

    public formatarPassageiro(body: IVinculoPassageiro): any {
      const arrayPassageiro: Array<IListaPassageiros> = [];

      const objPassageiro = {
        idUsuario: new Types.ObjectId(body.idUsuario),
        idViagem: new Types.ObjectId(body.idViagem),
        usuarioPassageiro: body.usuarioPassageiro,
        listaPassageiro: [],
        dadosPagamento: body.dadosPagamento,
        tsCriacao: new Date(),
      };

      console.log("objPassageiro", objPassageiro);

      return objPassageiro;

      //  listaPassageiro: [
      //    {
      //      nome: dados.nome,
      //      cpf: dados.cpf,
      //      dataDeNascimento: dados.dataDeNascimento,
      //      numeroTelefoneCelular: dados.numeroTelefoneCelular,
      //    },
      //  ],

      // if (body.listaPassageiro.length > 0) {
      //   // const ultimoPassageiroDoArray: IPassageiro = body.listaPassageiro[body.listaPassageiro.length - 1];
      //
      //   arrayPassageiro.push(
      //     ...body.listaPassageiro,
      //       objPassageiro,
      //   );
      //
      //   console.log("arrayPassageiro", arrayPassageiro);
      //
      //   const teste = body.listaPassageiro.map((dados: IListaPassageiros) => ({
      //     idUsuario: body.idUsuario,
      //     idViagem: body.idViagem,
      //     usuarioPassageiro: body.usuarioPassageiro,
      //     dadosPagamento: body.dadosPagamento,
      //     tsCriacao: new Date(),
      //   }));
      //
      //   console.log("teste", teste);
      //
      //   return teste;
      // }
    }

    public async salvarPassageiro(passageiro: IPassageiro): Promise<IPassageiro> {
      try {
        console.log("passageiro", passageiro);

        logger.debug("Salvando passageiro...");
        return new Passageiro(passageiro).save();
      } catch (error) {
        logger.error(`
        ERRO no MS "${environment.app.name}", método "salvarPassageiro".
        <'ERRO NEGOCIAL'>
          message:  Não foi possível salvar o usuário, na base de dados...
        Parâmetros da requisição:
          ID USUÁRIO: ${passageiro.idUsuario},
          ID VIAGEM: ${passageiro.idViagem},
      `);

        throw new ErroSQL(...ERRO_SQL_AO_SALVAR_PASSAGEIRO);
      }
    }
}
