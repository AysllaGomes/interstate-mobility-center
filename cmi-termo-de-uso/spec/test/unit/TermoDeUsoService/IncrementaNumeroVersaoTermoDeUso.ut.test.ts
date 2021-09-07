import mockingoose from "mockingoose";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { TermoDeUsoService } from "../../../../src/services/TermoDeUso.service";
import VariaveisDeAmbienteModel, { IVariaveisDeAmbiente } from "../../../../src/model/VariaveisDeAmbiente";

beforeAll(() => jaegerTracer);

describe("Teste da TermoDeUsoService - incrementaNumeroVersaoTermoDeUso", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const variaveisDeAmbiente: IVariaveisDeAmbiente = require("../utils/jsons/variaveisDeAmbiente.json");

  mockingoose(VariaveisDeAmbienteModel).toReturn([variaveisDeAmbiente], "find");

  const service = new TermoDeUsoService();

  it("Teste do método incrementaNumeroVersaoTermoDeUso", async () => {
    const result = await service.incrementaNumeroVersaoTermoDeUso();

    expect(result).toBeDefined();
    expect(result).toBe(1);
  });
});
