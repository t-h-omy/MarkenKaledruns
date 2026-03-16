import type { Request } from '../../models';

  // =========================================================
  // CHAIN 6 – Disease Rumor
  // Mechanics: option followUps, weighted candidates,
  //            global crisis priority via health < 30
  // =========================================================
export const diseaseRumorChainDefs: Request[] = [
  {
    id: 'CHAIN_DISEASE_RUMOR_START',
    chainId: 'disease_rumor',
    chainRole: 'start',
    title: 'Feverish Whispers',
    text: 'A peddler collapses at the gate, shivering with fever. The village healer warns that an unknown sickness may already be spreading among the traders\' carts.',
    canTriggerRandomly: true,
    portraitId: 'healer',
    options: [
      { text: 'QUARANTINE EARLY', effects: { gold: -8, satisfaction: -2 } },
      { text: 'WAIT', effects: { } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_DISEASE_CONTAINED', weight: 3 },
          { requestId: 'CHAIN_DISEASE_SPREADS', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_DISEASE_SPREADS', weight: 3 },
          { requestId: 'CHAIN_DISEASE_FALSE_ALARM', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_DISEASE_CONTAINED',
    chainId: 'disease_rumor',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Quarantine Holds',
    text: 'Your swift action paid off. The sick have been isolated and the village healer reports no new cases. The people praise your foresight.',
    portraitId: 'healer',
    options: [
      { text: 'AS IT SHOULD BE', effects: { health: 3, authority: 1 } },
      { text: 'IMPROVE SANITATION', effects: {gold: -10, health: 4} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_DISEASE_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_DISEASE_SPREADS',
    chainId: 'disease_rumor',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Plague Creeps In',
    text: 'The sickness has spread to several households. Coughing echoes through the streets and the healer begs for coin to set up treatment tents.',
    portraitId: 'healer',
    options: [
      { text: 'SET UP HEALERS', effects: { gold: -15, health: -4 } },
      { text: 'DO NOTHING', effects: { health: -5, authority: -1} },
    ],
    // If health drops below 30 from this, EVT_CRISIS_DISEASE may be triggered globally by picker.ts.
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'CHAIN_DISEASE_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_DISEASE_FALSE_ALARM',
    chainId: 'disease_rumor',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Just a Cold',
    text: 'The healer examines the last patient and shrugs. "Seasonal sniffles, nothing more." The village breathes a sigh of relief, though some grumble about the wasted panic.',
    portraitId: 'healer',
    options: [
      { text: 'WHAT A RELIEF', effects: { } },
      { text: 'SCOLD YOUR HEALER', effects: {satisfaction: -2, authority: 1} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_DISEASE_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_DISEASE_END',
    chainId: 'disease_rumor',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 140,
    title: 'The Fever Passes',
    text: 'Whether by quarantine, treatment, or simple luck, the threat of disease has faded. Life returns to normal — for now.',
    portraitId: 'healer',
    options: [
      { text: 'MOVE ON', effects: {} },
      { text: 'STOCK HERBS', effects: {gold: -10, health: 3} },
    ],
  },
];
