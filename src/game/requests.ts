/**
 * Request data for the Proof-of-Fun game.
 * Based on POF_SPEC.md specification.
 * Contains 5 need-requests and 69 event-requests (25 base + 44 Blackgeat chain).
 */

import type { Request } from './models';

/**
 * Need-Requests (5)
 * These requests appear when village needs are unfulfilled.
 */
export const needRequests: Request[] = [
  {
    id: 'NEED_MARKETPLACE',
    title: 'A Hub for Trade',
    text: 'The settlement is growing, and door-to-door bartering is no longer sufficient. The citizens demand a central marketplace to unlock the next tier of prosperity.',
    options: [
      {
        text: 'BUILD',
        effects: {
          gold: -20,
          marketplace: true,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          satisfaction: -5,
        },
      },
    ],
  },
  {
    id: 'NEED_BREAD',
    title: 'Essential Sustenance',
    text: 'A sophisticated village requires a stable food chain. The people are calling for an organized bakery to elevate their diet and support further growth.',
    options: [
      {
        text: 'SUPPORT BAKERY',
        effects: {
          gold: -40,
          bread: true,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          health: -8,
        },
      },
    ],
  },
  {
    id: 'NEED_BEER',
    title: 'Culture & Brewing',
    text: 'As wealth increases, so does the desire for leisure. A local brewery is now required to maintain high satisfaction and reach the next level of social standing.',
    options: [
      {
        text: 'ALLOW',
        effects: {
          gold: -70,
          beer: true,
        },
      },
      {
        text: 'FORBID',
        effects: {
          satisfaction: -15,
        },
      },
    ],
  },
  {
    id: 'NEED_FIREWOOD',
    title: 'Firewood',
    text: 'Random foraging is too inefficient for a town of this size. The population demands a professional firewood supply as a baseline standard for their homes.',
    options: [
      {
        text: 'ORGANIZE',
        effects: {
          gold: -200,
          firewood: true,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          fireRisk: 15,
        },
      },
    ],
  },
  {
    id: 'NEED_WELL',
    title: 'Sanitary Standards',
    text: "To support a denser population safely, a central well is non-negotiable. Without this hygienic upgrade, the village's expansion will stagnate.",
    options: [
      {
        text: 'BUILD',
        effects: {
          gold: -300,
          well: true,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          health: -15,
        },
      },
    ],
  },
];

/**
 * Info/System Requests (5)
 * These requests explain newly fulfilled needs and are triggered automatically
 * when a need is fulfilled for the first time (buildingCount === 1).
 * They have priority "info" and appear with 100% certainty on the tick after fulfillment.
 */
export const infoRequests: Request[] = [
  {
    id: 'INFO_NEED_MARKETPLACE',
    title: 'Marketplace Established',
    text: 'Your marketplace is now operational. As long as this need stays fulfilled, the "Market Day" event can occur, bringing new trading opportunities to your village.',
    canTriggerRandomly: false,
    advancesTick: false,
    options: [
      {
        text: 'Understood.',
        effects: {},
      },
    ],
  },
  {
    id: 'INFO_NEED_BREAD',
    title: 'Bread Production Active',
    text: 'Your bakery is now producing bread. Each tick, there is a 10% chance to gain +1 additional farmer growth, supporting population expansion.',
    canTriggerRandomly: false,
    advancesTick: false,
    options: [
      {
        text: 'Understood.',
        effects: {},
      },
    ],
  },
  {
    id: 'INFO_NEED_BEER',
    title: 'Brewery Operational',
    text: 'Beer production has begun. The "Feierabend in der Kneipe" event is now unlocked, providing satisfaction-related benefits for your villagers.',
    canTriggerRandomly: false,
    advancesTick: false,
    options: [
      {
        text: 'Understood.',
        effects: {},
      },
    ],
  },
  {
    id: 'INFO_NEED_FIREWOOD',
    title: 'Firewood Supply Organized',
    text: 'Professional firewood supply is now active. When an event increases fire risk, there is a 25% chance the increase is reduced by half, protecting your village.',
    canTriggerRandomly: false,
    advancesTick: false,
    options: [
      {
        text: 'Understood.',
        effects: {},
      },
    ],
  },
  {
    id: 'INFO_NEED_WELL',
    title: 'Central Well Constructed',
    text: 'Your well is now operational. When an event grants health, there is a 50% chance to gain +1 additional health, improving overall village wellbeing.',
    canTriggerRandomly: false,
    advancesTick: false,
    options: [
      {
        text: 'Understood.',
        effects: {},
      },
    ],
  },
];

/**
 * Event-Requests (25)
 * These are random events that occur during gameplay.
 * Organized by category: Military & security, Population & growth,
 * Crisis events, Improve stats, Worsen stats.
 */
