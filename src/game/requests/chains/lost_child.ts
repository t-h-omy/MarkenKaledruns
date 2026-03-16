import type { Request } from '../../models';

  // =========================================================
  // CHAIN 13 – The Lost Child (Small, 4 requests)
  // A child goes missing and the village must respond.
  // Diamond pattern: START → SEARCH / WAIT → END
  // =========================================================
export const lostChildChainDefs: Request[] = [
  {
    id: 'CHAIN_LOST_CHILD_START',
    chainId: 'lost_child',
    chainRole: 'start',
    title: 'A Child Gone Missing',
    text: 'A farmer bursts into the hall, breathless and wild-eyed. "My lord, my daughter — she was playing near the forest edge and never came home! The sun is setting and wolves howl in those woods at night. Please, you must help!"',
    portraitId: 'children',
    options: [
      { text: 'SEND SEARCH PARTY', effects: { gold: -5, farmers: -3 } },
      { text: 'WAIT UNTIL DAWN', effects: { satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_LOST_CHILD_SEARCH', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_LOST_CHILD_WAIT', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_LOST_CHILD_SEARCH',
    chainId: 'lost_child',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Into the Dark Woods',
    text: 'Your search party pushes deeper into the forest with torches held high. They find small footprints near a stream, heading toward the old ruins. The trail is fresh but the woods grow thick. Press on, or set up camp and call out?',
    portraitId: 'scout',
    options: [
      { text: 'PRESS DEEPER', effects: { health: -1, gold: -5 } },
      { text: 'CAMP AND CALL OUT', effects: { satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_LOST_CHILD_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_LOST_CHILD_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_LOST_CHILD_WAIT',
    chainId: 'lost_child',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'A Long Night',
    text: 'The village holds its breath through the night. The father paces by the gate, refusing food or rest. At first light, your advisor approaches. "My lord, we could light bonfires at the forest edge to guide the child home — though the fire risk concerns me. Or we continue to wait and trust in providence."',
    portraitId: 'scout',
    options: [
      { text: 'LIGHT BONFIRES', effects: { fireRisk: 3, gold: -5 } },
      { text: 'KEEP WAITING', effects: { satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_LOST_CHILD_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_LOST_CHILD_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_LOST_CHILD_END',
    chainId: 'lost_child',
    chainRole: 'end',
    chainRestartCooldownTicks: 25,
    canTriggerRandomly: false,
    title: 'Found',
    text: 'The child is found — muddy, frightened, but alive — huddled beneath a fallen oak. The father weeps with relief as he carries her home. The village gathers around them, and for a moment, the hardships of frontier life feel lighter.',
    portraitId: 'children',
    options: [
      { text: 'CELEBRATE', effects: { satisfaction: 3, gold: -5 } },
      { text: 'POST FOREST WATCH', effects: { authority: 2, gold: -10 } },
    ],
  },
];
