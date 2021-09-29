import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { TipoApiEnum } from "../../../../src/model/enums/TipoApi.enum";
import { CategoriaEnum } from "../../../../src/model/enums/Categoria.enum";
import { PlataformaEnum } from "../../../../src/model/enums/Plataforma.enum";
import { ServiceValidator } from "../../../../src/validators/Service.validator";
import { TipoProcessoEnum } from "../../../../src/model/enums/TipoProcesso.enum";
import { IInputLogMobilidade } from "../../../../src/model/interfaces/InputLogMobilidade";

beforeAll(() => jaegerTracer);

describe("Teste da LogServiceValidator - validaInputLogMobilidade", () => {
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

  const serviceValidator = new ServiceValidator();

  it("Teste da validação do método validaInputLogMobilidade", async () => {
    const result = await serviceValidator.validaInputLogMobilidade(body);

    expect(result).toBeDefined();
    expect(result.value.categoria).toBe(body.categoria);
    expect(result.value.processo).toEqual(body.processo);
    expect(result.value.usuarioLogado).toBe(body.usuarioLogado);
    expect(result.value.tsDoConsumoDaApi).toBe(body.tsDoConsumoDaApi);
    expect(result.value.tipoApi).toBe(body.tipoApi);
    expect(result.value.plataforma).toBe(body.plataforma);
  });
});
