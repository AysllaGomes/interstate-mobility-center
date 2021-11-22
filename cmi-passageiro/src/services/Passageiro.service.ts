import {
  ErroSQL,
  ERRO_SQL_AO_SALVAR_PASSAGEIRO,
} from "../errors/erro.sql";
import {
  ErroNegocial,
  ERRO_NEGOCIAL_CPF_REPETIDO,
  ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS,
} from "../errors/erro.negocial";
import { logger } from "../util/logger";
import { environment } from "../config/environment";
import { retornarErroValidacao } from "../util/utils";
import Passageiro, { IPassageiro } from "../model/Passageiro";
import { ServiceValidator } from "../validators/Service.validator";
import { IVinculoPassageiro } from "../model/interfaces/VinculoPassageiro";

export class PassageiroService {
    private serviceValidator = new ServiceValidator();

    public async vinculoPassageiro(body: IVinculoPassageiro): Promise<IPassageiro | undefined> {
      const resultadoValidacao = this.serviceValidator.validaVinculoPassageiro(body);
      retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS);

      const resultadoRepeticoes = await PassageiroService.existeRepeticoesProibidas(body);

      if (!resultadoRepeticoes) {
        const passageiro = this.formataPassageiro(body);
        return this.salvarPassageiro(passageiro);
      }

      return undefined;
    }

    public static async existeRepeticoesProibidas(passageiroCadastro: IVinculoPassageiro): Promise<boolean> {
      const cpfCadastrado = await PassageiroService.cpfCadastrado(passageiroCadastro.cpf);
      if (cpfCadastrado) {
        throw new ErroNegocial(...ERRO_NEGOCIAL_CPF_REPETIDO);
      }

      return false;
    }

    public static async cpfCadastrado(cpf: string): Promise<boolean> {
      const passageiroModel = await Passageiro.find({ cpf });
      return passageiroModel.length !== 0;
    }

    public formataPassageiro(body: IVinculoPassageiro): IPassageiro {
      return new Passageiro({
        idUsuario: body.idUsuario,
        idViagem: body.idViagem,
        nome: body.nome,
        cpf: body.cpf,
        dataDeNascimento: body.dataDeNascimento,
        numeroTelefoneCelular: body.numeroTelefoneCelular,
        tsCriacao: new Date(),
      });
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
          NOME: ${passageiro.nome},
          CPF: ${passageiro.cpf},
          DATA DE NASCIMENTO: ${passageiro.dataDeNascimento},
          CELULAR: ${passageiro.numeroTelefoneCelular},
      `);

        throw new ErroSQL(...ERRO_SQL_AO_SALVAR_PASSAGEIRO);
      }
    }
}
