import { EventEmitter } from "events";
import express from "express";

const emitBeforeRender = "beforeRender";

export abstract class ApiRouter extends EventEmitter {
  public abstract applyRoutes(application: express.Application): void;

  public abstract active(): boolean;

  protected envelope(document: any): any {
    return document;
  }

  protected envelopeAll(documents: any[], options: any = {}): any[] {
    return documents;
  }

  protected render(response: express.Response, next: express.NextFunction) {
    return (document: any) => {
      if (document) {
        this.emit(emitBeforeRender, document);
        response.json(this.envelope(document));
      } else {
        response.status(404).send("Documento não encontrado");
      }
      return next();
    };
  }

  protected renderAll(response: express.Response, next: express.NextFunction, options: any = {}) {
    return (documents: any[]) => {
      if (documents) {
        documents.forEach((document, index, array) => {
          this.emit(emitBeforeRender, document);
          array[index] = this.envelope(document);
        });
        response.json(this.envelopeAll(documents, options));
      } else {
        response.json(this.envelopeAll([]));
      }
      return next();
    };
  }
}
