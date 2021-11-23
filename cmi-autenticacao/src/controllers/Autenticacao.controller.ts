import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { IHealthServices } from "../model/interfaces/HealthServices";
import { AutenticacaoService } from "../services/Autenticacao.service";

@traceable()
export class AutenticacaoController {
    @setTagSpan("AutenticacaoController")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private tagParaTracer: any;

    private service: AutenticacaoService;

    constructor({ service = new AutenticacaoService() }) { this.service = service; }

    public async token(nomeParceiro: string): Promise<string | undefined> {
      return this.service.retornaToken(nomeParceiro);
    }

    public async tokenParceiros(): Promise<{}> {
      return this.service.retornaTokenParceiros();
    }

    public async healthServices(): Promise<IHealthServices> {
      return this.service.healthServices();
    }
}

