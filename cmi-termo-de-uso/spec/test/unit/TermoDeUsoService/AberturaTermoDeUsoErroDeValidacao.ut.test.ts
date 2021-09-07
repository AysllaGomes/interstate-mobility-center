import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { ErroNegocial } from "../../../../src/errors/erro.negocial";
import { TermoDeUsoService } from "../../../../src/services/TermoDeUso.service";

beforeAll(() => jaegerTracer);

describe("Teste da TermoDeUsoService - aberturaTermoDeUso com erro de validação", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const body = {
    criticidade: "Quer voar...",
  };

  const service = new TermoDeUsoService();

  it("Teste do método aberturaTermoDeUso com erro de validação", async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      await service.aberturaTermoDeUso(body);
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof ErroNegocial) {
        expect(error.code).toBe("001");
        expect(error.statusCode).toBe(422);
        expect(error.name).toBe("ErroNegocial");
      }
    }
  });
});
