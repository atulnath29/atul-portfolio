/**
 * Sanity Seed Script — seeds initial achievement documents.
 *
 * Usage (after setting up Sanity with your project ID):
 *   node studio/seed.js
 *
 * Requirements:
 *   - Set SANITY_PROJECT_ID env var (or edit it below)
 *   - Set SANITY_TOKEN env var (create a write token at sanity.io/manage → API → Tokens)
 */

import { createClient } from '@sanity/client'

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'YOUR_PROJECT_ID'
const TOKEN = process.env.SANITY_TOKEN || 'YOUR_WRITE_TOKEN'

const client = createClient({
  projectId: PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
})

const achievements = [
  {
    _type: 'achievement',
    title: '2-Day IoT Workshop',
    type: 'Workshop',
    description: 'Attended a comprehensive 2-day IoT workshop covering sensors, microcontrollers, and connected device development.',
    year: 2024,
  },
  {
    _type: 'achievement',
    title: 'AI Chatbot Hackathon',
    type: 'Hackathon',
    description: 'Built an AI-powered chatbot in 24 hours using Python and NLP libraries during a competitive hackathon.',
    year: 2025,
  },
  {
    _type: 'achievement',
    title: 'Healthcare Chatbot Hackathon',
    type: 'Hackathon',
    description: 'Developed a healthcare guidance chatbot providing quick medical advice, built during a health-tech hackathon.',
    year: 2025,
  },
  {
    _type: 'achievement',
    title: 'Travel & Culture Hackathon',
    type: 'Hackathon',
    description: "Showcased India's culture and built a budget-friendly travel planning platform as a team project.",
    year: 2025,
  },
]

const projects = [
  {
    _type: 'project',
    title: 'Gaming Management System',
    badge: 'Client Project',
    description: 'A full-stack gaming management platform built for a client.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    projectLink: 'https://github.com/atulnath29/Anas-Attar-Wala-',
    order: 1,
  },
  {
    _type: 'project',
    title: 'Tic Tac Toe Game',
    badge: 'Beginner Project',
    description: 'First hands-on project built in first year.',
    techStack: ['C++', 'Java'],
    order: 2,
  },
  {
    _type: 'project',
    title: 'India Culture & Travel Budget Explorer',
    badge: 'Hackathon',
    description: "A website showcasing India's culture and budget-friendly travel planning.",
    techStack: ['HTML', 'CSS', 'JavaScript', 'Team Project'],
    order: 3,
  },
  {
    _type: 'project',
    title: 'AI Chatbot Assistant',
    badge: 'Hackathon/AI',
    description: 'AI-powered chatbot built during a hackathon.',
    techStack: ['Python', 'AI/ML'],
    order: 4,
  },
  {
    _type: 'project',
    title: 'Healthcare Chatbot',
    badge: 'Hackathon/Health-Tech',
    description: 'Chatbot for quick health guidance.',
    techStack: ['Python', 'Chatbot', 'Health-Tech'],
    order: 5,
  },
]

async function seed() {
  console.log('🌱 Seeding Sanity with achievements and projects...\n')

  // Seed achievements
  for (const doc of achievements) {
    const result = await client.create(doc)
    console.log(`✅ Created achievement: ${result.title} (${result._id})`)
  }

  // Seed projects
  for (const doc of projects) {
    const result = await client.create(doc)
    console.log(`✅ Created project: ${result.title} (${result._id})`)
  }

  console.log('\n🎉 Seeding complete!')
}

seed().catch(err => {
  console.error('❌ Seed error:', err.message)
  process.exit(1)
})
