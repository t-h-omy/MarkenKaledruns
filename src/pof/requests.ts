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
    text: 'The villagers want a marketplace for trade.',
    options: [
      {
        text: 'BUILD',
        effects: {
          satisfaction: 3,
          gold: -15,
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
    text: 'The bakery needs support to provide bread.',
    options: [
      {
        text: 'SUPPORT BAKERY',
        effects: {
          farmers: 15,
          gold: -10,
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
    text: 'Villagers request permission to brew beer.',
    options: [
      {
        text: 'ALLOW',
        effects: {
          gold: -5,
          beer: true,
          satisfaction: 5,
        },
      },
      {
        text: 'FORBID',
        effects: {},
      },
    ],
  },
  {
    id: 'NEED_FIREWOOD',
    text: 'The village needs an organized firewood supply.',
    options: [
      {
        text: 'ORGANIZE',
        effects: {
          gold: -8,
          firewood: true,
          fireRisk: -5,
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
    id: 'NEED_WELL',
    text: 'A well would improve health conditions.',
    options: [
      {
        text: 'BUILD',
        effects: {
          gold: -12,
          well: true,
          health: 5,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          health: -5,
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
    text: 'Recruit militia to strengthen defenses?',
    options: [
      {
        text: 'YES',
        effects: {
          landForces: 3,
          farmers: -3,
          satisfaction: -2,
        },
      },
      {
        text: 'NO',
        effects: {
          satisfaction: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_RAID_SMALL',
    text: 'A small raiding party approaches!',
    options: [
      {
        text: 'FIGHT',
        effects: {
          landForces: -2,
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
    text: 'A large raiding force is at the gates!',
    options: [
      {
        text: 'FIGHT',
        effects: {
          landForces: -4,
          satisfaction: -5,
        },
      },
      {
        text: 'DO NOT FIGHT',
        effects: {
          gold: -20,
          satisfaction: -8,
        },
      },
    ],
  },
  {
    id: 'EVT_MILITIA_PAY',
    text: 'The militia demands payment for their service.',
    options: [
      {
        text: 'PAY',
        effects: {
          gold: -10,
          satisfaction: 3,
        },
      },
      {
        text: 'REFUSE',
        effects: {
          landForces: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_RESTLESS_NIGHT',
    text: 'Strange noises disturb the village at night.',
    options: [
      {
        text: 'PATROL',
        effects: {
          landForces: -1,
          fireRisk: -2,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          satisfaction: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_VETERANS_LEAVE',
    text: 'Veteran fighters are considering leaving.',
    options: [
      {
        text: 'COMPENSATE',
        effects: {
          gold: -8,
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
    text: 'New farmers want to settle in the village.',
    options: [
      {
        text: 'ALLOW',
        effects: {
          farmers: 20,
          fireRisk: 5,
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
    id: 'EVT_EMIGRATION',
    text: 'Some families threaten to emigrate.',
    options: [
      {
        text: 'CONCEDE',
        effects: {
          gold: -5,
          satisfaction: 4,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -10,
        },
      },
    ],
  },
  {
    id: 'EVT_BIG_FAMILY',
    text: 'A big family asks for financial help.',
    options: [
      {
        text: 'HELP',
        effects: {
          gold: -5,
          satisfaction: 3,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          satisfaction: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_HARVEST_HELPERS',
    text: 'Harvest helpers are missing.',
    options: [
      {
        text: 'HIRE',
        effects: {
          gold: -6,
          farmers: 10,
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
    text: 'Unrest escalates in the village!',
    options: [
      {
        text: 'CONCESSIONS',
        effects: {
          gold: -10,
          satisfaction: 8,
        },
      },
      {
        text: 'CRACK DOWN',
        effects: {
          landForces: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_CRISIS_DISEASE',
    text: 'A disease wave threatens the village!',
    options: [
      {
        text: 'HEALER',
        effects: {
          gold: -10,
          health: 8,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -10,
        },
      },
    ],
  },
  {
    id: 'EVT_CRISIS_FIRE',
    text: 'Fire danger is acute in the village!',
    options: [
      {
        text: 'PREPARE',
        effects: {
          gold: -8,
          fireRisk: -10,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          farmers: -10,
        },
      },
    ],
  },

  // D) Improve stats (6 events)
  {
    id: 'EVT_FIRE_WATCH',
    text: 'Build a fire watch tower?',
    options: [
      {
        text: 'BUILD',
        effects: {
          gold: -10,
          fireRisk: -10,
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
    text: 'Hold a village festival to boost morale?',
    options: [
      {
        text: 'HOLD',
        effects: {
          gold: -8,
          satisfaction: 6,
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
    text: 'A merchant offers medical herbs.',
    options: [
      {
        text: 'BUY',
        effects: {
          gold: -6,
          health: 6,
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
    text: 'Train the militia for better defense?',
    options: [
      {
        text: 'TRAIN',
        effects: {
          gold: -8,
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
    text: 'Clean up the storage areas?',
    options: [
      {
        text: 'ORGANIZE',
        effects: {
          gold: -5,
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
    id: 'EVT_TAX_REFORM',
    text: 'Implement tax reform?',
    options: [
      {
        text: 'LOWER taxes',
        effects: {
          gold: -10,
          satisfaction: 7,
        },
      },
      {
        text: 'RAISE taxes',
        effects: {
          gold: 20,
          satisfaction: -5,
        },
      },
    ],
  },

  // E) Worsen stats (6 events)
  {
    id: 'EVT_FOREST_FIRE',
    text: 'A nearby forest fire threatens the village.',
    options: [
      {
        text: 'FIGHT',
        effects: {
          gold: -8,
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
    text: 'Plague spreads from a nearby village.',
    options: [
      {
        text: 'QUARANTINE',
        effects: {
          satisfaction: -3,
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
    text: 'Thefts are increasing in the village.',
    options: [
      {
        text: 'MORE GUARDS',
        effects: {
          landForces: -2,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          gold: -8,
        },
      },
    ],
  },
  {
    id: 'EVT_BAD_HARVEST',
    text: 'The harvest was poor this season.',
    options: [
      {
        text: 'COMPENSATE',
        effects: {
          gold: -10,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          satisfaction: -6,
          health: -4,
        },
      },
    ],
  },
  {
    id: 'EVT_FIREWOOD_WET',
    text: 'The firewood supply got wet.',
    options: [
      {
        text: 'REPLACE',
        effects: {
          gold: -6,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          fireRisk: 6,
        },
      },
    ],
  },
  {
    id: 'EVT_FARMERS_QUARREL',
    text: 'Farmers quarrel over land boundaries (comic relief).',
    options: [
      {
        text: 'MEDIATE',
        effects: {
          gold: -1,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -1,
        },
      },
    ],
  },
];
