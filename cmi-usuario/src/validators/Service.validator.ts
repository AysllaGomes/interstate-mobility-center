import { messages } from "joi-translation-pt-br";
import Joi, { ObjectSchema, ValidationResult } from "@hapi/joi";
import { logger } from "../util/logger";
import { ICadastroUsuario } from "../model/interfaces/CadastroUsuario";
import { IDetalharUsuario } from "../model/interfaces/DetalharUsuario";

export class ServiceValidator {
  public validaCadastroUsuario(body: ICadastroUsuario): ValidationResult {
    logger.debug("Validando o cadastro do usuário...");

    const schema: ObjectSchema<ICadastroUsuario> = Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      dataDeNascimento: Joi.string().required(),
      numeroTelefoneCelular: Joi.string().required(),
    });

    return schema.validate(body, { messages });
  }

  public validaDetalharUsuario(body: IDetalharUsuario): ValidationResult {
    logger.debug("Validando os dados enviados para detalhamento do usuário...");

    const schema: ObjectSchema<IDetalharUsuario> = Joi.object({
      email: Joi.string().required(),
    });

    return schema.validate(body, { messages });
  }
}
