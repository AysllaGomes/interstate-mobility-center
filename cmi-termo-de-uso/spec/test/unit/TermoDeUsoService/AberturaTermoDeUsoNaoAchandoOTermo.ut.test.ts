import mockingoose from "mockingoose";
import { ErroSQL } from "../../../../src/errors/erro.sql";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import TermoDeUso, { ITermoDeUso } from "../../../../src/model/TermoDeUso";
import { TermoDeUsoService } from "../../../../src/services/TermoDeUso.service";

beforeAll(() => jaegerTracer);

describe("Teste da TermoDeUsoService - aberturaTermoDeUso - não achando o termo", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const body: ITermoDeUso = require("../utils/jsons/aberturaTermoDeUso.json");

  mockingoose(TermoDeUso).toReturn(null, "findOne");

  const service = new TermoDeUsoService();

  it("Teste do método aberturaTermoDeUso - não achando o termo", async () => {
    try {
      await service.aberturaTermoDeUso(body);
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof ErroSQL) {
        expect(error.code).toBe("996");
        expect(error.statusCode).toBe(500);
        expect(error.name).toBe("ErroSQL");
      }
    }
  });
});
