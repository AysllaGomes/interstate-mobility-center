
/**
 * @swagger
 *
 * definitions:
 *   IDadosDoDispositivo:
 *     type: object
 *     required:
 *       - versaoDoApp
 *       - brand
 *       - modeloDoAparelho
 *       - os
 *       - "os-version"
 *     properties:
 *       versaoDoApp:
 *         type: string
 *       brand:
 *         type: string
 *       modeloDoAparelho:
 *         type: string
 *       os:
 *         type: string
 *       "os-version":
 *         type: string
 *     example:
 *      {
 *          versaoDoApp: "1.0.0",
 *          brand: "brand",
 *          modeloDoAparelho: "Modelo do aparelho",
 *          os: "os",
 *          "os-version": "os version",
 *      }
 */
export interface IDadosDoDispositivo {
  versaoDoApp?: string | string[];
  brand?: string | string[];
  modeloDoAparelho?: string | string[];
  os?: string | string[];
  "os-version"?: string | string[];
}
