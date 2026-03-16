import type { Request } from '../../models';

  // =========================================================
  // CHAIN 3 – Plague Rumors
  // Mechanics: option followUps, authority pool-gating
  //            (authorityMin/authorityMax), weighted candidates
  // =========================================================
export const plagueRumorsChainDefs: Request[] = [
  {
    id: 'CHAIN_PLAGUE_RUMORS_START',
    chainId: 'plague_rumors',
    chainRole: 'start',
    authorityMin: 20,
    authorityMax: 100,
    title: 'Dark Whispers',
    text: 'Travelers speak of a sickness spreading through neighboring settlements. Your healers urge precautions before it reaches your lands.',
    portraitId: 'healer',
    options: [
      { text: 'QUARANTINE BORDERS', effects: { gold: -10, satisfaction: -3 } },
      { text: 'DISMISS THE RUMORS', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [
          { requestId: 'CHAIN_PLAGUE_RUMORS_CONTAINED', weight: 3 },
          { requestId: 'CHAIN_PLAGUE_RUMORS_BREACH', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_PLAGUE_RUMORS_OUTBREAK', weight: 3 },
          { requestId: 'CHAIN_PLAGUE_RUMORS_NOTHING', weight: 2 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_PLAGUE_RUMORS_CONTAINED',
    chainId: 'plague_rumors',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Quarantine Holds',
    text: 'The border quarantine is working. Sickness has not reached your village, but trade has slowed to a crawl.',
    portraitId: 'healer',
    options: [
      { text: 'MAINTAIN QUARANTINE', effects: { gold: -10 } },
      { text: 'REOPEN BORDERS', effects: { gold: 10 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [{ requestId: 'CHAIN_PLAGUE_RUMORS_END_SAFE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_PLAGUE_RUMORS_END_SAFE', weight: 2 },
          { requestId: 'CHAIN_PLAGUE_RUMORS_END_SICK', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_PLAGUE_RUMORS_BREACH',
    chainId: 'plague_rumors',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Quarantine Breached',
    text: 'Despite your efforts, a merchant slipped through the quarantine. Several villagers have fallen ill.',
    portraitId: 'healer',
    options: [
      { text: 'TREAT THE SICK', effects: { gold: -15, health: 3, } },
      { text: 'ISOLATE THEM', effects: { satisfaction: -3, } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_PLAGUE_RUMORS_END_SAFE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_PLAGUE_RUMORS_END_SICK', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_PLAGUE_RUMORS_OUTBREAK',
    chainId: 'plague_rumors',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Plague Arrives',
    text: 'The sickness has reached your village. People are falling ill rapidly. The healers plead for resources.',
    portraitId: 'healer',
    options: [
      { text: 'FUND HEALERS', effects: { gold: -15, health: 5 } },
      { text: 'PRAY FOR THE BEST', effects: { health: -5, farmers: -5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 6,
        candidates: [
          { requestId: 'CHAIN_PLAGUE_RUMORS_END_SAFE', weight: 2 },
          { requestId: 'CHAIN_PLAGUE_RUMORS_END_SICK', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_PLAGUE_RUMORS_END_SICK', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_PLAGUE_RUMORS_NOTHING',
    chainId: 'plague_rumors',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    title: 'False Alarm',
    text: 'The rumors were overblown. No plague materialized and life continues as before.',
    portraitId: 'healer',
    options: [
      { text: 'RELIEF', effects: { satisfaction: 3 } },
      { text: 'STAY CAUTIOUS', effects: { authority: 1 } },
    ],
  },

  {
    id: 'CHAIN_PLAGUE_RUMORS_END_SAFE',
    chainId: 'plague_rumors',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    title: 'Crisis Averted',
    text: 'The sickness passes without major casualties. Your village emerges stronger and more resilient.',
    portraitId: 'healer',
    options: [
      { text: 'CELEBRATE SURVIVAL', effects: { satisfaction: 3, health: 5 } },
      { text: 'BUILD AN INFIRMARY', effects: { gold: -10, health: 8 } },
    ],
  },

  {
    id: 'CHAIN_PLAGUE_RUMORS_END_SICK',
    chainId: 'plague_rumors',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    title: 'Scars of Sickness',
    text: 'The plague has taken its toll. Empty homes stand as reminders. Recovery will take time.',
    portraitId: 'healer',
    options: [
      { text: 'MOURN AND REBUILD', effects: { farmers: -5, health: 3 } },
      { text: 'BLAME YOUR HEALERS', effects: { farmers: -5, satisfaction: -3, health: 3, authority: 1 } },
    ],
  },
];
