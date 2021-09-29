import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { TipoApiEnum } from "../../../../src/model/enums/TipoApi.enum";
import { LogController } from "../../../../src/controllers/Log.controller";
import { CategoriaEnum } from "../../../../src/model/enums/Categoria.enum";
import { PlataformaEnum } from "../../../../src/model/enums/Plataforma.enum";
import { TipoProcessoEnum } from "../../../../src/model/enums/TipoProcesso.enum";
import { IInputLogMobilidade } from "../../../../src/model/interfaces/InputLogMobilidade";

beforeAll(() => jaegerTracer);

jest.mock("../../../../src/services/Log.service", () => {
  const LogServiceMock = {
    gerenciaLog: jest.fn().mockResolvedValue(true),
  };

  return { LogService: jest.fn(() => LogServiceMock) };
});

describe("Teste MOCK do método da controller que gerencia o log", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const logController = new LogController({});

  const body: Array<IInputLogMobilidade> = [
    {
      categoria: CategoriaEnum.CONSUMO_API,
      processo: {
        tipoProcesso: TipoProcessoEnum.APP,
        versao: "1.0.0",
        classe: "NomeDaClasse",
        metodo: "NomeDoMetodo",
      },
      usuarioLogado: "Joaozinho",
      tsDoConsumoDaApi: "2021-07-01T00:00:00.000Z",
      tipoApi: TipoApiEnum.DIRECTIONS,
      plataforma: PlataformaEnum.APP,
    },
  ];

  it("Teste MOCK do método gerenciaLog", async () => {
    const result = await logController.gerenciaLog(body);

    expect(result).toBeDefined();
    expect(result).toBe(true);
  });
});
