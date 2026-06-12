Collect comprehensive store information for the NYC Style Guide and save it to Sanity CMS.

**Arguments:** $ARGUMENTS

Parse the store name from the arguments (strip filler words like "store name is", "for", etc.).

**Before doing anything else**, ask the user for both tokens in one message:

> "To add **[store name]** to the NYC Style Guide, I need two things from your Sanity project (found at sanity.io/manage → your project → API → Tokens):
>
> 1. **Write token** — permission: "Editor" or "Write" — used to save the store data
> 2. **Deploy token** — permission: "Deploy Studio" — used to publish the updated Sanity Studio so fields display correctly
>
> Please paste both tokens and I'll take care of the rest."

Wait for the user to reply with both tokens before proceeding. Once received, identify:
- The **write token** (the one with Editor/Write permission)
- The **deploy token** (the one with Deploy Studio permission)

If the user only provides one token, ask which type it is before continuing.

**Sanity config:**
- Project ID: `nyfnrmyv`
- Dataset: `production`
- API version: `2024-01-01`

---

Work through all steps below. Collect everything first, then save to Sanity at the end in one go.

---

## Step 0 — Find the correct Sanity client path

Before anything else, run this to find the right file path:

```bash
find /workspaces/fashion_webapp/node_modules/@sanity/client/dist -name "index.browser.js" | head -1
```

Use the path it returns in all subsequent Node.js scripts. Do NOT hardcode `index.browser.esm.js` — that file may not exist.

---

## Step 1 — Check if store exists in Sanity

Using the path found in Step 0, run:

```bash
node --input-type=module <<EOF
import { createClient } from 'SANITY_CLIENT_PATH'
const client = createClient({ projectId: 'nyfnrmyv', dataset: 'production', apiVersion: '2024-01-01', useCdn: false })
const store = await client.fetch('*[_type == "store" && name == "STORE_NAME_HERE"][0]{ _id, name }')
console.log(JSON.stringify(store))
EOF
```

Replace STORE_NAME_HERE inline in the query string (do NOT use GROQ parameters — they caused encoding issues). Note the `_id` if it exists.

---

## Step 2 — Find the store's official website and basic info

Use WebSearch to find:
- Official website URL
- Neighborhood in NYC (confirm it's the SoHo location)
- Full address
- Store hours
- Instagram handle
- A short description of the store's aesthetic and vibe (2–3 sentences)

Search query: `"[store name]" NYC SoHo boutique official website address hours`

Then WebFetch the store's official location/stores page (e.g. `/pages/stores`, `/blogs/locations/soho`, `/pages/new-york`) to confirm address and hours.

---

## Step 3 — Collect 10 images from the official website

WebFetch the store's **homepage** and look for CDN image URLs (e.g. `cdn.shopify.com`, `images.squarespace.com`). Focus on:
- Full-size campaign or editorial images (1920x, 1700x, 1200x)
- Homepage hero banners
- Lookbook photos

Also WebFetch the official **location page** for the SoHo store — it often has interior/storefront photos.

If the homepage doesn't yield 10 images, try `/lookbook`, `/editorial`, or `/campaign` pages.

Skip logos, icons, nav thumbnails, and anything under 400px.

Collect exactly 10 image URLs with captions.

---

## Step 4 — Find 3 TikTok videos of the SoHo store

Use WebSearch with these queries (try all three, pick the 3 best SoHo-specific results):
- `site:tiktok.com "[store name]" soho`
- `"[store name]" soho tiktok store tour NYC`
- `"[store name]" nyc soho tiktok 2024`

For each TikTok URL found, fetch the oEmbed to get embed HTML:
```
WebFetch: https://www.tiktok.com/oembed?url=[VIDEO_URL]
```

Collect from the JSON response: `html` (embed code), `author_name`, `author_unique_id`.

Collect 3 videos total with: postUrl, embedHtml, authorHandle, and a brief caption.

---

## Step 5 — Find 5 best sellers with product details

**Do NOT try to scrape collection/category pages** — they load products via JavaScript and will return empty results.

Instead:
1. Use WebSearch to find direct product page URLs: `site:[store-domain] products "[product type]"` or `"[store name]" best seller product page [year]`
2. WebFetch each individual product page URL directly

For each of the 5 products collect:
- Product name
- Price (e.g. "$285")
- Sizes available
- Colors available
- Material / Content (e.g. "100% Silk")
- Product page URL
- 2 product image CDN URLs (full-size, not thumbnails)

Good product types to search for: sweatshirts, blazers, leather jackets, silk tops, denim, tote bags.

---

## Step 6 — Find reviews

**Do NOT rely on Yelp or Google Reviews** — they block scrapers and return 403 errors.

Instead use these sources (in order of reliability):
1. **Fashion blogs**: search `"[store name]" soho review site:dayinmydreams.com OR site:whowhatwear.com OR site:theeverygirl.com`
2. **Chicmi**: WebFetch `https://www.chicmi.com/` + search for the store
3. **NYC Tourism**: `site:nyctourism.com "[store name]"`
4. **Lemon8**: search `"[store name]" soho review lemon8`
5. **General search**: `"[store name]" SoHo "staff" OR "beautiful store" OR "love this boutique" review 2024`

Collect 4–6 reviews with:
- Source name (blog name, site name)
- Rating (if available, e.g. "5/5"; if editorial, write "Editorial")
- Reviewer name (or "Anonymous")
- Review text (actual quote — do not paraphrase)

---

## Step 7 — Save everything to Sanity

Write a Node.js script to `/tmp/save_store.mjs` using the Sanity client path found in Step 0:

```js
import { createClient } from 'SANITY_CLIENT_PATH'

const client = createClient({
  projectId: 'nyfnrmyv',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'WRITE_TOKEN_HERE',
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
    { _key: 'img1', imageUrl: 'URL', caption: 'CAPTION' },
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
      source: 'SOURCE',
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

const existingId = 'EXISTING_ID_OR_NULL'

if (existingId) {
  await client.createOrReplace({ ...storeData, _id: existingId })
  console.log('Updated store:', existingId)
} else {
  const result = await client.create(storeData)
  console.log('Created store:', result._id)
}
```

Run it:
```bash
node /tmp/save_store.mjs
```

---

## Step 8 — Deploy Sanity Studio (if deploy token provided)

Check whether a **second token** was provided in the arguments (some users provide both a write token and a deploy token). A deploy token typically has a different permission level and is labeled separately.

If a deploy token is available, run:
```bash
cd /workspaces/fashion_webapp/studio && SANITY_AUTH_TOKEN=DEPLOY_TOKEN_HERE npx sanity deploy 2>&1
```

If no deploy token was provided, tell the user:
> "Your store data is saved. If the Sanity Studio shows 'Unknown fields' warnings, the cloud studio needs to be redeployed. Go to sanity.io/manage → your project → API → Tokens, create a token with **Deploy Studio** permission, and share it with me — I'll deploy it in one command."

---

## Final step — Confirm

After saving successfully, tell the user:
- The store name that was saved
- How many images, products, reviews, and TikTok videos were saved
- Whether the studio was deployed or if they need a deploy token
- That refreshing the Boutiques page on the website will show the new store
