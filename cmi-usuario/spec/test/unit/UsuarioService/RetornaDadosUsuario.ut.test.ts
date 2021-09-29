import mockingoose from "mockingoose";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import UsuarioModel, { IUsuario } from "../../../../src/model/Usuario";
import { UsuarioService } from "../../../../src/services/Usuario.service";

beforeAll(() => jaegerTracer);

describe("Teste da UsuarioService - retornaDadosUsuario", () => {
  afterEach(() => {
    jest.resetAllMocks();
    mockingoose.resetAll();
  });

  it("Teste do método retornaDadosUsuario", async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const resultado: IUsuario = require("../utils/jsons/retornoDadosUsuario.json");

    mockingoose(UsuarioModel).toReturn(resultado, "findOne");

    const usuarioService = new UsuarioService();

    const result = await usuarioService.retornaDadosUsuario("1");

    expect(result).toBeDefined();
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("nome");
    expect(result).toHaveProperty("email");
    expect(result).toHaveProperty("numeroTelefoneCelular");
  });
});
