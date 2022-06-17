import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { IPassageiro } from "../model/Passageiro";
import { PassageiroService } from "../services/Passageiro.service";
import { IVinculoPassageiro } from "../model/interfaces/VinculoPassageiro";
import { IInputDetalharViagem } from "../model/interfaces/InputDetalharViagem";
import { IInputDesativarViagem } from "../model/interfaces/InputDesativarViagem";
import { IOutputDetalharViagem } from "../model/interfaces/OutputDetalharViagem";
import { IOutputDesativarViagem } from "../model/interfaces/OutputDesativarViagem";
import { IInputListarViagensVincularAoUsario } from "../model/interfaces/InputListarViagensVincularAoUsario";
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

  public async listarViagensVinculadoAoUsuario(body: IInputListarViagensVincularAoUsario): Promise<Array<IOutputListarViagensVinculadasAoUsario>> {
    return this.service.listarViagensVinculadoAoUsuario(body);
  }

  public async detalharViagem(body: IInputDetalharViagem): Promise<IOutputDetalharViagem> {
    return this.service.detalharViagem(body);
  }

  public async desativar(body: IInputDesativarViagem): Promise<IOutputDesativarViagem> {
    return this.service.desativar(body);
  }
}
