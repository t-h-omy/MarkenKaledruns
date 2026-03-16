import type { Request } from '../../models';

  // =========================================================
  // CHAIN 2 – Merchant Guild
  // Mechanics: option followUps, requirements (building:marketplace),
  //            weighted candidates, chain-gating
  // =========================================================
export const merchantGuildChainDefs: Request[] = [
  {
    id: 'CHAIN_MERCHANT_GUILD_START',
    chainId: 'merchant_guild',
    chainRole: 'start',
    requires: ['building:marketplace'],
    portraitId: 'merchant',
    title: 'Guild Proposal',
    text: 'A delegation of merchants arrives at the marketplace. They propose forming a guild to regulate trade and share profits — for a founding fee.',
    options: [
      { text: 'ACCEPT', effects: { gold: -15 } },
      { text: 'REJECT', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 6,
        candidates: [
          { requestId: 'CHAIN_MERCHANT_GUILD_PROSPEROUS', weight: 3 },
          { requestId: 'CHAIN_MERCHANT_GUILD_CORRUPT', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [
          { requestId: 'CHAIN_MERCHANT_GUILD_SMUGGLERS', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_MERCHANT_GUILD_PROSPEROUS',
    chainId: 'merchant_guild',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Thriving Commerce',
    text: 'The guild is running smoothly. Goods flow, prices stabilize, and the treasury benefits. The guild master asks to expand operations.',
    options: [
      { text: 'EXPAND', effects: { gold: -15, } },
      { text: 'KEEP CURRENT SIZE', effects: { } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_WEALTH', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_STABLE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MERCHANT_GUILD_CORRUPT',
    chainId: 'merchant_guild',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Shady Dealings',
    text: 'Reports surface that guild members are price-fixing and skimming profits. The guild master denies it flatly.',
    options: [
      { text: 'INVESTIGATE', effects: { gold: -10, authority: 1 } },
      { text: 'TURN A BLIND EYE', effects: { satisfaction: -3 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_MERCHANT_GUILD_END_REFORM', weight: 2 },
          { requestId: 'CHAIN_MERCHANT_GUILD_END_STABLE', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_STABLE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MERCHANT_GUILD_SMUGGLERS',
    chainId: 'merchant_guild',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Black Market',
    text: 'Without a guild, smugglers fill the void. Cheap goods appear but quality is terrible and crime rises.',
    portraitId: 'spy_enemy',
    options: [
      { text: 'CRACK DOWN', effects: { landForces: -3, authority: 1 } },
      { text: 'TOLERATE IT', effects: { health: -2, satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_REFORM', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_STABLE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MERCHANT_GUILD_END_WEALTH',
    chainId: 'merchant_guild',
    chainRole: 'end',
    chainRestartCooldownTicks: 60,
    canTriggerRandomly: false,
    title: 'Golden Age of Trade',
    text: 'The expanded guild brings prosperity. Merchants from distant lands flock to your marketplace.',
    portraitId: 'merchant',
    options: [
      { text: 'HOST A TRADE FAIR', effects: { gold: 45, satisfaction: 2 } },
      { text: 'TAX THE PROFITS', effects: { gold: 60, satisfaction: -3 } },
    ],
  },

  {
    id: 'CHAIN_MERCHANT_GUILD_END_STABLE',
    chainId: 'merchant_guild',
    chainRole: 'end',
    chainRestartCooldownTicks: 60,
    canTriggerRandomly: false,
    title: 'Steady Trade',
    text: 'Trade continues at a modest pace. The guild — or lack thereof — has settled into a routine.',
    portraitId: 'merchant',
    options: [
      { text: 'GOOD ENOUGH', effects: { gold: 25 } },
      { text: 'TAX THE PROFITS', effects: { gold: 35, satisfaction: -3 } },
    ],
  },

  {
    id: 'CHAIN_MERCHANT_GUILD_END_REFORM',
    chainId: 'merchant_guild',
    chainRole: 'end',
    chainRestartCooldownTicks: 60,
    canTriggerRandomly: false,
    title: 'A Fresh Start',
    text: 'With the corrupt elements removed, honest merchants return. The marketplace is cleaner and more trustworthy.',
    portraitId: 'merchant',
    options: [
      { text: 'CELEBRATE', effects: { satisfaction: 3 } },
      { text: 'STAY VIGILANT', effects: { authority: 2 } },
    ],
  },
];
