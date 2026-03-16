import type { Request } from '../../models';

export const infoRequestDefs: Request[] = [
  {
    id: 'INFO_NEED_MARKETPLACE',
    title: 'Marketplace Established',
    text: 'Your marketplace is now operational. As long as this need stays fulfilled, the "Market Day" event can occur, bringing new trading opportunities to your village.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'advisor',
    options: [
      {
        text: 'Understood.',
        effects: {},
      },
    ],
  },

  {
    id: 'INFO_NEED_BREAD',
    title: 'Bread Production Active',
    text: 'Your bakery is now producing bread. Each tick, there is a 10% chance to gain +1 additional farmer growth, supporting population expansion.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'advisor',
    options: [
      {
        text: 'Understood.',
        effects: {},
      },
    ],
  },

  {
    id: 'INFO_NEED_BEER',
    title: 'Brewery Operational',
    text: 'Beer production has begun. The "Feierabend in der Kneipe" event is now unlocked, providing satisfaction-related benefits for your villagers.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'advisor',
    options: [
      {
        text: 'Understood.',
        effects: {},
      },
    ],
  },

  {
    id: 'INFO_NEED_FIREWOOD',
    title: 'Firewood Supply Organized',
    text: 'Professional firewood supply is now active. When an event increases fire risk, there is a 25% chance the increase is reduced by half, protecting your village.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'advisor',
    options: [
      {
        text: 'Understood.',
        effects: {},
      },
    ],
  },

  {
    id: 'INFO_NEED_WELL',
    title: 'Central Well Constructed',
    text: 'Your well is now operational. When an event grants health, there is a 50% chance to gain +1 additional health, improving overall village wellbeing.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'advisor',
    options: [
      {
        text: 'Understood.',
        effects: {},
      },
    ],
  },

  {
    id: 'INFO_CONSTRUCT_START_FARMSTEAD',
    title: 'Farmstead Under Construction',
    text: 'Workers have begun clearing land and laying foundations for a new farmstead. The sound of axes and hammers echoes across the fields as timber is cut and earth is turned.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'advisor',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_START_MARKETPLACE',
    title: 'Marketplace Under Construction',
    text: 'Craftsmen have begun erecting stalls and paving the central square for your new marketplace. Merchants already gather at the edges, eager to claim the best positions once it opens.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'craftsman',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_START_BAKERY',
    title: 'Bakery Under Construction',
    text: 'Masons are building the great stone oven that will become the heart of your bakery. The scent of fresh mortar mixes with anticipation as villagers look forward to daily bread.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'craftsman',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_START_BREWERY',
    title: 'Brewery Under Construction',
    text: 'Coopers and brewers work side by side, assembling barrels and vats for the new brewery. The promise of ale has lifted spirits across the village considerably.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'craftsman',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_START_FIREWOOD',
    title: 'Firewood Camp Under Construction',
    text: 'Woodcutters have established a clearing and begun building storage shelters for the firewood operation. A steady supply of fuel will keep hearths burning through the harshest winters.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'advisor',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_START_WELL',
    title: 'Well Under Construction',
    text: 'Diggers have struck damp earth and are now deepening the shaft for the village well. Clean water will soon flow freely, a blessing for health and morale alike.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'advisor',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_START_TAVERN',
    title: 'Tavern Under Construction',
    text: 'Carpenters raise the sturdy oak frame of your new tavern. Already, a bard has been spotted tuning his lute nearby, clearly planning to be the first performer on opening night.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'advisor',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_START_GARRISON',
    title: 'Garrison Under Construction',
    text: 'Stone walls rise as masons and soldiers work together to build the garrison. The structure will serve as both barracks and armory, a symbol of your commitment to the village\'s defense.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'advisor',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_START_SHRINE',
    title: 'Shrine Under Construction',
    text: 'Villagers lay the first sacred stones of the shrine with reverence and prayer. The village priest oversees each placement, ensuring the holy site is built according to ancient traditions.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'advisor',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_START_TRAINING_YARD',
    title: 'Training Yard Under Construction',
    text: 'The clang of hammers rings out as posts are driven into the ground for the training yard. Straw dummies and weapon racks are already being prepared for the recruits who will soon drill here.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'advisor',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_START_HEALERS_HOUSE',
    title: 'Healer\'s House Under Construction',
    text: 'Herbalists and builders collaborate on the healer\'s house, ensuring proper ventilation and storage for precious remedies. A garden of medicinal herbs is already being planted beside the foundation.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'advisor',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_END_FARMSTEAD',
    title: 'Farmstead Complete',
    text: 'The farmstead stands ready, its fields plowed and fences mended. Farmers move in with their families, eager to work the land and bring in the harvest.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'farmer',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_END_MARKETPLACE',
    title: 'Marketplace Complete',
    text: 'The marketplace opens its gates to a bustling crowd of traders and townsfolk. Colorful banners hang from every stall, and the air fills with the calls of merchants hawking their wares.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'merchant',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_END_BAKERY',
    title: 'Bakery Complete',
    text: 'The first loaves emerge golden and fragrant from the great oven. Villagers queue eagerly as the baker proudly displays the fruits of the new bakery\'s labor.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'craftsman',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_END_BREWERY',
    title: 'Brewery Complete',
    text: 'The first barrel is tapped to cheers and celebration. The brewery\'s master brewer raises a tankard and toasts to the village\'s prosperity and good health.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'craftsman',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_END_FIREWOOD',
    title: 'Firewood Camp Complete',
    text: 'Stacks of split timber line the storage shelters, ready for distribution. The woodcutters report that supply lines are established and the village will not want for warmth.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'craftsman',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_END_WELL',
    title: 'Well Complete',
    text: 'Crystal-clear water is drawn from the newly completed well to applause from the gathered crowd. The village healer confirms it is pure and wholesome for drinking.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'healer',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_END_TAVERN',
    title: 'Tavern Complete',
    text: 'The tavern doors swing open to reveal a warm hearth, sturdy tables, and a well-stocked bar. A bard strikes up a merry tune as the first patrons settle in for the evening.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'bard',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_END_GARRISON',
    title: 'Garrison Complete',
    text: 'The garrison stands tall and formidable, its walls thick and gates iron-bound. The captain of the guard salutes as the first patrol marches out to secure the village perimeter.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'guard',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_END_SHRINE',
    title: 'Shrine Complete',
    text: 'Incense smoke curls upward as the village priest consecrates the completed shrine. Villagers kneel in prayer, grateful for a place of solace and spiritual guidance.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'village_priest',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_END_TRAINING_YARD',
    title: 'Training Yard Complete',
    text: 'The training yard is ready for its first recruits. Weapon racks gleam with polished steel, and the drill sergeant barks orders as young men and women form ranks for the first time.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'military_advisor',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_CONSTRUCT_END_HEALERS_HOUSE',
    title: 'Healer\'s House Complete',
    text: 'The healer hangs bundles of dried herbs from the rafters and arranges salves on neatly labeled shelves. The village now has a proper place of healing, and the sick already line up at the door.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'healer',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_DISTRICT_COMMERCE_COMPLETE',
    title: 'Commerce District Established',
    text: 'With both the marketplace and the tavern operational, a true commerce district has taken shape. Merchants and tavernkeepers coordinate trade, and coin flows more freely than ever before.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'merchant',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_DISTRICT_MILITARY_COMPLETE',
    title: 'Military District Established',
    text: 'The garrison and training yard together form a formidable military district. Soldiers drill with discipline and purpose, and the village\'s defenses have never been stronger.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'military_advisor',
    options: [{ text: 'Acknowledged', effects: {} }],
  },

  {
    id: 'INFO_DISTRICT_FAITH_COMPLETE',
    title: 'Faith and Relief District Established',
    text: 'The shrine and healer\'s house stand side by side, offering spiritual comfort and physical remedy in equal measure. Pilgrims and the ailing alike find solace in this sacred quarter of the village.',
    canTriggerRandomly: false,
    advancesTick: false,
    portraitId: 'village_priest',
    options: [{ text: 'Acknowledged', effects: {} }],
  },
];
