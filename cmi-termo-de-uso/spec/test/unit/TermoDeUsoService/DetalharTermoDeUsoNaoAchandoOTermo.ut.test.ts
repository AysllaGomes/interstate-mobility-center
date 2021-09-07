import mockingoose from "mockingoose";
import { ErroSQL } from "../../../../src/errors/erro.sql";
import TermoDeUso from "../../../../src/model/TermoDeUso";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { TermoDeUsoService } from "../../../../src/services/TermoDeUso.service";
import { IDetalharTermoDeUso } from "../../../../src/model/interfaces/DetalharTermoDeUso";

beforeAll(() => jaegerTracer);

describe("Teste da TermoDeUsoService - detalharTermoDeUso - não achando o termo", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const body: IDetalharTermoDeUso = require("../utils/jsons/detalharTermoDeUso.json");

  mockingoose(TermoDeUso).toReturn(null, "findOne");

  const service = new TermoDeUsoService();

  it("Teste do método detalharTermoDeUso - não achando o termo", async () => {
    try {
      await service.detalharTermoDeUso(body);
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof ErroSQL) {
        expect(error.code).toBe("995");
        expect(error.statusCode).toBe(500);
        expect(error.name).toBe("ErroSQL");
      }
    }
  });
});
