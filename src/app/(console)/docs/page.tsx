import { BookOpen, Code2, LockKeyhole, ServerCog } from 'lucide-react';

export default function DocsPage() {
  return (
    <main className="dashboard-shell">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Docs</p>
          <h1>Everything a developer needs to call the gateway correctly.</h1>
          <p className="lede">
            Authentication, quota behavior, endpoint expectations, and a production-shaped curl example live together here.
          </p>
        </div>
      </section>

      <section className="docs-grid">
        <article className="panel doc-card">
          <LockKeyhole size={20} />
          <h2>Authentication</h2>
          <p>Send `Authorization: Bearer &lt;YOUR_API_KEY&gt;` on every request.</p>
        </article>
        <article className="panel doc-card">
          <ServerCog size={20} />
          <h2>Quota</h2>
          <p>Free keys return `429` after 10 counted requests.</p>
        </article>
        <article className="panel doc-card">
          <BookOpen size={20} />
          <h2>Payload shape</h2>
          <p>Use a Gradio-style `data` array matching the IDM-VTON `tryon` endpoint.</p>
        </article>
        <article className="panel doc-card">
          <Code2 size={20} />
          <h2>Route</h2>
          <p>`POST /api/v1/generate-tryon` proxies the request upstream.</p>
        </article>
      </section>

      <section className="panel code-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Example</p>
            <h2>curl</h2>
          </div>
        </div>
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
