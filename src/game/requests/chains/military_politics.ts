import type { Request } from '../../models';

  // ── Military: Politics Chain ──────────────────────────────────────────

export const militaryPoliticsChainDefs: Request[] = [
  {
    id: 'CHAIN_MILITARY_POLITICS_START',
    chainId: 'military_politics',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['district:military_complete'],
    portraitId: 'guard',
    title: 'The Captain\'s Ambition',
    text: 'The guard captain, emboldened by the military district\'s strength, quietly suggests that military leadership should have more influence over village governance. His loyal soldiers nod in agreement. This smells of a power play.',
    options: [
      { text: 'HEAR HIM OUT', effects: { authority: -1, landForces: 1 } },
      { text: 'SHUT IT DOWN IMMEDIATELY', effects: { authority: 2, landForces: -2 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_POLITICS_SCHEME', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_POLITICS_SCHEME', weight: 1 }] },
    ],
  },

  {
    id: 'CHAIN_MILITARY_POLITICS_SCHEME',
    chainId: 'military_politics',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'guard',
    title: 'Political Maneuvering',
    text: 'The captain has been making promises to villagers — protection in exchange for political support. Some see him as a strong leader; others fear a military coup. Your spy reports he has allies among the guard, but the common folk remain loyal to you.',
    options: [
      { text: 'OFFER HIM A FORMAL ROLE', effects: { landForces: 2, authority: -2, satisfaction: 1 } },
      { text: 'REASSIGN HIM TO THE FRONTIER', effects: { authority: 2, landForces: -1, satisfaction: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_POLITICS_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_POLITICS_END', weight: 1 }] },
    ],
  },

  {
    id: 'CHAIN_MILITARY_POLITICS_END',
    chainId: 'military_politics',
    chainRole: 'end',
    chainRestartCooldownTicks: 60,
    canTriggerRandomly: false,
    portraitId: 'guard',
    title: 'Power Resolved',
    text: 'The military-political crisis reaches its climax. The captain stands before you and the assembled village, awaiting judgment. You can either integrate military leadership into governance or reaffirm civilian supremacy once and for all.',
    options: [
      { text: 'CREATE A MILITARY COUNCIL', effects: { landForces: 3, authority: -3, satisfaction: 2 } },
      { text: 'REAFFIRM CIVILIAN RULE', effects: { authority: 4, landForces: -2, satisfaction: -1 } },
    ],
  },
];
