const apiKey = process.env.GOOGLE_PLACES_API_KEY;

// Edit this list: id (slug, used in URLs/keys), query (what to search), category
const entries = [
  { id: 'woodland-park-zoo', query: 'Woodland Park Zoo, Seattle', category: 'landmark' },
  { id: 'waiting-for-the-interurban', query: 'Waiting for the Interurban, Fremont, Seattle', category: 'landmark' },
  { id: 'hat-n-boots', query: "Hat n' Boots, Georgetown, Seattle", category: 'landmark' },
  { id: 'kurt-cobain-bench', query: 'Kurt Cobain Memorial Bench, Viretta Park, Seattle', category: 'landmark' },
  { id: 'jimi-hendrix-statue', query: 'Jimi Hendrix Statue, Seattle', category: 'landmark' },
  { id: 'dicks-drive-in', query: "Dick's Drive-In, 111 NE 45th St, Seattle", category: 'food' },
  { id: 'hing-hay-park', query: 'Hing Hay Park, Seattle', category: 'park' },
  { id: 'burke-museum', query: 'Burke Museum, Seattle', category: 'landmark' },
  { id: 'suzzallo-library', query: 'Suzzallo Library, University of Washington, Seattle', category: 'landmark' },
  { id: 'drumheller-fountain', query: 'Drumheller Fountain, University of Washington, Seattle', category: 'viewpoint' },
  { id: 'green-lake-park', query: 'Green Lake Park, Seattle', category: 'park' },
  { id: 'magnuson-park', query: 'Magnuson Park, Seattle', category: 'park' },
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
