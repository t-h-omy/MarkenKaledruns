import type { Request } from '../../models';

  // =========================================================
  // CHAIN 11 – Wandering Healer (Small, 4 requests)
  // A traveling healer offers aid to the settlement.
  // Diamond pattern: START → TREAT / REFUSE → END
  // =========================================================
export const wanderingHealerChainDefs: Request[] = [
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
];
