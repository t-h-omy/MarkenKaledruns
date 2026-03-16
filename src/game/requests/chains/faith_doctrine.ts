import type { Request } from '../../models';

  // ── Faith: Doctrine Chain ─────────────────────────────────────────────

export const faithDoctrineChainDefs: Request[] = [
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
