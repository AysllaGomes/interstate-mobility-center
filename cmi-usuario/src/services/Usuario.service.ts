import {
  ErroNegocial,
  ERRO_NEGOCIAL_NA_VALIDACAO,
  ERRO_NEGOCIAL_EMAIL_REPETIDO,
  ERRO_NEGOCIAL_REGISTRO_REPETIDO,
} from "../errors/erro.negocial";
import { retornarErroValidacao } from "../util/utils";
import UsuarioModel, { IUsuario } from "../model/Usuario";
import { ServiceValidator } from "../validators/Service.validator";
import { ICadastroPassageiro } from "../model/interfaces/CadastroPassageiro";

export class UsuarioService {
  private serviceValidator = new ServiceValidator();

  public async cadastrarUsuario(body: ICadastroPassageiro): Promise<IUsuario> {
    const resultadoValidacao = this.serviceValidator.validaCadastroUsuario(body);
    retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_NA_VALIDACAO);

    const resultadoRepeticoes = await UsuarioService.existeRepeticoesProibidas(body);

    if (!resultadoRepeticoes) {
      return new UsuarioModel({
        nome: body.nome,
        email: body.email,
        dataDeNascimento: body.dataDeNascimento,
        numeroTelefoneCelular: body.numeroTelefoneCelular,
        tsCriacao: new Date(),
      }).save();
    }

    throw new ErroNegocial(...ERRO_NEGOCIAL_REGISTRO_REPETIDO);
  }

  public static async existeRepeticoesProibidas(passageiroCadastro: ICadastroPassageiro): Promise<boolean> {
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
}
