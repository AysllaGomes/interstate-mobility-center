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

describe("Teste da LogService - salvaLogNoBancoDeDados", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const body: IInputLogMobilidade = {
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
  };

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

  it("Teste do método salvaLogNoBancoDeDados", async () => {
    const result = await logService.salvaLogNoBancoDeDados(body);

    expect(result).toBeDefined();
    // eslint-disable-next-line no-underscore-dangle
    expect(result.id).toBe(retorno._id);
    expect(result.tsDeRegistroDoLog).toBe(retorno.tsDeRegistroDoLog);
    expect(result.categoria).toBe(retorno.categoria);
    expect(result.processo).toBe(retorno.processo);
    expect(result.usuarioLogado).toBe(retorno.usuarioLogado);
    expect(result.tsDoConsumoDaApi).toBe(retorno.tsDoConsumoDaApi);
    expect(result.tipoApi).toBe(retorno.tipoApi);
    expect(result.plataforma).toBe(retorno.plataforma);
  });
});
