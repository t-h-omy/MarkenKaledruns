import type { Request } from '../../models';

  // ── Training Yard Core Chain ──────────────────────────────────────────

export const trainingYardCoreChainDefs: Request[] = [
  {
    id: 'CHAIN_TRAINING_CORE_START',
    chainId: 'training_yard_core',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['building:training_yard'],
    portraitId: 'military_advisor',
    title: 'Training Accident',
    text: 'A recruit collapses during drills, badly injured by a blunted training sword that proved sharper than expected. The other recruits are shaken, and whispers of sabotage spread through the ranks.',
    options: [
      { text: 'INVESTIGATE IMMEDIATELY', effects: { authority: 1, gold: -2 } },
      { text: 'CALL IT AN ACCIDENT', effects: { satisfaction: -1, gold: 1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_TRAINING_CORE_INVESTIGATION', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_TRAINING_CORE_INVESTIGATION', weight: 1 }] },
    ],
  },

  {
    id: 'CHAIN_TRAINING_CORE_INVESTIGATION',
    chainId: 'training_yard_core',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    title: 'The Investigation',
    text: 'Your inquiry reveals the training equipment has been poorly maintained — or perhaps tampered with. A disgruntled former recruit with a grudge is the prime suspect, but the drill master also bears responsibility for lax oversight.',
    options: [
      { text: 'ARREST THE SUSPECT', effects: { authority: 2, satisfaction: -1 } },
      { text: 'REFORM TRAINING PRACTICES', effects: { gold: -3, health: 1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_TRAINING_CORE_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_TRAINING_CORE_END', weight: 1 }] },
    ],
  },

  {
    id: 'CHAIN_TRAINING_CORE_END',
    chainId: 'training_yard_core',
    chainRole: 'end',
    chainRestartCooldownTicks: 60,
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    title: 'Reforms and Consequences',
    text: 'The training yard incident concludes. The military advisor presents options: invest in proper armorer oversight and safer equipment, or push harder training despite the risks to build a stronger fighting force.',
    options: [
      { text: 'INVEST IN SAFETY', effects: { gold: -4, health: 2, satisfaction: 1 } },
      { text: 'INTENSIFY TRAINING', effects: { landForces: 3, health: -2, satisfaction: -1 } },
    ],
  },
];
