import mockingoose from "mockingoose";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { LogService } from "../../../../src/services/Log.service";
import { TipoApiEnum } from "../../../../src/model/enums/TipoApi.enum";
import { CategoriaEnum } from "../../../../src/model/enums/Categoria.enum";
import { PlataformaEnum } from "../../../../src/model/enums/Plataforma.enum";
import { TipoProcessoEnum } from "../../../../src/model/enums/TipoProcesso.enum";
import LogMobilidadeModel, { ILog } from "../../../../src/model/Log";
import { IInputLogMobilidade } from "../../../../src/model/interfaces/InputLogMobilidade";

beforeAll(() => jaegerTracer);

describe("Teste da LogService - gerenciaLog", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

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

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const retorno: ILog = {
    _id: "60e35438f311f20784b33f34",
    tsDeRegistroDoLog: new Date("2021-07-05T18:49:28.209Z"),
    categoria: CategoriaEnum.CONSUMO_API,
    processo: {
      tipoProcesso: TipoProcessoEnum.APP,
      versao: "1.0.0",
      classe: "NomeDaClasse",
      metodo: "NomeDoMetodo",
    },
    usuarioLogado: "Joaozinho",
    tsDoConsumoDaApi: new Date("2021-07-01T00:00:00.000Z"),
    tipoApi: TipoApiEnum.DIRECTIONS,
    plataforma: PlataformaEnum.APP,
    __v: 0,
  };

  const logService = new LogService();
  mockingoose(LogMobilidadeModel).toReturn(retorno, "save");

  it("Teste do método gerenciaLog", async () => {
    const result = await logService.gerenciaLog(body);

    expect(result).toBeDefined();

    result.forEach((objDoLog: ILog) => {
      // eslint-disable-next-line no-underscore-dangle
      expect(objDoLog.id).toBe(retorno._id);
      expect(objDoLog.tsDeRegistroDoLog).toBe(retorno.tsDeRegistroDoLog);
      expect(objDoLog.categoria).toBe(retorno.categoria);
      expect(objDoLog.processo).toBe(retorno.processo);
      expect(objDoLog.usuarioLogado).toBe(retorno.usuarioLogado);
      expect(objDoLog.tsDoConsumoDaApi).toBe(retorno.tsDoConsumoDaApi);
      expect(objDoLog.tipoApi).toBe(retorno.tipoApi);
      expect(objDoLog.plataforma).toBe(retorno.plataforma);
    });
  });
});
