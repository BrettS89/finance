import { startTracing } from './tracing';

async function main() {
  await startTracing();     // 1) instrumentation is installed
  require('./index');       // 2) now run your real app entrypoint (same as node index.js)
}

main().catch((e) => {
  console.error('bootstrap failed', e);
  process.exit(1);
});
