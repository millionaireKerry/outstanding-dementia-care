export interface DreamHomeCard {
  id: string;
  title: string;
  category: 'Room' | 'Corridor' | 'Outdoor' | 'Feature';
  image: string;
  shortDescription: string;
  howToAchieve: string[];
  sensoryImmersion: string[];
}

export const dreamHomeData: DreamHomeCard[] = [
  {
    id: "music-room",
    title: "The Cavern Music Room",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_music_room_ea013278.png",
    shortDescription: "A warm, nostalgic music venue inspired by the Cavern Club, completely achievable without structural changes.",
    howToAchieve: [
      "Paint main walls in a deep, warm terracotta or dark red to create an intimate atmosphere.",
      "Apply brick-effect wallpaper to a feature corner to give an underground venue feel.",
      "Hang framed printed photographs of iconic 1950s/60s artists (The Beatles, Cilla Black).",
      "Mount vinyl records on the walls as decorative art.",
      "Use safe floor stands for a drum kit and electric guitars (ensure no loose cables).",
      "Provide high-backed leather armchairs arranged in a horseshoe facing a small performance area."
    ],
    sensoryImmersion: [
      "Visual: Warm golden track spotlights and wall sconces.",
      "Auditory: A working vintage-style jukebox playing 1960s hits.",
      "Tactile: Smooth vinyl records, leather armchairs, wooden instruments.",
      "Olfactory: The smell of fresh tea and warm biscuits."
    ]
  },
  {
    id: "tea-room",
    title: "The Vintage Tea Room",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_tearoom_ea254d33.png",
    shortDescription: "A charming 1950s British café setting for socialising and afternoon tea.",
    howToAchieve: [
      "Paint walls in soft pastel mint green and pale pink.",
      "Hang framed vintage British advertising prints (Lyons Tea, Hovis, Bisto).",
      "Drape Union Jack bunting from the ceiling.",
      "Use round tables with lace doily tablecloths and floral china.",
      "Install safe black and white chequerboard vinyl flooring."
    ],
    sensoryImmersion: [
      "Visual: Bright pastel colours, patterned china, frosted pendant lights.",
      "Auditory: Soft background music from a vintage jukebox.",
      "Tactile: Delicate lace tablecloths, smooth china cups.",
      "Olfactory: Freshly brewed tea, warm scones, and sweet cakes."
    ]
  },
  {
    id: "baking-kitchen",
    title: "1970s Baking Kitchen",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_kitchen_f2b09f2d.png",
    shortDescription: "A cosy, nostalgic kitchen activity room styled for safe, supervised baking.",
    howToAchieve: [
      "Paint walls warm cream and use retro floral wallpaper panels as a feature.",
      "Display retro orange and yellow kitchen tins and ceramic bowls on open shelving.",
      "Use a sturdy wooden kitchen table as the central activity hub.",
      "Provide colourful aprons for residents.",
      "Ensure all baking ingredients are accessible but keep sharp implements out of view."
    ],
    sensoryImmersion: [
      "Visual: Warm golden light, bright 1970s floral patterns.",
      "Auditory: The sound of wooden spoons mixing in ceramic bowls.",
      "Tactile: Flour on hands, kneading dough, smooth ceramic bowls.",
      "Olfactory: The irresistible smell of baking biscuits and vanilla."
    ]
  },
  {
    id: "tv-lounge",
    title: "1970s TV Lounge",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_tv_lounge_37edeead.png",
    shortDescription: "A comfortable, retro lounge perfect for watching classic television programmes.",
    howToAchieve: [
      "Create a feature wall with retro orange and gold floral wallpaper.",
      "Mount a flat-screen TV but dress the area with a dark wood sideboard.",
      "Add a vintage-style record player and a yellow rotary telephone as props.",
      "Stock a bookshelf with old magazines (TV Times, Radio Times).",
      "Use armchairs upholstered in warm orange and gold floral fabric."
    ],
    sensoryImmersion: [
      "Visual: Familiar 1970s colour palette (orange, gold, brown).",
      "Auditory: Classic TV theme tunes (like Top of the Pops).",
      "Tactile: Heavy floral fabrics, the dial of a rotary telephone.",
      "Olfactory: Use a subtle room diffuser with a nostalgic scent like lavender polish or a hint of pipe tobacco."
    ]
  },
  {
    id: "highstreet-corridor",
    title: "Vintage High Street",
    category: "Corridor",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_highstreet_corridor_619bf7b7.png",
    shortDescription: "A corridor transformed into a 1950s British high street using flat murals.",
    howToAchieve: [
      "Apply printed wall murals of a Post Office and Newsagents directly to the flat wall.",
      "Mount a real, tactile red GPO post box safely on the wall.",
      "Hang framed vintage newspaper front pages.",
      "Place a wooden bench with a cushion in the corridor for resting.",
      "Ensure the corridor remains wide, clear, and brightly lit."
    ],
    sensoryImmersion: [
      "Visual: Trompe-l'oeil shopfronts that look 3D but are safely flat.",
      "Auditory: Quiet ambient street sounds played softly from a hidden speaker.",
      "Tactile: The cold metal of the real post box, the wooden bench.",
      "Olfactory: A faint scent of newsprint or old paper near the newsagents."
    ]
  },
  {
    id: "reminiscence-office",
    title: "1980s Secretary's Office",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_office_26e2ce81.png",
    shortDescription: "A purposeful reminiscence room for residents who worked in offices.",
    howToAchieve: [
      "Cover one wall with a large cork noticeboard pinned with old memos, calendars, and photos.",
      "Set up a wooden desk with a vintage beige CRT monitor (unplugged) and a rotary telephone.",
      "Provide in/out trays, a desk lamp, and a yellow coffee mug.",
      "Include a filing cabinet and open shelving with colourful ring binders.",
      "Use a padded swivel office chair."
    ],
    sensoryImmersion: [
      "Visual: Tidy, purposeful workspace with familiar 1980s office items.",
      "Auditory: The satisfying click of a rotary dial telephone or a typewriter.",
      "Tactile: Smooth plastic ring binders, paper files, the corkboard.",
      "Olfactory: The smell of fresh paper, pencils, and perhaps a hint of instant coffee."
    ]
  },
  {
    id: "holiday-corridor",
    title: "Mediterranean Holiday Corridor",
    category: "Corridor",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_holiday_corridor_913e326e.png",
    shortDescription: "A sunny, cheerful corridor evoking memories of Spanish or Greek holidays.",
    howToAchieve: [
      "Apply large photographic wall murals of a sunny village street with blue skies.",
      "Fix artificial bougainvillea flowers along the top of the murals for a 3D effect.",
      "Place a real bistro table and chairs with a gingham cloth in front of a tapas bar mural.",
      "Add terracotta pots with artificial Mediterranean plants (olive trees, geraniums).",
      "Use props like a vintage suitcase and a straw sun hat."
    ],
    sensoryImmersion: [
      "Visual: Bright sunlight colours, vibrant pink flowers, terracotta.",
      "Auditory: Soft acoustic guitar or gentle waves playing from a hidden speaker.",
      "Tactile: The rough texture of terracotta pots, the woven straw hat.",
      "Olfactory: Citrus, sea salt, or a warm sunscreen scent via a diffuser."
    ]
  },
  {
    id: "seaside-corridor",
    title: "British Seaside Corridor",
    category: "Corridor",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_seaside_corridor_cccf798a.png",
    shortDescription: "A classic British beach scene complete with deckchairs and a beach hut.",
    howToAchieve: [
      "Use a photographic mural of a British beach and pier.",
      "Paint the ceiling pale sky blue with white clouds blending into the mural.",
      "Paint a flat trompe-l'oeil red and white striped beach hut on the wall.",
      "Place classic wooden deckchairs on a sandy-textured vinyl mat.",
      "String pastel bunting along the corridor."
    ],
    sensoryImmersion: [
      "Visual: Calming blues and sandy yellows, bright bunting.",
      "Auditory: The sound of seagulls and gentle waves crashing.",
      "Tactile: Canvas deckchair fabric, the textured sandy floor mat.",
      "Olfactory: Sea breeze, salt water, or even a hint of fish and chips."
    ]
  },
  {
    id: "ice-cream-parlour",
    title: "Vintage Ice Cream Parlour",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_icecream_parlour_e5ecd217.png",
    shortDescription: "A joyful, pastel-coloured social space for enjoying sweet treats.",
    howToAchieve: [
      "Paint walls soft pastel pink and cream.",
      "Apply a mural of a parlour counter with a striped awning.",
      "Place a real white wooden serving counter in front, dressed with sweet jars and cones.",
      "Use round bistro tables with blue gingham cloths and pink metal café chairs.",
      "Hang framed vintage ice cream posters."
    ],
    sensoryImmersion: [
      "Visual: Bright, cheerful pastel colours and colourful ice cream sundaes.",
      "Auditory: Upbeat 1950s pop music.",
      "Tactile: Cold glass sundae dishes, smooth metal chairs.",
      "Olfactory: Vanilla, strawberry, and sweet waffle cones."
    ]
  },
  {
    id: "listening-pod",
    title: "The Listening Pod Studio",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_listening_pod_20a607ab.png",
    shortDescription: "An intimate recording studio booth for residents to record their life stories.",
    howToAchieve: [
      "Mount fabric-wrapped acoustic panels (wooden frames covered in fabric) to the walls.",
      "Install a glowing red 'ON AIR' sign.",
      "Set up a desk with a vintage chrome microphone, a laptop, and headphones.",
      "Provide a very comfortable armchair with cushions.",
      "Hang black and white photos of 1960s radio presenters."
    ],
    sensoryImmersion: [
      "Visual: Warm amber lighting, the exciting red glow of the ON AIR sign.",
      "Auditory: A quiet, acoustically dampened space perfect for speaking and listening.",
      "Tactile: Soft fabric wall panels, the heavy metal of the vintage microphone.",
      "Olfactory: Keep the air clean and neutral to aid concentration and comfort."
    ]
  },
  {
    id: "pub-snug",
    title: "The Pub Snug",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_pub_snug_788445d7.png",
    shortDescription: "A classic British public house corner, achievable without structural work.",
    howToAchieve: [
      "Use brick-effect wallpaper on the feature wall.",
      "Apply dark painted dado panelling to the lower walls.",
      "Mount a dartboard safely on the wall.",
      "Provide deep red Chesterfield wingback armchairs with tartan cushions.",
      "Use a patterned carpet in warm reds and golds."
    ],
    sensoryImmersion: [
      "Visual: Dim, warm golden lighting from wall sconces.",
      "Auditory: Low murmur of pub chatter or traditional pub piano music.",
      "Tactile: Deep buttoned leather armchairs, the bristle of the dartboard.",
      "Olfactory: Use an essential oil diffuser with scents of leather, polished wood, or subtle tobacco/hops."
    ]
  },
  {
    id: "nursery",
    title: "Reminiscence Nursery",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_nursery_101f106c.png",
    shortDescription: "A tender, nostalgic space evoking memories of motherhood and childhood.",
    howToAchieve: [
      "Paint walls warm cream with a delicate pastel floral wallpaper panel.",
      "Fix a white clothes rail holding tiny vintage baby clothes.",
      "Place a classic wicker Moses basket on a rocking stand in the centre.",
      "Provide a cream nursing armchair with a soft pink cushion.",
      "Dress a chest of drawers with a vintage Johnson's Baby Powder tin."
    ],
    sensoryImmersion: [
      "Visual: Soft, gentle pastel colours and warm lamp light.",
      "Auditory: A gently playing lullaby or the soft sound of a music box.",
      "Tactile: Soft baby blankets, fluffy rugs, smooth wooden toys.",
      "Olfactory: The unmistakable, deeply evocative scent of baby powder."
    ]
  },
  {
    id: "sensory-room",
    title: "Calming Sensory Room",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_sensory_room_30baec38.png",
    shortDescription: "A peaceful therapeutic space using standard, accessible sensory equipment.",
    howToAchieve: [
      "Paint walls in soft lavender or pale lilac.",
      "Install freestanding illuminated bubble tubes in the corner.",
      "Use a star projector to cast stars across the ceiling.",
      "Provide a large white bean bag sofa and a comfortable armchair.",
      "Place a fibre optic light spray on the floor for tactile engagement."
    ],
    sensoryImmersion: [
      "Visual: Slowly changing coloured lights, rising bubbles, starry ceiling.",
      "Auditory: The gentle hum and bubbling water sound from the tubes.",
      "Tactile: Stroking the fibre optic strands, sinking into the bean bag.",
      "Olfactory: A gentle mist diffuser with calming lavender or chamomile."
    ]
  },
  {
    id: "accessible-garden",
    title: "Accessible Sensory Garden",
    category: "Outdoor",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_garden_96baf37a.png",
    shortDescription: "A safe, uncluttered garden designed specifically for wheelchairs and easy reach.",
    howToAchieve: [
      "Build tall raised beds at waist height (75-80cm) to eliminate bending.",
      "Lay wide, smooth, flat concrete paving (no gravel or uneven edges).",
      "Keep the design uncluttered with plenty of turning space for wheelchairs.",
      "Provide sturdy wooden benches with armrests right beside the planters.",
      "Plant colourful, scented herbs and flowers like lavender."
    ],
    sensoryImmersion: [
      "Visual: Brightly coloured flowers, clear open pathways.",
      "Auditory: Birdsong, the rustle of leaves, perhaps a small, safe water feature.",
      "Tactile: Touching soil, feeling the different textures of plant leaves.",
      "Olfactory: Fresh lavender, rosemary, mint, and damp earth."
    ]
  },
  {
    id: "front-doors",
    title: "Personalised Front Doors",
    category: "Corridor",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_front_doors_e7f8c67d.png",
    shortDescription: "Bedroom doors wrapped in full-size photos of residents' actual former front doors.",
    howToAchieve: [
      "Order full-size, custom-printed vinyl door stickers showing each resident's old front door.",
      "Apply the wraps directly to the standard fire doors.",
      "Add a small personalised name plate beside each door.",
      "Place a familiar coir doormat in front of the door.",
      "Add a small potted plant beside the door if they had one at home."
    ],
    sensoryImmersion: [
      "Visual: Instant, powerful recognition of a lifelong visual memory.",
      "Auditory: The familiar sound of their own door knocker (if a real one is safely attached).",
      "Tactile: The rough texture of the coir doormat.",
      "Olfactory: Fresh flowers or a familiar home scent near the entrance."
    ]
  },
  {
    id: "library",
    title: "Reading Library Corner",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_library_a09af75f.png",
    shortDescription: "A quiet, cosy reading nook created with freestanding furniture.",
    howToAchieve: [
      "Use tall freestanding dark oak bookshelves.",
      "Position a comfortable caramel velvet wingback armchair in the corner.",
      "Add a tall floor lamp with a warm cream shade.",
      "Place a small round side table for tea and books.",
      "Lay a patterned Persian-style rug on the floor."
    ],
    sensoryImmersion: [
      "Visual: Warm, muted colours, rows of colourful book spines.",
      "Auditory: A quiet, hushed environment, the rustle of turning pages.",
      "Tactile: Soft velvet upholstery, the texture of old paper and book covers.",
      "Olfactory: The comforting, slightly dusty scent of old books and polished wood."
    ]
  },
  {
    id: "hair-salon",
    title: "Vintage Hair Salon",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_salon_bfcdf77d.png",
    shortDescription: "A glamorous 1960s-style ladies' hairdresser for weekly pampering.",
    howToAchieve: [
      "Paint walls soft blush pink.",
      "Use a cream painted wooden dressing table with large round gold-framed mirrors.",
      "Install standard pink hydraulic salon chairs.",
      "Include a vintage white hooded hair dryer on a stand.",
      "Dress the counter with pastel bottles, rollers, and 1960s advertisement prints."
    ],
    sensoryImmersion: [
      "Visual: Flattering warm light, glamorous pinks and golds.",
      "Auditory: The hum of the hair dryer, the snip of scissors, cheerful salon chatter.",
      "Tactile: Soft towels, the feeling of having hair brushed and styled.",
      "Olfactory: Classic hairspray, setting lotion, and floral shampoo."
    ]
  },
  {
    id: "sweet-shop",
    title: "The Sweet Shop",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_sweet_shop_57aa412f.png",
    shortDescription: "A joyful traditional sweet shop corner using a mural and a freestanding counter.",
    howToAchieve: [
      "Apply a white metro tile wallpaper mural to the wall.",
      "Fix real wooden floating shelves over the mural to hold glass sweet jars.",
      "Use a freestanding dark wood counter with a vintage cash register.",
      "Hang a hand-painted wooden 'Sweet Shop' sign.",
      "String red, white, and blue bunting across the area."
    ],
    sensoryImmersion: [
      "Visual: Brightly coloured sweets, nostalgic branding.",
      "Auditory: The ringing bell of a vintage cash register, the clinking of glass jar lids.",
      "Tactile: Reaching into jars, holding paper bags of sweets.",
      "Olfactory: A strong, joyful scent of strawberries, cherries, or sherbet."
    ]
  },
  {
    id: "bus-stop",
    title: "The Bus Stop Corridor",
    category: "Corridor",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_bus_stop_ba652210.png",
    shortDescription: "A calming wayfinding feature for residents experiencing exit-seeking anxiety.",
    howToAchieve: [
      "Mount a full-size blue and white bus stop pole and sign securely.",
      "Place a classic wooden slatted park bench with armrests beneath it.",
      "Mount a printed bus timetable in a silver frame.",
      "Hang framed vintage London Transport posters nearby.",
      "Ensure the corridor is wide and safely lit."
    ],
    sensoryImmersion: [
      "Visual: The highly recognisable, iconic blue and white bus stop sign.",
      "Auditory: Quiet, distant sounds of a gentle town centre.",
      "Tactile: The solid, familiar feel of a wooden park bench.",
      "Olfactory: Fresh air scent or a subtle hint of rain on pavement."
    ]
  },
  {
    id: "quiet-room",
    title: "Multi-Faith Quiet Room",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_quiet_room_e205beba.png",
    shortDescription: "A peaceful, inclusive space for reflection, prayer, and calm.",
    howToAchieve: [
      "Paint walls soft warm cream and keep the room uncluttered.",
      "Hang simple framed prints of different faith symbols (Cross, Om, Star of David).",
      "Set up a central wooden table with a white lace cloth, candles (battery operated), and flowers.",
      "Provide an open bookcase with holy texts from various religions.",
      "Arrange comfortable, simple chairs in a quiet semicircle."
    ],
    sensoryImmersion: [
      "Visual: Soft, dim, serene lighting; uncluttered surfaces.",
      "Auditory: Complete silence, or very soft, ethereal instrumental music.",
      "Tactile: Smooth prayer beads, soft meditation cushions, lace cloths.",
      "Olfactory: Frankincense, myrrh, or a very subtle, clean linen scent."
    ]
  },
  {
    id: "cinema",
    title: "Vintage Cinema",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_cinema_affeb326.png",
    shortDescription: "A glamorous picture house experience using standard projector equipment.",
    howToAchieve: [
      "Paint walls deep burgundy red with gold coving.",
      "Install a ceiling-mounted digital projector and a pull-down white screen.",
      "Arrange rows of large red velvet high-backed armchairs.",
      "Frame the screen with dark red velvet curtains.",
      "Add a vintage-style popcorn machine on a stand."
    ],
    sensoryImmersion: [
      "Visual: The contrast of the bright screen in a dark, red-velvet room.",
      "Auditory: High-quality, clear sound from classic films and musicals.",
      "Tactile: Plush velvet armchairs, warm teacups.",
      "Olfactory: The unmistakable, mouth-watering smell of warm popcorn."
    ]
  },
  {
    id: "laundry",
    title: "Laundry Activity Room",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_laundry_d746ba3a.png",
    shortDescription: "A safe, purposeful space for residents to engage in familiar domestic tasks.",
    howToAchieve: [
      "Install a single front-loading washing machine on a low, accessible plinth.",
      "Provide a wooden folding table for sorting clothes.",
      "Supply baskets of clean, pastel-coloured towels and clothes for folding.",
      "Ensure the ironing board is folded away safely when not supervised.",
      "Use open shelving for safe, colourful laundry props."
    ],
    sensoryImmersion: [
      "Visual: Bright, clean space with cheerful gingham blinds.",
      "Auditory: The gentle, rhythmic hum of a washing machine.",
      "Tactile: The warmth and softness of freshly tumble-dried towels.",
      "Olfactory: Fresh linen, clean cotton, and washing powder."
    ]
  },
  {
    id: "potting-shed",
    title: "Indoor Potting Shed",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_potting_shed_511b94f7.png",
    shortDescription: "An accessible gardening space bringing the joy of the shed safely indoors.",
    howToAchieve: [
      "Clad the walls in warm honey-coloured tongue and groove wood panelling.",
      "Build a sturdy workbench with a lower section for wheelchair access.",
      "Hang safe, rounded garden tools on a pegboard.",
      "Provide compost, terracotta pots, and flowering plants for repotting.",
      "Add props like a radio, a straw hat, and wellington boots."
    ],
    sensoryImmersion: [
      "Visual: Earthy browns, vibrant greens, and the rustic look of wood panelling.",
      "Auditory: A battery-powered radio playing classic tunes or the shipping forecast.",
      "Tactile: Plunging hands into cool compost, the rough edge of terracotta.",
      "Olfactory: Rich potting soil, geranium leaves, and damp wood."
    ]
  },
  {
    id: "hen-house",
    title: "The Hen House",
    category: "Outdoor",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_chickens_04b7e81d.png",
    shortDescription: "A joyful outdoor activity area for collecting eggs and watching chickens.",
    howToAchieve: [
      "Install a sturdy wooden chicken coop painted in sage green.",
      "Ensure the nesting boxes are at waist height so no bending is required.",
      "Create a wide, smooth paved path leading directly to the coop for wheelchairs.",
      "Place a wooden bench with armrests nearby for comfortable viewing.",
      "Keep a small flock of friendly, mixed-colour hens."
    ],
    sensoryImmersion: [
      "Visual: The busy, jerky movements of chickens, bright outdoor sunshine.",
      "Auditory: Gentle clucking, scratching in the dirt, and morning birdsong.",
      "Tactile: The smooth, warm shell of a freshly laid egg.",
      "Olfactory: Fresh outdoor air, straw, and nature."
    ]
  },
  {
    id: "activities-room",
    title: "Bright Activities Room",
    category: "Room",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663195447750/C4sZdm4AzTGBpMWqRug5mc/care_home_activities_room_ea24b8c4.png",
    shortDescription: "A spacious, organised hub for games, crafts, and socialising.",
    howToAchieve: [
      "Paint walls in a warm, uplifting sunshine yellow.",
      "Create distinct zones: a jigsaw table, a craft table, and a games area.",
      "Use low open shelving so residents can easily self-select games and puzzles.",
      "Ensure wide, clear spaces between furniture for easy wheelchair navigation.",
      "Display residents' artwork proudly on cork boards."
    ],
    sensoryImmersion: [
      "Visual: Bright, stimulating colours, large-print materials, clear sightlines.",
      "Auditory: The clatter of dominoes, laughter, and sociable conversation.",
      "Tactile: The snap of jigsaw pieces fitting together, the glide of a paintbrush.",
      "Olfactory: Fresh flowers on the tables, a hint of watercolour paint."
    ]
  },
  {
    id: "picture-menu",
    title: "Visual Picture Menus",
    category: "Feature",
    image: "/images/dream-home/31C7A829-6D89-49D8-94D0-0796DA30A20E.png",
    shortDescription: "Clear, appetising visual menus to help residents make independent choices.",
    howToAchieve: [
      "Use high-quality, bright photographs of the actual food being served.",
      "Keep text large, clear, and minimal.",
      "Display choices side-by-side so residents can point to what they want.",
      "Include visual reminders for hydration (e.g., a glass of water icon)."
    ],
    sensoryImmersion: [
      "Visual: High-contrast, mouth-watering images that stimulate appetite.",
      "Auditory: Staff verbally describing the food while pointing at the pictures.",
      "Tactile: Laminated, easy-to-hold menu cards.",
      "Olfactory: The smell of the actual meal arriving matching the picture."
    ]
  },
  {
    id: "activities-board",
    title: "Visual Activities Board",
    category: "Feature",
    image: "/images/dream-home/140FD6BD-D0B8-4A52-8A4D-74669ADE1DC3.png",
    shortDescription: "An easy-to-read daily schedule using clear imagery.",
    howToAchieve: [
      "Divide the day clearly into 'This Morning' and 'This Afternoon'.",
      "Use large, vibrant photographs to represent the activity (e.g., bingo cards, bowls).",
      "Keep the board at an accessible height in a high-traffic area.",
      "Update it daily to maintain trust and orientation."
    ],
    sensoryImmersion: [
      "Visual: Clear, bold typography and instantly recognisable images.",
      "Auditory: The board acts as a prompt for staff to discuss the day's plans.",
      "Tactile: Sturdy board materials, perhaps with Velcro attachments for changing activities.",
      "Olfactory: N/A"
    ]
  },
  {
    id: "dementia-signage",
    title: "Dementia-Friendly Signage",
    category: "Feature",
    image: "/images/dream-home/2CC1AF3B-D292-4EA4-9F09-D2FF80D81642.png",
    shortDescription: "High-contrast, icon-based directional signage.",
    howToAchieve: [
      "Use strong contrasting colours (e.g., white text on dark backgrounds).",
      "Pair clear, simple text with universally understood icons (e.g., a toilet symbol, a bed).",
      "Mount signs slightly lower than standard height to accommodate downward gaze.",
      "Ensure signs point clearly in the direction of travel."
    ],
    sensoryImmersion: [
      "Visual: High contrast reduces confusion; distinct colours for different zones.",
      "Auditory: N/A",
      "Tactile: Raised lettering or tactile elements can assist those with visual impairments.",
      "Olfactory: N/A"
    ]
  },
  {
    id: "pet-corner",
    title: "Indoor Pet Corner",
    category: "Feature",
    image: "/images/dream-home/4333D945-BB70-4D62-9554-671DEE94FC70.png",
    shortDescription: "A calming area featuring small, safe indoor pets like fish or birds.",
    howToAchieve: [
      "Set up a brightly lit, well-maintained fish tank at seated eye level.",
      "Provide a comfortable armchair right beside the enclosure.",
      "Ensure all enclosures are secure and maintained by staff.",
      "Use a clear, simple wooden sign to designate the area."
    ],
    sensoryImmersion: [
      "Visual: The hypnotic, slow movement of fish swimming.",
      "Auditory: The gentle bubbling of the fish tank filter or soft bird chirps.",
      "Tactile: Soft seating, the warmth of the tank light.",
      "Olfactory: Keep the area exceptionally clean; use a subtle fresh air diffuser."
    ]
  },
  {
    id: "memory-wall",
    title: "The Memory Wall",
    category: "Feature",
    image: "/images/dream-home/3C04ADD0-E1BF-41F4-A0A0-8D6B9F8FE5A9.png",
    shortDescription: "A tactile, visual display of residents' history and achievements.",
    howToAchieve: [
      "Use a mix of framed photographs, postcards, and memorabilia.",
      "Include 3D items in shadow boxes (e.g., medals, old watches).",
      "String vintage bunting above the display.",
      "Place a low console table beneath with fresh flowers and tactile objects."
    ],
    sensoryImmersion: [
      "Visual: A rich tapestry of black-and-white and sepia memories.",
      "Auditory: Acts as a powerful conversation starter, filling the corridor with storytelling.",
      "Tactile: Allow some safe items (like postcards or smooth objects on the table) to be handled.",
      "Olfactory: The scent of the fresh flowers placed on the table below."
    ]
  }
];
