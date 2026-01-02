import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter(),
    instrumentations: [
        getNodeAutoInstrumentations({
            '@opentelemetry/instrumentation-fs': {
                enabled: false,
            },
            '@opentelemetry/instrumentation-pg': { enabled: true },
        }),
    ],
});

export function startTracing(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      sdk.start();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
