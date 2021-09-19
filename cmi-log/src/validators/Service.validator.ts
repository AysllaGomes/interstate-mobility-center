import Joi, { ValidationResult } from "@hapi/joi";
import { messages } from "joi-translation-pt-br";
import { TipoApiEnum } from "../model/enums/TipoApi.enum";
import { CategoriaEnum } from "../model/enums/Categoria.enum";
import { PlataformaEnum } from "../model/enums/Plataforma.enum";
import { TipoProcessoEnum } from "../model/enums/TipoProcesso.enum";
import { IInputLogMobilidade } from "../model/interfaces/InputLogMobilidade";

export class ServiceValidator {
  public validaInputLogMobilidade(input: IInputLogMobilidade): ValidationResult {
    const processoSchema = Joi.object({
      tipoProcesso: Joi.string().valid(
        TipoProcessoEnum.APP,
        TipoProcessoEnum.CMU_AUTENTICACAO,
        TipoProcessoEnum.CMU_USUARIO,
        TipoProcessoEnum.CMU_VIAGEM,
      ).required(),
      versao: Joi.string().min(5).max(9).required(),
      classe: Joi.string().required(),
      metodo: Joi.string().required(),
    });

    const validaLogSchema = Joi.object({
      categoria: Joi.string().valid(
        CategoriaEnum.CONSUMO_API,
        CategoriaEnum.LOG_ERRO,
        CategoriaEnum.LOG_INFO,
        CategoriaEnum.LOG_DEBUG,
      ).required(),
      processo: processoSchema,
      usuarioLogado: Joi.string(),
      tsDoConsumoDaApi: Joi.string().required(),
      tipoApi: Joi.string().valid(
        TipoApiEnum.GEOCODING,
        TipoApiEnum.REVERSE_GEOCODING,
        TipoApiEnum.PLACES_AUTO_COMPLETE,
        TipoApiEnum.DIRECTIONS,
        TipoApiEnum.MAP_SDK_ANDROID,
        TipoApiEnum.MAP_SDK_IOS,
      ),
      plataforma: Joi.string().valid(
        PlataformaEnum.APP,
        PlataformaEnum.MS,
      ),
    });

    return validaLogSchema.validate(input, { messages });
  }
}
