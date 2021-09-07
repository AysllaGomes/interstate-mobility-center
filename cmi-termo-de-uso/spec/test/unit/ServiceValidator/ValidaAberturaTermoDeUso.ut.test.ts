import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { ITermoDeUso } from "../../../../src/model/TermoDeUso";
import { ServiceValidator } from "../../../../src/validators/Service.validator";

beforeAll(() => jaegerTracer);

describe("Teste da ServiceValidator - validaAberturaTermoDeUso", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const body: ITermoDeUso = require("../utils/jsons/aberturaTermoDeUso.json");

  const serviceValidator = new ServiceValidator();

  it("Teste do método validaAberturaTermoDeUso", () => {
    const result = serviceValidator.validaAberturaTermoDeUso(body);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("value.conteudo");
  });
});
