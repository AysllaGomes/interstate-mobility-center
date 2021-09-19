import Joi, { ObjectSchema, ValidationResult } from "@hapi/joi";
import { messages } from "joi-translation-pt-br";
import { IRealizaCotacao } from "../model/interfaces/RealizaCotacao";

export class ServiceValidator {
  public validarRetornaMelhorCotacao(body: IRealizaCotacao): ValidationResult {
    const bodySchema: ObjectSchema<IRealizaCotacao> = Joi.object({
      idUsuario: Joi.string().required(),
      latitudePosicao: Joi.number(),
      longitudePosicao: Joi.number(),
      latitudeOrigem: Joi.number().required(),
      longitudeOrigem: Joi.number().required(),
      latitudeDestino: Joi.number().required(),
      longitudeDestino: Joi.number().required(),
      tituloOrigemViagem: Joi.string().required(),
      tituloDestinoViagem: Joi.string().required(),
    });

    return bodySchema.validate(body, { messages });
  }
}
