import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'nyfnrmyv',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

export const getStore = async (storeName) => {
  const query = `*[_type == "store" && name == $storeName][0]`
  return client.fetch(query, { storeName })
}
