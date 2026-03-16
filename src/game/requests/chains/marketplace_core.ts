import type { Request } from '../../models';

  // ══════════════════════════════════════════════════════════════════════
  //  BUILDING EVENT CHAINS (6 chains × 3 events = 18 events)
  // ══════════════════════════════════════════════════════════════════════

  // ── Marketplace Core Chain ────────────────────────────────────────────

export const marketplaceCoreChainDefs: Request[] = [
  {
    id: 'CHAIN_MARKETPLACE_CORE_START',
    chainId: 'marketplace_core',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['building:marketplace'],
    portraitId: 'merchant',
    title: 'Stall Dispute',
    text: 'Two prominent merchants nearly come to blows over the prime stall location at the market square. Their apprentices have drawn lines in the dirt, and other traders are choosing sides. If left unchecked, this petty quarrel could disrupt all trade.',
    options: [
      { text: 'ASSIGN STALLS BY LOTTERY', effects: { satisfaction: 1, gold: -2 } },
      { text: 'AWARD BY SENIORITY', effects: { authority: 1, satisfaction: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MARKETPLACE_CORE_QUARREL', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MARKETPLACE_CORE_QUARREL', weight: 1 }] },
    ],
  },

  {
    id: 'CHAIN_MARKETPLACE_CORE_QUARREL',
    chainId: 'marketplace_core',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Guild Politics',
    text: 'The stall dispute has escalated into a guild matter. The merchant guild demands the right to self-govern market affairs, challenging your authority over trade regulation. Refusing could spark a boycott, but yielding sets a dangerous precedent.',
    options: [
      { text: 'ALLOW GUILD OVERSIGHT', effects: { gold: 3, authority: -2 } },
      { text: 'REASSERT YOUR AUTHORITY', effects: { authority: 2, gold: -3 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MARKETPLACE_CORE_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MARKETPLACE_CORE_END', weight: 1 }] },
    ],
  },

  {
    id: 'CHAIN_MARKETPLACE_CORE_END',
    chainId: 'marketplace_core',
    chainRole: 'end',
    chainRestartCooldownTicks: 50,
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Market Resolution',
    text: 'The dust settles on the marketplace conflict. The merchants present two proposals: a formal charter granting them limited self-governance, or a renewed oath of fealty to your direct rule. Either way, trade must resume.',
    options: [
      { text: 'SIGN THE CHARTER', effects: { gold: 4, authority: -1, satisfaction: 2 } },
      { text: 'DEMAND THE OATH', effects: { authority: 3, gold: -2, satisfaction: -1 } },
    ],
  },
];
