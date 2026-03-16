import type { Request } from '../../models';

  // ── Military: Mobilization Chain ──────────────────────────────────────

export const militaryMobilizationChainDefs: Request[] = [
  {
    id: 'CHAIN_MILITARY_MOBIL_START',
    chainId: 'military_mobilization',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['district:military_complete'],
    portraitId: 'military_advisor',
    title: 'External Threat',
    text: 'Scouts report a warband gathering beyond the hills, their numbers growing daily. Your military advisor urges full mobilization — the garrison and training yard must work in concert to prepare a defense before the enemy marches.',
    options: [
      { text: 'MOBILIZE IMMEDIATELY', effects: { landForces: 3, gold: -4, farmers: -2 } },
      { text: 'STRENGTHEN DEFENSES ONLY', effects: { gold: -2, landForces: 1, farmers: -1 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_MOBIL_CAMPAIGN', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_MOBIL_CAMPAIGN', weight: 1 }] },
    ],
  },

  {
    id: 'CHAIN_MILITARY_MOBIL_CAMPAIGN',
    chainId: 'military_mobilization',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    title: 'War Preparations',
    text: 'The village transforms into a war camp. Blacksmiths forge day and night, recruits drill until they drop, and supply wagons roll toward the front. Your advisor offers a final strategic choice before the enemy arrives.',
    options: [
      { text: 'LAUNCH A PREEMPTIVE STRIKE', effects: { landForces: -2, authority: 3, gold: -3 } },
      { text: 'DIG IN AND DEFEND', effects: { landForces: 2, satisfaction: -1, gold: -2 } },
    ],
    followUps: [
      { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_MOBIL_END', weight: 1 }] },
      { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'CHAIN_MILITARY_MOBIL_END', weight: 1 }] },
    ],
  },

  {
    id: 'CHAIN_MILITARY_MOBIL_END',
    chainId: 'military_mobilization',
    chainRole: 'end',
    chainRestartCooldownTicks: 70,
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    title: 'Campaign Outcome',
    text: 'The threat has passed — for now. Your forces held, though not without cost. The military advisor reports losses and asks how to rebuild: invest in veteran soldiers or recruit fresh blood from the farming population.',
    options: [
      { text: 'REINFORCE WITH VETERANS', effects: { gold: -5, landForces: 4, satisfaction: 1 } },
      { text: 'RECRUIT FROM THE FARMS', effects: { farmers: -3, landForces: 3, gold: -2 } },
    ],
  },
];
