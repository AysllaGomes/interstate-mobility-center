import express from "express";
import { ErrorTypes } from "../errors/erro";

export const handleError = (err: any, _req: express.Request, res: express.Response,
  next: express.NextFunction): void => {
  switch (err.name) {
    case ErrorTypes.TIPO_ERRO_NEGOCIAL:
    case ErrorTypes.TIPO_ERRO_SQL:
    case ErrorTypes.TIPO_ERRO_EXTERNO:
      break;

    default:
      err.statusCode = 500;
      err.toJSON = (): object => ({
        code: "-1",
        source: (err.stack as string).split("\n")[1].replace("at", "").trim(),
        message: err.message,
      });
  }

  res.status(err.statusCode).send(err.toJSON());
};
