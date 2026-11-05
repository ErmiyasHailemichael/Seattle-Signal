const apiKey = process.env.GOOGLE_PLACES_API_KEY;

// Edit this list: id (slug, used in URLs/keys), query (what to search), category
const entries = [
  { id: 'pike-place-market', query: 'Pike Place Market', category: 'landmark' },
  { id: 'fremont-troll', query: 'Fremont Troll, Seattle', category: 'landmark' },
  { id: 'fremont-rocket', query: 'Fremont Rocket, Seattle', category: 'landmark' },
  { id: 'center-of-the-universe-signpost', query: 'Center of the Universe Signpost, Fremont, Seattle', category: 'landmark' },
  { id: 'wallingford-ladybug', query: 'Wallingford Ladybug, Seattle', category: 'landmark' },
  { id: 'gas-works-park', query: 'Gas Works Park, Seattle', category: 'park' },
  { id: 'pioneer-square', query: 'Pioneer Square Park, Seattle', category: 'historic' },
  { id: 'ballard-locks', query: 'Ballard Locks, Seattle', category: 'landmark' },
];

function slugEscape(str) {
  return str.replace(/'/g, "\\'");
}

const results = [];

for (const entry of entries) {
  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.editorialSummary',
    },
    body: JSON.stringify({ textQuery: entry.query }),
  });
  const data = await response.json();
  const place = data.places?.[0];

  if (!place) {
    console.log(`NO RESULT for ${entry.query}`);
    continue;
  }
  if (!place.editorialSummary?.text) {
    console.log(`NO DESCRIPTION for ${entry.query} — you'll need to write this one by hand`);
  }

  results.push({
    id: entry.id,
    name: place.displayName?.text ?? entry.query,
    category: entry.category,
    lat: place.location?.latitude,
    lng: place.location?.longitude,
    address: place.formattedAddress ?? '',
    description: place.editorialSummary?.text ?? '',
  });

  // Be polite to the API — small delay between requests
  await new Promise((r) => setTimeout(r, 200));
}

const fileContents = `import type { Landmark } from './landmarks';

export const generatedLandmarks: Landmark[] = [
${results
  .map(
    (r) => `  {
    id: '${r.id}',
    name: '${slugEscape(r.name)}',
    category: '${r.category}',
    coordinates: { lat: ${r.lat}, lng: ${r.lng} },
    address: '${slugEscape(r.address)}',
    description:
      '${slugEscape(r.description)}',
  },`
  )
  .join('\n')}
];
`;

const fs = await import('fs');
fs.writeFileSync('src/data/landmarks-generated.ts', fileContents);
console.log(`\nWrote ${results.length} landmarks to src/data/landmarks-generated.ts`);
