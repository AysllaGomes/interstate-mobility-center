import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { ErroNegocial } from "../../../../src/errors/erro.negocial";
import { ContratoService } from "../../../../src/services/Contrato.service";

beforeAll(() => jaegerTracer);

describe("Teste da ContratoService - abertura com erro de validação", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const body = {
    valorDoPercentualTotalDoContrato: "Quer voar...",
  };

  const service = new ContratoService();

  it("Teste do método abertura com erro de validação", async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      await service.abertura(body);
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
