import type { Request } from '../../models';

  // =========================================================
  // CHAIN 7 – Palisade Upgrade
  // Mechanics: option followUps, weighted candidates,
  //            requires token gating (building:marketplace)
  // =========================================================
export const palisadeChainDefs: Request[] = [
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
];
