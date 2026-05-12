import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BarChart3, KeyRound, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { PublicFooter, PublicHeader } from '@/components/PublicSite';

export default function LandingPage() {
  return (
    <div className="public-page">
      <PublicHeader />
      <main>
        <section className="landing-hero">
          <Image
            src="/landing-hero.png"
            alt="Fashion-tech studio using virtual try-on previews"
            fill
            priority
            className="hero-image"
          />
          <div className="hero-overlay" />
          <div className="landing-copy">
            <p className="eyebrow">Virtual Try-On Infrastructure</p>
            <h1>IDM-VTON API</h1>
            <p>
              Launch a quota-aware virtual try-on service with developer keys, usage visibility, and a clean upgrade path from free experimentation to paid traffic.
            </p>
            <div className="button-row">
              <Link href="/dashboard" className="btn btn-primary">
                Open dashboard
                <ArrowRight size={18} />
              </Link>
              <Link href="/docs" className="btn btn-secondary">Read docs</Link>
            </div>
          </div>
        </section>

        <section className="public-band feature-band">
          <article>
            <KeyRound size={22} />
            <h2>API key control</h2>
            <p>Create, inspect, copy, and revoke developer credentials from the console.</p>
          </article>
          <article>
            <Zap size={22} />
            <h2>Free quota enforcement</h2>
            <p>Keys ship with 10 trial requests and return `429` once the allowance is exhausted.</p>
          </article>
          <article>
            <BarChart3 size={22} />
            <h2>Usage visibility</h2>
            <p>Review successful calls, upstream failures, and conversion-worthy demand pressure.</p>
          </article>
        </section>

        <section className="public-band split-public">
          <div>
            <p className="eyebrow">Product Fit</p>
            <h2>Built for teams turning try-on into a product, not a demo.</h2>
            <p>
              The frontend now mirrors a real SaaS motion: public site, developer workspace, billing narrative, docs, and an API playground that actually executes requests.
            </p>
          </div>
          <div className="public-callout">
            <ShieldCheck size={22} />
            <strong>Operational by default</strong>
            <p>Dashboard routes stay separate from the public site while using the same product language and quota logic.</p>
          </div>
        </section>

        <section className="public-band conversion-band">
          <div>
            <Sparkles size={24} />
            <h2>Start with free requests. Convert when traffic becomes real.</h2>
          </div>
          <Link href="/playground" className="btn btn-primary">Open playground</Link>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
