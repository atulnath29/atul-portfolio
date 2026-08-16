import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiArrowUp } from 'react-icons/fi';

const SOCIAL = [
  { icon: <FiGithub />, href: 'https://github.com/atulnath29', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/atul-nath-2b1868422', label: 'LinkedIn' },
  { icon: <FiInstagram />, href: 'https://instagram.com/atul__nath__2909', label: 'Instagram' },
  { icon: <FiMail />, href: 'mailto:atulnath2909@gmail.com', label: 'Email' },
];

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container-custom">
        {/* FOOTER GRID — 3 cols on desktop, 1 col on mobile */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: '40px',
            marginBottom: '40px',
          }}
        >
          {/* BRAND */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.15rem', marginBottom: '14px' }}>
              <span style={{ color: 'var(--accent-blue)', fontFamily: 'monospace', fontSize: '1.3rem' }}>&lt;/&gt;</span>
              Atul Nath
            </div>
            <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '280px' }}>
              Crafting digital experiences with passion, precision, and a touch of magic.
            </p>
            <div
              className="footer-social-row"
              style={{ display: 'flex', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}
            >
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="social-link" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>Quick Links</h4>
            <div
              className="footer-quick-links"
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', transition: 'color 0.2s', minHeight: '24px' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent-blue)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* CONTACT QUICK */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>Reach Me</h4>
            <div
              className="footer-reach-me"
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <a href="mailto:atulnath2909@gmail.com"
                style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', wordBreak: 'break-all' }}>
                atulnath2909@gmail.com
              </a>
              <a href="tel:+919691686473" style={{ fontSize: '0.87rem', color: 'var(--text-secondary)' }}>
                +91 9691686473
              </a>
              <span style={{ fontSize: '0.87rem', color: 'var(--text-secondary)' }}>Sehore, M.P., India</span>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="footer-bottom-bar"
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            © 2026 Atul Nath. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="back-to-top"
            aria-label="Back to top"
            style={{ position: 'static' }}
          >
            <FiArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
