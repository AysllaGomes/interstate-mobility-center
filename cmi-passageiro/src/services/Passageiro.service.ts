import { Types } from "mongoose";
import moment from "moment";
import {
  ERRO_NEGOCIAL_NA_VALIDACAO,
} from "../errors/erro.negocial";
import {
  ErroSQL,
  ERRO_SQL_AO_BUSCAR_PASSAGEIRO,
  ERRO_SQL_AO_SALVAR_PASSAGEIRO,
  ERRO_SQL_AO_BUSCAR_DADOS_DA_VIAGEM_COM_O_USUARIO,
  ERRO_SQL_DESABILITAR_OS_DADOS_DO_PASSAGEIRO_DA_VIAGEM,
} from "../errors/erro.sql";
import { logger } from "../util/logger";
import { IViagem } from "../model/Viagem";
import { ViagemService } from "./Viagem.service";
import { UsuarioService } from "./Usuario.service";
import { environment } from "../config/environment";
import { retornarErroValidacao } from "../util/utils";
import Passageiro, { IPassageiro } from "../model/Passageiro";
import { ServiceValidator } from "../validators/Service.validator";
import { EstadoViagemEnum } from "../model/enums/EstadoViagem.enum";
import { IVinculoPassageiro } from "../model/interfaces/VinculoPassageiro";
import { IInputDesativarViagem } from "../model/interfaces/InputDesativarViagem";
import { IOutputDetalharViagem } from "../model/interfaces/OutputDetalharViagem";
import { IOutputDesativarViagem } from "../model/interfaces/OutputDesativarViagem";
import { IInputListarViagensVincularAoUsario } from "../model/interfaces/InputListarViagensVincularAoUsario";
import { IOutputListarViagensVinculadasAoUsario } from "../model/interfaces/OutputListarViagensVinculadasAoUsario";

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
      // const arrayPassageiro: Array<IListaPassageiros> = [];

      const objPassageiro = {
        idUsuario: new Types.ObjectId(body.idUsuario),
        idViagem: new Types.ObjectId(body.idViagem),
        usuarioPassageiro: body.usuarioPassageiro,
        listaPassageiro: [],
        viagemCancelada: false,
        estado: EstadoViagemEnum.VIGENTE,
        dadosPagamento: body.dadosPagamento,
        dataCriacao: moment(new Date()).format("DD/MM/YYYY"),
        dataUltimaAtualizacao: moment(new Date()),
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

    public async listarViagensVinculadoAoUsuario(body: IInputListarViagensVincularAoUsario): Promise<Array<IOutputListarViagensVinculadasAoUsario>> {
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
            // eslint-disable-next-line no-underscore-dangle
            idUsuario: viagem._id,
            // eslint-disable-next-line no-underscore-dangle
            idPassageiro: passageiro._id,
            dataReferencia: passageiro.dataCriacao,
            destino: viagem.estadoDestino,
            preco: viagem.preco,
          };
        }),
      );
    }

    public async retornarDadosVinculoPassageiroEViagem(body: IInputListarViagensVincularAoUsario): Promise<Array<IPassageiro>> {
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

    public async detalharViagem(body: IInputDesativarViagem): Promise<IOutputDetalharViagem> {
      logger.debug("Entrando no método 'detalharViagem'...");

      const resultadoValidacao = this.serviceValidator.validarDetalharViagem(body);
      retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);
      logger.debug("Finalizando o 'resultadoValidacao'...");

      logger.debug("Entrando no método 'verificarExitenciaPassageiro'...");
      const passageiro = await this.verificarExitenciaPassageiro(body);

      logger.debug("Entrando no método 'retornaDadosViagem'...");
      const viagem: IViagem = await ViagemService.retornaDadosViagem(passageiro.idViagem);
      logger.debug("Finalizando o 'retornaDadosViagem'...");

      logger.debug("Entrando no método 'formatarRetornoDetalharViagem'...");
      return this.formatarRetornoDetalharViagem(passageiro, viagem);
    }

    public formatarRetornoDetalharViagem(passageiro: IPassageiro, viagem: IViagem): IOutputDetalharViagem {
      return {
        preco: viagem.preco,
        destino: viagem.estadoDestino,
        dataRefencia: passageiro.dataCriacao,
      };
    }

    public async desativar(body: IInputDesativarViagem): Promise<IOutputDesativarViagem> {
      logger.debug("Entrando no método 'desativar'...");

      const resultadoValidacao = this.serviceValidator.validarDesativarViagem(body);
      retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);
      logger.debug("Finalizando o 'resultadoValidacao'...");

      logger.debug("Entrando no método 'verificarExitenciaPassageiro'...");
      await this.verificarExitenciaPassageiro(body);
      logger.debug("Finalizando o 'verificarExitenciaPassageiro'...");

      logger.debug("Entrando no método 'desativarViagemVinculadoAoPassageiro'...");
      return this.desativarViagemVinculadoAoPassageiro(body);
    }

    public async verificarExitenciaPassageiro(body: IInputDesativarViagem): Promise<IPassageiro> {
      try {
        logger.info(`Verificando a exitência do passageiro '${body.idPassageiro}', na base de dados...`);

        const passageiro: IPassageiro | null = await Passageiro.findOne(
          {
            _id: body.idPassageiro,
          },
        );

        if (passageiro) { return passageiro; }

        throw new ErroSQL(...ERRO_SQL_AO_BUSCAR_PASSAGEIRO);
      } catch (error) {
        logger.error(`
          ERRO no MS "${environment.app.name}", método "verificarExitenciaPassageiro".
          <'ERRO NEGOCIAL'>
            message:  Não foi possível encontrar o passageiro, na base de dados...
          Parâmetros da requisição:
            ID: ${body.idPassageiro},
        `);

        throw new ErroSQL(...ERRO_SQL_AO_BUSCAR_PASSAGEIRO);
      }
    }

    public async desativarViagemVinculadoAoPassageiro(body: IInputDesativarViagem): Promise<IOutputDesativarViagem> {
      try {
        logger.info(`Desativando a viagem do passageiro: ${body.idPassageiro}...`);

        const desativar: IPassageiro | null = await Passageiro.findOneAndUpdate(
          {
            _id: body.idPassageiro,
          },
          {
            estado: EstadoViagemEnum.SUSPENSO,
            viagemCancelada: true,
            dataUltimaAtualizacao: moment(new Date()),
          },
          { upsert: true },
          (error, passageiro: IPassageiro | null) => passageiro,
        ).clone();

        if (desativar) { return this.formatarRetornoDesativarViagemVinculadoAoPassageiro(desativar); }

        throw new ErroSQL(...ERRO_SQL_DESABILITAR_OS_DADOS_DO_PASSAGEIRO_DA_VIAGEM);
      } catch (error) {
        logger.error(`
          ERRO no MS "${environment.app.name}", método "desativarViagemVinculadoAoPassageiro".
          <'ERRO NEGOCIAL'>
            message:  Não foi possível desativar a viagem vinculada ao passageiro os dados, na base de dados...
          Parâmetros da requisição:
            ID: ${body.idPassageiro},
        `);

        throw new ErroSQL(...ERRO_SQL_DESABILITAR_OS_DADOS_DO_PASSAGEIRO_DA_VIAGEM);
      }
    }

    public formatarRetornoDesativarViagemVinculadoAoPassageiro(passageiro: IPassageiro): IOutputDesativarViagem {
      return {
        // eslint-disable-next-line no-underscore-dangle
        id: passageiro._id,
        estado: passageiro.estado,
        viagemCancelada: passageiro.viagemCancelada,
        dataUltimaAtualizacao: passageiro.dataUltimaAtualizacao,
      };
    }
}
