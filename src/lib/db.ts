import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!);

export async function getUptimeStats(hours: number) {
  const [row] = await sql`
    select
      round(100.0 * sum(case when success then 1 else 0 end) / count(*), 2) as uptime_percent,
      count(*) as total_checks,
      round(avg(latency_ms) filter (where success)) as avg_latency_ms
    from health_checks
    where checked_at > now() - (interval '1 hour' * ${hours})
  `;
  return row;
}

export async function getLatestCheck() {
  const [row] = await sql`
    select success, checked_at, latency_ms
    from health_checks
    order by checked_at desc
    limit 1
  `;
  return row;
}
