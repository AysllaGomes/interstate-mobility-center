import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { ServiceValidator } from "../../../../src/validators/Service.validator";
import { IDetalharTermoDeUso } from "../../../../src/model/interfaces/DetalharTermoDeUso";

beforeAll(() => jaegerTracer);

describe("Teste da ServiceValidator - validaDetalharTermoDeUso", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const body: IDetalharTermoDeUso = require("../utils/jsons/detalharTermoDeUso.json");

  const serviceValidator = new ServiceValidator();

  it("Teste do método validaDetalharTermoDeUso", () => {
    const result = serviceValidator.validaDetalharTermoDeUso(body);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("value.versao");
  });
});
