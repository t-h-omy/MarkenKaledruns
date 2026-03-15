import type { Request } from '../../models';

  // =========================================================
  // CHAIN 12 – Smuggler's Offer (Small, 5 requests)
  // Cheap goods from smugglers test the player's morals.
  // Diamond with extra member: START → DEAL → CAUGHT → END
  //                            START → REPORT → END
  // =========================================================
export const smugglersOfferChainDefs: Request[] = [
  {
    id: 'CHAIN_SMUGGLER_START',
    chainId: 'smugglers_offer',
    chainRole: 'start',
    title: 'Whispers at the Gate',
    text: 'A merchant pulls you aside at the market square, glancing over his shoulder. "My lord, there are men camped beyond the treeline — smugglers. They carry salt, iron, and cloth at half the guild price. Shall I arrange a meeting, or shall we report them to the watch?"',
    portraitId: 'trader',
    options: [
      { text: 'ARRANGE A DEAL', effects: { gold: 10, authority: -1 } },
      { text: 'REPORT TO WATCH', effects: { satisfaction: 1, gold: -5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_DEAL', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_REPORT', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_SMUGGLER_DEAL',
    chainId: 'smugglers_offer',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'The Midnight Exchange',
    text: 'The smugglers delivered as promised — crates of goods now sit in your storehouse. But a guard on night patrol noticed the wagons. He stands before you, uncertain. "My lord, I saw unmarked carts at the south gate. Should I... forget what I saw?"',
    portraitId: 'trader',
    options: [
      { text: 'HIDE THE GOODS', effects: { fireRisk: 2, gold: 5 } },
      { text: 'RETURN EVERYTHING', effects: { gold: -10, satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_CAUGHT', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_SMUGGLER_REPORT',
    chainId: 'smugglers_offer',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Justice at the Treeline',
    text: 'Your watchmen tracked the smugglers to their camp and confronted them. The leader, a scarred man called Dettmer, spat at your guards but surrendered without a fight. "You could have profited, lord. Instead you chose the hard road." What do you do with the prisoners?',
    portraitId: 'advisor',
    options: [
      { text: 'ARREST THEM', effects: { authority: 2, satisfaction: -1 } },
      { text: 'DRIVE THEM OFF', effects: { satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_SMUGGLER_CAUGHT',
    chainId: 'smugglers_offer',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'A Council Inquiry',
    text: 'Word has reached the village council about the unmarked goods. A council member stands before you with a ledger. "My lord, there are discrepancies in the storehouse inventory. The people deserve an explanation."',
    portraitId: 'noble',
    options: [
      { text: 'PAY A FINE', effects: { gold: -15, authority: -1 } },
      { text: 'BLAME THE MERCHANT', effects: { satisfaction: -2, authority: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_SMUGGLER_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_SMUGGLER_END',
    chainId: 'smugglers_offer',
    chainRole: 'end',
    chainRestartCooldownTicks: 35,
    canTriggerRandomly: false,
    title: 'The Dust Settles',
    text: 'The smuggler affair fades from memory as new concerns take hold. Your storehouse is stocked — or not — and the village moves on. Lessons were learned about the cost of shortcuts.',
    portraitId: 'advisor',
    options: [
      { text: 'TIGHTEN PATROLS', effects: { gold: -5, fireRisk: -3 } },
      { text: 'OPEN MARKETS WIDER', effects: { gold: 5, satisfaction: 2 } },
    ],
  },
];
