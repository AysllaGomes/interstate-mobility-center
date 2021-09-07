import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { ErroNegocial } from "../../../../src/errors/erro.negocial";
import { UsuarioService } from "../../../../src/services/Usuario.service";

beforeAll(() => jaegerTracer);

describe("Teste da UsuarioService - cadastrarUsuario com erro de validação", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const body = {
    nome: "Quer voar...",
  };

  const service = new UsuarioService();

  it("Teste do método cadastrarUsuario com erro de validação", async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      await service.cadastrarUsuario(body);
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
