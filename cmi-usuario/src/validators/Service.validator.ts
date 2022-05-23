import { messages } from "joi-translation-pt-br";
import Joi, { CustomHelpers, ObjectSchema, ValidationResult } from "@hapi/joi";
import { logger } from "../util/logger";
import { IDadosDoPagamento } from "../model/interfaces/DadosPagamento";
import { ICadastroUsuario } from "../model/interfaces/CadastroUsuario";
import { IDetalharUsuario } from "../model/interfaces/DetalharUsuario";

export class ServiceValidator {
  public validaCadastroUsuario(body: ICadastroUsuario): ValidationResult {
    logger.debug("Validando o cadastro do usuário...");

    const schema: ObjectSchema<ICadastroUsuario> = Joi.object({
      nome: Joi.string().required(),
      cpf: Joi.string().custom(ServiceValidator.validarCPF, "validar cpf"),
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

  public validaAtualizaDadosDePagamento(body: IDadosDoPagamento): ValidationResult {
    logger.debug("Validando os dados de pagamento...");

    const schema: ObjectSchema<IDadosDoPagamento> = Joi.object({
      idUsuario: Joi.string()
        .min(24)
        .max(24)
        .required(),
      idViagem: Joi.string()
        .min(24)
        .max(24)
        .required(),
      ultimosQuatroDigitos: Joi.required(),
      cvc: Joi.required(),
      dataDeVencimento: Joi.required(),
      nomeDoTitularDoCartao: Joi.string().required(),
      cpfDoTitularDoCartao: Joi.string().custom(ServiceValidator.validarCPF, "validar cpf").required(),
    });

    return schema.validate(body, { messages });
  }
}
