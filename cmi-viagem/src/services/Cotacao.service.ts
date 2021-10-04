import { logger } from "../util/logger";
import { environment } from "../config/environment";
import { retornarErroValidacao } from "../util/utils";
import {
  ErroExterno,
  ERRO_EXTERNO_VIAGEM_EM_ANDAMENTO,
} from "../errors/erro.externo";
import {
  ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS,
} from "../errors/erro.negocial";
import { UsuarioService } from "./Usuario.service";
import { ServiceValidator } from "../validators/Service.validator";
import { IRealizaCotacao } from "../model/interfaces/RealizaCotacao";
import { IRetornaCotacao } from "../model/interfaces/RetornaCotacao";

export class CotacaoService {
  private serviceValidator = new ServiceValidator();

  public async retornaMelhorCotacao(body: IRealizaCotacao): Promise<IRetornaCotacao | undefined> {
    const resultadoValidacao = this.serviceValidator.validarRetornaMelhorCotacao(body);
    retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS);

    try {
      const usuario = await UsuarioService.retornaDadosPassageiro(body.idUsuario);

      console.log("usuario", usuario);

      return;
    } catch (error) {
      logger.error(`
      ERRO no MS "${environment.app.name}", método "retornaMelhorCotacao".
      <'ERRO'>
        message: Houve um erro ao realizar a cotacao... \n ${error}
      Parâmetros da requisição:
        ID USUÁRIO: ${body.idUsuario},
        ORIGEM: ${body.localOrigemViagem},
        DESTINO: ${body.localDestinoViagem},
        DATA IDA: ${body.tsIdaViagem},
        DATA RETORNO: ${body.tsVoltaViagem}.
      `);

      throw new ErroExterno(...ERRO_EXTERNO_VIAGEM_EM_ANDAMENTO).formatMessage();
    }
  }
}
