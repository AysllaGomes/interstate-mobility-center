import mockingoose from "mockingoose";
import { ErroSQL } from "../../../../src/errors/erro.sql";
import TermoDeUso from "../../../../src/model/TermoDeUso";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { TermoDeUsoService } from "../../../../src/services/TermoDeUso.service";

beforeAll(() => jaegerTracer);

describe("Teste da TermoDeUsoService - verificaSeExisteSituacaoVigenteNoTermoDeUso", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  mockingoose(TermoDeUso).toReturn(null, "findOne");

  const service = new TermoDeUsoService();

  it("Teste do método verificaSeExisteSituacaoVigenteNoTermoDeUso - não achando o termo", async () => {
    try {
      await service.verificaSeExisteSituacaoVigenteNoTermoDeUso();
    } catch (error) {
      expect(error).toBeDefined();
      if (error instanceof ErroSQL) {
        expect(error.code).toBe("994");
        expect(error.statusCode).toBe(500);
        expect(error.name).toBe("ErroSQL");
      }
    }
  });
});
