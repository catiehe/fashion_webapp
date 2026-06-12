Collect comprehensive store information for the NYC Style Guide and save it to Sanity CMS.

**Arguments:** $ARGUMENTS

First, parse the arguments:
- The Sanity write token is the last word in the arguments and starts with "sk"
- Everything before the token is the store name

**Sanity config:**
- Project ID: `nyfnrmyv`
- Dataset: `production`
- API version: `2024-01-01`
- node_modules path: `/workspaces/fashion_webapp/node_modules`

---

Work through all 6 steps below. Collect everything first, then save to Sanity at the end in one go.

---

## Step 1 — Check if store exists in Sanity

Run this Bash command to find the store's existing `_id`:

```bash
node --input-type=module <<EOF
import { createClient } from '/workspaces/fashion_webapp/node_modules/@sanity/client/dist/index.browser.esm.js'
const client = createClient({ projectId: 'nyfnrmyv', dataset: 'production', apiVersion: '2024-01-01', useCdn: false })
const store = await client.fetch('*[_type == "store" && name == $name][0]{ _id, name }', { name: 'STORE_NAME_HERE' })
console.log(JSON.stringify(store))
EOF
```

Replace STORE_NAME_HERE with the actual store name. Note the `_id` if it exists — you'll use it for the update later.

---

## Step 2 — Find the store's official website and basic info

Use WebSearch to find:
- Official website URL
- Neighborhood in NYC (confirm it's the SoHo location)
- Full address
- Store hours
- Instagram handle
- A short description of the store's aesthetic and vibe (2–3 sentences)

Search query example: `"[store name]" NYC SoHo boutique official website`

---

## Step 3 — Collect 10 images from the official website

Use WebFetch on the store's homepage and lookbook/editorial pages. Look for:
- High-quality editorial or campaign images
- Lookbook photos
- Homepage hero images

Collect exactly 10 image URLs. Prefer full-size images over thumbnails. Skip logos, icons, and UI elements.

Also try fetching `/lookbook`, `/editorial`, `/campaign`, or `/collections` pages if the homepage doesn't have enough images.

---

## Step 4 — Find 3 TikTok videos of the SoHo store

Use WebSearch with queries like:
- `site:tiktok.com "[store name]" soho`
- `"[store name] soho" tiktok store tour`
- `"[store name]" nyc soho tiktok`

For each TikTok video URL found, fetch the oEmbed data to get the embed HTML:
```
WebFetch: https://www.tiktok.com/oembed?url=[VIDEO_URL]
```

The response contains `html` — that's the embed code. Also collect the `author_name` field.

Collect 3 videos total with: postUrl, embedHtml, authorHandle, and a brief caption describing what the video shows.

---

## Step 5 — Find 5 best sellers with product details

Use WebFetch on the store's website to find their best sellers or featured products. Try these pages:
- `/best-sellers`
- `/shop/best-sellers`
- `/collections/best-sellers`
- `/new-arrivals`
- The main shop/products page

For each of the 5 products collect:
- Product name
- Price (e.g. "$285")
- Sizes available (e.g. "XS, S, M, L, XL" or "34, 36, 38")
- Colors available
- Material / Content (e.g. "100% Silk" or "80% Wool, 20% Cashmere")
- Product page URL
- 2 product image URLs (front + back or detail shot if available)

---

## Step 6 — Find reviews

Use WebSearch to find reviews from:
- Yelp: search `"[store name]" soho yelp reviews`
- Google Reviews: search `"[store name]" soho google reviews`
- Any fashion blogs or editorial mentions

Use WebFetch on the Yelp page to read actual review text. Collect 4–6 reviews with:
- Source (Yelp / Google / Blog name)
- Rating (e.g. "5/5" or "4 stars")
- Reviewer name (or "Anonymous")
- Review text (the actual quote)

---

## Step 7 — Save everything to Sanity

Write a Node.js script to `/tmp/save_store.mjs` with all the collected data, then run it. Use this structure:

```js
import { createClient } from '/workspaces/fashion_webapp/node_modules/@sanity/client/dist/index.browser.esm.js'

const client = createClient({
  projectId: 'nyfnrmyv',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'TOKEN_HERE',
  useCdn: false,
})

const storeData = {
  _type: 'store',
  name: 'STORE_NAME',
  neighborhood: 'SoHo',
  address: 'ADDRESS',
  website: 'WEBSITE_URL',
  instagramHandle: 'HANDLE',
  description: 'DESCRIPTION',
  hours: 'HOURS',
  gallery: [
    { _key: 'img1', imageUrl: 'URL', caption: '' },
    // ... 10 images total
  ],
  products: [
    {
      _key: 'prod1',
      name: 'PRODUCT NAME',
      price: '$000',
      sizes: 'XS, S, M, L',
      colors: 'Black, White',
      material: '100% Silk',
      productUrl: 'URL',
      productImages: [
        { _key: 'pimg1', imageUrl: 'URL' },
        { _key: 'pimg2', imageUrl: 'URL' },
      ],
    },
    // ... 5 products total
  ],
  reviews: [
    {
      _key: 'rev1',
      source: 'Yelp',
      rating: '5/5',
      reviewerName: 'NAME',
      reviewText: 'TEXT',
    },
    // ... 4–6 reviews total
  ],
  socialPosts: [
    {
      _key: 'tt1',
      platform: 'tiktok',
      postUrl: 'URL',
      embedHtml: 'EMBED_HTML',
      authorHandle: 'HANDLE',
      caption: 'CAPTION',
      addedAt: new Date().toISOString(),
    },
    // ... 3 TikTok videos total
  ],
}

// If store already exists, update it. Otherwise create it.
const existingId = 'EXISTING_ID_OR_NULL'

if (existingId) {
  await client.createOrReplace({ ...storeData, _id: existingId })
  console.log('Updated store:', existingId)
} else {
  const result = await client.create(storeData)
  console.log('Created store:', result._id)
}
```

Fill in all the real data collected in steps 2–6, then run:
```bash
node /tmp/save_store.mjs
```

---

## Final step — Confirm

After the script runs successfully, tell the user:
- The store name that was saved
- How many images, products, reviews, and TikTok videos were saved
- That refreshing the Boutiques page on the website will show the new store
