import mockingoose from "mockingoose";
import UsuarioModel from "../../../../src/model/Usuario";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { UsuarioService } from "../../../../src/services/Usuario.service";
import { ICadastroPassageiro } from "../../../../src/model/interfaces/CadastroPassageiro";

beforeAll(() => jaegerTracer);

describe("Teste da UsuarioService - cadastrarUsuario - e-mail já cadastrado", () => {
  afterEach(() => {
    jest.resetAllMocks();
    mockingoose.resetAll();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const body: ICadastroPassageiro = require("../utils/jsons/cadastrarUsuario.json");

  it("Teste do método emailCadastrado", async () => {
    mockingoose(UsuarioModel).toReturn("", "find");

    const result = await UsuarioService.emailCadastrado(body.email);

    expect(result).toBeDefined();
    expect(result).toEqual(false);
  });
});
