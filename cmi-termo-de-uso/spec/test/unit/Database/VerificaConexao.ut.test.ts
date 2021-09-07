import Database from "../../../../src/config/database";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { ConexaoMongoEnum } from "../../../../src/model/enums/ConexaoMongo.enum";

beforeAll(() => jaegerTracer);

describe("Teste do serviço que retorna o estado da conexão com o bd", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Teste MOCK do método verificaConexao", async () => {
    const result = await Database.verificaConexao();

    expect(result).toBeDefined();
    expect(result).toBe(ConexaoMongoEnum.disconnected);
  });
});
