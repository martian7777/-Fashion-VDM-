import { AlertTriangle, CheckCircle2, Gauge, TimerReset } from 'lucide-react';
import { getRecentUsage, getUsageBreakdown } from '../actions';

export default async function UsagePage() {
  const [recentUsage, breakdown] = await Promise.all([
    getRecentUsage(),
    getUsageBreakdown(),
  ]);

  return (
    <main className="dashboard-shell">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Usage</p>
          <h1>Read the demand signal before it becomes a billing problem.</h1>
          <p className="lede">
            This view tracks successful calls, upstream failures, and hard quota blocks returned by the protected proxy route.
          </p>
        </div>
      </section>

      <section className="metrics-grid">
        <article className="metric-panel">
          <CheckCircle2 size={20} />
          <span>Successful</span>
          <strong>{breakdown.successfulRequests}</strong>
        </article>
        <article className="metric-panel">
          <AlertTriangle size={20} />
          <span>Failures</span>
          <strong>{breakdown.failedRequests}</strong>
        </article>
        <article className="metric-panel">
          <Gauge size={20} />
          <span>Quota blocks</span>
          <strong>{breakdown.quotaBlocks}</strong>
        </article>
        <article className="metric-panel">
          <TimerReset size={20} />
          <span>Keys near limit</span>
          <strong>{breakdown.keysNearLimit}</strong>
        </article>
      </section>

      <section className="panel table-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Events</p>
            <h2>Recent request log</h2>
          </div>
        </div>
        {recentUsage.length === 0 ? (
          <p className="muted-copy">No requests have been recorded yet.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentUsage.map((entry) => (
                  <tr key={entry.id}>
                    <td className="primary-cell">{entry.apiKey.name}</td>
                    <td><span className="badge">{entry.apiKey.plan}</span></td>
                    <td><span className={`status-pill status-${entry.status >= 400 ? 'error' : 'ok'}`}>{entry.status}</span></td>
                    <td className="muted-cell">{entry.createdAt.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
