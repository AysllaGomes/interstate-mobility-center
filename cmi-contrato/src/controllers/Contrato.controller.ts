import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { IContrato } from "../model/Contrato";
import { ContratoService } from "../services/Contrato.service";
import { IAberturaContrato } from "../model/interfaces/AberturaContrato";

@traceable()
export class ContratoController {
  @setTagSpan("ContratoController")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tagParaTracer: any;

  private service: ContratoService;

  constructor({ service = new ContratoService() }) { this.service = service; }

  public async abertura(contrato: IAberturaContrato): Promise<IContrato> {
    return this.service.abertura(contrato);
  }
}
