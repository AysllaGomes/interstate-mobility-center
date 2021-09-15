import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_NA_VALIDACAO,
  ERRO_NEGOCIAL_EMAIL_REPETIDO,
  ERRO_NEGOCIAL_REGISTRO_REPETIDO,
} from "../errors/erro.negocial";
import {
  ErroSQL,
  ERRO_SQL_EMAIL_INFORMADO_DO_USUARIO_NAO_ENCONTRADO,
} from "../errors/erro.sql";
import { retornarErroValidacao } from "../util/utils";
import UsuarioModel, { IUsuario } from "../model/Usuario";
import { ServiceValidator } from "../validators/Service.validator";
import { ICadastroUsuario } from "../model/interfaces/CadastroUsuario";
import { IDetalharUsuario } from "../model/interfaces/DetalharUsuario";

export class UsuarioService {
  private serviceValidator = new ServiceValidator();

  public async cadastrarUsuario(body: ICadastroUsuario): Promise<IUsuario> {
    const resultadoValidacao = this.serviceValidator.validaCadastroUsuario(body);
    retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);

    const resultadoRepeticoes = await UsuarioService.existeRepeticoesProibidas(body);

    if (!resultadoRepeticoes) {
      return new UsuarioModel({
        nome: body.nome,
        email: body.email,
        dataDeNascimento: new Date(body.dataDeNascimento),
        numeroTelefoneCelular: body.numeroTelefoneCelular,
        tsCriacao: new Date(),
      }).save();
    }

    throw new ErroNegocial(...ERRO_NEGOCIAL_REGISTRO_REPETIDO);
  }

  public static async existeRepeticoesProibidas(passageiroCadastro: ICadastroUsuario): Promise<boolean> {
    const emailCadastrado = await UsuarioService.emailCadastrado(passageiroCadastro.email);
    if (emailCadastrado) {
      throw new ErroNegocial(...ERRO_NEGOCIAL_EMAIL_REPETIDO);
    }

    return false;
  }

  public static async emailCadastrado(email: string): Promise<boolean> {
    const passageiroModel = await UsuarioModel.find({ email });
    return passageiroModel.length !== 0;
  }

  public async detalharUsuario(body: IDetalharUsuario): Promise<IUsuario | undefined> {
    try {
      const resultadoValidacao = this.serviceValidator.validaDetalharUsuario(body);
      retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);

      logger.debug(`Buscando dados do usuário do seguinte e-mail: '${body.email}'...`);
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
}
