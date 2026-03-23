import type { Request } from '../../models';

  // =========================================================
  // CHAIN – Ford Oath
  // S-size, no building requirement
  // Mechanics: authority follow-up boosts, 1 probabilistic follow-up
  // =========================================================
export const fordOathChainDefs: Request[] = [
  {
    id: 'CHAIN_FORD_OATH_START',
    chainId: 'ford_oath',
    chainRole: 'start',
    canTriggerRandomly: true,
    title: 'The Ford Oath',
    text: 'Rimewyn, a grain-farmer from Stoneford, comes to you in anger. Wardhelm, keeper of the ford, has closed the crossing, and her harvest cannot reach market.',
    portraitId: 'farmer',
    options: [
      {
        text: 'HOLD THE OATH',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 20,
          followUpBoosts: [
            {
              targetRequestId: 'CHAIN_FORD_OATH_HEEDED',
              boostType: 'stepped',
              boostValue: 2,
              steps: 3,
              description: 'Increases chance Wardhelm yields',
            },
          ],
        },
      },
      {
        text: 'LET HIM BAR IT',
        effects: {
          satisfaction: -1,
          authority: -1,
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [
          { requestId: 'CHAIN_FORD_OATH_HEEDED', weight: 1 },
          { requestId: 'CHAIN_FORD_OATH_DEFIED', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_FORD_OATH_BARRED', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_FORD_OATH_HEEDED',
    chainId: 'ford_oath',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Chain Lifted',
    text: 'Wardhelm, the ford-keeper, meets you at the chain across the flooded ford. He has obeyed your order to open it, but his men think the crossing will kill someone.',
    portraitId: 'elder',
    options: [
      {
        text: 'POST ROPES',
        effects: {
          gold: -10,
          health: 1,
        },
      },
      {
        text: 'TRUST THEM',
        effects: {
          satisfaction: 2,
          health: -1,
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_FORD_OATH_END_OPEN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_FORD_OATH_END_OPEN', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_FORD_OATH_DEFIED',
    chainId: 'ford_oath',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Mud Verdict',
    text: 'Wardhelm, the ford-keeper, stands in the flood with his staff planted deep. He has refused your order to open the crossing and says the river is too dangerous.',
    portraitId: 'elder',
    options: [
      {
        text: 'HIRE FERRY',
        effects: {
          gold: -15,
          satisfaction: 1,
        },
      },
      {
        text: 'BACK DOWN',
        effects: {
          authority: -2,
          farmers: -3,
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_FORD_OATH_END_OPEN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_FORD_OATH_END_LOST', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_FORD_OATH_BARRED',
    chainId: 'ford_oath',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Cart Line',
    text: 'Carts clog the lane to Stoneford. Rain taps the sacks. Rimewyn does not wipe her face.',
    portraitId: 'farmer',
    options: [
      {
        text: 'PAY TEAMSTERS',
        effects: {
          gold: -10,
          farmers: 2,
        },
      },
      {
        text: 'LEVY A TOLL',
        effects: {
          gold: 10,
          satisfaction: -2,
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_FORD_OATH_END_OPEN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_FORD_OATH_END_LOST', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_FORD_OATH_END_OPEN',
    chainId: 'ford_oath',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 28,
    title: 'The Crossing Holds',
    text: "By week's end the ford runs again. No one calls it just, but the grain gets through.",
    portraitId: 'elder',
    options: [
      {
        text: 'MARK THE OATH',
        effects: {
          authority: 2,
          satisfaction: 1,
        },
      },
      {
        text: 'REPAIR BANK',
        effects: {
          gold: -10,
          health: 2,
        },
      },
    ],
  },

  {
    id: 'CHAIN_FORD_OATH_END_LOST',
    chainId: 'ford_oath',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 28,
    title: 'The Ford is Lost',
    text: 'The chain stays up. Stoneford turns from road into memory while mud dries on your boots.',
    portraitId: 'farmer',
    options: [
      {
        text: 'FEED THEM',
        effects: {
          gold: -15,
          satisfaction: 2,
        },
      },
      {
        text: 'TAKE THE TOLL',
        effects: {
          gold: 12,
          authority: -2,
        },
      },
    ],
  },
];
