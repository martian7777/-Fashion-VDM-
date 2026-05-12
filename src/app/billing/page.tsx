import { CreditCard, Landmark, Receipt, Sparkles } from 'lucide-react';

export default function BillingPage() {
  return (
    <main className="dashboard-shell">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Billing</p>
          <h1>Turn request pressure into a clear upgrade path.</h1>
          <p className="lede">
            The product language is already set: free keys cover the first 10 requests, while 30+ request workloads belong on paid access.
          </p>
        </div>
      </section>

      <section className="pricing-grid">
        <article className="panel plan-card">
          <span>Free</span>
          <strong>$0</strong>
          <p>For evaluation and integration testing.</p>
          <ul>
            <li>10 requests per key</li>
            <li>API dashboard access</li>
            <li>Quota enforcement</li>
          </ul>
        </article>
        <article className="panel plan-card featured">
          <span>Growth</span>
          <strong>Paid</strong>
          <p>For production developers exceeding trial demand.</p>
          <ul>
            <li>Designed for 30+ request workloads</li>
            <li>Upgradeable quota model</li>
            <li>Future Stripe entitlement hook</li>
          </ul>
        </article>
      </section>

      <section className="dashboard-grid">
        <div className="panel stack">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Roadmap</p>
              <h2>Billing modules to add next</h2>
            </div>
          </div>
          <div className="status-list">
            <div className="status-row">
              <CreditCard size={18} />
              <span>Checkout and payment method capture</span>
              <strong>Planned</strong>
            </div>
            <div className="status-row">
              <Receipt size={18} />
              <span>Invoices and usage receipts</span>
              <strong>Planned</strong>
            </div>
            <div className="status-row">
              <Landmark size={18} />
              <span>Plan-backed quota assignment</span>
              <strong>Schema ready</strong>
            </div>
          </div>
        </div>

        <div className="panel stack">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Positioning</p>
              <h2>Upgrade signal</h2>
            </div>
          </div>
          <div className="callout">
            <Sparkles size={20} />
            <div>
              <strong>30+ request workloads should convert.</strong>
              <p>That threshold is now reflected in the product UI so the next backend step can attach pricing without redesigning the frontend.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
