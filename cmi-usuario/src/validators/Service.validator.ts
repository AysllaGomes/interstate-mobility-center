import { messages } from "joi-translation-pt-br";
import Joi, { ObjectSchema, ValidationResult } from "@hapi/joi";
import { logger } from "../util/logger";
import { ICadastroPassageiro } from "../model/interfaces/CadastroPassageiro";

export class ServiceValidator {
  public validaCadastroUsuario(body: ICadastroPassageiro): ValidationResult {
    logger.debug("Validando o cadastro do usuário...");

    const schema: ObjectSchema<ICadastroPassageiro> = Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      dataDeNascimento: Joi.string().required(),
      numeroTelefoneCelular: Joi.string().required(),
    });

    return schema.validate(body, { messages });
  }
}
