import { messages } from "joi-translation-pt-br";
import Joi, { ObjectSchema, ValidationResult } from "@hapi/joi";
import { logger } from "../util/logger";
import { IDetalharUsuario } from "../model/interfaces/DetalharUsuario";
import { ICadastroUsuario } from "../model/interfaces/CadastroUsuario";

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
    logger.debug("Validando detalhar do usuário...");

    const schema: ObjectSchema<IDetalharUsuario> = Joi.object({
      email: Joi.string().required(),
    });

    return schema.validate(body, { messages });
  }
}
