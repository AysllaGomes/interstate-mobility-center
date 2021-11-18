import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { FaturaService } from "../services/Fatura.service";
import { IAberturaFatura } from "../model/interfaces/AberturaFatura";
import { IFaturaContratoMobilidade } from "../model/FaturaContratoMobilidade";

@traceable()
export class FaturaController {
  @setTagSpan("FaturaController")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tagParaTracer: any;

  private service: FaturaService;

  constructor({ service = new FaturaService() }) { this.service = service; }

  public async aberturaFatura(body: IAberturaFatura): Promise<IFaturaContratoMobilidade | undefined> {
    return this.service.aberturaFatura(body);
  }
}
