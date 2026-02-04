/**
 * Request data for the Proof-of-Fun game.
 * Based on POF_SPEC.md specification.
 * Contains 5 need-requests and 25 event-requests.
 */

import type { Request } from './models';

/**
 * Need-Requests (5)
 * These requests appear when village needs are unfulfilled.
 */
export const needRequests: Request[] = [
  {
    id: 'NEED_MARKETPLACE',
    title: 'A Hub for Trade',
    text: 'The settlement is growing, and door-to-door bartering is no longer sufficient. The citizens demand a central marketplace to unlock the next tier of prosperity.',
    options: [
      {
        text: 'BUILD',
        effects: {
          gold: -20,
          marketplace: true,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          satisfaction: -5,
        },
      },
    ],
  },
  {
    id: 'NEED_BREAD',
    title: 'Essential Sustenance',
    text: 'A sophisticated village requires a stable food chain. The people are calling for an organized bakery to elevate their diet and support further growth.',
    options: [
      {
        text: 'SUPPORT BAKERY',
        effects: {
          gold: -35,
          bread: true,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          health: -8,
        },
      },
    ],
  },
  {
    id: 'NEED_BEER',
    title: 'Culture & Brewing',
    text: 'As wealth increases, so does the desire for leisure. A local brewery is now required to maintain high satisfaction and reach the next level of social standing.',
    options: [
      {
        text: 'ALLOW',
        effects: {
          gold: -60,
          beer: true,
        },
      },
      {
        text: 'FORBID',
        effects: {
          satisfaction: -15,
        },
      },
    ],
  },
  {
    id: 'NEED_FIREWOOD',
    title: 'Firewood',
    text: 'Random foraging is too inefficient for a town of this size. The population demands a professional firewood supply as a baseline standard for their homes.',
    options: [
      {
        text: 'ORGANIZE',
        effects: {
          gold: -120,
          firewood: true,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          fireRisk: 15,
        },
      },
    ],
  },
  {
    id: 'NEED_WELL',
    title: 'Sanitary Standards',
    text: "To support a denser population safely, a central well is non-negotiable. Without this hygienic upgrade, the village's expansion will stagnate.",
    options: [
      {
        text: 'BUILD',
        effects: {
          gold: -210,
          well: true,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          health: -15,
        },
      },
    ],
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
    options: [
      {
        text: 'YES',
        effects: {
          landForces: 5,
          farmers: -5,
          gold: -5,
        },
      },
      {
        text: 'NO',
        effects: {
          satisfaction: 3,
        },
      },
    ],
  },
  {
    id: 'EVT_RAID_SMALL',
    title: 'Shadows in the Woods',
    text: 'A small band of brigands has been spotted nearby. Do we drive them off by force or pay a "toll" to keep the peace?',
    options: [
      {
        text: 'FIGHT',
        effects: {
          landForces: -3,
        },
      },
      {
        text: 'DO NOT FIGHT',
        effects: {
          gold: -10,
        },
      },
    ],
  },
  {
    id: 'EVT_RAID_LARGE',
    title: 'The War Horns',
    text: 'A massive raiding force is at the gates! Stand your ground and fight, or offer a heavy tribute to spare the village from destruction.',
    options: [
      {
        text: 'FIGHT',
        effects: {
          landForces: 8
          fireRisk: 12,
          gold: 20
        },
      },
      {
        text: 'DO NOT FIGHT',
        effects: {
          gold: -30,
          satisfaction: -5,
          farmers: -8,
        },
      },
    ],
  },
  {
    id: 'EVT_MILITIA_PAY',
    title: "Soldier's Due",
    text: "The militia's morale is slipping. They are demanding their seasonal wages to continue their service to the crown.",
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
          satisfaction: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_RESTLESS_NIGHT',
    title: 'Whispers in the Dark',
    text: 'Strange noises have been reported near the storage huts. Send a patrol to investigate, or dismiss it as simple superstition?',
    options: [
      {
        text: 'PATROL',
        effects: {
          landForces: -2,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_VETERANS_LEAVE',
    title: 'The Old Guard',
    text: 'Your most experienced fighters are considering retirement. A small bonus might convince them to stay and train the new recruits.',
    options: [
      {
        text: 'COMPENSATE',
        effects: {
          gold: -15,
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
    options: [
      {
        text: 'ALLOW',
        effects: {
          farmers: 20,
          fireRisk: 10,
          health: -8,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          satisfaction: 4,
        },
      },
    ],
  },
  {
    id: 'EVT_EMIGRATION',
    title: 'The Long Goodbye',
    text: 'Dissatisfied with current conditions, several families are packing their wagons. Will you offer concessions to keep them?',
    options: [
      {
        text: 'CONCEDE',
        effects: {
          gold: -15,
          satisfaction: 4,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_BIG_FAMILY',
    title: 'A Growing House',
    text: "A local family struggles to feed their many children. They've come to you for a small charitable gift to get through the month.",
    options: [
      {
        text: 'HELP',
        effects: {
          gold: -5,
          satisfaction: 5,
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
    text: 'The crops are ripening all at once. Hiring seasonal helpers could save the harvest before the autumn rains arrive.',
    options: [
      {
        text: 'HIRE',
        effects: {
          gold: -10,
          farmers: 5,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          health: -5,
        },
      },
    ],
  },

  // C) Crisis events (3 events) - triggered by selection rules
  {
    id: 'EVT_CRISIS_UNREST',
    title: 'Unrest Escalates',
    text: "Warning: Low Satisfaction! The people's anger has reached a breaking point. You must act now to appease the crowd or face a total revolt.",
    options: [
      {
        text: 'CONCESSIONS',
        effects: {
          gold: -40,
          satisfaction: 20,
        },
      },
      {
        text: 'CRACK DOWN',
        effects: {
          landForces: -2,
          farmers: -10,
        },
      },
    ],
  },
  {
    id: 'EVT_CRISIS_DISEASE',
    title: 'The Pale Cough',
    text: 'Warning: Low Health! Due to poor sanitary conditions, a sickness is spreading rapidly. We must fund a healer now before the population collapses.',
    options: [
      {
        text: 'HEALER',
        effects: {
          gold: -40,
          health: 20,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -15,
        },
      },
    ],
  },
  {
    id: 'EVT_CRISIS_FIRE',
    title: 'The Ember Alert',
    text: 'Warning: High Fire Risk! Neglect has made the village a tinderbox. A single spark could be fatal. We must implement emergency fire safety measures immediately.',
    options: [
      {
        text: 'PREPARE',
        effects: {
          gold: -40,
          fireRisk: -20,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          farmers: -10,
          health: -5,
        },
      },
    ],
  },

  // D) Improve stats (6 events)
  {
    id: 'EVT_FIRE_WATCH',
    title: 'The High Tower',
    text: 'An architect proposes a watchtower to spot fires early. It is a wise investment in the long-term safety of the settlement.',
    options: [
      {
        text: 'BUILD',
        effects: {
          landForces: -1,
          fireRisk: -8,
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
    options: [
      {
        text: 'HOLD',
        effects: {
          gold: -10,
          satisfaction: 8,
        },
      },
      {
        text: 'DECLINE',
        effects: {},
      },
    ],
  },
  {
    id: 'EVT_MEDICAL_HERBS',
    title: 'The Traveling Apothecary',
    text: 'A merchant offers a rare shipment of medicinal herbs. These could significantly boost the overall health of the village.',
    options: [
      {
        text: 'BUY',
        effects: {
          gold: -10,
          health: 8,
        },
      },
      {
        text: 'DECLINE',
        effects: {},
      },
    ],
  },
  {
    id: 'EVT_TRAIN_MILITIA',
    title: 'Drill Practice',
    text: 'A retired captain offers to drill your troops. This would make your defense forces much more formidable for future raids.',
    options: [
      {
        text: 'TRAIN',
        effects: {
          gold: -10,
          landForces: 5,
        },
      },
      {
        text: 'DECLINE',
        effects: {},
      },
    ],
  },
  {
    id: 'EVT_CLEAN_STORAGE',
    title: 'Spring Cleaning',
    text: 'The granaries are cluttered with old straw and debris. A deep clean would reduce the risk of accidental fires.',
    options: [
      {
        text: 'ORGANIZE',
        effects: {
          gold: -10,
          fireRisk: -8,
        },
      },
      {
        text: 'DECLINE',
        effects: {},
      },
    ],
  },
  {
    id: 'EVT_TAX_REFORM',
    title: 'The Royal Ledger',
    text: 'Balancing the books: Do you lower taxes to win favor, or raise them to fill the treasury for upcoming hardships?',
    options: [
      {
        text: 'LOWER taxes',
        effects: {
          gold: -15,
          satisfaction: 6,
        },
      },
      {
        text: 'RAISE taxes',
        effects: {
          gold: 25,
          satisfaction: -6,
        },
      },
    ],
  },

  // E) Worsen stats (6 events)
  {
    id: 'EVT_FOREST_FIRE',
    title: 'Smoke on the Horizon',
    text: "A nearby forest fire threatens the outskirts. If we don't send help to contain it, the winds may bring the disaster to our door.",
    options: [
      {
        text: 'FIGHT',
        effects: {
          health: -5,
          farmers: -2,
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
    options: [
      {
        text: 'QUARANTINE',
        effects: {
          satisfaction: -5,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          health: -8,
        },
      },
    ],
  },
  {
    id: 'EVT_THEFTS',
    title: 'Sticky Fingers',
    text: 'Marketplace thefts are on the rise. More guards would stop the loss of gold, but they are needed elsewhere for defense.',
    options: [
      {
        text: 'MORE GUARDS',
        effects: {
          landForces: -2,
          satisfaction: 4,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          gold: -15,
        },
      },
    ],
  },
  {
    id: 'EVT_BAD_HARVEST',
    title: 'The Blighted Crop',
    text: 'An early frost has ruined the crops. The people are hungry — will the crown step in to provide compensation and food?',
    options: [
      {
        text: 'COMPENSATE',
        effects: {
          gold: -15,
          health: 5
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          satisfaction: -3,
          farmers: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_FIREWOOD_WET',
    title: 'Damp Spirits',
    text: 'The firewood supply got soaked in a storm. We must buy replacements immediately or face a cold and dangerous winter.',
    options: [
      {
        text: 'REPLACE',
        effects: {
          gold: -10,
          satisfaction: 4
        },
      },
      {
        text: 'IGNORE',
        effects: {
          fireRisk: 6,
          health: -4,
        },
      },
    ],
  },
  {
    id: 'EVT_FARMERS_QUARREL',
    title: 'The Fence Dispute',
    text: 'Two farmers are quarreling over a boundary line. A moment of your time could settle this before it turns into a local feud.',
    options: [
      {
        text: 'MEDIATE',
        effects: {
          gold: -10,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -3,
        },
      },
    ],
  },
];
