import type { Request } from '../../models';

  // =========================================================
  // CHAIN 5 – Harvest Festival
  // Mechanics: option followUps, requirements (need:beer),
  //            maxTriggers, chain-gating, weighted candidates
  // =========================================================
export const harvestFestChainDefs: Request[] = [
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
];
