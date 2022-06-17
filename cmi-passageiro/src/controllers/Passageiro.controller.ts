import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { IPassageiro } from "../model/Passageiro";
import { PassageiroService } from "../services/Passageiro.service";
import { IVinculoPassageiro } from "../model/interfaces/VinculoPassageiro";
import { IInputDesativarViagem } from "../model/interfaces/InputDesativarViagem";
import { IInputDetalhamentoViagem } from "../model/interfaces/InputDetalhamentoViagem";
import { IOutputListarViagensVinculadasAoUsario } from "../model/interfaces/OutputListarViagensVinculadasAoUsario";

@traceable()
export class PassageiroController {
  @setTagSpan("PassageiroController")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tagParaTracer: any;

  private service: PassageiroService;

  constructor({ service = new PassageiroService() }) { this.service = service; }

  public async vinculoPassageiro(body: IVinculoPassageiro): Promise<IPassageiro | undefined> {
    return this.service.vinculoPassageiro(body);
  }

  public async listarViagensVinculadoAoUsuario(body: IInputDetalhamentoViagem): Promise<Array<IOutputListarViagensVinculadasAoUsario>> {
    return this.service.listarViagensVinculadoAoUsuario(body);
  }

  public async desativar(body: IInputDesativarViagem): Promise<IPassageiro | null> {
    return this.service.desativar(body);
  }
}
