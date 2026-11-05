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
    {
    id: 'pike-place-market',
    name: 'Pike Place Market',
    category: 'landmark',
    coordinates: { lat: 47.6094076, lng: -122.34183580000001 },
    address: '85 Pike St, Seattle, WA 98101, USA',
    description:
      "Landmark daily market with famed fish-throwing seafood vendors, produce stalls & other shops.",
  },
  {
    id: 'fremont-troll',
    name: 'Fremont Troll',
    category: 'landmark',
    coordinates: { lat: 47.6510628, lng: -122.34749880000001 },
    address: 'North 36th Street, Troll Ave N, Seattle, WA 98103, USA',
    description:
      "Troll Under the Bridge is an interactive, 6.5-ton, mixed media statue made in 1990 by local artists.",
  },
  {
    id: 'fremont-rocket',
    name: 'The Fremont Rocket',
    category: 'landmark',
    coordinates: { lat: 47.6505556, lng: -122.35111110000001 },
    address: '3420 Evanston Ave N, Seattle, WA 98103, USA',
    description:
      "Eccentric, 53-foot neighborhood landmark, constructed from a Cold War–era rocket.",
  },
  {
    id: 'center-of-the-universe-signpost',
    name: 'Center of the Universe Signpost',
    category: 'landmark',
    coordinates: { lat: 47.650500799999996, lng: -122.3500757 },
    address: '3427 Fremont Pl N, Seattle, WA 98103, USA',
    description:
      "A signpost in Fremont's traffic triangle marking the neighborhood's tongue-in-cheek claim to being the \"Center of the Universe\" — a joke that started among Fremont's artists and residents and stuck. Arrows point to nearby landmarks like the Troll and the Rocket, plus a few cosmic ones: the Milky Way, Atlantis, the North Pole.",
  },
  {
    id: 'wallingford-ladybug',
    name: 'The Wallingford Ladybug',
    category: 'landmark',
    coordinates: { lat: 47.664259099999995, lng: -122.33515799999999 },
    address: '4820 Burke Ave N, Seattle, WA 98103, USA',
    description:
      "A ladybug painted across a residential street intersection in Wallingford, one of several neighborhood street murals in the area. Neighbors hold a painting party every so often to refresh the colors.",
  },
  {
    id: 'gas-works-park',
    name: 'Gas Works Park',
    category: 'park',
    coordinates: { lat: 47.6456308, lng: -122.33435320000001 },
    address: '2101 N Northlake Way, Seattle, WA 98103, USA',
    description:
      "Former site of an oil plant is now a 20-acre park with picnic facilities & dramatic city views.",
  },
  {
    id: 'pioneer-square',
    name: 'Pioneer Square',
    category: 'historic',
    coordinates: { lat: 47.6020338, lng: -122.33388599999999 },
    address: '100 Yesler Wy, Seattle, WA 98104, USA',
    description:
      "Small, historic park with turn-of-the-century streetlamps, a totem pole & a bust of Chief Seattle.",
  },
  {
    id: 'ballard-locks',
    name: 'Ballard (Hiram M. Chittenden) Locks',
    category: 'landmark',
    coordinates: { lat: 47.665504299999995, lng: -122.39718379999998 },
    address: '3015 NW 54th St, Seattle, WA 98107, USA',
    description:
      "Waterway with opportunities for viewing salmon during the summer & park with unusual shrubs & trees.",
  },
];