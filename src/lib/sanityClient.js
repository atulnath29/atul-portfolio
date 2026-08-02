import { createClient } from '@sanity/client';

// ⚠️ Replace SANITY_PROJECT_ID with your actual project ID after running:
//    cd studio && npm run dev  — then copy the project ID from sanity.config.js
const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID';
const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: true,          // use CDN for fast read performance
  apiVersion: '2024-01-01',
});

export default sanityClient;
