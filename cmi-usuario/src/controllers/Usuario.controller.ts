import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { IUsuario } from "../model/Usuario";
import { ErroSQL } from "../errors/erro.sql";
import { UsuarioService } from "../services/Usuario.service";
import { ICoordenadas } from "../model/interfaces/Coordenadas";
import { ICadastroUsuario } from "../model/interfaces/CadastroUsuario";
import { IDetalharUsuario } from "../model/interfaces/DetalharUsuario";
import { IInputTermoDeUsoApi } from "../model/interfaces/InputTermoDeUsoApi";
import { IDadosDoDispositivo } from "../model/interfaces/DadosDoDispositivo";
import { IRetornoUpdateUsuarioModel } from "../model/interfaces/RetornoUpdateUsuarioModel";
import { IUsuarioAssinaturaTermoDeUso } from "../model/interfaces/UsuarioAssinaturaTermoDeUso";
import { IRetornoPassageiroAssinaturaTermoDeUso } from "../model/interfaces/RetornoPassageiroAssinaturaTermoDeUso";

@traceable()
export class UsuarioController {
    @setTagSpan("UsuarioController")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private tagParaTracer: any;

    private service: UsuarioService;

    constructor({ service = new UsuarioService() }) { this.service = service; }

    public async cadastrarUsuario(body: ICadastroUsuario): Promise<IUsuario> {
      return this.service.cadastrarUsuario(body);
    }

    public async retornaDadosUsuario(idUsuario: string): Promise<IUsuario | ErroSQL> {
      return this.service.retornaDadosUsuario(idUsuario);
    }

    public async detalharUsuario(body: IDetalharUsuario): Promise<IUsuario | ErroSQL> {
      return this.service.detalharUsuario(body);
    }

    public async assinaturaTermoDeUso(
      body: IInputTermoDeUsoApi,
      dadosDoDispositivo: IDadosDoDispositivo,
      coordenadas: ICoordenadas,
    ): Promise<IRetornoUpdateUsuarioModel> {
      return this.service.assinaturaTermoDeUso(body, dadosDoDispositivo, coordenadas);
    }

    public async usuarioAssinaturaTermoDeUso(body: IUsuarioAssinaturaTermoDeUso): Promise<IRetornoPassageiroAssinaturaTermoDeUso> {
      return this.service.usuarioAssinaturaTermoDeUso(body);
    }
}
