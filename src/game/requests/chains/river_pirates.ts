import type { Request } from '../../models';

  // =========================================================
  // CHAIN 10 – River Pirates
  // Mechanics: combat outcome, option followUps, weighted candidates,
  //            authority boosts weights (linear)
  // =========================================================
export const riverPiratesChainDefs: Request[] = [
  {
    id: 'CHAIN_RIVER_PIRATES_START',
    chainId: 'river_pirates',
    chainRole: 'start',
    portraitId: 'pirate',
    title: 'Sails on the River',
    text: 'Black-flagged longboats have been spotted on the river. A pirate fleet demands tribute or threatens to burn your docks and seize your coin.',
    canTriggerRandomly: true,
    combat: {
      enemyForces: 10,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 6,
      onWin: { authority: 2,},
      onLose: { authority: -2,},
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_AFTER_WIN', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_AFTER_LOSE', weight: 1 }],
        },
      ],
    },
    options: [
      { text: 'FIGHT', effects: {} },
      {
        text: 'PAY TRIBUTE',
        effects: { gold: -15, authority: -1 },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
          lossOnFailurePercent: 50,
          followUpBoosts: [
            { targetRequestId: 'CHAIN_RIVER_PIRATES_TRIBUTE_LEAVES', boostType: 'linear', boostValue: 4 },
          ],
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [
          { requestId: 'CHAIN_RIVER_PIRATES_TRIBUTE_LEAVES', weight: 1 },
          { requestId: 'CHAIN_RIVER_PIRATES_TRIBUTE_RETURNS', weight: 2 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_RIVER_PIRATES_AFTER_WIN',
    chainId: 'river_pirates',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'River Cleared',
    text: 'The pirate fleet burns on the riverbank. Your soldiers recover stolen goods from the wreckage. Word of the victory spreads downstream.',
    portraitId: 'knight',
    options: [
      { text: 'SALVAGE WHAT WE CAN', effects: {gold: 15,} },
      { text: 'CELEBRATE', effects: {satisfaction: 3,} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_RIVER_PIRATES_AFTER_LOSE',
    chainId: 'river_pirates',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Docks in Flames',
    text: 'The pirates overwhelmed your defenses and march towards your treasury. Your villagers try to flee.',
    portraitId: 'pirate',
    options: [
      { text: 'PEASANTS, DEFEND MY TREASURY!', effects: {farmers: -10, satisfaction: -3,} },
      { text: 'RUN FOR YOUR LIVES!', effects: {gold: -20, satisfaction: 3,} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_RIVER_PIRATES_TRIBUTE_LEAVES',
    chainId: 'river_pirates',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'pirate',
    title: 'Pirates Withdraw',
    text: 'The pirate captain counts the tribute and nods. "Wise choice." The black sails disappear downriver. Perhaps your show of authority convinced them to seek easier prey.',
    options: [
      { text: 'BRAG ABOUT IT', effects: { satisfaction: -1, authority: 1,} },
      { text: 'SECURE THE RIVER', effects: {gold: -10, landForces: 3} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_RIVER_PIRATES_TRIBUTE_RETURNS',
    chainId: 'river_pirates',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'pirate',
    title: 'They Want More',
    text: 'The pirates took the tribute — and came back for more. "give us your coin or we take your wives!" The crew jeers from the deck as their captain extends an open palm.',
    options: [
      { text: 'GIVE COIN', effects: { gold: -10 } },
      { text: 'GIVE UP WIVES', effects: {farmers: -5, satisfaction: -5,} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_RIVER_PIRATES_END',
    chainId: 'river_pirates',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 100,
    title: 'The River Quiets',
    text: 'The river pirate threat has passed. Fishermen cautiously return to their boats, and trade barges resume their routes.',
    portraitId: 'advisor',
    options: [
      { text: 'CURSE PIRATES', effects: {satisfaction: 2, authority: -1} },
      { text: 'SCOLD YOUR SOLDIERS', effects: {satisfaction: -2, authority: 1} },
    ],
  },
];
