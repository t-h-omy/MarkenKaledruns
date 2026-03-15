import type { Request } from '../../models';

  // ── Shrine Core Chain ─────────────────────────────────────────────────

export const shrineCoreChainDefs: Request[] = [
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
];
