import { IJaegerOptions, JaegerTracer } from "jaeger-tracer-decorator";

export function jaegerTracer(): void {
  const optionsJaeger: IJaegerOptions = {
    serviceName: "Server_Test",
    serviceVersion: "1.0.0",
    disable: true,
    sampler: {
      type: "const",
      param: 1,
    },
    reporter: {
      logSpans: true,
      agentHost: "localhost",
      agentPort: 6832,
    },
  };

  const myJaeger = new JaegerTracer(undefined, undefined, optionsJaeger);
  myJaeger.createNewTracer();
}
