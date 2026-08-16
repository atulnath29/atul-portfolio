import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ isDark, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      // Determine active section
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="navbar"
        style={{
          boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
        }}
      >
        <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          {/* LOGO */}
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', flexShrink: 0 }}>
            <span style={{ color: 'var(--accent-blue)', fontFamily: 'monospace', fontSize: '1.25rem' }}>&lt;/&gt;</span>
            <span>Atul Nath</span>
          </a>

          {/* DESKTOP LINKS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <a key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button className="toggle-btn" onClick={toggleDark} aria-label="Toggle dark mode">
              {isDark ? <FiSun /> : <FiMoon />}
            </button>
            <button
              id="mobile-menu-toggle"
              className="toggle-btn mobile-menu-btn"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu"
          >
            {NAV_LINKS.map(link => (
              <a key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className={`nav-link ${activeSection === link.href.replace('#', '') ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}

            {/* Dark/light toggle in mobile menu */}
            <div style={{
              borderTop: '1px solid var(--border-color)',
              marginTop: '8px',
              paddingTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: '44px',
              paddingLeft: '4px',
              paddingRight: '4px',
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {isDark ? 'Light mode' : 'Dark mode'}
              </span>
              <button
                className="toggle-btn"
                onClick={toggleDark}
                aria-label="Toggle dark mode"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                {isDark ? <FiSun /> : <FiMoon />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESPONSIVE TOGGLE VISIBILITY */}
      <style>{`
        .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
