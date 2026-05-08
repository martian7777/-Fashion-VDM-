import { getApiKeys, createApiKey, deleteApiKey } from './actions';
import { Key, Trash2, Plus, Terminal } from 'lucide-react';
import CopyButton from '@/components/CopyButton';

export default async function Dashboard() {
  const apiKeys = await getApiKeys();

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl">Fashion-VDM Developer Dashboard</h1>
      </div>

      <div className="card mb-8">
        <h2 className="text-xl mb-4">Generate New API Key</h2>
        <form action={createApiKey} className="flex gap-4 items-center">
          <input
            type="text"
            name="name"
            placeholder="Key Name (e.g., Production App)"
            className="input"
            required
            autoComplete="off"
          />
          <button type="submit" className="btn btn-primary">
            <Plus size={18} style={{ marginRight: '0.5rem' }} />
            Create Key
          </button>
        </form>
      </div>

      <div className="card mb-8">
        <h2 className="text-xl mb-4">Your API Keys</h2>
        {apiKeys.length === 0 ? (
          <p className="text-muted">You haven't generated any API keys yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>API Key</th>
                  <th>Created</th>
                  <th>Last Used</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td style={{ fontWeight: 500 }}>{key.name}</td>
                    <td style={{ fontFamily: 'monospace', display: 'flex', alignItems: 'center' }}>
                      {key.key.slice(0, 8)}...{key.key.slice(-4)}
                      <CopyButton text={key.key} />
                    </td>
                    <td className="text-muted">
                      {key.createdAt.toLocaleDateString()}
                    </td>
                    <td className="text-muted">
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
      </div>

      <div className="card" style={{ backgroundColor: 'var(--background)' }}>
        <h2 className="text-xl mb-4 flex items-center">
          <Terminal size={20} style={{ marginRight: '0.5rem' }} />
          How to use your API
        </h2>
        <p className="mb-4 text-muted">
          Use the API key to authenticate requests to the `/api/v1/generate-tryon` endpoint. Pass the key in the `Authorization` header as a Bearer token.
        </p>
        <pre style={{ background: 'var(--card)', padding: '1rem', borderRadius: '0.5rem', overflowX: 'auto', border: '1px solid var(--border)', fontSize: '0.9rem' }}>
<code>{`curl -X POST http://localhost:3000/api/v1/generate-tryon \\
  -H "Authorization: Bearer <YOUR_API_KEY>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image_url": "https://example.com/garment.jpg",
    "video_url": "https://example.com/person.mp4"
  }'`}</code>
        </pre>
      </div>
    </div>
  );
}
