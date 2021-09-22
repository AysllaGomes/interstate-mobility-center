import mockingoose from "mockingoose";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { ServiceValidator } from "../../../../src/validators/Service.validator";
import { IDetalharUsuario } from "../../../../dist/model/interfaces/DetalharUsuario";

beforeAll(() => jaegerTracer);

describe("Teste da ServiceValidators - método validaDetalharUsuario", () => {
  afterEach(() => {
    jest.resetAllMocks();
    mockingoose.resetAll();
  });

  it("Teste do método validaDetalharUsuario", async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const body: IDetalharUsuario = require("../utils/jsons/detalharUsuario.json");

    const serviceValidator = new ServiceValidator();
    const result = await serviceValidator.validaDetalharUsuario(body);

    expect(result.value).toBeDefined();
    expect(result.value).toHaveProperty("email");
  });
});
