import mockingoose from "mockingoose";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import TermoDeUso, { ITermoDeUso } from "../../../../src/model/TermoDeUso";
import { TermoDeUsoService } from "../../../../src/services/TermoDeUso.service";
import { IAberturaTermoDeUso } from "../../../../src/model/interfaces/AberturaTermoDeUso";
import VariaveisDeAmbienteModel, { IVariaveisDeAmbiente } from "../../../../src/model/VariaveisDeAmbiente";

beforeAll(() => jaegerTracer);

describe("Teste da TermoDeUsoService - aberturaTermoDeUso", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const body: IAberturaTermoDeUso = require("../utils/jsons/aberturaTermoDeUso.json");

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const termoDeUso: ITermoDeUso = require("../utils/jsons/termoDeUso.json");

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const variaveisDeAmbiente: IVariaveisDeAmbiente = require("../utils/jsons/variaveisDeAmbiente.json");

  mockingoose(VariaveisDeAmbienteModel).toReturn([variaveisDeAmbiente], "find");

  mockingoose(TermoDeUso).toReturn(null, "findOne");

  mockingoose(TermoDeUso).toReturn(termoDeUso, "save");

  const service = new TermoDeUsoService();

  it("Teste do método aberturaTermoDeUso", async () => {
    const result = await service.aberturaTermoDeUso(body);

    expect(result).toBeDefined();
    if (result) {
      expect(result.versao).toEqual(termoDeUso.versao);
      expect(result.conteudo).toEqual(termoDeUso.conteudo);
      expect(result.criticidade).toEqual(termoDeUso.criticidade);
    }
  });
});
