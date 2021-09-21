import mockingoose from "mockingoose";
import UsuarioModel from "../../../../src/model/Usuario";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { UsuarioService } from "../../../../src/services/Usuario.service";
import { ICadastroUsuario } from "../../../../src/model/interfaces/CadastroUsuario";

beforeAll(() => jaegerTracer);

describe("Teste da service Passageiro - método cadastrarPassageiro", () => {
  afterEach(() => {
    jest.resetAllMocks();
    mockingoose.resetAll();
  });

  it("Teste do método existeRepeticoesProibidas", async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const body: ICadastroUsuario = require("../utils/jsons/cadastrarUsuario.json");

    mockingoose(UsuarioModel).toReturn("", "find");

    const result = await UsuarioService.existeRepeticoesProibidas(body);

    expect(result).toBeDefined();
    expect(result).toEqual(false);
  });
});
