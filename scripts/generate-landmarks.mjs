const apiKey = process.env.GOOGLE_PLACES_API_KEY;

// Edit this list: id (slug, used in URLs/keys), query (what to search), category
const entries = [
  { id: 'nordic-museum', query: 'Nordic Museum, Seattle', category: 'landmark' },
  { id: 'wing-luke-museum', query: 'Wing Luke Museum, Seattle', category: 'historic' },
  { id: 'panama-hotel', query: 'Panama Hotel, Seattle', category: 'historic' },
  { id: 'westlake-park', query: 'Westlake Park, Seattle', category: 'park' },
  { id: 'ravenna-park', query: 'Ravenna Park, Seattle', category: 'park' },
  { id: 'matthews-beach-park', query: 'Matthews Beach Park, Seattle', category: 'park' },
  { id: 'jefferson-park', query: 'Jefferson Park, Beacon Hill, Seattle', category: 'park' },
  { id: 'log-house-museum', query: 'Log House Museum, Seattle', category: 'historic' },
  { id: 'duwamish-head', query: 'Duwamish Head, Seattle', category: 'viewpoint' },
  { id: 'madison-park-beach', query: 'Madison Park Beach, Seattle', category: 'park' },
  { id: 'leschi-park', query: 'Leschi Park, Seattle', category: 'park' },
  { id: 'montlake-cut', query: 'Montlake Cut, Seattle', category: 'landmark' },
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
