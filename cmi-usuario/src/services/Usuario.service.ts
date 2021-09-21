import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_NA_VALIDACAO,
  ERRO_NEGOCIAL_EMAIL_REPETIDO,
  ERRO_NEGOCIAL_REGISTRO_REPETIDO, ERRO_NEGOCIAL_CPF_REPETIDO,
} from "../errors/erro.negocial";
import {
  ErroSQL,
  ERRO_SQL_AO_SALVAR_USUARIO,
  ERRO_SQL_BUSCA_DADOS_USUARIO,
  ERRO_AO_ATUALIZAR_TERMO_DE_USO_USUARIO,
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
      dataDeNascimento: new Date(body.dataDeNascimento),
      numeroTelefoneCelular: body.numeroTelefoneCelular,
      tsCriacao: new Date(),
    });
  }

  public async salvarUsuario(usuario: IUsuario): Promise<IUsuario> {
    try {
      logger.debug("Salvando usuário...");
      return new UsuarioModel(usuario).save();
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "salvarUsuario".
        <'ERRO NEGOCIAL'>
          message:  Não foi possível salvar o usuário, na base de dados...
        Parâmetros da requisição:
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

      logger.debug(`Buscando dados do usuário do seguinte e-mail: '${body.email}'`);
      const usuario: IUsuario | null = await UsuarioModel.findOne({ email: body.email });

      if (usuario) { return usuario; }

      throw new ErroSQL(...ERRO_SQL_EMAIL_INFORMADO_DO_USUARIO_NAO_ENCONTRADO);
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "detalharUsuario".
        <'ERRO'>
          message: Não encontrado nenhum usuário com o seguinte e-mail: ${body.email}, na base de dados...
        Parâmetros da requisição:
          E-MAIL: ${body.email}
      `);

      throw new ErroSQL(...ERRO_SQL_EMAIL_INFORMADO_DO_USUARIO_NAO_ENCONTRADO);
    }
  }

  public async retornaDadosUsuario(idUsuario: string): Promise<IUsuario | null> {
    try {
      logger.info(`Realizando consulta para pegar dados do usuário: ${idUsuario}...`);
      const usuario = await UsuarioModel.findById(idUsuario);

      if (usuario) return usuario;

      logger.debug(`Não foi encontrado o ID: ${idUsuario}, na base de dados...`);
      throw new ErroSQL(...ERRO_SQL_BUSCA_DADOS_USUARIO).formatMessage(idUsuario);
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "retornaDadosUsuario".
        <'ERRO'>
          message: Não foi encontrado o ID do Usuário: ${idUsuario}, na base de dados...
        Parâmetros da requisição:
          ID: ${idUsuario}
      `);
      throw new ErroSQL(...ERRO_SQL_BUSCA_DADOS_USUARIO).formatMessage(idUsuario);
    }
  }

  public async assinaturaTermoDeUso(body: IInputTermoDeUsoApi, dadosDoDispositivo: IDadosDoDispositivo, coordenadas: ICoordenadas): Promise<IRetornoUpdateUsuarioModel> {
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

  public async salvaTermoDeUso(idUsuario: string, termoDeUso: ITermosDeUso[]): Promise<IRetornoUpdateUsuarioModel> {
    try {
      logger.debug("Atualizando os dados do passageiro com a propriedade Termo de Uso...");

      return UsuarioModel.updateOne(
        { _id: idUsuario },
        { termosDeUso: termoDeUso },
        { upsert: true },
        (error: Error, document: IUsuario) => document,
      );
    } catch (error) {
      logger.error(`
        ERRO no MS "${environment.app.name}", método "salvaTermoDeUso".
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
}
