import { Types } from "mongoose";
import {
  ERRO_NEGOCIAL_NA_VALIDACAO,
} from "../errors/erro.negocial";
import {
  ErroSQL,
  ERRO_SQL_AO_SALVAR_PASSAGEIRO, ERRO_SQL_AO_BUSCAR_DADOS_DA_VIAGEM_COM_O_USUARIO,
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

    public async detalhamentoViagem(body: IInputDetalhamentoViagem): Promise<any> {
      logger.debug("Entrando no método 'detalhamentoViagem'...");

      const resultadoValidacao = this.serviceValidator.validarDetalhamentoViagem(body);
      retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);
      logger.debug("Finalizando o 'resultadoValidacao'...");

      logger.debug("Entrando no método 'retornarDadosUsuario'...");
      const usuario = await UsuarioService.retornarDadosUsuario(body.idUsuario);
      logger.debug("Finalizando o 'retornarDadosUsuario'...");

      console.log("usuario", usuario);

      // logger.debug("Entrando no método 'buscarViagem'...");
      // const viagem: IViagem = await ViagemService.buscarViagem(body.idViagem);
      // logger.debug("Finalizando o 'buscarViagem'...");
      //
      // console.log("viagem", viagem);

      logger.debug("Entrando no método 'retornarDadosVinculoViagem'...");
      const passageiro: IPassageiro = await this.retornarDadosVinculoViagem(body);
      logger.debug("Finalizando o 'retornarDadosVinculoViagem'...");

      console.log("passageiro", passageiro);

      // throw new ErroSQL(...ERRO_SQL_EMAIL_INFORMADO_DO_USUARIO_NAO_ENCONTRADO);
    }

    public async retornarDadosVinculoViagem(body: IInputDetalhamentoViagem): Promise<IPassageiro> {
      try {
        logger.info(`Realizando consulta para pegar dados de vinculo dos passageiros com a viagem: ${body.idUsuario}...`);

        const passageiro = await Passageiro.findOne({
          idUsuario: new Types.ObjectId(body.idUsuario),
          idViagem: new Types.ObjectId(body.idViagem),
          // tsCriacao: new Date(body.dataRefencia),
        });

        if (passageiro) return passageiro;

        logger.debug(`Não foi encontrado a viagem: '${body.idViagem}', vinculada ao seguinte usuário: '${body.idUsuario}', na base de dados...`);
        throw new ErroSQL(...ERRO_SQL_AO_BUSCAR_DADOS_DA_VIAGEM_COM_O_USUARIO);
      } catch (error) {
        logger.error(`
        ERRO no MS "${environment.app.name}", método "retornarDadosVinculoViagem".
        <'ERRO NEGOCIAL'>
          message:  Não foi possível encontrar os dados, na base de dados...
        Parâmetros da requisição:
          ID USUÁRIO: ${body.idUsuario},
          ID VIAGEM: ${body.idViagem},
          DATA REFERÊNCIA: ${body.dataRefencia},
      `);

        throw new ErroSQL(...ERRO_SQL_AO_BUSCAR_DADOS_DA_VIAGEM_COM_O_USUARIO);
      }
    }
}
