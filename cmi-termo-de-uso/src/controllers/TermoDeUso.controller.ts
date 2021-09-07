import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { ErroSQL } from "../errors/erro.sql";
import { TermoDeUsoService } from "../services/TermoDeUso.service";
import { IAberturaTermoDeUso } from "../model/interfaces/AberturaTermoDeUso";
import { IDetalharTermoDeUso } from "../model/interfaces/DetalharTermoDeUso";
import { TermoDeUsoInterface } from "../model/interfaces/TermoDeUsoInterface";

@traceable()
export class TermoDeUsoController {
  @setTagSpan("TermoDeUsoController")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private tagParaTracer: any;

  private service: TermoDeUsoService;

  constructor({ service = new TermoDeUsoService() }) { this.service = service; }

  public async aberturaTermoDeUso(termoDeUso: IAberturaTermoDeUso): Promise<TermoDeUsoInterface> {
    return this.service.aberturaTermoDeUso(termoDeUso);
  }

  public async detalharTermoDeUso(body: IDetalharTermoDeUso): Promise<TermoDeUsoInterface | undefined> {
    return this.service.detalharTermoDeUso(body);
  }

  public async verificaSeExisteSituacaoVigenteNoTermoDeUso(): Promise<TermoDeUsoInterface | ErroSQL> {
    return this.service.verificaSeExisteSituacaoVigenteNoTermoDeUso();
  }
}
