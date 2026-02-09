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
      {
        text: 'Continue.',
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
      {
        text: 'Continue.',
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
      {
        text: 'Continue.',
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
      {
        text: 'Continue.',
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
      {
        text: 'Continue.',
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
        },
      },
      {
        text: 'NO',
        effects: {
          satisfaction: 3,
        },
      },
    ],
  },
  {
    id: 'EVT_RAID_SMALL',
    title: 'Shadows in the Woods',
    text: 'A small band of brigands has been spotted nearby. Do we drive them off by force or pay a "toll" to keep the peace?',
    combat: {
      enemyForces: 8,
      prepDelayMinTicks: 1,
      prepDelayMaxTicks: 3,
      onWin: {
        gold: 15,
        satisfaction: 5,
      },
      onLose: {
        gold: -20,
        farmers: -5,
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
        },
      },
    ],
  },
  {
    id: 'EVT_RAID_LARGE',
    title: 'The War Horns',
    text: 'A massive raiding force is at the gates! Stand your ground and fight, or the intruders will bring destruction to your village.',
    combat: {
      enemyForces: 20,
      prepDelayMinTicks: 1,
      prepDelayMaxTicks: 3,
      onWin: {
        gold: 20,
        fireRisk: 12,
      },
      onLose: {
        gold: -30,
        satisfaction: -5,
        farmers: -8,
      },
    },
    options: [
      {
        text: 'FIGHT',
        effects: {},
      },
      {
        text: 'DO NOT FIGHT',
        effects: {
          gold: -30,
          satisfaction: -5,
          farmers: -8,
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
        },
      },
      {
        text: 'REFUSE',
        effects: {
          landForces: -2,
          satisfaction: -4,
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
    id: 'EVT_VETERANS_LEAVE',
    title: 'The Old Guard',
    text: 'Your most experienced fighters are considering retirement. A small bonus might convince them to stay and train the new recruits.',
    options: [
      {
        text: 'COMPENSATE',
        effects: {
          gold: -15,
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
        },
      },
      {
        text: 'CRACK DOWN',
        effects: {
          landForces: -2,
          farmers: -10,
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
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -15,
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
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          farmers: -10,
          health: -5,
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
        },
      },
      {
        text: 'DECLINE',
        effects: {},
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
        },
      },
      {
        text: 'DECLINE',
        effects: {},
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
        },
      },
      {
        text: 'DECLINE',
        effects: {},
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
        },
      },
      {
        text: 'DECLINE',
        effects: {},
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
        },
      },
      {
        text: 'RAISE taxes',
        effects: {
          gold: 25,
          satisfaction: -6,
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
    text: 'The traveler was a spy! They have stolen supplies and fled into the darkness.',
    canTriggerRandomly: false,
    options: [
      {
        text: 'PURSUE',
        effects: {
          gold: -15,
          landForces: -2,
        },
      },
      {
        text: 'LET THEM GO',
        effects: {
          gold: -20,
          satisfaction: -5,
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
          health: 3,
        },
      },
      {
        text: 'IGNORE SUPERSTITION',
        effects: {
          satisfaction: -3,
          health: -2,
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
      enemyForces: 15,
      prepDelayMinTicks: 1,
      prepDelayMaxTicks: 3,
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
      { text: 'RISKY CHARGE', effects: { landForces: -8, gold: 15 } },
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
      enemyForces: 25,
      prepDelayMinTicks: 1,
      prepDelayMaxTicks: 2,
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
        text: 'RETREAT', 
        effects: {
          satisfaction: -5,
          gold: -15,
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
    options: [
      { text: 'HOLD', effects: { landForces: -4 } },
      { text: 'COUNTERSTRIKE', effects: { landForces: -6, gold: 10 } },
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
    options: [
      { text: 'PROTECT THE VILLAGE', effects: { landForces: -5, fireRisk: -4, satisfaction: 1 } },
      { text: 'PRESS THE LINE', effects: { landForces: -3, farmers: -4, fireRisk: 6 } },
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
    options: [
      { text: 'ALL-IN STRIKE', effects: { landForces: -5, gold: 35, satisfaction: 5 } },
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
];

/**
 * Validates all requests for common data quality issues.
 * This function runs only in development mode.
 * Throws errors if validation fails.
 */
export function validateRequests(): void {
  const allRequests = [...needRequests, ...infoRequests, ...eventRequests];
  const errors: string[] = [];

  // Collect all request IDs
  const requestIds = new Set<string>();
  const duplicateIds: string[] = [];

  for (const request of allRequests) {
    // Check 1: Each request must have exactly 2 options
    if (request.options.length !== 2) {
      errors.push(
        `Request "${request.id}" has ${request.options.length} options, expected exactly 2`
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
