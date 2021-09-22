import mockingoose from "mockingoose";
import { ErroSQL } from "../../../../src/errors/erro.sql";
import Usuario from "../../../../src/model/Usuario";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { UsuarioService } from "../../../../src/services/Usuario.service";
import { ICoordenadas } from "../../../../src/model/interfaces/Coordenadas";
import { IDadosDoDispositivo } from "../../../../src/model/interfaces/DadosDoDispositivo";
import { IInputTermoDeUsoApi } from "../../../../src/model/interfaces/InputTermoDeUsoApi";

beforeAll(() => jaegerTracer);

describe("Teste da UsuarioService - assinaturaTermoDeUso com erro ao buscar o usuário mci informado", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const body: IInputTermoDeUsoApi = require("../utils/jsons/inputBodyTermoDeUsoApi.json");

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const coordenadas: ICoordenadas = require("../utils/jsons/inputHeadersCoordenadas.json");

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const dadosDoDispositivo: IDadosDoDispositivo = require("../utils/jsons/inputHeadersDadosDoDispositivo.json");

  mockingoose(Usuario).toReturn(null, "findOne");

  const service = new UsuarioService();

  it("Teste do método assinaturaTermoDeUso com erro ao buscar o usuário informado", async () => {
    try {
      await service.assinaturaTermoDeUso(body, dadosDoDispositivo, coordenadas);
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
