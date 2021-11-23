import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { IPassageiro } from "../model/Passageiro";
import { PassageiroService } from "../services/Passageiro.service";
import { IVinculoPassageiro } from "../model/interfaces/VinculoPassageiro";

@traceable()
export class PassageiroController {
  @setTagSpan("PassageiroController")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tagParaTracer: any;

  private service: PassageiroService;

  constructor({ service = new PassageiroService() }) { this.service = service; }

  public async vinculoPassageiro(body: Array<IVinculoPassageiro>): Promise<Array<IPassageiro | undefined>> {
    return this.service.vinculoPassageiro(body);
  }
}
