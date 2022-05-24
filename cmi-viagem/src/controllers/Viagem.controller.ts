import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { ViagemService } from "../services/Viagem.service";
import { IInputListarViagem } from "../model/interfaces/InputListarViagem";
import { IOutputListarViagem } from "../model/interfaces/OutputListarViagem";

@traceable()
export class ViagemController {
  @setTagSpan("ViagemController")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tagParaTracer: any;

  private service: ViagemService;

  constructor({ service = new ViagemService() }) { this.service = service; }

  public async listar(body: IInputListarViagem): Promise<Array<IOutputListarViagem>> {
    return this.service.listar(body);
  }
}
