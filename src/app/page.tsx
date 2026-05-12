import { getApiKeys, getDashboardSummary, createApiKey, deleteApiKey } from './actions';
import { BarChart3, CreditCard, KeyRound, Plus, Terminal, Trash2, Zap } from 'lucide-react';
import CopyButton from '@/components/CopyButton';

export default async function Dashboard() {
  const [apiKeys, summary] = await Promise.all([
    getApiKeys(),
    getDashboardSummary(),
  ]);

  return (
    <main className="dashboard-shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">IDM-VTON API Control Center</p>
          <h1>Developer Dashboard</h1>
          <p className="lede">
            Create access keys, track generation volume, and keep free traffic inside the quota gate.
          </p>
        </div>
        <div className="plan-chip">
          <Zap size={18} />
          <span>Free keys include 10 requests</span>
        </div>
      </section>

      <section className="metrics-grid">
        <article className="metric-panel">
          <KeyRound size={20} />
          <span>Active API Keys</span>
          <strong>{summary.totalKeys}</strong>
        </article>
        <article className="metric-panel">
          <BarChart3 size={20} />
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
          <span>Exhausted Keys</span>
          <strong>{summary.exhaustedKeys}</strong>
        </article>
      </section>

      <section className="dashboard-grid">
        <div className="panel stack">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Access</p>
              <h2>Create API Key</h2>
            </div>
          </div>
          <form action={createApiKey} className="key-form">
            <input
              type="text"
              name="name"
              placeholder="Key name"
              className="input"
              required
              autoComplete="off"
            />
            <button type="submit" className="btn btn-primary">
              <Plus size={18} />
              Create Key
            </button>
          </form>
        </div>

        <div className="panel pricing-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Plans</p>
              <h2>Usage Policy</h2>
            </div>
          </div>
          <div className="plan-row">
            <span>Free</span>
            <strong>10 requests per key</strong>
          </div>
          <div className="plan-row">
            <span>Paid</span>
            <strong>Required for 30+ request workloads</strong>
          </div>
          <p className="muted-copy">
            The route enforces the free quota today. Billing can attach to the same plan field later without rewriting the key or usage model.
          </p>
        </div>
      </section>

      <section className="panel table-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Keys</p>
            <h2>API Key Inventory</h2>
          </div>
        </div>
        {apiKeys.length === 0 ? (
          <p className="muted-copy">No API keys exist yet.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>API Key</th>
                  <th>Plan</th>
                  <th>Usage</th>
                  <th>Created</th>
                  <th>Last Used</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td className="primary-cell">{key.name}</td>
                    <td>
                      <div className="key-cell">
                        <code>{key.key.slice(0, 8)}...{key.key.slice(-4)}</code>
                        <CopyButton text={key.key} />
                      </div>
                    </td>
                    <td><span className="badge">{key.plan}</span></td>
                    <td>
                      <div className="usage-cell">
                        <strong>{key.requestsUsed}/{key.quota}</strong>
                        <span>{key.remainingRequests} left</span>
                      </div>
                    </td>
                    <td className="muted-cell">{key.createdAt.toLocaleDateString()}</td>
                    <td className="muted-cell">
                      {key.lastUsed ? key.lastUsed.toLocaleDateString() : 'Never'}
                    </td>
                    <td>
                      <form action={deleteApiKey.bind(null, key.id)}>
                        <button type="submit" className="btn btn-danger" aria-label="Revoke key">
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel code-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">API</p>
            <h2 className="inline-heading">
              <Terminal size={20} />
              Generate a Try-On
            </h2>
          </div>
        </div>
        <p className="muted-copy">
          Send a Bearer key to `/api/v1/generate-tryon`. The body is forwarded to the IDM-VTON `tryon` endpoint as Gradio queue data.
        </p>
        <pre className="code-block">
<code>{`curl -X POST http://localhost:3000/api/v1/generate-tryon \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": [
      { "background": "human-image-payload", "layers": [], "composite": null },
      "garment-image-payload",
      "Short sleeve round neck t-shirt",
      true,
      false,
      30,
      42
    ]
  }'`}</code>
        </pre>
      </section>
    </main>
  );
}
