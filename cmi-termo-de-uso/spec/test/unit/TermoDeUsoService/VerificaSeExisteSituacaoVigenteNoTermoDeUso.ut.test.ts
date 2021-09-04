import mockingoose from "mockingoose";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import TermoDeUso, { ITermoDeUso } from "../../../../src/model/TermoDeUso";
import { TermoDeUsoService } from "../../../../src/services/TermoDeUso.service";

beforeAll(() => jaegerTracer);

describe("Teste da TermoDeUsoService - verificaSeExisteSituacaoVigenteNoTermoDeUso", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
  const retorno: ITermoDeUso = require("../utils/jsons/retornoTermoDeUso.json");

  mockingoose(TermoDeUso).toReturn(retorno, "findOne");

  const service = new TermoDeUsoService();

  it("Teste do método verificaSeExisteSituacaoVigenteNoTermoDeUso", async () => {
    const result = await service.verificaSeExisteSituacaoVigenteNoTermoDeUso();

    expect(result).toBeDefined();
    if (result) {
      expect(result.versao).toEqual(retorno.versao);
      expect(result.conteudo).toEqual(retorno.conteudo);
      expect(result.criticidade).toEqual(retorno.criticidade);
    }
  });
});
