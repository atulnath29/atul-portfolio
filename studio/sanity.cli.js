import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    // Replace with your actual project ID after running: npm create sanity@latest .
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'kqk0jilt',
    dataset: 'production',
  },
})
