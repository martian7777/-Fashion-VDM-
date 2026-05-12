import { PublicFooter, PublicHeader } from '@/components/PublicSite';

export default function PrivacyPage() {
  return (
    <div className="public-page">
      <PublicHeader />
      <main className="public-content legal-copy">
        <section className="public-title">
          <p className="eyebrow">Privacy</p>
          <h1>Privacy Policy</h1>
          <p>Effective May 12, 2026.</p>
        </section>
        <section className="panel legal-panel">
          <h2>What we store</h2>
          <p>API key records, key names, usage logs, request status codes, and timestamps needed to operate the dashboard and quota system.</p>
          <h2>What we do not define here</h2>
          <p>This template does not yet describe production hosting, third-party processors, retention periods, or legal contact details. Those should be finalized before launch.</p>
          <h2>Model traffic</h2>
          <p>Requests sent through the proxy may be forwarded to the configured IDM-VTON upstream provider for processing.</p>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
