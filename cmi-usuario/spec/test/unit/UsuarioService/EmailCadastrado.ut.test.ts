import mockingoose from "mockingoose";
import UsuarioModel from "../../../../src/model/Usuario";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { UsuarioService } from "../../../../src/services/Usuario.service";

beforeAll(() => jaegerTracer);

describe("Teste da UsuarioService - método emailCadastrado", () => {
  afterEach(() => {
    jest.resetAllMocks();
    mockingoose.resetAll();
  });

  it("Teste do método emailCadastrado", async () => {
    mockingoose(UsuarioModel).toReturn("", "find");

    const result = await UsuarioService.emailCadastrado("mail@mail.com");

    expect(result).toBeDefined();
    expect(result).toEqual(false);
  });
});
