import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { storeSchema } from './schemas/store'

export default defineConfig({
  name: 'nyc-style-guide',
  title: 'NYC Style Guide',
  projectId: 'nyfnrmyv',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: [storeSchema],
  },
})
