import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { ParceiroService } from "../services/Parceiro.service";

@traceable()
export class ParceiroController {
    @setTagSpan("ParceiroController")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private tagParaTracer: any;

    private service: ParceiroService;

    constructor({ service = new ParceiroService() }) { this.service = service; }

    public async retornaDadosDosParceiros(todosOsParceiros?: string): Promise<Array<object>> {
      return this.service.retornaDadosDosParceiros(todosOsParceiros);
    }

    public async retornaDadosDosParceirosComToken(): Promise<Array<object>> {
      return this.service.retornaDadosDosParceirosComToken();
    }
}

