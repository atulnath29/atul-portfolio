import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiInstagram, FiSend, FiCalendar } from 'react-icons/fi';

const CONTACT_INFO = [
  { icon: <FiMapPin />, label: 'Location', value: 'Sehore, M.P., India' },
  { icon: <FiMail />, label: 'Email', value: 'atulnath2909@gmail.com', href: 'mailto:atulnath2909@gmail.com' },
  { icon: <FiPhone />, label: 'Phone', value: '+91 9691686473', href: 'tel:+919691686473' },
];

const SOCIAL = [
  { icon: <FiGithub />, href: 'https://github.com/atulnath29', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/atul-nath-2b1868422', label: 'LinkedIn' },
  { icon: <FiInstagram />, href: 'https://instagram.com/atul__nath__2909', label: 'Instagram' },
  { icon: <FiMail />, href: 'mailto:atulnath2909@gmail.com', label: 'Email' },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate form submission (wire up Formspree or EmailJS for real)
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-secondary)' }} ref={ref}>
      <div className="container-custom">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <div className="section-label"><FiMail /> Contact</div>
          <h2 className="section-heading">Get In Touch</h2>
          <div className="divider" />
          <p className="section-sub" style={{ marginTop: '16px' }}>
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>

        {/* CONTACT GRID — stacks to 1col on mobile */}
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '32px',
            alignItems: 'start',
          }}
        >
          {/* CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="card"
            style={{ padding: '28px' }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '24px' }}>Send a Message</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Your Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Atul Nath"
                  value={form.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="contact-message" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-secondary)' }}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleChange}
                  className="form-input"
                  style={{ resize: 'vertical' }}
                />
              </div>
              <button
                id="contact-submit"
                type="submit"
                className="btn-primary"
                disabled={sending}
                style={{ justifyContent: 'center', opacity: sending ? 0.7 : 1, minHeight: '48px' }}
              >
                {sending ? 'Sending...' : sent ? '✓ Sent!' : <><FiSend /> Send Message</>}
              </button>
            </form>
          </motion.div>

          {/* RIGHT — CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* AVAILABLE BADGE */}
            <div className="available-badge">
              <span className="available-dot" />
              Available for Work
            </div>

            {/* CONTACT INFO */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>Contact Info</h3>
              {CONTACT_INFO.map(item => (
                <div key={item.label} className="contact-info-item">
                  <div className="contact-icon-box" style={{ flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '2px' }}>{item.label}</div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="contact-email-link"
                        style={{
                          fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)',
                          wordBreak: 'break-word', overflowWrap: 'anywhere', display: 'block',
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: '0.9rem', fontWeight: 500, display: 'block', wordBreak: 'break-word' }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* FOLLOW ME */}
            <div className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>Follow Me</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {SOCIAL.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="social-link" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* SCHEDULE A CALL */}
            <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'rgba(59,130,246,0.1)', color: 'var(--accent-blue)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: '1.2rem',
              }}>
                <FiCalendar />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '2px' }}>Schedule a Call</div>
                <a href="mailto:atulnath2909@gmail.com?subject=Schedule a Call"
                  style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', wordBreak: 'break-word' }}>
                  Book a time slot →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
