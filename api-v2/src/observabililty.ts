process.env.OTEL_SERVICE_NAME='finance-api';
process.env.OTEL_RESOURCE_ATTRIBUTES='deployment.environment=prod,service.version=1.0.0';

import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';

import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { context } from '@opentelemetry/api';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';

context.setGlobalContextManager(new AsyncLocalStorageContextManager());

function withJitter(baseMs: number, jitterRatio = 0.3) {
  const delta = baseMs * jitterRatio;
  return Math.floor(baseMs - delta + Math.random() * (2 * delta));
}

const metricExporter = new OTLPMetricExporter({
  // Example: http://localhost:4318/v1/metrics
  url: `${process.env.OTEL_EXPORTER_OTLP_ENDPOINT}/otlp/v1/metrics`,
  // headers: { Authorization: `Bearer ${process.env.INGEST_TOKEN}` }, // if needed
  headers: {
    'Content-Type': 'application/x-protobuf',
    'X-Scope-OrgID': 'brett'
  },
});

const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: withJitter(10_000, 0.3),
  exportTimeoutMillis: 5_000,
});

const sdk = new NodeSDK({
  // traceExporter: exporter,
  metricReader,
  instrumentations: [
    new HttpInstrumentation(),
    // new ExpressInstrumentation(),
    getNodeAutoInstrumentations()
  ],
});

export function runObservability(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      sdk.start();
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
