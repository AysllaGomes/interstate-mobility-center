import express from "express";
import { ApiRouter } from "./api.router";
import { ErroPadrao } from "../errors/erro";
import { listErroSQL } from "../errors/erro.sql";
import { environment } from "../config/environment";
import { listErroNegocio } from "../errors/erro.negocial";

/**
 * @swagger
 *
 * definitions:
 *   Error:
 *     type: object
 *     properties:
 *       code:
 *         type: string
 *       source:
 *         type: string
 *       message:
 *         type: string
 *       userHelp:
 *         type: string
 *       developerMessage:
 *         type: string
 *       moreInfo:
 *         type: string
 *     example:
 *       errorCode: 1404
 *       errorMessage: "Nenhum Registro Encontrado"
 */
export class ErrorApi extends ApiRouter {
  private listErrors: ErroPadrao[];

  constructor() {
    super();
    this.listErrors = [];
    this.listErrors = (this.listErrors.concat(listErroNegocio, listErroSQL))
      .sort((a, b) => Number(a.code) - Number(b.code));
  }

  public active(): boolean {
    return environment.app.env !== "production";
  }

  public applyRoutes(server: express.Application): void {
    /**
     * @swagger
     * /errors:
     *   get:
     *     description: List of errors
     *     summary: List of errors that application can throw.
     *     tags:
     *       - Errors
     *     responses:
     *       200:
     *         description: Errors
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/Error'
     */
    server.get("/errors", async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
      resp.json({
        error: this.listErrors,
      });
      return next();
    });
  }
}
