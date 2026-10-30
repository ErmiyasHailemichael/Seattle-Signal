export type Landmark = {
  id: string;
  name: string;
  category: 'viewpoint' | 'park' | 'historic' | 'food' | 'landmark';
  coordinates: { lat: number; lng: number };
  address: string;
  photo?: string; // optional — falls back to a placeholder until I have my own photos
  description: string;
  localTip?: string;
  practicalInfo?: string;
};

export const landmarks: Landmark[] = [
  {
    id: 'underground-tour',
    name: "Bill Speidel's Underground Tour",
    category: 'historic',
    coordinates: { lat: 47.6015, lng: -122.3328 },
    address: '614 1st Ave, Seattle, WA 98104',
    description:
      "After the Great Seattle Fire of 1889, the city rebuilt its streets one to two stories higher than before — leaving the original ground-floor storefronts buried underneath. This tour walks you through those sealed-off passages, the literal foundation of old Seattle, still intact beneath the current street level.",
    localTip:
      "A passenger once told me the Space Needle felt overrated, but this tour stuck with them way more — it's less about the view and more about a piece of the city's history most visitors never know exists.",
    practicalInfo: 'Tours run on the hour; book ahead, it sells out. ~75 minutes.',
  },
  {
    id: 'sky-view-observatory',
    name: 'Sky View Observatory',
    category: 'viewpoint',
    coordinates: { lat: 47.605, lng: -122.3301 },
    address: '700 4th Ave, 73rd Floor, Seattle, WA 98104',
    description:
      'Located on the 73rd floor of Columbia Center, the tallest building in the Pacific Northwest. 360-degree views stretching from the Olympics to the Cascades, well above the Space Needle\'s observation deck.',
    localTip:
      'A passenger recommended this over the Space Needle after being unimpressed there — said the extra height alone makes the view genuinely better.',
    practicalInfo: 'Indoor observatory, open regardless of weather.',
  },
  {
    id: 'kerry-park',
    name: 'Kerry Park',
    category: 'park',
    coordinates: { lat: 47.6295, lng: -122.3598 },
    address: '211 W Highland Dr, Seattle, WA 98119',
    description:
      'A small park on Queen Anne Hill with the classic postcard view of the Seattle skyline, Space Needle included, Mt. Rainier visible on a clear day.',
    localTip: 'Free, and arguably the single best skyline photo spot in the city — go near sunset.',
    practicalInfo: 'Open 6am–10pm. Free. Street parking nearby can be tight on weekends.',
  },
];