/**
 * Request data for the Proof-of-Fun game.
 * Based on POF_SPEC.md specification.
 * Contains 183 event-requests (25 base + 44 Blackgeat chain + 34 chains 1-5 + 27 chains 6-10 + 28 chains 11-15 + 25 market_inspection chain).
 */

import type { Request } from './models';


/**
 * Info/System Requests (5)
 * These requests explain newly fulfilled needs and are triggered automatically
 * when a need is fulfilled for the first time (buildingCount === 1).
 * They have priority "info" and appear with 100% certainty on the tick after fulfillment.
 */
export const infoRequests: Request[] = [
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

  // ── Construction Start Info Requests ──────────────────────────────────

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

  // ── Construction End Info Requests ────────────────────────────────────

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

  // ── District Completion Info Requests ─────────────────────────────────

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

/**
 * Event-Requests (25)
 * These are random events that occur during gameplay.
 * Organized by category: Military & security, Population & growth,
 * Crisis events, Improve stats, Worsen stats.
 */
export const eventRequests: Request[] = [
  // A) Military & security (6 events)
  {
    id: 'EVT_RECRUIT_MILITIA',
    title: 'Call to Arms',
    text: 'The borders feel thin. Should we recruit farmers into the militia to bolster defenses, even if the fields suffer from fewer hands?',
    portraitId: 'military_advisor',
    options: [
      {
        text: 'YES',
        effects: {
          landForces: 5,
          farmers: -5,
          gold: -5,
          authority: 1,
        },
      },
      {
        text: 'NO',
        effects: {
          satisfaction: 5,
          authority: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_RAID_SMALL',
    title: 'Shadows in the Woods',
    text: 'A small band of brigands has been spotted nearby. Do we drive them off by force or pay a "toll" to keep the peace?',
    portraitId: 'bandit',
    combat: {
      enemyForces: 3,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        gold: 10,
        authority: 1,
      },
      onLose: {
        gold: -10,
        authority: -2,
      },
    },
    options: [
      {
        text: 'FIGHT AND ROB',
        effects: {},
      },
      {
        text: 'PAY TOLL',
        effects: {
          gold: -10,
          authority: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_RAID_LARGE',
    title: 'The War Horns',
    text: 'A massive raiding force is at the gates! Stand your ground and fight, or the intruders will bring destruction to your village.',
    portraitId: 'bandit',
    combat: {
      enemyForces: 8,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        gold: 25,
        fireRisk: 12,
        authority: 2,
      },
      onLose: {
        gold: -30,
        farmers: -8,
        satisfaction: -5,
        authority: -4,
      },
    },
    options: [
      {
        text: 'FIGHT',
        effects: {fireRisk: 10},
      },
      {
        text: 'SURRENDER',
        effects: {
          gold: -20,
          satisfaction: -3,
          authority: -4,
        },
      },
    ],
  },
  {
    id: 'EVT_MILITIA_PAY',
    title: "Soldier's Due",
    text: "The militia's morale is slipping. They are demanding their seasonal wages to continue their service to the crown.",
    portraitId: 'military_advisor',
    options: [
      {
        text: 'PAY',
        effects: {
          gold: -10,
        },
      },
      {
        text: 'REFUSE',
        effects: {
          landForces: -2,
          satisfaction: -4,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_RESTLESS_NIGHT',
    title: 'Whispers in the Dark',
    text: 'Strange noises have been reported near the storage huts. Send a patrol to investigate, or dismiss it as simple superstition?',
    combat: {
      enemyForces: 2,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        authority: 1,
        satisfaction: 2
      },
      onLose: {
        farmers: -5,
        satisfaction: -5,
        authority: -2,
      },
    },
    portraitId: 'military_advisor',
    options: [
      {
        text: 'PATROL',
        effects: {
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -5,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_VETERANS_LEAVE',
    title: 'The Old Guard',
    text: 'Your most experienced fighters are considering retirement. A small bonus might convince them to stay and train the new recruits.',
    portraitId: 'military_advisor',
    options: [
      {
        text: 'COMPENSATE',
        effects: {
          gold: -10,
          authority: 1,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          landForces: -2,
        },
      },
    ],
  },

  // B) Population & growth (4 events)
  {
    id: 'EVT_NEW_FARMERS',
    title: 'Wandering Souls',
    text: 'A group of sick travelers seeks land to till. They bring labor, but their makeshift camps pose a significant fire risk to the village.',
    portraitId: 'refugee',
    options: [
      {
        text: 'ALLOW',
        effects: {
          farmers: 6,
          landForces: 2,
          fireRisk: 4,
          health: -2,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          satisfaction: 2,
        },
      },
    ],
  },
  {
    id: 'EVT_EMIGRATION',
    title: 'The Long Goodbye',
    text: 'Dissatisfied with current conditions, several families are packing their wagons. Will you offer concessions to keep them?',
    portraitId: 'farmer',
    options: [
      {
        text: 'CONCEDE',
        effects: {
          gold: -15,
          satisfaction: 2,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -7,
        },
      },
    ],
  },
  {
    id: 'EVT_BIG_FAMILY',
    title: 'A Growing House',
    text: "A local family struggles to feed their many children. They've come to you for a small charitable gift to get through the month.",
    portraitId: 'farmer',
    options: [
      {
        text: 'HELP',
        effects: {
          gold: -5,
          satisfaction: 2,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          satisfaction: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_HARVEST_HELPERS',
    title: 'The Golden Fields',
    text: 'The crops are ripening all at once. Hiring seasonal helpers could save the harvest before the rats can spread.',
    portraitId: 'farmer',
    options: [
      {
        text: 'HIRE',
        effects: {
          gold: -15,
          farmers: 5,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          health: -4,
        },
      },
    ],
  },

  // C) Crisis events (3 events) - triggered by selection rules
  {
    id: 'EVT_CRISIS_UNREST',
    title: 'Unrest Escalates',
    text: "Warning: Low Satisfaction! The people's anger has reached a breaking point. You must act now to appease the crowd or face a total revolt.",
    portraitId: 'advisor',
    options: [
      {
        text: 'CONCESSIONS',
        effects: {
          gold: -40,
          satisfaction: 20,
          authority: -4,
        },
      },
      {
        text: 'CRACK DOWN',
        effects: {
          landForces: -5,
          farmers: -10,
          satisfaction: 15,
          authority: 2,
        },
      },
    ],
  },
  {
    id: 'EVT_CRISIS_DISEASE',
    title: 'The Pale Cough',
    text: 'Warning: Low Health! Due to poor sanitary conditions, a sickness is spreading rapidly. We must fund a healer now before the population collapses.',
    portraitId: 'advisor',
    options: [
      {
        text: 'HIRE A HEALER',
        effects: {
          gold: -40,
          health: 20,
        },
      },
      {
        text: 'SORT OUT THE SICK',
        effects: {
          farmers: -15,
          health: 15,
        },
      },
    ],
  },

  // D) Improve stats (6 events)
  {
    id: 'EVT_FIRE_WATCH',
    title: 'The High Tower',
    text: 'An architect proposes a watchtower to spot fires early. It is a wise investment in the long-term safety of the settlement.',
    portraitId: 'craftsman',
    options: [
      {
        text: 'BUILD',
        effects: {
          landForces: -1,
          fireRisk: -5,
        },
      },
      {
        text: 'DECLINE',
        effects: {},
      },
    ],
  },
  {
    id: 'EVT_VILLAGE_FESTIVAL',
    title: 'Summer Solstice',
    text: "Organizing a grand festival with music and food would greatly strengthen the community's spirit.",
    portraitId: 'bard',
    options: [
      {
        text: 'HOLD',
        effects: {
          gold: -10,
          satisfaction: 4,
        },
      },
      {
        text: 'DECLINE',
        effects: {
        },
      },
    ],
  },
  {
    id: 'EVT_MEDICAL_HERBS',
    title: 'The Traveling Apothecary',
    text: 'A merchant offers a rare shipment of medicinal herbs. These could significantly boost the overall health of the village.',
    portraitId: 'healer',
    options: [
      {
        text: 'BUY',
        effects: {
          gold: -15,
          health: 5,
        },
      },
      {
        text: 'DECLINE',
        effects: {
        },
      },
    ],
  },
  {
    id: 'EVT_TRAIN_MILITIA',
    title: 'Drill Practice',
    text: 'A retired captain offers to drill your troops. This would make your defense forces much more formidable for future raids.',
    portraitId: 'military_advisor',
    options: [
      {
        text: 'TRAIN',
        effects: {
          gold: -15,
          landForces: 5,
          authority: 1,
        },
      },
      {
        text: 'DECLINE',
        effects: {
        },
      },
    ],
  },
  {
    id: 'EVT_CLEAN_STORAGE',
    title: 'Spring Cleaning',
    text: 'The granaries are cluttered with old straw and debris. A deep clean would reduce the risk of accidental fires.',
    portraitId: 'advisor',
    options: [
      {
        text: 'ORGANIZE',
        effects: {
          gold: -10,
          fireRisk: -4,
        },
      },
      {
        text: 'DECLINE',
        effects: {
        },
      },
    ],
  },
  {
    id: 'EVT_TAX_REFORM',
    title: 'The Royal Ledger',
    text: 'Balancing the books: Do you lower taxes to win favor, or raise them to fill the treasury for upcoming hardships?',
    portraitId: 'advisor',
    options: [
      {
        text: 'LOWER taxes',
        effects: {
          gold: -20,
          satisfaction: 5,
          authority: -1,
        },
      },
      {
        text: 'RAISE taxes',
        effects: {
          gold: 25,
          satisfaction: -8,
          authority: 1,
        },
      },
    ],
  },

  // E) Worsen stats (6 events)
  {
    id: 'EVT_FOREST_FIRE',
    title: 'Smoke on the Horizon',
    text: "A nearby forest fire threatens the outskirts. If we don't send help to contain it, the winds may bring the disaster to our door.",
    portraitId: 'scout',
    options: [
      {
        text: 'FIGHT THE FIRE',
        effects: {
          gold: -5,
          health: -2,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          fireRisk: 10,
        },
      },
    ],
  },
  {
    id: 'EVT_PLAGUE',
    title: 'The Black Flag',
    text: 'A plague is ravaging the next town over. Should we enforce a strict, unpopular quarantine or hope the winds of fate are kind?',
    portraitId: 'healer',
    options: [
      {
        text: 'QUARANTINE',
        effects: {
          satisfaction: -4,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          health: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_THEFTS',
    title: 'Sticky Fingers',
    text: 'Marketplace thefts are on the rise. More guards would stop the loss of gold, but they are needed elsewhere for defense.',
    portraitId: 'guard',
    options: [
      {
        text: 'MORE GUARDS',
        effects: {
          landForces: -2,
          authority: 1,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          gold: -15,
          authority: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_BAD_HARVEST',
    title: 'The Blighted Crop',
    text: 'An early frost has ruined the crops. The people are hungry — will the crown step in to provide compensation and food?',
    portraitId: 'farmer',
    options: [
      {
        text: 'COMPENSATE',
        effects: {
          gold: -15,
          health: 1,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          satisfaction: -4,
          farmers: -4,
        },
      },
    ],
  },
  {
    id: 'EVT_FIREWOOD_WET',
    title: 'Damp Spirits',
    text: 'The firewood supply got soaked in a storm. We must buy replacements immediately or face a cold and dangerous winter.',
    portraitId: 'craftsman',
    options: [
      {
        text: 'REPLACE',
        effects: {
          gold: -10,
          fireRisk: -2
        },
      },
      {
        text: 'IGNORE',
        effects: {
          fireRisk: 4,
          health: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_FARMERS_QUARREL',
    title: 'The Fence Dispute',
    text: 'Two farmers are quarreling over a boundary line. A moment of your time could settle this before it turns into a local feud.',
    portraitId: 'farmer',
    options: [
      {
        text: 'MEDIATE',
        effects: {
          gold: -10,
          satisfaction: 1,
        },
      },
      {
        text: 'NOT MY PROBLEM',
        effects: {
          farmers: -4,
        },
      },
    ],
  },

  // =========================================================
  // BLACKGEAT CHAIN - The Black March
  // =========================================================
  // CHAIN START
  {
    id: 'CHAIN_BLACKGEAT_START',
    title: 'The Black March',
    text: 'Brimwulf, envoy of the County of Wulfham, introduces himself: "The Sigilmark of Blackgeat is raising troops. Join forces with us - only together can we defeat them."',
    portraitId: 'envoy',
    chainId: 'BLACKGEAT',
    chainRole: 'start',
    options: [
      { text: 'ALLY WITH WULFHAM', effects: {} },
      { text: 'REFUSE', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_PREP_FELDRIC', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_WULFHAM_FALLS', weight: 3 },
          { requestId: 'CHAIN_BLACKGEAT_WULFHAM_TURNS', weight: 2 },
        ],
      },
    ],
  },

  // ALLY PATH (WULFHAM)
  {
    id: 'CHAIN_BLACKGEAT_PREP_FELDRIC',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    portraitId: 'military_advisor',
    title: 'Feldric\'s Counsel',
    text: 'Feldric your Marshal bows. "About Brimwulf\'s alliance request: if we accept, we need to ready our troops."',
    canTriggerRandomly: false,
    options: [
      { text: 'UPGRADE ARMS', effects: { gold: -10, landForces: 5 } },
      { text: 'MARCH NOW', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_PREP_FELDRIC', weight: 2 },
          { requestId: 'CHAIN_BLACKGEAT_BATTLE_GRAYFORD', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_BATTLE_GRAYFORD', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_BATTLE_GRAYFORD',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Battle at Aescweald',
    text: 'Blackgeat\'s banners crest the ridge — the battle Brimwulf came to you for. Feldric\'s voice stays calm: "Hold. Then strike." Brimwulf\'s men lock shields beside yours.',
    canTriggerRandomly: false,
    combat: {
      enemyForces: 7,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        satisfaction: 2,
        authority: 1,
      },
      onLose: {
        satisfaction: -3,
        authority: -2
      },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 3,
          delayMaxTicks: 6,
          candidates: [{ requestId: 'CHAIN_BLACKGEAT_AFTER_BATTLE_STATE', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 3,
          delayMaxTicks: 6,
          candidates: [{ requestId: 'CHAIN_BLACKGEAT_AFTER_BATTLE_STATE', weight: 1 }],
        },
      ],
    },
    portraitId: 'military_advisor',
    options: [
      { text: 'HOLD THE LINE', effects: {} },
      { text: 'RETREAT NOW', effects: { satisfaction: -2, authority: -3 } },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_AFTER_BATTLE_STATE',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Aescweald Aftermath',
    text: 'This is the aftermath of the Aescweald battle. Blackgeat pulls back in good order. Brimwulf watches the wounded, already thinking about what Wulfham can demand next.',
    canTriggerRandomly: false,
    portraitId: 'envoy',
    options: [
      { text: 'TEND THE WOUNDED', effects: { health: 4 } },
      { text: 'FORTIFY THE BORDER', effects: { landForces: 5, gold: -10 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 10,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_WULFHAM_LOYAL', weight: 3 },
          { requestId: 'CHAIN_BLACKGEAT_WULFHAM_EXTORT_1', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 10,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_WULFHAM_LOYAL', weight: 3 },
          { requestId: 'CHAIN_BLACKGEAT_WULFHAM_EXTORT_1', weight: 2 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_LOYAL',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Good Allies',
    text: 'Brimwulf returns after the Battle of Aescweald. "Wulfham remembers who stood with us. We will not forget." Feldric mutters, "Blackgeat will come back — count on it."',
    canTriggerRandomly: false,
    portraitId: 'envoy',
    options: [
      { text: 'RETURN HOME TRIUMPHANT', effects: { authority: 3, satisfaction: 3 } },
      { text: 'LOOT THE BATTLEFIELD', effects: { gold: 25 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 6,
        delayMaxTicks: 10,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_HRYCGWULF_OFFER', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_HRYCGWULF_OFFER', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_HRYCGWULF_OFFER',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Hrycgwulf\'s Message',
    text: 'Following the Aescweald battle, Hrycgwulf of Blackgeat arrives with a message. "You are capable. Pay a border tribute and we turn our army elsewhere." Feldric adds quietly, "This is their next move after Aescweald."',
    canTriggerRandomly: false,
    portraitId: 'ruler_enemy_weak',
    options: [
      { text: 'PAY FOR PIECE', effects: { gold: -15, authority: -2 } },
      { text: 'THROW HIM OUT', effects: { authority: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_LOYAL_END', weight: 3 },
          { requestId: 'CHAIN_BLACKGEAT_TRIBUTE_ESCALATE', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_LOYAL_END', weight: 1 },
          { requestId: 'CHAIN_BLACKGEAT_TRIBUTE_ESCALATE', weight: 3 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_ESCALATE',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'The Second Demand',
    text: 'This is the second demand after Hrycgwulf\'s first tribute request. Hrycgwulf stays polite. "Tribute is not punishment. It is safety." Feldric spits, "It\'s a leash."',
    canTriggerRandomly: false,
    portraitId: 'ruler_enemy_weak',
    options: [
      { text: 'PAY AGAIN', effects: { gold: -15, authority: -2 } },
      { text: 'PREPARE FOR WAR', effects: { authority: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 6,
        delayMaxTicks: 10,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_LOYAL_END', weight: 2 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_BATTLE', weight: 2 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_LOYAL_END',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    chainRestartCooldownTicks: 100,
    title: 'A Hard-Won Quiet',
    text: 'After the tribute talks and threats, the border holds—for now. Brimwulf\'s riders patrol beside yours. Feldric\'s last words: "This quiet came from the Blackgeat situation. It won\'t stay quiet forever."',
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [
      { text: 'TEND TO THE WOUNDED', effects: { health: 5 } },
      { text: 'SPEAK TO YOUR PEOPLE', effects: { satisfaction: 5 } },
    ],
  },
  
  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_BATTLE',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'The Battle for Freedom',
    text: 'Hrycgwulf grows impatient with your stalling. The Blackgeat banners appear on the horizon. Feldric draws his blade: "What shall we do, Mylord?"',
    canTriggerRandomly: false,
    combat: {
      enemyForces: 15,
      prepDelayMinTicks: 5,
      prepDelayMaxTicks: 8,
      onWin: {
        satisfaction: 2,
        authority: 2,
      },
      onLose: {
        gold: - 25,
        satisfaction: -3,
        authority: -3
      },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 1,
          candidates: [{ requestId: 'CHAIN_BLACKGEAT_FREEDOM_CELEBRATION', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 1,
          candidates: [{ requestId: 'CHAIN_BLACKGEAT_UNIVERSAL_RECOVERY', weight: 1 }],
        },
      ],
    },
    portraitId: 'military_advisor',
    options: [
      { 
        text: 'STAND YOUR GROUND', 
        effects: { fireRisk: 5 }
      },
      { 
        text: 'PAY TRIBUTE', 
        effects: { 
          gold: -25,
          satisfaction: -5
        } 
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_FREEDOM_CELEBRATION',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    chainRestartCooldownTicks: 100,
    title: 'Echoes of Liberty',
    text: 'The Sigilmark Blackgeat has retreated! Against all odds, you held the line. Feldric raises a toast: "The land is ours once more, and our gold stays in our pockets. We are truly free."',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    options: [
      { 
        text: 'HOLD A GRAND FEAST', 
        effects: { satisfaction: 6, health: 4, authority: 2} 
      },
      { 
        text: 'REBUILD THE BORDER', 
        effects: { gold: -10, landForces: 8, fireRisk: -8, authority: 2} 
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_UNIVERSAL_RECOVERY',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    chainRestartCooldownTicks: 100,
    title: 'Picking Up the Pieces',
    text: 'The shadow of Blackgeat finally recedes, leaving behind a weary but resilient village. The conflict is lost, but it is over now. It is time to look toward the future.',
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [
      { 
        text: 'FOCUS ON RECOVERY', 
        effects: { health: 4, satisfaction: 3} 
      },
      { 
        text: 'SALVAGE THE RUINS', 
        effects: { gold: 15, fireRisk: -5 } 
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_EXTORT_1',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'The Bill Comes Due',
    text: 'After the battle of Aescweald, Brimwulf\'s smile is thin. "Wulfham shed more blood than you. Compensation is expected." Feldric whispers, "This is the hook."',
    canTriggerRandomly: false,
    portraitId: 'envoy',
    options: [
      { text: 'PAY', effects: { gold: -15, authority: -1} },
      { text: 'REFUSE', effects: {authority: 1} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WULFHAM_EXTORT_2', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WULFHAM_SHOWDOWN', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_EXTORT_2',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'More, Always More',
    text: 'Brimwulf returns again — this is the second payment demand since Aescweald. "The roads. The wagons. The widows. Pay again."',
    canTriggerRandomly: false,
    portraitId: 'envoy',
    options: [
      { text: 'PAY', effects: { gold: -15, authority: -1} },
      { text: 'REFUSE', effects: {authority: 1} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WULFHAM_THREAT', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WULFHAM_SHOWDOWN', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_THREAT',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'The Threat',
    text: 'Brimwulf stops pretending. "Coin, or Wulfham secures your lands permanently." Feldric says, "This started with Aescweald. Now it\'s extortion. Give me leave to prepare."',
    canTriggerRandomly: false,
    portraitId: 'envoy',
    options: [
      { text: 'PREPARE FOR WAR', effects: { farmers: -5, landForces: 5 } },
      { text: 'PAY TO DELAY', effects: { gold: -15 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WULFHAM_SHOWDOWN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 10,
        delayMaxTicks: 12,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WULFHAM_SHOWDOWN', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_SHOWDOWN',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Showdown at the Border Stones',
    text: 'Weeks after the battle of Aescweald, Feldric meets Brimwulf at the border stones. "One step further," Feldric says, "and we settle this in iron."',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    options: [
      { text: 'STAND FIRM', effects: {  } },
      { text: 'BACK DOWN', effects: { gold: -15, farmers: -5, authority: -3} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 7,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_EXTORT_END_BATTLE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 7,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_EXTORT_END_TRIBUTE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_EXTORT_END_BATTLE',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    chainRestartCooldownTicks: 100,
    title: 'A Scar, Not a Grave',
    text: 'Wulfham withdraws — you are victorious! Feldric\'s verdict: "You\'ll remember this every time an ally asks for \'help\'."',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    options: [
      { text: 'DEMAND GOLD', effects: { gold: 30, satisfaction: 1, authority: 2} },
      { text: 'DEMAND SWORDS', effects: { landForces: 5, satisfaction: 1, authority: 2} },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_EXTORT_END_TRIBUTE',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    chainRestartCooldownTicks: 100,
    title: 'The Hollow Peace',
    text: 'Brimwulf accepted your last payment as final. Wulfham\'s riders turn back toward their own borders. Feldric watches them go: "We have bought peace, but sold our pride."',
    canTriggerRandomly: false,
    portraitId: 'envoy',
    options: [
      { text: 'RECOVER', effects: { health: 5 } },
      { text: 'REPAIR', effects: { fireRisk: -5 } },
    ],
  },

  // REFUSE PATH (WULFHAM FALLS OR TURNS)
  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_FALLS',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Wulfham Overrun',
    text: 'Because you refused Brimwulf\'s alliance request earlier, he returns in defeat. "Wulfham burns. Blackgeat\'s march turns toward you."',
    canTriggerRandomly: false,
    portraitId: 'envoy',
    options: [
      { text: 'SEND LATE AID', effects: { gold: -15, landForces: -6 } },
      { text: 'DO NOTHING', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 10,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 10,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_HRYCGWULF_THREAT', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_HRYCGWULF_THREAT',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'The Blackgeat Envoy',
    text: 'As consequence of Wulfham\'s defeat, Blackgeat\'s envoy Hrycgwulf arrives at your gates. "Submit, or be folded into Blackgeat." Feldric\'s hand rests on his sword.',
    canTriggerRandomly: false,
    portraitId: 'ruler_enemy_weak',
    options: [
      { text: 'BOW and PAY', effects: { gold: -15, authority: -1,} },
      { text: 'RESIST and PREPARE', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 8,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_1', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_TURNS',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Wulfham Turns',
    text: 'After you refused Brimwulf earlier, news arrives: Wulfham has allied with Blackgeat and demand a tribute. Feldric says, "This is what refusal can create: two enemies instead of one."',
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [
      { text: 'RESIST and PREPARE', effects: {} },
      { text: 'BOW and PAY', effects: { gold: -15, authority: -1} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 8,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_1', weight: 1 }],
      },
    ],
  },

  // WAR PREPARATION AND BATTLES
  {
    id: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    portraitId: 'military_advisor',
    title: 'Feldric Prepares the Host',
    text: 'Feldric your Marshall comes before you: "We need better preparation for the coming battle with Blackgeat."',
    canTriggerRandomly: false,
    options: [
      { text: 'RAISE THE HOST', effects: { landForces: 4, farmers: -4, gold: -10 } },
      { text: 'MEET THEM NOW', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 2 },
          { requestId: 'CHAIN_BLACKGEAT_WAR_ROUND_1', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_ROUND_1', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WAR_ROUND_1',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'First Clash',
    text: 'The Blackgeat war begins. Their vanguard probes your line. Feldric: "They test for weakness. Show none."',
    canTriggerRandomly: false,
    combat: {
      enemyForces: 6,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        satisfaction: 2,
        authority: 2,
      },
      onLose: {
        satisfaction: -3,
        authority: -3,
      },
    },
    portraitId: 'military_advisor',
    options: [
      { text: 'HOLD', effects: {} },
      { text: 'COUNTERSTRIKE', effects: { gold: 10 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_ROUND_2', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_ROUND_2', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WAR_ROUND_2',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Smoke and Discipline',
    text: 'During the second war round against Blackgeat, they set brushfires to blind you. Feldric snarls: "They want panic."',
    canTriggerRandomly: false,
    combat: {
      enemyForces: 10,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        satisfaction: 2,
        authority: 2,
      },
      onLose: {
        satisfaction: -2,
        authority: -2,
      },
    },
    portraitId: 'military_advisor',
    options: [
      { text: 'PROTECT THE VILLAGE', effects: { fireRisk: -4, satisfaction: 1 } },
      { text: 'PRESS THE LINE', effects: { farmers: -4, fireRisk: 5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_ROUND_3', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_ROUND_3', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WAR_ROUND_3',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'The Breaking Point',
    text: 'This is the final showdown: Hrycgwulf commits Blackgeat\'s main force. Feldric: "This is it."',
    canTriggerRandomly: false,
    combat: {
      enemyForces: 15,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        satisfaction: 2,
        authority: 2,
      },
      onLose: {
        satisfaction: -3,
        authority: -3,
      },
    },
    portraitId: 'military_advisor',
    options: [
      { text: 'ALL-IN STRIKE', effects: { gold: 35, satisfaction: 5 } },
      { text: 'WITHDRAW', effects: { satisfaction: -2, farmers: -5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_END_WIN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_WAR_END_HELP', weight: 3 },
          { requestId: 'CHAIN_BLACKGEAT_WAR_END_HARD', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WAR_END_WIN',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    chainRestartCooldownTicks: 100,
    title: 'Blackgeat Recoils',
    text: 'After three war rounds, Blackgeat pulls back and the war finally ends. Feldric wipes blood from his lip: "This is what resisting Blackgeat costs—and what it buys."',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    options: [
      { text: 'SELL THE LOOT', effects: { gold: 35, satisfaction: 2, authority: 1,} },
      { text: 'KEEP THE LOOT', effects: { landForces: 5, satisfaction: 2, authority:1,} },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WAR_END_HELP',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Help from a Free Barony',
    text: 'As the Blackgeat war drags on, riders from a neighboring free barony arrive at dusk: "We won\'t watch you fall."',
    canTriggerRandomly: false,
    portraitId: 'ruler_allied',
    options: [
      { text: 'ACCEPT HELP', effects: { landForces: 4 } },
      { text: 'ACCEPT AND PAY THEM', effects: { gold: -15, landForces: 8 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_END_STABLE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_END_STABLE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WAR_END_HARD',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    chainRestartCooldownTicks: 100,
    title: 'A Bitter Retreat',
    text: 'The Blackgeat war ends badly. You live, but they loot the village. Feldric\'s eyes are stone: "A bitter defeat! What should we do now?"',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    options: [
      { text: 'SAFE TREASURY', effects: { gold: -15, farmers: -12, authority: -3,} },
      { text: 'SAFE YOUR PEOPLE ', effects: { gold: -35, farmers: -4, authority: -3,} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_UNIVERSAL_RECOVERY', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_UNIVERSAL_RECOVERY', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WAR_END_STABLE',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    chainRestartCooldownTicks: 100,
    title: 'A Line Held',
    text: 'A fierce last battle against Blackgeat ends well with the barony\'s help. Feldric nods once: "Next time Blackgeat comes, we\'ll be ready sooner."',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    options: [
      { text: 'PURSUE THE FLEEING', effects: { landForces: -5, gold: 30 } },
      { text: 'HOLD A FEAST', effects: { health: 4, satisfaction: 3 } },
    ],
  },

  // TRIBUTE PATH
  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_1',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Tribute I',
    text: 'This tribute demand comes from Hrycgwulf\'s earlier ultimatum. His messenger waits: "The first payment." Feldric murmurs: "This is how Blackgeat turns a threat into routine."',
    canTriggerRandomly: false,
    portraitId: 'envoy',
    options: [
      { text: 'PAY', effects: { gold: -15, satisfaction: -1, authority: -1,} },
      { text: 'REFUSE AND ARM', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 8,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_2', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_2',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Tribute II',
    text: 'The second tribute demand from Blackgeat arrives. Hrycgwulf repeats the terms, less polite this time.',
    canTriggerRandomly: false,
    portraitId: 'ruler_enemy_weak',
    options: [
      { text: 'PAY', effects: { gold: -15, satisfaction: -1, authority: -1,} },
      { text: 'REFUSE AND ARM', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 8,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_3', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_3',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Tribute III',
    text: 'Hrycgwulf comes back with another tribute demand. The people notice the wagons leaving your gates and start whispering about submission.',
    canTriggerRandomly: false,
    portraitId: 'ruler_enemy_weak',
    options: [
      { text: 'PAY', effects: { gold: -15, satisfaction: -2, authority: -1,} },
      { text: 'REFUSE AND ARM', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 8,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_4', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_4',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Tribute IV',
    text: 'Blackgeat\'s next tribute demand arrives with Hrycgwulf\'s personal seal. Feldric says, "They\'re making sure you remember who\'s in charge."',
    canTriggerRandomly: false,
    portraitId: 'ruler_enemy_weak',
    options: [
      { text: 'PAY', effects: { gold: -15, satisfaction: -2, authority: -1,} },
      { text: 'REFUSE AND ARM', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 8,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_5', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_5',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Tribute V',
    text: 'Another routine tribute demand from Blackgeat. Feldric says, "Paying five times teaches them you\'ll pay a sixth."',
    canTriggerRandomly: false,
    portraitId: 'ruler_enemy_weak',
    options: [
      { text: 'PAY', effects: { gold: -15, satisfaction: -1, authority: -1,} },
      { text: 'REFUSE AND ARM', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_END',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    chainRestartCooldownTicks: 100,
    title: 'A Bought Breath',
    text: 'Hrycgwulf visits you one last time: "You paid for safety. Now you shall have peace". Feldric: "This peace seems temporary. For next time, we will prepare."',
    canTriggerRandomly: false,
    portraitId: 'ruler_enemy_weak',
    options: [
      { text: 'CELEBRATE PEACE', effects: { health: 4, satisfaction: 4 } },
      { text: 'START PREPARING', effects: { gold: -10, landForces: 6 } },
    ],
  },

  {
    id: 'EVENT_MARKET_DAY',
    title: 'Market Day',
    text: 'The marketplace is bustling with traders from distant lands. Will you focus on steady profits or take a riskier approach for greater gains?',
    portraitId: 'merchant',
    requires: ['building:marketplace'],
    options: [
      {
        text: 'RISKY DEALS',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
          onSuccess: {
            gold: 25,
            satisfaction: 2,
            authority: 1,
          },
          onFailure: {
            gold: -10,
            satisfaction: -3,
          },
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 2,
          minSuccessChance: 25,
          maxSuccessChance: 80,
        },
      },
      {
        text: 'STEADY TRADE',
        effects: {
          gold: 10,
        },
      },
    ],
  },

  {
    id: 'EVENT_TAVERN_AFTER_WORK',
    title: 'After-Work at the Tavern',
    text: 'After a long day of labor, the villagers gather at the tavern. Should you subsidize their drinks to boost morale, or let them enjoy at their own expense?',
    requires: ['building:brewery'],
    portraitId: 'farmer',
    options: [
      {
        text: 'LET THEM PAY',
        effects: {
          satisfaction: 2,
        },
      },
      {
        text: 'SUBSIDIZE DRINKS',
        effects: {
          satisfaction: 5,
          gold: -10,
        },
      },
    ],
  },
  
  // LOW AUTHORITY EVENTS (authorityMin: 0, authorityMax: 33)
  // These events reflect weak leadership, disrespect, and vulnerability
  {
    id: 'EVT_LOW_AUTHORITY',
    title: 'Protection Money',
    text: 'With your authority waning, a local mercenary demands protection money. Your weakened position makes this a difficult situation.',
    authorityMin: 0,
    authorityMax: 33,
    portraitId: 'mercenary',
    options: [
      {
        text: 'PAY PROTECTION',
        effects: {
          gold: -10,
          authority: -1,
        },
      },
      {
        text: 'THROW HIM OUT',
        effects: {
          authority: 1,
          landForces: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_GUARD_INSUBORDINATION',
    title: 'Disrespectful Guards',
    text: 'Your guards openly mock your orders. One even spits at your feet. Your weakened authority has emboldened them to disrespect you.',
    authorityMin: 0,
    authorityMax: 33,
    portraitId: 'guard',
    options: [
      {
        text: 'PUNISH THEM',
        effects: {
          landForces: -2,
          authority: 1,
        },
      },
      {
        text: 'IGNORE IT',
        effects: {
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_SABOTAGE',
    title: 'Sabotage in the Night',
    text: 'Someone has been stealing from the grain stores. Your lack of authority makes it impossible to maintain order or discover the culprit.',
    authorityMin: 0,
    authorityMax: 33,
    portraitId: 'bandit',
    options: [
      {
        text: 'FIND THE NASTY THIEVES',
        effects: {
          gold: -10,
          farmers: -2,
          authority: 1,
        },
      },
      {
        text: 'ACCEPT THE LOSS',
        effects: {
          gold: -5,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_PETITION_DENIED',
    title: 'Petition Rejected',
    text: 'The harvest was poor, so you petition the neighboring lord for aid, but are turned away at the gates. "We deal only with legitimate leaders," the guards say.',
    authorityMin: 0,
    authorityMax: 33,
    portraitId: 'ruler_neutral',
    options: [
      {
        text: 'BEG ON YOUR KNEES',
        effects: {
          gold: 15,
          satisfaction: 2,
          health: 2,
          authority: -2,
        },
      },
      {
        text: 'LEAVE WITH DIGNITY',
        effects: {
          satisfaction: -2,
          health: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_DEBT_COLLECTOR',
    title: 'The Debt Collector',
    text: 'A ruthless debt collector arrives, sensing your weakness. He demands that you pay for debts of your poorest villagers - or else he\'ll take what he\'s owed by force.',
    authorityMin: 0,
    authorityMax: 33,
    portraitId: 'merchant',
    options: [
      {
        text: 'PAY THE DEBT',
        effects: {
          gold: -15,
          authority: -1,
          satisfaction: 2,
        },
      },
      {
        text: 'PAY - HIM A VISIT!',
        effects: {
          landForces: -3,
          authority: 2,
          satisfaction: 2
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_COUNCIL_REVOLT',
    title: 'Council Challenge',
    text: 'Your own council openly questions your decisions. "Perhaps we need new leadership," one elder suggests loudly.',
    portraitId: 'elder',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'STAND FIRM',
        effects: {
          satisfaction: -4,
          authority: 2,
        },
      },
      {
        text: 'BRIBE THEM',
        effects: {
          gold: -15,
          satisfaction: 4,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_BANDITS_MOCK',
    title: 'Mocked by Bandits',
    text: 'A band of thieves leaves mocking notes at your doorstep, daring you to stop them. They know you lack the authority to organize an effective response.',
    portraitId: 'bandit',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'IGNORE THEM',
        effects: {
          authority: -2,
        },
      },
      {
        text: 'HIRE MERCENARIES',
        effects: {
          gold: -10,
          authority: 2,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_FARMERS_LEAVE',
    title: 'Mass Exodus',
    text: 'A herbalist and her family threaten that they\'re leaving for a neighboring settlement with "real leadership."',
    authorityMin: 0,
    authorityMax: 33,
    portraitId: 'healer',
    options: [
      {
        text: 'BEG THEM TO STAY',
        effects: {
          gold: -10,
          authority: -1,
        },
      },
      {
        text: 'THROW THEM OUT',
        effects: {
          farmers: -4,
          health: -2,
          authority: 1,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_MERCHANT_EXTORTION',
    title: 'Merchant Extortion',
    text: 'A traveling merchant realizes your position is weak. He demands tusuae the usual prices for urgently needed healing potions, knowing you have very low leverage to refuse.',
    portraitId: 'trader',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'PAY THE PRICE',
        effects: {
          gold: -20,
          health: 5,
        },
      },
      {
        text: 'REFUSE TO BUY',
        effects: {
          health: -3,
          satisfaction: -2,
          authority: 1,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_AUTHORITY_CRISIS',
    title: 'Crisis of Confidence',
    text: 'Word spreads that you are unfit to lead. People whisper behind your back, and decisions are ignored. The settlement teeters on the edge of chaos.',
    authorityMin: 0,
    authorityMax: 33,
    portraitId: 'advisor',
    options: [
      {
        text: 'MAKE A GRAND GESTURE',
        effects: {
          gold: -15,
          satisfaction: 4,
          authority: 1,
        },
      },
      {
        text: 'WAIT IT OUT',
        effects: {
          satisfaction: -2,
          authority: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_MEDIUM_AUTHORITY',
    title: 'Political Maneuver',
    text: 'Your moderate influence allows you to negotiate a trade deal with a neighboring settlement.',
    authorityMin: 34,
    authorityMax: 66,
    portraitId: 'merchant',
    options: [
      {
        text: 'ACCEPT DEAL',
        effects: {
          gold: 10,
          authority: 1,
        },
      },
      {
        text: 'SELL ALL WINTER STOCKS',
        effects: {
          gold: 40,
          satisfaction: -4,
          health: -4,
          farmers: -3,
        },
      },
    ],
  },
  
  // LOW AUTHORITY COMMIT EVENTS (authorityMin: 0, authorityMax: 33)
  // These events allow players with low authority to still participate in authority commit mechanics
  {
    id: 'EVT_COMMIT_LOW_DESPERATE_PLEA',
    title: 'Desperate Negotiation',
    text: 'A local merchant offers to help rebuild your reputation for a small fee.',
    portraitId: 'merchant',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'TAKE THE OFFER',
        effects: {gold: -5},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
          onSuccess: {
            satisfaction: 4,
            authority: 3,
          },
          onFailure: {
            satisfaction: -5,
          },
          successFeedbackRequestId: 'INFO_LOW_PLEA_SUCCESS',
          failureFeedbackRequestId: 'INFO_LOW_PLEA_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 5,
          minSuccessChance: 40,
          maxSuccessChance: 90,
        },
      },
      {
        text: 'DECLINE',
        effects: {
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_LOW_GUARD_LOYALTY',
    title: 'Wavering Guards',
    text: 'Your guards whisper of desertion. You could attempt to rally them with what little authority you have left, or let them go.',
    authorityMin: 0,
    authorityMax: 33,
    portraitId: 'military_advisor',
    options: [
      {
        text: 'RALLY THEM',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 10,
          onSuccess: {
            landForces: 3,
            authority: 4,
          },
          onFailure: {
            landForces: -2,
            satisfaction: -8,
          },
          successFeedbackRequestId: 'INFO_LOW_GUARD_SUCCESS',
          failureFeedbackRequestId: 'INFO_LOW_GUARD_FAILURE',
          refundOnSuccessPercent: 90,
          extraLossOnFailure: 5,
          minSuccessChance: 55,
          maxSuccessChance: 90,
        },
      },
      {
        text: 'LET THEM LEAVE',
        effects: {
          landForces: -3,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_LOW_VILLAGE_RESPECT',
    title: 'Earning Respect',
    text: 'The villagers doubt your leadership. You could make a bold stand to prove yourself worthy, but it requires mustering what authority you still possess.',
    authorityMin: 0,
    authorityMax: 33,
    portraitId: 'advisor',
    options: [
      {
        text: 'MAKE YOUR STAND',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 10,
          onSuccess: {
            satisfaction: 12,
            authority: 5,
            farmers: 3,
          },
          onFailure: {
            satisfaction: -10,
            farmers: -2,
          },
          successFeedbackRequestId: 'INFO_LOW_RESPECT_SUCCESS',
          failureFeedbackRequestId: 'INFO_LOW_RESPECT_FAILURE',
          refundOnSuccessPercent: 100,
          minSuccessChance: 55,
          maxSuccessChance: 90,
        },
      },
      {
        text: 'STAY QUIET',
        effects: {
          satisfaction: -5,
          authority: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_LOW_DEBT_NEGOTIATION',
    title: 'Debt Relief',
    text: 'Creditors circle like vultures. Hiring a lawyer to negotiate costs gold upfront. If you can muster enough authority, you might secure better terms. Otherwise, they will take everything.',
    authorityMin: 0,
    authorityMax: 33,
    portraitId: 'advisor',
    options: [
      {
        text: 'NEGOTIATE',
        effects: {
          gold: -5,
        },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
          onSuccess: {
            gold: 20,
            authority: 1,
          },
          onFailure: {
            gold: -15,
          },
          successFeedbackRequestId: 'INFO_LOW_DEBT_SUCCESS',
          failureFeedbackRequestId: 'INFO_LOW_DEBT_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 2,
          minSuccessChance: 30,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'PAY FULL PRICE',
        effects: {
          gold: -15,
          authority: -1,
        },
      },
    ],
  },
  
  // HIGH AUTHORITY EVENTS (authorityMin: 67, authorityMax: 100)
  // These events reflect strong leadership, political intrigue, and high-stakes scenarios
  {
    id: 'EVT_HIGH_AUTHORITY',
    title: 'Summit of Lords',
    text: 'Your formidable authority grants you an invitation to the regional council. This is an opportunity to solidify your position among the elite.',
    authorityMin: 67,
    authorityMax: 100,
    portraitId: 'noble',
    options: [
      {
        text: 'ATTEND SUMMIT',
        effects: {
          gold: 25,
          authority: 10,
          satisfaction: 10,
        },
      },
      {
        text: 'SEND DELEGATE',
        effects: {
          gold: 10,
          authority: 3,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_RIVAL_CHALLENGE',
    title: 'Rival Marken\'s Challenge',
    text: 'Lord Heinrich of the neighboring Mark challenges your authority publicly, claiming your lands should be his. This affront cannot go unanswered.',
    authorityMin: 67,
    authorityMax: 100,
    portraitId: 'noble',
    options: [
      {
        text: 'ACCEPT THE DUEL',
        effects: {
          authority: 10,
          landForces: -5,
          gold: 20,
          satisfaction: 15,
        },
      },
      {
        text: 'DIPLOMATIC REBUKE',
        effects: {
          gold: 15,
          authority: 5,
          satisfaction: 5,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_ALLIANCE_OFFER',
    title: 'Alliance Proposal',
    text: 'The Count of the Eastern Marches offers a formal alliance. With your strong reputation, this could open doors to greater power and wealth.',
    authorityMin: 67,
    authorityMax: 100,
    portraitId: 'ruler_allied',
    options: [
      {
        text: 'ACCEPT ALLIANCE',
        effects: {
          gold: 40,
          authority: 15,
          landForces: 10,
        },
      },
      {
        text: 'REMAIN INDEPENDENT',
        effects: {
          authority: 5,
          satisfaction: 10,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_ASSASSINATION_PLOT',
    title: 'Assassination Uncovered',
    text: 'Your spies uncover a plot against your life, orchestrated by jealous rivals. Your authority gives you the resources to respond decisively.',
    authorityMin: 67,
    authorityMax: 100,
    portraitId: 'advisor',
    options: [
      {
        text: 'STRIKE FIRST',
        effects: {
          gold: -20,
          authority: 10,
          landForces: 5,
          satisfaction: -5,
        },
      },
      {
        text: 'FORTIFY DEFENSES',
        effects: {
          gold: -15,
          authority: 5,
          landForces: 3,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_ROYAL_SUMMONS',
    title: 'Royal Summons',
    text: 'The King himself summons you to court, recognizing your authority. This is a rare honor that could elevate your status significantly.',
    authorityMin: 67,
    authorityMax: 100,
    portraitId: 'ruler_allied',
    options: [
      {
        text: 'ATTEND WITH ENTOURAGE',
        effects: {
          gold: -30,
          authority: 3,
        },
      },
      {
        text: 'ATTEND HUMBLY',
        effects: {
          gold: -10,
          authority: -1,
          satisfaction: 4,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_BETRAYAL',
    title: 'The Trusted Betrayer',
    text: 'Your closest advisor and some guards have been secretly undermining you, selling information to your enemies. They offer you an \'incentive\' to make it go away. How will you handle this betrayal?',
    authorityMin: 67,
    authorityMax: 100,
    portraitId: 'spy_enemy',
    options: [
      {
        text: 'PUBLIC EXECUTION',
        effects: {
          authority: 3,
          satisfaction: 4,
          landForces: -5,
        },
      },
      {
        text: 'TAKE THE \'INCENTIVE\'',
        effects: {
          gold: 30,
          satisfaction: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_TRIBUTE_DEMAND',
    title: 'Tribute Demanded',
    text: 'A weaker neighboring lord sends tribute, acknowledging your superior authority. This is the fruit of your strong leadership.',
    authorityMin: 67,
    authorityMax: 100,
    portraitId: 'ruler_enemy_weak',
    options: [
      {
        text: 'ACCEPT TRIBUTE',
        effects: {
          gold: 30,
          authority: 2,
        },
      },
      {
        text: 'REFUSE GRACIOUSLY',
        effects: {
          satisfaction: 4,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_POWER_PLAY',
    title: 'Political Machinations',
    text: 'You have the opportunity to eliminate a political rival through legal maneuvering. Your authority makes this possible, but the ethics are questionable.',
    authorityMin: 67,
    authorityMax: 100,
    portraitId: 'noble',
    options: [
      {
        text: 'DESTROY RIVAL',
        effects: {
          gold: 25,
          authority: 3,
          satisfaction: -3,
        },
      },
      {
        text: 'SHOW MERCY',
        effects: {
          authority: -2,
          satisfaction: 3,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_GRAND_TOURNAMENT',
    title: 'The Grand Tournament',
    text: 'You host a magnificent tournament that attracts nobles from across the realm. Your authority ensures this event will be remembered.',
    authorityMin: 67,
    authorityMax: 100,
    portraitId: 'knight',
    options: [
      {
        text: 'LAVISH CELEBRATION',
        effects: {
          gold: -40,
          authority: 5,
          satisfaction: 6,
        },
      },
      {
        text: 'MODEST AFFAIR',
        effects: {
          gold: -15,
          authority: 1,
          satisfaction: 3,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_DIPLOMATIC_CRISIS',
    title: 'Diplomatic Incident',
    text: 'An insult from a foreign ambassador threatens war. Your authority gives you the standing to demand satisfaction or broker peace.',
    authorityMin: 67,
    authorityMax: 100,
    portraitId: 'envoy',
    options: [
      {
        text: 'DEMAND APOLOGY (AND COMPENSATION)',
        effects: {

        },
        authorityCheck: {
          minCommit: 15,
          maxCommit: 40,
          onSuccess: {
            authority: 2,
            satisfaction: 3,
            gold: 20,
          },
          onFailure: {
          },
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 5,
          minSuccessChance: 40,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'PREPARE FOR WAR',
        effects: {
          authority: 1,
          landForces: 5,
          gold: -25,
        },
      },
    ],
  },
  
  // AUTHORITY COMMIT EVENTS (events with authorityCheck for risk/reward)
  // These provide meaningful choices with authority stakes
  {
    id: 'EVT_COMMIT_NEGOTIATE_TRADE',
    title: 'Trade Negotiation',
    text: 'A wealthy merchant guild seeks exclusive trading rights. You can leverage your authority to demand better terms, but failure could damage your reputation.',
    portraitId: 'merchant',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'NEGOTIATE HARD',
        effects: {
        },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 40,
          onSuccess: {
            gold: 30,
            authority: 1,
          },
          onFailure: {
            authority: -1,
          },
          successFeedbackRequestId: 'INFO_TRADE_SUCCESS',
          failureFeedbackRequestId: 'INFO_TRADE_FAILURE',
          refundOnSuccessPercent: 100,
          minSuccessChance: 30,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'ACCEPT THEIR TERMS',
        effects: {
          gold: 15,
          authority: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_QUELL_RIOT',
    title: 'Brewing Riot',
    text: 'Angry citizens gather in the square, demanding change. You can use your authority to calm them, but if you fail, violence may erupt.',
    authorityMin: 34,
    authorityMax: 100,
    portraitId: 'advisor',
    options: [
      {
        text: 'ADDRESS THE CROWD',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
          onSuccess: {
            satisfaction: 5,
            authority: 2,
          },
          onFailure: {
            satisfaction: -5,
            landForces: -3,
          },
          successFeedbackRequestId: 'INFO_RIOT_SUCCESS',
          failureFeedbackRequestId: 'INFO_RIOT_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 5,
          minSuccessChance: 25,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'SEND IN GUARDS',
        effects: {
          satisfaction: -5,
          landForces: -3,
          authority: 3,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_JUSTICE_DISPUTE',
    title: 'Noble Dispute',
    text: 'Two noble families feud over land rights. Your judgment will be final, but you need authority to make it stick.',
    authorityMin: 34,
    authorityMax: 100,
    portraitId: 'noble',
    options: [
      {
        text: 'RENDER JUDGMENT',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 20,
          onSuccess: {
            satisfaction: 5,
          },
          onFailure: {
            satisfaction: -5,
          },
          successFeedbackRequestId: 'INFO_JUSTICE_SUCCESS',
          failureFeedbackRequestId: 'INFO_JUSTICE_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 8,
          minSuccessChance: 55,
          maxSuccessChance: 90,
        },
      },
      {
        text: 'DEFER TO COUNCIL',
        effects: {
          authority: -1,
          satisfaction: 2,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_MILITARY_REFORM',
    title: 'Military Reorganization',
    text: 'Your military structure is outdated. Reforming it requires authority to overcome resistance from traditional commanders.',
    portraitId: 'military_advisor',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'FORCE REFORMS',
        effects: {},
        authorityCheck: {
          minCommit: 10,
          maxCommit: 30,
          onSuccess: {
            landForces: 10,
            authority: 3,
          },
          onFailure: {
            landForces: -5,
            satisfaction: -3,
          },
          successFeedbackRequestId: 'INFO_REFORM_SUCCESS',
          failureFeedbackRequestId: 'INFO_REFORM_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 4,
          minSuccessChance: 50,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'GRADUAL CHANGE',
        effects: {
          landForces: 3,
          gold: -15,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_BANDIT_PARLEY',
    title: 'Bandit Negotiation',
    text: 'A bandit chief offers to serve you instead of raiding. This requires enough authority to command their respect and loyalty.',
    portraitId: 'bandit',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'RECRUIT THEM',
        effects: {},
        authorityCheck: {
          minCommit: 5,
          maxCommit: 25,
          onSuccess: {
            landForces: 6,
            authority: 2,
          },
          onFailure: {
            gold: -20,
            fireRisk: 5,
          },
          successFeedbackRequestId: 'INFO_BANDIT_SUCCESS',
          failureFeedbackRequestId: 'INFO_BANDIT_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 0,
          minSuccessChance: 50,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'REFUSE THEM',
        effects: {
          authority: -2,
          satisfaction: 5,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_TAX_REFORM',
    title: 'Tax Collection Reform',
    text: 'The tax system is corrupt and inefficient. Overhauling it requires authority to force compliance from entrenched interests.',
    authorityMin: 34,
    authorityMax: 100,
    portraitId: 'advisor',
    options: [
      {
        text: 'IMPLEMENT REFORM',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 40,
          onSuccess: {
            gold: 30,
          },
          onFailure: {
            gold: -10,
            satisfaction: -5,
          },
          successFeedbackRequestId: 'INFO_TAX_SUCCESS',
          failureFeedbackRequestId: 'INFO_TAX_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 3,
          minSuccessChance: 25,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'KEEP STATUS QUO',
        effects: {
          gold: 5,
          authority: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_RELIGIOUS_DISPUTE',
    title: 'Religious Controversy',
    text: 'A religious dispute threatens to divide your people. Only strong authority can unite them under a single decision.',
    authorityMin: 34,
    authorityMax: 100,
    portraitId: 'village_priest',
    options: [
      {
        text: 'MAKE A DECREE',
        effects: {},
        authorityCheck: {
          minCommit: 10,
          maxCommit: 30,
          onSuccess: {
            satisfaction: 5,
            authority: 2,
          },
          onFailure: {
            satisfaction: -5,
            farmers: -5,
          },
          successFeedbackRequestId: 'INFO_RELIGIOUS_SUCCESS',
          failureFeedbackRequestId: 'INFO_RELIGIOUS_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 0,
          minSuccessChance: 50,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'ALLOW PLURALISM',
        effects: {
          satisfaction: 2,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_BORDER_CLAIM',
    title: 'Border Dispute',
    text: 'Contested lands lie between your territory and a neighbor\'s. Assert your claim with authority, or concede the ground.',
    authorityMin: 34,
    authorityMax: 100,
    portraitId: 'advisor',
    options: [
      {
        text: 'ASSERT CLAIM',
        effects: {},
        authorityCheck: {
          minCommit: 15,
          maxCommit: 25,
          onSuccess: {
            farmers: 5,
            gold: 25,
            authority: 2,
          },
          onFailure: {
            landForces: -6,
            satisfaction: -5,
          },
          successFeedbackRequestId: 'INFO_BORDER_SUCCESS',
          failureFeedbackRequestId: 'INFO_BORDER_FAILURE',
          refundOnSuccessPercent: 90,
          extraLossOnFailure: 10,
          minSuccessChance: 50,
          maxSuccessChance: 80,
        },
      },
      {
        text: 'CONCEDE LANDS',
        effects: {
          authority: -1,
          satisfaction: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_CORRUPT_OFFICIAL',
    title: 'Corruption Exposed',
    text: 'A powerful official is caught embezzling. Punishing them requires authority and investment, as they have many allies.',
    authorityMin: 34,
    authorityMax: 100,
    portraitId: 'advisor',
    options: [
      {
        text: 'PROSECUTE FULLY',
        effects: {gold: -10,},
        authorityCheck: {
          minCommit: 5,
          maxCommit: 20,
          onSuccess: {
            gold: 25,
            satisfaction: 4,
            authority: 2,
          },
          onFailure: {
            gold: -15,
            satisfaction: -3,
            landForces: -3,
          },
          successFeedbackRequestId: 'INFO_CORRUPT_SUCCESS',
          failureFeedbackRequestId: 'INFO_CORRUPT_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 10,
          minSuccessChance: 40,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'QUIET DISMISSAL',
        effects: {
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_SUCCESSION_CRISIS',
    title: 'Succession Crisis',
    text: 'A neighboring lord dies without clear heir. Several claimants seek your backing. Your choice requires authority to enforce.',
    authorityMin: 34,
    authorityMax: 100,
    portraitId: 'noble',
    options: [
      {
        text: 'BACK A CLAIMANT',
        effects: {},
        authorityCheck: {
          minCommit: 10,
          maxCommit: 40,
          onSuccess: {
            gold: 40,
            landForces: 5,
            authority: 2,
          },
          onFailure: {
            gold: -20,
            landForces: -3,
            satisfaction: -3,
          },
          successFeedbackRequestId: 'INFO_SUCCESSION_SUCCESS',
          failureFeedbackRequestId: 'INFO_SUCCESSION_FAILURE',
          refundOnSuccessPercent: 80,
          extraLossOnFailure: 0,
          minSuccessChance: 50,
          maxSuccessChance: 80,
        },
      },
      {
        text: 'STAY NEUTRAL',
        effects: {
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_GUILD_RIVALRY',
    title: 'Guild Power Struggle',
    text: 'Two merchant guilds vie for dominance. Choosing a winner requires authority to make your decision final.',
    portraitId: 'merchant',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'BACK ONE GUILD',
        effects: {},
        authorityCheck: {
          minCommit: 5,
          maxCommit: 20,
          onSuccess: {
            gold: 30,
            satisfaction: 3,
          },
          onFailure: {
            gold: -20,
            satisfaction: -3,
          },
          successFeedbackRequestId: 'INFO_GUILD_SUCCESS',
          failureFeedbackRequestId: 'INFO_GUILD_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 0,
          minSuccessChance: 55,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'FORCE COMPROMISE',
        effects: {
          gold: 10,
          authority: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_FOREIGN_ENVOY',
    title: 'Foreign Envoy',
    text: 'An envoy from a distant kingdom offers trade and alliance, but demands concessions. Your authority determines the terms.',
    authorityMin: 34,
    authorityMax: 100,
    portraitId: 'envoy',
    options: [
      {
        text: 'DEMAND EQUALITY',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 40,
          onSuccess: {
            gold: 25,
            authority: 1,
          },
          onFailure: {
            authority: -2,
            satisfaction: -3,
          },
          successFeedbackRequestId: 'INFO_ENVOY_SUCCESS',
          failureFeedbackRequestId: 'INFO_ENVOY_FAILURE',
          refundOnSuccessPercent: 100,
          minSuccessChance: 45,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'ACCEPT THEIR TERMS',
        effects: {
          gold: 10,
          authority: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_LAND_DISTRIBUTION',
    title: 'Land Redistribution',
    text: 'The poor demand land reform. Redistributing land from wealthy nobles requires immense authority to overcome their resistance.',
    authorityMin: 34,
    authorityMax: 100,
    portraitId: 'advisor',
    options: [
      {
        text: 'REDISTRIBUTE LAND',
        effects: {},
        authorityCheck: {
          minCommit: 10,
          maxCommit: 40,
          onSuccess: {
            farmers: 5,
            satisfaction: 5,
            authority: 2,
          },
          onFailure: {
            satisfaction: -3,
            gold: -25,
            farmers: -5,
          },
          successFeedbackRequestId: 'INFO_LAND_SUCCESS',
          failureFeedbackRequestId: 'INFO_LAND_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 0,
          minSuccessChance: 45,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'MAINTAIN STATUS QUO',
        effects: {
          satisfaction: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_CHALLENGE_TRADITION',
    title: 'Ancient Tradition',
    text: 'An archaic tradition harms your people, but it\'s deeply revered. Only strong authority can change it without causing upheaval.',
    authorityMin: 34,
    authorityMax: 100,
    portraitId: 'elder',
    options: [
      {
        text: 'ABOLISH TRADITION',
        effects: {},
        authorityCheck: {
          minCommit: 5,
          maxCommit: 20,
          onSuccess: {
            health: 6,
          },
          onFailure: {
            satisfaction: -5,
          },
          successFeedbackRequestId: 'INFO_TRADITION_SUCCESS',
          failureFeedbackRequestId: 'INFO_TRADITION_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 0,
          minSuccessChance: 55,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'RESPECT TRADITION',
        effects: {
          satisfaction: 3,
          health: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_PIRATE_ALLIANCE',
    title: 'River Pirates',
    text: 'Pirates control the river trade. You can attempt to recruit them as privateers, but it requires authority they will respect.',
    portraitId: 'pirate',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'RECRUIT PIRATES',
        effects: {},
        authorityCheck: {
          minCommit: 5,
          maxCommit: 25,
          onSuccess: {
            landForces: 6,
          },
          onFailure: {
          },
          successFeedbackRequestId: 'INFO_PIRATE_SUCCESS',
          failureFeedbackRequestId: 'INFO_PIRATE_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 5,
          minSuccessChance: 25,
          maxSuccessChance: 80,
        },
      },
      {
        text: 'IGNORE THEM',
        effects: {
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_MARRIAGE_ALLIANCE',
    title: 'Political Marriage',
    text: 'A powerful family offers a rather unbalanced marriage alliance. Securing favorable terms requires authority to negotiate from strength.',
    authorityMin: 34,
    authorityMax: 100,
    portraitId: 'noble',
    options: [
      {
        text: 'NEGOTIATE TERMS',
        effects: {},
        authorityCheck: {
          minCommit: 15,
          maxCommit: 50,
          onSuccess: {
            gold: 45,
            landForces: 5,
          },
          onFailure: {
            gold: -30,
            satisfaction: -5,
          },
          successFeedbackRequestId: 'INFO_MARRIAGE_SUCCESS',
          failureFeedbackRequestId: 'INFO_MARRIAGE_FAILURE',
          refundOnSuccessPercent: 90,
          extraLossOnFailure: 0,
          minSuccessChance: 40,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'ACCEPT AS OFFERED',
        effects: {
          gold: 15,
          authority: -3,
        },
      },
    ],
  },
  
  // EGO TEST EVENTS - Test humility, hubris, pride, and character
  {
    id: 'EVT_EGO_HUMBLE_PEASANT',
    title: 'The Wise Peasant',
    text: 'An elderly peasant offers unsolicited advice on governance. He speaks wisely, but addressing you as an equal. Do you listen humbly or assert your station?',
    portraitId: 'elder',
    options: [
      {
        text: 'LISTEN HUMBLY',
        effects: {
          authority: -1,
          satisfaction: 3,
          gold: 10,
        },
      },
      {
        text: 'PUT HIM IN HIS PLACE',
        effects: {
          authority: 2,
          satisfaction: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_PUBLIC_CRITICISM',
    title: 'Public Criticism',
    text: 'A popular merchant loudly criticizes your recent decisions in the town square. Others are watching to see how you respond.',
    portraitId: 'merchant',
    options: [
      {
        text: 'LAUGH IT OFF',
        effects: {
          authority: -1,
          satisfaction: 3,
        },
      },
      {
        text: 'ARREST HIM',
        effects: {
          authority: 2,
          satisfaction: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_MINOR_SLIGHT',
    title: 'Minor Disrespect',
    text: 'A guard forgets to bow when you pass. It\'s a small oversight, but others notice. How do you react?',
    portraitId: 'guard',
    options: [
      {
        text: 'IGNORE IT',
        effects: {
          authority: -1,
          satisfaction: 3,
        },
      },
      {
        text: 'PUNISH SEVERELY',
        effects: {
          authority: 2,
          satisfaction: -5,
          landForces: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_FLATTERY',
    title: 'Obvious Flattery',
    text: 'A courtier praises you with absurd exaggerations, calling you "the greatest leader ever to walk the earth."',
    portraitId: 'advisor',
    options: [
      {
        text: 'ENJOY THE PRAISE',
        effects: {
          authority: 2,
          satisfaction: -5,
        },
      },
      {
        text: 'CALL OUT THE LIE',
        effects: {
          authority: -2,
          satisfaction: 3,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_ADMIT_MISTAKE',
    title: 'Public Mistake',
    text: 'You made an error in judgment that cost the village resources. Do you admit fault publicly or deflect blame?',
    portraitId: 'advisor',
    options: [
      {
        text: 'ADMIT FAULT',
        effects: {
          authority: -2,
          satisfaction: 5,
          gold: -10,
        },
      },
      {
        text: 'BLAME OTHERS',
        effects: {
          authority: 2,
          satisfaction: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_RIVAL_SUCCESS',
    title: 'Rival\'s Success',
    text: 'A rival leader achieves great success. Your advisors suggest you might publicly congratulate him to show grace, but it would acknowledge their superiority.',
    portraitId: 'advisor',
    options: [
      {
        text: 'CONGRATULATE HIM HUMBLY',
        effects: {
          authority: -2,
          gold: 10,
        },
      },
      {
        text: 'DENOUNCE HIM',
        effects: {
          authority: 2,
          satisfaction: -4,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_GRAND_TITLE',
    title: 'Grandiose Title',
    text: 'A sycophant suggests you adopt a grandiose new title: "His Magnificence, Supreme Protector of the Realm." It\'s ridiculous but flattering.',
    portraitId: 'advisor',
    options: [
      {
        text: 'ACCEPT THE TITLE',
        effects: {
          authority: 2,
          satisfaction: -4,
        },
      },
      {
        text: 'REFUSE HUMBLY',
        effects: {
          authority: -2,
          satisfaction: 4,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_SERVANT_COMPLAINT',
    title: 'Servant\'s Complaint',
    text: 'A servant complains that you\'ve been unfair. The grievance is legitimate, but admitting it would show weakness.',
    portraitId: 'advisor',
    options: [
      {
        text: 'MAKE IT RIGHT',
        effects: {
          authority: -1,
          satisfaction: 3,
          gold: -5,
        },
      },
      {
        text: 'DISMISS THE SERVANT',
        effects: {
          authority: 2,
          satisfaction: -4,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_LAVISH_FEAST',
    title: 'Lavish Feast',
    text: 'You could throw a lavish feast to demonstrate your wealth and power, but the expense would be enormous and the people are struggling.',
    portraitId: 'advisor',
    options: [
      {
        text: 'THROW THE FEAST',
        effects: {
          gold: -30,
          authority: 4,
          satisfaction: -3,
        },
      },
      {
        text: 'MODEST CELEBRATION',
        effects: {
          gold: -10,
          satisfaction: 3,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_EXPERT_ADVICE',
    title: 'Expert\'s Warning',
    text: 'An expert warns that your plan is flawed. Accepting their advice would mean admitting you were wrong before the council.',
    portraitId: 'advisor',
    options: [
      {
        text: 'HEED THE WARNING',
        effects: {
          authority: -2,
          gold: 15,
        },
      },
      {
        text: 'PROCEED AS PLANNED',
        effects: {
          authority: 2,
          gold: -15,
          satisfaction: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_STATUE',
    title: 'Monument to Yourself',
    text: 'Advisors suggest erecting a statue in your honor. It would immortalize your legacy, but the cost is steep and the optics questionable.',
    portraitId: 'advisor',
    options: [
      {
        text: 'BUILD THE STATUE',
        effects: {
          gold: -25,
          authority: 4,
          satisfaction: -3,
        },
      },
      {
        text: 'DECLINE',
        effects: {
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_OVERREACTION',
    title: 'Petty Theft',
    text: 'Someone stole a chicken from your personal coop. It\'s a trivial loss, but some advisors suggest making an example.',
    portraitId: 'advisor',
    options: [
      {
        text: 'HARSH PUNISHMENT',
        effects: {
          authority: 2,
          farmers: -1,
          satisfaction: -3,
        },
      },
      {
        text: 'IGNORE IT',
        effects: {
          authority: -1,
        },
      },
    ],
  },
  // EXAMPLE: Authority Boost Follow-Up System
  {
    id: 'EVT_MYSTERIOUS_TRAVELER_ENHANCED',
    title: 'Mysterious Traveler',
    text: 'A hooded stranger arrives at your gates, asking for shelter. He seems educated but evasive about his past.',
    canTriggerRandomly: true,
    authorityMin: 20,
    authorityMax: 100,
    portraitId: 'traveler',
    options: [
      {
        text: 'INVITE HIM',
        effects: {
          gold: -5,
        },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 10,
          // No immediate effects - authority commit only affects follow-up probabilities
          // Follow-up probability boosts
          followUpBoosts: [
            {
              targetRequestId: 'EVT_TRAVELER_TEACHES',
              boostType: 'linear',
              boostValue: 4.0,  // At max commit (10): 75% → ~89%
              description: 'Increases chance traveler shares knowledge',
            },
          ],
        },
      },
      {
        text: 'SEND AWAY',
        effects: {
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [
          { requestId: 'EVT_TRAVELER_TEACHES', weight: 2 },
          { requestId: 'EVT_TRAVELER_BETRAYS', weight: 1 },
          // WITH AUTHORITY BOOST (these are old values but I leave them here as example):
          // No commit (0):     TEACHES 75% (3/4),      BETRAYS 25% (1/4)
          // Half commit (5):   TEACHES ~85% (5.5/6.5), BETRAYS ~15% (1/6.5)
          // Full commit (10):  TEACHES ~89% (8/9),     BETRAYS ~11% (1/9)
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'EVT_TRAVELER_CURSE', weight: 2 },
          { requestId: 'EVT_TRAVELER_RETURNS', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'EVT_TRAVELER_TEACHES',
    title: 'Grateful Teacher',
    text: 'The traveler reveals he is a scholar fleeing persecution. In gratitude for your hospitality, he offers to teach your citizens advanced techniques.',
    canTriggerRandomly: false,
    portraitId: 'traveler',
    options: [
      {
        text: 'ACCEPT HIS TEACHINGS',
        effects: {
          health: 5,
          authority: 2,
        },
      },
      {
        text: 'POLITELY DECLINE',
        effects: {
        },
      },
    ],
  },
  {
    id: 'EVT_TRAVELER_BETRAYS',
    title: 'Saboteur Revealed',
    text: 'The traveler was actually a spy! He has stolen valuable information and fled, leaving chaos in his wake.',
    canTriggerRandomly: false,
    portraitId: 'spy_enemy',
    options: [
      {
        text: 'DAMAGE CONTROL',
        effects: {
          gold: -20,
          authority: -2,
        },
      },
      {
        text: 'ACCEPT THE LOSS',
        effects: {
          gold: -15,
          authority: -2,
          satisfaction: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_TRAVELER_CURSE',
    title: 'Vengeful Wanderer',
    text: 'The rejected traveler curses your village as he leaves. Strange misfortunes begin to occur.',
    canTriggerRandomly: false,
    portraitId: 'traveler',
    options: [
      {
        text: 'SEEK REMEDY',
        effects: {
          gold: -15,
          health: -3,
        },
      },
      {
        text: 'IGNORE SUPERSTITION',
        effects: {
          satisfaction: -4,
          health: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_TRAVELER_RETURNS',
    title: 'Second Chance',
    text: 'The traveler returns months later, having found success elsewhere. He remembers your rejection but is willing to forgive.',
    canTriggerRandomly: false,
    portraitId: 'traveler',
    options: [
      {
        text: 'APOLOGIZE',
        effects: {
          satisfaction: 3,
        },
      },
      {
        text: 'MAINTAIN POSITION',
        effects: {
          authority: 2,
        },
      },
    ],
  },

  // =========================================================
  // CHAIN 1 – Bandit Toll
  // Mechanics: combat outcome, option followUps, weighted random,
  //            chain-gating, maxTriggers
  // =========================================================
  {
    id: 'CHAIN_BANDIT_TOLL_START',
    chainId: 'bandit_toll',
    chainRole: 'start',
    maxTriggers: 3,
    portraitId: 'bandit',
    title: 'Blocked Road',
    text: 'A band of armed men has set up a barricade across the only trade road. Their leader steps forward: "Toll is ten gold per cart. Pay or fight."',
    options: [
      { text: 'FIGHT THEM', effects: {} },
      { text: 'PAY THE TOLL', effects: { gold: -10, authority: -1 } },
    ],
    combat: {
      enemyForces: 5,
      prepDelayMinTicks: 2,
      prepDelayMaxTicks: 4,
      onWin: {
        gold: 15,
        authority: 2,
      },
      onLose: {
        gold: -5,
        satisfaction: -3,
        authority: -2,
      },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [
            { requestId: 'CHAIN_BANDIT_TOLL_LOOT', weight: 3 },
            { requestId: 'CHAIN_BANDIT_TOLL_SURVIVOR', weight: 2 },
          ],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [
            { requestId: 'CHAIN_BANDIT_TOLL_REGROUP', weight: 1 },
          ],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 8,
        candidates: [
          { requestId: 'CHAIN_BANDIT_TOLL_RETURN', weight: 3 },
          { requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_BANDIT_TOLL_LOOT',
    chainId: 'bandit_toll',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Spoils of Battle',
    text: 'The bandits are routed. Among their belongings your soldiers find stolen trade goods and a rough map of their hideout.',
    portraitId: 'military_advisor',
    options: [
      { text: 'RAID THE HIDEOUT', effects: { gold: 20, landForces: -2 } },
      { text: 'BURN THE MAP', effects: { satisfaction: 3 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_VICTORY', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_BANDIT_TOLL_SURVIVOR',
    chainId: 'bandit_toll',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'bandit',
    title: 'A Bandit Speaks',
    text: 'One of the bandits survived. He offers information about a larger gang in exchange for his life.',
    options: [
      { text: 'SPARE HIM', effects: { authority: -1, satisfaction: 2 } },
      { text: 'EXECUTE HIM', effects: { authority: 1, satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [
          { requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 2 },
          { requestId: 'CHAIN_BANDIT_TOLL_END_VICTORY', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_VICTORY', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_BANDIT_TOLL_REGROUP',
    chainId: 'bandit_toll',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Licking Wounds',
    text: 'The bandits defeated your men but did not press the attack. Feldric advises rebuilding strength before they return.',
    portraitId: 'military_advisor',
    options: [
      { text: 'RECRUIT MORE', effects: { gold: -10, landForces: 4 } },
      { text: 'NEGOTIATE PEACE', effects: { gold: -15, authority: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_RETURN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_BANDIT_TOLL_RETURN',
    chainId: 'bandit_toll',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'bandit',
    title: 'They Are Back',
    text: 'The bandits have returned with reinforcements. This time they demand double the toll or blood.',
    options: [
      { text: 'FIGHT AGAIN', effects: {} },
      { text: 'PAY DOUBLE', effects: { gold: -20, authority: -2 } },
    ],
    combat: {
      enemyForces: 8,
      prepDelayMinTicks: 2,
      prepDelayMaxTicks: 3,
      onWin: {
        gold: 25,
        authority: 3,
        satisfaction: 3,
      },
      onLose: {
        gold: -15,
        satisfaction: -5,
        authority: -3,
      },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_VICTORY', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_DEFEAT', weight: 1 }],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_BANDIT_TOLL_END_VICTORY',
    chainId: 'bandit_toll',
    chainRole: 'end',
    chainRestartCooldownTicks: 80,
    canTriggerRandomly: false,
    title: 'Road Secured',
    text: 'The trade road is clear at last. Merchants return, and the village prospers from renewed commerce.',
    portraitId: 'trader',
    options: [
      { text: 'CELEBRATE', effects: { satisfaction: 5, gold: 10 } },
      { text: 'FORTIFY THE ROAD', effects: { gold: -10, landForces: 3 } },
    ],
  },
  {
    id: 'CHAIN_BANDIT_TOLL_END_PEACE',
    chainId: 'bandit_toll',
    chainRole: 'end',
    chainRestartCooldownTicks: 80,
    canTriggerRandomly: false,
    title: 'Uneasy Truce',
    text: 'The bandits move on to easier prey. The road reopens, though travelers remain wary.',
    portraitId: 'advisor',
    options: [
      { text: 'POST GUARDS', effects: { landForces: -1, satisfaction: 3 } },
      { text: 'MOVE ON', effects: { satisfaction: 1 } },
    ],
  },
  {
    id: 'CHAIN_BANDIT_TOLL_END_DEFEAT',
    chainId: 'bandit_toll',
    chainRole: 'end',
    chainRestartCooldownTicks: 80,
    canTriggerRandomly: false,
    title: 'A Costly Lesson',
    text: 'The bandits control the road now. Trade slows to a trickle and your people grow restless.',
    portraitId: 'bandit',
    options: [
      { text: 'SEEK ALLIES', effects: { gold: -5, authority: 1 } },
      { text: 'ENDURE', effects: { satisfaction: -5 } },
    ],
  },

  // =========================================================
  // CHAIN 2 – Merchant Guild
  // Mechanics: option followUps, requirements (building:marketplace),
  //            weighted candidates, chain-gating
  // =========================================================
  {
    id: 'CHAIN_MERCHANT_GUILD_START',
    chainId: 'merchant_guild',
    chainRole: 'start',
    requires: ['building:marketplace'],
    portraitId: 'merchant',
    title: 'Guild Proposal',
    text: 'A delegation of merchants arrives at the marketplace. They propose forming a guild to regulate trade and share profits — for a founding fee.',
    options: [
      { text: 'ACCEPT', effects: { gold: -15 } },
      { text: 'REJECT', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 6,
        candidates: [
          { requestId: 'CHAIN_MERCHANT_GUILD_PROSPEROUS', weight: 3 },
          { requestId: 'CHAIN_MERCHANT_GUILD_CORRUPT', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [
          { requestId: 'CHAIN_MERCHANT_GUILD_SMUGGLERS', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_MERCHANT_GUILD_PROSPEROUS',
    chainId: 'merchant_guild',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Thriving Commerce',
    text: 'The guild is running smoothly. Goods flow, prices stabilize, and the treasury benefits. The guild master asks to expand operations.',
    options: [
      { text: 'EXPAND', effects: { gold: -15, } },
      { text: 'KEEP CURRENT SIZE', effects: { } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_WEALTH', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_STABLE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MERCHANT_GUILD_CORRUPT',
    chainId: 'merchant_guild',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Shady Dealings',
    text: 'Reports surface that guild members are price-fixing and skimming profits. The guild master denies it flatly.',
    options: [
      { text: 'INVESTIGATE', effects: { gold: -10, authority: 1 } },
      { text: 'TURN A BLIND EYE', effects: { satisfaction: -3 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_MERCHANT_GUILD_END_REFORM', weight: 2 },
          { requestId: 'CHAIN_MERCHANT_GUILD_END_STABLE', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_STABLE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MERCHANT_GUILD_SMUGGLERS',
    chainId: 'merchant_guild',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Black Market',
    text: 'Without a guild, smugglers fill the void. Cheap goods appear but quality is terrible and crime rises.',
    portraitId: 'spy_enemy',
    options: [
      { text: 'CRACK DOWN', effects: { landForces: -3, authority: 1 } },
      { text: 'TOLERATE IT', effects: { health: -2, satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_REFORM', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_STABLE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MERCHANT_GUILD_END_WEALTH',
    chainId: 'merchant_guild',
    chainRole: 'end',
    chainRestartCooldownTicks: 60,
    canTriggerRandomly: false,
    title: 'Golden Age of Trade',
    text: 'The expanded guild brings prosperity. Merchants from distant lands flock to your marketplace.',
    portraitId: 'merchant',
    options: [
      { text: 'HOST A TRADE FAIR', effects: { gold: 45, satisfaction: 2 } },
      { text: 'TAX THE PROFITS', effects: { gold: 60, satisfaction: -3 } },
    ],
  },
  {
    id: 'CHAIN_MERCHANT_GUILD_END_STABLE',
    chainId: 'merchant_guild',
    chainRole: 'end',
    chainRestartCooldownTicks: 60,
    canTriggerRandomly: false,
    title: 'Steady Trade',
    text: 'Trade continues at a modest pace. The guild — or lack thereof — has settled into a routine.',
    portraitId: 'merchant',
    options: [
      { text: 'GOOD ENOUGH', effects: { gold: 25 } },
      { text: 'TAX THE PROFITS', effects: { gold: 35, satisfaction: -3 } },
    ],
  },
  {
    id: 'CHAIN_MERCHANT_GUILD_END_REFORM',
    chainId: 'merchant_guild',
    chainRole: 'end',
    chainRestartCooldownTicks: 60,
    canTriggerRandomly: false,
    title: 'A Fresh Start',
    text: 'With the corrupt elements removed, honest merchants return. The marketplace is cleaner and more trustworthy.',
    portraitId: 'merchant',
    options: [
      { text: 'CELEBRATE', effects: { satisfaction: 3 } },
      { text: 'STAY VIGILANT', effects: { authority: 2 } },
    ],
  },

  // =========================================================
  // CHAIN 3 – Plague Rumors
  // Mechanics: option followUps, authority pool-gating
  //            (authorityMin/authorityMax), weighted candidates
  // =========================================================
  {
    id: 'CHAIN_PLAGUE_RUMORS_START',
    chainId: 'plague_rumors',
    chainRole: 'start',
    authorityMin: 20,
    authorityMax: 100,
    title: 'Dark Whispers',
    text: 'Travelers speak of a sickness spreading through neighboring settlements. Your healers urge precautions before it reaches your lands.',
    portraitId: 'healer',
    options: [
      { text: 'QUARANTINE BORDERS', effects: { gold: -10, satisfaction: -3 } },
      { text: 'DISMISS THE RUMORS', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [
          { requestId: 'CHAIN_PLAGUE_RUMORS_CONTAINED', weight: 3 },
          { requestId: 'CHAIN_PLAGUE_RUMORS_BREACH', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_PLAGUE_RUMORS_OUTBREAK', weight: 3 },
          { requestId: 'CHAIN_PLAGUE_RUMORS_NOTHING', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_PLAGUE_RUMORS_CONTAINED',
    chainId: 'plague_rumors',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Quarantine Holds',
    text: 'The border quarantine is working. Sickness has not reached your village, but trade has slowed to a crawl.',
    portraitId: 'healer',
    options: [
      { text: 'MAINTAIN QUARANTINE', effects: { gold: -10 } },
      { text: 'REOPEN BORDERS', effects: { gold: 10 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [{ requestId: 'CHAIN_PLAGUE_RUMORS_END_SAFE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_PLAGUE_RUMORS_END_SAFE', weight: 2 },
          { requestId: 'CHAIN_PLAGUE_RUMORS_END_SICK', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_PLAGUE_RUMORS_BREACH',
    chainId: 'plague_rumors',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Quarantine Breached',
    text: 'Despite your efforts, a merchant slipped through the quarantine. Several villagers have fallen ill.',
    portraitId: 'healer',
    options: [
      { text: 'TREAT THE SICK', effects: { gold: -15, health: 3, } },
      { text: 'ISOLATE THEM', effects: { satisfaction: -3, } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_PLAGUE_RUMORS_END_SAFE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_PLAGUE_RUMORS_END_SICK', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_PLAGUE_RUMORS_OUTBREAK',
    chainId: 'plague_rumors',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Plague Arrives',
    text: 'The sickness has reached your village. People are falling ill rapidly. The healers plead for resources.',
    portraitId: 'healer',
    options: [
      { text: 'FUND HEALERS', effects: { gold: -15, health: 5 } },
      { text: 'PRAY FOR THE BEST', effects: { health: -5, farmers: -5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 6,
        candidates: [
          { requestId: 'CHAIN_PLAGUE_RUMORS_END_SAFE', weight: 2 },
          { requestId: 'CHAIN_PLAGUE_RUMORS_END_SICK', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_PLAGUE_RUMORS_END_SICK', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_PLAGUE_RUMORS_NOTHING',
    chainId: 'plague_rumors',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    title: 'False Alarm',
    text: 'The rumors were overblown. No plague materialized and life continues as before.',
    portraitId: 'healer',
    options: [
      { text: 'RELIEF', effects: { satisfaction: 3 } },
      { text: 'STAY CAUTIOUS', effects: { authority: 1 } },
    ],
  },
  {
    id: 'CHAIN_PLAGUE_RUMORS_END_SAFE',
    chainId: 'plague_rumors',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    title: 'Crisis Averted',
    text: 'The sickness passes without major casualties. Your village emerges stronger and more resilient.',
    portraitId: 'healer',
    options: [
      { text: 'CELEBRATE SURVIVAL', effects: { satisfaction: 3, health: 5 } },
      { text: 'BUILD AN INFIRMARY', effects: { gold: -10, health: 8 } },
    ],
  },
  {
    id: 'CHAIN_PLAGUE_RUMORS_END_SICK',
    chainId: 'plague_rumors',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    title: 'Scars of Sickness',
    text: 'The plague has taken its toll. Empty homes stand as reminders. Recovery will take time.',
    portraitId: 'healer',
    options: [
      { text: 'MOURN AND REBUILD', effects: { farmers: -5, health: 3 } },
      { text: 'BLAME YOUR HEALERS', effects: { farmers: -5, satisfaction: -3, health: 3, authority: 1 } },
    ],
  },

  // =========================================================
  // CHAIN 4 – Noble Feud
  // Mechanics: authority check with followUpBoosts (linear boost),
  //            combat outcome, weighted candidates, chain-gating
  // =========================================================
  {
    id: 'CHAIN_NOBLE_FEUD_START',
    chainId: 'noble_feud',
    chainRole: 'start',
    authorityMin: 34,
    authorityMax: 100,
    title: 'The Rival Lord',
    text: 'Lord Alden of a neighboring fief has laid claim to a strip of borderland that your farmers work. He demands you yield or face consequences.',
    portraitId: 'noble',
    options: [
      {
        text: 'ASSERT YOUR CLAIM',
        effects: {},
        authorityCheck: {
          minCommit: 5,
          maxCommit: 20,
          followUpBoosts: [
            {
              targetRequestId: 'CHAIN_NOBLE_FEUD_DIPLOMACY',
              boostType: 'linear',
              boostValue: 4.0,
              description: 'Increases chance of diplomatic resolution',
            },
          ],
        },
      },
      { text: 'YIELD THE LAND', effects: { farmers: -3, authority: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_NOBLE_FEUD_DIPLOMACY', weight: 2 },
          { requestId: 'CHAIN_NOBLE_FEUD_ESCALATE', weight: 3 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_YIELDED', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_NOBLE_FEUD_DIPLOMACY',
    chainId: 'noble_feud',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'A Reasonable Man',
    text: 'Lord Alden agrees to meet. Surprisingly, he is open to negotiation. Perhaps this can be settled without bloodshed.',
    portraitId: 'noble',
    options: [
      { text: 'OFFER COMPROMISE', effects: { gold: -10, authority: 1 } },
      { text: 'DEMAND FULL RIGHTS', effects: { authority: 2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_PEACE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_NOBLE_FEUD_END_PEACE', weight: 1 },
          { requestId: 'CHAIN_NOBLE_FEUD_ESCALATE', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_NOBLE_FEUD_ESCALATE',
    chainId: 'noble_feud',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Swords Drawn',
    text: 'Lord Alden has gathered his men. His banners appear on the borderland. Feldric readies the militia: "This is no bluff."',
    portraitId: 'knight',
    options: [
      { text: 'DEFEND THE BORDER', effects: {} },
      { text: 'OFFER TRIBUTE', effects: { gold: -20, authority: -1 } },
    ],
    combat: {
      enemyForces: 6,
      prepDelayMinTicks: 2,
      prepDelayMaxTicks: 4,
      onWin: {
        authority: 2,
      },
      onLose: {
        farmers: -4,
        satisfaction: -3,
        authority: -2,
      },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_TRIUMPH', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_YIELDED', weight: 1 }],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_YIELDED', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_NOBLE_FEUD_END_PEACE',
    chainId: 'noble_feud',
    chainRole: 'end',
    chainRestartCooldownTicks: 70,
    canTriggerRandomly: false,
    title: 'Neighborly Accord',
    text: 'You and Lord Alden reach a fair agreement. The border is settled and both fiefs benefit from cooperation.',
    portraitId: 'noble',
    options: [
      { text: 'TOAST TO PEACE', effects: { satisfaction: 3, gold: 10 } },
      { text: 'FORMALIZE THE PACT', effects: { authority: 2, gold: 10 } },
    ],
  },
  {
    id: 'CHAIN_NOBLE_FEUD_END_TRIUMPH',
    chainId: 'noble_feud',
    chainRole: 'end',
    chainRestartCooldownTicks: 70,
    canTriggerRandomly: false,
    title: 'The Border Stands',
    text: 'Lord Alden retreats in defeat. The borderland remains yours. Your people cheer their victory.',
    portraitId: 'knight',
    options: [
      { text: 'REWARD THE MILITIA', effects: { satisfaction: 5 } },
      { text: 'FORTIFY THE BORDER', effects: { landForces: 5 } },
    ],
  },
  {
    id: 'CHAIN_NOBLE_FEUD_END_YIELDED',
    chainId: 'noble_feud',
    chainRole: 'end',
    chainRestartCooldownTicks: 70,
    canTriggerRandomly: false,
    title: 'Land Lost',
    text: 'The borderland now belongs to Lord Alden. Your farmers must find new fields, and your authority has suffered.',
    portraitId: 'noble',
    options: [
      { text: 'ACCEPT THE LOSS', effects: { gold: -15, authority: -1 } },
      { text: 'PLAN REVENGE', effects: { gold: -15, authority: 1, satisfaction: -2 } },
    ],
  },

  // =========================================================
  // CHAIN 5 – Harvest Festival
  // Mechanics: option followUps, requirements (need:beer),
  //            maxTriggers, chain-gating, weighted candidates
  // =========================================================
  {
    id: 'CHAIN_HARVEST_FEST_START',
    chainId: 'harvest_fest',
    chainRole: 'start',
    maxTriggers: 2,
    requires: ['building:brewery'],
    title: 'Festival Season',
    text: 'The harvest is in and the people want a grand festival. Brewers offer their finest ale if you fund the event.',
    portraitId: 'bard',
    options: [
      { text: 'FUND THE FESTIVAL', effects: { gold: -15 } },
      { text: 'CANCEL IT', effects: { satisfaction: -3 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [
          { requestId: 'CHAIN_HARVEST_FEST_GREAT', weight: 3 },
          { requestId: 'CHAIN_HARVEST_FEST_TROUBLE', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_HARVEST_FEST_END_QUIET', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_HARVEST_FEST_GREAT',
    chainId: 'harvest_fest',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Joy and Ale',
    text: 'The festival is a roaring success! Music, dancing, and barrels of ale. But the crowd wants even more entertainment.',
    portraitId: 'bard',
    options: [
      { text: 'HIRE PERFORMERS', effects: { gold: -10 } },
      { text: 'LET THEM ENJOY', effects: {  } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_HARVEST_FEST_END_GLORY', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_HARVEST_FEST_END_GOOD', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_HARVEST_FEST_TROUBLE',
    chainId: 'harvest_fest',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Drunken Brawl',
    text: 'Too much ale has led to a brawl between farmers. Fists fly and tables break. The festival could turn ugly.',
    portraitId: 'farmer',
    options: [
      { text: 'RESTORE ORDER', effects: { authority: 2, satisfaction: -2 } },
      { text: 'LET THEM FIGHT', effects: { health: -3 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [
          { requestId: 'CHAIN_HARVEST_FEST_END_GOOD', weight: 2 },
          { requestId: 'CHAIN_HARVEST_FEST_END_QUIET', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_HARVEST_FEST_END_QUIET', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_HARVEST_FEST_END_GLORY',
    chainId: 'harvest_fest',
    chainRole: 'end',
    chainRestartCooldownTicks: 50,
    canTriggerRandomly: false,
    title: 'A Festival to Remember',
    text: 'Songs are written about this festival. The people are united, and word of your generosity spreads far.',
    portraitId: 'bard',
    options: [
      { text: 'BASK IN GLORY', effects: { satisfaction: 3, authority: 2 } },
      { text: 'PREPARE NEXT YEAR', effects: { satisfaction: 6 } },
    ],
  },
  {
    id: 'CHAIN_HARVEST_FEST_END_GOOD',
    chainId: 'harvest_fest',
    chainRole: 'end',
    chainRestartCooldownTicks: 50,
    canTriggerRandomly: false,
    title: 'Fond Memories',
    text: 'The festival winds down peacefully. People head home with warm bellies and good cheer.',
    portraitId: 'farmer',
    options: [
      { text: 'REST WELL', effects: { satisfaction: 2, health: 2 } },
      { text: 'CLEAN UP', effects: { satisfaction: 3 } },
    ],
  },
  {
    id: 'CHAIN_HARVEST_FEST_END_QUIET',
    chainId: 'harvest_fest',
    chainRole: 'end',
    chainRestartCooldownTicks: 50,
    canTriggerRandomly: false,
    title: 'Back to Work',
    text: 'Festival or not, the work continues. The village settles back into its daily routine.',
    portraitId: 'farmer',
    options: [
      { text: 'CARRY ON', effects: { } },
      { text: 'PROMISE A BETTER ONE', effects: { satisfaction: 2, gold: -10 } },
    ],
  },

  // =========================================================
  // CHAIN 6 – Disease Rumor
  // Mechanics: option followUps, weighted candidates,
  //            global crisis priority via health < 30
  // =========================================================
  {
    id: 'CHAIN_DISEASE_RUMOR_START',
    chainId: 'disease_rumor',
    chainRole: 'start',
    title: 'Feverish Whispers',
    text: 'A peddler collapses at the gate, shivering with fever. The village healer warns that an unknown sickness may already be spreading among the traders\' carts.',
    canTriggerRandomly: true,
    portraitId: 'healer',
    options: [
      { text: 'QUARANTINE EARLY', effects: { gold: -8, satisfaction: -2 } },
      { text: 'WAIT', effects: { } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_DISEASE_CONTAINED', weight: 3 },
          { requestId: 'CHAIN_DISEASE_SPREADS', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_DISEASE_SPREADS', weight: 3 },
          { requestId: 'CHAIN_DISEASE_FALSE_ALARM', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_DISEASE_CONTAINED',
    chainId: 'disease_rumor',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Quarantine Holds',
    text: 'Your swift action paid off. The sick have been isolated and the village healer reports no new cases. The people praise your foresight.',
    portraitId: 'healer',
    options: [
      { text: 'AS IT SHOULD BE', effects: { health: 3, authority: 1 } },
      { text: 'IMPROVE SANITATION', effects: {gold: -10, health: 4} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_DISEASE_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_DISEASE_SPREADS',
    chainId: 'disease_rumor',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Plague Creeps In',
    text: 'The sickness has spread to several households. Coughing echoes through the streets and the healer begs for coin to set up treatment tents.',
    portraitId: 'healer',
    options: [
      { text: 'SET UP HEALERS', effects: { gold: -15, health: -4 } },
      { text: 'DO NOTHING', effects: { health: -5, authority: -1} },
    ],
    // If health drops below 30 from this, EVT_CRISIS_DISEASE may be triggered globally by picker.ts.
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'CHAIN_DISEASE_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_DISEASE_FALSE_ALARM',
    chainId: 'disease_rumor',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Just a Cold',
    text: 'The healer examines the last patient and shrugs. "Seasonal sniffles, nothing more." The village breathes a sigh of relief, though some grumble about the wasted panic.',
    portraitId: 'healer',
    options: [
      { text: 'WHAT A RELIEF', effects: { } },
      { text: 'SCOLD YOUR HEALER', effects: {satisfaction: -2, authority: 1} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_DISEASE_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_DISEASE_END',
    chainId: 'disease_rumor',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 140,
    title: 'The Fever Passes',
    text: 'Whether by quarantine, treatment, or simple luck, the threat of disease has faded. Life returns to normal — for now.',
    portraitId: 'healer',
    options: [
      { text: 'MOVE ON', effects: {} },
      { text: 'STOCK HERBS', effects: {gold: -10, health: 3} },
    ],
  },

  // =========================================================
  // CHAIN 7 – Palisade Upgrade
  // Mechanics: option followUps, weighted candidates,
  //            requires token gating (building:marketplace)
  // =========================================================
  {
    id: 'CHAIN_PALISADE_START',
    chainId: 'palisade',
    chainRole: 'start',
    title: 'Rotting Defenses',
    text: 'The outer palisade has deteriorated badly. Gaps in the timber invite wolves and worse. Feldric urges an upgrade before the next raid season.',
    canTriggerRandomly: true,
    portraitId: 'military_advisor',
    options: [
      { text: 'INVEST IN PALISADE', effects: { gold: -15 } },
      { text: 'DELAY', effects: { satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          // This follow-up requires building:marketplace to be unlocked (meetsRequirements).
          { requestId: 'CHAIN_PALISADE_HIRE_CARPENTERS', weight: 100 },
          { requestId: 'CHAIN_PALISADE_LOCAL_BUILD', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'CHAIN_PALISADE_END_WEAKENED', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_PALISADE_HIRE_CARPENTERS',
    chainId: 'palisade',
    chainRole: 'member',
    canTriggerRandomly: false,
    requires: ['building:marketplace'],
    title: 'Guild Carpenters Available',
    text: 'Thanks to the marketplace, a guild of skilled carpenters offers their services. Their work would be superior, but their rates are steep.',
    portraitId: 'craftsman',
    options: [
      { text: 'PAY GUILD', effects: { gold: -15 } },
      { text: 'FARMERS ARE GOOD ENOUGH', effects: { satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_PALISADE_END_STRONG', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_PALISADE_LOCAL_BUILD', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_PALISADE_LOCAL_BUILD',
    chainId: 'palisade',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Village Hands',
    text: 'Without guild access, the villagers must do the work themselves. It will take longer, but the result is good, and it costs nothing beyond sweat.',
    portraitId: 'farmer',
    options: [
      { text: 'STANDARD WORKTIME', effects: { landForces: 3, authority: 1 } },
      { text: 'PAY OVERTIME', effects: { gold: -10, landForces: 6} },
    ],
  },
  {
    id: 'CHAIN_PALISADE_END_WEAKENED',
    chainId: 'palisade',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 90,
    title: 'pallisades or ruins?',
    text: 'You decided not investing into pallisade renovations. Now, they are barely more than a pile of pebble.',
    portraitId: 'craftsman',
    options: [
      { text: 'TOO BAD', effects: {landForces: -3, authority: -1} },
      { text: 'WE\'LL MANAGE', effects: {satisfaction: -2} },
    ],
  },
  {
    id: 'CHAIN_PALISADE_END_STRONG',
    chainId: 'palisade',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 90,
    title: 'Most shiny pallisades around',
    text: 'The hired guild workers do excellent efforts. Your pallisades are not only strong as ever, but also beautiful.',
    portraitId: 'craftsman',
    options: [
      { text: 'THANK THEM', effects: {landForces: 10, authority: 1, satisfaction: 2} },
      { text: 'SHOW OFF', effects: {landForces: 10, authority: 3} },
    ],
  },

  // =========================================================
  // CHAIN 8 – Arkanat Inspector
  // Mechanics: authority boosts weights (stepped), option followUps,
  //            weighted candidates, authorityMin, advancesTick:false
  // =========================================================
  {
    id: 'CHAIN_ARKANAT_INSPECTOR_START',
    chainId: 'arkanat_inspector',
    chainRole: 'start',
    authorityMin: 20,
    title: 'The Arkanat Arrives',
    text: 'A stern official from the Arkanat — the regional mage council — dismounts at your gate. He carries sealed writs and a cold expression. "I am here to audit your governance."',
    canTriggerRandomly: true,
    portraitId: 'arkanat_mage',
    options: [
      {
        text: 'ASSERT JURISDICTION',
        effects: { },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
          followUpBoosts: [
            { targetRequestId: 'CHAIN_ARKANAT_BACKS_DOWN', boostType: 'stepped', boostValue: 2, steps: 3 },
          ],
        },
      },
      { text: 'COOPERATE', effects: { authority: -1, gold: -5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_ARKANAT_BACKS_DOWN', weight: 1 },
          { requestId: 'CHAIN_ARKANAT_RETALIATES', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_ARKANAT_DEMANDS_FEES', weight: 2 },
          { requestId: 'CHAIN_ARKANAT_MUTUAL_RESPECT', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_ARKANAT_BACKS_DOWN',
    chainId: 'arkanat_inspector',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Inspector Relents',
    text: 'Faced with your firm stance and the weight of your authority, the Arkanat inspector folds his writs. "Very well. Your records appear... adequate." He mounts his horse without another word.',
    portraitId: 'arkanat_mage',
    options: [
      { text: 'SEE HIM OUT', effects: { authority: 1 } },
      { text: 'GOOD RIDDANCE', effects: { satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'CHAIN_ARKANAT_DEBRIEF', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'CHAIN_ARKANAT_DEBRIEF', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_ARKANAT_RETALIATES',
    chainId: 'arkanat_inspector',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Inspector Strikes Back',
    text: 'The inspector was not bluffing. He produces a decree stripping you of certain privileges and levies a fine. "The Arkanat does not forget defiance."',
    portraitId: 'arkanat_mage',
    options: [
      { text: 'ACCEPT THE BLOW', effects: { authority: -3, satisfaction: -2 } },
      { text: 'PROTEST', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'CHAIN_ARKANAT_DEBRIEF', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_ARKANAT_DEMANDS_FEES',
    chainId: 'arkanat_inspector',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Administrative Fees',
    text: 'The inspector smiles thinly. "Your cooperation is noted. However, administrative fees are still due." He slides a ledger across the table with an exorbitant sum circled in red.',
    portraitId: 'arkanat_mage',
    options: [
      { text: 'PAY', effects: { gold: -20 } },
      { text: 'REFUSE', effects: { authority: 1, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'CHAIN_ARKANAT_DEBRIEF', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_ARKANAT_MUTUAL_RESPECT',
    chainId: 'arkanat_inspector',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Mutual Understanding',
    text: 'Your willingness to cooperate impresses the inspector. Over ale, he shares useful information about regional trade routes and promises to speak well of you to the council.',
    portraitId: 'arkanat_mage',
    options: [
      { text: 'A GOOD OUTCOME', effects: { authority: 1 } },
      { text: 'THANK HIM', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'CHAIN_ARKANAT_DEBRIEF', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_ARKANAT_DEBRIEF',
    chainId: 'arkanat_inspector',
    chainRole: 'end',
    canTriggerRandomly: false,
    advancesTick: false,
    chainRestartCooldownTicks: 200,
    title: 'Arkanat Debrief',
    text: 'The inspector is gone. Feldric summarizes: the Arkanat will return eventually — they always do. But for now, the matter is settled.',
    portraitId: 'advisor',
    options: [
      { text: 'NOTED', effects: {} },
      { text: 'WE\'RE PREPARED', effects: {} },
    ],
  },

  // =========================================================
  // CHAIN 9 – Ego Test: Public Insult
  // Mechanics: option followUps, weighted candidates,
  //            maxTriggers=1 (once per game run)
  // =========================================================
  {
    id: 'CHAIN_EGO_INSULT_START',
    chainId: 'ego_insult',
    chainRole: 'start',
    title: 'A Voice from the Crowd',
    text: 'During a public address, a villager shouts: "You call yourself a leader? My goat governs better!" Laughter ripples through the crowd. All eyes turn to you.',
    canTriggerRandomly: true,
    portraitId: 'antagonist_villager',
    options: [
      { text: 'PUNISH', effects: { authority: 1, satisfaction: -2 } },
      { text: 'LAUGH IT OFF', effects: { satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_EGO_PUNISH_BACKLASH', weight: 1 },
          { requestId: 'CHAIN_EGO_PUNISH_RESPECT', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_EGO_LAUGH_EMBOLDENED', weight: 1 },
          { requestId: 'CHAIN_EGO_LAUGH_RESPECT', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_EGO_PUNISH_BACKLASH',
    chainId: 'ego_insult',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Heavy Hand Backfires',
    text: 'The heckler is dragged away, but the crowd murmurs darkly. "He only spoke what we all think." Your show of force has made things worse.',
    portraitId: 'antagonist_villager',
    options: [
      { text: 'LEAVE THE SQUARE', effects: { authority: -1 } },
      { text: 'DISPERSE THE CROWD', effects: {satisfaction: -2, authority: 1} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_EGO_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_EGO_PUNISH_RESPECT',
    chainId: 'ego_insult',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Order Restored',
    text: 'The crowd falls silent at first. Then a loud voice rings out: “All hail!” It isn’t long before the whole square erupts in applause. Whether out of fear or awe, you cannot say.',
    portraitId: 'antagonist_villager',
    options: [
      { text: 'AS IT SHOULD BE', effects: { authority: 1, } },
      { text: 'DEAL OUT COINS', effects: {gold: -5,} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_EGO_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_EGO_LAUGH_EMBOLDENED',
    chainId: 'ego_insult',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Mockery Spreads',
    text: 'Your good humor emboldens others. Soon "the goat lord" becomes a street joke. Children bleat at you in the streets.',
    portraitId: 'antagonist_villager',
    options: [
      { text: 'IGNORE IT', effects: { authority: -1 } },
      { text: 'IMPRISON THEM', effects: {satisfaction: -5, farmers: -3, authority: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_EGO_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_EGO_LAUGH_RESPECT',
    chainId: 'ego_insult',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Grace Under Fire',
    text: 'Your laughter disarms the moment entirely. The heckler himself grins sheepishly. "Fair enough, my lord." The crowd warms to you — a leader who can take a joke is a leader worth following.',
    portraitId: 'antagonist_villager',
    options: [
      { text: 'WELL HANDLED', effects: { satisfaction: 1 } },
      { text: 'BUY HIM AN ALE', effects: {gold: -5, satisfaction: 1} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_EGO_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_EGO_END',
    chainId: 'ego_insult',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 100,
    title: 'The Incident Fades',
    text: 'Weeks pass and the incident is mostly forgotten — though some still smirk when they think you are not looking. Such is the burden of leadership.',
    portraitId: 'advisor',
    options: [
      { text: 'MOVE FORWARD', effects: {} },
      { text: 'LET IT GO', effects: {} },
    ],
  },

  // =========================================================
  // CHAIN 10 – River Pirates
  // Mechanics: combat outcome, option followUps, weighted candidates,
  //            authority boosts weights (linear)
  // =========================================================
  {
    id: 'CHAIN_RIVER_PIRATES_START',
    chainId: 'river_pirates',
    chainRole: 'start',
    portraitId: 'pirate',
    title: 'Sails on the River',
    text: 'Black-flagged longboats have been spotted on the river. A pirate fleet demands tribute or threatens to burn your docks and seize your coin.',
    canTriggerRandomly: true,
    combat: {
      enemyForces: 10,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 6,
      onWin: { authority: 2,},
      onLose: { authority: -2,},
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_AFTER_WIN', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_AFTER_LOSE', weight: 1 }],
        },
      ],
    },
    options: [
      { text: 'FIGHT', effects: {} },
      {
        text: 'PAY TRIBUTE',
        effects: { gold: -15, authority: -1 },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
          followUpBoosts: [
            { targetRequestId: 'CHAIN_RIVER_PIRATES_TRIBUTE_LEAVES', boostType: 'linear', boostValue: 4 },
          ],
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [
          { requestId: 'CHAIN_RIVER_PIRATES_TRIBUTE_LEAVES', weight: 1 },
          { requestId: 'CHAIN_RIVER_PIRATES_TRIBUTE_RETURNS', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_RIVER_PIRATES_AFTER_WIN',
    chainId: 'river_pirates',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'River Cleared',
    text: 'The pirate fleet burns on the riverbank. Your soldiers recover stolen goods from the wreckage. Word of the victory spreads downstream.',
    portraitId: 'knight',
    options: [
      { text: 'SALVAGE WHAT WE CAN', effects: {gold: 15,} },
      { text: 'CELEBRATE', effects: {satisfaction: 3,} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_RIVER_PIRATES_AFTER_LOSE',
    chainId: 'river_pirates',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Docks in Flames',
    text: 'The pirates overwhelmed your defenses and march towards your treasury. Your villagers try to flee.',
    portraitId: 'pirate',
    options: [
      { text: 'PEASANTS, DEFEND MY TREASURY!', effects: {farmers: -10, satisfaction: -3,} },
      { text: 'RUN FOR YOUR LIVES!', effects: {gold: -20, satisfaction: 3,} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_RIVER_PIRATES_TRIBUTE_LEAVES',
    chainId: 'river_pirates',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'pirate',
    title: 'Pirates Withdraw',
    text: 'The pirate captain counts the tribute and nods. "Wise choice." The black sails disappear downriver. Perhaps your show of authority convinced them to seek easier prey.',
    options: [
      { text: 'BRAG ABOUT IT', effects: { satisfaction: -1, authority: 1,} },
      { text: 'SECURE THE RIVER', effects: {gold: -10, landForces: 3} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_RIVER_PIRATES_TRIBUTE_RETURNS',
    chainId: 'river_pirates',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'pirate',
    title: 'They Want More',
    text: 'The pirates took the tribute — and came back for more. "give us your coin or we take your wives!" The crew jeers from the deck as their captain extends an open palm.',
    options: [
      { text: 'GIVE COIN', effects: { gold: -10 } },
      { text: 'GIVE UP WIVES', effects: {farmers: -5, satisfaction: -5,} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_RIVER_PIRATES_END',
    chainId: 'river_pirates',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 100,
    title: 'The River Quiets',
    text: 'The river pirate threat has passed. Fishermen cautiously return to their boats, and trade barges resume their routes.',
    portraitId: 'advisor',
    options: [
      { text: 'CURSE PIRATES', effects: {satisfaction: 2, authority: -1} },
      { text: 'SCOLD YOUR SOLDIERS', effects: {satisfaction: -2, authority: 1} },
    ],
  },

  // =========================================================
  // CHAIN 11 – Wandering Healer (Small, 4 requests)
  // A traveling healer offers aid to the settlement.
  // Diamond pattern: START → TREAT / REFUSE → END
  // =========================================================
  {
    id: 'CHAIN_HEALER_START',
    chainId: 'wandering_healer',
    chainRole: 'start',
    title: 'The Wandering Healer',
    portraitId: 'healer',
    text: 'A woman in travel-worn robes approaches the gate, carrying bundles of dried herbs and a leather satchel of salves. She calls herself Maren, a healer from the eastern valleys. "Your people look pale," she says, studying the villagers. "I can help — for a fair price."',
    options: [
      { text: 'HIRE HER', effects: { gold: -10 } },
      { text: 'SEND HER AWAY', effects: { satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_HEALER_TREAT', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_HEALER_REFUSE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_HEALER_TREAT',
    chainId: 'wandering_healer',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'The Healer\'s Craft',
    portraitId: 'healer',
    text: 'Maren has been working tirelessly among the sick. Fevers have broken and wounds are mending. But she approaches you now with a request: "I need rarer ingredients to finish my work — yarrow root and ghost-moss. I can purchase them, but the cost falls to you."',
    options: [
      { text: 'PAY FOR INGREDIENTS', effects: { gold: -10, health: 3 } },
      { text: 'USE LOCAL REMEDIES', effects: { farmers: -2, health: 2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_HEALER_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_HEALER_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_HEALER_REFUSE',
    chainId: 'wandering_healer',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Sickness Lingers',
    text: 'Without the healer\'s expertise, the village coughs grow worse. Your advisor pulls you aside: "My lord, the people are frightened. We must do something — quarantine the sick quarter, or at least gather what herbs we can from the forest."',
    portraitId: 'healer',
    options: [
      { text: 'QUARANTINE', effects: { health: -1, fireRisk: -2 } },
      { text: 'GATHER HERBS', effects: { gold: -5, health: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_HEALER_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_HEALER_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_HEALER_END',
    chainId: 'wandering_healer',
    chainRole: 'end',
    chainRestartCooldownTicks: 30,
    canTriggerRandomly: false,
    title: 'Recovery',
    text: 'The worst of the illness has passed. Color returns to the villagers\' cheeks, and the settlement stirs back to life. Whether by healer\'s skill or village grit, your people endure.',
    portraitId: 'healer',
    options: [
      { text: 'CELEBRATE RECOVERY', effects: { satisfaction: 3, gold: -5 } },
      { text: 'BUILD A HERB GARDEN', effects: { health: 3, fireRisk: -2, gold: -10 } },
    ],
  },

  // =========================================================
  // CHAIN 12 – Smuggler's Offer (Small, 5 requests)
  // Cheap goods from smugglers test the player's morals.
  // Diamond with extra member: START → DEAL → CAUGHT → END
  //                            START → REPORT → END
  // =========================================================
  {
    id: 'CHAIN_SMUGGLER_START',
    chainId: 'smugglers_offer',
    chainRole: 'start',
    title: 'Whispers at the Gate',
    text: 'A merchant pulls you aside at the market square, glancing over his shoulder. "My lord, there are men camped beyond the treeline — smugglers. They carry salt, iron, and cloth at half the guild price. Shall I arrange a meeting, or shall we report them to the watch?"',
    portraitId: 'trader',
    options: [
      { text: 'ARRANGE A DEAL', effects: { gold: 10, authority: -1 } },
      { text: 'REPORT TO WATCH', effects: { satisfaction: 1, gold: -5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_DEAL', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_REPORT', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_SMUGGLER_DEAL',
    chainId: 'smugglers_offer',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'The Midnight Exchange',
    text: 'The smugglers delivered as promised — crates of goods now sit in your storehouse. But a guard on night patrol noticed the wagons. He stands before you, uncertain. "My lord, I saw unmarked carts at the south gate. Should I... forget what I saw?"',
    portraitId: 'trader',
    options: [
      { text: 'HIDE THE GOODS', effects: { fireRisk: 2, gold: 5 } },
      { text: 'RETURN EVERYTHING', effects: { gold: -10, satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_CAUGHT', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_SMUGGLER_REPORT',
    chainId: 'smugglers_offer',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Justice at the Treeline',
    text: 'Your watchmen tracked the smugglers to their camp and confronted them. The leader, a scarred man called Dettmer, spat at your guards but surrendered without a fight. "You could have profited, lord. Instead you chose the hard road." What do you do with the prisoners?',
    portraitId: 'advisor',
    options: [
      { text: 'ARREST THEM', effects: { authority: 2, satisfaction: -1 } },
      { text: 'DRIVE THEM OFF', effects: { satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_SMUGGLER_CAUGHT',
    chainId: 'smugglers_offer',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'A Council Inquiry',
    text: 'Word has reached the village council about the unmarked goods. A council member stands before you with a ledger. "My lord, there are discrepancies in the storehouse inventory. The people deserve an explanation."',
    portraitId: 'noble',
    options: [
      { text: 'PAY A FINE', effects: { gold: -15, authority: -1 } },
      { text: 'BLAME THE MERCHANT', effects: { satisfaction: -2, authority: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_SMUGGLER_END',
    chainId: 'smugglers_offer',
    chainRole: 'end',
    chainRestartCooldownTicks: 35,
    canTriggerRandomly: false,
    title: 'The Dust Settles',
    text: 'The smuggler affair fades from memory as new concerns take hold. Your storehouse is stocked — or not — and the village moves on. Lessons were learned about the cost of shortcuts.',
    portraitId: 'advisor',
    options: [
      { text: 'TIGHTEN PATROLS', effects: { gold: -5, fireRisk: -3 } },
      { text: 'OPEN MARKETS WIDER', effects: { gold: 5, satisfaction: 2 } },
    ],
  },

  // =========================================================
  // CHAIN 13 – The Lost Child (Small, 4 requests)
  // A child goes missing and the village must respond.
  // Diamond pattern: START → SEARCH / WAIT → END
  // =========================================================
  {
    id: 'CHAIN_LOST_CHILD_START',
    chainId: 'lost_child',
    chainRole: 'start',
    title: 'A Child Gone Missing',
    text: 'A farmer bursts into the hall, breathless and wild-eyed. "My lord, my daughter — she was playing near the forest edge and never came home! The sun is setting and wolves howl in those woods at night. Please, you must help!"',
    portraitId: 'children',
    options: [
      { text: 'SEND SEARCH PARTY', effects: { gold: -5, farmers: -3 } },
      { text: 'WAIT UNTIL DAWN', effects: { satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_LOST_CHILD_SEARCH', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_LOST_CHILD_WAIT', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_LOST_CHILD_SEARCH',
    chainId: 'lost_child',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Into the Dark Woods',
    text: 'Your search party pushes deeper into the forest with torches held high. They find small footprints near a stream, heading toward the old ruins. The trail is fresh but the woods grow thick. Press on, or set up camp and call out?',
    portraitId: 'scout',
    options: [
      { text: 'PRESS DEEPER', effects: { health: -1, gold: -5 } },
      { text: 'CAMP AND CALL OUT', effects: { satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_LOST_CHILD_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_LOST_CHILD_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_LOST_CHILD_WAIT',
    chainId: 'lost_child',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'A Long Night',
    text: 'The village holds its breath through the night. The father paces by the gate, refusing food or rest. At first light, your advisor approaches. "My lord, we could light bonfires at the forest edge to guide the child home — though the fire risk concerns me. Or we continue to wait and trust in providence."',
    portraitId: 'scout',
    options: [
      { text: 'LIGHT BONFIRES', effects: { fireRisk: 3, gold: -5 } },
      { text: 'KEEP WAITING', effects: { satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_LOST_CHILD_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_LOST_CHILD_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_LOST_CHILD_END',
    chainId: 'lost_child',
    chainRole: 'end',
    chainRestartCooldownTicks: 25,
    canTriggerRandomly: false,
    title: 'Found',
    text: 'The child is found — muddy, frightened, but alive — huddled beneath a fallen oak. The father weeps with relief as he carries her home. The village gathers around them, and for a moment, the hardships of frontier life feel lighter.',
    portraitId: 'children',
    options: [
      { text: 'CELEBRATE', effects: { satisfaction: 3, gold: -5 } },
      { text: 'POST FOREST WATCH', effects: { authority: 2, gold: -10 } },
    ],
  },

  // =========================================================
  // CHAIN 14 – Foreign Envoy (Mid, 8 requests)
  // A diplomatic envoy from a neighboring realm arrives.
  // Fork pattern with two distinct paths and three endings.
  // =========================================================
  {
    id: 'CHAIN_ENVOY_START',
    chainId: 'foreign_envoy',
    chainRole: 'start',
    title: 'Riders on the Road',
    text: 'A column of riders appears on the eastern road, bearing the banner of the March of Valdren — a silver stag on blue. A herald dismounts and bows. "My lords send greetings and request an audience. They wish to discuss matters of mutual benefit." Your council watches and waits for your response.',
    portraitId: 'envoy',
    options: [
      { text: 'HOST A FEAST', effects: { gold: -10, satisfaction: 1 } },
      { text: 'DENY ENTRY', effects: { authority: 1, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_ENVOY_FEAST', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_ENVOY_REBUFF', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_ENVOY_FEAST',
    chainId: 'foreign_envoy',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'The Envoy\'s Toast',
    portraitId: 'envoy',
    text: 'Wine flows and the envoy — a sharp-eyed woman called Lady Sigrun — raises her cup. "To friendship between our marches," she says. Over roasted venison, she leans closer. "But friendship requires investment, does it not? I have a proposal — hear me out before you judge."',
    options: [
      { text: 'HEAR THE PROPOSAL', effects: { gold: -5 } },
      { text: 'DEMAND GIFTS FIRST', effects: { authority: 1, gold: 5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_ENVOY_PROPOSAL', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_ENVOY_PROPOSAL', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_ENVOY_REBUFF',
    chainId: 'foreign_envoy',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'An Insult Remembered',
    text: 'The envoy\'s herald rides back to the column, face flushed. From the gate, you watch the riders confer — then the column turns not east toward home, but south toward the river crossing. Your advisor frowns. "They are heading toward our trade routes, my lord. This may not be the last we hear of Valdren."',
    portraitId: 'envoy',
    options: [
      { text: 'SEND AN APOLOGY', effects: { gold: -10, authority: -2 } },
      { text: 'LET THEM STEW', effects: { authority: 2, satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_ENVOY_TENSIONS', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_ENVOY_TENSIONS', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_ENVOY_PROPOSAL',
    chainId: 'foreign_envoy',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'The Valdren Accord',
    text: 'Lady Sigrun unrolls a parchment across the table. "Valdren proposes a trade pact: your grain and timber for our iron and horses. We would also station a small garrison at the river ford — for mutual protection, of course." The terms are generous, but the garrison clause raises eyebrows among your council.',
    portraitId: 'envoy',
    options: [
      { text: 'ACCEPT FULL TERMS', effects: { gold: -15, satisfaction: 2 } },
      { text: 'COUNTER WITHOUT GARRISON', effects: { authority: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_ENVOY_END_ALLIANCE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_ENVOY_END_TRADE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_ENVOY_TENSIONS',
    chainId: 'foreign_envoy',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Border Tensions',
    text: 'Merchants returning from the south bring troubling news. Valdren riders have been seen near your border villages, questioning farmers about grain stores and troop movements. Whether this is intimidation or preparation, the message is clear: Valdren has not forgotten.',
    portraitId: 'envoy',
    options: [
      { text: 'FORTIFY THE BORDER', effects: { gold: -15, authority: 1 } },
      { text: 'SEEK DIPLOMACY', effects: { gold: -5, satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_ENVOY_END_HOSTILE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_ENVOY_END_TRADE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_ENVOY_END_ALLIANCE',
    chainId: 'foreign_envoy',
    chainRole: 'end',
    chainRestartCooldownTicks: 50,
    canTriggerRandomly: false,
    title: 'The Silver Stag Pact',
    text: 'The Valdren Accord is signed with great ceremony. Lady Sigrun clasps your hand. "Today marks a new era for both our peoples." Iron and horses begin flowing into your settlement, and the Valdren garrison at the ford keeps the road safe. Time will tell if this friendship holds.',
    portraitId: 'envoy',
    options: [
      { text: 'CELEBRATE THE PACT', effects: { satisfaction: 4, gold: 15 } },
      { text: 'INVEST IN TRADE ROUTE', effects: { gold: -5, farmers: 4 } },
    ],
  },
  {
    id: 'CHAIN_ENVOY_END_TRADE',
    chainId: 'foreign_envoy',
    chainRole: 'end',
    chainRestartCooldownTicks: 50,
    canTriggerRandomly: false,
    title: 'A Cautious Agreement',
    text: 'After weeks of negotiation, a modest trade agreement is reached. No garrison, no grand alliance — just goods exchanged at fair prices. Your council calls it prudent. Lady Sigrun calls it disappointing. Either way, the wagons roll.',
    portraitId: 'trader',
    options: [
      { text: 'ACCEPT THE DEAL', effects: { gold: 10, satisfaction: 1 } },
      { text: 'PUSH FOR BETTER TERMS', effects: { authority: 2, gold: 5 } },
    ],
  },
  {
    id: 'CHAIN_ENVOY_END_HOSTILE',
    chainId: 'foreign_envoy',
    chainRole: 'end',
    chainRestartCooldownTicks: 50,
    canTriggerRandomly: false,
    title: 'A Cold Border',
    text: 'The Valdren riders withdraw, but the damage is done. Trade with the east has slowed to a trickle, and your border villages report sleepless nights. You have preserved your independence — but at the cost of a neighbor\'s goodwill.',
    portraitId: 'military_advisor',
    options: [
      { text: 'STRENGTHEN DEFENSES', effects: { gold: -10, landForces: 3 } },
      { text: 'SEEK OTHER ALLIES', effects: { satisfaction: -1, authority: -1 } },
    ],
  },

  // =========================================================
  // CHAIN 15 – Deserter's Dilemma (Mid, 7 requests)
  // Soldiers desert and the player must choose justice or mercy.
  // Fork pattern: START → HUNT / PARDON → distinct endings.
  // =========================================================
  {
    id: 'CHAIN_DESERTER_START',
    chainId: 'deserters',
    chainRole: 'start',
    title: 'Empty Bunks',
    text: 'Your military advisor strides into the hall with a grim expression. "My lord, six soldiers slipped out of the barracks last night. They took weapons, rations, and a mule. Tracks lead south into the marshes. Desertion — plain and simple." He pauses. "Do we hunt them, or let word spread that we forgive cowardice?"',
    portraitId: 'military_advisor',
    options: [
      { text: 'HUNT THEM DOWN', effects: { gold: -5, authority: 1 } },
      { text: 'OFFER PARDON', effects: { authority: -2, satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_DESERTER_HUNT', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_DESERTER_PARDON', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_DESERTER_HUNT',
    chainId: 'deserters',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Tracks in the Marsh',
    text: 'Your scouts locate the deserters in an abandoned woodcutter\'s cabin near the marsh. They have barricaded the door and are armed. Your military advisor studies the position. "We can storm them — it will be quick but bloody. Or we can call out terms and try to talk them back."',
    portraitId: 'military_advisor',
    combat: {
      enemyForces: 4,
      prepDelayMinTicks: 1,
      prepDelayMaxTicks: 2,
      onWin: { authority: 2 },
      onLose: { satisfaction: -2, authority: -1 },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_DESERTER_CAPTURED', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_DESERTER_CAPTURED', weight: 1 }],
        },
      ],
    },
    options: [
      { text: 'STORM THE CABIN', effects: {} },
      { text: 'NEGOTIATE SURRENDER', effects: { gold: -10, satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_DESERTER_END_JUSTICE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_DESERTER_CAPTURED',
    chainId: 'deserters',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'The Prisoners',
    text: 'The deserters are brought back in chains, bruised and silent. The village watches as they are marched through the gate. Your military advisor waits for your judgment. "The men await sentencing, my lord. A harsh example, or measured justice?"',
    portraitId: 'military_advisor',
    options: [
      { text: 'HARSH PUNISHMENT', effects: { authority: 2, satisfaction: -2 } },
      { text: 'FAIR TRIAL', effects: { gold: -5, satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_DESERTER_END_JUSTICE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_DESERTER_END_JUSTICE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_DESERTER_PARDON',
    chainId: 'deserters',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'The Pardon Proclaimed',
    text: 'Word of the pardon spreads. Within days, four of the six deserters slink back through the gate, heads bowed. But the remaining two are nowhere to be seen. The returned soldiers look thin and ashamed. A farmer\'s wife spits at them. Your advisor asks, "How shall we receive them, my lord?"',
    portraitId: 'farmer',
    options: [
      { text: 'PROMISE BETTER CONDITIONS', effects: { gold: -10, satisfaction: 2 } },
      { text: 'SET A DEADLINE FOR OTHERS', effects: { authority: 1, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_DESERTER_REINTEGRATE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_DESERTER_REINTEGRATE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_DESERTER_REINTEGRATE',
    chainId: 'deserters',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'New Beginnings',
    text: 'The pardoned soldiers stand before you, waiting for assignment. Some are farmers\' sons who never wanted to fight. Others were veterans who simply broke under the weight of endless duty. Your advisor lays out two paths: send them to the fields, or back to the barracks.',
    portraitId: 'advisor',
    options: [
      { text: 'ASSIGN TO FARMS', effects: { farmers: 3, satisfaction: 1 } },
      { text: 'RETURN TO MILITIA', effects: { landForces: 3, authority: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_DESERTER_END_MERCY', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_DESERTER_END_MERCY', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_DESERTER_END_JUSTICE',
    chainId: 'deserters',
    chainRole: 'end',
    chainRestartCooldownTicks: 45,
    canTriggerRandomly: false,
    title: 'Order Restored',
    text: 'The deserter affair is settled. Whether by blade or by law, the message is clear: duty is not optional. The remaining soldiers stand straighter at their posts, and the village watches with a mix of fear and respect.',
    portraitId: 'military_advisor',
    options: [
      { text: 'MAKE AN EXAMPLE', effects: { authority: 3, satisfaction: -3 } },
      { text: 'SHOW RESTRAINT', effects: { satisfaction: 2, authority: 1 } },
    ],
  },
  {
    id: 'CHAIN_DESERTER_END_MERCY',
    chainId: 'deserters',
    chainRole: 'end',
    chainRestartCooldownTicks: 45,
    canTriggerRandomly: false,
    title: 'The Village Whole',
    text: 'The pardoned men have settled into their new roles. Some till the fields with renewed purpose; others stand guard with a quieter resolve. The village is whole again — not because of punishment, but because of a second chance.',
    portraitId: 'advisor',
    options: [
      { text: 'CELEBRATE UNITY', effects: { satisfaction: 3, gold: -5 } },
      { text: 'INVEST IN TRAINING', effects: { landForces: 2, gold: -10 } },
    ],
  },

  // ─── CHAIN: Market Inspection (market_inspection) ──────────────────────────
  // Large chain (25 events): a market inspection splits into 4 paths:
  // A) False Scales (Fraud Network), B) Watered Ale (Supply Control),
  // C) Thieves (Handler Ring), D) Smugglers (Shadow Trade).
  // Economy goal: most paths end gold-positive. Two optional combat branches.
  {
    id: 'CHAIN_MI_START',
    chainId: 'market_inspection',
    chainRole: 'start',
    canTriggerRandomly: true,
    portraitId: 'advisor',
    title: 'Trouble at the Market',
    text: 'Your bailiff arrives with a worried look. "My lord, the weekly market is rife with complaints — vendors cheating on weights, tavern keepers watering their ale, thieves working the crowd, and shadowy figures shifting goods under cloth. Where shall we begin the inspection?"',
    options: [
      { text: 'INSPECT THE STALLS', effects: {} },
      { text: 'INSPECT THE CROWD', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_MI_A_SCALES', weight: 1 },
          { requestId: 'CHAIN_MI_B_ALE', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_MI_C_THIEVES', weight: 1 },
          { requestId: 'CHAIN_MI_D_SMUGGLERS', weight: 1 },
        ],
      },
    ],
  },

  // ─── PATH A: False Scales (Fraud Network) ──────────────────────────────────
  {
    id: 'CHAIN_MI_A_SCALES',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'The False Scales',
    text: 'At the grain stall, your inspector finds a set of weights that tip short by a third. The merchant, a red-faced man named Aldric, sweats under your gaze. "Those weights came with the stall, my lord — I swear it!"',
    options: [
      { text: 'SEIZE THE WEIGHTS', effects: { satisfaction: 1 } },
      { text: 'FINE ON THE SPOT', effects: { gold: 8, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_A_SUPPLIER', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_A_SUPPLIER', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MI_A_SUPPLIER',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'The Weight-Maker\'s Route',
    text: 'Aldric insists the weights were rented from a traveling standard-maker who visits every month. Your inspector has traced the route — the same false weights appear across six villages. A supplier network is at work. You can expose this publicly, or press Aldric directly for the name of his contact.',
    options: [
      { text: 'PUBLIC REWEIGHING', effects: {} },
      {
        text: 'FORCE TESTIMONY',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 20,
          threshold: 10,
          onSuccess: { gold: 5 },
          onFailure: { satisfaction: -2, authority: -2 },
          minSuccessChance: 35,
          maxSuccessChance: 80,
          refundOnSuccessPercent: 80,
          extraLossOnFailure: 2,
          successFeedbackRequestId: 'INFO_MI_TESTIMONY_SUCCESS',
          failureFeedbackRequestId: 'INFO_MI_TESTIMONY_FAILURE',
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_A_LOCATED', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_A_LOCATED', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MI_A_LOCATED',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'trader',
    title: 'The Supplier Found',
    text: 'Your guards have cornered the traveling weight-maker in the eastern quarter. His wagon holds enough counterfeit brass to defraud a dozen markets. He offers a licensing arrangement — a cut of his profits to operate legally — or you can simply seize everything.',
    options: [
      { text: 'LICENSE THE TRADE', effects: { gold: -5 } },
      { text: 'CONFISCATE THE STOCK', effects: { gold: 15, satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_A_END_ORDERED', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_A_END_RAID', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MI_A_END_ORDERED',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    title: 'Ordered Measures',
    text: 'The licensing arrangement is formalized. The weight-maker now pays quarterly permit fees and operates under inspection. Stallholders grumble at the new oversight, but honest traders are relieved. The market stabilizes under your authority.',
    options: [
      { text: 'COLLECT PERMIT FEES', effects: { gold: 5, satisfaction: 2 } },
      { text: 'RESTORE ORDER QUIETLY', effects: { gold: 2, satisfaction: 1 } },
    ],
  },
  {
    id: 'CHAIN_MI_A_END_RAID',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'council_member',
    title: 'The Raid Windfall',
    text: 'The counterfeit weights are melted down, the good brass sold to the smith. The weight-maker is expelled from the march. Word spreads quickly — the markets are afraid, but honest. The treasury swells from the auction of seized goods.',
    options: [
      { text: 'AUCTION THE STOCK', effects: { gold: 10, satisfaction: -2 } },
      { text: 'SETTLE FOR HALF', effects: { gold: 5, satisfaction: -1 } },
    ],
  },

  // ─── PATH B: Watered Ale (Supply Control) ──────────────────────────────────
  {
    id: 'CHAIN_MI_B_ALE',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Watered Ale',
    text: 'Behind the tavern stall, your inspector tilts a barrel and tastes the contents. River water, mostly. The brewer, a wide woman named Marta, crosses her arms. "The spring is running dry, my lord. A man does what he must." Her kegs supply half the market.',
    options: [
      { text: 'SHUT THE KEGS', effects: { health: 1 } },
      { text: 'TAX IT ANYWAY', effects: { gold: 10, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_B_BREWER', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_B_BREWER', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MI_B_BREWER',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'The Brewer\'s Offer',
    text: 'Marta returns the next day with a proposal. She wants exclusive access to the village\'s spring water — the only reliable source left after the dry season. In exchange, she promises genuine ale at a fair price. You could accept her deal, or put the water supply to public use.',
    options: [
      { text: 'PUBLIC WATER SUPPLY', effects: { gold: -5 } },
      { text: 'EXCLUSIVE CONTRACT', effects: { gold: 8, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_B_FESTIVAL', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_B_FESTIVAL', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MI_B_FESTIVAL',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'farmer',
    title: 'Festival or Enforcement',
    text: 'The village has heard about the clean ale initiative. A local baker proposes a feast to celebrate — a public display of good faith that would restore trust in the market. Alternatively, your guards could enforce stricter standards across all vendors, starting now.',
    options: [
      { text: 'SPONSOR A CLEAN FEAST', effects: { gold: -5, satisfaction: 2 } },
      { text: 'GUARD ENFORCEMENT', effects: { gold: 5, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_B_END_TRUST', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_B_END_QUIET', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MI_B_END_TRUST',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    title: 'Trust Built',
    text: 'The feast was a success. Marta\'s genuine ale flowed freely, the baker\'s bread fed every stall-keeper, and the market has not been so lively in years. Your people see a lord who invests in them — and they remember it.',
    options: [
      { text: 'CELEBRATE WITH THEM', effects: { gold: 5, satisfaction: 2 } },
      { text: 'INVEST IN THE WELLS', effects: { gold: -5, health: 2 } },
    ],
  },
  {
    id: 'CHAIN_MI_B_END_QUIET',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    title: 'Quiet Profits',
    text: 'The enforcement crackdown has silenced complaints. Stall-keepers now operate under tight watch, knowing any infraction costs them their license. The market is orderly, a little fearful — and profitable. Fines and fees fill the ledger.',
    options: [
      { text: 'COLLECT QUIETLY', effects: { gold: 10, satisfaction: -2 } },
      { text: 'ANNOUNCE THE RESULTS', effects: { gold: 5, satisfaction: 1 } },
    ],
  },

  // ─── PATH C: Thieves (Handler Ring) ────────────────────────────────────────
  {
    id: 'CHAIN_MI_C_THIEVES',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'bandit',
    title: 'Cutpurses in the Crowd',
    text: 'Three pickpockets are caught red-handed within minutes. Your guard captain notes the pattern — they are working in coordinated shifts, targeting the busiest stalls. This is not opportunism. These are trained operatives with someone directing them.',
    options: [
      { text: 'PUBLIC PUNISHMENT', effects: { satisfaction: 1 } },
      { text: 'QUIET WARNING', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_C_HANDLER', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_C_HANDLER', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MI_C_HANDLER',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'bandit',
    title: 'The Handler Revealed',
    text: 'One of the captives breaks under questioning. There is a handler — a man called Gregor — who runs the pickpocket ring from a rented room near the east gate. He controls at least a dozen operatives across the march. You can put these thieves to work as informants to catch Gregor, or make a public example of them to deter the others.',
    options: [
      {
        text: 'PUT THEM TO WORK',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 20,
          followUpBoosts: [
            {
              targetRequestId: 'CHAIN_MI_C_STING',
              boostType: 'linear',
              boostValue: 3,
              description: 'Increases chance of sting operation',
            },
          ],
        },
      },
      { text: 'MAKE AN EXAMPLE', effects: { gold: 5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [
          { requestId: 'CHAIN_MI_C_STING', weight: 1 },
          { requestId: 'CHAIN_MI_C_LOCKDOWN', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_C_LOCKDOWN', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MI_C_STING',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'bandit',
    title: 'The Handler\'s Ambush',
    text: 'Your informants have led Gregor into a trap in the warehouse quarter. But Gregor was not alone — his enforcers are waiting in the alleys. Your guard captain has a choice: spring the trap now and take the fight to them, or pull your people back before blood is spilled.',
    combat: {
      enemyForces: 5,
      prepDelayMinTicks: 0,
      prepDelayMaxTicks: 0,
      onWin: { gold: 15 },
      onLose: { landForces: -2 },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_MI_C_END_CAPTURE', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_MI_C_END_ROUT', weight: 1 }],
        },
      ],
    },
    options: [
      { text: 'SPRING THE TRAP', effects: {} },
      { text: 'BACK OFF', effects: { satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_C_END_RETREAT', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MI_C_LOCKDOWN',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'guard',
    title: 'The District Lockdown',
    text: 'With Gregor still at large, the east quarter is a liability. Your captain proposes sealing the district and interrogating every resident — slow and costly, but thorough. Alternatively, you could send a quiet message through back channels offering Gregor safe passage out of the march.',
    options: [
      { text: 'SEAL THE DISTRICT', effects: { gold: 5, satisfaction: -2 } },
      { text: 'NEGOTIATE QUIETLY', effects: { satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_C_END_LOCKDOWN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_C_END_LOCKDOWN', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MI_C_END_CAPTURE',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    title: 'Gregor in Chains',
    text: 'Gregor and his enforcers are captured. His strongbox yields seized coin, stolen jewelry, and ledgers naming contacts in two neighboring marches. Your advisor suggests the seizure be auctioned openly, or shared with the guards as a reward for their bravery.',
    options: [
      { text: 'AUCTION THE GOODS', effects: { gold: 5, satisfaction: 1 } },
      { text: 'SHARE WITH THE GUARDS', effects: { gold: -3, satisfaction: 3 } },
    ],
  },
  {
    id: 'CHAIN_MI_C_END_ROUT',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    title: 'Bloodied and Bruised',
    text: 'The trap turned. Gregor\'s enforcers outnumbered your guards in the alleys, and several men were badly hurt. Gregor escaped into the night. The market grows quieter — vendors are afraid, and so are your guards.',
    options: [
      { text: 'TEND TO THE WOUNDED', effects: { gold: -5, health: 2 } },
      { text: 'REORGANIZE THE WATCH', effects: { authority: 1, satisfaction: -1 } },
    ],
  },
  {
    id: 'CHAIN_MI_C_END_RETREAT',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    title: 'Gregor Slips Away',
    text: 'The order to stand down was the right call — your guards were outnumbered. But Gregor has vanished, and the ring continues to operate. Your bailiff counts the losses: a few purses, some pride. The market will recover, even if the handler does not.',
    options: [
      { text: 'RESUME PATROLS', effects: { gold: 3, satisfaction: 1 } },
      { text: 'HIRE INFORMANTS', effects: { gold: -5, authority: 1 } },
    ],
  },
  {
    id: 'CHAIN_MI_C_END_LOCKDOWN',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    title: 'The Handler Gone',
    text: 'Gregor is gone — either fled or warned off. The district lockdown turned up petty contraband and a few debtors, but no mastermind. Still, the market has been swept clean. Fines and confiscations fill part of the gap in the treasury.',
    options: [
      { text: 'TIGHTEN SECURITY', effects: { gold: 3, satisfaction: -1 } },
      { text: 'REWARD INFORMANTS', effects: { gold: -5, satisfaction: 2 } },
    ],
  },

  // ─── PATH D: Smugglers (Shadow Trade) ──────────────────────────────────────
  {
    id: 'CHAIN_MI_D_SMUGGLERS',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'trader',
    title: 'Goods Under Cloth',
    text: 'Behind a line of legitimate stalls, your inspector finds crates of untaxed silk, undeclared salt, and foreign coin. A nervous young trader insists he is "just moving goods for a friend." The quantities suggest an organized operation with outside backing.',
    options: [
      { text: 'LEGALIZE WITH PERMIT', effects: { gold: 5 } },
      { text: 'SEIZE THE GOODS', effects: { gold: 10, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_D_ESCORT', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_D_ESCORT', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MI_D_ESCORT',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'bandit',
    title: 'The Convoy\'s Handler',
    text: 'By nightfall, a hard-faced man with six armed riders arrives at the gate. He is the convoy\'s handler — and he is willing to discuss "business arrangements." He offers a substantial sum for your silence and continued access. You can refuse and prepare an intercept, or take the coin.',
    options: [
      { text: 'REFUSE THE BRIBE', effects: {} },
      { text: 'ACCEPT THE BRIBE', effects: { gold: 10, satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_D_CONFRONTATION', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_D_END_UNDERGROUND', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MI_D_CONFRONTATION',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    title: 'The Convoy Intercept',
    text: 'Your military advisor has tracked the convoy to the north road. Seven armed riders escort three wagons of contraband. You can intercept them by force — a real fight with real risk — or register the operation as a licensed night trade, collecting fees instead of blood.',
    combat: {
      enemyForces: 7,
      prepDelayMinTicks: 2,
      prepDelayMaxTicks: 4,
      onWin: { gold: 20 },
      onLose: { landForces: -3, satisfaction: -2 },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_MI_D_END_CONTROLLED', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_MI_D_END_ROUT', weight: 1 }],
        },
      ],
    },
    options: [
      { text: 'INTERCEPT THE CONVOY', effects: {} },
      { text: 'REGISTER NIGHT TRADE', effects: { gold: 8 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_D_END_UNDERGROUND', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MI_D_END_CONTROLLED',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    title: 'Controlled Flow',
    text: 'The convoy is seized and the handler arrested. The contraband is catalogued, the riders imprisoned, and the operation dismantled. Your village controls the trade route now — and word will travel that your borders are not for sale.',
    options: [
      { text: 'CELEBRATE THE BUST', effects: { gold: 5, satisfaction: 1 } },
      { text: 'REFORM TRADE LAWS', effects: { gold: -5, authority: 2 } },
    ],
  },
  {
    id: 'CHAIN_MI_D_END_ROUT',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    title: 'The Convoy Escapes',
    text: 'The escort put up fierce resistance. Your soldiers were driven back with injuries, and the convoy vanished into the forest. The contraband is gone. Your advisor is grave: "We underestimated their numbers, my lord. This will need careful handling."',
    options: [
      { text: 'TEND TO THE WOUNDED', effects: { gold: -5, health: 2 } },
      { text: 'CUT LOSSES', effects: { satisfaction: -2, authority: -1 } },
    ],
  },
  {
    id: 'CHAIN_MI_D_END_UNDERGROUND',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Underground Shift',
    text: 'The trade arrangement continues below the surface. Goods move quietly through side roads, and your treasury grows with each shipment. The people do not ask where the coin comes from — only that the market stays well supplied.',
    options: [
      { text: 'EXPAND THE ARRANGEMENT', effects: { gold: 10, satisfaction: -2 } },
      { text: 'FORMALIZE THE TRADE', effects: { gold: 5, satisfaction: 1 } },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════
  //  BUILDING EVENT CHAINS (6 chains × 3 events = 18 events)
  // ══════════════════════════════════════════════════════════════════════

  // ── Marketplace Core Chain ────────────────────────────────────────────

  {
    id: 'CHAIN_MARKETPLACE_CORE_START',
    chainId: 'marketplace_core',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['building:marketplace'],
    portraitId: 'merchant',
    title: 'Stall Dispute',
    text: 'Two prominent merchants nearly come to blows over the prime stall location at the market square. Their apprentices have drawn lines in the dirt, and other traders are choosing sides. If left unchecked, this petty quarrel could disrupt all trade.',
    options: [
      { text: 'ASSIGN STALLS BY LOTTERY', effects: { satisfaction: 1, gold: -2 } },
      { text: 'AWARD BY SENIORITY', effects: { authority: 1, satisfaction: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MARKETPLACE_CORE_QUARREL', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MARKETPLACE_CORE_QUARREL', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_MARKETPLACE_CORE_QUARREL',
    chainId: 'marketplace_core',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Guild Politics',
    text: 'The stall dispute has escalated into a guild matter. The merchant guild demands the right to self-govern market affairs, challenging your authority over trade regulation. Refusing could spark a boycott, but yielding sets a dangerous precedent.',
    options: [
      { text: 'ALLOW GUILD OVERSIGHT', effects: { gold: 3, authority: -2 } },
      { text: 'REASSERT YOUR AUTHORITY', effects: { authority: 2, gold: -3 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MARKETPLACE_CORE_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MARKETPLACE_CORE_END', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_MARKETPLACE_CORE_END',
    chainId: 'marketplace_core',
    chainRole: 'end',
    chainRestartCooldownTicks: 50,
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Market Resolution',
    text: 'The dust settles on the marketplace conflict. The merchants present two proposals: a formal charter granting them limited self-governance, or a renewed oath of fealty to your direct rule. Either way, trade must resume.',
    options: [
      { text: 'SIGN THE CHARTER', effects: { gold: 4, authority: -1, satisfaction: 2 } },
      { text: 'DEMAND THE OATH', effects: { authority: 3, gold: -2, satisfaction: -1 } },
    ],
  },

  // ── Tavern Core Chain ─────────────────────────────────────────────────

  {
    id: 'CHAIN_TAVERN_CORE_START',
    chainId: 'tavern_core',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['building:tavern'],
    portraitId: 'bard',
    title: 'Whispers at the Tavern',
    text: 'The tavern bard pulls you aside after his set, voice low. He has overheard a group of hooded strangers arranging a secret meeting in the back room tonight. Their coin purses are heavy, and their accents foreign.',
    options: [
      { text: 'EAVESDROP ON THE MEETING', effects: { authority: 1, satisfaction: -1 } },
      { text: 'CONFRONT THEM DIRECTLY', effects: { authority: -1, landForces: 1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_TAVERN_CORE_INTRIGUE', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_TAVERN_CORE_INTRIGUE', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_TAVERN_CORE_INTRIGUE',
    chainId: 'tavern_core',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'bard',
    title: 'The Mysterious Stranger',
    text: 'The strangers\' leader reveals himself — a displaced noble from a neighboring realm, seeking allies for a claim to his lost lands. He offers generous payment for your village\'s support, but entangling in foreign politics is risky business.',
    options: [
      { text: 'HEAR HIS PROPOSAL', effects: { gold: 3, satisfaction: -1 } },
      { text: 'SEND HIM AWAY', effects: { satisfaction: 1, gold: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_TAVERN_CORE_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_TAVERN_CORE_END', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_TAVERN_CORE_END',
    chainId: 'tavern_core',
    chainRole: 'end',
    chainRestartCooldownTicks: 55,
    canTriggerRandomly: false,
    portraitId: 'bard',
    title: 'The Truth Revealed',
    text: 'The bard\'s investigation uncovers the full truth: the stranger\'s cause is genuine but his enemies are powerful. Supporting him could bring wealth or ruin. The tavern patrons wait with bated breath for your final word.',
    options: [
      { text: 'PLEDGE SUPPORT', effects: { gold: 5, landForces: -2, authority: 1 } },
      { text: 'REMAIN NEUTRAL', effects: { satisfaction: 2, gold: -2 } },
    ],
  },

  // ── Garrison Core Chain ───────────────────────────────────────────────

  {
    id: 'CHAIN_GARRISON_CORE_START',
    chainId: 'garrison_core',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['building:garrison'],
    portraitId: 'guard',
    title: 'Guard Demands',
    text: 'The garrison guards line up before you, their sergeant at the front. They demand better equipment — proper steel instead of rusted hand-me-downs. Morale is low and desertions loom if their plea goes unanswered.',
    options: [
      { text: 'FUND NEW EQUIPMENT', effects: { gold: -5, landForces: 3 } },
      { text: 'DENY THE REQUEST', effects: { gold: 2, landForces: -2 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_GARRISON_CORE_TENSION', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_GARRISON_CORE_TENSION', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_GARRISON_CORE_TENSION',
    chainId: 'garrison_core',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'guard',
    title: 'Discipline Erodes',
    text: 'Tension festers in the barracks. Two guards were caught brawling over rations, and the night watch has grown lax. The sergeant warns that without intervention, the garrison could become more threat than protection.',
    options: [
      { text: 'ENFORCE STRICT DISCIPLINE', effects: { authority: 2, satisfaction: -2 } },
      { text: 'OFFER BETTER CONDITIONS', effects: { gold: -3, satisfaction: 2 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_GARRISON_CORE_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_GARRISON_CORE_END', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_GARRISON_CORE_END',
    chainId: 'garrison_core',
    chainRole: 'end',
    chainRestartCooldownTicks: 55,
    canTriggerRandomly: false,
    portraitId: 'guard',
    title: 'Order Restored',
    text: 'The garrison crisis comes to a head. The sergeant proposes either a formal military code with harsh punishments, or a soldier\'s council that gives the guards a voice. The choice will define the garrison\'s character for seasons to come.',
    options: [
      { text: 'ESTABLISH THE CODE', effects: { authority: 3, landForces: 2, satisfaction: -2 } },
      { text: 'FORM THE COUNCIL', effects: { satisfaction: 3, landForces: 1, authority: -2 } },
    ],
  },

  // ── Training Yard Core Chain ──────────────────────────────────────────

  {
    id: 'CHAIN_TRAINING_CORE_START',
    chainId: 'training_yard_core',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['building:training_yard'],
    portraitId: 'military_advisor',
    title: 'Training Accident',
    text: 'A recruit collapses during drills, badly injured by a blunted training sword that proved sharper than expected. The other recruits are shaken, and whispers of sabotage spread through the ranks.',
    options: [
      { text: 'INVESTIGATE IMMEDIATELY', effects: { authority: 1, gold: -2 } },
      { text: 'CALL IT AN ACCIDENT', effects: { satisfaction: -1, gold: 1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_TRAINING_CORE_INVESTIGATION', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_TRAINING_CORE_INVESTIGATION', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_TRAINING_CORE_INVESTIGATION',
    chainId: 'training_yard_core',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    title: 'The Investigation',
    text: 'Your inquiry reveals the training equipment has been poorly maintained — or perhaps tampered with. A disgruntled former recruit with a grudge is the prime suspect, but the drill master also bears responsibility for lax oversight.',
    options: [
      { text: 'ARREST THE SUSPECT', effects: { authority: 2, satisfaction: -1 } },
      { text: 'REFORM TRAINING PRACTICES', effects: { gold: -3, health: 1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_TRAINING_CORE_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_TRAINING_CORE_END', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_TRAINING_CORE_END',
    chainId: 'training_yard_core',
    chainRole: 'end',
    chainRestartCooldownTicks: 60,
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    title: 'Reforms and Consequences',
    text: 'The training yard incident concludes. The military advisor presents options: invest in proper armorer oversight and safer equipment, or push harder training despite the risks to build a stronger fighting force.',
    options: [
      { text: 'INVEST IN SAFETY', effects: { gold: -4, health: 2, satisfaction: 1 } },
      { text: 'INTENSIFY TRAINING', effects: { landForces: 3, health: -2, satisfaction: -1 } },
    ],
  },

  // ── Shrine Core Chain ─────────────────────────────────────────────────

  {
    id: 'CHAIN_SHRINE_CORE_START',
    chainId: 'shrine_core',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['building:shrine'],
    portraitId: 'village_priest',
    title: 'The Pilgrim\'s Request',
    text: 'A weary pilgrim arrives at the shrine, claiming to carry a holy relic that must be enshrined here according to an ancient prophecy. The village priest is both awed and suspicious — the relic could be genuine or a clever forgery.',
    options: [
      { text: 'WELCOME THE PILGRIM', effects: { satisfaction: 2, gold: -2 } },
      { text: 'DEMAND PROOF OF AUTHENTICITY', effects: { authority: 1, satisfaction: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_SHRINE_CORE_RITUAL', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_SHRINE_CORE_RITUAL', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_SHRINE_CORE_RITUAL',
    chainId: 'shrine_core',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'village_priest',
    title: 'The Ritual',
    text: 'The village priest insists that a sacred ritual must be performed to test the relic\'s power. The ceremony requires rare incense and a full day of fasting. Some villagers are devout; others grumble about superstition and lost work.',
    options: [
      { text: 'FUND THE RITUAL', effects: { gold: -3, satisfaction: 1 } },
      { text: 'KEEP IT SIMPLE', effects: { gold: -1, authority: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_SHRINE_CORE_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_SHRINE_CORE_END', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_SHRINE_CORE_END',
    chainId: 'shrine_core',
    chainRole: 'end',
    chainRestartCooldownTicks: 55,
    canTriggerRandomly: false,
    portraitId: 'village_priest',
    title: 'Spiritual Outcome',
    text: 'The ritual is complete. Whether miracle or coincidence, a sense of peace settles over the village. The priest interprets the signs and asks whether to enshrine the relic permanently or return it to the pilgrim for safekeeping.',
    options: [
      { text: 'ENSHRINE THE RELIC', effects: { satisfaction: 3, health: 1, gold: -2 } },
      { text: 'RETURN IT TO THE PILGRIM', effects: { gold: 2, satisfaction: -1 } },
    ],
  },

  // ── Healer's House Core Chain ─────────────────────────────────────────

  {
    id: 'CHAIN_HEALERS_CORE_START',
    chainId: 'healers_house_core',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['building:healers_house'],
    portraitId: 'healer',
    title: 'Herb Shortage',
    text: 'The village healer reports with grave concern that critical medicinal herbs have run dangerously low. A blight struck the herb garden, and without fresh supplies, she cannot treat the next outbreak of illness that surely will come.',
    options: [
      { text: 'SEND AN EXPEDITION', effects: { gold: -3, farmers: -1 } },
      { text: 'BUY FROM TRAVELLING MERCHANTS', effects: { gold: -5, satisfaction: 1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_HEALERS_CORE_SEARCH', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_HEALERS_CORE_SEARCH', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_HEALERS_CORE_SEARCH',
    chainId: 'healers_house_core',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'healer',
    title: 'Expedition for Ingredients',
    text: 'The search for rare herbs leads deep into the surrounding wilds. The foragers discover a hidden grove rich with medicinal plants, but it lies in territory claimed by a reclusive hermit who demands payment for passage.',
    options: [
      { text: 'PAY THE HERMIT', effects: { gold: -3, health: 2 } },
      { text: 'GATHER BY FORCE', effects: { authority: 1, satisfaction: -2 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_HEALERS_CORE_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_HEALERS_CORE_END', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_HEALERS_CORE_END',
    chainId: 'healers_house_core',
    chainRole: 'end',
    chainRestartCooldownTicks: 50,
    canTriggerRandomly: false,
    portraitId: 'healer',
    title: 'The Medicine\'s Fate',
    text: 'The healer works through the night, grinding herbs and brewing tinctures. She presents two approaches: a potent but risky elixir that could cure much but harm some, or a gentler remedy that is safe but treats fewer ailments.',
    options: [
      { text: 'BREW THE POTENT ELIXIR', effects: { health: 4, satisfaction: -1, gold: -2 } },
      { text: 'PREPARE THE GENTLE REMEDY', effects: { health: 2, satisfaction: 2, gold: -1 } },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════
  //  STANDALONE BUILDING EVENTS (12 events)
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'EVENT_MARKET_BOOM',
    title: 'Market Boom',
    text: 'A caravan of foreign traders has arrived, drawn by the reputation of your marketplace. They bring exotic goods and generous coin, eager to establish long-term trade routes through your village.',
    canTriggerRandomly: true,
    requires: ['building:marketplace'],
    portraitId: 'merchant',
    options: [
      { text: 'WELCOME THEM WARMLY', effects: { gold: 5, satisfaction: 1, farmers: -1 } },
      { text: 'LEVY AN IMPORT TAX', effects: { gold: 3, authority: 1, satisfaction: -1 } },
    ],
  },
  {
    id: 'EVENT_MARKET_FRAUD',
    title: 'Market Fraud',
    text: 'A cunning swindler has been selling counterfeit goods at the market — fake remedies and watered-down ale. Several villagers fell ill, and trust in the marketplace is shaken.',
    canTriggerRandomly: true,
    requires: ['building:marketplace'],
    portraitId: 'merchant',
    options: [
      { text: 'HUNT DOWN THE SWINDLER', effects: { gold: -2, authority: 2, satisfaction: 1 } },
      { text: 'TIGHTEN MARKET REGULATIONS', effects: { gold: -3, satisfaction: -1, health: 1 } },
    ],
  },
  {
    id: 'EVENT_TAVERN_CELEBRATION',
    title: 'Tavern Celebration',
    text: 'A spontaneous festival erupts at the tavern after a bountiful harvest. The bard leads the villagers in song and dance, and for one glorious evening the troubles of the world feel far away.',
    canTriggerRandomly: true,
    requires: ['building:tavern'],
    portraitId: 'bard',
    options: [
      { text: 'JOIN THE FESTIVITIES', effects: { satisfaction: 3, gold: -2, authority: -1 } },
      { text: 'PROVIDE FREE DRINKS', effects: { satisfaction: 2, gold: -4, health: -1 } },
    ],
  },
  {
    id: 'EVENT_TAVERN_BRAWL',
    title: 'Tavern Brawl',
    text: 'A violent brawl erupts between farmers and off-duty guards at the tavern. Tables are smashed, teeth are lost, and the tavernkeeper begs for your intervention before someone is killed.',
    canTriggerRandomly: true,
    requires: ['building:tavern'],
    portraitId: 'guard',
    options: [
      { text: 'SEND IN THE GUARDS', effects: { authority: 2, satisfaction: -2, landForces: -1 } },
      { text: 'LET THEM SETTLE IT', effects: { satisfaction: -1, health: -1 } },
    ],
  },
  {
    id: 'EVENT_GARRISON_PATROL',
    title: 'Successful Patrol',
    text: 'The garrison patrol returns with good news — they intercepted a bandit scouting party at the village borders. The bandits fled at the sight of your well-armed guards, and a cache of stolen goods was recovered.',
    canTriggerRandomly: true,
    requires: ['building:garrison'],
    portraitId: 'guard',
    options: [
      { text: 'DISTRIBUTE THE GOODS', effects: { gold: 3, satisfaction: 2, authority: -1 } },
      { text: 'STOCK THE GARRISON ARMORY', effects: { landForces: 2, gold: 2, satisfaction: -1 } },
    ],
  },
  {
    id: 'EVENT_GARRISON_DEMANDS',
    title: 'Garrison Overreach',
    text: 'The garrison captain demands the right to levy a "security tax" on merchants entering the village. He argues the guards deserve better pay, but the merchants see it as nothing more than a shakedown.',
    canTriggerRandomly: true,
    requires: ['building:garrison'],
    portraitId: 'military_advisor',
    options: [
      { text: 'APPROVE THE TAX', effects: { gold: 3, landForces: 1, satisfaction: -3 } },
      { text: 'DENY THE REQUEST', effects: { satisfaction: 1, landForces: -2, authority: 1 } },
    ],
  },
  {
    id: 'EVENT_TRAINING_EXCELLENCE',
    title: 'Training Excellence',
    text: 'A talented recruit has distinguished herself in the training yard, besting every opponent and mastering sword and bow alike. Her prowess inspires the other recruits, and the drill master beams with pride.',
    canTriggerRandomly: true,
    requires: ['building:training_yard'],
    portraitId: 'military_advisor',
    options: [
      { text: 'PROMOTE HER TO SERGEANT', effects: { landForces: 3, satisfaction: 1, gold: -2 } },
      { text: 'SEND HER TO TRAIN OTHERS', effects: { landForces: 2, farmers: -1, authority: 1 } },
    ],
  },
  {
    id: 'EVENT_TRAINING_INJURY',
    title: 'Training Injury',
    text: 'A training exercise goes wrong when a sparring bout turns too aggressive. A promising recruit suffers a broken arm, and the healer reports the injury could have been far worse. Morale at the training yard has taken a hit.',
    canTriggerRandomly: true,
    requires: ['building:training_yard'],
    portraitId: 'healer',
    options: [
      { text: 'COMPENSATE THE RECRUIT', effects: { gold: -3, satisfaction: 1, health: 1 } },
      { text: 'TOUGHEN THE RULES', effects: { authority: 1, satisfaction: -2, landForces: 1 } },
    ],
  },
  {
    id: 'EVENT_SHRINE_BLESSING',
    title: 'Shrine Blessing',
    text: 'During morning prayers, a shaft of golden light illuminates the shrine\'s altar. The village priest declares it a divine blessing, and villagers flock to the shrine seeking guidance, hope, and healing.',
    canTriggerRandomly: true,
    requires: ['building:shrine'],
    portraitId: 'village_priest',
    options: [
      { text: 'HOLD A PUBLIC CEREMONY', effects: { satisfaction: 3, health: 1, gold: -2 } },
      { text: 'OFFER PRIVATE BLESSINGS', effects: { satisfaction: 1, authority: 2, gold: -1 } },
    ],
  },
  {
    id: 'EVENT_SHRINE_SUPERSTITION',
    title: 'Rising Superstition',
    text: 'Strange omens appear near the shrine — an owl hooting at midday, cracks in the altar stone. Fearful villagers demand elaborate protective rituals, while the priest insists calm reasoning will prevail over superstition.',
    canTriggerRandomly: true,
    requires: ['building:shrine'],
    portraitId: 'village_priest',
    options: [
      { text: 'PERFORM PROTECTIVE RITES', effects: { gold: -3, satisfaction: 2, authority: -1 } },
      { text: 'COUNSEL AGAINST SUPERSTITION', effects: { authority: 2, satisfaction: -2 } },
    ],
  },
  {
    id: 'EVENT_HEALERS_CURE',
    title: 'Miraculous Cure',
    text: 'The village healer discovers a new herbal compound that cures a persistent fever plaguing several families. Word of her skill spreads, and travelers arrive seeking treatment, bringing coin and gratitude.',
    canTriggerRandomly: true,
    requires: ['building:healers_house'],
    portraitId: 'healer',
    options: [
      { text: 'TREAT ALL COMERS', effects: { health: 3, satisfaction: 2, gold: -2 } },
      { text: 'CHARGE FOR TREATMENT', effects: { gold: 4, health: 1, satisfaction: -1 } },
    ],
  },
  {
    id: 'EVENT_HEALERS_SHORTAGE',
    title: 'Medicine Shortage',
    text: 'The healer\'s stores of bandages and poultices are nearly exhausted after treating a string of injuries from fieldwork. Without resupply, the next illness or accident could prove far more dangerous.',
    canTriggerRandomly: true,
    requires: ['building:healers_house'],
    portraitId: 'healer',
    options: [
      { text: 'FUND EMERGENCY SUPPLIES', effects: { gold: -4, health: 2, satisfaction: 1 } },
      { text: 'RATION REMAINING STORES', effects: { health: -1, satisfaction: -1, gold: 1 } },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════
  //  DISTRICT EVENT CHAINS (6 chains × 3 events = 18 events)
  // ══════════════════════════════════════════════════════════════════════

  // ── Commerce: Guild Pressure Chain ────────────────────────────────────

  {
    id: 'CHAIN_COMMERCE_GUILD_START',
    chainId: 'commerce_guild_pressure',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['district:commerce_complete'],
    portraitId: 'merchant',
    title: 'Guild Leaders Demand Power',
    text: 'The combined merchants of marketplace and tavern have formed a powerful commerce guild. Their leaders arrive at your hall, demanding a seat on the village council and a say in tax policy. Their economic leverage is considerable.',
    options: [
      { text: 'NEGOTIATE TERMS', effects: { gold: 2, authority: -2 } },
      { text: 'REFUSE OUTRIGHT', effects: { authority: 2, gold: -3 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_COMMERCE_GUILD_CONFLICT', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_COMMERCE_GUILD_CONFLICT', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_COMMERCE_GUILD_CONFLICT',
    chainId: 'commerce_guild_pressure',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Trade Boycott',
    text: 'The guild escalates — merchants shutter their stalls and the tavernkeeper locks the doors. A full trade boycott grips the village. Prices soar as supplies dwindle, and villagers grow restless without goods or ale.',
    options: [
      { text: 'MAKE CONCESSIONS', effects: { gold: -2, satisfaction: 2, authority: -2 } },
      { text: 'BREAK THE BOYCOTT BY FORCE', effects: { authority: 3, satisfaction: -3, landForces: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_COMMERCE_GUILD_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_COMMERCE_GUILD_END', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_COMMERCE_GUILD_END',
    chainId: 'commerce_guild_pressure',
    chainRole: 'end',
    chainRestartCooldownTicks: 60,
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Guild Accord',
    text: 'The commerce guild crisis reaches its conclusion. A formal agreement must be drawn — either granting the guild limited self-governance over trade affairs, or firmly establishing your sole authority over all village commerce.',
    options: [
      { text: 'GRANT LIMITED SELF-GOVERNANCE', effects: { gold: 5, satisfaction: 2, authority: -3 } },
      { text: 'ASSERT TOTAL CONTROL', effects: { authority: 4, gold: -2, satisfaction: -2 } },
    ],
  },

  // ── Commerce: Prosperity Chain ────────────────────────────────────────

  {
    id: 'CHAIN_COMMERCE_PROSPER_START',
    chainId: 'commerce_prosperity',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['district:commerce_complete'],
    portraitId: 'trader',
    title: 'Prosperity Wave',
    text: 'A golden age of commerce dawns on your village. The marketplace hums with foreign traders and the tavern overflows with coin-spending travelers. A shrewd investment now could multiply your wealth — or attract unwanted attention.',
    options: [
      { text: 'INVEST IN EXPANSION', effects: { gold: -5, satisfaction: 2 } },
      { text: 'STOCKPILE THE PROFITS', effects: { gold: 4, satisfaction: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_COMMERCE_PROSPER_PEAK', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_COMMERCE_PROSPER_PEAK', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_COMMERCE_PROSPER_PEAK',
    chainId: 'commerce_prosperity',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'trader',
    title: 'Peak Prosperity',
    text: 'Your commerce district reaches its zenith. A wealthy noble offers to establish a permanent trading post, but demands exclusive rights. Meanwhile, a coalition of smaller merchants begs you to keep the market free and open to all.',
    options: [
      { text: 'GRANT EXCLUSIVE RIGHTS', effects: { gold: 6, satisfaction: -3, authority: 1 } },
      { text: 'KEEP THE MARKET FREE', effects: { satisfaction: 3, gold: -1, farmers: 1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_COMMERCE_PROSPER_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_COMMERCE_PROSPER_END', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_COMMERCE_PROSPER_END',
    chainId: 'commerce_prosperity',
    chainRole: 'end',
    chainRestartCooldownTicks: 65,
    canTriggerRandomly: false,
    portraitId: 'trader',
    title: 'Legacy of Wealth',
    text: 'The prosperity wave ebbs, but its legacy remains. The wealth generated has transformed the village, and now you must decide how to invest the surplus — in the people\'s comfort or in fortifications against those who covet your riches.',
    options: [
      { text: 'INVEST IN THE PEOPLE', effects: { satisfaction: 4, health: 1, gold: -3, landForces: -1 } },
      { text: 'FORTIFY THE VILLAGE', effects: { landForces: 3, gold: -2, satisfaction: -1, fireRisk: -1 } },
    ],
  },

  // ── Military: Mobilization Chain ──────────────────────────────────────

  {
    id: 'CHAIN_MILITARY_MOBIL_START',
    chainId: 'military_mobilization',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['district:military_complete'],
    portraitId: 'military_advisor',
    title: 'External Threat',
    text: 'Scouts report a warband gathering beyond the hills, their numbers growing daily. Your military advisor urges full mobilization — the garrison and training yard must work in concert to prepare a defense before the enemy marches.',
    options: [
      { text: 'MOBILIZE IMMEDIATELY', effects: { landForces: 3, gold: -4, farmers: -2 } },
      { text: 'STRENGTHEN DEFENSES ONLY', effects: { gold: -2, landForces: 1, farmers: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_MOBIL_CAMPAIGN', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_MOBIL_CAMPAIGN', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_MILITARY_MOBIL_CAMPAIGN',
    chainId: 'military_mobilization',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    title: 'War Preparations',
    text: 'The village transforms into a war camp. Blacksmiths forge day and night, recruits drill until they drop, and supply wagons roll toward the front. Your advisor offers a final strategic choice before the enemy arrives.',
    options: [
      { text: 'LAUNCH A PREEMPTIVE STRIKE', effects: { landForces: -2, authority: 3, gold: -3 } },
      { text: 'DIG IN AND DEFEND', effects: { landForces: 2, satisfaction: -1, gold: -2 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_MOBIL_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_MOBIL_END', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_MILITARY_MOBIL_END',
    chainId: 'military_mobilization',
    chainRole: 'end',
    chainRestartCooldownTicks: 70,
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    title: 'Campaign Outcome',
    text: 'The threat has passed — for now. Your forces held, though not without cost. The military advisor reports losses and asks how to rebuild: invest in veteran soldiers or recruit fresh blood from the farming population.',
    options: [
      { text: 'REINFORCE WITH VETERANS', effects: { gold: -5, landForces: 4, satisfaction: 1 } },
      { text: 'RECRUIT FROM THE FARMS', effects: { farmers: -3, landForces: 3, gold: -2 } },
    ],
  },

  // ── Military: Politics Chain ──────────────────────────────────────────

  {
    id: 'CHAIN_MILITARY_POLITICS_START',
    chainId: 'military_politics',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['district:military_complete'],
    portraitId: 'guard',
    title: 'The Captain\'s Ambition',
    text: 'The guard captain, emboldened by the military district\'s strength, quietly suggests that military leadership should have more influence over village governance. His loyal soldiers nod in agreement. This smells of a power play.',
    options: [
      { text: 'HEAR HIM OUT', effects: { authority: -1, landForces: 1 } },
      { text: 'SHUT IT DOWN IMMEDIATELY', effects: { authority: 2, landForces: -2 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_POLITICS_SCHEME', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_POLITICS_SCHEME', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_MILITARY_POLITICS_SCHEME',
    chainId: 'military_politics',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'guard',
    title: 'Political Maneuvering',
    text: 'The captain has been making promises to villagers — protection in exchange for political support. Some see him as a strong leader; others fear a military coup. Your spy reports he has allies among the guard, but the common folk remain loyal to you.',
    options: [
      { text: 'OFFER HIM A FORMAL ROLE', effects: { landForces: 2, authority: -2, satisfaction: 1 } },
      { text: 'REASSIGN HIM TO THE FRONTIER', effects: { authority: 2, landForces: -1, satisfaction: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_POLITICS_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_POLITICS_END', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_MILITARY_POLITICS_END',
    chainId: 'military_politics',
    chainRole: 'end',
    chainRestartCooldownTicks: 60,
    canTriggerRandomly: false,
    portraitId: 'guard',
    title: 'Power Resolved',
    text: 'The military-political crisis reaches its climax. The captain stands before you and the assembled village, awaiting judgment. You can either integrate military leadership into governance or reaffirm civilian supremacy once and for all.',
    options: [
      { text: 'CREATE A MILITARY COUNCIL', effects: { landForces: 3, authority: -3, satisfaction: 2 } },
      { text: 'REAFFIRM CIVILIAN RULE', effects: { authority: 4, landForces: -2, satisfaction: -1 } },
    ],
  },

  // ── Faith: Pilgrimage Chain ───────────────────────────────────────────

  {
    id: 'CHAIN_FAITH_PILGRIM_START',
    chainId: 'faith_pilgrimage',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['district:faith_complete'],
    portraitId: 'village_priest',
    title: 'Pilgrims Arrive',
    text: 'Word of your shrine and healer\'s house has spread far. A large procession of pilgrims arrives at the village gates, seeking spiritual guidance and healing. They bring offerings, but their numbers strain your resources.',
    options: [
      { text: 'WELCOME ALL PILGRIMS', effects: { gold: 3, satisfaction: 1, health: -1 } },
      { text: 'LIMIT ENTRY TO THE SICK', effects: { health: 2, satisfaction: -1, gold: 1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_FAITH_PILGRIM_TENSION', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_FAITH_PILGRIM_TENSION', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_FAITH_PILGRIM_TENSION',
    chainId: 'faith_pilgrimage',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'village_priest',
    title: 'Pilgrims Overwhelm',
    text: 'The pilgrim numbers have swelled beyond expectation. They camp outside the village walls, and tensions rise as food and water are shared with outsiders. Some villagers grumble, while the priest insists hospitality is a sacred duty.',
    options: [
      { text: 'SHARE VILLAGE RESOURCES', effects: { satisfaction: -2, health: -1, gold: -2 } },
      { text: 'ASK PILGRIMS TO CONTRIBUTE', effects: { gold: 3, satisfaction: 1, authority: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_FAITH_PILGRIM_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_FAITH_PILGRIM_END', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_FAITH_PILGRIM_END',
    chainId: 'faith_pilgrimage',
    chainRole: 'end',
    chainRestartCooldownTicks: 55,
    canTriggerRandomly: false,
    portraitId: 'village_priest',
    title: 'Pilgrimage Conclusion',
    text: 'The pilgrimage season draws to a close. The priest proposes either establishing your village as an official pilgrimage site — bringing permanent visitors and revenue — or closing the gates to preserve the village\'s quiet way of life.',
    options: [
      { text: 'ESTABLISH PILGRIMAGE SITE', effects: { gold: 5, satisfaction: 2, health: -2, farmers: -1 } },
      { text: 'CLOSE THE GATES', effects: { satisfaction: -1, health: 2, authority: 2 } },
    ],
  },

  // ── Faith: Doctrine Chain ─────────────────────────────────────────────

  {
    id: 'CHAIN_FAITH_DOCTRINE_START',
    chainId: 'faith_doctrine',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['district:faith_complete'],
    portraitId: 'village_priest',
    title: 'Doctrinal Dispute',
    text: 'A visiting scholar challenges the village priest\'s interpretation of sacred texts. The debate draws crowds, and soon the village splits between traditionalists and reformers. Both sides look to you for a ruling.',
    options: [
      { text: 'SUPPORT THE PRIEST', effects: { authority: 2, satisfaction: -1 } },
      { text: 'HEAR THE SCHOLAR', effects: { satisfaction: 1, authority: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_FAITH_DOCTRINE_SCHISM', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_FAITH_DOCTRINE_SCHISM', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_FAITH_DOCTRINE_SCHISM',
    chainId: 'faith_doctrine',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'village_priest',
    title: 'Community Divides',
    text: 'The doctrinal debate has fractured the village. Families refuse to share pews, the healer and priest argue over remedies versus prayer, and threats of a formal schism loom. Reconciliation requires wisdom — or a firm hand.',
    options: [
      { text: 'CALL A COUNCIL OF ELDERS', effects: { gold: -2, satisfaction: 1 } },
      { text: 'IMPOSE A UNIFIED DOCTRINE', effects: { authority: 3, satisfaction: -3 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_FAITH_DOCTRINE_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_FAITH_DOCTRINE_END', weight: 1 }] },
    ],
  },
  {
    id: 'CHAIN_FAITH_DOCTRINE_END',
    chainId: 'faith_doctrine',
    chainRole: 'end',
    chainRestartCooldownTicks: 60,
    canTriggerRandomly: false,
    portraitId: 'village_priest',
    title: 'Faith Restored',
    text: 'The doctrinal crisis reaches its resolution. The village can either embrace a reformed faith that incorporates new ideas alongside tradition, or reaffirm the old ways with renewed vigor. Either path reshapes the spiritual life of your people.',
    options: [
      { text: 'EMBRACE REFORM', effects: { satisfaction: 3, health: 1, authority: -2 } },
      { text: 'REAFFIRM TRADITION', effects: { authority: 3, satisfaction: -1, health: -1 } },
    ],
  },
];

/**
 * Info-Requests for authority system feedback
 */
export const authorityInfoRequests: Request[] = [
  // Feedback events for authority commit scenarios
  {
    id: 'INFO_TRADE_SUCCESS',
    title: 'Negotiation Victory',
    text: 'Your firm negotiating stance paid off. The merchant guild agrees to your terms, and your authority remains intact.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'EXCELLENT', effects: {} }],
  },
  {
    id: 'INFO_TRADE_FAILURE',
    title: 'Negotiation Failure',
    text: 'The merchants walked away from the table, insulted by your overreach. The deal is lost and your reputation damaged.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'ACCEPT DEFEAT', effects: {} }],
  },
  {
    id: 'INFO_RIOT_SUCCESS',
    title: 'Crisis Averted',
    text: 'Your words resonated with the crowd. They disperse peacefully, moved by your leadership and vision.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'WELL DONE', effects: {} }],
  },
  {
    id: 'INFO_RIOT_FAILURE',
    title: 'Riot Erupts',
    text: 'The crowd jeered and threw stones. Violence broke out, and guards had to intervene forcefully. Your authority was not enough.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'REGRET IT', effects: {} }],
  },
  {
    id: 'INFO_JUSTICE_SUCCESS',
    title: 'Justice Served',
    text: 'Both families accept your judgment. Your authority has brought peace and order to the dispute.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'GOOD', effects: {} }],
  },
  {
    id: 'INFO_JUSTICE_FAILURE',
    title: 'Justice Rejected',
    text: 'The families reject your ruling, calling you weak and incompetent. The feud intensifies.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'UNFORTUNATE', effects: {} }],
  },
  {
    id: 'INFO_REFORM_SUCCESS',
    title: 'Reforms Implemented',
    text: 'Despite resistance, your authority prevails. The military is reorganized and strengthened under new leadership.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'PROCEED', effects: {} }],
  },
  {
    id: 'INFO_REFORM_FAILURE',
    title: 'Reforms Rejected',
    text: 'The old guard refuses your changes. Some officers even resign in protest, weakening your forces.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'ACCEPT IT', effects: {} }],
  },
  {
    id: 'INFO_BANDIT_SUCCESS',
    title: 'Bandits Recruited',
    text: 'The bandit chief kneels before you, swearing loyalty. His warriors are now yours to command.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'WELCOME THEM', effects: {} }],
  },
  {
    id: 'INFO_BANDIT_FAILURE',
    title: 'Bandits Betray',
    text: 'The bandits laugh at your offer and raid your settlement. Your weakness has cost you dearly.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'CURSE THEM', effects: {} }],
  },
  {
    id: 'INFO_TAX_SUCCESS',
    title: 'Tax Reform Succeeds',
    text: 'Your authority overcomes the corrupt officials. The new tax system is efficient and fair, filling the coffers.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'CELEBRATE', effects: {} }],
  },
  {
    id: 'INFO_TAX_FAILURE',
    title: 'Tax Reform Fails',
    text: 'The entrenched interests sabotage your reforms. Tax collection collapses into chaos and resentment.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'REGROUP', effects: {} }],
  },
  {
    id: 'INFO_RELIGIOUS_SUCCESS',
    title: 'Unity Achieved',
    text: 'Your decree brings religious harmony. The people unite under your wisdom and authority.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'BLESSED', effects: {} }],
  },
  {
    id: 'INFO_RELIGIOUS_FAILURE',
    title: 'Religious Schism',
    text: 'Your decree inflames the dispute. Families are torn apart, and some flee the settlement in protest.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'DAMAGE DONE', effects: {} }],
  },
  {
    id: 'INFO_BORDER_SUCCESS',
    title: 'Territory Secured',
    text: 'Your claim is recognized. The contested lands are now yours, bringing new farmers and resources.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'EXPAND', effects: {} }],
  },
  {
    id: 'INFO_BORDER_FAILURE',
    title: 'Border War',
    text: 'Your neighbor rejects your claim with force. A brief but bloody skirmish costs you dearly.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'RETREAT', effects: {} }],
  },
  {
    id: 'INFO_CORRUPT_SUCCESS',
    title: 'Corruption Rooted Out',
    text: 'The corrupt official is punished publicly. The recovered funds and restored integrity boost morale.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'JUSTICE', effects: {} }],
  },
  {
    id: 'INFO_CORRUPT_FAILURE',
    title: 'Corruption Persists',
    text: 'The official\'s allies strike back. Your prosecution fails, and the corrupt network retaliates.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'FAILED', effects: {} }],
  },
  {
    id: 'INFO_SUCCESSION_SUCCESS',
    title: 'Succession Secured',
    text: 'Your chosen claimant takes power, grateful for your support. Rich rewards and alliance follow.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'PROFIT', effects: {} }],
  },
  {
    id: 'INFO_SUCCESSION_FAILURE',
    title: 'Succession War',
    text: 'Your candidate loses. The victorious claimant remembers your opposition with hostility.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'COSTLY', effects: {} }],
  },
  {
    id: 'INFO_GUILD_SUCCESS',
    title: 'Guild United',
    text: 'Your choice stands. The favored guild prospers, and trade flourishes under clear leadership.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'PROSPER', effects: {} }],
  },
  {
    id: 'INFO_GUILD_FAILURE',
    title: 'Guild Chaos',
    text: 'Both guilds reject your decision. Trade war erupts, damaging the economy and your standing.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'CHAOS', effects: {} }],
  },
  {
    id: 'INFO_ENVOY_SUCCESS',
    title: 'Equal Partnership',
    text: 'The foreign kingdom accepts your terms. A profitable alliance is formed on equal footing.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'ALLIANCE', effects: {} }],
  },
  {
    id: 'INFO_ENVOY_FAILURE',
    title: 'Diplomatic Insult',
    text: 'The envoy leaves in anger. Your overreach is seen as arrogance, damaging foreign relations.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'ISOLATION', effects: {} }],
  },
  {
    id: 'INFO_LAND_SUCCESS',
    title: 'Land Reform Success',
    text: 'Despite noble resistance, your authority carries the day. Land is redistributed fairly, and the poor rejoice.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'REFORM', effects: {} }],
  },
  {
    id: 'INFO_LAND_FAILURE',
    title: 'Land Reform Disaster',
    text: 'The nobles revolt against your reforms. Chaos ensues as farmers flee and the economy collapses.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'DISASTER', effects: {} }],
  },
  {
    id: 'INFO_TRADITION_SUCCESS',
    title: 'Tradition Abolished',
    text: 'Your authority is sufficient. The harmful tradition ends, and a new era of progress begins.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'PROGRESS', effects: {} }],
  },
  {
    id: 'INFO_TRADITION_FAILURE',
    title: 'Tradition Defended',
    text: 'The people reject your decree. You are branded a heretic, and the tradition continues stronger than ever.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'DEFEATED', effects: {} }],
  },
  {
    id: 'INFO_PIRATE_SUCCESS',
    title: 'Pirates Tamed',
    text: 'The pirates serve you now. River trade is yours to control, bringing gold and security.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'COMMAND', effects: {} }],
  },
  {
    id: 'INFO_PIRATE_FAILURE',
    title: 'Pirates Raid',
    text: 'The pirates scoff at your authority. They raid your docks and escape with your gold.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'LOSSES', effects: {gold: -15,} }],
  },
  {
    id: 'INFO_MARRIAGE_SUCCESS',
    title: 'Marriage Sealed',
    text: 'The alliance is formed on favorable terms. Wealth, troops, and prestige flow from the union.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'ALLIANCE', effects: {} }],
  },
  {
    id: 'INFO_MARRIAGE_FAILURE',
    title: 'Marriage Broken',
    text: 'The family withdraws the offer, insulted by your demands. The alliance opportunity is lost.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'LOST', effects: {} }],
  },
  // Feedback events for LOW authority commit scenarios
  {
    id: 'INFO_LOW_PLEA_SUCCESS',
    title: 'Merchant Impressed',
    text: 'The merchant sees potential in you. "Perhaps you\'re worth investing in after all," he says, handing over coins and words of support.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'GRATEFUL', effects: {} }],
  },
  {
    id: 'INFO_LOW_PLEA_FAILURE',
    title: 'Merchant Dismisses You',
    text: 'The merchant shakes his head. "You lack the standing I need. Come back when you\'re a real leader." He walks away.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'HUMILIATED', effects: {} }],
  },
  {
    id: 'INFO_LOW_GUARD_SUCCESS',
    title: 'Guards Rallied',
    text: 'Your words strike a chord. The guards stand straighter, remembering their oaths. "We\'ll stand with you, lord," their captain declares.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'UNITED', effects: {} }],
  },
  {
    id: 'INFO_LOW_GUARD_FAILURE',
    title: 'Guards Desert',
    text: 'Your speech falls flat. The guards exchange glances and begin walking away. Some leave the settlement entirely.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'ABANDONED', effects: {} }],
  },
  {
    id: 'INFO_LOW_RESPECT_SUCCESS',
    title: 'Respect Earned',
    text: 'The villagers see your determination and courage. Slowly, they begin to believe in you again. You\'ve turned a corner.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'RENEWED', effects: {} }],
  },
  {
    id: 'INFO_LOW_RESPECT_FAILURE',
    title: 'Respect Lost',
    text: 'Your attempt to assert yourself backfires spectacularly. Villagers laugh openly, and some pack their belongings to leave.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'MOCKED', effects: {} }],
  },
  {
    id: 'INFO_LOW_DEBT_SUCCESS',
    title: 'Debt Reduced',
    text: 'Your negotiating skill surprises the creditors. They agree to reduced terms, impressed by your resolve despite your circumstances.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'RELIEVED', effects: {} }],
  },
  {
    id: 'INFO_LOW_DEBT_FAILURE',
    title: 'Debt Enforced',
    text: 'The creditors laugh at your weak position. They seize assets and spread word of your incompetence throughout the region.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'CRUSHED', effects: {} }],
  },
  {
    id: 'INFO_TRAVELER_INVESTIGATED',
    title: 'Investigation Success',
    text: 'Your investigation reveals the traveler is indeed a respected scholar. Your cautious approach is seen as wise leadership.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'VINDICATED', effects: {} }],
  },
  {
    id: 'INFO_TRAVELER_INVESTIGATION_FAILED',
    title: 'Investigation Failed',
    text: 'Your investigation found nothing, but the traveler is offended by your suspicion. Word spreads that you are paranoid and unwelcoming.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'EMBARRASSED', effects: {} }],
  },

  // =========================================================
  // BUILDING REMINDER REQUESTS (6)
  // Tickless, no penalty, single "Understood" option.
  // Scheduled by checkBuildingReminders() when buildings are needed.
  // =========================================================
  {
    id: 'REMINDER_FARMSTEAD',
    title: 'The Bailiff Urges: Housing',
    text: 'Your bailiff steps forward with a worried expression: "My lord, our farmers are living in makeshift camps. The camps are a fire hazard and disease is spreading. We desperately need more farmsteads!"',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'Understood', effects: {} }],
  },
  {
    id: 'REMINDER_MARKETPLACE',
    title: 'The Bailiff Suggests: Marketplace',
    text: 'Your bailiff approaches you respectfully: "My lord, the settlement has grown beyond what informal trade can sustain. A proper marketplace would bring order to commerce and attract new merchants."',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'Understood', effects: {} }],
  },
  {
    id: 'REMINDER_BAKERY',
    title: 'The Bailiff Suggests: Bakery',
    text: 'Your bailiff raises a concern: "My lord, our growing population needs a reliable food supply. A bakery would not only feed our people but draw settlers who seek the comfort of fresh bread."',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'Understood', effects: {} }],
  },
  {
    id: 'REMINDER_BREWERY',
    title: 'The Bailiff Suggests: Brewery',
    text: 'Your bailiff clears his throat: "My lord, the workers toil hard and their morale suffers without proper leisure. A brewery would lift spirits and give them a reason to stay."',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'Understood', effects: {} }],
  },
  {
    id: 'REMINDER_FIREWOOD',
    title: 'The Bailiff Warns: Firewood',
    text: 'Your bailiff speaks with urgency: "My lord, without an organized firewood supply, people are collecting wood haphazardly. The fire risk is growing — one spark could burn down the entire settlement!"',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'Understood', effects: {} }],
  },
  {
    id: 'REMINDER_WELL',
    title: 'The Bailiff Warns: Sanitation',
    text: 'Your bailiff approaches with grave concern: "My lord, the people are drinking from stagnant ponds and muddy streams. Without a proper central well, disease will spread unchecked through our settlement."',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'Understood', effects: {} }],
  },
  // Feedback events for the Market Inspection chain (market_inspection)
  {
    id: 'INFO_MI_TESTIMONY_SUCCESS',
    title: 'Testimony Secured',
    text: 'Under pressure, Aldric breaks. He names his contact — a man called "the Measurer" — and describes the delivery route. Your inspector now has everything needed to trace the network.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'PRESS ON', effects: {} }],
  },
  {
    id: 'INFO_MI_TESTIMONY_FAILURE',
    title: 'Testimony Retracted',
    text: 'Aldric clams up the moment your tone shifts. "I told you what I know," he mutters, staring at the floor. The stallholder will say nothing more — and the crowd that witnessed your outburst now watches you with wary eyes.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'ACCEPT IT', effects: {} }],
  },
];

/**
 * Validates all requests for common data quality issues.
 * This function runs only in development mode.
 * Throws errors if validation fails.
 */
export function validateRequests(): void {
  const allRequests = [...infoRequests, ...authorityInfoRequests, ...eventRequests, ...fireChainRequests];
  const errors: string[] = [];

  // Collect all request IDs
  const requestIds = new Set<string>();
  const duplicateIds: string[] = [];

  for (const request of allRequests) {
    // Check 1: Info and reminder requests must have exactly 1 option, all others must have exactly 2.
    // REPAIRV4 START requests are informational and also have exactly 1 option.
    // FIREV4 START requests must have 2 options — they present an immediate player decision.
    const isSingleOptionRequest =
      request.id.startsWith('INFO_') ||
      request.id.startsWith('REMINDER_') ||
      /^REPAIRV4_S\d+_START$/.test(request.id);
    const expectedOptions = isSingleOptionRequest ? 1 : 2;
    if (request.options.length !== expectedOptions) {
      errors.push(
        `Request "${request.id}" has ${request.options.length} options, expected exactly ${expectedOptions}`
      );
    }

    // Check 2: Request IDs must be unique
    if (requestIds.has(request.id)) {
      duplicateIds.push(request.id);
    }
    requestIds.add(request.id);

    // Check 3: No empty title, text, or option labels
    if (!request.title || request.title.trim() === '') {
      errors.push(`Request "${request.id}" has empty title`);
    }
    if (!request.text || request.text.trim() === '') {
      errors.push(`Request "${request.id}" has empty text`);
    }

    for (let optionIndex = 0; optionIndex < request.options.length; optionIndex++) {
      const option = request.options[optionIndex];
      if (!option.text || option.text.trim() === '') {
        errors.push(
          `Request "${request.id}" option ${optionIndex} has empty text`
        );
      }
    }

    // Note: FollowUp candidate ID validation happens after all IDs are collected
  }

  // Report duplicate IDs
  if (duplicateIds.length > 0) {
    errors.push(
      `Duplicate request IDs found: ${duplicateIds.join(', ')}`
    );
  }

  // Check 4: Validate followUp candidate IDs exist
  for (const request of allRequests) {
    if (request.followUps) {
      for (const followUp of request.followUps) {
        for (const candidate of followUp.candidates) {
          if (!requestIds.has(candidate.requestId)) {
            errors.push(
              `Request "${request.id}" has followUp candidate with non-existent ID: "${candidate.requestId}"`
            );
          }
        }
      }
    }
  }

  // Throw error if any validation failed
  if (errors.length > 0) {
    throw new Error(
      `Request validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`
    );
  }
}

/**
 * Fire Chain Requests V4
 *
 * Ten chain variants are generated for each of the 10 incident slots.
 *
 *   General chains (all building types):
 *     Variant A — "Community Response"
 *     Variant B — "Raging Inferno"
 *     Variant D — "Night Watch Failure"
 *     Variant E — "Wandering Embers"
 *
 *   Building-specific chains:
 *     Variant C — "Farmstead Emergency"   (farmstead only)
 *     Variant F — "Marketplace Blaze"     (marketplace only)
 *     Variant G — "Bakery Oven Disaster"  (bakery only)
 *     Variant H — "Brewery Explosion"     (brewery only)
 *     Variant I — "Firewood Depot Fire"   (firewood only)
 *     Variant J — "Well Fire"             (well only)
 *
 *   Each variant per slot generates 5 requests:
 *     FIREV4_S{n}_{V}_START    (start, 2 options, tickless)    — immediate player decision
 *     FIREV4_S{n}_{V}_STEP1   (member, 2 options, tickless)   — path from option 0
 *     FIREV4_S{n}_{V}_STEP1B  (member, 2 options, tickless)   — path from option 1
 *     FIREV4_S{n}_{V}_END_EXT  (end, 2 options, advances tick) → extinguish the fire
 *     FIREV4_S{n}_{V}_END_DEST (end, 2 options, advances tick) → building destroyed
 *
 * Rules:
 *  - Every fire START request must present an immediate player decision (2 options).
 *    This ensures the player engages meaningfully from the very first moment of a fire.
 *  - Each option in START leads to a distinct STEP (STEP1 or STEP1B).
 *  - Both STEPs offer a path to extinguish (END_EXT) and to destroy (END_DEST).
 *  - Selected risky options carry triggerFireOutbreak effects so that bad decisions
 *    can spread the fire to another building, rewarding player caution.
 */
function generateFireV4ChainRequests(): Request[] {
  const requests: Request[] = [];

  for (let n = 1; n <= 10; n++) {
    // ── VARIANT A: Community Response (all building types) ─────────────────
    // Character: Alderman Gerber — community leader who organises the response
    {
      const v = 'A';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: public alarm vs quiet handling
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'elder',
        title: '🔥 Fire!',
        text: 'Alderman Gerber hammers on your door. "Fire! One of our buildings is ablaze — what are your orders, my lord?"',
        options: [
          { text: 'Ring the alarm — rouse the whole settlement!', effects: { satisfaction: -1 } },
          { text: 'Handle it quietly first — no panic in the streets', effects: {} },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — alarm raised, organised response
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'elder',
        title: '🔥 The Alarm is Raised',
        text: 'Villagers pour into the street. Gerber rallies them. The building is still standing — barely. How should the effort be directed?',
        options: [
          { text: 'Form a bucket brigade under Gerber\'s command', effects: { satisfaction: -2 } },
          { text: 'Sacrifice this building — shield the surrounding ones', effects: { fireRisk: 2, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — quiet attempt, risky
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'elder',
        title: '🔥 A Quiet Struggle',
        text: 'Your household crew fights without alarming the village — but the fire is stronger than expected. Smoke drifts across the rooftops. This will not stay secret.',
        options: [
          { text: 'Sound the alarm now — swallow your pride, call for help', effects: { satisfaction: -5, gold: -10 } },
          { text: 'Let it burn quietly — deny all knowledge of the delay', effects: { authority: -10, triggerFireOutbreak: true, fireOutbreakBypassCap: true } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'elder',
        chainRestartCooldownTicks: 0,
        title: '🔥 Fire Extinguished',
        text: 'The bucket brigade worked through the night. The fire is out and the building stands — battered but intact. Gerber nods approvingly.',
        options: [
          { text: 'Begin repairs', effects: { fireRisk: -5 } },
          { text: 'Invest in fire prevention measures', effects: { fireRisk: -12, gold: -20 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'elder',
        chainRestartCooldownTicks: 0,
        title: '💥 Building Lost to Fire',
        text: 'The building is gone. The surrounding structures were spared, but the loss weighs on the settlement. Gerber stands silently in the ashes.',
        options: [
          { text: 'Clear the rubble', effects: { fireRisk: -3, satisfaction: -3 } },
          { text: 'Leave it for now', effects: { satisfaction: -6 } },
        ],
      });
    }

    // ── VARIANT B: Raging Inferno (all building types) ─────────────────────
    // Character: Captain Bärtraud — a tough, experienced fire captain
    {
      const v = 'B';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: all-out fight vs defensive retreat
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'guard',
        title: '🔥 Raging Fire!',
        text: 'Captain Bärtraud shouts over the roar of flames: "It\'s bad — raging fast! Do we fight it head-on or fall back and protect the perimeter?"',
        options: [
          { text: 'Fight it — throw everything we have at those flames!', effects: { gold: -5 } },
          { text: 'Pull back — protect lives and the perimeter, not property', effects: { satisfaction: -4 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — all-out fight, but losing ground
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'guard',
        title: '🔥 The All-Out Fight',
        text: 'Bärtraud rallies the crew with iron will. The fire is immense, but they are not retreating yet.',
        options: [
          { text: 'Spend more gold — hire emergency help to turn the tide', effects: { gold: -10, satisfaction: 2 } },
          { text: 'It\'s out of control — abandon the fight now!', effects: { satisfaction: -6, triggerFireOutbreak: true, fireOutbreakBypassCap: true } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — defensive line
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'guard',
        title: '🔥 The Defensive Line',
        text: 'Bärtraud holds the perimeter, watching the building burn. "We can establish a controlled fire break," she says grimly, "or cut our losses entirely."',
        options: [
          { text: 'Establish a fire break — controlled, steady', effects: { fireRisk: -8, satisfaction: -2 } },
          { text: 'Cut losses — let the whole area go', effects: { satisfaction: -10, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'guard',
        chainRestartCooldownTicks: 0,
        title: '🔥 Fire Defeated',
        text: 'The crew held the line. The building survived — scorched but standing. Bärtraud wipes soot from her brow. "We\'ve done harder."',
        options: [
          { text: 'Recover and rebuild', effects: { fireRisk: -6 } },
          { text: 'Commission a permanent fire watch', effects: { fireRisk: -15, gold: -25 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'guard',
        chainRestartCooldownTicks: 0,
        title: '💥 Building Destroyed by Fire',
        text: 'The inferno consumed the building. The surrounding structures were spared, but the loss weighs heavily on the people.',
        options: [
          { text: 'Organize salvage crews', effects: { fireRisk: -4, satisfaction: -4 } },
          { text: 'Mourn and move on', effects: { satisfaction: -8 } },
        ],
      });
    }

    // ── VARIANT C: Farmstead Emergency (farmstead only) ────────────────────
    // Character: Hildegard — a farmer's wife, sharp-minded and protective of her family
    {
      const v = 'C';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: save animals vs save grain
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'farmer',
        title: '🔥 Farmstead Ablaze!',
        text: 'Hildegard bursts through your gate: "My Lord — the farmstead is burning! The animals are still in their pens! The grain stores are full!" She looks at you desperately.',
        options: [
          { text: 'Open the pens — save the animals first!', effects: { satisfaction: 2 } },
          { text: 'Get to the grain stores — we need that food for winter!', effects: { gold: 8 } },
        ],
        fireChainAllowedBuildingTypes: ['farmstead'],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — animals rescued path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'farmer',
        title: '🔥 Animals Safe — Now the Fire',
        text: 'The animals stampede to safety. The farmstead still burns. Hildegard: "We got everyone out — can we save the building too?"',
        options: [
          { text: 'Form a bucket chain — fight to save the farmstead!', effects: { satisfaction: -2, fireRisk: -8 } },
          { text: 'Everyone is safe — let the building burn', effects: { farmers: -1, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — grain saved path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'farmer',
        title: '🔥 Grain is Safe — But the Fire Grows',
        text: 'The grain is hauled clear. But while you were busy, the fire spread to the roof timbers. Hildegard: "The building — it\'s still fighting us!"',
        options: [
          { text: 'Now fight the fire — workers to the bucket line!', effects: { gold: 5, satisfaction: -3 } },
          { text: 'Evacuate — the building is too far gone', effects: { satisfaction: -5, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'farmer',
        chainRestartCooldownTicks: 0,
        title: '🔥 Farmstead Saved',
        text: 'The workers held back the flames. The farmstead stands — battered but intact. Hildegard weeps with relief.',
        options: [
          { text: 'Patch the roof and carry on', effects: { fireRisk: -5 } },
          { text: 'Build a stone fire break', effects: { fireRisk: -12, gold: -15 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'farmer',
        chainRestartCooldownTicks: 0,
        title: '💥 Farmstead Destroyed',
        text: 'The farmstead is ash. Hildegard\'s family survived — but their home and harvest are gone. They stand in the ruins, silent.',
        options: [
          { text: 'Distribute emergency provisions', effects: { gold: -10, satisfaction: 3, fireRisk: -3 } },
          { text: 'Appeal for help from neighboring families', effects: { fireRisk: -2, satisfaction: -4 } },
        ],
      });
    }

    // ── VARIANT D: Night Watch Failure (all building types) ─────────────────
    // Character: Rolf — the night watchman who dozed off on duty
    {
      const v = 'D';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: public alarm vs quiet cover-up
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'guard',
        title: '🔥 Dawn Fire',
        text: 'Night watchman Rolf stumbles to your door at dawn, face pale with shame: "I... I think I dozed off. There\'s fire in the settlement. No one else knows yet."',
        options: [
          { text: 'Ring the bell — rouse the whole district immediately!', effects: { satisfaction: -2 } },
          { text: 'Handle it quietly — protect Rolf\'s honor for now', effects: {} },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — public alarm path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'guard',
        title: '🔥 The District Awakes',
        text: 'Villagers pour into the streets in various states of undress. Rolf leads them toward the fire, red-faced with guilt. The crowd is large — but chaotic.',
        options: [
          { text: 'Organize the crowd into brigades — systematic and steady', effects: { satisfaction: -3, fireRisk: -8 } },
          { text: 'Let the panicking crowd do their best — too chaotic to direct now', effects: { satisfaction: -5, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — quiet cover-up path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'guard',
        title: '🔥 Rolf\'s Small Crew',
        text: 'Rolf and your household try to contain it quietly. But the fire is stronger than expected. Smoke drifts across rooftops. Neighbors are beginning to stir.',
        options: [
          { text: 'Swallow pride — raise the alarm now, whatever the cost', effects: { satisfaction: -6, gold: -12 } },
          { text: 'Let it burn quietly — cut Rolf loose as a scapegoat later', effects: { authority: -8, satisfaction: -8, triggerFireOutbreak: true, fireOutbreakBypassCap: true } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'guard',
        chainRestartCooldownTicks: 0,
        title: '🔥 Dawn Fire Contained',
        text: 'The fire is out. The building survived. Now the question of Rolf\'s punishment hangs in the air.',
        options: [
          { text: 'Assign Rolf extra duties — let him earn back trust', effects: { satisfaction: 1, authority: 2 } },
          { text: 'Forgive Rolf — it was an honest mistake', effects: { satisfaction: 3 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'guard',
        chainRestartCooldownTicks: 0,
        title: '💥 Building Lost at Dawn',
        text: 'The building burned while the night watch slept. The people are angry and they know who is to blame.',
        options: [
          { text: 'Dismiss Rolf — make an example of negligence', effects: { authority: 5, satisfaction: -4 } },
          { text: 'Reassign Rolf to daylight duties — waste not', effects: { satisfaction: -2 } },
        ],
      });
    }

    // ── VARIANT E: Wandering Embers (all building types) ───────────────────
    // Character: Elsbeth — a careless cook whose night fire started the blaze
    {
      const v = 'E';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: broad protection of nearby buildings vs focused attack on the fire
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 Embers on the Wind',
        text: 'Elsbeth the cook rushes to you: "I left the night fire too long — sparks flew on the wind and a building has caught! I\'m so sorry, my lord!" Embers still drift in the air.',
        options: [
          { text: 'Spread the crew out — protect all nearby buildings at once!', effects: { gold: -8 } },
          { text: 'Focus everything on the burning building itself', effects: {} },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — broad protection path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 The Perimeter Holds',
        text: 'The crew holds the perimeter — no other buildings have caught. Now the primary fire itself must be dealt with.',
        options: [
          { text: 'Move in now and douse the primary fire — finish it!', effects: { satisfaction: 1, fireRisk: -8 } },
          { text: 'The perimeter held — let the burning building go', effects: { satisfaction: -3, fireRisk: -3 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — focused attack path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 One Fight, One Fire',
        text: 'The crew battles the blaze hard — but embers keep drifting on the wind. Elsbeth shouts: "They\'re landing on the next building!"',
        options: [
          { text: 'Hold the line — pour water until this fire dies', effects: { gold: -10, satisfaction: -2 } },
          { text: 'Embers are spreading — the crew must pull back!', effects: { triggerFireOutbreak: true, fireOutbreakBypassCap: true } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        title: '🔥 Embers Quenched',
        text: 'The fire is out. Elsbeth wrings her hands, waiting for your judgment.',
        options: [
          { text: 'Discipline Elsbeth for her carelessness', effects: { authority: 3, satisfaction: -2 } },
          { text: 'Forgive her — accidents happen, she came forward honestly', effects: { satisfaction: 2 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        title: '💥 Building Lost to Embers',
        text: 'The building is gone. Elsbeth sobs openly. The village knows it was her cook fire that started it.',
        options: [
          { text: 'Fine Elsbeth for the damage — set an example', effects: { gold: 5, satisfaction: -4, authority: 2 } },
          { text: 'Move on without assigning blame', effects: { satisfaction: -3 } },
        ],
      });
    }

    // ── VARIANT F: Marketplace Blaze (marketplace only) ────────────────────
    // Character: Konrad — a self-interested merchant who wants to save his goods
    {
      const v = 'F';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: people first vs bribe Konrad for his trade guards
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'merchant',
        title: '🔥 The Marketplace Burns!',
        text: 'Konrad the merchant grabs your sleeve: "My silks! My spices! You MUST save my stall — or I\'ll pull my trade routes!" Behind him, the marketplace blazes.',
        options: [
          { text: 'Ignore Konrad — clear everyone out, people before goods!', effects: { satisfaction: 3 } },
          { text: 'Pay Konrad now — secure his trade guards to help fight the fire', effects: { gold: -15 } },
        ],
        fireChainAllowedBuildingTypes: ['marketplace'],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — people-first path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'merchant',
        title: '🔥 The Market Square Clears',
        text: 'The buyers and sellers flee. Konrad fumes but the square is clear. Now the market structure itself can be addressed.',
        options: [
          { text: 'Coordinate a firefighting effort — save the structure!', effects: { satisfaction: 2, fireRisk: -8 } },
          { text: 'The stalls are lost — contain the perimeter and hold', effects: { satisfaction: -4 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — Konrad's trade guards path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'merchant',
        title: '🔥 Konrad\'s Guards Respond',
        text: 'Konrad\'s trade guards arrive — well-armed but directing most effort toward saving his goods, not fighting the fire. Konrad smirks.',
        options: [
          { text: 'Override Konrad — make the guards fight the fire, not save goods!', effects: { authority: -5, fireRisk: -10, satisfaction: 1 } },
          { text: 'Let Konrad prioritize his goods — the market structure burns', effects: { gold: 10, satisfaction: -6, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'merchant',
        chainRestartCooldownTicks: 0,
        title: '🔥 Marketplace Saved',
        text: 'The marketplace stands. Trade can resume — though the stalls will need rebuilding. Konrad, grudgingly, tips his hat.',
        options: [
          { text: 'Impose fire-safety regulations on all merchants', effects: { fireRisk: -8, authority: 3, satisfaction: -2 } },
          { text: 'Thank the merchants and traders for their cooperation', effects: { gold: 5, satisfaction: 3 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'merchant',
        chainRestartCooldownTicks: 0,
        title: '💥 Marketplace Destroyed',
        text: 'The marketplace is rubble. Konrad stands pale and furious, tallying his losses. Trade will suffer until it is rebuilt.',
        options: [
          { text: 'Promise Konrad compensation to keep his trade routes open', effects: { gold: -15, satisfaction: 2 } },
          { text: 'Demand Konrad contribute to reconstruction costs', effects: { gold: 10, authority: 5, satisfaction: -4 } },
        ],
      });
    }

    // ── VARIANT G: Bakery Oven Disaster (bakery only) ──────────────────────
    // Character: Master Wendelin — the baker, guilty but knowledgeable about his own building
    {
      const v = 'G';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: force entry without expert vs wait for Wendelin
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 The Bakery is on Fire!',
        text: 'Black smoke pours from the bakery chimney. Master Wendelin the baker is nowhere to be found — but the grease oven is clearly the source. Do you send your crew in blind, or wait for the expert?',
        options: [
          { text: 'Break in now — every second the fire grows!', effects: {} },
          { text: 'Find Wendelin first — he knows that building\'s dangers', effects: { gold: -5 } },
        ],
        fireChainAllowedBuildingTypes: ['bakery'],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — force entry, no expert guidance
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 Inside Without Guidance',
        text: 'Your crew enters the smoke-filled bakery. The grease oven blazes. Someone reaches for a bucket of water...',
        options: [
          { text: 'Stop! Use sand and dirt on the grease fire — careful approach!', effects: { gold: -8, satisfaction: -2 } },
          { text: 'Pour water on everything!', effects: { satisfaction: -3, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — Wendelin arrives with expertise
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 Wendelin Has a Plan',
        text: 'Master Wendelin arrives, face white with guilt. "There\'s a grease valve behind the oven — I can seal the chamber and starve the fire. Give me two minutes."',
        options: [
          { text: 'Trust Wendelin — let him seal the chamber!', effects: { fireRisk: -10, satisfaction: 2 } },
          { text: 'No time — drag Wendelin out before it collapses!', effects: { satisfaction: -3 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        title: '🔥 Bakery Saved',
        text: 'The fire is out. The bakery stands. Wendelin — singed but alive — bows his head in shame and relief.',
        options: [
          { text: 'Order Wendelin to install proper fire guards on his ovens', effects: { fireRisk: -8, authority: 2 } },
          { text: 'Gift Wendelin a commendation — his knowledge saved the day', effects: { satisfaction: 4, gold: -5 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        title: '💥 Bakery Destroyed',
        text: 'The bakery is gone. Wendelin stands in the ashes, wringing his apron. The village will miss the bread.',
        options: [
          { text: 'Hold Wendelin responsible — fine him for the loss', effects: { gold: 8, authority: 3, satisfaction: -3 } },
          { text: 'Take pity on Wendelin — let him rebuild at his own pace', effects: { satisfaction: 2, fireRisk: -3 } },
        ],
      });
    }

    // ── VARIANT H: Brewery Explosion (brewery only) ────────────────────────
    // Character: Braumeister Kaspar — a bold brewmaster whose barrels are exploding
    {
      const v = 'H';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: send teams to move barrels vs hold the perimeter
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 The Brewery Erupts!',
        text: 'A series of muffled BOOMS shakes the village. Braumeister Kaspar appears, soot-covered: "Fermentation barrels — they\'re going off one by one! More will blow. Do we risk going in to move them, or hold outside?"',
        options: [
          { text: 'Risk it — send teams to move the remaining barrels!', effects: { satisfaction: 2 } },
          { text: 'Hold the perimeter — let the barrels safely detonate', effects: {} },
        ],
        fireChainAllowedBuildingTypes: ['brewery'],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — brave barrel-moving attempt
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 Desperate Barrel Run',
        text: 'Teams plunge into the heat. Some barrels are dragged clear. Kaspar shouts: "Use them as a fire break!" But another barrel teeters near the flames.',
        options: [
          { text: 'Kaspar\'s plan — use the barrels as a fire break, crush the fire line!', effects: { gold: -15, satisfaction: 3 } },
          { text: 'Too dangerous — fall back immediately, leave the rest!', effects: { satisfaction: -2, triggerFireOutbreak: true, fireOutbreakBypassCap: true } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — controlled detonation wait
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 Controlled Detonation',
        text: 'Kaspar counts the blasts from a safe distance. "Five... three... one." Silence. "Last barrel. Now — move in before the fire finds new fuel."',
        options: [
          { text: 'Move in and extinguish the remaining fire — controlled and steady', effects: { fireRisk: -12, satisfaction: 1 } },
          { text: 'The structure is too damaged — let it burn out safely', effects: { satisfaction: -5, gold: 5 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        title: '🔥 Brewery Saved',
        text: 'The brewery stands. Kaspar grins through soot: "First round\'s on me. Or it would be, if the barrels hadn\'t gone off."',
        options: [
          { text: 'Commission explosion-proof barrel storage for the future', effects: { fireRisk: -10, gold: -20 } },
          { text: 'Celebrate — the brewery lives to brew another day!', effects: { satisfaction: 5, gold: -5 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        title: '💥 Brewery Destroyed',
        text: 'The brewery is gone. Kaspar stands in the ruins, nudging a scorched barrel with his boot. The village mourns — in more ways than one.',
        options: [
          { text: 'Help Kaspar source materials to rebuild quickly', effects: { gold: -10, satisfaction: 3 } },
          { text: 'Let Kaspar rebuild at his own pace and expense', effects: { satisfaction: -4, gold: 5 } },
        ],
      });
    }

    // ── VARIANT I: Firewood Depot Fire (firewood only) ─────────────────────
    // Character: Holzmann — the no-nonsense firewood foreman
    {
      const v = 'I';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: defend the depot vs scatter the wood piles
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 The Firewood Stores Burn!',
        text: 'Holzmann the foreman barks: "The firewood depot is ablaze! If we lose those stores, every hearth goes cold before winter. But fighting a wood fire this size is brutal — the whole pile could go up!"',
        options: [
          { text: 'Defend the depot — fight to save what we can!', effects: {} },
          { text: 'Scatter the wood piles now — stop the fire spreading through the stores!', effects: { satisfaction: -2 } },
        ],
        fireChainAllowedBuildingTypes: ['firewood'],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — defend path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 Holding the Line at the Depot',
        text: 'Workers throw sand and swing shovels. The heat is punishing. Holzmann shouts over the roar: "We can hold it — but not for long!"',
        options: [
          { text: 'Hold the line — sand and buckets, systematic!', effects: { fireRisk: -10, satisfaction: -2 } },
          { text: 'Too dangerous — pull everyone back before it explodes!', effects: { fireRisk: 8, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — scatter path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 Embers Fly Across the Yard',
        text: 'Workers scatter the piles — the main depot fire slows. But burning fragments arc across the yard. Holzmann: "The embers are going wide!"',
        options: [
          { text: 'Chase the embers — protect surrounding buildings!', effects: { satisfaction: -3, fireRisk: -5 } },
          { text: 'The embers are beyond control — evacuate!', effects: { triggerFireOutbreak: true, fireOutbreakBypassCap: true, fireRisk: 5 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        title: '🔥 Firewood Depot Saved',
        text: 'The depot is singed but standing. Holzmann counts the surviving stacks grimly. "Could\'ve been worse."',
        options: [
          { text: 'Reorganize the storage to be safer in future', effects: { fireRisk: -8, gold: -10 } },
          { text: 'Sell some extra firewood to recover costs', effects: { gold: 10, satisfaction: 1 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        title: '💥 Firewood Depot Destroyed',
        text: 'The depot is ash. Every hearth in the village will feel the cold this winter. Holzmann stares at the sky, jaw set.',
        options: [
          { text: 'Emergency purchase of firewood from traveling traders', effects: { gold: -20, fireRisk: -5 } },
          { text: 'Send workers to collect wood from the forest — it will take time', effects: { fireRisk: 3, satisfaction: -4 } },
        ],
      });
    }

    // ── VARIANT J: Well Fire (well only) ────────────────────────────────────
    // Character: Brunnenmeister Ilse — the well keeper, calm under pressure
    {
      const v = 'J';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: protect the well vs use it immediately
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'elder',
        title: '🔥 Fire at the Well!',
        text: 'Brunnenmeister Ilse runs to you: "Fire near the well-house! If the wooden structure burns, the water will be fouled for weeks — but we need that water to fight the very fire in front of us! What do we do?"',
        options: [
          { text: 'Protect the well-house first — without clean water, we lose everything!', effects: {} },
          { text: 'Draw water from the well now — use it to fight the fire immediately!', effects: { health: -1 } },
        ],
        fireChainAllowedBuildingTypes: ['well'],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — protect well path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'elder',
        title: '🔥 Ilse Defends the Well',
        text: 'Ilse leads a team to wet down the well-house and build a firebreak. The nearby fire grows briefly hotter — but the well is protected. Now the fire itself must be faced.',
        options: [
          { text: 'Hold the line — protect both well and building!', effects: { health: 2, fireRisk: -10 } },
          { text: 'The building is already lost — but the well survived. Enough.', effects: { health: 3, satisfaction: -4 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — use well water path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'elder',
        title: '🔥 Water from the Well',
        text: 'Buckets fly from the well in a desperate rhythm. Ilse warns: "I can already smell smoke in the water. We are fouling our own supply. How far do we push this?"',
        options: [
          { text: 'Stop drawing before full contamination — switch to dirt and sand', effects: { health: -2, fireRisk: -6 } },
          { text: 'Keep drawing — the fire must be stopped at any cost!', effects: { health: -5, satisfaction: -3 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'elder',
        chainRestartCooldownTicks: 0,
        title: '🔥 Well Fire Defeated',
        text: 'The fire is out. The well survived — or is at least repairable. Ilse is already inspecting the water for contamination.',
        options: [
          { text: 'Commission a stone roof for the well-house', effects: { fireRisk: -8, gold: -15, health: 1 } },
          { text: 'Thank Ilse — her quick thinking saved the water supply', effects: { satisfaction: 3, health: 1 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'elder',
        chainRestartCooldownTicks: 0,
        title: '💥 Well Structure Damaged',
        text: 'The building is gone and the well is fouled. Ilse kneels at the rim, testing the water with a grim expression.',
        options: [
          { text: 'Rush emergency repairs on the well to restore water quality', effects: { gold: -15, health: 3 } },
          { text: 'Draw water from the river until the well can be repaired', effects: { health: -2, satisfaction: -3 } },
        ],
      });
    }
  }

  return requests;
}

/**
 * Repair Chain Requests V4 (3 requests per slot, 10 slots = 30 requests)
 *
 * For each slot n=1..10:
 *   REPAIRV4_S{n}_START    (start, 1 option, no tick)
 *   REPAIRV4_S{n}_PROGRESS (member, 2 options, no tick)
 *   REPAIRV4_S{n}_END      (end, 2 options, advances tick)
 *     option 0 = Reconstruct → unit becomes functional, slot cleared
 *     option 1 = Leave destroyed → chainActive=false, slot stays assigned
 */
function generateRepairV4ChainRequests(): Request[] {
  const requests: Request[] = [];

  for (let n = 1; n <= 10; n++) {
    const chainId = `REPAIRV4_S${n}`;

    requests.push({
      id: `REPAIRV4_S${n}_START`,
      chainId,
      chainRole: 'start',
      canTriggerRandomly: false,
      advancesTick: false,
      portraitId: 'advisor',
      title: '🛠 Repair Work Begins',
      text: 'Your workers have started assessing the destroyed building. Plans are being drawn up for reconstruction.',
      options: [
        { text: 'Review the damage', effects: {} },
      ],
      followUps: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: `REPAIRV4_S${n}_PROGRESS`, weight: 1 }],
        },
      ],
    });

    requests.push({
      id: `REPAIRV4_S${n}_PROGRESS`,
      chainId,
      chainRole: 'member',
      canTriggerRandomly: false,
      advancesTick: false,
      portraitId: 'advisor',
      title: '🛠 Repair Progress',
      text: 'The repair work is underway. The craftsmen need direction on how to proceed.',
      options: [
        { text: 'Push for full reconstruction', effects: { satisfaction: 2 } },
        { text: 'Conserve resources', effects: { gold: 5 } },
      ],
      followUps: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: `REPAIRV4_S${n}_END`, weight: 1 }],
        },
        {
          triggerOnOptionIndex: 1,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: `REPAIRV4_S${n}_END`, weight: 1 }],
        },
      ],
    });

    requests.push({
      id: `REPAIRV4_S${n}_END`,
      chainId,
      chainRole: 'end',
      canTriggerRandomly: false,
      advancesTick: true,
      portraitId: 'advisor',
      chainRestartCooldownTicks: 0,
      title: '🛠 Repair Outcome',
      text: 'The time has come to decide the fate of the destroyed building.',
      options: [
        {
          // Option 0: Reconstruct (state.ts clears slot → unit becomes functional)
          text: 'Reconstruct the building',
          effects: { gold: -15, satisfaction: 5 },
        },
        {
          // Option 1: Leave destroyed (state.ts sets chainActive=false, slot stays)
          text: 'Leave it as ruins for now',
          effects: { satisfaction: -3 },
        },
      ],
    });
  }

  return requests;
}

export const fireChainRequests = [
  ...generateFireV4ChainRequests(),
  ...generateRepairV4ChainRequests(),
];
