import mockingoose from "mockingoose";
import { ErroSQL } from "../../../../src/errors/erro.sql";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { UsuarioService } from "../../../../src/services/Usuario.service";

beforeAll(() => jaegerTracer);

describe("Teste da UsuarioService - retornaDadosUsuarioErroNegocial", () => {
  afterEach(() => {
    jest.resetAllMocks();
    mockingoose.resetAll();
  });

  const usuarioService = new UsuarioService();

  it("Teste do método retornaDadosUsuario - Condição de não encontrar ID", async () => {
    try {
      await usuarioService.retornaDadosUsuario("");
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof ErroSQL) {
        expect(error.code).toBe("996");
        expect(error.statusCode).toBe(500);
        expect(error.name).toBe("ErroSQL");
      }
    }
  });
});
