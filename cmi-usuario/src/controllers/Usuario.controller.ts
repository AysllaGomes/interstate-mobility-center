import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { UsuarioService } from "../services/Usuario.service";
import { ICadastroPassageiro } from "../model/interfaces/CadastroPassageiro";

@traceable()
export class UsuarioController {
    @setTagSpan("UsuarioController")
    private tagParaTracer: any;

    private service: UsuarioService;

    constructor({ service = new UsuarioService() }) {
      this.service = service;
    }

    public async cadastrarUsuario(body: ICadastroPassageiro): Promise<ICadastroPassageiro> {
      return this.service.cadastrarUsuario(body);
    }
}
