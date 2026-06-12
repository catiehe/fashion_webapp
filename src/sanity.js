import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'nyfnrmyv',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  perspective: 'published',
})

export const getStore = async (storeName) => {
  const query = `*[_type == "store" && name == $storeName][0] {
    _id,
    name,
    neighborhood,
    address,
    website,
    instagramHandle,
    description,
    hours,
    image { asset -> { url } },
    gallery,
    products,
    reviews,
    socialPosts
  }`
  return client.fetch(query, { storeName })
}

export const getAllStores = async () => {
  const query = `*[_type == "store"] | order(name) {
    _id,
    name,
    neighborhood,
    image { asset -> { url } },
    gallery
  }`
  return client.fetch(query)
}
