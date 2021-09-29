import Joi, { ValidationResult } from "@hapi/joi";
import { ErroNegocial } from "../errors/erro.negocial";

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
