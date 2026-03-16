import type { Request } from '../../models';

  // ── Healer's House Core Chain ─────────────────────────────────────────

export const healersHouseCoreChainDefs: Request[] = [
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
];
