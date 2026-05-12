import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

export function PublicHeader() {
  return (
    <header className="public-header">
      <Link href="/" className="public-brand">
        <span>IV</span>
        <strong>IDM-VTON API</strong>
      </Link>
      <nav className="public-nav" aria-label="Public">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>{item.label}</Link>
        ))}
      </nav>
      <Link href="/dashboard" className="btn btn-primary">Open dashboard</Link>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div>
        <strong>IDM-VTON API</strong>
        <p>Virtual try-on infrastructure with quota-aware developer access.</p>
      </div>
      <div className="footer-links">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>{item.label}</Link>
        ))}
      </div>
    </footer>
  );
}
