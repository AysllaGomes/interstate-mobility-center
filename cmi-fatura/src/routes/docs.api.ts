import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { ApiRouter } from "./api.router";
import { environment } from "../config/environment";

export class DocsApi extends ApiRouter {
  public active(): boolean {
    return environment.app.env !== "production";
  }

  public applyRoutes(server: express.Application): void {
    const options = {
      docExpansion: "list",
    };

    const swaggerUiOpts = {
      explorer: false,
      customSiteTitle: environment.app.name,
      customfavIcon: "./assets/favicon-32x32.png",
      swaggerOptions: options,
      customCss: ".swagger-ui .topbar { display: none}",
      baseURL: "docs",
    };
    const opt = {
      definition: {
        info: {
          title: environment.app.name,
          version: environment.app.version,
          description: environment.app.description,
        },
        host: environment.app.host,
        basePath: "",
        schemes: ["https", "http"],
      },
      apis: ["./src/model/**/*.ts", "./src/routes/*.ts", "./src/controllers/*.ts"],
    };

    const swaggerSpec = swaggerJSDoc(opt);
    swaggerUi.generateHTML(swaggerSpec, { ...swaggerUiOpts, baseURL: "docs" });

    // server.use("/assets", express.static("/app/static/icons"));

    server.get("/api-docs.json", (req: express.Request, res: express.Response) => {
      res.json(swaggerSpec);
    });

    server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOpts));
  }
}
