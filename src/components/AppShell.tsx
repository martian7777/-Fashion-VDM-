import Link from 'next/link';
import { Activity, BookOpen, CreditCard, KeyRound, LayoutDashboard, Sparkles } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/keys', label: 'API Keys', icon: KeyRound },
  { href: '/usage', label: 'Usage', icon: Activity },
  { href: '/billing', label: 'Billing', icon: CreditCard },
  { href: '/playground', label: 'Playground', icon: Sparkles },
  { href: '/docs', label: 'Docs', icon: BookOpen },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-frame">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">IV</div>
          <div>
            <strong>IDM-VTON</strong>
            <span>API Console</span>
          </div>
        </div>

        <nav className="side-nav" aria-label="Primary">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="nav-link">
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-note">
          <span>Free quota</span>
          <strong>10 requests per key</strong>
          <p>Paid access is positioned for 30+ request workloads.</p>
        </div>
      </aside>

      <div className="workspace">
        <header className="workspace-header">
          <div>
            <p className="eyebrow">Virtual Try-On Platform</p>
            <strong>Operations workspace</strong>
          </div>
          <div className="header-meta">
            <span>Model</span>
            <strong>IDM-VTON</strong>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
