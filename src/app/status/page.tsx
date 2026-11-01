import { getUptimeStats, getLatestCheck } from '@/lib/db';


const SLO_TARGET_UPTIME = 99.5;

export default async function StatusPage() {
  const [last24h, last7d, last30d, latest] = await Promise.all([
    getUptimeStats(24),
    getUptimeStats(24 * 7),
    getUptimeStats(24 * 30),
    getLatestCheck(),
  ]);

  const isUp = latest?.success ?? false;

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: '32px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Seattle Signal Status</h1>

      <div
        style={{
          display: 'inline-block',
          padding: '6px 14px',
          borderRadius: 20,
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 24,
          background: isUp ? '#e6f4ea' : '#fce8e6',
          color: isUp ? '#1e7e34' : '#c5221f',
        }}
      >
        {isUp ? '🟢 Operational' : '🔴 Down'}
      </div>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, marginBottom: 12 }}>Uptime</h2>
        <UptimeRow label="Last 24 hours" stats={last24h} />
        <UptimeRow label="Last 7 days" stats={last7d} />
        <UptimeRow label="Last 30 days" stats={last30d} />
      </section>

      <p style={{ fontSize: 13, color: '#777' }}>
        SLO target: {SLO_TARGET_UPTIME}% uptime. This page reflects real automated
        checks run every 30 minutes, not simulated data.
      </p>
    </main>
  );
}

function UptimeRow({
  label,
  stats,
}: {
  label: string;
  stats: { uptime_percent: number | null; total_checks: number; avg_latency_ms: number | null };
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
      <span>{label}</span>
      <span>
        {stats.uptime_percent ?? '—'}% uptime · {stats.avg_latency_ms ?? '—'}ms avg · {stats.total_checks} checks
      </span>
    </div>
  );
}
