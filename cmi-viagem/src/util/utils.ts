import moment from "moment";
import Joi, { ValidationResult } from "@hapi/joi";
import { ErroNegocial } from "../errors/erro.negocial";
import { IDatasInicioEFimDoDia } from "../model/interfaces/DatasInicioEFimDoDia";

export function convertNumber(value: string | undefined, defaultNumber: number): number {
  if (Number.isNaN(Number(value))) {
    return defaultNumber;
  }
  return Number(value);
}

export function diffTimeInSeconds(start: [number, number]): number {
  const diff = process.hrtime(start);
  return Math.round((diff[0] * 1e9 + diff[1]) / 1000000);
}

export function retornarErroValidacao(resultadoValidacao: ValidationResult, erroPadrao: [string, string]): void {
  if (resultadoValidacao.error) {
    throw new ErroNegocial(...erroPadrao).formatMessage(
      resultadoValidacao.error.details.map((data: Joi.ValidationErrorItem) => data.message).join(" "),
    );
  }
}

export function formataValorPraDuasCasasDecimais(valor: number): number {
  if (valor.toPrecision().split(".")[1]?.length > 2) {
    const fixed = 10 ** 2;
    return Number(Math.round(valor * fixed) / fixed);
  }
  return valor;
}

export function retornarInicioEFimDoDia(dataInicioString: string, dataFimString?: string): IDatasInicioEFimDoDia {
  const dataInicioDia = new Date(dataInicioString);
  const dataFimSplit: Array<string> = dataFimString?.split("-") ? dataFimString.split("-") : dataInicioString.split("-");
  const dataFimDia = moment([dataFimSplit[0], Number(dataFimSplit[1]) - 1, dataFimSplit[2]]).endOf("day").subtract(3, "hours").toDate();

  return {
    dataInicioDia,
    dataFimDia,
  };
}
