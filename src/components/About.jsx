import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiUser, FiHeart, FiCpu, FiZap, FiCode, FiTarget } from 'react-icons/fi';

const WHAT_I_LOVE = [
  { icon: <FiTarget size={20} />, label: 'Problem Solving', desc: 'Breaking complex challenges into elegant solutions.' },
  { icon: <FiCpu size={20} />, label: 'Logic-driven Applications', desc: 'Building systems with clean, maintainable architecture.' },
  { icon: <FiZap size={20} />, label: 'AI-based Tools', desc: 'Exploring machine learning and intelligent automation.' },
];

const TIMELINE = [
  { year: '2022', title: 'Started Coding', desc: 'Began with C and C++, fell in love with logic.' },
  { year: '2023', title: 'First Project', desc: 'Built Tic Tac Toe — first hands-on experience.' },
  { year: '2023', title: 'Web Development', desc: 'Dove into HTML, CSS, JavaScript, and Node.js.' },
  { year: '2024', title: 'Hackathons & Workshops', desc: 'Participated in IoT workshop and coding competitions.' },
  { year: '2025', title: 'Client Work', desc: 'Delivered the Gaming Management System for a client.' },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container-custom">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <div className="section-label"><FiUser /> About</div>
          <h2 className="section-heading">About Me</h2>
          <div className="divider" />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {/* LEFT COLUMN */}
          <div>
            {/* MISSION CARD */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="card"
              style={{ padding: '28px', marginBottom: '24px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '10px',
                  background: 'rgba(59,130,246,0.1)', color: 'var(--accent-blue)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FiTarget size={18} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>My Mission</h3>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                I'm Atul Nath, a Full Stack Developer from Sehore, M.P. My mission is to craft
                functional, scalable web applications that solve real-world problems and deliver
                meaningful user experiences. I believe great software is born at the intersection
                of clean code, thoughtful design, and relentless curiosity.
              </p>
            </motion.div>

            {/* WHAT I LOVE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="card"
              style={{ padding: '28px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '10px',
                  background: 'rgba(249,115,22,0.1)', color: 'var(--accent-orange)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FiHeart size={18} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>What I Love Building</h3>
              </div>
              {WHAT_I_LOVE.map((item, i) => (
                <div key={item.label} style={{ display: 'flex', gap: '14px', marginBottom: i < WHAT_I_LOVE.length - 1 ? '16px' : 0 }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '9px', flexShrink: 0,
                    background: 'rgba(59,130,246,0.08)', color: 'var(--accent-blue)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px' }}>{item.label}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — TIMELINE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiCode style={{ color: 'var(--accent-blue)' }} /> My Journey
            </h3>
            <div style={{ position: 'relative', paddingLeft: '24px' }}>
              {/* VERTICAL LINE */}
              <div style={{
                position: 'absolute', left: '5px', top: '8px', bottom: '8px',
                width: '2px', background: 'var(--border-color)', borderRadius: '1px',
              }} />

              {TIMELINE.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="timeline-item"
                  style={{ marginBottom: idx < TIMELINE.length - 1 ? '28px' : 0 }}
                >
                  {/* DOT */}
                  <div style={{
                    position: 'absolute', left: 0,
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: 'var(--accent-blue)',
                    boxShadow: '0 0 0 3px rgba(59,130,246,0.2)',
                    marginTop: '4px',
                  }} />

                  <div style={{ paddingLeft: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item.title}</span>
                      <span style={{
                        padding: '2px 8px', borderRadius: '50px', fontSize: '0.7rem',
                        fontWeight: 600, background: 'rgba(59,130,246,0.1)', color: 'var(--accent-blue)',
                      }}>{item.year}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
