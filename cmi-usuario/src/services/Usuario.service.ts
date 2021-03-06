import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_NA_VALIDACAO,
  ERRO_NEGOCIAL_CPF_REPETIDO,
  ERRO_NEGOCIAL_EMAIL_REPETIDO,
  ERRO_NEGOCIAL_REGISTRO_REPETIDO,
} from "../errors/erro.negocial";
import {
  ErroSQL,
  ERRO_SQL_AO_SALVAR_USUARIO,
  ERRO_SQL_BUSCA_DADOS_USUARIO,
  ERRO_AO_ATUALIZAR_TERMO_DE_USO_USUARIO,
  ERRO_AO_ATUALIZAR_DADOS_DE_PAGAMENTO_USUARIO,
  ERRO_SQL_EMAIL_INFORMADO_DO_USUARIO_NAO_ENCONTRADO,
} from "../errors/erro.sql";
import { ITermoDeUso } from "../model/TermoDeUso";
import { retornarErroValidacao } from "../util/utils";
import { TermoDeUsoService } from "./TermoDeUso.service";
import UsuarioModel, { IUsuario } from "../model/Usuario";
import { ICoordenadas } from "../model/interfaces/Coordenadas";
import { ITermosDeUso } from "../model/interfaces/TermosDeUso";
import { ServiceValidator } from "../validators/Service.validator";
import { ICadastroUsuario } from "../model/interfaces/CadastroUsuario";
import { IDetalharUsuario } from "../model/interfaces/DetalharUsuario";
import { IDadosDoPagamento } from "../model/interfaces/DadosPagamento";
import { IInputTermoDeUsoApi } from "../model/interfaces/InputTermoDeUsoApi";
import { IDadosDoDispositivo } from "../model/interfaces/DadosDoDispositivo";
import { IRetornoUpdateUsuarioModel } from "../model/interfaces/RetornoUpdateUsuarioModel";
import { IUsuarioAssinaturaTermoDeUso } from "../model/interfaces/UsuarioAssinaturaTermoDeUso";
import { IRetornoPassageiroAssinaturaTermoDeUso } from "../model/interfaces/RetornoPassageiroAssinaturaTermoDeUso";

export class UsuarioService {
  private serviceValidator = new ServiceValidator();

  public async cadastrarUsuario(body: ICadastroUsuario): Promise<IUsuario> {
    const resultadoValidacao = this.serviceValidator.validaCadastroUsuario(body);
    retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);

    const resultadoRepeticoes = await UsuarioService.existeRepeticoesProibidas(body);

    if (!resultadoRepeticoes) {
      const usuario = this.formataUsuario(body);
      return this.salvarUsuario(usuario);
    }

