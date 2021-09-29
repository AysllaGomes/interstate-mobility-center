import { NextFunction, Request, Response } from "express";
import Database from "../../../../src/config/database";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { verificaConexaoMongoMiddleware } from "../../../../src/util/middleware";
import { ConexaoMongoEnum } from "../../../../src/model/enums/ConexaoMongo.enum";

beforeAll(() => jaegerTracer);

jest.mock("../../../../src/config/database", () => ({
  verificaConexao: jest.fn(),
  conectar: jest.fn(),
}));

describe("Teste do middleware que tenta a conexão com o mongo", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  let req: Request;
  let res: Response;

  const conectado: number = ConexaoMongoEnum.connected;

  (Database.verificaConexao as jest.Mocked<any>).mockResolvedValue(conectado);
  (Database.conectar as jest.Mocked<any>).mockResolvedValue(conectado);

  test("Teste MOCK do método verificaConexaoMongoMiddleware", async (next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const result = await verificaConexaoMongoMiddleware(req, res, next);

    expect(result).not.toBeDefined();
    expect(result).toBeUndefined();
  });
});
