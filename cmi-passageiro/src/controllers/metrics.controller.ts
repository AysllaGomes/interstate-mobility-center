/* istanbul ignore file */
import Prometheus, { Counter, Summary } from "prom-client";
import { environment } from "../config/environment";
import { diffTimeInSeconds } from "../util/utils";

class Metric {
  public prometheus = Prometheus;

  private httpRequestsSecondsSummary = new Summary({
    name: "http_requests_seconds_summary",
    help: "request duration in milliseconds",
    labelNames: ["path", "status", "method", "appversion"],
  });

  private httpRequestsCounter = new Counter({
    name: "http_requests_counter",
    help: "Number of requests received",
    labelNames: ["path", "status", "method", "appversion"],
  });

  private httpResponsesCounter = new Counter({
    name: "http_responses_counter",
    help: "Number of responses sent",
    labelNames: ["path", "status", "method", "appversion"],
  });

  constructor() {
    if (environment.app.env !== "test") {
      this.prometheus.collectDefaultMetrics({ prefix: "dev_typescript_", timeout: 5000 });
    }
  }

  public observe(method: string, path: string, statusCode: number, start: [number, number]): void {
    path = path ? path.toLowerCase() : "";
    method = method.toLowerCase();

    const duracao = diffTimeInSeconds(start);

    const code = String(statusCode);

    this.httpRequestsSecondsSummary.labels(path, code, method, environment.app.version).observe(duracao);
    this.httpRequestsCounter.labels(path, code, method, environment.app.version).inc();
    this.httpResponsesCounter.labels(path, code, method, environment.app.version).inc();
  }
}

export const metrics = new Metric();
