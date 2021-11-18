import Joi, { ValidationResult } from "@hapi/joi";
import moment from "moment";
import { logger } from "./logger";
import { ErroNegocial } from "../errors/erro.negocial";
import { IDatasFatura } from "../model/interfaces/DatasFatura";
import { IAberturaFatura } from "../model/interfaces/AberturaFatura";

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

export function calcularPeriodoReferenciaEDataVencimento(novaFatura: IAberturaFatura, diaDoVencimento: number): IDatasFatura {
  logger.debug(`Pegando primeiro e ultimo dia do mes '${novaFatura.mesDeReferencia}' de '${novaFatura.anoDeReferencia}' ...`);

  let mesReferencia = Number(novaFatura.mesDeReferencia);
  let anoReferencia = Number(novaFatura.anoDeReferencia);

  const primeiroDiaDoMes = moment([anoReferencia, mesReferencia - 1, 1]).startOf("month").toDate();
  const ultimoDiaDoMes = moment([anoReferencia, mesReferencia - 1, 1]).endOf("month").subtract(3, "hours").toDate();

  logger.debug("Calculando data de vencimento da fatura...");
  let dataDeVencimentoDaFatura: Date;

  mesReferencia += 1;

  if (mesReferencia === 13) {
    mesReferencia = 1;
    anoReferencia += 1;
  }

  dataDeVencimentoDaFatura = moment(`${diaDoVencimento}/${mesReferencia}/${anoReferencia}`, "DD/MM/YYYY").subtract(3, "hours").toDate();

  if (diaDoVencimento > ultimoDiaDoMes.getDate()) {
    dataDeVencimentoDaFatura = ultimoDiaDoMes;
  }

  return {
    primeiroDiaDoMes,
    ultimoDiaDoMes,
    dataDeVencimentoDaFatura,
  };
}
