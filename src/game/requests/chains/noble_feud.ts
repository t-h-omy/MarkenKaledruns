import type { Request } from '../../models';

  // =========================================================
  // CHAIN 4 – Noble Feud
  // Mechanics: authority check with followUpBoosts (linear boost),
  //            combat outcome, weighted candidates, chain-gating
  // =========================================================
export const nobleFeudChainDefs: Request[] = [
  {
    id: 'CHAIN_NOBLE_FEUD_START',
    chainId: 'noble_feud',
    chainRole: 'start',
    authorityMin: 34,
    authorityMax: 100,
    title: 'The Rival Lord',
    text: 'Lord Alden of a neighboring fief has laid claim to a strip of borderland that your farmers work. He demands you yield or face consequences.',
    portraitId: 'noble',
    options: [
      {
        text: 'ASSERT YOUR CLAIM',
        effects: {},
        authorityCheck: {
          minCommit: 5,
          maxCommit: 20,
          lossOnFailurePercent: 50,
          followUpBoosts: [
            {
              targetRequestId: 'CHAIN_NOBLE_FEUD_DIPLOMACY',
              boostType: 'linear',
              boostValue: 4.0,
              description: 'Increases chance of diplomatic resolution',
            },
          ],
        },
      },
      { text: 'YIELD THE LAND', effects: { farmers: -3, authority: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_NOBLE_FEUD_DIPLOMACY', weight: 2 },
          { requestId: 'CHAIN_NOBLE_FEUD_ESCALATE', weight: 3 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_YIELDED', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_NOBLE_FEUD_DIPLOMACY',
    chainId: 'noble_feud',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'A Reasonable Man',
    text: 'Lord Alden agrees to meet. Surprisingly, he is open to negotiation. Perhaps this can be settled without bloodshed.',
    portraitId: 'noble',
    options: [
      { text: 'OFFER COMPROMISE', effects: { gold: -10, authority: 1 } },
      { text: 'DEMAND FULL RIGHTS', effects: { authority: 2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_PEACE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_NOBLE_FEUD_END_PEACE', weight: 1 },
          { requestId: 'CHAIN_NOBLE_FEUD_ESCALATE', weight: 2 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_NOBLE_FEUD_ESCALATE',
    chainId: 'noble_feud',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Swords Drawn',
    text: 'Lord Alden has gathered his men. His banners appear on the borderland. Feldric readies the militia: "This is no bluff."',
    portraitId: 'knight',
    options: [
      { text: 'DEFEND THE BORDER', effects: {} },
      { text: 'OFFER TRIBUTE', effects: { gold: -20, authority: -1 } },
    ],
    combat: {
      enemyForces: 6,
      prepDelayMinTicks: 2,
      prepDelayMaxTicks: 4,
      onWin: {
        authority: 2,
      },
      onLose: {
        farmers: -4,
        satisfaction: -3,
        authority: -2,
      },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_TRIUMPH', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_YIELDED', weight: 1 }],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_YIELDED', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_NOBLE_FEUD_END_PEACE',
    chainId: 'noble_feud',
    chainRole: 'end',
    chainRestartCooldownTicks: 70,
    canTriggerRandomly: false,
    title: 'Neighborly Accord',
    text: 'You and Lord Alden reach a fair agreement. The border is settled and both fiefs benefit from cooperation.',
    portraitId: 'noble',
    options: [
      { text: 'TOAST TO PEACE', effects: { satisfaction: 3, gold: 10 } },
      { text: 'FORMALIZE THE PACT', effects: { authority: 2, gold: 10 } },
    ],
  },

  {
    id: 'CHAIN_NOBLE_FEUD_END_TRIUMPH',
    chainId: 'noble_feud',
    chainRole: 'end',
    chainRestartCooldownTicks: 70,
    canTriggerRandomly: false,
    title: 'The Border Stands',
    text: 'Lord Alden retreats in defeat. The borderland remains yours. Your people cheer their victory.',
    portraitId: 'knight',
    options: [
      { text: 'REWARD THE MILITIA', effects: { satisfaction: 5 } },
      { text: 'FORTIFY THE BORDER', effects: { landForces: 5 } },
    ],
  },

  {
    id: 'CHAIN_NOBLE_FEUD_END_YIELDED',
    chainId: 'noble_feud',
    chainRole: 'end',
    chainRestartCooldownTicks: 70,
    canTriggerRandomly: false,
    title: 'Land Lost',
    text: 'The borderland now belongs to Lord Alden. Your farmers must find new fields, and your authority has suffered.',
    portraitId: 'noble',
    options: [
      { text: 'ACCEPT THE LOSS', effects: { gold: -15, authority: -1 } },
      { text: 'PLAN REVENGE', effects: { gold: -15, authority: 1, satisfaction: -2 } },
    ],
  },
];
