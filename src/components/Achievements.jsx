import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight, FiAward, FiExternalLink } from 'react-icons/fi';
import { useAchievements, useCertificates, useBadges } from '../hooks/useSanity';

/* ── SEED DATA (shown when Sanity not yet configured) ── */
const SEED_ACHIEVEMENTS = [
  { _id: 'a1', _type: 'achievement', title: '2-Day IoT Workshop', type: 'Workshop', description: 'Hands-on IoT workshop covering sensors, microcontrollers, and connected devices.', year: 2024 },
  { _id: 'a2', _type: 'achievement', title: 'AI Chatbot Hackathon', type: 'Hackathon', description: 'Built an AI-powered chatbot in 24 hours using Python and NLP libraries.', year: 2025 },
  { _id: 'a3', _type: 'achievement', title: 'Healthcare Chatbot Hackathon', type: 'Hackathon', description: 'Developed a health guidance chatbot for quick medical advice.', year: 2025 },
  { _id: 'a4', _type: 'achievement', title: 'Travel & Culture Hackathon', type: 'Hackathon', description: "Showcased India's culture and built a budget-friendly travel planning website.", year: 2025 },
];

const SEED_CERTIFICATES = [];

const BADGE_PLATFORMS = ['leetcode', 'hackerrank', 'google-skills', 'microsoft'];
const PLATFORM_LABELS = {
  'leetcode': 'LeetCode',
  'hackerrank': 'HackerRank',
  'google-skills': 'Google Skills',
  'microsoft': 'Microsoft',
};
const PLATFORM_LINKS = {
  'leetcode': 'https://leetcode.com',
  'hackerrank': 'https://hackerrank.com',
  'google-skills': 'https://grow.google',
  'microsoft': 'https://learn.microsoft.com',
};

const TYPE_COLORS = {
  Workshop: '#3b82f6',
  Hackathon: '#f97316',
  Competition: '#8b5cf6',
  Certification: '#10b981',
};

