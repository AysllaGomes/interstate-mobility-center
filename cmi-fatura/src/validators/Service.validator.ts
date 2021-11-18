import Joi, { CustomHelpers, ValidationResult } from "@hapi/joi";
import { messages } from "joi-translation-pt-br";
import { logger } from "../util/logger";
import { IAberturaFatura } from "../model/interfaces/AberturaFatura";

export class ServiceValidator {
  public static validarMes(mes: number, helpers: CustomHelpers): number | Joi.ErrorReport {
    if (
      mes === 0 || mes >= 13
    ) { return helpers.error("any.invalid"); }
    return mes;
  }

  public static validarAno(ano: number, helpers: CustomHelpers): number | Joi.ErrorReport {
    if (
      ano === 0 || ano > 2200
    ) { return helpers.error("any.invalid"); }
    return ano;
  }

  public validaNovaFatura(body: IAberturaFatura): ValidationResult {
    logger.debug("Validando a abertura da fatura...");

    const schema = Joi.object({
      idContratoMobilidade: Joi.string()
        .min(24)
        .max(24)
        .required(),
      mesDeReferencia: Joi.number().required().custom(ServiceValidator.validarMes, "validar mês"),
      anoDeReferencia: Joi.number().required().custom(ServiceValidator.validarAno, "validar ano"),
    });

    return schema.validate(body, { messages });
  }
}
