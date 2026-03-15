import type { Request } from '../../models';

  // ── Commerce: Prosperity Chain ────────────────────────────────────────

export const commerceProsperityChainDefs: Request[] = [
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
];
