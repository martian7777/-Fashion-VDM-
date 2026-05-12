import Link from 'next/link';
import { Activity, ArrowRight, CreditCard, KeyRound, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { getApiKeys, getDashboardSummary, getRecentUsage, getUsageBreakdown } from './actions';

export default async function OverviewPage() {
  const [keys, summary, recentUsage, breakdown] = await Promise.all([
    getApiKeys(),
    getDashboardSummary(),
    getRecentUsage(),
    getUsageBreakdown(),
  ]);

  const newestKey = keys[0];

  return (
    <main className="dashboard-shell">
      <section className="page-hero split-hero">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Virtual try-on traffic, keys, and monetization in one workspace.</h1>
          <p className="lede">
            Monitor the IDM-VTON gateway, keep free usage capped, and move developers toward paid plans when request volume grows.
          </p>
          <div className="button-row">
            <Link href="/keys" className="btn btn-primary">
              <KeyRound size={18} />
              Manage keys
            </Link>
            <Link href="/playground" className="btn btn-secondary">
              <Sparkles size={18} />
              Open playground
            </Link>
          </div>
        </div>
        <div className="hero-status">
          <span>Latest access key</span>
          <strong>{newestKey?.name ?? 'No keys yet'}</strong>
          <p>{newestKey ? `${newestKey.remainingRequests} requests remaining` : 'Create a key to begin testing the gateway.'}</p>
        </div>
      </section>

      <section className="metrics-grid">
        <article className="metric-panel">
          <KeyRound size={20} />
          <span>Active API Keys</span>
          <strong>{summary.totalKeys}</strong>
        </article>
        <article className="metric-panel">
          <Activity size={20} />
          <span>Total Requests</span>
          <strong>{summary.totalRequests}</strong>
        </article>
        <article className="metric-panel">
          <Zap size={20} />
          <span>Free Requests Left</span>
          <strong>{summary.remainingFreeRequests}</strong>
        </article>
        <article className="metric-panel">
          <CreditCard size={20} />
          <span>Quota Blocks</span>
          <strong>{breakdown.quotaBlocks}</strong>
        </article>
      </section>

      <section className="overview-grid">
        <div className="panel stack">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Operations</p>
              <h2>Gateway health</h2>
            </div>
          </div>
          <div className="status-list">
            <div className="status-row">
              <ShieldCheck size={18} />
              <span>Successful upstream calls</span>
              <strong>{breakdown.successfulRequests}</strong>
            </div>
            <div className="status-row">
              <Activity size={18} />
              <span>Failed upstream calls</span>
              <strong>{breakdown.failedRequests}</strong>
            </div>
            <div className="status-row">
              <Zap size={18} />
              <span>Keys near free-limit exhaustion</span>
              <strong>{breakdown.keysNearLimit}</strong>
            </div>
          </div>
        </div>

        <div className="panel stack">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Recent Traffic</p>
              <h2>Latest requests</h2>
            </div>
            <Link href="/usage" className="text-link">
              View usage
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="compact-list">
            {recentUsage.length === 0 ? (
              <p className="muted-copy">No request activity has been recorded yet.</p>
            ) : recentUsage.slice(0, 5).map((entry) => (
              <div key={entry.id} className="compact-row">
                <div>
                  <strong>{entry.apiKey.name}</strong>
                  <span>{entry.createdAt.toLocaleString()}</span>
                </div>
                <span className={`status-pill status-${entry.status >= 400 ? 'error' : 'ok'}`}>{entry.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
