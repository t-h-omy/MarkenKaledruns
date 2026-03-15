import type { Request } from '../../models';

  // ── Faith: Pilgrimage Chain ───────────────────────────────────────────

export const faithPilgrimageChainDefs: Request[] = [
  {
    id: 'CHAIN_FAITH_PILGRIM_START',
    chainId: 'faith_pilgrimage',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['district:faith_complete'],
    portraitId: 'village_priest',
    title: 'Pilgrims Arrive',
    text: 'Word of your shrine and healer\'s house has spread far. A large procession of pilgrims arrives at the village gates, seeking spiritual guidance and healing. They bring offerings, but their numbers strain your resources.',
    options: [
      { text: 'WELCOME ALL PILGRIMS', effects: { gold: 3, satisfaction: 1, health: -1 } },
      { text: 'LIMIT ENTRY TO THE SICK', effects: { health: 2, satisfaction: -1, gold: 1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_FAITH_PILGRIM_TENSION', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_FAITH_PILGRIM_TENSION', weight: 1 }] },
    ],
  },

  {
    id: 'CHAIN_FAITH_PILGRIM_TENSION',
    chainId: 'faith_pilgrimage',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'village_priest',
    title: 'Pilgrims Overwhelm',
    text: 'The pilgrim numbers have swelled beyond expectation. They camp outside the village walls, and tensions rise as food and water are shared with outsiders. Some villagers grumble, while the priest insists hospitality is a sacred duty.',
    options: [
      { text: 'SHARE VILLAGE RESOURCES', effects: { satisfaction: -2, health: -1, gold: -2 } },
      { text: 'ASK PILGRIMS TO CONTRIBUTE', effects: { gold: 3, satisfaction: 1, authority: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_FAITH_PILGRIM_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_FAITH_PILGRIM_END', weight: 1 }] },
    ],
  },

  {
    id: 'CHAIN_FAITH_PILGRIM_END',
    chainId: 'faith_pilgrimage',
    chainRole: 'end',
    chainRestartCooldownTicks: 55,
    canTriggerRandomly: false,
    portraitId: 'village_priest',
    title: 'Pilgrimage Conclusion',
    text: 'The pilgrimage season draws to a close. The priest proposes either establishing your village as an official pilgrimage site — bringing permanent visitors and revenue — or closing the gates to preserve the village\'s quiet way of life.',
    options: [
      { text: 'ESTABLISH PILGRIMAGE SITE', effects: { gold: 5, satisfaction: 2, health: -2, farmers: -1 } },
      { text: 'CLOSE THE GATES', effects: { satisfaction: -1, health: 2, authority: 2 } },
    ],
  },
];
