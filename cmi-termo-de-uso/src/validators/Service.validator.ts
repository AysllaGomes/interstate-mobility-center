import { messages } from "joi-translation-pt-br";
import Joi, { ObjectSchema, ValidationResult } from "@hapi/joi";
import { logger } from "../util/logger";
import { IAberturaTermoDeUso } from "../model/interfaces/AberturaTermoDeUso";
import { IDetalharTermoDeUso } from "../model/interfaces/DetalharTermoDeUso";

export class ServiceValidator {
  public validaAberturaTermoDeUso(body: IAberturaTermoDeUso): ValidationResult {
    logger.debug("Validando abertura do termo de uso...");

    const schema: ObjectSchema<IAberturaTermoDeUso> = Joi.object({
      conteudo: Joi.string().required(),
      criticidade: Joi.string().required(),
    });

    return schema.validate(body, { messages });
  }

  public validaDetalharTermoDeUso(body: IDetalharTermoDeUso): ValidationResult {
    logger.debug("Validando detalhar do termo de uso...");

    const schema: ObjectSchema<IDetalharTermoDeUso> = Joi.object({
      versao: Joi.number().min(1).required(),
    });

    return schema.validate(body, { messages });
  }
}
