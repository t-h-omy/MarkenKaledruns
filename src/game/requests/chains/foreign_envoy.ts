import type { Request } from '../../models';

  // =========================================================
  // CHAIN 14 – Foreign Envoy (Mid, 8 requests)
  // A diplomatic envoy from a neighboring realm arrives.
  // Fork pattern with two distinct paths and three endings.
  // =========================================================
export const foreignEnvoyChainDefs: Request[] = [
  {
    id: 'CHAIN_ENVOY_START',
    chainId: 'foreign_envoy',
    chainRole: 'start',
    title: 'Riders on the Road',
    text: 'A column of riders appears on the eastern road, bearing the banner of the March of Valdren — a silver stag on blue. A herald dismounts and bows. "My lords send greetings and request an audience. They wish to discuss matters of mutual benefit." Your council watches and waits for your response.',
    portraitId: 'envoy',
    options: [
      { text: 'HOST A FEAST', effects: { gold: -10, satisfaction: 1 } },
      { text: 'DENY ENTRY', effects: { authority: 1, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_ENVOY_FEAST', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_ENVOY_REBUFF', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_ENVOY_FEAST',
    chainId: 'foreign_envoy',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'The Envoy\'s Toast',
    portraitId: 'envoy',
    text: 'Wine flows and the envoy — a sharp-eyed woman called Lady Sigrun — raises her cup. "To friendship between our marches," she says. Over roasted venison, she leans closer. "But friendship requires investment, does it not? I have a proposal — hear me out before you judge."',
    options: [
      { text: 'HEAR THE PROPOSAL', effects: { gold: -5 } },
      { text: 'DEMAND GIFTS FIRST', effects: { authority: 1, gold: 5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_ENVOY_PROPOSAL', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_ENVOY_PROPOSAL', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_ENVOY_REBUFF',
    chainId: 'foreign_envoy',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'An Insult Remembered',
    text: 'The envoy\'s herald rides back to the column, face flushed. From the gate, you watch the riders confer — then the column turns not east toward home, but south toward the river crossing. Your advisor frowns. "They are heading toward our trade routes, my lord. This may not be the last we hear of Valdren."',
    portraitId: 'envoy',
    options: [
      { text: 'SEND AN APOLOGY', effects: { gold: -10, authority: -2 } },
      { text: 'LET THEM STEW', effects: { authority: 2, satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_ENVOY_TENSIONS', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_ENVOY_TENSIONS', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_ENVOY_PROPOSAL',
    chainId: 'foreign_envoy',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'The Valdren Accord',
    text: 'Lady Sigrun unrolls a parchment across the table. "Valdren proposes a trade pact: your grain and timber for our iron and horses. We would also station a small garrison at the river ford — for mutual protection, of course." The terms are generous, but the garrison clause raises eyebrows among your council.',
    portraitId: 'envoy',
    options: [
      { text: 'ACCEPT FULL TERMS', effects: { gold: -15, satisfaction: 2 } },
      { text: 'COUNTER WITHOUT GARRISON', effects: { authority: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_ENVOY_END_ALLIANCE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_ENVOY_END_TRADE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_ENVOY_TENSIONS',
    chainId: 'foreign_envoy',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Border Tensions',
    text: 'Merchants returning from the south bring troubling news. Valdren riders have been seen near your border villages, questioning farmers about grain stores and troop movements. Whether this is intimidation or preparation, the message is clear: Valdren has not forgotten.',
    portraitId: 'envoy',
    options: [
      { text: 'FORTIFY THE BORDER', effects: { gold: -15, authority: 1 } },
      { text: 'SEEK DIPLOMACY', effects: { gold: -5, satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_ENVOY_END_HOSTILE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_ENVOY_END_TRADE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_ENVOY_END_ALLIANCE',
    chainId: 'foreign_envoy',
    chainRole: 'end',
    chainRestartCooldownTicks: 50,
    canTriggerRandomly: false,
    title: 'The Silver Stag Pact',
    text: 'The Valdren Accord is signed with great ceremony. Lady Sigrun clasps your hand. "Today marks a new era for both our peoples." Iron and horses begin flowing into your settlement, and the Valdren garrison at the ford keeps the road safe. Time will tell if this friendship holds.',
    portraitId: 'envoy',
    options: [
      { text: 'CELEBRATE THE PACT', effects: { satisfaction: 4, gold: 15 } },
      { text: 'INVEST IN TRADE ROUTE', effects: { gold: -5, farmers: 4 } },
    ],
  },

  {
    id: 'CHAIN_ENVOY_END_TRADE',
    chainId: 'foreign_envoy',
    chainRole: 'end',
    chainRestartCooldownTicks: 50,
    canTriggerRandomly: false,
    title: 'A Cautious Agreement',
    text: 'After weeks of negotiation, a modest trade agreement is reached. No garrison, no grand alliance — just goods exchanged at fair prices. Your council calls it prudent. Lady Sigrun calls it disappointing. Either way, the wagons roll.',
    portraitId: 'trader',
    options: [
      { text: 'ACCEPT THE DEAL', effects: { gold: 10, satisfaction: 1 } },
      { text: 'PUSH FOR BETTER TERMS', effects: { authority: 2, gold: 5 } },
    ],
  },

  {
    id: 'CHAIN_ENVOY_END_HOSTILE',
    chainId: 'foreign_envoy',
    chainRole: 'end',
    chainRestartCooldownTicks: 50,
    canTriggerRandomly: false,
    title: 'A Cold Border',
    text: 'The Valdren riders withdraw, but the damage is done. Trade with the east has slowed to a trickle, and your border villages report sleepless nights. You have preserved your independence — but at the cost of a neighbor\'s goodwill.',
    portraitId: 'military_advisor',
    options: [
      { text: 'STRENGTHEN DEFENSES', effects: { gold: -10, landForces: 3 } },
      { text: 'SEEK OTHER ALLIES', effects: { satisfaction: -1, authority: -1 } },
    ],
  },
];
