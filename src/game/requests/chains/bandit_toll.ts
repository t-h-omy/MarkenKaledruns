import type { Request } from '../../models';

  // =========================================================
  // CHAIN 1 – Bandit Toll
  // Mechanics: combat outcome, option followUps, weighted random,
  //            chain-gating, maxTriggers
  // =========================================================
export const banditTollChainDefs: Request[] = [
  {
    id: 'CHAIN_BANDIT_TOLL_START',
    chainId: 'bandit_toll',
    chainRole: 'start',
    maxTriggers: 3,
    portraitId: 'bandit',
    title: 'Blocked Road',
    text: 'A band of armed men has set up a barricade across the only trade road. Their leader steps forward: "Toll is ten gold per cart. Pay or fight."',
    options: [
      { text: 'FIGHT THEM', effects: {} },
      { text: 'PAY THE TOLL', effects: { gold: -10, authority: -1 } },
    ],
    combat: {
      enemyForces: 5,
      prepDelayMinTicks: 2,
      prepDelayMaxTicks: 4,
      onWin: {
        gold: 15,
        authority: 2,
      },
      onLose: {
        gold: -5,
        satisfaction: -3,
        authority: -2,
      },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [
            { requestId: 'CHAIN_BANDIT_TOLL_LOOT', weight: 3 },
            { requestId: 'CHAIN_BANDIT_TOLL_SURVIVOR', weight: 2 },
          ],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [
            { requestId: 'CHAIN_BANDIT_TOLL_REGROUP', weight: 1 },
          ],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 8,
        candidates: [
          { requestId: 'CHAIN_BANDIT_TOLL_RETURN', weight: 3 },
          { requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_BANDIT_TOLL_LOOT',
    chainId: 'bandit_toll',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Spoils of Battle',
    text: 'The bandits are routed. Among their belongings your soldiers find stolen trade goods and a rough map of their hideout.',
    portraitId: 'military_advisor',
    options: [
      { text: 'RAID THE HIDEOUT', effects: { gold: 20, landForces: -2 } },
      { text: 'BURN THE MAP', effects: { satisfaction: 3 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_VICTORY', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BANDIT_TOLL_SURVIVOR',
    chainId: 'bandit_toll',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'bandit',
    title: 'A Bandit Speaks',
    text: 'One of the bandits survived. He offers information about a larger gang in exchange for his life.',
    options: [
      { text: 'SPARE HIM', effects: { authority: -1, satisfaction: 2 } },
      { text: 'EXECUTE HIM', effects: { authority: 1, satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [
          { requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 2 },
          { requestId: 'CHAIN_BANDIT_TOLL_END_VICTORY', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_VICTORY', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BANDIT_TOLL_REGROUP',
    chainId: 'bandit_toll',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Licking Wounds',
    text: 'The bandits defeated your men but did not press the attack. Feldric advises rebuilding strength before they return.',
    portraitId: 'military_advisor',
    options: [
      { text: 'RECRUIT MORE', effects: { gold: -10, landForces: 4 } },
      { text: 'NEGOTIATE PEACE', effects: { gold: -15, authority: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_RETURN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BANDIT_TOLL_RETURN',
    chainId: 'bandit_toll',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'bandit',
    title: 'They Are Back',
    text: 'The bandits have returned with reinforcements. This time they demand double the toll or blood.',
    options: [
      { text: 'FIGHT AGAIN', effects: {} },
      { text: 'PAY DOUBLE', effects: { gold: -20, authority: -2 } },
    ],
    combat: {
      enemyForces: 8,
      prepDelayMinTicks: 2,
      prepDelayMaxTicks: 3,
      onWin: {
        gold: 25,
        authority: 3,
        satisfaction: 3,
      },
      onLose: {
        gold: -15,
        satisfaction: -5,
        authority: -3,
      },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_VICTORY', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_DEFEAT', weight: 1 }],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BANDIT_TOLL_END_VICTORY',
    chainId: 'bandit_toll',
    chainRole: 'end',
    chainRestartCooldownTicks: 80,
    canTriggerRandomly: false,
    title: 'Road Secured',
    text: 'The trade road is clear at last. Merchants return, and the village prospers from renewed commerce.',
    portraitId: 'trader',
    options: [
      { text: 'CELEBRATE', effects: { satisfaction: 5, gold: 10 } },
      { text: 'FORTIFY THE ROAD', effects: { gold: -10, landForces: 3 } },
    ],
  },

  {
    id: 'CHAIN_BANDIT_TOLL_END_PEACE',
    chainId: 'bandit_toll',
    chainRole: 'end',
    chainRestartCooldownTicks: 80,
    canTriggerRandomly: false,
    title: 'Uneasy Truce',
    text: 'The bandits move on to easier prey. The road reopens, though travelers remain wary.',
    portraitId: 'advisor',
    options: [
      { text: 'POST GUARDS', effects: { landForces: -1, satisfaction: 3 } },
      { text: 'MOVE ON', effects: { satisfaction: 1 } },
    ],
  },

  {
    id: 'CHAIN_BANDIT_TOLL_END_DEFEAT',
    chainId: 'bandit_toll',
    chainRole: 'end',
    chainRestartCooldownTicks: 80,
    canTriggerRandomly: false,
    title: 'A Costly Lesson',
    text: 'The bandits control the road now. Trade slows to a trickle and your people grow restless.',
    portraitId: 'bandit',
    options: [
      { text: 'SEEK ALLIES', effects: { gold: -5, authority: 1 } },
      { text: 'ENDURE', effects: { satisfaction: -5 } },
    ],
  },
];
