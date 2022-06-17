import { Types } from "mongoose";
import moment from "moment";
import {
  ERRO_NEGOCIAL_NA_VALIDACAO,
} from "../errors/erro.negocial";
import {
  ErroSQL,
  ERRO_SQL_AO_SALVAR_PASSAGEIRO,
  ERRO_SQL_AO_BUSCAR_DADOS_DA_VIAGEM_COM_O_USUARIO,
} from "../errors/erro.sql";
import { logger } from "../util/logger";
import { IViagem } from "../model/Viagem";
import { ViagemService } from "./Viagem.service";
import { UsuarioService } from "./Usuario.service";
import { environment } from "../config/environment";
import { retornarErroValidacao } from "../util/utils";
import Passageiro, { IPassageiro } from "../model/Passageiro";
import { ServiceValidator } from "../validators/Service.validator";
import { IListaPassageiros } from "../model/interfaces/ListaPassageiros";
import { IVinculoPassageiro } from "../model/interfaces/VinculoPassageiro";
import { IInputDetalhamentoViagem } from "../model/interfaces/InputDetalhamentoViagem";

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
        viagemCancelada: false,
        dadosPagamento: body.dadosPagamento,
        tsCriacao: moment(new Date()).format("DD/MM/YYYY"),
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

    public async listarViagensVinculadoAoUsuario(body: IInputDetalhamentoViagem): Promise<any> {
      logger.debug("Entrando no método 'listarViagensVinculadoAoUsuario'...");

      const resultadoValidacao = this.serviceValidator.validarDetalhamentoViagem(body);
      retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);
      logger.debug("Finalizando o 'resultadoValidacao'...");

      logger.debug("Entrando no método 'retornarDadosUsuario'...");
      await UsuarioService.retornarDadosUsuario(body.idUsuario);
      logger.debug("Finalizando o 'retornarDadosUsuario'...");

      logger.debug("Entrando no método 'retornarDadosVinculoPassageiroEViagem'...");
      const vinculoDadosPassageirosEViagem: Array<IPassageiro> = await this.retornarDadosVinculoPassageiroEViagem(body);
      logger.debug("Finalizando o 'retornarDadosVinculoPassageiroEViagem'...");

      return Promise.all(
        vinculoDadosPassageirosEViagem.map(async (passageiro) => {
          logger.debug("Entrando no método 'retornaDadosViagem'...");
          const viagem: IViagem = await ViagemService.retornaDadosViagem(passageiro.idViagem);
          logger.debug("Finalizando o 'retornaDadosViagem'...");

          return {
            dataReferencia: passageiro.tsCriacao,
            destino: viagem.estadoDestino,
            preco: viagem.preco,
          };
        }),
      );
    }

    public async retornarDadosVinculoPassageiroEViagem(body: IInputDetalhamentoViagem): Promise<Array<IPassageiro>> {
      try {
        logger.info(`Realizando consulta para pegar dados de vinculo dos passageiros: ${body.idUsuario}...`);

        const passageiro: Array<IPassageiro> | null = await Passageiro.find({
          idUsuario: new Types.ObjectId(body.idUsuario),
        });

        if (passageiro) return passageiro;

        logger.debug(`Não foi encontrado o vinculo ao seguinte usuário: '${body.idUsuario}', na base de dados...`);
        throw new ErroSQL(...ERRO_SQL_AO_BUSCAR_DADOS_DA_VIAGEM_COM_O_USUARIO);
      } catch (error) {
        logger.error(`
          ERRO no MS "${environment.app.name}", método "retornarDadosVinculoViagem".
          <'ERRO NEGOCIAL'>
            message:  Não foi possível encontrar os dados, na base de dados...
          Parâmetros da requisição:
            ID USUÁRIO: ${body.idUsuario},
        `);

        throw new ErroSQL(...ERRO_SQL_AO_BUSCAR_DADOS_DA_VIAGEM_COM_O_USUARIO);
      }
    }
}
