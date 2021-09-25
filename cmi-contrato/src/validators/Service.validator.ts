import { messages } from "joi-translation-pt-br";
import Joi, { ObjectSchema, ValidationResult } from "@hapi/joi";
import { logger } from "../util/logger";
import { IAberturaContrato } from "../model/interfaces/AberturaContrato";

export class ServiceValidator {
  public validaAberturaContrato(body: IAberturaContrato): ValidationResult {
    logger.debug("Validando abertura do contrato...");

    const schema: ObjectSchema<IAberturaContrato> = Joi.object({
      periodoDeVigencia: Joi.object({
        dataInicio: Joi.string().required(),
        dataFim: Joi.string().required(),
      }).required(),
      valorDoPercentualTotalDoContrato: Joi.number().required(),
      centroDeCusto: Joi.array().required(),
      agenciaResponsavelConducao: Joi.number().required(),
    });

    return schema.validate(body, { messages });
  }
}
