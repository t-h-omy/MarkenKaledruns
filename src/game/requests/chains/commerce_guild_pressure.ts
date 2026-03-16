import type { Request } from '../../models';

  // ══════════════════════════════════════════════════════════════════════
  //  DISTRICT EVENT CHAINS (6 chains × 3 events = 18 events)
  // ══════════════════════════════════════════════════════════════════════

  // ── Commerce: Guild Pressure Chain ────────────────────────────────────

export const commerceGuildPressureChainDefs: Request[] = [
  {
    id: 'CHAIN_COMMERCE_GUILD_START',
    chainId: 'commerce_guild_pressure',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['district:commerce_complete'],
    portraitId: 'merchant',
    title: 'Guild Leaders Demand Power',
    text: 'The combined merchants of marketplace and tavern have formed a powerful commerce guild. Their leaders arrive at your hall, demanding a seat on the village council and a say in tax policy. Their economic leverage is considerable.',
    options: [
      { text: 'NEGOTIATE TERMS', effects: { gold: 2, authority: -2 } },
      { text: 'REFUSE OUTRIGHT', effects: { authority: 2, gold: -3 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_COMMERCE_GUILD_CONFLICT', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_COMMERCE_GUILD_CONFLICT', weight: 1 }] },
    ],
  },

  {
    id: 'CHAIN_COMMERCE_GUILD_CONFLICT',
    chainId: 'commerce_guild_pressure',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Trade Boycott',
    text: 'The guild escalates — merchants shutter their stalls and the tavernkeeper locks the doors. A full trade boycott grips the village. Prices soar as supplies dwindle, and villagers grow restless without goods or ale.',
    options: [
      { text: 'MAKE CONCESSIONS', effects: { gold: -2, satisfaction: 2, authority: -2 } },
      { text: 'BREAK THE BOYCOTT BY FORCE', effects: { authority: 3, satisfaction: -3, landForces: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_COMMERCE_GUILD_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_COMMERCE_GUILD_END', weight: 1 }] },
    ],
  },

  {
    id: 'CHAIN_COMMERCE_GUILD_END',
    chainId: 'commerce_guild_pressure',
    chainRole: 'end',
    chainRestartCooldownTicks: 60,
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Guild Accord',
    text: 'The commerce guild crisis reaches its conclusion. A formal agreement must be drawn — either granting the guild limited self-governance over trade affairs, or firmly establishing your sole authority over all village commerce.',
    options: [
      { text: 'GRANT LIMITED SELF-GOVERNANCE', effects: { gold: 5, satisfaction: 2, authority: -3 } },
      { text: 'ASSERT TOTAL CONTROL', effects: { authority: 4, gold: -2, satisfaction: -2 } },
    ],
  },
];
