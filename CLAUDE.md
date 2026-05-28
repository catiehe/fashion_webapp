# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Overview

This is the **NYC Style Guide** — a fashion discovery web app for exploring boutiques, vintage stores, and pop-ups across New York City neighborhoods. It was built from a set of HTML design prototypes and converted into a React web application.

The app has four pages:
- **Discovery** — a home feed with a masonry grid of editorial cards
- **Map** — an interactive Mapbox map with neighborhood and aesthetic filters
- **Boutiques** — a detailed store profile page (The Archive, SoHo)
- **Pop-ups / Vintage** — an editorial guide to NYC vintage stores

## Working with the User

### Audience

The person using this repository is **not a programmer**. They are a designer and creative working on a fashion project. They may have little or no coding experience. Always keep this in mind.

### Communication Style

- **Never assume prior knowledge.** Do not use jargon or technical terms without explaining them.
- **Explain everything in plain English.** Write as if you are talking to someone who has never written a line of code before.
- **Be extra detailed about changes.** When you make a change, explain *what* changed, *why*, and *what they'll see* as a result.
- **Use analogies.** Draw on design, fashion, or everyday comparisons to make abstract concepts easier to understand.
- **Break things into small steps.** Never bundle multiple concepts into one explanation without walking through each individually.
- **Be encouraging and patient.** Learning to work with code and design tools is confusing. Keep the tone warm and reassuring.

### Examples of What This Looks Like in Practice

**Bad response (too technical):**
> I updated the `useEffect` hook and replaced the broken `aida/` image URLs with `aida-public` ones.

**Good response:**
> Two of the images on the Boutiques page weren't loading because they were pointing to private links that only work in certain contexts — kind of like a photo that's set to "only me" on Instagram. I swapped them out for public links that anyone can see, so the full image gallery will now show up correctly.

### Every Time You Make a Change

After every file edit or code change, always provide:

1. **What was changed** — describe it in plain language, not code terminology.
2. **Why it was changed** — what problem does it solve, or what does it add?
3. **What you'll see / any action needed** — describe the visible result and whether they need to refresh or restart anything.

### Dev Server

To start the app, run `start_servers.sh` from this directory. It will install everything and launch the app at **http://localhost:5173**.

- If a code change requires a browser refresh, say so clearly.
- If a change takes effect automatically (Vite hot-reloads most things), say that too.
- The dev server runs on **port 5173**.

---

## Technology Stack

- **React** — the JavaScript framework the app is built in (think of it as the engine)
- **Vite** — the tool that runs the dev server and builds the app
- **Tailwind CSS** — a system for styling the app using class names directly in the HTML
- **React Router** — handles navigation between the four pages
- **Mapbox** — powers the interactive map on the Map page (token stored in `.env`)

## Design System

The visual style is called **Editorial Precision** — a mix of minimalism and brutalism, using only three colors:

- **Ice Blue (`#EAEFF5`)** — the main background color
- **Rich Black (`#212121`)** — text, buttons, dark sections
- **Pure White (`#FFFFFF`)** — card surfaces

Font: **Hanken Grotesk** (loaded from Google Fonts)

Full design spec is in `editorial_precision/DESIGN.md`.

## File Structure

```
stitch_product_brief_outline/
├── start_servers.sh              # Run this to start the app
├── stitch-app/                   # All the React app code lives here
│   ├── .env                      # Mapbox token (private, not on GitHub)
│   ├── .env.example              # Template showing what .env should contain
│   ├── src/
│   │   ├── App.jsx               # Routes — connects URLs to pages
│   │   ├── index.css             # Global styles and custom CSS classes
│   │   ├── main.jsx              # Entry point — boots the app
│   │   ├── components/
│   │   │   └── Navbar.jsx        # Shared top navigation bar
│   │   └── pages/
│   │       ├── Discovery.jsx     # Home feed (masonry grid)
│   │       ├── StoreDetail.jsx   # The Archive boutique page
│   │       ├── StyleMap.jsx      # Mapbox map + filter sidebar
│   │       └── VintageGuide.jsx  # Editorial vintage guide
│   ├── tailwind.config.js        # Design tokens (colors, fonts, spacing)
│   ├── index.html                # HTML shell + Google Fonts
│   └── package.json              # Dependencies and scripts
├── editorial_precision/          # Original design spec
└── [folder]/code.html            # Original HTML prototypes (reference only)
```

## GitHub

The app is pushed to: **https://github.com/catiehe/fashion_webapp**

The Mapbox token is stored in `.env` locally and is **not** committed to GitHub. Anyone cloning the repo should copy `.env.example` to `.env` and add their own token.
