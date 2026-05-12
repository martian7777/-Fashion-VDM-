import { Plus, Trash2 } from 'lucide-react';
import CopyButton from '@/components/CopyButton';
import { createApiKey, deleteApiKey, getApiKeys } from '../../actions';

export default async function KeysPage() {
  const apiKeys = await getApiKeys();

  return (
    <main className="dashboard-shell">
      <section className="page-hero">
        <div>
          <p className="eyebrow">API Keys</p>
          <h1>Provision, inspect, and revoke developer access.</h1>
          <p className="lede">
            Every new key starts on the free tier with a 10-request allowance. The same surface can support paid entitlements later.
          </p>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel stack">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Create</p>
              <h2>New key</h2>
            </div>
          </div>
          <form action={createApiKey} className="key-form">
            <input className="input" type="text" name="name" placeholder="Production web app" required autoComplete="off" />
            <button type="submit" className="btn btn-primary">
              <Plus size={18} />
              Create key
            </button>
          </form>
        </div>

        <div className="panel stack">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Policy</p>
              <h2>Access defaults</h2>
            </div>
          </div>
          <div className="plan-row">
            <span>Initial plan</span>
            <strong>FREE</strong>
          </div>
          <div className="plan-row">
            <span>Quota</span>
            <strong>10 requests</strong>
          </div>
          <div className="plan-row">
            <span>Upgrade signal</span>
            <strong>30+ workload</strong>
          </div>
        </div>
      </section>

      <section className="panel table-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Inventory</p>
            <h2>Existing keys</h2>
          </div>
        </div>
        {apiKeys.length === 0 ? (
          <p className="muted-copy">No keys have been created yet.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Key</th>
                  <th>Plan</th>
                  <th>Usage</th>
                  <th>Created</th>
                  <th>Last used</th>
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
                    <td className="muted-cell">{key.lastUsed ? key.lastUsed.toLocaleDateString() : 'Never'}</td>
                    <td>
                      <form action={deleteApiKey.bind(null, key.id)}>
                        <button type="submit" className="btn btn-danger" aria-label="Delete key">
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
    </main>
  );
}
