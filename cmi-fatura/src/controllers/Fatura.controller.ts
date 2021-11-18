import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { IFatura } from "../model/Fatura";
import { FaturaService } from "../services/Fatura.service";
import { IAberturaFatura } from "../model/interfaces/AberturaFatura";
import { IEncerrarFatura } from "../model/interfaces/EncerrarFatura";

@traceable()
export class FaturaController {
  @setTagSpan("FaturaController")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tagParaTracer: any;

  private service: FaturaService;

  constructor({ service = new FaturaService() }) { this.service = service; }

  public async aberturaFatura(body: IAberturaFatura): Promise<IFatura | undefined> {
    return this.service.aberturaFatura(body);
  }

  public async encerrarFatura(body: IEncerrarFatura): Promise<IFatura | null> {
    return this.service.encerrarFatura(body);
  }
}
