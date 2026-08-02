import { useState, useEffect } from 'react';
import sanityClient from '../lib/sanityClient';

/**
 * Generic Sanity fetch hook
 * @param {string} query - GROQ query
 * @param {object} params - Query params
 * @returns {{ data, loading, error }}
 */
export function useSanityQuery(query, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    sanityClient
      .fetch(query, params)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Sanity fetch error:', err);
          setError(err.message || 'Failed to fetch data');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [query]);

  return { data, loading, error };
}

/* ── PROJECTS ── */
export function useProjects() {
  const query = `*[_type == "project"] | order(order asc) {
    _id, title, badge, description, techStack, projectLink, order,
    "imageUrl": image.asset->url
  }`;
  return useSanityQuery(query);
}

/* ── ACHIEVEMENTS (hackathons/workshops) ── */
export function useAchievements() {
  const query = `*[_type == "achievement"] | order(year desc) {
    _id, title, type, description, year,
    "iconUrl": icon.asset->url
  }`;
  return useSanityQuery(query);
}

/* ── CERTIFICATES ── */
export function useCertificates() {
  const query = `*[_type == "certificate"] | order(year desc) {
    _id, title, platform, year, category, description, certificateLink, recipient,
    "imageUrl": image.asset->url
  }`;
  return useSanityQuery(query);
}

/* ── BADGES ── */
export function useBadges() {
  const query = `*[_type == "badge"] | order(year desc) {
    _id, title, platform, description, year,
    "iconUrl": icon.asset->url
  }`;
  return useSanityQuery(query);
}
