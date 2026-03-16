import type { Request } from '../../models';

  // =========================================================
  // CHAIN 8 – Arkanat Inspector
  // Mechanics: authority boosts weights (stepped), option followUps,
  //            weighted candidates, authorityMin, advancesTick:false
  // =========================================================
export const arkanatInspectorChainDefs: Request[] = [
  {
    id: 'CHAIN_ARKANAT_INSPECTOR_START',
    chainId: 'arkanat_inspector',
    chainRole: 'start',
    authorityMin: 20,
    title: 'The Arkanat Arrives',
    text: 'A stern official from the Arkanat — the regional mage council — dismounts at your gate. He carries sealed writs and a cold expression. "I am here to audit your governance."',
    canTriggerRandomly: true,
    portraitId: 'arkanat_mage',
    options: [
      {
        text: 'ASSERT JURISDICTION',
        effects: { },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
          lossOnFailurePercent: 50,
          followUpBoosts: [
            { targetRequestId: 'CHAIN_ARKANAT_BACKS_DOWN', boostType: 'stepped', boostValue: 2, steps: 3 },
          ],
        },
      },
      { text: 'COOPERATE', effects: { authority: -1, gold: -5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_ARKANAT_BACKS_DOWN', weight: 1 },
          { requestId: 'CHAIN_ARKANAT_RETALIATES', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_ARKANAT_DEMANDS_FEES', weight: 2 },
          { requestId: 'CHAIN_ARKANAT_MUTUAL_RESPECT', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_ARKANAT_BACKS_DOWN',
    chainId: 'arkanat_inspector',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Inspector Relents',
    text: 'Faced with your firm stance and the weight of your authority, the Arkanat inspector folds his writs. "Very well. Your records appear... adequate." He mounts his horse without another word.',
    portraitId: 'arkanat_mage',
    options: [
      { text: 'SEE HIM OUT', effects: { authority: 1 } },
      { text: 'GOOD RIDDANCE', effects: { satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'CHAIN_ARKANAT_DEBRIEF', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'CHAIN_ARKANAT_DEBRIEF', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_ARKANAT_RETALIATES',
    chainId: 'arkanat_inspector',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Inspector Strikes Back',
    text: 'The inspector was not bluffing. He produces a decree stripping you of certain privileges and levies a fine. "The Arkanat does not forget defiance."',
    portraitId: 'arkanat_mage',
    options: [
      { text: 'ACCEPT THE BLOW', effects: { authority: -3, satisfaction: -2 } },
      { text: 'PROTEST', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'CHAIN_ARKANAT_DEBRIEF', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_ARKANAT_DEMANDS_FEES',
    chainId: 'arkanat_inspector',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Administrative Fees',
    text: 'The inspector smiles thinly. "Your cooperation is noted. However, administrative fees are still due." He slides a ledger across the table with an exorbitant sum circled in red.',
    portraitId: 'arkanat_mage',
    options: [
      { text: 'PAY', effects: { gold: -20 } },
      { text: 'REFUSE', effects: { authority: 1, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'CHAIN_ARKANAT_DEBRIEF', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_ARKANAT_MUTUAL_RESPECT',
    chainId: 'arkanat_inspector',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Mutual Understanding',
    text: 'Your willingness to cooperate impresses the inspector. Over ale, he shares useful information about regional trade routes and promises to speak well of you to the council.',
    portraitId: 'arkanat_mage',
    options: [
      { text: 'A GOOD OUTCOME', effects: { authority: 1 } },
      { text: 'THANK HIM', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'CHAIN_ARKANAT_DEBRIEF', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_ARKANAT_DEBRIEF',
    chainId: 'arkanat_inspector',
    chainRole: 'end',
    canTriggerRandomly: false,
    advancesTick: false,
    chainRestartCooldownTicks: 200,
    title: 'Arkanat Debrief',
    text: 'The inspector is gone. Feldric summarizes: the Arkanat will return eventually — they always do. But for now, the matter is settled.',
    portraitId: 'advisor',
    options: [
      { text: 'NOTED', effects: {} },
      { text: 'WE\'RE PREPARED', effects: {} },
    ],
  },
];
