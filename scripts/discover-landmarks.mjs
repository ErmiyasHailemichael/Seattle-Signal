const apiKey = process.env.GOOGLE_PLACES_API_KEY;

// Edit: center point and radius (meters) for this search pass
const center = { lat: 47.6097, lng: -122.3331 }; // downtown Seattle
const radius = 3000;
const includedTypes = ['tourist_attraction', 'park', 'museum', 'historical_landmark'];

const response = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'X-Goog-FieldMask':
      'places.displayName,places.formattedAddress,places.location,places.editorialSummary,places.types',
  },
  body: JSON.stringify({
    includedTypes,
    maxResultCount: 20,
    locationRestriction: {
      circle: {
        center: { latitude: center.lat, longitude: center.lng },
        radius,
      },
    },
  }),
});

const data = await response.json();

for (const place of data.places ?? []) {
  console.log(`\n${place.displayName?.text}`);
  console.log(`  address: ${place.formattedAddress}`);
  console.log(`  types: ${place.types?.join(', ')}`);
  console.log(`  summary: ${place.editorialSummary?.text ?? 'NONE'}`);
}
