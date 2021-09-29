import mockingoose from "mockingoose";
import Usuario from "../../../../src/model/Usuario";
import { ErroSQL } from "../../../../src/errors/erro.sql";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { UsuarioService } from "../../../../src/services/Usuario.service";
import { IDetalharUsuario } from "../../../../dist/model/interfaces/DetalharUsuario";

beforeAll(() => jaegerTracer);

describe("Teste da UsuarioService - detalharUsuario com erro ao buscar o usuário informado", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const body: IDetalharUsuario = require("../utils/jsons/detalharUsuario.json");

  mockingoose(Usuario).toReturn(null, "findOne");

  const service = new UsuarioService();

  it("Teste do método detalharUsuario com erro ao buscar o usuário informado", async () => {
    try {
      await service.detalharUsuario(body);
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof ErroSQL) {
        expect(error.code).toBe("997");
        expect(error.statusCode).toBe(500);
        expect(error.name).toBe("ErroSQL");
      }
    }
  });
});
