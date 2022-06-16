import { messages } from "joi-translation-pt-br";
import Joi, { CustomHelpers, ValidationResult } from "@hapi/joi";
import { logger } from "../util/logger";
import { IVinculoPassageiro } from "../model/interfaces/VinculoPassageiro";

export class ServiceValidator {
  public validarVinculoPassageiro(body: IVinculoPassageiro): ValidationResult {
    logger.debug("Validando o vinculo do passageiro da viagem...");

    const schema = Joi.object({
      idUsuario: Joi.string()
        .min(24)
        .max(24)
        .required(),
      idViagem: Joi.string()
        .min(24)
        .max(24)
        .required(),
      usuarioPassageiro: Joi.boolean()
        .required(),
      listaPassageiros: Joi.array().items(
        Joi.object({
          nome: Joi.string(),
          cpf: Joi.string().custom(ServiceValidator.validarCPF, "validar cpf"),
          dataDeNascimento: Joi.string(),
          numeroTelefoneCelular: Joi.string(),
        }),
      ),
      dadosPagamento: Joi.object({
        anoCartao: Joi.string().required(),
        mesCartao: Joi.string().required(),
        cvcCartao: Joi.string().required(),
        numeroCartao: Joi.string().required(),
        cpfTitular: Joi.string().custom(ServiceValidator.validarCPF, "validar cpf").required(),
        nomeTitularCartao: Joi.string().required(),
      }),
    });

    return schema.validate(body, { messages });
  }

  public static validarCPF(cpf: string, helpers: CustomHelpers): string | Joi.ErrorReport {
    logger.debug(`Validação do CPF: ${cpf}...`);
    cpf = cpf.replace(/[\s.-]*/igm, "");
    if (
      !cpf
        || cpf.length !== 11
        || cpf === "00000000000"
        || cpf === "11111111111"
        || cpf === "22222222222"
        || cpf === "33333333333"
        || cpf === "44444444444"
        || cpf === "55555555555"
        || cpf === "66666666666"
        || cpf === "77777777777"
        || cpf === "88888888888"
        || cpf === "99999999999"
    ) { return helpers.error("any.invalid"); }

    let soma = 0;
    let resto;
    // eslint-disable-next-line radix
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    // eslint-disable-next-line radix
    if (resto !== parseInt(cpf.substring(9, 10))) return helpers.error("any.invalid");
    soma = 0;
    // eslint-disable-next-line radix
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    // eslint-disable-next-line radix
    if (resto !== parseInt(cpf.substring(10, 11))) return helpers.error("any.invalid");

    return cpf;
  }
}