/* ── ACHIEVEMENT CARD ── */
function AchCard({ item }) {
  const isAchievement = item._type === 'achievement';
  const typeLabel = isAchievement ? item.type : item.category || 'Certificate';
  const color = TYPE_COLORS[typeLabel] || '#3b82f6';

  return (
    <div className="achievement-card" style={{
      width: '100%',
      minHeight: '200px',
      position: 'relative',
    }}>
      {/* STAR ICON */}
      <div style={{
        width: '36px', height: '36px', borderRadius: '10px',
        background: `${color}18`, color: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '16px',
      }}>
        <FiStar size={16} />
      </div>

      {/* YEAR PILL */}
      <div style={{
        position: 'absolute', top: '20px', right: '20px',
        padding: '3px 10px', borderRadius: '50px', fontSize: '0.72rem',
        fontWeight: 700, background: `${color}18`, color: color,
      }}>
        {item.year}
      </div>

      {/* TITLE */}
      <h4 style={{ fontSize: '0.97rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)', lineHeight: 1.3 }}>
        {item.title}
      </h4>

      {/* DESCRIPTION */}
      <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
        {item.description}
      </p>

      {/* CATEGORY TAG */}
      <div style={{ marginTop: 'auto' }}>
        <span className="tag" style={{
          background: `${color}18`, color: color,
          border: `1px solid ${color}30`, fontSize: '0.72rem',
        }}>
          {typeLabel}
        </span>
        {item.certificateLink && (
          <a href={item.certificateLink} target="_blank" rel="noopener noreferrer"
            style={{ marginLeft: '8px', fontSize: '0.75rem', color: 'var(--accent-blue)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <FiExternalLink size={11} /> View
          </a>
        )}
      </div>
    </div>
  );
}

/* ── UNIFIED CAROUSEL ── */
function AchievementCarousel({ items }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const DURATION = 4000; // ms per slide
  const CARDS_DESKTOP = 3;

  const totalSlides = Math.max(0, items.length - CARDS_DESKTOP + 1);

  const goNext = useCallback(() => {
    setCurrentIdx(i => (i + 1) >= totalSlides ? 0 : i + 1);
    setProgress(0);
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setCurrentIdx(i => (i - 1) < 0 ? totalSlides - 1 : i - 1);
    setProgress(0);
  }, [totalSlides]);

  // Progress animation
  useEffect(() => {
    if (paused || items.length <= CARDS_DESKTOP) return;

    const startTime = performance.now() - (progress / 100) * DURATION;

    const tick = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        goNext();
      } else {
        progressRef.current = requestAnimationFrame(tick);
      }
    };

    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [currentIdx, paused, goNext, items.length]);

  if (items.length === 0) return null;

  // Determine card width based on viewport
  const cardWidth = `calc(${100 / CARDS_DESKTOP}% - 16px)`;

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ARROWS + TRACK */}
      <div style={{ position: 'relative' }}>
        {/* LEFT ARROW */}
        <button onClick={goPrev} style={{
          position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, width: '40px', height: '40px', borderRadius: '50%',
          background: 'var(--bg-card)', border: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--text-secondary)',
          transition: 'all 0.2s', boxShadow: 'var(--shadow-md)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <FiChevronLeft size={18} />
        </button>

        {/* CARDS */}
        <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
          <motion.div
            style={{ display: 'flex', gap: '20px' }}
            animate={{ x: `calc(-${currentIdx * (100 / CARDS_DESKTOP)}% - ${currentIdx * 20 / CARDS_DESKTOP}px)` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {items.map(item => (
              <div key={item._id} style={{ flexShrink: 0, width: cardWidth }}>
                <AchCard item={item} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT ARROW */}
        <button onClick={goNext} style={{
          position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, width: '40px', height: '40px', borderRadius: '50%',
          background: 'var(--bg-card)', border: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--text-secondary)',
          transition: 'all 0.2s', boxShadow: 'var(--shadow-md)',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-blue)'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          <FiChevronRight size={18} />
        </button>
      </div>

      {/* PROGRESS BAR */}
      {items.length > CARDS_DESKTOP && (
        <div className="carousel-progress-bar" style={{ marginTop: '28px' }}>
          <div className="carousel-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* RESPONSIVE CSS */}
      <style>{`
        @media (max-width: 900px) {
          .ach-card-width { width: calc(50% - 10px) !important; }
        }
        @media (max-width: 560px) {
          .ach-card-width { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}

/* ── BADGE TABS SECTION ── */
function BadgeTabs({ data, loading }) {
  const [activeTab, setActiveTab] = useState('leetcode');

  const filtered = data?.filter(b => b.platform === activeTab) || [];

  return (
    <div style={{ marginTop: '80px' }}>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '24px', textAlign: 'center' }}>
        Coding Platform Badges
      </h3>

      {/* TAB BUTTONS */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
        {BADGE_PLATFORMS.map(p => (
          <button key={p} className={`tab-btn ${activeTab === p ? 'active' : ''}`} onClick={() => setActiveTab(p)}>
            {PLATFORM_LABELS[p]}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="loading-spinner"><div className="spinner" /></div>
      )}

      {/* BADGES GRID */}
      {!loading && filtered.length > 0 && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px', marginBottom: '24px',
        }}>
          {filtered.map(badge => (
            <div key={badge._id} className="card" style={{ padding: '20px' }}>
              {badge.iconUrl && (
                <img src={badge.iconUrl} alt={badge.title} style={{ width: '40px', height: '40px', objectFit: 'contain', marginBottom: '12px' }} />
              )}
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px' }}>{badge.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{badge.description}</p>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '8px', display: 'block' }}>{badge.year}</span>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && filtered.length === 0 && (
        <div className="empty-state">
          <FiAward size={36} style={{ opacity: 0.25 }} />
          <p>Badges coming soon for {PLATFORM_LABELS[activeTab]}</p>
        </div>
      )}

      {/* VIEW PROFILE LINK */}
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <a href={PLATFORM_LINKS[activeTab]} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '0.85rem', padding: '8px 22px' }}>
          View Profile <FiExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

/* ── MAIN ACHIEVEMENTS SECTION ── */
export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const { data: achData, loading: achLoading } = useAchievements();
  const { data: certData, loading: certLoading } = useCertificates();
  const { data: badgeData, loading: badgeLoading } = useBadges();

  // Merge achievements + certificates, tag with _type, sort by year desc
  const allItems = [
    ...(achData?.length ? achData.map(a => ({ ...a, _type: 'achievement' })) : SEED_ACHIEVEMENTS),
    ...(certData?.length ? certData.map(c => ({ ...c, _type: 'certificate' })) : SEED_CERTIFICATES),
  ].sort((a, b) => b.year - a.year);

  const isLoading = achLoading || certLoading;

  return (
    <section id="achievements" className="section" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-custom">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div className="section-label"><FiStar /> Milestones</div>
          <h2 className="section-heading">
            My <span className="gradient-text-orange">Achievements</span>
          </h2>
          <div className="divider" style={{ background: 'linear-gradient(90deg, var(--accent-orange), #f59e0b)' }} />
          <p className="section-sub" style={{ marginTop: '16px' }}>
            Hackathons, workshops, and certifications that shaped my journey as a developer.
          </p>
        </motion.div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="loading-spinner"><div className="spinner" /></div>
        )}

        {/* CAROUSEL */}
        {!isLoading && allItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ padding: '0 24px' }}
          >
            <AchievementCarousel items={allItems} />
          </motion.div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && allItems.length === 0 && (
          <div className="empty-state">
            <FiStar size={40} style={{ opacity: 0.25 }} />
            <p>Achievements coming soon — add them via Sanity Studio</p>
          </div>
        )}

        {/* BADGE TABS */}
        <BadgeTabs data={badgeData} loading={badgeLoading} />
      </div>
    </section>
  );
}
