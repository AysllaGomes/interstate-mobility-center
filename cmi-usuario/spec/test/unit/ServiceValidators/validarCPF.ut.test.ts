import mockingoose from "mockingoose";
import { CustomHelpers } from "@hapi/joi";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { ServiceValidator } from "../../../../src/validators/Service.validator";

beforeAll(() => jaegerTracer);

describe("Teste da ServiceValidator - método validarCPF", () => {
  afterEach(() => {
    jest.resetAllMocks();
    mockingoose.resetAll();
  });

  it("Teste do método validarCPF", async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const helpers:CustomHelpers = <CustomHelpers>{ original: "01080747141" };
    const result = await ServiceValidator.validarCPF("01080747141", helpers);

    expect(result).toBeDefined();
    expect(result).toEqual("01080747141");
  });
});
