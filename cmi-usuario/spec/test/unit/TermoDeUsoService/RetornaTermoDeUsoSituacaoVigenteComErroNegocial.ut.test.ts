import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { ErroSQL } from "../../../../src/errors/erro.sql";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { TermoDeUsoService } from "../../../../src/services/TermoDeUso.service";

beforeAll(() => jaegerTracer);

describe("Teste do TermoDeUsoService", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockAxios = new MockAdapter(axios);
  mockAxios.onPost().reply(500, null);

  it("Teste do método retornaTermoDeUsoSituacaoVigente com erro negocial", async () => {
    try {
      await TermoDeUsoService.retornaTermoDeUsoSituacaoVigente();
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
