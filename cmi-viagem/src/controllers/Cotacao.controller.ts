import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { CotacaoService } from "../services/Cotacao.service";
import { IRealizaCotacao } from "../model/interfaces/RealizaCotacao";

@traceable()
export class CotacaoController {
  @setTagSpan("CotacaoController")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tagParaTracer: any;

  private service: CotacaoService;

  constructor({ service = new CotacaoService() }) {
    this.service = service;
  }

  public async retornaMelhorCotacao(req: IRealizaCotacao): Promise<any> {
    return this.service.retornaMelhorCotacao(req);
  }
}

