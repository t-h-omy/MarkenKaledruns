import type { Request } from '../../models';

  // =========================================================
  // CHAIN – The Last Verse
  // S-size, Tavern required
  // Mechanics: authority follow-up boosts, 1 probabilistic follow-up
  // =========================================================
export const lastVerseChainDefs: Request[] = [
  {
    id: 'CHAIN_LAST_VERSE_START',
    chainId: 'last_verse',
    chainRole: 'start',
    canTriggerRandomly: true,
    requires: ['building:tavern'],
    title: 'The Last Verse',
    text: 'Thornhild, the tavern singer, is rousing the room with a mocking song about your taxman. The crowd is enjoying it, and everyone is watching to see whether you crush the insult or let the complaint stand.',
    portraitId: 'bard',
    options: [
      {
        text: 'SEIZE THE ROOM',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
          followUpBoosts: [
            {
              targetRequestId: 'CHAIN_LAST_VERSE_COOLS',
              boostType: 'stepped',
              boostValue: 2,
              steps: 3,
              description: 'Increases chance the room cools',
            },
          ],
        },
      },
      {
        text: 'LET IT SPREAD',
        effects: {
          satisfaction: 1,
          authority: -1,
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [
          { requestId: 'CHAIN_LAST_VERSE_COOLS', weight: 1 },
          { requestId: 'CHAIN_LAST_VERSE_BOILS', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_LAST_VERSE_TAKES_HOLD', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_LAST_VERSE_COOLS',
    chainId: 'last_verse',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Cup Lowered',
    text: 'Thornhild lowers her cup. Even the benches stop creaking. "A hearing," she says. "Nothing more."',
    portraitId: 'bard',
    options: [
      {
        text: 'GRANT IT',
        effects: {
          satisfaction: 1,
          authority: -1,
        },
      },
      {
        text: 'BAN THE SONG',
        effects: {
          authority: 1,
          satisfaction: -1,
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_LAST_VERSE_END_PETITION', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_LAST_VERSE_END_SILENCE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_LAST_VERSE_BOILS',
    chainId: 'last_verse',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Room with Teeth',
    text: 'A mug breaks by the hearth. Someone takes up the chorus outside. Now the room has teeth.',
    portraitId: 'bard',
    options: [
      {
        text: 'BUY A ROUND',
        effects: {
          gold: -10,
          satisfaction: 2,
        },
      },
      {
        text: 'SEND GUARDS',
        effects: {
          health: -1,
          authority: 1,
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_LAST_VERSE_END_PETITION', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_LAST_VERSE_END_SILENCE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_LAST_VERSE_TAKES_HOLD',
    chainId: 'last_verse',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Refrain in the Shutters',
    text: 'By midnight even the shutters know the refrain. Your taxman does not come near the door.',
    portraitId: 'bard',
    options: [
      {
        text: 'CUT THE LEVY',
        effects: {
          gold: -15,
          satisfaction: 2,
        },
      },
      {
        text: 'MAKE EXAMPLE',
        effects: {
          authority: 2,
          satisfaction: -2,
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_LAST_VERSE_END_PETITION', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_LAST_VERSE_END_SILENCE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_LAST_VERSE_END_PETITION',
    chainId: 'last_verse',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 30,
    title: 'Song to Petition',
    text: 'The verse leaves the rafters and reaches your hall in ink. Complaint gains names and weight.',
    portraitId: 'bard',
    options: [
      {
        text: 'HEAR THEM',
        effects: {
          satisfaction: 2,
          authority: -1,
        },
      },
      {
        text: 'TRIM TAX',
        effects: {
          gold: -10,
          satisfaction: 1,
        },
      },
    ],
  },

  {
    id: 'CHAIN_LAST_VERSE_END_SILENCE',
    chainId: 'last_verse',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 30,
    title: 'Quiet Bought',
    text: 'The room goes quiet when you enter. It is not respect. Even the hearth seems to listen.',
    portraitId: 'bard',
    options: [
      {
        text: 'PAY DAMAGES',
        effects: {
          gold: -8,
          satisfaction: 1,
        },
      },
      {
        text: 'POST A REEVE',
        effects: {
          authority: 2,
          gold: -5,
        },
      },
    ],
  },
];
