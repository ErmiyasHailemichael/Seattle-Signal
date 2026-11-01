import postgres from 'postgres';

const url = process.env.HEALTH_CHECK_URL || 'http://localhost:3000/api/health';
const sql = postgres(process.env.DATABASE_URL);

const start = Date.now();
let success = false;
let errorMessage = null;

try {
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  success = response.ok;
  if (!response.ok) {
    errorMessage = `HTTP ${response.status}`;
  }
} catch (err) {
  errorMessage = err.message;
}

const latencyMs = Date.now() - start;

await sql`
  insert into health_checks (check_name, success, latency_ms, error_message)
  values ('homepage', ${success}, ${latencyMs}, ${errorMessage})
`;

console.log(`Check ${success ? 'passed' : 'failed'} in ${latencyMs}ms${errorMessage ? ' - ' + errorMessage : ''}`);

await sql.end();
process.exit(success ? 0 : 1);
