import { setTagSpan, traceable } from "jaeger-tracer-decorator";
import { LogService } from "../services/Log.service";
import { ILog } from "../model/Log";
import { IInputLogMobilidade } from "../model/interfaces/InputLogMobilidade";

@traceable()
export class LogController {
    @setTagSpan("LogController")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private tagParaTracer: any;

    private service: LogService;

    constructor({ service = new LogService() }) {
      this.service = service;
    }

    public async gerenciaLog(body: Array<IInputLogMobilidade>): Promise<Array<ILog>> {
      return this.service.gerenciaLog(body);
    }
}
