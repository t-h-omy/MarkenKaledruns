import type { Request } from '../../models';

  // ── Garrison Core Chain ───────────────────────────────────────────────

export const garrisonCoreChainDefs: Request[] = [
  {
    id: 'CHAIN_GARRISON_CORE_START',
    chainId: 'garrison_core',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['building:garrison'],
    portraitId: 'guard',
    title: 'Guard Demands',
    text: 'The garrison guards line up before you, their sergeant at the front. They demand better equipment — proper steel instead of rusted hand-me-downs. Morale is low and desertions loom if their plea goes unanswered.',
    options: [
      { text: 'FUND NEW EQUIPMENT', effects: { gold: -5, landForces: 3 } },
      { text: 'DENY THE REQUEST', effects: { gold: 2, landForces: -2 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_GARRISON_CORE_TENSION', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_GARRISON_CORE_TENSION', weight: 1 }] },
    ],
  },

  {
    id: 'CHAIN_GARRISON_CORE_TENSION',
    chainId: 'garrison_core',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'guard',
    title: 'Discipline Erodes',
    text: 'Tension festers in the barracks. Two guards were caught brawling over rations, and the night watch has grown lax. The sergeant warns that without intervention, the garrison could become more threat than protection.',
    options: [
      { text: 'ENFORCE STRICT DISCIPLINE', effects: { authority: 2, satisfaction: -2 } },
      { text: 'OFFER BETTER CONDITIONS', effects: { gold: -3, satisfaction: 2 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_GARRISON_CORE_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_GARRISON_CORE_END', weight: 1 }] },
    ],
  },

  {
    id: 'CHAIN_GARRISON_CORE_END',
    chainId: 'garrison_core',
    chainRole: 'end',
    chainRestartCooldownTicks: 55,
    canTriggerRandomly: false,
    portraitId: 'guard',
    title: 'Order Restored',
    text: 'The garrison crisis comes to a head. The sergeant proposes either a formal military code with harsh punishments, or a soldier\'s council that gives the guards a voice. The choice will define the garrison\'s character for seasons to come.',
    options: [
      { text: 'ESTABLISH THE CODE', effects: { authority: 3, landForces: 2, satisfaction: -2 } },
      { text: 'FORM THE COUNCIL', effects: { satisfaction: 3, landForces: 1, authority: -2 } },
    ],
  },
];
