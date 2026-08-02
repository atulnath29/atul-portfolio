import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

// ⚠️ Replace with your actual Project ID from https://sanity.io/manage
const PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || 'kqk0jilt'
const DATASET = 'production'

export default defineConfig({
  name: 'atul-portfolio-studio',
  title: 'Atul Nath Portfolio',

  projectId: PROJECT_ID,
  dataset: DATASET,

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
