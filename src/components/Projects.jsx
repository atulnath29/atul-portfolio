import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiExternalLink, FiBriefcase, FiCode } from 'react-icons/fi';
import { useProjects } from '../hooks/useSanity';

// Fallback seed data shown when Sanity is not configured
const SEED_PROJECTS = [
  {
    _id: '1',
    title: 'Gaming Management System',
    badge: 'Client Project',
    description: 'A full-stack gaming management platform built for a client.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    projectLink: 'https://github.com/atulnath29/Anas-Attar-Wala-',
    order: 1,
  },
  {
    _id: '2',
    title: 'Tic Tac Toe Game',
    badge: 'Beginner Project',
    description: 'First hands-on project built in first year.',
    techStack: ['C++', 'Java'],
    order: 2,
  },
  {
    _id: '3',
    title: 'India Culture & Travel Budget Explorer',
    badge: 'Hackathon',
    description: "A website showcasing India's culture and budget-friendly travel planning.",
    techStack: ['HTML', 'CSS', 'JavaScript', 'Team Project'],
    order: 3,
  },
  {
    _id: '4',
    title: 'AI Chatbot Assistant',
    badge: 'Hackathon/AI',
    description: 'AI-powered chatbot built during a hackathon.',
    techStack: ['Python', 'AI/ML'],
    order: 4,
  },
  {
    _id: '5',
    title: 'Healthcare Chatbot',
    badge: 'Hackathon/Health-Tech',
    description: 'Chatbot for quick health guidance.',
    techStack: ['Python', 'Chatbot', 'Health-Tech'],
    order: 5,
  },
];

const BADGE_COLORS = {
  'Client Project': '#3b82f6',
  'Beginner Project': '#10b981',
  'Hackathon': '#f59e0b',
  'Hackathon/AI': '#8b5cf6',
  'Hackathon/Health-Tech': '#ef4444',
};

function ProjectCard({ project, index, inView }) {
  const badgeColor = BADGE_COLORS[project.badge] || '#3b82f6';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* THUMBNAIL */}
      <div style={{
        height: '160px',
        background: `linear-gradient(135deg, ${badgeColor}22 0%, ${badgeColor}44 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative',
        flexShrink: 0,
      }}>
        {project.imageUrl ? (
          <img src={project.imageUrl} alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <FiCode size={48} style={{ color: badgeColor, opacity: 0.4 }} />
        )}
        {/* BADGE */}
        {project.badge && (
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            padding: '4px 12px', borderRadius: '50px', fontSize: '0.72rem', fontWeight: 700,
            background: badgeColor, color: 'white',
            maxWidth: 'calc(100% - 24px)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {project.badge}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)', lineHeight: 1.3 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1, marginBottom: '16px' }}>
          {project.description}
        </p>

        {/* TECH STACK */}
        {project.techStack?.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {project.techStack.map(tech => (
              <span key={tech} className="tag" style={{ fontSize: '0.72rem' }}>{tech}</span>
            ))}
          </div>
        )}

        {/* LINK */}
        {project.projectLink && (
          <a href={project.projectLink} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-blue)',
              marginTop: 'auto', minHeight: '32px',
            }}>
            <FiExternalLink size={14} /> View Project
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { data, loading } = useProjects();

  // Use Sanity data if available, otherwise fallback to seed data
  const projects = (data && data.length > 0) ? data : SEED_PROJECTS;

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container-custom">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <div className="section-label"><FiBriefcase /> Portfolio</div>
          <h2 className="section-heading">Recent Projects</h2>
          <div className="divider" />
          <p className="section-sub" style={{ marginTop: '16px' }}>
            A selection of projects I've built — from client work to hackathons.
          </p>
        </motion.div>

        {/* LOADING */}
        {loading && (
          <div className="loading-spinner">
            <div className="spinner" />
          </div>
        )}

        {/* PROJECTS GRID */}
        {!loading && (
          <div
            className="projects-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
              gap: '24px',
            }}
          >
            {projects.map((project, idx) => (
              <ProjectCard key={project._id} project={project} index={idx} inView={isInView} />
            ))}
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="empty-state">
            <FiCode size={40} style={{ opacity: 0.3 }} />
            <p>Projects coming soon — add them via Sanity Studio</p>
          </div>
        )}
      </div>
    </section>
  );
}
