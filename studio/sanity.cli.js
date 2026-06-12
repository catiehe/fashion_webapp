import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'nyfnrmyv',
    dataset: 'production',
  },
  studioHost: 'nyc-style-guide',
})
