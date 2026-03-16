import type { Request } from '../../models';

  // =========================================================
  // CHAIN 9 – Ego Test: Public Insult
  // Mechanics: option followUps, weighted candidates,
  //            maxTriggers=1 (once per game run)
  // =========================================================
export const egoInsultChainDefs: Request[] = [
  {
    id: 'CHAIN_EGO_INSULT_START',
    chainId: 'ego_insult',
    chainRole: 'start',
    title: 'A Voice from the Crowd',
    text: 'During a public address, a villager shouts: "You call yourself a leader? My goat governs better!" Laughter ripples through the crowd. All eyes turn to you.',
    canTriggerRandomly: true,
    portraitId: 'antagonist_villager',
    options: [
      { text: 'PUNISH', effects: { authority: 1, satisfaction: -2 } },
      { text: 'LAUGH IT OFF', effects: { satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_EGO_PUNISH_BACKLASH', weight: 1 },
          { requestId: 'CHAIN_EGO_PUNISH_RESPECT', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_EGO_LAUGH_EMBOLDENED', weight: 1 },
          { requestId: 'CHAIN_EGO_LAUGH_RESPECT', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_EGO_PUNISH_BACKLASH',
    chainId: 'ego_insult',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Heavy Hand Backfires',
    text: 'The heckler is dragged away, but the crowd murmurs darkly. "He only spoke what we all think." Your show of force has made things worse.',
    portraitId: 'antagonist_villager',
    options: [
      { text: 'LEAVE THE SQUARE', effects: { authority: -1 } },
      { text: 'DISPERSE THE CROWD', effects: {satisfaction: -2, authority: 1} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_EGO_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_EGO_PUNISH_RESPECT',
    chainId: 'ego_insult',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Order Restored',
    text: 'The crowd falls silent at first. Then a loud voice rings out: “All hail!” It isn’t long before the whole square erupts in applause. Whether out of fear or awe, you cannot say.',
    portraitId: 'antagonist_villager',
    options: [
      { text: 'AS IT SHOULD BE', effects: { authority: 1, } },
      { text: 'DEAL OUT COINS', effects: {gold: -5,} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_EGO_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_EGO_LAUGH_EMBOLDENED',
    chainId: 'ego_insult',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Mockery Spreads',
    text: 'Your good humor emboldens others. Soon "the goat lord" becomes a street joke. Children bleat at you in the streets.',
    portraitId: 'antagonist_villager',
    options: [
      { text: 'IGNORE IT', effects: { authority: -1 } },
      { text: 'IMPRISON THEM', effects: {satisfaction: -5, farmers: -3, authority: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_EGO_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_EGO_LAUGH_RESPECT',
    chainId: 'ego_insult',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Grace Under Fire',
    text: 'Your laughter disarms the moment entirely. The heckler himself grins sheepishly. "Fair enough, my lord." The crowd warms to you — a leader who can take a joke is a leader worth following.',
    portraitId: 'antagonist_villager',
    options: [
      { text: 'WELL HANDLED', effects: { satisfaction: 1 } },
      { text: 'BUY HIM AN ALE', effects: {gold: -5, satisfaction: 1} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_EGO_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_EGO_END',
    chainId: 'ego_insult',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 100,
    title: 'The Incident Fades',
    text: 'Weeks pass and the incident is mostly forgotten — though some still smirk when they think you are not looking. Such is the burden of leadership.',
    portraitId: 'advisor',
    options: [
      { text: 'MOVE FORWARD', effects: {} },
      { text: 'LET IT GO', effects: {} },
    ],
  },
];
