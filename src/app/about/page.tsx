import { Cpu, Layers3, ShieldCheck } from 'lucide-react';
import { PublicFooter, PublicHeader } from '@/components/PublicSite';

export default function AboutPage() {
  return (
    <div className="public-page">
      <PublicHeader />
      <main className="public-content">
        <section className="public-title">
          <p className="eyebrow">About</p>
          <h1>Infrastructure for production-minded virtual try-on teams.</h1>
          <p>We focus on the operational layer around IDM-VTON: access, visibility, quota controls, and a clearer commercialization path.</p>
        </section>
        <section className="public-card-grid">
          <article className="panel public-info-card">
            <Cpu size={22} />
            <h2>Model gateway</h2>
            <p>The app proxies requests into the IDM-VTON try-on endpoint through one local API surface.</p>
          </article>
          <article className="panel public-info-card">
            <Layers3 size={22} />
            <h2>Product structure</h2>
            <p>Public marketing, dashboard workflows, docs, and billing positioning coexist cleanly.</p>
          </article>
          <article className="panel public-info-card">
            <ShieldCheck size={22} />
            <h2>Guardrails</h2>
            <p>Free usage is enforced server-side, not merely described in the UI.</p>
          </article>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
