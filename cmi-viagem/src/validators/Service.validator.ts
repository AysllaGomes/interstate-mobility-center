import { messages } from "joi-translation-pt-br";
import Joi, { ObjectSchema, ValidationResult } from "@hapi/joi";
import { logger } from "../util/logger";
import { IRealizaCotacao } from "../model/interfaces/RealizaCotacao";
import { IInputListarViagem } from "../model/interfaces/InputListarViagem";

export class ServiceValidator {
  public validarRetornaMelhorCotacao(body: IRealizaCotacao): ValidationResult {
    const bodySchema: ObjectSchema<IRealizaCotacao> = Joi.object({
      idUsuario: Joi.string().required(),
      localOrigemViagem: Joi.string().required(),
      localDestinoViagem: Joi.string().required(),
      tsIdaViagem: Joi.date().required(),
      tsVoltaViagem: Joi.date().required(),
    });

    return bodySchema.validate(body, { messages });
  }

  public validarListarViagem(body: IInputListarViagem): ValidationResult {
    logger.debug("Validando input para listar as viagens...");

    const schema: ObjectSchema<IInputListarViagem> = Joi.object({
      titulo: Joi.string(),
      preco: Joi.number(),
      duracao: Joi.number(),
      estadoOrigem: Joi.string(),
      estadoDestino: Joi.string(),
      dataInicio: Joi.string(),
      dataFim: Joi.string(),
    });

    return schema.validate(body, { messages });
  }
}
