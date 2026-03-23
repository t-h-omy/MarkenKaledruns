import type { Request } from '../../models';

  // =========================================================
  // CHAIN – Iron Water
  // S-size, Well required
  // Mechanics: authority follow-up boosts, 1 probabilistic follow-up
  // =========================================================
export const ironWaterChainDefs: Request[] = [
  {
    id: 'CHAIN_IRON_WATER_START',
    chainId: 'iron_water',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['building:well'],
    title: 'Iron Water',
    text: 'Dunhild, the village healer, draws a bucket from the well and shows you red-streaked water. She warns the square not to drink, but fear is already spreading.',
    portraitId: 'healer',
    options: [
      {
        text: 'SEAL THE WELL',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
          followUpBoosts: [
            {
              targetRequestId: 'CHAIN_IRON_WATER_ORDER_HOLDS',
              boostType: 'stepped',
              boostValue: 2,
              steps: 3,
              description: 'Increases chance the crowd obeys',
            },
          ],
        },
      },
      {
        text: 'CALL IT NERVES',
        effects: {
          authority: -1,
          satisfaction: 1,
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [
          { requestId: 'CHAIN_IRON_WATER_ORDER_HOLDS', weight: 1 },
          { requestId: 'CHAIN_IRON_WATER_PANIC_BREAKS', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_IRON_WATER_RUMOR_RUNS', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_IRON_WATER_ORDER_HOLDS',
    chainId: 'iron_water',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Rope Tied Off',
    text: 'The rope is tied off. Dunhild rubs the grit between thumb and nail. "Iron. Or blood."',
    portraitId: 'healer',
    options: [
      {
        text: 'DIG DEEPER',
        effects: {
          gold: -15,
          health: 2,
        },
      },
      {
        text: 'USE STREAMS',
        effects: {
          health: -1,
          satisfaction: -1,
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_IRON_WATER_END_CLEAN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_IRON_WATER_END_SHORTAGE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_IRON_WATER_PANIC_BREAKS',
    chainId: 'iron_water',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Bucket Panic',
    text: 'A child retches by the curb. Fear moves faster than truth. Buckets slam; elbows follow.',
    portraitId: 'healer',
    options: [
      {
        text: 'BOIL IT',
        effects: {
          gold: -5,
          health: 1,
        },
      },
      {
        text: 'DRIVE THEM BACK',
        effects: {
          authority: 1,
          satisfaction: -2,
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_IRON_WATER_END_CLEAN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_IRON_WATER_END_SHORTAGE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_IRON_WATER_RUMOR_RUNS',
    chainId: 'iron_water',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Curse-Water',
    text: 'By dusk they call it curse-water. Empty pails knock all through the square.',
    portraitId: 'healer',
    options: [
      {
        text: 'TRUST DUNHILD',
        effects: {
          gold: -10,
          health: 2,
        },
      },
      {
        text: 'REOPEN IT',
        effects: {
          authority: -1,
          health: -2,
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_IRON_WATER_END_CLEAN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_IRON_WATER_END_SHORTAGE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_IRON_WATER_END_CLEAN',
    chainId: 'iron_water',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 30,
    title: 'Iron, Not Curse',
    text: 'Dunhild lifts a fresh cup. Metallic, yes. Deadly, no. The first swallow still feels brave.',
    portraitId: 'healer',
    options: [
      {
        text: 'CLEAN SHAFT',
        effects: {
          gold: -10,
          health: 2,
        },
      },
      {
        text: 'THANK DUNHILD',
        effects: {
          satisfaction: 2,
          authority: 1,
        },
      },
    ],
  },

  {
    id: 'CHAIN_IRON_WATER_END_SHORTAGE',
    chainId: 'iron_water',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 30,
    title: 'Dry Mouths',
    text: 'The queue thins into silence. Thirst makes even kind faces sharp by the third day.',
    portraitId: 'healer',
    options: [
      {
        text: 'CART WATER',
        effects: {
          gold: -15,
          health: 2,
        },
      },
      {
        text: 'RATION HARD',
        effects: {
          authority: 1,
          satisfaction: -2,
        },
      },
    ],
  },
];
