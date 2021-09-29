import mockingoose from "mockingoose";
import UsuarioModel from "../../../../src/model/Usuario";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { UsuarioService } from "../../../../src/services/Usuario.service";

beforeAll(() => jaegerTracer);

describe("Teste da UsuarioService - método cpfCadastrado", () => {
  afterEach(() => {
    jest.resetAllMocks();
    mockingoose.resetAll();
  });

  it("Teste do método cpfCadastrado", async () => {
    mockingoose(UsuarioModel).toReturn("", "find");

    const result = await UsuarioService.cpfCadastrado("15494466060");

    expect(result).toBeDefined();
    expect(result).toEqual(false);
  });
});
