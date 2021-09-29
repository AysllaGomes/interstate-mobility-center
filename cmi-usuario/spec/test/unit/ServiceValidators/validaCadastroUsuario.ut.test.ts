import mockingoose from "mockingoose";
import { jaegerTracer } from "../utils/funcoes/JaegerTracer";
import { ServiceValidator } from "../../../../src/validators/Service.validator";
import { ICadastroUsuario } from "../../../../src/model/interfaces/CadastroUsuario";

beforeAll(() => jaegerTracer);

describe("Teste da ServiceValidators - método validaCadastroUsuario", () => {
  afterEach(() => {
    jest.resetAllMocks();
    mockingoose.resetAll();
  });

  it("Teste do método validaCadastroUsuario", async () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const body: ICadastroUsuario = require("../utils/jsons/cadastrarUsuario.json");

    const serviceValidator = new ServiceValidator();
    const result = await serviceValidator.validaCadastroUsuario(body);

    expect(result.value).toBeDefined();
    expect(result.value).toHaveProperty("cpf");
    expect(result.value).toHaveProperty("nome");
    expect(result.value).toHaveProperty("email");
    expect(result.value).toHaveProperty("dataDeNascimento");
    expect(result.value).toHaveProperty("numeroTelefoneCelular");
  });
});
