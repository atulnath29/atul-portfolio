import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiArrowRight, FiMessageCircle } from 'react-icons/fi';

const BASE = import.meta.env.BASE_URL || '/';

const TECH_LABELS = [
  { label: 'C++', x: '-60px', y: '20%', delay: 0 },
  { label: 'Java', x: '105%', y: '15%', delay: 0.4 },
  { label: 'Python', x: '-70px', y: '72%', delay: 0.8 },
  { label: 'Node.js', x: '105%', y: '68%', delay: 1.2 },
];

const SOCIAL_LINKS = [
  { icon: <FiGithub />, href: 'https://github.com/atulnath29', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/atul-nath-2b1868422', label: 'LinkedIn' },
  { icon: <FiInstagram />, href: 'https://instagram.com/atul__nath__2909', label: 'Instagram' },
  { icon: <FiMail />, href: 'mailto:atulnath2909@gmail.com', label: 'Email' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      {/* BG BLOBS */}
      <div className="hero-bg-blob" style={{
        width: '600px', height: '600px', top: '-100px', left: '-200px',
        background: 'var(--accent-blue)',
      }} />
      <div className="hero-bg-blob" style={{
        width: '400px', height: '400px', bottom: '-100px', right: '-100px',
        background: '#8b5cf6',
      }} />

      <div className="container-custom" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '60px', padding: '100px 24px 60px', flexWrap: 'wrap',
      }}>
        {/* LEFT CONTENT */}
        <div style={{ flex: 1, minWidth: '300px', maxWidth: '580px' }}>
          {/* ROLE BADGE */}
          <motion.div {...fadeUp(0.1)}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '50px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'var(--accent-blue)',
              marginBottom: '24px',
            }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: 'var(--accent-blue)',
                animation: 'pulse 2s infinite',
              }} />
              Full Stack Developer
            </div>
          </motion.div>

          {/* HEADING */}
          <motion.h1 {...fadeUp(0.2)} style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: '20px' }}>
            Building digital{' '}
            <span className="gradient-text">experiences</span>
            <br />that matter
          </motion.h1>

          {/* PARAGRAPH */}
          <motion.p {...fadeUp(0.3)} style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '36px', color: 'var(--text-secondary)', maxWidth: '480px' }}>
            I craft functional, scalable web applications and solve real-world problems through code.
          </motion.p>

          {/* BUTTONS */}
          <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button className="btn-primary" onClick={() => scrollTo('#projects')}>
              View Work <FiArrowRight />
            </button>
            <button className="btn-outline" onClick={() => scrollTo('#contact')}>
              Get In Touch <FiMessageCircle />
            </button>
          </motion.div>

          {/* SOCIAL ICONS */}
          <motion.div {...fadeUp(0.5)} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginRight: '4px' }}>Connect:</span>
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — PROFILE IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div className="profile-container">
            <img
              src={`${BASE}images/profile.png`}
              alt="Atul Nath — Full Stack Developer"
              className="profile-img"
            />
            {/* ROTATED OUTLINE DECORATION */}
            <div className="profile-outline" />

            {/* FLOATING TECH LABELS */}
            {TECH_LABELS.map((t, i) => (
              <div key={t.label} className="float-label" style={{
                left: t.x.includes('%') ? undefined : t.x,
                right: t.x === '105%' ? '-60px' : undefined,
                top: t.y,
                animationDelay: `${t.delay}s`,
              }}>
                {t.label}
              </div>
            ))}

            {/* FLOATING CARDS */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', bottom: '-20px', left: '-40px',
                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                borderRadius: '12px', padding: '10px 16px', boxShadow: 'var(--shadow-md)',
                zIndex: 5,
              }}
            >
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2px' }}>Status</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600 }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
                Open to work
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
