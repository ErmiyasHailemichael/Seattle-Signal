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
    {
    id: 'space-needle',
    name: 'Space Needle',
    category: 'landmark',
    coordinates: { lat: 47.6205063, lng: -122.3492774 },
    address: '400 Broad St, Seattle, WA 98109, USA',
    description:
      'Iconic, 605-ft-tall spire at the Seattle Center, with an observation deck & a rotating restaurant.',
  },
  {
    id: 'chihuly-garden-and-glass',
    name: 'Chihuly Garden and Glass',
    category: 'landmark',
    coordinates: { lat: 47.620559899999996, lng: -122.3504476 },
    address: '305 Harrison St, Seattle, WA 98109, USA',
    description:
      "Art museum & sculpture garden showcasing Dale Chihuly's large, colorful glass works.",
  },
  {
    id: 'seattle-aquarium',
    name: 'Seattle Aquarium',
    category: 'landmark',
    coordinates: { lat: 47.6074002, lng: -122.34295589999998 },
    address: '1483 Alaskan Way Pier 59, Seattle, WA 98101, USA',
    description:
      'Popular waterfront aquarium with interactive exhibits, a cafe & virtual reality shows.',
  },
  {
    id: 'seattle-central-library',
    name: 'Seattle Public Library - Central Library',
    category: 'landmark',
    coordinates: { lat: 47.6067659, lng: -122.3326439 },
    address: '1000 4th Ave, Seattle, WA 98104, USA',
    description:
      'Dramatic, view-filled facility lending books, films & music, plus numerous public computers.',
  },
  {
    id: 'mopop',
    name: 'Museum of Pop Culture',
    category: 'landmark',
    coordinates: { lat: 47.6214824, lng: -122.3481245 },
    address: '325 5th Ave N, Seattle, WA 98109, USA',
    description:
      'Inspired by Jimi Hendrix, the museum includes items from icons ranging from Bo Diddley to Bob Dylan.',
  },
  {
    id: 'seattle-center',
    name: 'Seattle Center',
    category: 'landmark',
    coordinates: { lat: 47.620597599999996, lng: -122.3505055 },
    address: '305 Harrison St, Seattle, WA 98109, USA',
    description:
      'Huge community events complex with museums, theaters, restaurants & shops, plus the Space Needle.',
  },
  {
    id: 'seattle-art-museum',
    name: 'Seattle Art Museum',
    category: 'landmark',
    coordinates: { lat: 47.6075253, lng: -122.3379599 },
    address: '1300 1st Ave, Seattle, WA 98101, USA',
    description:
      'This roomy space hosts special exhibits & a permanent collection of both current & classic artworks.',
  },
  {
    id: 'olympic-sculpture-park',
    name: 'Olympic Sculpture Park',
    category: 'park',
    coordinates: { lat: 47.616602799999995, lng: -122.35531669999999 },
    address: '2901 Western Ave, Seattle, WA 98121, USA',
    description:
      'An offshoot of the Seattle Art Museum, this park features numerous sculptures spread over 9 acres.',
  },
  {
    id: 'gum-wall',
    name: 'The Gum Wall',
    category: 'landmark',
    coordinates: { lat: 47.6083607, lng: -122.34033819999998 },
    address: '1428 Post Alley, Seattle, WA 98101, USA',
    description:
      'Iconic brick wall covered with chewed-up gum in an alley under Pike Place Market.',
  },
  {
    id: 'pacific-science-center',
    name: 'Pacific Science Center',
    category: 'landmark',
    coordinates: { lat: 47.6200033, lng: -122.3515819 },
    address: '200 Sue Bird Ct N, Seattle, WA 98109, USA',
    description:
      'Rotating science exhibits plus laser light shows, a tropical butterfly house & IMAX movie theaters.',
  },
  {
    id: 'great-wheel',
    name: 'The Seattle Great Wheel',
    category: 'landmark',
    coordinates: { lat: 47.6061342, lng: -122.34252459999999 },
    address: '1301 Alaskan Wy, Seattle, WA 98101, USA',
    description:
      "Giant Ferris wheel offering climate-controlled gondolas & a bird's-eye view of the city's landmarks.",
  },
  {
    id: 'cal-anderson-park',
    name: 'Cal Anderson Park',
    category: 'park',
    coordinates: { lat: 47.6170185, lng: -122.31912700000001 },
    address: '1635 11th Ave, Seattle, WA 98122, USA',
    description:
      'This historic recreational area hosts special events & has a jogging path, ball field & wading pool.',
  },
  {
    id: 'volunteer-park',
    name: 'Volunteer Park',
    category: 'park',
    coordinates: { lat: 47.6310836, lng: -122.3163794 },
    address: '1247 15th Ave E, Seattle, WA 98112, USA',
    description:
      "Designated landmark includes a conservatory, a children's play area & the Seattle Asian Art Museum.",
  },
  {
    id: 'mohai',
    name: 'Museum of History & Industry (MOHAI)',
    category: 'historic',
    coordinates: { lat: 47.6275834, lng: -122.3369027 },
    address: '860 Terry Ave N, Seattle, WA 98109, USA',
    description:
      "Iconic artifacts & diverse collections spotlighting Seattle's history in a lakefront park building.",
  },
  {
    id: 'waterfront-park',
    name: 'Waterfront Park',
    category: 'park',
    coordinates: { lat: 47.60704, lng: -122.34182759999999 },
    address: '1401 Alaskan Wy, Seattle, WA 98101, USA',
    description:
      'Public park with a boardwalk & a pair of sculptures, plus views of the skyline & ships in drydock.',
  },
  {
    id: 'lenin-statue',
    name: 'Statue of Lenin',
    category: 'landmark',
    coordinates: { lat: 47.6512744, lng: -122.35074429999999 },
    address: '3526 Fremont Pl N, Seattle, WA 98103, USA',
    description:
      '7-ton, 16-foot-tall bronze sculpture of Russian communist revolutionary Vladimir Lenin.',
  },
  {
    id: 'golden-gardens-park',
    name: 'Golden Gardens Park',
    category: 'park',
    coordinates: { lat: 47.6917517, lng: -122.40309119999999 },
    address: '8498 Seaview Pl NW, Seattle, WA 98117, USA',
    description:
      'City park draws outdoor lovers for Puget Sound & mountain views, trails & a dog off-leash area.',
  },
  {
    id: 'discovery-park',
    name: 'Discovery Park',
    category: 'park',
    coordinates: { lat: 47.6613197, lng: -122.41714130000001 },
    address: 'Seattle, WA 98199, USA',
    description:
      "Seattle's largest green space features miles of rugged trails & beaches, plus views of the Sound.",
  },
  {
    id: 'smith-tower',
    name: 'Smith Tower',
    category: 'historic',
    coordinates: { lat: 47.601852799999996, lng: -122.33185829999998 },
    address: '506 2nd Ave, Seattle, WA 98104, USA',
    description:
      'Iconic 1914 office tower featuring a speakeasy-style cocktail bar & a 35th-floor observatory.',
  },
  {
    id: 'chinatown-id-gate',
    name: 'Historic Chinatown Gate',
    category: 'landmark',
    coordinates: { lat: 47.5983847, lng: -122.3273644 },
    address: '504 5th Ave S, Seattle, WA 98104, USA',
    description:
      'A 45-foot paifang archway spanning South King Street, marking the western entrance to the Chinatown-International District — a neighborhood that\'s also home to Japantown and Little Saigon. Dedicated in 2008 after the local Chinese community spent decades planning it.',
  },
  {
    id: 'alki-beach',
    name: 'Alki Beach',
    category: 'park',
    coordinates: { lat: 47.5814993, lng: -122.40570079999999 },
    address: 'Alki Beach, Seattle, WA 98116, USA',
    description:
      'Popular beach with views of Puget Sound, plus a walking path, volleyball courts & restaurants.',
  },
  {
    id: 'washington-park-arboretum',
    name: 'Washington Park Arboretum',
    category: 'park',
    coordinates: { lat: 47.6364162, lng: -122.2958146 },
    address: '2300 Arboretum Dr E, Seattle, WA 98112, USA',
    description:
      'On the shores of Lake Washington, this 230-acre preserve features rare trees & a Japanese garden.',
  },
  {
    id: 'original-starbucks',
    name: 'Starbucks Original Store',
    category: 'food',
    coordinates: { lat: 47.61004, lng: -122.34259000000002 },
    address: '1912 Pike Pl, Seattle, WA 98101, USA',
    description:
      "The original Starbucks location, opened in 1971 — the only store still using the chain's original brown siren logo. A real working coffee shop that's also become a popular, often-crowded tourist stop.",
  },
    {
    id: 'woodland-park-zoo',
    name: 'Woodland Park Zoo',
    category: 'landmark',
    coordinates: { lat: 47.668436, lng: -122.3508786 },
    address: 'Seattle, WA 98103, USA',
    description:
      '92-acre zoo with nearly 300 species, a vintage carousel, summer concerts & an indoor play space.',
  },
  {
    id: 'waiting-for-the-interurban',
    name: 'Waiting For The Interurban',
    category: 'landmark',
    coordinates: { lat: 47.6494669, lng: -122.3494884 },
    address: '601 N 34th St suite b, Seattle, WA 98103, USA',
    description:
      "A cast-aluminum sculpture of five people, a baby, and a dog waiting for a long-gone streetcar line, made by Richard Beyer in 1978 to mark Fremont's centennial. Locals regularly dress the figures up for holidays and events — it's become one of the most recognizable pieces of public art in the Northwest.",
  },
  {
    id: 'hat-n-boots',
    name: 'Hat & Boots Park',
    category: 'landmark',
    coordinates: { lat: 47.5451051, lng: -122.3216995 },
    address: '6427 Carleton Ave S, Seattle, WA 98108, USA',
    description:
      'A giant pair of cowboy boots & a hat are the focus of this grassy area with paths & a playground.',
  },
  {
    id: 'kurt-cobain-bench',
    name: 'Kurt Cobain Memorial Bench',
    category: 'landmark',
    coordinates: { lat: 47.6192199, lng: -122.2820428 },
    address: 'Viretta Park, 151 E Lk Washington Blvd, Seattle, WA 98112, USA',
    description:
      "An unofficial memorial at Viretta Park, just downhill from the house where Kurt Cobain died in 1994. There's no plaque — just park benches where Nirvana fans have left notes and tributes for decades, especially around the anniversary of his death each April.",
  },
  {
    id: 'jimi-hendrix-statue',
    name: 'Jimi Hendrix Statue',
    category: 'landmark',
    coordinates: { lat: 47.615510799999996, lng: -122.3207065 },
    address: '1604 Broadway, Seattle, WA 98122, USA',
    description:
      'Legendary guitar player & singer, Jimi Hendrix was born in Seattle & remembered by this statue.',
  },
  {
    id: 'dicks-drive-in',
    name: "Dick's Drive-In",
    category: 'food',
    coordinates: { lat: 47.6610617, lng: -122.32777730000001 },
    address: '111 NE 45th St, Seattle, WA 98105, USA',
    description:
      'Part of an old-school chain of fast-food spots offering burgers, fries & hand-dipped shakes.',
  },
  {
    id: 'hing-hay-park',
    name: 'Hing Hay Park',
    category: 'park',
    coordinates: { lat: 47.5985466, lng: -122.32573950000001 },
    address: '423 Maynard Ave S, Seattle, WA 98104, USA',
    description:
      'This urban park is a popular lunch spot & features a brick square with a pavilion built in Taiwan.',
  },
  {
    id: 'burke-museum',
    name: 'Burke Museum of Natural History and Culture',
    category: 'landmark',
    coordinates: { lat: 47.660614699999996, lng: -122.31159869999999 },
    address: '4303 Memorial Way Northeast, Seattle, WA 98195, USA',
    description:
      'University of Washington museum explores Northwest history from dinosaurs to Native American life.',
  },
  {
    id: 'suzzallo-library',
    name: 'Suzzallo and Allen Libraries',
    category: 'landmark',
    coordinates: { lat: 47.655883499999995, lng: -122.3084354 },
    address: '4000 15th Ave NE, Seattle, WA 98195, USA',
    description:
      "The University of Washington's central library, built in Collegiate Gothic style, with guided tours.",
  },
  {
    id: 'drumheller-fountain',
    name: 'Drumheller Fountain',
    category: 'viewpoint',
    coordinates: { lat: 47.653825399999995, lng: -122.30780569999999 },
    address: 'Seattle, WA 98195, USA',
    description:
      'Built on the site of the Olmsted Brothers\' "Geyser Basin," the centerpiece of the 1909 Alaska-Yukon-Pacific Exposition held on this campus. Long nicknamed "Frosh Pond," it got its current fountain and name in the early 1960s, a donation honoring the university\'s centennial.',
  },
  {
    id: 'green-lake-park',
    name: 'Green Lake Park',
    category: 'park',
    coordinates: { lat: 47.680214299999996, lng: -122.32840209999999 },
    address: '7201 East Green Lake Dr N, Seattle, WA 98115, USA',
    description:
      'Recreation area with trails, beach & boathouse, plus tennis courts, baseball fields & indoor pool.',
  },
  {
    id: 'magnuson-park',
    name: 'Warren G. Magnuson Park',
    category: 'park',
    coordinates: { lat: 47.6797687, lng: -122.25360219999999 },
    address: '7400 Sand Point Way NE, Seattle, WA 98115, USA',
    description:
      'Leafy city park along the shores of Lake Washington, with historic art deco homes, wetlands & art.',
  },
];