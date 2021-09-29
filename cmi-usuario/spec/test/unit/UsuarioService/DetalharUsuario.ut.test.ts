import mockingoose from "mockingoose";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import UsuarioModel, { IUsuario } from "../../../../src/model/Usuario";
import { UsuarioService } from "../../../../src/services/Usuario.service";
import { IDetalharUsuario } from "../../../../dist/model/interfaces/DetalharUsuario";

beforeAll(() => jaegerTracer);

describe("Teste da UsuarioService - detalharUsuario", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const body: IDetalharUsuario = require("../utils/jsons/detalharUsuario.json");

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const usuario: IUsuario = require("../utils/jsons/usuarioCadastrado.json");

  mockingoose(UsuarioModel).toReturn(body, "findOne");

  const service = new UsuarioService();

  it("Teste do método detalharUsuario", async () => {
    const result = await service.detalharUsuario(body);

    expect(result).toBeDefined();
    if (result) {
      expect(result.email).toEqual(usuario.email);
    }
  });
});