export const eventRequests: Request[] = [
  // A) Military & security (6 events)
  {
    id: 'EVT_RECRUIT_MILITIA',
    title: 'Call to Arms',
    text: 'The borders feel thin. Should we recruit farmers into the militia to bolster defenses, even if the fields suffer from fewer hands?',
    options: [
      {
        text: 'YES',
        effects: {
          landForces: 5,
          farmers: -5,
          gold: -5,
          authority: 3,
        },
      },
      {
        text: 'NO',
        effects: {
          satisfaction: 3,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_RAID_SMALL',
    title: 'Shadows in the Woods',
    text: 'A small band of brigands has been spotted nearby. Do we drive them off by force or pay a "toll" to keep the peace?',
    combat: {
      enemyForces: 3,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        gold: 10,
        authority: 5,
      },
      onLose: {
        gold: -10,
        authority: -5,
      },
    },
    options: [
      {
        text: 'FIGHT AND ROB',
        effects: {},
      },
      {
        text: 'PAY TOLL',
        effects: {
          gold: -10,
          authority: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_RAID_LARGE',
    title: 'The War Horns',
    text: 'A massive raiding force is at the gates! Stand your ground and fight, or the intruders will bring destruction to your village.',
    combat: {
      enemyForces: 8,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        gold: 25,
        fireRisk: 12,
        authority: 10,
      },
      onLose: {
        gold: -30,
        farmers: -8,
        satisfaction: -5,
        fireRisk: 12,
        authority: -10,
      },
    },
    options: [
      {
        text: 'FIGHT',
        effects: {},
      },
      {
        text: 'SURRENDER',
        effects: {
          gold: -20,
          satisfaction: -3,
          authority: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_MILITIA_PAY',
    title: "Soldier's Due",
    text: "The militia's morale is slipping. They are demanding their seasonal wages to continue their service to the crown.",
    options: [
      {
        text: 'PAY',
        effects: {
          gold: -10,
          authority: 2,
        },
      },
      {
        text: 'REFUSE',
        effects: {
          landForces: -2,
          satisfaction: -4,
          authority: -4,
        },
      },
    ],
  },
  {
    id: 'EVT_RESTLESS_NIGHT',
    title: 'Whispers in the Dark',
    text: 'Strange noises have been reported near the storage huts. Send a patrol to investigate, or dismiss it as simple superstition?',
    options: [
      {
        text: 'PATROL',
        effects: {
          landForces: -2,
          authority: 1,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -5,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_VETERANS_LEAVE',
    title: 'The Old Guard',
    text: 'Your most experienced fighters are considering retirement. A small bonus might convince them to stay and train the new recruits.',
    options: [
      {
        text: 'COMPENSATE',
        effects: {
          gold: -15,
          authority: 3,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          landForces: -2,
        },
      },
    ],
  },

  // B) Population & growth (4 events)
  {
    id: 'EVT_NEW_FARMERS',
    title: 'Wandering Souls',
    text: 'A group of sick travelers seeks land to till. They bring labor, but their makeshift camps pose a significant fire risk to the village.',
    options: [
      {
        text: 'ALLOW',
        effects: {
          farmers: 20,
          fireRisk: 10,
          health: -8,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          satisfaction: 4,
        },
      },
    ],
  },
  {
    id: 'EVT_EMIGRATION',
    title: 'The Long Goodbye',
    text: 'Dissatisfied with current conditions, several families are packing their wagons. Will you offer concessions to keep them?',
    options: [
      {
        text: 'CONCEDE',
        effects: {
          gold: -15,
          satisfaction: 4,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_BIG_FAMILY',
    title: 'A Growing House',
    text: "A local family struggles to feed their many children. They've come to you for a small charitable gift to get through the month.",
    options: [
      {
        text: 'HELP',
        effects: {
          gold: -5,
          satisfaction: 5,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          satisfaction: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_HARVEST_HELPERS',
    title: 'The Golden Fields',
    text: 'The crops are ripening all at once. Hiring seasonal helpers could save the harvest before the autumn rains arrive.',
    options: [
      {
        text: 'HIRE',
        effects: {
          gold: -10,
          farmers: 5,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          health: -5,
        },
      },
    ],
  },

  // C) Crisis events (3 events) - triggered by selection rules
  {
    id: 'EVT_CRISIS_UNREST',
    title: 'Unrest Escalates',
    text: "Warning: Low Satisfaction! The people's anger has reached a breaking point. You must act now to appease the crowd or face a total revolt.",
    options: [
      {
        text: 'CONCESSIONS',
        effects: {
          gold: -40,
          satisfaction: 20,
          authority: -5,
        },
      },
      {
        text: 'CRACK DOWN',
        effects: {
          landForces: -2,
          farmers: -10,
          authority: 5,
        },
      },
    ],
  },
  {
    id: 'EVT_CRISIS_DISEASE',
    title: 'The Pale Cough',
    text: 'Warning: Low Health! Due to poor sanitary conditions, a sickness is spreading rapidly. We must fund a healer now before the population collapses.',
    options: [
      {
        text: 'HEALER',
        effects: {
          gold: -40,
          health: 20,
          authority: 3,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -15,
          authority: -8,
        },
      },
    ],
  },
  {
    id: 'EVT_CRISIS_FIRE',
    title: 'The Ember Alert',
    text: 'Warning: High Fire Risk! Neglect has made the village a tinderbox. A single spark could be fatal. We must implement emergency fire safety measures immediately.',
    options: [
      {
        text: 'PREPARE',
        effects: {
          gold: -40,
          fireRisk: -20,
          authority: 3,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          farmers: -10,
          health: -5,
          authority: -8,
        },
      },
    ],
  },

  // D) Improve stats (6 events)
  {
    id: 'EVT_FIRE_WATCH',
    title: 'The High Tower',
    text: 'An architect proposes a watchtower to spot fires early. It is a wise investment in the long-term safety of the settlement.',
    options: [
      {
        text: 'BUILD',
        effects: {
          landForces: -1,
          fireRisk: -6,
        },
      },
      {
        text: 'DECLINE',
        effects: {},
      },
    ],
  },
  {
    id: 'EVT_VILLAGE_FESTIVAL',
    title: 'Summer Solstice',
    text: "Organizing a grand festival with music and food would greatly strengthen the community's spirit.",
    options: [
      {
        text: 'HOLD',
        effects: {
          gold: -10,
          satisfaction: 6,
          authority: 2,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          authority: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_MEDICAL_HERBS',
    title: 'The Traveling Apothecary',
    text: 'A merchant offers a rare shipment of medicinal herbs. These could significantly boost the overall health of the village.',
    options: [
      {
        text: 'BUY',
        effects: {
          gold: -10,
          health: 6,
          authority: 2,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          authority: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_TRAIN_MILITIA',
    title: 'Drill Practice',
    text: 'A retired captain offers to drill your troops. This would make your defense forces much more formidable for future raids.',
    options: [
      {
        text: 'TRAIN',
        effects: {
          gold: -15,
          landForces: 5,
          authority: 3,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          authority: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_CLEAN_STORAGE',
    title: 'Spring Cleaning',
    text: 'The granaries are cluttered with old straw and debris. A deep clean would reduce the risk of accidental fires.',
    options: [
      {
        text: 'ORGANIZE',
        effects: {
          gold: -10,
          fireRisk: -6,
          authority: 1,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          authority: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_TAX_REFORM',
    title: 'The Royal Ledger',
    text: 'Balancing the books: Do you lower taxes to win favor, or raise them to fill the treasury for upcoming hardships?',
    options: [
      {
        text: 'LOWER taxes',
        effects: {
          gold: -15,
          satisfaction: 6,
          authority: -2,
        },
      },
      {
        text: 'RAISE taxes',
        effects: {
          gold: 25,
          satisfaction: -6,
          authority: 4,
        },
      },
    ],
  },

  // E) Worsen stats (6 events)
  {
    id: 'EVT_FOREST_FIRE',
    title: 'Smoke on the Horizon',
    text: "A nearby forest fire threatens the outskirts. If we don't send help to contain it, the winds may bring the disaster to our door.",
    options: [
      {
        text: 'FIGHT',
        effects: {
          health: -5,
          farmers: -2,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          fireRisk: 10,
        },
      },
    ],
  },
  {
    id: 'EVT_PLAGUE',
    title: 'The Black Flag',
    text: 'A plague is ravaging the next town over. Should we enforce a strict, unpopular quarantine or hope the winds of fate are kind?',
    options: [
      {
        text: 'QUARANTINE',
        effects: {
          satisfaction: -5,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          health: -8,
        },
      },
    ],
  },
  {
    id: 'EVT_THEFTS',
    title: 'Sticky Fingers',
    text: 'Marketplace thefts are on the rise. More guards would stop the loss of gold, but they are needed elsewhere for defense.',
    options: [
      {
        text: 'MORE GUARDS',
        effects: {
          landForces: -2,
          satisfaction: 4,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          gold: -15,
        },
      },
    ],
  },
  {
    id: 'EVT_BAD_HARVEST',
    title: 'The Blighted Crop',
    text: 'An early frost has ruined the crops. The people are hungry — will the crown step in to provide compensation and food?',
    options: [
      {
        text: 'COMPENSATE',
        effects: {
          gold: -15,
          health: 4
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          satisfaction: -4,
          farmers: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_FIREWOOD_WET',
    title: 'Damp Spirits',
    text: 'The firewood supply got soaked in a storm. We must buy replacements immediately or face a cold and dangerous winter.',
    options: [
      {
        text: 'REPLACE',
        effects: {
          gold: -10,
          satisfaction: 4
        },
      },
      {
        text: 'IGNORE',
        effects: {
          fireRisk: 6,
          health: -4,
        },
      },
    ],
  },
  {
    id: 'EVT_FARMERS_QUARREL',
    title: 'The Fence Dispute',
    text: 'Two farmers are quarreling over a boundary line. A moment of your time could settle this before it turns into a local feud.',
    options: [
      {
        text: 'MEDIATE',
        effects: {
          gold: -10,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -3,
        },
      },
    ],
  },
  // Test event with follow-ups to demonstrate branching event chains
  {
    id: 'EVT_MYSTERIOUS_TRAVELER',
    title: 'The Mysterious Traveler',
    text: 'A hooded traveler arrives at your gates, offering to share valuable knowledge in exchange for hospitality. Do you welcome them or send them away?',
    options: [
      {
        text: 'WELCOME',
        effects: {
          gold: -5,
          satisfaction: 2,
        },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 30,
          threshold: 0,
          refundOnSuccessPercent: 100,
          followUpBoosts: [
            {
              targetRequestId: 'EVT_TRAVELER_TEACHES',
              boostType: 'linear',
              boostValue: 2,
              description: 'Increases chance traveler shares knowledge',
            },
          ],
        },
      },
      {
        text: 'SEND AWAY',
        effects: {
          satisfaction: -2,
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0, // WELCOME
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [
          { requestId: 'EVT_TRAVELER_TEACHES', weight: 3 },
          { requestId: 'EVT_TRAVELER_BETRAYS', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1, // SEND AWAY
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'EVT_TRAVELER_CURSE', weight: 2 },
          { requestId: 'EVT_TRAVELER_RETURNS', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'EVT_TRAVELER_TEACHES',
    title: 'Ancient Wisdom',
    text: 'The traveler shares agricultural techniques from distant lands. Your farmers are eager to learn these new methods.',
    canTriggerRandomly: false,
    options: [
      {
        text: 'ADOPT METHODS',
        effects: {
          farmers: 8,
          health: 5,
        },
      },
      {
        text: 'STICK TO TRADITION',
        effects: {
          satisfaction: 3,
        },
      },
    ],
  },
  {
    id: 'EVT_TRAVELER_BETRAYS',
    title: 'Betrayal in the Night',
    text: 'The traveler was a spy! They have stolen gold and fled into the darkness.',
    canTriggerRandomly: false,
    combat: {
      enemyForces: 3,
      prepDelayMinTicks: 8,
      prepDelayMaxTicks: 10,
      onWin: {
        satisfaction: 2,
      },
      onLose: {
        gold: -20,
      },
    },
    options: [
      {
        text: 'LONG PURSUE',
        effects: {
        },
      },
      {
        text: 'LET THEM GO',
        effects: {
          gold: -20,
        },
      },
    ],
  },
  {
    id: 'EVT_TRAVELER_CURSE',
    title: 'The Curse',
    text: 'Strange misfortunes have befallen the village since turning away the traveler. Some whisper of a curse.',
    canTriggerRandomly: false,
    options: [
      {
        text: 'SEEK HEALER',
        effects: {
          gold: -15,
        },
      },
      {
        text: 'IGNORE SUPERSTITION',
        effects: {
          health: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_TRAVELER_RETURNS',
    title: 'The Traveler Returns',
    text: 'The traveler returns with a merchant caravan, offering trade opportunities despite your previous rejection.',
    canTriggerRandomly: false,
    options: [
      {
        text: 'TRADE',
        effects: {
          gold: 10,
          satisfaction: 5,
        },
      },
      {
        text: 'REFUSE AGAIN',
        effects: {
          satisfaction: -1,
        },
      },
    ],
  },

  // =========================================================
  // BLACKGEAT CHAIN - The Black March
  // =========================================================
  // CHAIN START
  {
    id: 'CHAIN_BLACKGEAT_START',
    title: 'The Black March',
    text: 'Brimwulf, envoy of the County of Wulfham, introduces himself: "The Sigilmark of Blackgeat is raising troops. Join forces with us - only together can we defeat them."',
    chainId: 'BLACKGEAT',
    chainRole: 'start',
    chainRestartCooldownTicks: 100,
    options: [
      { text: 'ALLY WITH WULFHAM', effects: {} },
      { text: 'REFUSE', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_PREP_FELDRIC', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_WULFHAM_FALLS', weight: 3 },
          { requestId: 'CHAIN_BLACKGEAT_WULFHAM_TURNS', weight: 2 },
        ],
      },
    ],
  },

  // ALLY PATH (WULFHAM)
  {
    id: 'CHAIN_BLACKGEAT_PREP_FELDRIC',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Feldric\'s Counsel',
    text: 'Feldric your Marshal bows. "About Brimwulf\'s alliance request: if we accept, we need to ready our troops."',
    canTriggerRandomly: false,
    options: [
      { text: 'UPGRADE ARMS', effects: { gold: -10, landForces: 6 } },
      { text: 'MARCH NOW', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 10,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_PREP_FELDRIC', weight: 2 },
          { requestId: 'CHAIN_BLACKGEAT_BATTLE_GRAYFORD', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_BATTLE_GRAYFORD', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_BATTLE_GRAYFORD',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Battle at Aescweald',
    text: 'Blackgeat\'s banners crest the ridge — the battle Brimwulf came to you for. Feldric\'s voice stays calm: "Hold. Then strike." Brimwulf\'s men lock shields beside yours.',
    canTriggerRandomly: false,
    combat: {
      enemyForces: 6,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        satisfaction: 2,
      },
      onLose: {
        satisfaction: -3,
      },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 5,
          delayMaxTicks: 10,
          candidates: [{ requestId: 'CHAIN_BLACKGEAT_AFTER_BATTLE_STATE', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 5,
          delayMaxTicks: 10,
          candidates: [{ requestId: 'CHAIN_BLACKGEAT_AFTER_BATTLE_STATE', weight: 1 }],
        },
      ],
    },
    options: [
      { text: 'HOLD THE LINE', effects: {} },
      { text: 'RETREAT NOW', effects: { satisfaction: -2 } },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_AFTER_BATTLE_STATE',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Aescweald Aftermath',
    text: 'This is the aftermath of the Aescweald battle. Blackgeat pulls back in good order. Brimwulf watches the wounded, already thinking about what Wulfham can demand next.',
    canTriggerRandomly: false,
    options: [
      { text: 'TEND THE WOUNDED', effects: { health: 4 } },
      { text: 'FORTIFY THE BORDER', effects: { landForces: 5, gold: -10 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 10,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_WULFHAM_LOYAL', weight: 3 },
          { requestId: 'CHAIN_BLACKGEAT_WULFHAM_EXTORT_1', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 10,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_WULFHAM_LOYAL', weight: 3 },
          { requestId: 'CHAIN_BLACKGEAT_WULFHAM_EXTORT_1', weight: 2 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_LOYAL',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Good Allies',
    text: 'Brimwulf returns after the Battle of Aescweald. "Wulfham remembers who stood with us. We will not forget." Feldric mutters, "Blackgeat will come back — count on it."',
    canTriggerRandomly: false,
    options: [
      { text: 'CONSOLIDATE', effects: { satisfaction: 5 } },
      { text: 'PRESS THE ADVANTAGE', effects: { gold: 30 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 6,
        delayMaxTicks: 10,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_HRYCGWULF_OFFER', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_HRYCGWULF_OFFER', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_HRYCGWULF_OFFER',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Hrycgwulf\'s Message',
    text: 'Following the Aescweald battle, Hrycgwulf of Blackgeat arrives with a message. "You are capable. Pay a border tribute and we turn our army elsewhere." Feldric adds quietly, "This is their next move after Aescweald."',
    canTriggerRandomly: false,
    options: [
      { text: 'PAY ONCE', effects: { gold: -20, satisfaction: -1 } },
      { text: 'REFUSE', effects: { satisfaction: 2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_LOYAL_END', weight: 3 },
          { requestId: 'CHAIN_BLACKGEAT_TRIBUTE_ESCALATE', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_LOYAL_END', weight: 1 },
          { requestId: 'CHAIN_BLACKGEAT_TRIBUTE_ESCALATE', weight: 3 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_ESCALATE',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'The Second Demand',
    text: 'This is the second demand after Hrycgwulf\'s first tribute request. Hrycgwulf stays polite. "Tribute is not punishment. It is safety." Feldric spits, "It\'s a leash."',
    canTriggerRandomly: false,
    options: [
      { text: 'PAY AGAIN', effects: { gold: -10, satisfaction: -2 } },
      { text: 'PREPARE FOR WAR', effects: { landForces: 5, gold: -10 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 6,
        delayMaxTicks: 10,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_LOYAL_END', weight: 2 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_BATTLE', weight: 2 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_LOYAL_END',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    title: 'A Hard-Won Quiet',
    text: 'After the tribute talks and threats, the border holds—for now. Brimwulf\'s riders patrol beside yours. Feldric\'s last words: "This quiet came from the Blackgeat situation. It won\'t stay quiet forever."',
    canTriggerRandomly: false,
    options: [
      { text: 'TEND TO THE WOUNDED', effects: { health: 5 } },
      { text: 'SPEAK TO YOUR PEOPLE', effects: { satisfaction: 5 } },
    ],
  },
  
  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_BATTLE',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'The Battle for Freedom',
    text: 'Hrycgwulf grows impatient with your stalling. The Blackgeat banners appear on the horizon. Feldric draws his blade: "What shall we do, Mylord?"',
    canTriggerRandomly: false,
    combat: {
      enemyForces: 12,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        satisfaction: 2,
      },
      onLose: {
        satisfaction: -3,
      },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 1,
          candidates: [{ requestId: 'CHAIN_BLACKGEAT_FREEDOM_CELEBRATION', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 1,
          candidates: [{ requestId: 'CHAIN_BLACKGEAT_UNIVERSAL_RECOVERY', weight: 1 }],
        },
      ],
    },
    options: [
      { 
        text: 'STAND YOUR GROUND', 
        effects: {} 
      },
      { 
        text: 'PAY TRIBUTE', 
        effects: { 
          gold: -25,
          satisfaction: -5
        } 
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_FREEDOM_CELEBRATION',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    title: 'Echoes of Liberty',
    text: 'The Sigilmark Blackgeat has retreated! Against all odds, you held the line. Feldric raises a toast: "The land is ours once more, and our gold stays in our pockets. We are truly free."',
    canTriggerRandomly: false,
    options: [
      { 
        text: 'HOLD A GRAND FEAST', 
        effects: { satisfaction: 8, health: 6 } 
      },
      { 
        text: 'REBUILD THE BORDER', 
        effects: { gold: -10, landForces: 10, fireRisk: -10 } 
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_UNIVERSAL_RECOVERY',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    title: 'Picking Up the Pieces',
    text: 'The shadow of Blackgeat finally recedes, leaving behind a weary but resilient village. The conflict is lost, but it is over now. It is time to look toward the future.',
    canTriggerRandomly: false,
    options: [
      { 
        text: 'FOCUS ON RECOVERY', 
        effects: { health: 4, satisfaction: 3 } 
      },
      { 
        text: 'SALVAGE THE RUINS', 
        effects: { gold: 15, fireRisk: -5 } 
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_EXTORT_1',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'The Bill Comes Due',
    text: 'After the battle of Aescweald, Brimwulf\'s smile is thin. "Wulfham shed more blood than you. Compensation is expected." Feldric whispers, "This is the hook."',
    canTriggerRandomly: false,
    options: [
      { text: 'PAY', effects: { gold: -15 } },
      { text: 'REFUSE', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WULFHAM_EXTORT_2', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WULFHAM_SHOWDOWN', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_EXTORT_2',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'More, Always More',
    text: 'Brimwulf returns again — this is the second payment demand since Aescweald. "The roads. The wagons. The widows. Pay again."',
    canTriggerRandomly: false,
    options: [
      { text: 'PAY', effects: { gold: -5 } },
      { text: 'REFUSE', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WULFHAM_THREAT', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WULFHAM_SHOWDOWN', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_THREAT',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'The Threat',
    text: 'Brimwulf stops pretending. "Coin, or Wulfham secures your lands permanently." Feldric says, "This started with Aescweald. Now it\'s extortion. Give me leave to prepare."',
    canTriggerRandomly: false,
    options: [
      { text: 'PREPARE (FELDRIC)', effects: { farmers: -5, landForces: 5 } },
      { text: 'PAY TO DELAY', effects: { gold: -10 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WULFHAM_SHOWDOWN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 10,
        delayMaxTicks: 12,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WULFHAM_SHOWDOWN', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_SHOWDOWN',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Showdown at the Border Stones',
    text: 'Weeks after the battle of Aescweald, Feldric meets Brimwulf at the border stones. "One step further," Feldric says, "and we settle this in iron."',
    canTriggerRandomly: false,
    options: [
      { text: 'STAND FIRM', effects: { landForces: -8, gold: 30 } },
      { text: 'BACK DOWN', effects: { gold: -15, farmers: -5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 7,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_EXTORT_END_BATTLE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 7,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_EXTORT_END_TRIBUTE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_EXTORT_END_BATTLE',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    title: 'A Scar, Not a Grave',
    text: 'Wulfham withdraws — you are victorious! Feldric\'s verdict: "You\'ll remember this every time an ally asks for \'help\'."',
    canTriggerRandomly: false,
    options: [
      { text: 'DEMAND GOLD', effects: { gold: 30, satisfaction: 1 } },
      { text: 'DEMAND SWORDS', effects: { landForces: 5, satisfaction: 1 } },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_EXTORT_END_TRIBUTE',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    title: 'The Hollow Peace',
    text: 'Brimwulf accepted your last payment as final. Wulfham\'s riders turn back toward their own borders. Feldric watches them go: "We have bought peace, but sold our pride."',
    canTriggerRandomly: false,
    options: [
      { text: 'RECOVER', effects: { health: 5 } },
      { text: 'REPAIR', effects: { fireRisk: -5 } },
    ],
  },

  // REFUSE PATH (WULFHAM FALLS OR TURNS)
  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_FALLS',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Wulfham Overrun',
    text: 'Because you refused Brimwulf\'s alliance request earlier, he returns in defeat. "Wulfham burns. Blackgeat\'s march turns toward you."',
    canTriggerRandomly: false,
    options: [
      { text: 'SEND LATE AID', effects: { gold: -5, landForces: -6 } },
      { text: 'DO NOTHING', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 10,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 10,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_HRYCGWULF_THREAT', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_HRYCGWULF_THREAT',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'The Blackgeat Envoy',
    text: 'As consequence of Wulfham\'s defeat, Blackgeat\'s envoy Hrycgwulf arrives at your gates. "Submit, or be folded into Blackgeat." Feldric\'s hand rests on his sword.',
    canTriggerRandomly: false,
    options: [
      { text: 'BOW and PAY', effects: { gold: -15 } },
      { text: 'RESIST and PREPARE', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 8,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_1', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_TURNS',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Wulfham Turns',
    text: 'After you refused Brimwulf earlier, news arrives: Wulfham has allied with Blackgeat and demand a tribute. Feldric says, "This is what refusal can create: two enemies instead of one."',
    canTriggerRandomly: false,
    options: [
      { text: 'RESIST and PREPARE', effects: {} },
      { text: 'BOW and PAY', effects: { gold: -15 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 8,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_1', weight: 1 }],
      },
    ],
  },

  // WAR PREPARATION AND BATTLES
  {
    id: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Feldric Prepares the Host',
    text: 'Feldric your Marshall comes before you: "We need better preparation for the coming battle with Blackgeat."',
    canTriggerRandomly: false,
    options: [
      { text: 'RAISE THE HOST', effects: { landForces: 4, farmers: -4 } },
      { text: 'MEET THEM NOW', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 2 },
          { requestId: 'CHAIN_BLACKGEAT_WAR_ROUND_1', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_ROUND_1', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WAR_ROUND_1',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'First Clash',
    text: 'The Blackgeat war begins. Their vanguard probes your line. Feldric: "They test for weakness. Show none."',
    canTriggerRandomly: false,
    combat: {
      enemyForces: 6,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        satisfaction: 2,
      },
      onLose: {
        satisfaction: -3,
      },
    },
    options: [
      { text: 'HOLD', effects: {} },
      { text: 'COUNTERSTRIKE', effects: { gold: 10 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_ROUND_2', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_ROUND_2', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WAR_ROUND_2',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Smoke and Discipline',
    text: 'During the second war round against Blackgeat, they set brushfires to blind you. Feldric snarls: "They want panic."',
    canTriggerRandomly: false,
    combat: {
      enemyForces: 6,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        satisfaction: 2,
      },
      onLose: {
        satisfaction: -3,
      },
    },
    options: [
      { text: 'PROTECT THE VILLAGE', effects: { fireRisk: -4, satisfaction: 1 } },
      { text: 'PRESS THE LINE', effects: { farmers: -4, fireRisk: 6 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_ROUND_3', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_ROUND_3', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WAR_ROUND_3',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'The Breaking Point',
    text: 'This is the final showdown: Hrycgwulf commits Blackgeat\'s main force. Feldric: "This is it."',
    canTriggerRandomly: false,
    combat: {
      enemyForces: 12,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        satisfaction: 2,
      },
      onLose: {
        satisfaction: -3,
      },
    },
    options: [
      { text: 'ALL-IN STRIKE', effects: { gold: 35, satisfaction: 5 } },
      { text: 'WITHDRAW', effects: { satisfaction: -2, farmers: -5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_END_WIN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [
          { requestId: 'CHAIN_BLACKGEAT_WAR_END_HELP', weight: 3 },
          { requestId: 'CHAIN_BLACKGEAT_WAR_END_HARD', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WAR_END_WIN',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    title: 'Blackgeat Recoils',
    text: 'After three war rounds, Blackgeat pulls back and the war finally ends. Feldric wipes blood from his lip: "This is what resisting Blackgeat costs—and what it buys."',
    canTriggerRandomly: false,
    options: [
      { text: 'SELL THE LOOT', effects: { gold: 35, satisfaction: 2 } },
      { text: 'KEEP THE LOOT', effects: { landForces: 5, satisfaction: 2 } },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WAR_END_HELP',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Help from a Free Barony',
    text: 'As the Blackgeat war drags on, riders from a neighboring free barony arrive at dusk: "We won\'t watch you fall."',
    canTriggerRandomly: false,
    options: [
      { text: 'ACCEPT HELP', effects: { landForces: 3 } },
      { text: 'ACCEPT AND PAY', effects: { gold: -10, landForces: 6 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_END_STABLE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_END_STABLE', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WAR_END_HARD',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    title: 'A Bitter Retreat',
    text: 'The Blackgeat war ends badly. You live, but they loot the village. Feldric\'s eyes are stone: "A bitter defeat! What should we do now?"',
    canTriggerRandomly: false,
    options: [
      { text: 'SAFE TREASURY', effects: { gold: -15, farmers: -12 } },
      { text: 'SAFE YOUR PEOPLE ', effects: { gold: -35, farmers: -4 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_UNIVERSAL_RECOVERY', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_UNIVERSAL_RECOVERY', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WAR_END_STABLE',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    title: 'A Line Held',
    text: 'A fierce last battle against Blackgeat ends well with the barony\'s help. Feldric nods once: "Next time Blackgeat comes, we\'ll be ready sooner."',
    canTriggerRandomly: false,
    options: [
      { text: 'PURSUE THE FLEEING', effects: { landForces: -5, gold: 30 } },
      { text: 'HOLD A FEAST', effects: { health: 4, satisfaction: 3 } },
    ],
  },

  // TRIBUTE PATH
  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_1',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Tribute I',
    text: 'This tribute demand comes from Hrycgwulf\'s earlier ultimatum. His messenger waits: "The first payment." Feldric murmurs: "This is how Blackgeat turns a threat into routine."',
    canTriggerRandomly: false,
    options: [
      { text: 'PAY', effects: { gold: -10, satisfaction: -1 } },
      { text: 'REFUSE AND ARM', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 8,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_2', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_2',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Tribute II',
    text: 'The second tribute demand from Blackgeat arrives. Hrycgwulf repeats the terms, less polite this time.',
    canTriggerRandomly: false,
    options: [
      { text: 'PAY', effects: { gold: -10, satisfaction: -1 } },
      { text: 'REFUSE AND ARM', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 8,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_3', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_3',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Tribute III',
    text: 'Hrycgwulf comes back with another tribute demand. The people notice the wagons leaving your gates and start whispering about submission.',
    canTriggerRandomly: false,
    options: [
      { text: 'PAY', effects: { gold: -10, satisfaction: -2 } },
      { text: 'REFUSE AND ARM', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 8,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_4', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_4',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Tribute IV',
    text: 'Blackgeat\'s next tribute demand arrives with Hrycgwulf\'s personal seal. Feldric says, "They\'re making sure you remember who\'s in charge."',
    canTriggerRandomly: false,
    options: [
      { text: 'PAY', effects: { gold: -10, satisfaction: -2 } },
      { text: 'REFUSE AND ARM', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 8,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_5', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_5',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Tribute V',
    text: 'Another routine tribute demand from Blackgeat. Feldric says, "Paying five times teaches them you\'ll pay a sixth."',
    canTriggerRandomly: false,
    options: [
      { text: 'PAY', effects: { gold: -10, satisfaction: -1 } },
      { text: 'REFUSE AND ARM', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_TRIBUTE_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_END',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    title: 'A Bought Breath',
    text: 'Hrycgwulf visits you one last time: "You paid for safety. Now you shall have peace". Feldric: "This peace seems temporary. For next time, we will prepare."',
    canTriggerRandomly: false,
    options: [
      { text: 'CELEBRATE PEACE', effects: { health: 4, satisfaction: 4 } },
      { text: 'START PREPARING', effects: { gold: -10, landForces: 6 } },
    ],
  },

  {
    id: 'EVENT_MARKET_DAY',
    title: 'Market Day',
    text: 'The marketplace is bustling with traders from distant lands. Will you focus on steady profits or take a riskier approach for greater gains?',
    requires: ['need:marketplace'],
    options: [
      {
        text: 'STEADY TRADE',
        effects: {
          gold: 8,
        },
      },
      {
        text: 'RISKY DEALS',
        effects: {
          gold: 15,
          satisfaction: -1,
        },
      },
    ],
  },

  {
    id: 'EVENT_TAVERN_AFTER_WORK',
    title: 'Feierabend in der Kneipe',
    text: 'After a long day of labor, the villagers gather at the tavern. Should you subsidize their drinks to boost morale, or let them enjoy at their own expense?',
    requires: ['need:beer'],
    options: [
      {
        text: 'LET THEM PAY',
        effects: {
          satisfaction: 6,
        },
      },
      {
        text: 'SUBSIDIZE DRINKS',
        effects: {
          satisfaction: 10,
          gold: -5,
        },
      },
    ],
  },
  
  // AUTHORITY SYSTEM TEST EVENTS
  {
    id: 'EVT_AUTHORITY_SIMPLE_TEST',
    title: 'Diplomatic Victory',
    text: 'Your diplomatic efforts have paid off. The neighboring lord recognizes your authority.',
    options: [
      {
        text: 'ACCEPT RECOGNITION',
        effects: {
          authority: 10,
          gold: 5,
        },
      },
      {
        text: 'REMAIN HUMBLE',
        effects: {
          satisfaction: 5,
        },
      },
    ],
  },
  {
    id: 'EVT_AUTHORITY_TEST',
    title: 'Test of Authority',
    text: 'A rival faction challenges your political influence. You can commit authority to maintain your position. Success will refund your commitment, failure will cost you dearly.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'ASSERT AUTHORITY',
        effects: {
          satisfaction: 5,
        },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 50,
          threshold: 15,
          onSuccess: {
            gold: 20,
            authority: 5,
          },
          onFailure: {
            gold: -10,
            satisfaction: -10,
          },
          successFeedbackRequestId: 'INFO_AUTHORITY_SUCCESS',
          failureFeedbackRequestId: 'INFO_AUTHORITY_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 8,
        },
      },
      {
        text: 'BACK DOWN',
        effects: {
          satisfaction: -5,
          authority: -3,
        },
      },
    ],
  },
  
  // LOW AUTHORITY EVENTS (authorityMin: 0, authorityMax: 33)
  // These events reflect weak leadership, disrespect, and vulnerability
  {
    id: 'EVT_LOW_AUTHORITY',
    title: 'Desperate Plea',
    text: 'With your authority waning, a desperate merchant begs for protection money. Your weakened position makes this a difficult situation.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'PAY PROTECTION',
        effects: {
          gold: -15,
          satisfaction: 5,
        },
      },
      {
        text: 'REFUSE',
        effects: {
          satisfaction: -10,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_GUARD_INSUBORDINATION',
    title: 'Disrespectful Guards',
    text: 'Your guards openly mock your orders. One even spits at your feet. Your weakened authority has emboldened them to disrespect you.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'PUNISH THEM',
        effects: {
          landForces: -2,
          satisfaction: -5,
          authority: 2,
        },
      },
      {
        text: 'IGNORE IT',
        effects: {
          authority: -3,
          satisfaction: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_SABOTAGE',
    title: 'Sabotage in the Night',
    text: 'Someone has been stealing from the grain stores. Your lack of authority makes it impossible to maintain order or discover the culprit.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'INVESTIGATE',
        effects: {
          gold: -10,
          farmers: -2,
          authority: 1,
        },
      },
      {
        text: 'ACCEPT THE LOSS',
        effects: {
          gold: -5,
          satisfaction: -8,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_PETITION_DENIED',
    title: 'Petition Rejected',
    text: 'You petition the regional lord for aid, but are turned away at the gates. "We deal only with legitimate leaders," the guards say.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'PLEAD HARDER',
        effects: {
          gold: -5,
          authority: -2,
          satisfaction: -5,
        },
      },
      {
        text: 'LEAVE WITH DIGNITY',
        effects: {
          satisfaction: -3,
          authority: 1,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_DEBT_COLLECTOR',
    title: 'The Debt Collector',
    text: 'A ruthless debt collector arrives, sensing your weakness. He demands payment with interest - or else he\'ll take what he\'s owed by force.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'PAY THE DEBT',
        effects: {
          gold: -20,
          satisfaction: 3,
        },
      },
      {
        text: 'REFUSE TO PAY',
        effects: {
          landForces: -3,
          gold: -10,
          authority: -3,
          satisfaction: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_COUNCIL_REVOLT',
    title: 'Council Challenge',
    text: 'Your own council openly questions your decisions. "Perhaps we need new leadership," one elder suggests loudly.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'STAND FIRM',
        effects: {
          satisfaction: -10,
          authority: 3,
        },
      },
      {
        text: 'COMPROMISE',
        effects: {
          gold: -15,
          satisfaction: 5,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_BANDITS_MOCK',
    title: 'Mocked by Bandits',
    text: 'A band of thieves leaves mocking notes at your doorstep, daring you to stop them. They know you lack the authority to organize an effective response.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'IGNORE THEM',
        effects: {
          authority: -2,
          satisfaction: -8,
        },
      },
      {
        text: 'HIRE MERCENARIES',
        effects: {
          gold: -25,
          authority: 2,
          satisfaction: 5,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_FARMERS_LEAVE',
    title: 'Mass Exodus',
    text: 'Several farming families announce they\'re leaving for a neighboring settlement with "real leadership." Your reputation has failed you.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'BEG THEM TO STAY',
        effects: {
          farmers: -2,
          gold: -10,
          authority: -3,
          satisfaction: -5,
        },
      },
      {
        text: 'LET THEM GO',
        effects: {
          farmers: -5,
          authority: -1,
          satisfaction: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_MERCHANT_EXTORTION',
    title: 'Merchant Extortion',
    text: 'A traveling merchant realizes your position is weak. He demands triple the usual prices for essential goods, knowing you have no leverage to refuse.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'PAY THE PRICE',
        effects: {
          gold: -20,
          health: 5,
          authority: -1,
        },
      },
      {
        text: 'REFUSE TO BUY',
        effects: {
          health: -10,
          satisfaction: -8,
          authority: 1,
        },
      },
    ],
  },
  {
    id: 'EVT_LOW_AUTHORITY_CRISIS',
    title: 'Crisis of Confidence',
    text: 'Word spreads that you are unfit to lead. People whisper behind your back, and decisions are ignored. The settlement teeters on the edge of chaos.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'MAKE A GRAND GESTURE',
        effects: {
          gold: -30,
          satisfaction: 10,
          authority: 5,
        },
      },
      {
        text: 'WAIT IT OUT',
        effects: {
          satisfaction: -15,
          health: -5,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_MEDIUM_AUTHORITY',
    title: 'Political Maneuver',
    text: 'Your moderate influence allows you to negotiate a favorable trade deal with a neighboring settlement.',
    authorityMin: 34,
    authorityMax: 66,
    options: [
      {
        text: 'ACCEPT DEAL',
        effects: {
          gold: 15,
          authority: 3,
        },
      },
      {
        text: 'DEMAND MORE',
        effects: {
          gold: 5,
          authority: -5,
          satisfaction: -5,
        },
      },
    ],
  },
  
  // LOW AUTHORITY COMMIT EVENTS (authorityMin: 0, authorityMax: 33)
  // These events allow players with low authority to still participate in authority commit mechanics
  {
    id: 'EVT_COMMIT_LOW_DESPERATE_PLEA',
    title: 'Desperate Negotiation',
    text: 'A local merchant offers to help rebuild your reputation - but only if you can scrape together enough authority to prove you\'re worth the risk.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'TRY TO CONVINCE',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 30,
          threshold: 15,
          onSuccess: {
            gold: 25,
            satisfaction: 8,
            authority: 3,
          },
          onFailure: {
            gold: -5,
            satisfaction: -5,
          },
          successFeedbackRequestId: 'INFO_LOW_PLEA_SUCCESS',
          failureFeedbackRequestId: 'INFO_LOW_PLEA_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 5,
        },
      },
      {
        text: 'DECLINE OFFER',
        effects: {
          satisfaction: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_LOW_GUARD_LOYALTY',
    title: 'Wavering Guards',
    text: 'Your guards whisper of desertion. You could attempt to rally them with what little authority you have left, or let them go.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'RALLY THEM',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
          threshold: 12,
          onSuccess: {
            landForces: 3,
            authority: 4,
          },
          onFailure: {
            landForces: -2,
            satisfaction: -8,
          },
          successFeedbackRequestId: 'INFO_LOW_GUARD_SUCCESS',
          failureFeedbackRequestId: 'INFO_LOW_GUARD_FAILURE',
          refundOnSuccessPercent: 90,
          extraLossOnFailure: 5,
        },
      },
      {
        text: 'LET THEM LEAVE',
        effects: {
          landForces: -3,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_LOW_VILLAGE_RESPECT',
    title: 'Earning Respect',
    text: 'The villagers doubt your leadership. You could make a bold stand to prove yourself worthy, but it requires mustering what authority you still possess.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'MAKE YOUR STAND',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 30,
          threshold: 18,
          onSuccess: {
            satisfaction: 12,
            authority: 5,
            farmers: 3,
          },
          onFailure: {
            satisfaction: -10,
            farmers: -2,
          },
          successFeedbackRequestId: 'INFO_LOW_RESPECT_SUCCESS',
          failureFeedbackRequestId: 'INFO_LOW_RESPECT_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 6,
        },
      },
      {
        text: 'STAY QUIET',
        effects: {
          satisfaction: -5,
          authority: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_LOW_DEBT_NEGOTIATION',
    title: 'Debt Relief',
    text: 'Creditors circle like vultures. Hiring a lawyer to negotiate costs 5 gold upfront. If you can muster enough authority, you might secure better terms. Otherwise, they will take everything.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'NEGOTIATE',
        effects: {
          gold: -5,
        },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 28,
          threshold: 16,
          onSuccess: {
            gold: 15,
            authority: 3,
          },
          onFailure: {
            gold: -15,
            satisfaction: -7,
          },
          successFeedbackRequestId: 'INFO_LOW_DEBT_SUCCESS',
          failureFeedbackRequestId: 'INFO_LOW_DEBT_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 7,
        },
      },
      {
        text: 'PAY FULL PRICE',
        effects: {
          gold: -20,
          authority: -2,
        },
      },
    ],
  },
  
  // HIGH AUTHORITY EVENTS (authorityMin: 67, authorityMax: 100)
  // These events reflect strong leadership, political intrigue, and high-stakes scenarios
  {
    id: 'EVT_HIGH_AUTHORITY',
    title: 'Summit of Lords',
    text: 'Your formidable authority grants you an invitation to the regional council. This is an opportunity to solidify your position among the elite.',
    authorityMin: 67,
    authorityMax: 100,
    options: [
      {
        text: 'ATTEND SUMMIT',
        effects: {
          gold: 25,
          authority: 10,
          satisfaction: 10,
        },
      },
      {
        text: 'SEND DELEGATE',
        effects: {
          gold: 10,
          authority: 3,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_RIVAL_CHALLENGE',
    title: 'Rival Marken\'s Challenge',
    text: 'Lord Heinrich of the neighboring Mark challenges your authority publicly, claiming your lands should be his. This affront cannot go unanswered.',
    authorityMin: 67,
    authorityMax: 100,
    options: [
      {
        text: 'ACCEPT THE DUEL',
        effects: {
          authority: 10,
          landForces: -5,
          gold: 20,
          satisfaction: 15,
        },
      },
      {
        text: 'DIPLOMATIC REBUKE',
        effects: {
          gold: 15,
          authority: 5,
          satisfaction: 5,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_ALLIANCE_OFFER',
    title: 'Alliance Proposal',
    text: 'The Count of the Eastern Marches offers a formal alliance. With your strong reputation, this could open doors to greater power and wealth.',
    authorityMin: 67,
    authorityMax: 100,
    options: [
      {
        text: 'ACCEPT ALLIANCE',
        effects: {
          gold: 40,
          authority: 15,
          landForces: 10,
        },
      },
      {
        text: 'REMAIN INDEPENDENT',
        effects: {
          authority: 5,
          satisfaction: 10,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_ASSASSINATION_PLOT',
    title: 'Assassination Uncovered',
    text: 'Your spies uncover a plot against your life, orchestrated by jealous rivals. Your authority gives you the resources to respond decisively.',
    authorityMin: 67,
    authorityMax: 100,
    options: [
      {
        text: 'STRIKE FIRST',
        effects: {
          gold: -20,
          authority: 10,
          landForces: 5,
          satisfaction: -5,
        },
      },
      {
        text: 'FORTIFY DEFENSES',
        effects: {
          gold: -15,
          authority: 5,
          landForces: 3,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_ROYAL_SUMMONS',
    title: 'Royal Summons',
    text: 'The King himself summons you to court, recognizing your authority. This is a rare honor that could elevate your status significantly.',
    authorityMin: 67,
    authorityMax: 100,
    options: [
      {
        text: 'ATTEND WITH ENTOURAGE',
        effects: {
          gold: -30,
          authority: 20,
          satisfaction: 15,
        },
      },
      {
        text: 'ATTEND HUMBLY',
        effects: {
          gold: -10,
          authority: 10,
          satisfaction: 8,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_BETRAYAL',
    title: 'The Trusted Betrayer',
    text: 'Your closest advisor has been secretly undermining you, selling information to your enemies. Your authority will determine how you handle this betrayal.',
    authorityMin: 67,
    authorityMax: 100,
    options: [
      {
        text: 'PUBLIC EXECUTION',
        effects: {
          authority: 15,
          satisfaction: -10,
          landForces: -2,
        },
      },
      {
        text: 'EXILE QUIETLY',
        effects: {
          authority: 8,
          satisfaction: 5,
          gold: -10,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_TRIBUTE_DEMAND',
    title: 'Tribute Demanded',
    text: 'A weaker neighboring lord sends tribute, acknowledging your superior authority. This is the fruit of your strong leadership.',
    authorityMin: 67,
    authorityMax: 100,
    options: [
      {
        text: 'ACCEPT TRIBUTE',
        effects: {
          gold: 35,
          authority: 8,
          satisfaction: 10,
        },
      },
      {
        text: 'REFUSE GRACIOUSLY',
        effects: {
          authority: 12,
          satisfaction: 15,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_POWER_PLAY',
    title: 'Political Machinations',
    text: 'You have the opportunity to eliminate a political rival through legal maneuvering. Your authority makes this possible, but the ethics are questionable.',
    authorityMin: 67,
    authorityMax: 100,
    options: [
      {
        text: 'DESTROY RIVAL',
        effects: {
          gold: 20,
          authority: 10,
          satisfaction: -8,
        },
      },
      {
        text: 'SHOW MERCY',
        effects: {
          authority: 5,
          satisfaction: 12,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_GRAND_TOURNAMENT',
    title: 'The Grand Tournament',
    text: 'You host a magnificent tournament that attracts nobles from across the realm. Your authority ensures this event will be remembered.',
    authorityMin: 67,
    authorityMax: 100,
    options: [
      {
        text: 'LAVISH CELEBRATION',
        effects: {
          gold: -40,
          authority: 15,
          satisfaction: 20,
        },
      },
      {
        text: 'MODEST AFFAIR',
        effects: {
          gold: -20,
          authority: 8,
          satisfaction: 12,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_DIPLOMATIC_CRISIS',
    title: 'Diplomatic Incident',
    text: 'An insult from a foreign ambassador threatens war. Your authority gives you the standing to demand satisfaction or broker peace.',
    authorityMin: 67,
    authorityMax: 100,
    options: [
      {
        text: 'DEMAND APOLOGY',
        effects: {
          authority: 12,
          satisfaction: 10,
          gold: 15,
        },
      },
      {
        text: 'PREPARE FOR WAR',
        effects: {
          authority: 8,
          landForces: 8,
          gold: -25,
          satisfaction: 5,
        },
      },
    ],
  },
  
  // AUTHORITY COMMIT EVENTS (events with authorityCheck for risk/reward)
  // These provide meaningful choices with authority stakes
  {
    id: 'EVT_COMMIT_NEGOTIATE_TRADE',
    title: 'Trade Negotiation',
    text: 'A wealthy merchant guild seeks exclusive trading rights. You can leverage your authority to demand better terms, but failure could damage your reputation.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'NEGOTIATE HARD',
        effects: {
          gold: 10,
        },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 40,
          threshold: 25,
          onSuccess: {
            gold: 30,
            satisfaction: 5,
          },
          onFailure: {
            satisfaction: -8,
          },
          successFeedbackRequestId: 'INFO_TRADE_SUCCESS',
          failureFeedbackRequestId: 'INFO_TRADE_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 6,
        },
      },
      {
        text: 'ACCEPT THEIR TERMS',
        effects: {
          gold: 15,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_QUELL_RIOT',
    title: 'Brewing Riot',
    text: 'Angry citizens gather in the square, demanding change. You can use your authority to calm them, but if you fail, violence may erupt.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'ADDRESS THE CROWD',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 50,
          threshold: 30,
          onSuccess: {
            satisfaction: 15,
            authority: 5,
          },
          onFailure: {
            satisfaction: -15,
            landForces: -3,
            gold: -10,
          },
          successFeedbackRequestId: 'INFO_RIOT_SUCCESS',
          failureFeedbackRequestId: 'INFO_RIOT_FAILURE',
          refundOnSuccessPercent: 80,
          extraLossOnFailure: 10,
        },
      },
      {
        text: 'SEND IN GUARDS',
        effects: {
          satisfaction: -10,
          landForces: -2,
          authority: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_JUSTICE_DISPUTE',
    title: 'Noble Dispute',
    text: 'Two noble families feud over land rights. Your judgment will be final, but you need authority to make it stick.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'RENDER JUDGMENT',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 45,
          threshold: 28,
          onSuccess: {
            gold: 20,
            satisfaction: 10,
          },
          onFailure: {
            satisfaction: -12,
            gold: -15,
          },
          successFeedbackRequestId: 'INFO_JUSTICE_SUCCESS',
          failureFeedbackRequestId: 'INFO_JUSTICE_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 8,
        },
      },
      {
        text: 'DEFER TO COUNCIL',
        effects: {
          authority: -5,
          satisfaction: 3,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_MILITARY_REFORM',
    title: 'Military Reorganization',
    text: 'Your military structure is outdated. Reforming it requires authority to overcome resistance from traditional commanders.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'FORCE REFORMS',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 60,
          threshold: 40,
          onSuccess: {
            landForces: 10,
            authority: 8,
          },
          onFailure: {
            landForces: -5,
            satisfaction: -10,
          },
          successFeedbackRequestId: 'INFO_REFORM_SUCCESS',
          failureFeedbackRequestId: 'INFO_REFORM_FAILURE',
          refundOnSuccessPercent: 90,
          extraLossOnFailure: 10,
        },
      },
      {
        text: 'GRADUAL CHANGE',
        effects: {
          landForces: 3,
          gold: -15,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_BANDIT_PARLEY',
    title: 'Bandit Negotiation',
    text: 'A bandit chief offers to serve you instead of raiding. This requires enough authority to command their respect and loyalty.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'RECRUIT THEM',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 55,
          threshold: 35,
          onSuccess: {
            landForces: 8,
            satisfaction: -5,
          },
          onFailure: {
            gold: -20,
            landForces: -4,
          },
          successFeedbackRequestId: 'INFO_BANDIT_SUCCESS',
          failureFeedbackRequestId: 'INFO_BANDIT_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 12,
        },
      },
      {
        text: 'REFUSE THEM',
        effects: {
          authority: 2,
          satisfaction: 5,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_TAX_REFORM',
    title: 'Tax Collection Reform',
    text: 'The tax system is corrupt and inefficient. Overhauling it requires authority to force compliance from entrenched interests.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'IMPLEMENT REFORM',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 50,
          threshold: 32,
          onSuccess: {
            gold: 35,
            satisfaction: 8,
          },
          onFailure: {
            gold: -10,
            satisfaction: -15,
          },
          successFeedbackRequestId: 'INFO_TAX_SUCCESS',
          failureFeedbackRequestId: 'INFO_TAX_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 7,
        },
      },
      {
        text: 'KEEP STATUS QUO',
        effects: {
          gold: 5,
          authority: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_RELIGIOUS_DISPUTE',
    title: 'Religious Controversy',
    text: 'A religious dispute threatens to divide your people. Only strong authority can unite them under a single decision.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'MAKE A DECREE',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 55,
          threshold: 38,
          onSuccess: {
            satisfaction: 15,
            authority: 10,
          },
          onFailure: {
            satisfaction: -20,
            farmers: -5,
          },
          successFeedbackRequestId: 'INFO_RELIGIOUS_SUCCESS',
          failureFeedbackRequestId: 'INFO_RELIGIOUS_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 9,
        },
      },
      {
        text: 'ALLOW PLURALISM',
        effects: {
          satisfaction: 5,
          authority: -4,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_BORDER_CLAIM',
    title: 'Border Dispute',
    text: 'Contested lands lie between your territory and a neighbor\'s. Assert your claim with authority, or concede the ground.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'ASSERT CLAIM',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 65,
          threshold: 45,
          onSuccess: {
            farmers: 8,
            gold: 25,
            authority: 12,
          },
          onFailure: {
            landForces: -6,
            satisfaction: -10,
          },
          successFeedbackRequestId: 'INFO_BORDER_SUCCESS',
          failureFeedbackRequestId: 'INFO_BORDER_FAILURE',
          refundOnSuccessPercent: 90,
          extraLossOnFailure: 10,
        },
      },
      {
        text: 'CONCEDE LANDS',
        effects: {
          authority: -5,
          satisfaction: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_CORRUPT_OFFICIAL',
    title: 'Corruption Exposed',
    text: 'A powerful official is caught embezzling. Punishing them requires authority, as they have many allies.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'PROSECUTE FULLY',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 50,
          threshold: 33,
          onSuccess: {
            gold: 25,
            satisfaction: 12,
            authority: 8,
          },
          onFailure: {
            gold: -15,
            satisfaction: -12,
            landForces: -3,
          },
          successFeedbackRequestId: 'INFO_CORRUPT_SUCCESS',
          failureFeedbackRequestId: 'INFO_CORRUPT_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 10,
        },
      },
      {
        text: 'QUIET DISMISSAL',
        effects: {
          gold: 10,
          authority: -4,
          satisfaction: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_SUCCESSION_CRISIS',
    title: 'Succession Crisis',
    text: 'A neighboring lord dies without clear heir. Several claimants seek your backing. Your choice requires authority to enforce.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'BACK A CLAIMANT',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 70,
          threshold: 50,
          onSuccess: {
            gold: 40,
            landForces: 12,
            authority: 15,
          },
          onFailure: {
            gold: -25,
            landForces: -8,
            satisfaction: -10,
          },
          successFeedbackRequestId: 'INFO_SUCCESSION_SUCCESS',
          failureFeedbackRequestId: 'INFO_SUCCESSION_FAILURE',
          refundOnSuccessPercent: 80,
          extraLossOnFailure: 12,
        },
      },
      {
        text: 'STAY NEUTRAL',
        effects: {
          authority: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_GUILD_RIVALRY',
    title: 'Guild Power Struggle',
    text: 'Two merchant guilds vie for dominance. Choosing a winner requires authority to make your decision final.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'BACK ONE GUILD',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 45,
          threshold: 30,
          onSuccess: {
            gold: 30,
            satisfaction: 8,
          },
          onFailure: {
            gold: -18,
            satisfaction: -15,
          },
          successFeedbackRequestId: 'INFO_GUILD_SUCCESS',
          failureFeedbackRequestId: 'INFO_GUILD_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 8,
        },
      },
      {
        text: 'FORCE COMPROMISE',
        effects: {
          gold: 12,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_FOREIGN_ENVOY',
    title: 'Foreign Envoy',
    text: 'An envoy from a distant kingdom offers trade and alliance, but demands concessions. Your authority determines the terms.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'DEMAND EQUALITY',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 60,
          threshold: 42,
          onSuccess: {
            gold: 35,
            authority: 12,
            satisfaction: 10,
          },
          onFailure: {
            authority: -5,
            satisfaction: -8,
          },
          successFeedbackRequestId: 'INFO_ENVOY_SUCCESS',
          failureFeedbackRequestId: 'INFO_ENVOY_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 6,
        },
      },
      {
        text: 'ACCEPT THEIR TERMS',
        effects: {
          gold: 20,
          authority: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_LAND_DISTRIBUTION',
    title: 'Land Redistribution',
    text: 'The poor demand land reform. Redistributing land from wealthy nobles requires immense authority to overcome their resistance.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'REDISTRIBUTE LAND',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 70,
          threshold: 50,
          onSuccess: {
            farmers: 12,
            satisfaction: 20,
            authority: 10,
          },
          onFailure: {
            satisfaction: -18,
            gold: -25,
            farmers: -6,
          },
          successFeedbackRequestId: 'INFO_LAND_SUCCESS',
          failureFeedbackRequestId: 'INFO_LAND_FAILURE',
          refundOnSuccessPercent: 85,
          extraLossOnFailure: 10,
        },
      },
      {
        text: 'MAINTAIN STATUS QUO',
        effects: {
          satisfaction: -8,
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_CHALLENGE_TRADITION',
    title: 'Ancient Tradition',
    text: 'An archaic tradition harms your people, but it\'s deeply revered. Only strong authority can change it without causing upheaval.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'ABOLISH TRADITION',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 55,
          threshold: 38,
          onSuccess: {
            satisfaction: 15,
            health: 8,
            authority: 10,
          },
          onFailure: {
            satisfaction: -20,
            authority: -5,
          },
          successFeedbackRequestId: 'INFO_TRADITION_SUCCESS',
          failureFeedbackRequestId: 'INFO_TRADITION_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 10,
        },
      },
      {
        text: 'RESPECT TRADITION',
        effects: {
          satisfaction: 5,
          health: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_PIRATE_ALLIANCE',
    title: 'River Pirates',
    text: 'Pirates control the river trade. You can attempt to recruit them as privateers, but it requires authority they will respect.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'RECRUIT PIRATES',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 48,
          threshold: 32,
          onSuccess: {
            gold: 28,
            landForces: 6,
          },
          onFailure: {
            gold: -22,
            satisfaction: -10,
          },
          successFeedbackRequestId: 'INFO_PIRATE_SUCCESS',
          failureFeedbackRequestId: 'INFO_PIRATE_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 8,
        },
      },
      {
        text: 'IGNORE THEM',
        effects: {
          gold: -10,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_MARRIAGE_ALLIANCE',
    title: 'Political Marriage',
    text: 'A powerful family offers a marriage alliance. Securing favorable terms requires authority to negotiate from strength.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'NEGOTIATE TERMS',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 62,
          threshold: 44,
          onSuccess: {
            gold: 45,
            landForces: 10,
            authority: 15,
          },
          onFailure: {
            gold: -20,
            authority: -6,
            satisfaction: -12,
          },
          successFeedbackRequestId: 'INFO_MARRIAGE_SUCCESS',
          failureFeedbackRequestId: 'INFO_MARRIAGE_FAILURE',
          refundOnSuccessPercent: 90,
          extraLossOnFailure: 10,
        },
      },
      {
        text: 'ACCEPT AS OFFERED',
        effects: {
          gold: 25,
          landForces: 5,
          authority: -3,
        },
      },
    ],
  },
  
  // EGO TEST EVENTS - Test humility, hubris, pride, and character
  {
    id: 'EVT_EGO_HUMBLE_PEASANT',
    title: 'The Wise Peasant',
    text: 'An elderly peasant offers unsolicited advice on governance. He speaks wisely, but addressing you as an equal. Do you listen humbly or assert your station?',
    options: [
      {
        text: 'LISTEN HUMBLY',
        effects: {
          authority: -2,
          satisfaction: 10,
          gold: 5,
        },
      },
      {
        text: 'PUT HIM IN HIS PLACE',
        effects: {
          authority: 3,
          satisfaction: -8,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_PUBLIC_CRITICISM',
    title: 'Public Criticism',
    text: 'A merchant loudly criticizes your recent decisions in the town square. Others are watching to see how you respond.',
    options: [
      {
        text: 'LAUGH IT OFF',
        effects: {
          authority: -3,
          satisfaction: 8,
        },
      },
      {
        text: 'ARREST HIM',
        effects: {
          authority: 5,
          satisfaction: -12,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_MINOR_SLIGHT',
    title: 'Minor Disrespect',
    text: 'A guard forgets to bow when you pass. It\'s a small oversight, but others notice. How do you react?',
    options: [
      {
        text: 'IGNORE IT',
        effects: {
          authority: -1,
          satisfaction: 3,
        },
      },
      {
        text: 'PUNISH SEVERELY',
        effects: {
          authority: 3,
          satisfaction: -8,
          landForces: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_FLATTERY',
    title: 'Obvious Flattery',
    text: 'A courtier praises you with absurd exaggerations, calling you "the greatest leader ever to walk the earth." It\'s clearly insincere.',
    options: [
      {
        text: 'ENJOY THE PRAISE',
        effects: {
          authority: -5,
          gold: -5,
          satisfaction: -5,
        },
      },
      {
        text: 'CALL OUT THE LIE',
        effects: {
          authority: 5,
          satisfaction: 8,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_ADMIT_MISTAKE',
    title: 'Public Mistake',
    text: 'You made an error in judgment that cost the village resources. Do you admit fault publicly or deflect blame?',
    options: [
      {
        text: 'ADMIT FAULT',
        effects: {
          authority: -5,
          satisfaction: 15,
          gold: -5,
        },
      },
      {
        text: 'BLAME OTHERS',
        effects: {
          authority: 8,
          satisfaction: -10,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_RIVAL_SUCCESS',
    title: 'Rival\'s Success',
    text: 'A rival leader achieves great success. Your advisors suggest you publicly congratulate them to show grace, but it would acknowledge their superiority.',
    options: [
      {
        text: 'CONGRATULATE THEM',
        effects: {
          authority: -3,
          satisfaction: 8,
          gold: 10,
        },
      },
      {
        text: 'REMAIN SILENT',
        effects: {
          authority: 2,
          satisfaction: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_GRAND_TITLE',
    title: 'Grandiose Title',
    text: 'A sycophant suggests you adopt a grandiose new title: "His Magnificence, Supreme Protector of the Realm." It\'s ridiculous but flattering.',
    options: [
      {
        text: 'ACCEPT THE TITLE',
        effects: {
          authority: -8,
          satisfaction: -12,
          gold: -10,
        },
      },
      {
        text: 'REFUSE HUMBLY',
        effects: {
          authority: 5,
          satisfaction: 15,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_SERVANT_COMPLAINT',
    title: 'Servant\'s Complaint',
    text: 'A servant complains that you\'ve been unfair. The grievance is legitimate, but admitting it would show weakness.',
    options: [
      {
        text: 'MAKE IT RIGHT',
        effects: {
          authority: -4,
          satisfaction: 12,
          gold: -5,
        },
      },
      {
        text: 'DISMISS THE SERVANT',
        effects: {
          authority: 6,
          satisfaction: -10,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_LAVISH_FEAST',
    title: 'Lavish Feast',
    text: 'You could throw a lavish feast to demonstrate your wealth and power, but the expense would be enormous and the people are struggling.',
    options: [
      {
        text: 'THROW THE FEAST',
        effects: {
          gold: -40,
          authority: 10,
          satisfaction: -15,
        },
      },
      {
        text: 'MODEST CELEBRATION',
        effects: {
          gold: -10,
          authority: -2,
          satisfaction: 10,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_EXPERT_ADVICE',
    title: 'Expert\'s Warning',
    text: 'An expert warns that your plan is flawed. Accepting their advice would mean admitting you were wrong before the council.',
    options: [
      {
        text: 'HEED THE WARNING',
        effects: {
          authority: -6,
          gold: 15,
          satisfaction: 8,
        },
      },
      {
        text: 'PROCEED AS PLANNED',
        effects: {
          authority: 4,
          gold: -20,
          satisfaction: -12,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_STATUE',
    title: 'Monument to Yourself',
    text: 'Advisors suggest erecting a statue in your honor. It would immortalize your legacy, but the cost is steep and the optics questionable.',
    options: [
      {
        text: 'BUILD THE STATUE',
        effects: {
          gold: -35,
          authority: 8,
          satisfaction: -15,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          authority: -2,
          satisfaction: 12,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_OVERREACTION',
    title: 'Petty Theft',
    text: 'Someone stole a chicken from your personal coop. It\'s a trivial loss, but some advisors suggest making an example.',
    options: [
      {
        text: 'HARSH PUNISHMENT',
        effects: {
          authority: 4,
          satisfaction: -15,
        },
      },
      {
        text: 'IGNORE IT',
        effects: {
          authority: -2,
          satisfaction: 5,
        },
      },
    ],
  },
  // EXAMPLE: Authority Boost Follow-Up System
  {
    id: 'EVT_MYSTERIOUS_TRAVELER_ENHANCED',
    title: 'Mysterious Traveler',
    text: 'A hooded stranger arrives at your gates, asking for shelter. He seems educated but evasive about his past. You can use your authority to investigate his background more thoroughly.',
    canTriggerRandomly: true,
    authorityMin: 20,
    authorityMax: 100,
    options: [
      {
        text: 'WELCOME & INVESTIGATE',
        effects: {
          gold: -5,
          satisfaction: 2,
        },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 40,
          threshold: 25,
          // Immediate effects (existing system)
          onSuccess: {
            authority: 3,  // Successful investigation boosts your reputation
            satisfaction: 5,
          },
          onFailure: {
            authority: -5,  // Failed investigation makes you look paranoid
            satisfaction: -3,
          },
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 5,
          successFeedbackRequestId: 'INFO_TRAVELER_INVESTIGATED',
          failureFeedbackRequestId: 'INFO_TRAVELER_INVESTIGATION_FAILED',
          // NEW: Follow-up probability boosts
          followUpBoosts: [
            {
              targetRequestId: 'EVT_TRAVELER_TEACHES',
              boostType: 'linear',
              boostValue: 2,  // Max +2 weight at full commit
              description: 'Increases chance traveler is helpful',
            },
          ],
        },
      },
      {
        text: 'SEND AWAY',
        effects: {
          satisfaction: -2,
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [
          { requestId: 'EVT_TRAVELER_TEACHES', weight: 3 },    // Base: 75% (3/4)
          { requestId: 'EVT_TRAVELER_BETRAYS', weight: 1 },    // Base: 25% (1/4)
          // WITH AUTHORITY BOOST:
          // No commit (0):     TEACHES 75% (3/4),     BETRAYS 25% (1/4)
          // Half commit (20):  TEACHES 80% (4/5),     BETRAYS 20% (1/5)
          // Full commit (40):  TEACHES 83% (5/6),     BETRAYS 17% (1/6)
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'EVT_TRAVELER_CURSE', weight: 2 },
          { requestId: 'EVT_TRAVELER_RETURNS', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'EVT_TRAVELER_TEACHES',
    title: 'Grateful Teacher',
    text: 'The traveler reveals he is a scholar fleeing persecution. In gratitude for your hospitality, he offers to teach your citizens advanced techniques.',
    canTriggerRandomly: false,
    options: [
      {
        text: 'ACCEPT HIS TEACHINGS',
        effects: {
          gold: 15,
          satisfaction: 8,
          authority: 5,
        },
      },
      {
        text: 'POLITELY DECLINE',
        effects: {
          satisfaction: 3,
        },
      },
    ],
  },
  {
    id: 'EVT_TRAVELER_BETRAYS',
    title: 'Saboteur Revealed',
    text: 'The traveler was actually a spy! He has stolen valuable information and fled, leaving chaos in his wake.',
    canTriggerRandomly: false,
    options: [
      {
        text: 'DAMAGE CONTROL',
        effects: {
          gold: -20,
          satisfaction: -10,
          authority: -8,
        },
      },
      {
        text: 'ACCEPT THE LOSS',
        effects: {
          gold: -15,
          authority: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_TRAVELER_CURSE',
    title: 'Vengeful Wanderer',
    text: 'The rejected traveler curses your village as he leaves. Strange misfortunes begin to occur.',
    canTriggerRandomly: false,
    options: [
      {
        text: 'SEEK REMEDY',
        effects: {
          gold: -10,
          satisfaction: -5,
        },
      },
      {
        text: 'IGNORE SUPERSTITION',
        effects: {
          satisfaction: -8,
        },
      },
    ],
  },
  {
    id: 'EVT_TRAVELER_RETURNS',
    title: 'Second Chance',
    text: 'The traveler returns months later, having found success elsewhere. He remembers your rejection but is willing to forgive.',
    canTriggerRandomly: false,
    options: [
      {
        text: 'APOLOGIZE',
        effects: {
          gold: 5,
          satisfaction: 3,
        },
      },
      {
        text: 'MAINTAIN POSITION',
        effects: {
          authority: 2,
        },
      },
    ],
  },
];

/**
 * Info-Requests for authority system feedback
 */
export const authorityInfoRequests: Request[] = [
  {
    id: 'INFO_AUTHORITY_SUCCESS',
    title: 'Authority Prevails',
    text: 'Your show of political power has impressed the faction. They back down and offer tribute. Your authority is returned to you.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [
      {
        text: 'ACCEPT',
        effects: {},
      },
    ],
  },
  {
    id: 'INFO_AUTHORITY_FAILURE',
    title: 'Authority Challenged',
    text: 'Your influence was insufficient. The rival faction gains ground, and your reputation suffers. Your committed authority is lost, and you face additional losses.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [
      {
        text: 'ACKNOWLEDGE',
        effects: {},
      },
    ],
  },
  // Feedback events for authority commit scenarios
  {
    id: 'INFO_TRADE_SUCCESS',
    title: 'Negotiation Victory',
    text: 'Your firm negotiating stance paid off. The merchant guild agrees to your terms, and your authority remains intact.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'EXCELLENT', effects: {} }],
  },
  {
    id: 'INFO_TRADE_FAILURE',
    title: 'Negotiation Failure',
    text: 'The merchants walked away from the table, insulted by your overreach. The deal is lost and your reputation damaged.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'ACCEPT DEFEAT', effects: {} }],
  },
  {
    id: 'INFO_RIOT_SUCCESS',
    title: 'Crisis Averted',
    text: 'Your words resonated with the crowd. They disperse peacefully, moved by your leadership and vision.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'WELL DONE', effects: {} }],
  },
  {
    id: 'INFO_RIOT_FAILURE',
    title: 'Riot Erupts',
    text: 'The crowd jeered and threw stones. Violence broke out, and guards had to intervene forcefully. Your authority was not enough.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'REGRET IT', effects: {} }],
  },
  {
    id: 'INFO_JUSTICE_SUCCESS',
    title: 'Justice Served',
    text: 'Both families accept your judgment. Your authority has brought peace and order to the dispute.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'GOOD', effects: {} }],
  },
  {
    id: 'INFO_JUSTICE_FAILURE',
    title: 'Justice Rejected',
    text: 'The families reject your ruling, calling you weak and incompetent. The feud intensifies.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'UNFORTUNATE', effects: {} }],
  },
  {
    id: 'INFO_REFORM_SUCCESS',
    title: 'Reforms Implemented',
    text: 'Despite resistance, your authority prevails. The military is reorganized and strengthened under new leadership.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'PROCEED', effects: {} }],
  },
  {
    id: 'INFO_REFORM_FAILURE',
    title: 'Reforms Rejected',
    text: 'The old guard refuses your changes. Some officers even resign in protest, weakening your forces.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'ACCEPT IT', effects: {} }],
  },
  {
    id: 'INFO_BANDIT_SUCCESS',
    title: 'Bandits Recruited',
    text: 'The bandit chief kneels before you, swearing loyalty. His warriors are now yours to command.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'WELCOME THEM', effects: {} }],
  },
  {
    id: 'INFO_BANDIT_FAILURE',
    title: 'Bandits Betray',
    text: 'The bandits laugh at your offer and raid your settlement. Your weakness has cost you dearly.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'CURSE THEM', effects: {} }],
  },
  {
    id: 'INFO_TAX_SUCCESS',
    title: 'Tax Reform Succeeds',
    text: 'Your authority overcomes the corrupt officials. The new tax system is efficient and fair, filling the coffers.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'CELEBRATE', effects: {} }],
  },
  {
    id: 'INFO_TAX_FAILURE',
    title: 'Tax Reform Fails',
    text: 'The entrenched interests sabotage your reforms. Tax collection collapses into chaos and resentment.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'REGROUP', effects: {} }],
  },
  {
    id: 'INFO_RELIGIOUS_SUCCESS',
    title: 'Unity Achieved',
    text: 'Your decree brings religious harmony. The people unite under your wisdom and authority.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'BLESSED', effects: {} }],
  },
  {
    id: 'INFO_RELIGIOUS_FAILURE',
    title: 'Religious Schism',
    text: 'Your decree inflames the dispute. Families are torn apart, and some flee the settlement in protest.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'DAMAGE DONE', effects: {} }],
  },
  {
    id: 'INFO_BORDER_SUCCESS',
    title: 'Territory Secured',
    text: 'Your claim is recognized. The contested lands are now yours, bringing new farmers and resources.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'EXPAND', effects: {} }],
  },
  {
    id: 'INFO_BORDER_FAILURE',
    title: 'Border War',
    text: 'Your neighbor rejects your claim with force. A brief but bloody skirmish costs you dearly.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'RETREAT', effects: {} }],
  },
  {
    id: 'INFO_CORRUPT_SUCCESS',
    title: 'Corruption Rooted Out',
    text: 'The corrupt official is punished publicly. The recovered funds and restored integrity boost morale.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'JUSTICE', effects: {} }],
  },
  {
    id: 'INFO_CORRUPT_FAILURE',
    title: 'Corruption Persists',
    text: 'The official\'s allies strike back. Your prosecution fails, and the corrupt network retaliates.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'FAILED', effects: {} }],
  },
  {
    id: 'INFO_SUCCESSION_SUCCESS',
    title: 'Succession Secured',
    text: 'Your chosen claimant takes power, grateful for your support. Rich rewards and alliance follow.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'PROFIT', effects: {} }],
  },
  {
    id: 'INFO_SUCCESSION_FAILURE',
    title: 'Succession War',
    text: 'Your candidate loses. The victorious claimant remembers your opposition with hostility.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'COSTLY', effects: {} }],
  },
  {
    id: 'INFO_GUILD_SUCCESS',
    title: 'Guild United',
    text: 'Your choice stands. The favored guild prospers, and trade flourishes under clear leadership.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'PROSPER', effects: {} }],
  },
  {
    id: 'INFO_GUILD_FAILURE',
    title: 'Guild Chaos',
    text: 'Both guilds reject your decision. Trade war erupts, damaging the economy and your standing.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'CHAOS', effects: {} }],
  },
  {
    id: 'INFO_ENVOY_SUCCESS',
    title: 'Equal Partnership',
    text: 'The foreign kingdom accepts your terms. A profitable alliance is formed on equal footing.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'ALLIANCE', effects: {} }],
  },
  {
    id: 'INFO_ENVOY_FAILURE',
    title: 'Diplomatic Insult',
    text: 'The envoy leaves in anger. Your overreach is seen as arrogance, damaging foreign relations.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'ISOLATION', effects: {} }],
  },
  {
    id: 'INFO_LAND_SUCCESS',
    title: 'Land Reform Success',
    text: 'Despite noble resistance, your authority carries the day. Land is redistributed fairly, and the poor rejoice.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'REFORM', effects: {} }],
  },
  {
    id: 'INFO_LAND_FAILURE',
    title: 'Land Reform Disaster',
    text: 'The nobles revolt against your reforms. Chaos ensues as farmers flee and the economy collapses.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'DISASTER', effects: {} }],
  },
  {
    id: 'INFO_TRADITION_SUCCESS',
    title: 'Tradition Abolished',
    text: 'Your authority is sufficient. The harmful tradition ends, and a new era of progress begins.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'PROGRESS', effects: {} }],
  },
  {
    id: 'INFO_TRADITION_FAILURE',
    title: 'Tradition Defended',
    text: 'The people reject your decree. You are branded a heretic, and the tradition continues stronger than ever.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'DEFEATED', effects: {} }],
  },
  {
    id: 'INFO_PIRATE_SUCCESS',
    title: 'Pirates Tamed',
    text: 'The pirates serve you now. River trade is yours to control, bringing gold and security.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'COMMAND', effects: {} }],
  },
  {
    id: 'INFO_PIRATE_FAILURE',
    title: 'Pirates Raid',
    text: 'The pirates scoff at your authority. They raid your docks and escape with your gold.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'LOSSES', effects: {} }],
  },
  {
    id: 'INFO_MARRIAGE_SUCCESS',
    title: 'Marriage Sealed',
    text: 'The alliance is formed on favorable terms. Wealth, troops, and prestige flow from the union.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'ALLIANCE', effects: {} }],
  },
  {
    id: 'INFO_MARRIAGE_FAILURE',
    title: 'Marriage Broken',
    text: 'The family withdraws the offer, insulted by your demands. The alliance opportunity is lost.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'LOST', effects: {} }],
  },
  // Feedback events for LOW authority commit scenarios
  {
    id: 'INFO_LOW_PLEA_SUCCESS',
    title: 'Merchant Impressed',
    text: 'The merchant sees potential in you. "Perhaps you\'re worth investing in after all," he says, handing over coins and words of support.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'GRATEFUL', effects: {} }],
  },
  {
    id: 'INFO_LOW_PLEA_FAILURE',
    title: 'Merchant Dismisses You',
    text: 'The merchant shakes his head. "You lack the standing I need. Come back when you\'re a real leader." He walks away.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'HUMILIATED', effects: {} }],
  },
  {
    id: 'INFO_LOW_GUARD_SUCCESS',
    title: 'Guards Rallied',
    text: 'Your words strike a chord. The guards stand straighter, remembering their oaths. "We\'ll stand with you, lord," their captain declares.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'UNITED', effects: {} }],
  },
  {
    id: 'INFO_LOW_GUARD_FAILURE',
    title: 'Guards Desert',
    text: 'Your speech falls flat. The guards exchange glances and begin walking away. Some leave the settlement entirely.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'ABANDONED', effects: {} }],
  },
  {
    id: 'INFO_LOW_RESPECT_SUCCESS',
    title: 'Respect Earned',
    text: 'The villagers see your determination and courage. Slowly, they begin to believe in you again. You\'ve turned a corner.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'RENEWED', effects: {} }],
  },
  {
    id: 'INFO_LOW_RESPECT_FAILURE',
    title: 'Respect Lost',
    text: 'Your attempt to assert yourself backfires spectacularly. Villagers laugh openly, and some pack their belongings to leave.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'MOCKED', effects: {} }],
  },
  {
    id: 'INFO_LOW_DEBT_SUCCESS',
    title: 'Debt Reduced',
    text: 'Your negotiating skill surprises the creditors. They agree to reduced terms, impressed by your resolve despite your circumstances.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'RELIEVED', effects: {} }],
  },
  {
    id: 'INFO_LOW_DEBT_FAILURE',
    title: 'Debt Enforced',
    text: 'The creditors laugh at your weak position. They seize assets and spread word of your incompetence throughout the region.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'CRUSHED', effects: {} }],
  },
  {
    id: 'INFO_TRAVELER_INVESTIGATED',
    title: 'Investigation Success',
    text: 'Your investigation reveals the traveler is indeed a respected scholar. Your cautious approach is seen as wise leadership.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'VINDICATED', effects: {} }],
  },
  {
    id: 'INFO_TRAVELER_INVESTIGATION_FAILED',
    title: 'Investigation Failed',
    text: 'Your investigation found nothing, but the traveler is offended by your suspicion. Word spreads that you are paranoid and unwelcoming.',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'EMBARRASSED', effects: {} }],
  },
];

/**
 * Validates all requests for common data quality issues.
 * This function runs only in development mode.
 * Throws errors if validation fails.
 */
export function validateRequests(): void {
  const allRequests = [...needRequests, ...infoRequests, ...authorityInfoRequests, ...eventRequests];
  const errors: string[] = [];

  // Collect all request IDs
  const requestIds = new Set<string>();
  const duplicateIds: string[] = [];

  for (const request of allRequests) {
    // Check 1: Info requests must have exactly 1 option, all others must have exactly 2
    const isInfoRequest = request.id.startsWith('INFO_');
    const expectedOptions = isInfoRequest ? 1 : 2;
    if (request.options.length !== expectedOptions) {
      errors.push(
        `Request "${request.id}" has ${request.options.length} options, expected exactly ${expectedOptions}`
      );
    }

    // Check 2: Request IDs must be unique
    if (requestIds.has(request.id)) {
      duplicateIds.push(request.id);
    }
    requestIds.add(request.id);

    // Check 3: No empty title, text, or option labels
    if (!request.title || request.title.trim() === '') {
      errors.push(`Request "${request.id}" has empty title`);
    }
    if (!request.text || request.text.trim() === '') {
      errors.push(`Request "${request.id}" has empty text`);
    }

    for (let optionIndex = 0; optionIndex < request.options.length; optionIndex++) {
      const option = request.options[optionIndex];
      if (!option.text || option.text.trim() === '') {
        errors.push(
          `Request "${request.id}" option ${optionIndex} has empty text`
        );
      }
    }

    // Note: FollowUp candidate ID validation happens after all IDs are collected
  }

  // Report duplicate IDs
  if (duplicateIds.length > 0) {
    errors.push(
      `Duplicate request IDs found: ${duplicateIds.join(', ')}`
    );
  }

  // Check 4: Validate followUp candidate IDs exist
  for (const request of allRequests) {
    if (request.followUps) {
      for (const followUp of request.followUps) {
        for (const candidate of followUp.candidates) {
          if (!requestIds.has(candidate.requestId)) {
            errors.push(
              `Request "${request.id}" has followUp candidate with non-existent ID: "${candidate.requestId}"`
            );
          }
        }
      }
    }
  }

  // Throw error if any validation failed
  if (errors.length > 0) {
    throw new Error(
      `Request validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`
    );
  }
}
