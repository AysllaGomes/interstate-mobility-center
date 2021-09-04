import mockingoose from "mockingoose";
import TermoDeUso from "../../../../src/model/TermoDeUso";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { TermoDeUsoService } from "../../../../src/services/TermoDeUso.service";
import { IDetalharTermoDeUso } from "../../../../src/model/interfaces/DetalharTermoDeUso";

beforeAll(() => jaegerTracer);

describe("Teste da TermoDeUsoService - detalharTermoDeUso", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const body: IDetalharTermoDeUso = require("../utils/jsons/detalharTermoDeUso.json");

  mockingoose(TermoDeUso).toReturn(body, "findOne");

  const service = new TermoDeUsoService();

  it("Teste do método detalharTermoDeUso", async () => {
    const result = await service.detalharTermoDeUso(body);

    expect(result).toBeDefined();
    if (result) {
      expect(result.versao).toEqual(body.versao);
    }
  });
});
