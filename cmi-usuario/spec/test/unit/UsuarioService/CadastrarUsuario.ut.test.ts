import mockingoose from "mockingoose";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import UsuarioModel, { IUsuario } from "../../../../src/model/Usuario";
import { UsuarioService } from "../../../../src/services/Usuario.service";
import { ICadastroUsuario } from "../../../../src/model/interfaces/CadastroUsuario";

beforeAll(() => jaegerTracer);

describe("Teste da UsuarioService - cadastrarUsuario", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const body: ICadastroUsuario = require("../utils/jsons/cadastrarUsuario.json");

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const usuario: IUsuario = require("../utils/jsons/usuarioCadastrado.json");

  mockingoose(UsuarioModel).toReturn("", "find");
  mockingoose(UsuarioModel).toReturn(usuario, "save");

  const service = new UsuarioService();

  it("Teste do método cadastrarUsuario", async () => {
    const result = await service.cadastrarUsuario(body);

    expect(result).toBeDefined();
    if (result) {
      expect(result.nome).toEqual(usuario.nome);
      expect(result.email).toEqual(usuario.email);
      expect(result.numeroTelefoneCelular).toEqual(usuario.numeroTelefoneCelular);
    }
  });
});
