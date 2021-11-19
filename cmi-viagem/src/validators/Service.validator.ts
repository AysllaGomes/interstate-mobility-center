import Joi, { ObjectSchema, ValidationResult } from "@hapi/joi";
import { messages } from "joi-translation-pt-br";
import { IRealizaCotacao } from "../model/interfaces/RealizaCotacao";

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
}
