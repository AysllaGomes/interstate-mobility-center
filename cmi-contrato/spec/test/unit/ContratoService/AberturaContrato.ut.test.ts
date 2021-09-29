import mockingoose from "mockingoose";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import Contrato, { IContrato } from "../../../../src/model/Contrato";
import { ContratoService } from "../../../../src/services/Contrato.service";
import { IAberturaContrato } from "../../../../src/model/interfaces/AberturaContrato";
import VariaveisDeAmbienteModel, { IVariaveisDeAmbiente } from "../../../../src/model/VariaveisDeAmbiente";

beforeAll(() => jaegerTracer);

describe("Teste da ContratoService - abertura", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const body: IAberturaContrato = require("../utils/jsons/aberturaContrato.json");

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const contrato: IContrato = require("../utils/jsons/contrato.json");

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const variaveisDeAmbiente: IVariaveisDeAmbiente = require("../utils/jsons/variaveisDeAmbiente.json");

  mockingoose(VariaveisDeAmbienteModel).toReturn([variaveisDeAmbiente], "find");

  mockingoose(Contrato).toReturn(null, "findOne");

  mockingoose(Contrato).toReturn(contrato, "save");

  const service = new ContratoService();

  it("Teste do método abertura", async () => {
    const result = await service.abertura(body);

    expect(result).toBeDefined();

    if (result) {
      expect(result.numeroDeIdentificacao).toEqual(contrato.numeroDeIdentificacao);
      expect(result.periodoDeVigencia.dataInicio).toEqual(contrato.periodoDeVigencia.dataInicio);
      expect(result.periodoDeVigencia.dataInicio).toEqual(contrato.periodoDeVigencia.dataInicio);
    }
  });
});
