import { PublicFooter, PublicHeader } from '@/components/PublicSite';

export default function TermsPage() {
  return (
    <div className="public-page">
      <PublicHeader />
      <main className="public-content legal-copy">
        <section className="public-title">
          <p className="eyebrow">Terms</p>
          <h1>Terms of Service</h1>
          <p>Effective May 12, 2026.</p>
        </section>
        <section className="panel legal-panel">
          <h2>Service scope</h2>
          <p>The application provides an API console and proxy layer for virtual try-on workflows built around IDM-VTON.</p>
          <h2>Usage policy</h2>
          <p>Free keys are limited to 10 counted requests. Workloads beyond the intended trial level may require paid access.</p>
          <h2>Launch readiness note</h2>
          <p>This is a product-ready frontend template, but business-specific liability, billing, refund, and acceptable-use language should be finalized before public release.</p>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
