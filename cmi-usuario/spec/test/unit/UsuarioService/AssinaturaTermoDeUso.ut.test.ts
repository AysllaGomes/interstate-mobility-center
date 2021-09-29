import axios from "axios";
import mockingoose from "mockingoose";
import MockAdapter from "axios-mock-adapter";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { ITermoDeUso } from "../../../../src/model/TermoDeUso";
import Usuario, { IUsuario } from "../../../../src/model/Usuario";
import { UsuarioService } from "../../../../src/services/Usuario.service";
import { ICoordenadas } from "../../../../src/model/interfaces/Coordenadas";
import { IInputTermoDeUsoApi } from "../../../../src/model/interfaces/InputTermoDeUsoApi";
import { IDadosDoDispositivo } from "../../../../src/model/interfaces/DadosDoDispositivo";
import { IRetornoUpdateUsuarioModel } from "../../../../src/model/interfaces/RetornoUpdateUsuarioModel";

beforeAll(() => jaegerTracer);

describe("Teste da UsuarioService - assinaturaTermoDeUso", () => {
  afterEach(() => { jest.resetAllMocks(); });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const retorno: ITermoDeUso = require("../utils/jsons/retornoTermoDeUso.json");

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const idUsuario: IInputTermoDeUsoApi = require("../utils/jsons/inputBodyTermoDeUsoApi.json");

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const usuario: IUsuario = require("../utils/jsons/retornoDadosUsuario.json");

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const coordenadas: ICoordenadas = require("../utils/jsons/inputHeadersCoordenadas.json");

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const dadosDoDispositivo: IDadosDoDispositivo = require("../utils/jsons/inputHeadersDadosDoDispositivo.json");

  mockingoose(Usuario).toReturn(idUsuario, "findOne");

  const mockAxios = new MockAdapter(axios);
  mockAxios.onPost().reply(200, retorno);

  mockingoose(Usuario).toReturn(usuario, "findOneAndUpdate");

  const service = new UsuarioService();

  it("Teste do método assinaturaTermoDeUso", async () => {
    const result: IRetornoUpdateUsuarioModel = await service.assinaturaTermoDeUso(idUsuario, dadosDoDispositivo, coordenadas);
    expect(result).toBeUndefined();
  });
});
