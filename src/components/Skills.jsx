import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiLayers, FiServer, FiDatabase, FiTag } from 'react-icons/fi';

const SKILL_CATEGORIES = [
  {
    id: 'languages',
    icon: <FiCode size={20} />,
    title: 'Languages',
    color: '#3b82f6',
    skills: [
      { name: 'JavaScript', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'C++', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'C', level: 75 },
    ],
  },
  {
    id: 'frontend',
    icon: <FiLayers size={20} />,
    title: 'Frontend',
    color: '#8b5cf6',
    skills: [
      { name: 'HTML', level: 90 },
      { name: 'CSS', level: 85 },
      { name: 'JavaScript', level: 88 },
    ],
  },
  {
    id: 'backend',
    icon: <FiServer size={20} />,
    title: 'Backend',
    color: '#10b981',
    skills: [
      { name: 'Node.js', level: 75 },
      { name: 'Express.js', level: 65 },
    ],
  },
  {
    id: 'database',
    icon: <FiDatabase size={20} />,
    title: 'Database',
    color: '#f59e0b',
    skills: [
      { name: 'SQL', level: 80 },
      { name: 'MySQL', level: 75 },
    ],
  },
];

const ALSO_WORKING = ['Git', 'GitHub', 'VS Code', 'Postman'];

const STATS = [
  { number: '5+', label: 'Projects' },
  { number: '1+', label: 'Years Experience' },
  { number: '9+', label: 'Technologies' },
  { number: '100%', label: 'Dedication' },
];

function SkillBar({ name, level, color, animate }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div className="skill-bar-label">
        <span style={{ fontWeight: 500, fontSize: '0.87rem', color: 'var(--text-primary)' }}>{name}</span>
        <span style={{ fontWeight: 600, fontSize: '0.82rem', color: color }}>{level}%</span>
      </div>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${level}%` : 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="skills" className="section" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-custom">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <div className="section-label"><FiCode /> Skills</div>
          <h2 className="section-heading">Skills &amp; Technologies</h2>
          <div className="divider" />
          <p className="section-sub" style={{ marginTop: '16px' }}>
            Technologies I work with to build full-stack applications from idea to deployment.
          </p>
        </motion.div>

        {/* 2x2 SKILL GRID */}
        <div
          className="skills-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="card"
              style={{ padding: '24px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: `${cat.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: cat.color, flexShrink: 0,
                }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{cat.title}</h3>
              </div>
              {cat.skills.map(skill => (
                <SkillBar key={skill.name} {...skill} color={cat.color} animate={isInView} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* ALSO WORKING WITH */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>
            <FiTag style={{ display: 'inline', marginRight: '6px' }} />
            Also Working With
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {ALSO_WORKING.map(tool => (
              <span key={tool} className="tag">{tool}</span>
            ))}
          </div>
        </motion.div>

        {/* STATS ROW */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '16px',
          }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
