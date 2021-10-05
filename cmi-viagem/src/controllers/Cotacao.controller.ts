import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { CotacaoService } from "../services/Cotacao.service";
import { IRealizaCotacao } from "../model/interfaces/RealizaCotacao";
import { IRetornaCotacao } from "../model/interfaces/RetornaCotacao";

@traceable()
export class CotacaoController {
  @setTagSpan("CotacaoController")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tagParaTracer: any;

  private service: CotacaoService;

  constructor({ service = new CotacaoService() }) { this.service = service; }

  public async retornaMelhorCotacao(body: IRealizaCotacao): Promise<IRetornaCotacao | undefined> {
    return this.service.retornaMelhorCotacao(body);
  }
}
