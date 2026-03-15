import type { Request } from '../../models';

  // =========================================================
  // CHAIN 15 – Deserter's Dilemma (Mid, 7 requests)
  // Soldiers desert and the player must choose justice or mercy.
  // Fork pattern: START → HUNT / PARDON → distinct endings.
  // =========================================================
export const desertersChainDefs: Request[] = [
  {
    id: 'CHAIN_DESERTER_START',
    chainId: 'deserters',
    chainRole: 'start',
    title: 'Empty Bunks',
    text: 'Your military advisor strides into the hall with a grim expression. "My lord, six soldiers slipped out of the barracks last night. They took weapons, rations, and a mule. Tracks lead south into the marshes. Desertion — plain and simple." He pauses. "Do we hunt them, or let word spread that we forgive cowardice?"',
    portraitId: 'military_advisor',
    options: [
      { text: 'HUNT THEM DOWN', effects: { gold: -5, authority: 1 } },
      { text: 'OFFER PARDON', effects: { authority: -2, satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_DESERTER_HUNT', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_DESERTER_PARDON', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_DESERTER_HUNT',
    chainId: 'deserters',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Tracks in the Marsh',
    text: 'Your scouts locate the deserters in an abandoned woodcutter\'s cabin near the marsh. They have barricaded the door and are armed. Your military advisor studies the position. "We can storm them — it will be quick but bloody. Or we can call out terms and try to talk them back."',
    portraitId: 'military_advisor',
    combat: {
      enemyForces: 4,
      prepDelayMinTicks: 1,
      prepDelayMaxTicks: 2,
      onWin: { authority: 2 },
      onLose: { satisfaction: -2, authority: -1 },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_DESERTER_CAPTURED', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_DESERTER_CAPTURED', weight: 1 }],
        },
      ],
    },
    options: [
      { text: 'STORM THE CABIN', effects: {} },
      { text: 'NEGOTIATE SURRENDER', effects: { gold: -10, satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_DESERTER_END_JUSTICE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_DESERTER_CAPTURED',
    chainId: 'deserters',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'The Prisoners',
    text: 'The deserters are brought back in chains, bruised and silent. The village watches as they are marched through the gate. Your military advisor waits for your judgment. "The men await sentencing, my lord. A harsh example, or measured justice?"',
    portraitId: 'military_advisor',
    options: [
      { text: 'HARSH PUNISHMENT', effects: { authority: 2, satisfaction: -2 } },
      { text: 'FAIR TRIAL', effects: { gold: -5, satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_DESERTER_END_JUSTICE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_DESERTER_END_JUSTICE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_DESERTER_PARDON',
    chainId: 'deserters',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'The Pardon Proclaimed',
    text: 'Word of the pardon spreads. Within days, four of the six deserters slink back through the gate, heads bowed. But the remaining two are nowhere to be seen. The returned soldiers look thin and ashamed. A farmer\'s wife spits at them. Your advisor asks, "How shall we receive them, my lord?"',
    portraitId: 'farmer',
    options: [
      { text: 'PROMISE BETTER CONDITIONS', effects: { gold: -10, satisfaction: 2 } },
      { text: 'SET A DEADLINE FOR OTHERS', effects: { authority: 1, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_DESERTER_REINTEGRATE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_DESERTER_REINTEGRATE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_DESERTER_REINTEGRATE',
    chainId: 'deserters',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'New Beginnings',
    text: 'The pardoned soldiers stand before you, waiting for assignment. Some are farmers\' sons who never wanted to fight. Others were veterans who simply broke under the weight of endless duty. Your advisor lays out two paths: send them to the fields, or back to the barracks.',
    portraitId: 'advisor',
    options: [
      { text: 'ASSIGN TO FARMS', effects: { farmers: 3, satisfaction: 1 } },
      { text: 'RETURN TO MILITIA', effects: { landForces: 3, authority: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_DESERTER_END_MERCY', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_DESERTER_END_MERCY', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_DESERTER_END_JUSTICE',
    chainId: 'deserters',
    chainRole: 'end',
    chainRestartCooldownTicks: 45,
    canTriggerRandomly: false,
    title: 'Order Restored',
    text: 'The deserter affair is settled. Whether by blade or by law, the message is clear: duty is not optional. The remaining soldiers stand straighter at their posts, and the village watches with a mix of fear and respect.',
    portraitId: 'military_advisor',
    options: [
      { text: 'MAKE AN EXAMPLE', effects: { authority: 3, satisfaction: -3 } },
      { text: 'SHOW RESTRAINT', effects: { satisfaction: 2, authority: 1 } },
    ],
  },

  {
    id: 'CHAIN_DESERTER_END_MERCY',
    chainId: 'deserters',
    chainRole: 'end',
    chainRestartCooldownTicks: 45,
    canTriggerRandomly: false,
    title: 'The Village Whole',
    text: 'The pardoned men have settled into their new roles. Some till the fields with renewed purpose; others stand guard with a quieter resolve. The village is whole again — not because of punishment, but because of a second chance.',
    portraitId: 'advisor',
    options: [
      { text: 'CELEBRATE UNITY', effects: { satisfaction: 3, gold: -5 } },
      { text: 'INVEST IN TRAINING', effects: { landForces: 2, gold: -10 } },
    ],
  },
];
