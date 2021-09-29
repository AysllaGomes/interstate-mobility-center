import { logger } from "../util/logger";
import { environment } from "../config/environment";
import {
  ErroExterno,
  ERRO_EXTERNO_VIAGEM_EM_ANDAMENTO,
} from "../errors/erro.externo";
import {
  ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS,
} from "../errors/erro.negocial";
import { retornarErroValidacao } from "../util/utils";
import { ServiceValidator } from "../validators/Service.validator";
import { IRealizaCotacao } from "../model/interfaces/RealizaCotacao";
import { IRetornaCotacao } from "../model/interfaces/RetornaCotacao";

export class CotacaoService {
  private serviceValidator = new ServiceValidator();

  public async retornaMelhorCotacao(body: IRealizaCotacao): Promise<IRetornaCotacao | undefined> {
    const resultadoValidacao = this.serviceValidator.validarRetornaMelhorCotacao(body);
    retornarErroValidacao(resultadoValidacao, ERRO_NEGOCIAL_PROPRIEDADES_NAO_INFORMADAS);

    if (!resultadoValidacao) {
      return;
    }

    logger.error(`
      ERRO no MS "${environment.app.name}", método "retornaMelhorCotacao".
      <'ERRO'>
        message: Houve um erro ao realizar a cotacao...
      Parâmetros da requisição:
        REQ: ${body}
      `);

    throw new ErroExterno(...ERRO_EXTERNO_VIAGEM_EM_ANDAMENTO).formatMessage();
  }
}
