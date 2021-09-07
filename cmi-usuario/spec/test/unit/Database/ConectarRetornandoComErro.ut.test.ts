// eslint-disable-next-line no-unused-vars
import mongoose from "mongoose";
import Database from "../../../../src/config/database";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { environment } from "../../../../src/config/environment";
import { ConexaoMongoEnum } from "../../../../src/model/enums/ConexaoMongo.enum";

beforeAll(() => jaegerTracer);

jest.mock("mongoose", () => ({
  connect: jest.fn().mockResolvedValue(true),
}));

describe("Teste do serviço que se conecta ao bd", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("Teste MOCK do método conectar - retornando erro", async () => {
    environment.db.url = "";
    const result = await Database.conectar();

    expect(result).toBeDefined();
    expect(result).toBe(ConexaoMongoEnum.disconnected);
  });
});
