import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { ITermoDeUso } from "../../../../src/model/TermoDeUso";
import { TermoDeUsoService } from "../../../../src/services/TermoDeUso.service";

beforeAll(() => jaegerTracer);

describe("Teste do TermoDeUsoService", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const retorno: ITermoDeUso = require("../utils/jsons/retornoTermoDeUso.json");

  const mockAxios = new MockAdapter(axios);
  mockAxios.onPost().reply(200, retorno);

  it("Teste do método retornaTermoDeUsoSituacaoVigente", async () => {
    const result = await TermoDeUsoService.retornaTermoDeUsoSituacaoVigente();

    expect(result).toBeDefined();
    // eslint-disable-next-line no-underscore-dangle
    expect(result._id).toBe(retorno._id);
    expect(result.conteudo).toBe(retorno.conteudo);
    expect(result.criticidade).toBe(retorno.criticidade);
    expect(result.estadoTermoDeUso).toBe(retorno.estadoTermoDeUso);
  });
});
