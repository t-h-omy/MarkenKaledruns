import type { Request } from '../../models';

  // ── Tavern Core Chain ─────────────────────────────────────────────────

export const tavernCoreChainDefs: Request[] = [
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
];