    throw new ErroNegocial(...ERRO_NEGOCIAL_REGISTRO_REPETIDO);
  }

  public static async existeRepeticoesProibidas(passageiroCadastro: ICadastroUsuario): Promise<boolean> {
    const emailCadastrado = await UsuarioService.emailCadastrado(passageiroCadastro.email);
    if (emailCadastrado) {
      throw new ErroNegocial(...ERRO_NEGOCIAL_EMAIL_REPETIDO);
    }

    const cpfCadastrado = await UsuarioService.cpfCadastrado(passageiroCadastro.cpf);
    if (cpfCadastrado) {
      throw new ErroNegocial(...ERRO_NEGOCIAL_CPF_REPETIDO);
    }

    return false;
  }

  public static async emailCadastrado(email: string): Promise<boolean> {
    const usuarioModel = await UsuarioModel.find({ email });
    return usuarioModel.length !== 0;
  }

  public static async cpfCadastrado(cpf: string): Promise<boolean> {
    const usuarioModel = await UsuarioModel.find({ cpf });
    return usuarioModel.length !== 0;
  }

  public formataUsuario(body: ICadastroUsuario): IUsuario {
    return new UsuarioModel({
      cpf: body.cpf,
      nome: body.nome,
      email: body.email,
      dataDeNascimento: body.dataDeNascimento,
      numeroTelefoneCelular: body.numeroTelefoneCelular,
      tsCriacao: new Date(),
    });
  }

  public async salvarUsuario(usuario: IUsuario): Promise<IUsuario> {
    try {
      logger.debug("Salvando usu??rio...");
      return new UsuarioModel(usuario).save();
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", m??todo "salvarUsuario".
        <'ERRO NEGOCIAL'>
          message:  N??o foi poss??vel salvar o usu??rio, na base de dados...
        Par??metros da requisi????o:
          NOME: ${usuario.nome},
          E-MAIL: ${usuario.email},
          DATA DE NASCIMENTO: ${usuario.dataDeNascimento},
          CELULAR: ${usuario.numeroTelefoneCelular},
      `);

      throw new ErroSQL(...ERRO_SQL_AO_SALVAR_USUARIO);
    }
  }

  public async detalharUsuario(body: IDetalharUsuario): Promise<IUsuario | ErroSQL> {
    try {
      const resultadoValidacao = this.serviceValidator.validaDetalharUsuario(body);
      retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);

      logger.debug(`Buscando dados do usu??rio do seguinte e-mail: '${body.email}'`);
      const usuario: IUsuario | null = await UsuarioModel.findOne({ email: body.email });

      if (usuario) { return usuario; }

      throw new ErroSQL(...ERRO_SQL_EMAIL_INFORMADO_DO_USUARIO_NAO_ENCONTRADO);
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", m??todo "detalharUsuario".
        <'ERRO'>
          message: N??o encontrado nenhum usu??rio com o seguinte e-mail: ${body.email}, na base de dados...
        Par??metros da requisi????o:
          E-MAIL: ${body.email}
      `);

      throw new ErroSQL(...ERRO_SQL_EMAIL_INFORMADO_DO_USUARIO_NAO_ENCONTRADO);
    }
  }

  public async retornaDadosUsuario(idUsuario: string): Promise<IUsuario | ErroSQL> {
    try {
      logger.info(`Realizando consulta para pegar dados do usu??rio: ${idUsuario}...`);
      const usuario = await UsuarioModel.findById(idUsuario);

      if (usuario) return usuario;

      logger.debug(`N??o foi encontrado o ID: ${idUsuario}, na base de dados...`);
      throw new ErroSQL(...ERRO_SQL_BUSCA_DADOS_USUARIO).formatMessage(idUsuario);
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", m??todo "retornaDadosUsuario".
        <'ERRO'>
          message: N??o foi encontrado o ID do Usu??rio: ${idUsuario}, na base de dados...
        Par??metros da requisi????o:
          ID: ${idUsuario}
      `);
      throw new ErroSQL(...ERRO_SQL_BUSCA_DADOS_USUARIO).formatMessage(idUsuario);
    }
  }

  public async assinaturaTermoDeUso(body: IInputTermoDeUsoApi, dadosDoDispositivo: IDadosDoDispositivo, coordenadas: ICoordenadas): Promise<IRetornoUpdateUsuarioModel | null> {
    await this.retornaDadosUsuario(body.idUsuario);
    const termoDeUsoVigente: ITermoDeUso = await TermoDeUsoService.retornaTermoDeUsoSituacaoVigente();

    // eslint-disable-next-line no-underscore-dangle
    const termoDeUso = this.formataDadosTermoDeUso(termoDeUsoVigente._id, dadosDoDispositivo, coordenadas);

    return this.salvaTermoDeUso(body.idUsuario, termoDeUso);
  }

  public formataDadosTermoDeUso(idTermoUso: string, dadosDoDispositivo: IDadosDoDispositivo, coordenadas: ICoordenadas): Array<ITermosDeUso> {
    return [
      {
        idTermoDeUso: idTermoUso,
        coordenadasUsuario: coordenadas,
        tsDataDeAceite: new Date(),
        dadosDispositivo: dadosDoDispositivo,
      },
    ];
  }

  public async salvaTermoDeUso(idUsuario: string, termoDeUso: ITermosDeUso[]): Promise<IRetornoUpdateUsuarioModel | null> {
    try {
      logger.debug("Atualizando os dados do passageiro com a propriedade Termo de Uso...");

      const usuario = UsuarioModel.findOneAndUpdate(
        { _id: idUsuario },
        { termosDeUso: termoDeUso },
        { upsert: true },
        (error, document) => document,
      ).clone();

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      if (usuario) { return usuario; }

      throw new ErroSQL(...ERRO_AO_ATUALIZAR_TERMO_DE_USO_USUARIO);
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", m??todo "salvaTermoDeUso".
        <'ERRO'>
          message: Erro ao salvar os dados do termo de uso: ${error.message}.
      `);

      throw new ErroSQL(...ERRO_AO_ATUALIZAR_TERMO_DE_USO_USUARIO).formatMessage(error.message);
    }
  }

  public async usuarioAssinaturaTermoDeUso(body: IUsuarioAssinaturaTermoDeUso): Promise<IRetornoPassageiroAssinaturaTermoDeUso> {
    const termoDeUsoVigente: ITermoDeUso = await TermoDeUsoService.retornaTermoDeUsoSituacaoVigente();

    const usuario = await this.retornaDadosUsuario(body.idUsuario);

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const objTermoDeUso: ITermosDeUso = usuario.termosDeUso.find(
      // eslint-disable-next-line no-underscore-dangle
      (termosVinculados: ITermosDeUso) => termosVinculados.idTermoDeUso === termoDeUsoVigente._id,
    );

    return {
      assinado: !!objTermoDeUso,
      versao: termoDeUsoVigente.versao,
      conteudo: termoDeUsoVigente.conteudo,
    };
  }

  public async atualizaDadosDePagamento(body: IDadosDoPagamento): Promise<IRetornoUpdateUsuarioModel | null> {
    const resultadoValidacao = this.serviceValidator.validaAtualizaDadosDePagamento(body);
    retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);

    const dadosDoPagamento = this.formataDadosDoPagamento(body);
    return this.salvarDadosDoPagamento(dadosDoPagamento);
  }

  public formataDadosDoPagamento(body: IDadosDoPagamento): Array<IDadosDoPagamento> {
    return [
      {
        idViagem: body.idViagem,
        idUsuario: body.idUsuario,
        ultimosQuatroDigitos: body.ultimosQuatroDigitos,
        cvc: body.cvc,
        dataDeVencimento: body.dataDeVencimento,
        nomeDoTitularDoCartao: body.nomeDoTitularDoCartao,
        cpfDoTitularDoCartao: body.cpfDoTitularDoCartao,
      },
    ];
  }

  public async salvarDadosDoPagamento(dadosDePagamento: IDadosDoPagamento[]): Promise<IRetornoUpdateUsuarioModel | null> {
    try {
      logger.debug("Atualizando dados de pagamento do usu??rio...");

      return UsuarioModel.findOneAndUpdate(
        { _id: dadosDePagamento[0].idUsuario },
        { dadosDePagamento },
        { upsert: true },
        (error, document) => document,
      );
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", m??todo "salvarDadosDoPagamento".
        <'ERRO NEGOCIAL'>
          message:  N??o foi poss??vel atualizar os dados de pagamento do usu??rio, na base de dados...
        Par??metros da requisi????o:
          VIAGEM: ${dadosDePagamento[0].idViagem},
          USU??RIO: ${dadosDePagamento[0].idUsuario},
          CPF DO TTULAR CART??O: ${dadosDePagamento[0].cpfDoTitularDoCartao},
          NOME DO TTULAR CART??O: ${dadosDePagamento[0].nomeDoTitularDoCartao},
      `);

      throw new ErroSQL(...ERRO_AO_ATUALIZAR_DADOS_DE_PAGAMENTO_USUARIO);
    }
  }
}
