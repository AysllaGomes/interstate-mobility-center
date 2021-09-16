import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { IUsuario } from "../model/Usuario";
import { ErroSQL } from "../errors/erro.sql";
import { UsuarioService } from "../services/Usuario.service";
import { ICadastroUsuario } from "../model/interfaces/CadastroUsuario";
import { IDetalharUsuario } from "../model/interfaces/DetalharUsuario";

@traceable()
export class UsuarioController {
    @setTagSpan("UsuarioController")
    private tagParaTracer: any;

    private service: UsuarioService;

    constructor({ service = new UsuarioService() }) {
      this.service = service;
    }

    public async cadastrarUsuario(body: ICadastroUsuario): Promise<IUsuario> {
      return this.service.cadastrarUsuario(body);
    }

    public async detalharUsuario(body: IDetalharUsuario): Promise<IUsuario | ErroSQL> {
      return this.service.detalharUsuario(body);
    }
}
