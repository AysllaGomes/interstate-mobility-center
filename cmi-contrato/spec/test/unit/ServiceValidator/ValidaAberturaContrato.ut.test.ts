import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { ServiceValidator } from "../../../../src/validators/Service.validator";
import { IAberturaContrato } from "../../../../dist/model/interfaces/AberturaContrato";

beforeAll(() => jaegerTracer);

describe("Teste da ServiceValidator - validaAberturaContrato", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const body: IAberturaContrato = require("../utils/jsons/aberturaContrato.json");

  const serviceValidator = new ServiceValidator();

  it("Teste do método validaAberturaContrato", () => {
    const result = serviceValidator.validaAberturaContrato(body);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("value.periodoDeVigencia");
    expect(result).toHaveProperty("value.valorDoPercentualTotalDoContrato");
    expect(result).toHaveProperty("value.centroDeCusto");
    expect(result).toHaveProperty("value.agenciaResponsavelConducao");
  });
});
