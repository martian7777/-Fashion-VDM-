import { Mail, MessageSquare, Phone } from 'lucide-react';
import { PublicFooter, PublicHeader } from '@/components/PublicSite';

export default function ContactPage() {
  return (
    <div className="public-page">
      <PublicHeader />
      <main className="public-content">
        <section className="public-title">
          <p className="eyebrow">Contact</p>
          <h1>Talk about access, pricing, or deployment.</h1>
          <p>This page is ready for wiring to your preferred form backend or CRM endpoint.</p>
        </section>
        <section className="contact-grid">
          <form className="panel contact-form">
            <label className="field">
              <span>Name</span>
              <input className="input" type="text" placeholder="Your name" />
            </label>
            <label className="field">
              <span>Email</span>
              <input className="input" type="email" placeholder="you@company.com" />
            </label>
            <label className="field">
              <span>Message</span>
              <textarea className="textarea" placeholder="Tell us what you want to build." />
            </label>
            <button type="button" className="btn btn-primary">Send inquiry</button>
          </form>
          <div className="contact-side">
            <article className="panel public-info-card">
              <Mail size={22} />
              <h2>Email</h2>
              <p>sales@example.com</p>
            </article>
            <article className="panel public-info-card">
              <Phone size={22} />
              <h2>Commercial</h2>
              <p>Discuss paid access and larger quotas.</p>
            </article>
            <article className="panel public-info-card">
              <MessageSquare size={22} />
              <h2>Support</h2>
              <p>Use the dashboard and docs for developer workflow questions.</p>
            </article>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
