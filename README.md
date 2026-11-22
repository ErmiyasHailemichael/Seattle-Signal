# Seattle Signal

A map that shows real Seattle landmarks — famous and quirky — near wherever you are. Built while driving for Uber/Lyft, for the passengers in the back seat: think of it as a knowledgeable local friend riding along, pointing out what's actually nearby.

**Live app:** https://seattle-signal.vercel.app
**Status page:** https://seattle-signal.vercel.app/status

This is a solo, instructor-approved individual project for a software engineering course. It's a working app, actively developed in weekly increments.

## What it does

- An interactive map (Mapbox) showing landmarks near your current view
- Tap any landmark for details: description, address, a local tip, and a "Get Directions" link
- **Near Me** — uses your device's location to find and sort nearby landmarks, shown as a horizontal scrollable row of cards
- Marker clustering, so the map stays readable instead of turning into an unreadable pile of overlapping pins as the dataset grows
- 58 real landmarks and counting — covering famous spots (Pike Place Market, the Space Needle) and intentionally hyper-local, quirky ones (the Fremont Troll, the Wallingford Ladybug, the Giant Shoe Museum) along actual routes
- A public uptime/status page backed by health checks that run independently of the app itself (see **Architecture notes** below for why that matters)

## Tech stack

- **Next.js 16** (App Router, TypeScript, Cache Components)
- **React 19**
- **Mapbox GL JS** via `react-map-gl`
- **Supercluster** for marker clustering
- **Supabase (Postgres)** for health-check history
- **GitHub Actions** for CI (lint, test, build) and a scheduled external health check
- **Google Places API (New)** — used only in an offline data-generation pipeline, never called by the live app

## Architecture notes

**Independent monitoring.** The `/status` page is backed by a health-check script (`scripts/health-check.mjs`) that runs on a GitHub Actions schedule — outside the deployed app entirely. A monitor that runs *inside* the thing it's monitoring can't tell you the thing is down; this one can, because it's a completely separate process hitting the live URL from the outside.

**Landmark data pipeline.** The 58 landmarks in `src/data/landmarks.ts` were generated with a dev-time-only script (`scripts/generate-landmarks.mjs`), which queries the Google Places API for real coordinates, addresses, and descriptions, plus a discovery script (`scripts/discover-landmarks.mjs`) that surfaces nearby candidates for a given area. The **live app never calls Google** — it only reads the static, hand-reviewed `landmarks.ts` file. Every batch was manually reviewed, and the handful of places Google's API had no description for (mostly small, hyper-local curiosities) were researched and written by hand.

## Getting started

```bash
git clone https://github.com/ErmiyasHailemichael/Seattle-Signal.git
cd Seattle-Signal
npm install
```

Create `.env.local` with:

```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
DATABASE_URL=your_supabase_connection_string
```

(`GOOGLE_PLACES_API_KEY` is only needed if you're regenerating landmark data with the scripts in `scripts/` — not required to run the app itself.)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing

```bash
npm test
```

Covers the haversine distance calculation and data-integrity checks on the full landmark dataset (unique ids, valid categories, coordinates within the Seattle area, no empty fields). Runs automatically in CI on every push.

## Project status

**Done:** core map, landmark detail sheets, Near Me with geolocation, marker clustering, Supabase-backed uptime monitoring, CI, and a growing, API-sourced landmark dataset.

**In progress / known gaps:** most landmarks still show a placeholder photo (real ones get added as I actually visit and photograph each place); error handling for map/geolocation failure cases beyond "permission denied" is still basic; a tracked Issue → branch → PR workflow has lapsed for recent work and may be reinstated.