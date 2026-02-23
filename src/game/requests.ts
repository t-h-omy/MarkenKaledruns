/**
 * Request data for the Proof-of-Fun game.
 * Based on POF_SPEC.md specification.
 * Contains 130 event-requests (25 base + 44 Blackgeat chain + 34 chains 1-5 + 27 chains 6-10).
 */

import type { Request } from './models';


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
          authority: 1,
        },
      },
      {
        text: 'NO',
        effects: {
          satisfaction: 5,
          authority: -1,
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
        authority: 1,
      },
      onLose: {
        gold: -10,
        authority: -2,
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
          authority: -1,
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
        authority: 2,
      },
      onLose: {
        gold: -30,
        farmers: -8,
        satisfaction: -5,
        authority: -4,
      },
    },
    options: [
      {
        text: 'FIGHT',
        effects: {fireRisk: 10},
      },
      {
        text: 'SURRENDER',
        effects: {
          gold: -20,
          satisfaction: -3,
          authority: -4,
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
          authority: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_RESTLESS_NIGHT',
    title: 'Whispers in the Dark',
    text: 'Strange noises have been reported near the storage huts. Send a patrol to investigate, or dismiss it as simple superstition?',
    combat: {
      enemyForces: 2,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        authority: 1,
        satisfaction: 2
      },
      onLose: {
        farmers: -5,
        satisfaction: -5,
        authority: -2,
      },
    },
    options: [
      {
        text: 'PATROL',
        effects: {
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
          gold: -10,
          authority: 1,
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
          farmers: 6,
          landForces: 2,
          fireRisk: 4,
          health: -2,
        },
      },
      {
        text: 'DECLINE',
        effects: {
          satisfaction: 2,
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
          satisfaction: 2,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          farmers: -7,
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
          satisfaction: 2,
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
    text: 'The crops are ripening all at once. Hiring seasonal helpers could save the harvest before the rats can spread.',
    options: [
      {
        text: 'HIRE',
        effects: {
          gold: -15,
          farmers: 5,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          health: -4,
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
          authority: -4,
        },
      },
      {
        text: 'CRACK DOWN',
        effects: {
          landForces: -5,
          farmers: -10,
          satisfaction: 15,
          authority: 2,
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
        text: 'HIRE A HEALER',
        effects: {
          gold: -40,
          health: 20,
        },
      },
      {
        text: 'SORT OUT THE SICK',
        effects: {
          farmers: -15,
          health: 15,
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
          fireRisk: -5,
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
          satisfaction: 4,
        },
      },
      {
        text: 'DECLINE',
        effects: {
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
          gold: -15,
          health: 5,
        },
      },
      {
        text: 'DECLINE',
        effects: {
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
          authority: 1,
        },
      },
      {
        text: 'DECLINE',
        effects: {
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
          fireRisk: -4,
        },
      },
      {
        text: 'DECLINE',
        effects: {
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
          gold: -20,
          satisfaction: 5,
          authority: -1,
        },
      },
      {
        text: 'RAISE taxes',
        effects: {
          gold: 25,
          satisfaction: -8,
          authority: 1,
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
        text: 'FIGHT THE FIRE',
        effects: {
          gold: -5,
          health: -2,
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
          satisfaction: -4,
        },
      },
      {
        text: 'IGNORE',
        effects: {
          health: -5,
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
          authority: 1,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          gold: -15,
          authority: -1,
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
          health: 1,
        },
      },
      {
        text: 'DO NOTHING',
        effects: {
          satisfaction: -4,
          farmers: -4,
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
          fireRisk: -2
        },
      },
      {
        text: 'IGNORE',
        effects: {
          fireRisk: 4,
          health: -3,
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
          satisfaction: 1,
        },
      },
      {
        text: 'NOT MY PROBLEM',
        effects: {
          farmers: -4,
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
      { text: 'UPGRADE ARMS', effects: { gold: -10, landForces: 5 } },
      { text: 'MARCH NOW', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
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
      enemyForces: 7,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        satisfaction: 2,
        authority: 1,
      },
      onLose: {
        satisfaction: -3,
        authority: -2
      },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 3,
          delayMaxTicks: 6,
          candidates: [{ requestId: 'CHAIN_BLACKGEAT_AFTER_BATTLE_STATE', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 3,
          delayMaxTicks: 6,
          candidates: [{ requestId: 'CHAIN_BLACKGEAT_AFTER_BATTLE_STATE', weight: 1 }],
        },
      ],
    },
    options: [
      { text: 'HOLD THE LINE', effects: {} },
      { text: 'RETREAT NOW', effects: { satisfaction: -2, authority: -3 } },
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
      { text: 'RETURN HOME TRIUMPHANT', effects: { authority: 3, satisfaction: 3 } },
      { text: 'LOOT THE BATTLEFIELD', effects: { gold: 25 } },
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
      { text: 'PAY FOR PIECE', effects: { gold: -15, authority: -2 } },
      { text: 'THROW HIM OUT', effects: { authority: 1 } },
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
      { text: 'PAY AGAIN', effects: { gold: -15, authority: -2 } },
      { text: 'PREPARE FOR WAR', effects: { authority: 1 } },
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
      enemyForces: 15,
      prepDelayMinTicks: 5,
      prepDelayMaxTicks: 8,
      onWin: {
        satisfaction: 2,
        authority: 2,
      },
      onLose: {
        gold: - 25,
        satisfaction: -3,
        authority: -3
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
        effects: { fireRisk: 5 }
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
        effects: { satisfaction: 6, health: 4, authority: 2} 
      },
      { 
        text: 'REBUILD THE BORDER', 
        effects: { gold: -10, landForces: 8, fireRisk: -8, authority: 2} 
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
        effects: { health: 4, satisfaction: 3} 
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
      { text: 'PAY', effects: { gold: -15, authority: -1} },
      { text: 'REFUSE', effects: {authority: 1} },
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
      { text: 'PAY', effects: { gold: -15, authority: -1} },
      { text: 'REFUSE', effects: {authority: 1} },
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
      { text: 'PREenemyFOR WAR', effects: { farmers: -5, landForces: 5 } },
      { text: 'PAY TO DELAY', effects: { gold: -15 } },
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
      { text: 'STAND FIRM', effects: {  } },
      { text: 'BACK DOWN', effects: { gold: -15, farmers: -5, authority: -3} },
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
      { text: 'DEMAND GOLD', effects: { gold: 30, satisfaction: 1, authority: 2} },
      { text: 'DEMAND SWORDS', effects: { landForces: 5, satisfaction: 1, authority: 2} },
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
      { text: 'SEND LATE AID', effects: { gold: -15, landForces: -6 } },
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
      { text: 'BOW and PAY', effects: { gold: -15, authority: -1,} },
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
      { text: 'BOW and PAY', effects: { gold: -15, authority: -1} },
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
      { text: 'RAISE THE HOST', effects: { landForces: 4, farmers: -4, gold: -10 } },
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
        authority: 2,
      },
      onLose: {
        satisfaction: -3,
        authority: -3,
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
      enemyForces: 10,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        satisfaction: 2,
        authority: 2,
      },
      onLose: {
        satisfaction: -2,
        authority: -2,
      },
    },
    options: [
      { text: 'PROTECT THE VILLAGE', effects: { fireRisk: -4, satisfaction: 1 } },
      { text: 'PRESS THE LINE', effects: { farmers: -4, fireRisk: 5 } },
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
      enemyForces: 15,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 5,
      onWin: {
        satisfaction: 2,
        authority: 2,
      },
      onLose: {
        satisfaction: -3,
        authority: -3,
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
      { text: 'SELL THE LOOT', effects: { gold: 35, satisfaction: 2, authority: 1,} },
      { text: 'KEEP THE LOOT', effects: { landForces: 5, satisfaction: 2, authority:1,} },
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
      { text: 'ACCEPT HELP', effects: { landForces: 4 } },
      { text: 'ACCEPT AND PAY THEM', effects: { gold: -15, landForces: 8 } },
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
      { text: 'SAFE TREASURY', effects: { gold: -15, farmers: -12, authority: -3,} },
      { text: 'SAFE YOUR PEOPLE ', effects: { gold: -35, farmers: -4, authority: -3,} },
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
      { text: 'PAY', effects: { gold: -15, satisfaction: -1, authority: -1,} },
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
      { text: 'PAY', effects: { gold: -15, satisfaction: -1, authority: -1,} },
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
      { text: 'PAY', effects: { gold: -15, satisfaction: -2, authority: -1,} },
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
      { text: 'PAY', effects: { gold: -15, satisfaction: -2, authority: -1,} },
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
      { text: 'PAY', effects: { gold: -15, satisfaction: -1, authority: -1,} },
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
    requires: ['building:marketplace'],
    options: [
      {
        text: 'RISKY DEALS',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
          onSuccess: {
            gold: 25,
            satisfaction: 2,
            authority: 1,
          },
          onFailure: {
            gold: -10,
            satisfaction: -3,
          },
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 2,
          minSuccessChance: 25,
          maxSuccessChance: 80,
        },
      },
      {
        text: 'STEADY TRADE',
        effects: {
          gold: 10,
        },
      },
      },
    ],
  },

  {
    id: 'EVENT_TAVERN_AFTER_WORK',
    title: 'After-Work at the Tavern',
    text: 'After a long day of labor, the villagers gather at the tavern. Should you subsidize their drinks to boost morale, or let them enjoy at their own expense?',
    requires: ['building:brewery'],
    options: [
      {
        text: 'LET THEM PAY',
        effects: {
          satisfaction: 2,
        },
      },
      {
        text: 'SUBSIDIZE DRINKS',
        effects: {
          satisfaction: 5,
          gold: -10,
        },
      },
    ],
  },
  
  // LOW AUTHORITY EVENTS (authorityMin: 0, authorityMax: 33)
  // These events reflect weak leadership, disrespect, and vulnerability
  {
    id: 'EVT_LOW_AUTHORITY',
    title: 'Desperate Plea',
    text: 'With your authority waning, a merchant demands protection money. Your weakened position makes this a difficult situation.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'PAY PROTECTION',
        effects: {
          gold: -15,
          authority: -2,
        },
      },
      {
        text: 'REFUSE',
        effects: {
          authority: 1,
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
          landForces: -4,
          satisfaction: -5,
          authority: 1,
        },
      },
      {
        text: 'IGNORE IT',
        effects: {
          authority: -2,
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
    text: 'A local merchant offers to help rebuild your reputation for a small fee.',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'TAKE THE OFFER',
        effects: {gold: -5},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
          onSuccess: {
            satisfaction: 4,
            authority: 3,
          },
          onFailure: {
            satisfaction: -5,
          },
          successFeedbackRequestId: 'INFO_LOW_PLEA_SUCCESS',
          failureFeedbackRequestId: 'INFO_LOW_PLEA_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 5,
          minSuccessChance: 40,
          maxSuccessChance: 90,
        },
      },
      {
        text: 'DECLINE',
        effects: {
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
          maxCommit: 10,
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
          minSuccessChance: 55,
          maxSuccessChance: 90,
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
          maxCommit: 10,
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
          minSuccessChance: 55,
          maxSuccessChance: 90,
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
    text: 'Creditors circle like vultures. Hiring a lawyer to negotiate costs gold upfront. If you can muster enough authority, you might secure better terms. Otherwise, they will take everything.',
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
          maxCommit: 25,
          onSuccess: {
            gold: 20,
            authority: 1,
          },
          onFailure: {
            gold: -15,
          },
          successFeedbackRequestId: 'INFO_LOW_DEBT_SUCCESS',
          failureFeedbackRequestId: 'INFO_LOW_DEBT_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 2,
          minSuccessChance: 30,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'PAY FULL PRICE',
        effects: {
          gold: -15,
          authority: -1,
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
          authority: 3,
        },
      },
      {
        text: 'ATTEND HUMBLY',
        effects: {
          gold: -10,
          authority: -1,
          satisfaction: 4,
        },
      },
    ],
  },
  {
    id: 'EVT_HIGH_BETRAYAL',
    title: 'The Trusted Betrayer',
    text: 'Your closest advisor and some guards have been secretly undermining you, selling information to your enemies. They offer you an \'incentive\' to make it go away. How will you handle this betrayal?',
    authorityMin: 67,
    authorityMax: 100,
    options: [
      {
        text: 'PUBLIC EXECUTION',
        effects: {
          authority: 3,
          satisfaction: 4,
          landForces: -5,
        },
      },
      {
        text: 'TAKE THE \'INCENTIVE\'',
        effects: {
          gold: 30,
          satisfaction: -5,
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
          gold: 30,
          authority: 2,
        },
      },
      {
        text: 'REFUSE GRACIOUSLY',
        effects: {
          satisfaction: 4,
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
          gold: 25,
          authority: 3,
          satisfaction: -3,
        },
      },
      {
        text: 'SHOW MERCY',
        effects: {
          authority: -2,
          satisfaction: 3,
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
          authority: 5,
          satisfaction: 6,
        },
      },
      {
        text: 'MODEST AFFAIR',
        effects: {
          gold: -15,
          authority: 1,
          satisfaction: 3,
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
        text: 'DEMAND APOLOGY (AND COMPENSATION)',
        effects: {

        },
        authorityCheck: {
          minCommit: 15,
          maxCommit: 40,
          onSuccess: {
            authority: 2,
            satisfaction: 3,
            gold: 20,
          },
          onFailure: {
          },
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 5,
          minSuccessChance: 40,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'PREPARE FOR WAR',
        effects: {
          authority: 1,
          landForces: 5,
          gold: -25,
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
        },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 40,
          onSuccess: {
            gold: 30,
            authority: 1,
          },
          onFailure: {
            authority: -1,
          },
          successFeedbackRequestId: 'INFO_TRADE_SUCCESS',
          failureFeedbackRequestId: 'INFO_TRADE_FAILURE',
          refundOnSuccessPercent: 100,
          minSuccessChance: 30,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'ACCEPT THEIR TERMS',
        effects: {
          gold: 15,
          authority: -1,
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
          maxCommit: 25,
          onSuccess: {
            satisfaction: 5,
            authority: 2,
          },
          onFailure: {
            satisfaction: -5,
            landForces: -3,
          },
          successFeedbackRequestId: 'INFO_RIOT_SUCCESS',
          failureFeedbackRequestId: 'INFO_RIOT_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 5,
          minSuccessChance: 25,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'SEND IN GUARDS',
        effects: {
          satisfaction: -5,
          landForces: -3,
          authority: 3,
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
          maxCommit: 20,
          onSuccess: {
            satisfaction: 5,
          },
          onFailure: {
            satisfaction: -5,
          },
          successFeedbackRequestId: 'INFO_JUSTICE_SUCCESS',
          failureFeedbackRequestId: 'INFO_JUSTICE_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 8,
          minSuccessChance: 55,
          maxSuccessChance: 90,
        },
      },
      {
        text: 'DEFER TO COUNCIL',
        effects: {
          authority: -1,
          satisfaction: 2,
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
          minCommit: 10,
          maxCommit: 30,
          onSuccess: {
            landForces: 10,
            authority: 3,
          },
          onFailure: {
            landForces: -5,
            satisfaction: -3,
          },
          successFeedbackRequestId: 'INFO_REFORM_SUCCESS',
          failureFeedbackRequestId: 'INFO_REFORM_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 4,
          minSuccessChance: 50,
          maxSuccessChance: 85,
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
          minCommit: 5,
          maxCommit: 25,
          onSuccess: {
            landForces: 6,
            authority: 2,
          },
          onFailure: {
            gold: -20,
            fireRisk: 5,
          },
          successFeedbackRequestId: 'INFO_BANDIT_SUCCESS',
          failureFeedbackRequestId: 'INFO_BANDIT_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 0,
          minSuccessChance: 50,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'REFUSE THEM',
        effects: {
          authority: -2,
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
          maxCommit: 40,
          onSuccess: {
            gold: 30,
          },
          onFailure: {
            gold: -10,
            satisfaction: -5,
          },
          successFeedbackRequestId: 'INFO_TAX_SUCCESS',
          failureFeedbackRequestId: 'INFO_TAX_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 3,
          minSuccessChance: 25,
          maxSuccessChance: 85,
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
          minCommit: 10,
          maxCommit: 30,
          onSuccess: {
            satisfaction: 5,
            authority: 2,
          },
          onFailure: {
            satisfaction: -5,
            farmers: -5,
          },
          successFeedbackRequestId: 'INFO_RELIGIOUS_SUCCESS',
          failureFeedbackRequestId: 'INFO_RELIGIOUS_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 0,
          minSuccessChance: 50,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'ALLOW PLURALISM',
        effects: {
          satisfaction: 2,
          authority: -2,
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
          minCommit: 15,
          maxCommit: 25,
          onSuccess: {
            farmers: 5,
            gold: 25,
            authority: 2,
          },
          onFailure: {
            landForces: -6,
            satisfaction: -5,
          },
          successFeedbackRequestId: 'INFO_BORDER_SUCCESS',
          failureFeedbackRequestId: 'INFO_BORDER_FAILURE',
          refundOnSuccessPercent: 90,
          extraLossOnFailure: 10,
          minSuccessChance: 50,
          maxSuccessChance: 80,
        },
      },
      {
        text: 'CONCEDE LANDS',
        effects: {
          authority: -1,
          satisfaction: -2,
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_CORRUPT_OFFICIAL',
    title: 'Corruption Exposed',
    text: 'A powerful official is caught embezzling. Punishing them requires authority and investment, as they have many allies.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'PROSECUTE FULLY',
        effects: {gold: -10,},
        authorityCheck: {
          minCommit: 5,
          maxCommit: 20,
          onSuccess: {
            gold: 25,
            satisfaction: 4,
            authority: 2,
          },
          onFailure: {
            gold: -15,
            satisfaction: -3,
            landForces: -3,
          },
          successFeedbackRequestId: 'INFO_CORRUPT_SUCCESS',
          failureFeedbackRequestId: 'INFO_CORRUPT_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 10,
          minSuccessChance: 40,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'QUIET DISMISSAL',
        effects: {
          authority: -2,
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
          minCommit: 10,
          maxCommit: 40,
          onSuccess: {
            gold: 40,
            landForces: 5,
            authority: 2,
          },
          onFailure: {
            gold: -20,
            landForces: -3,
            satisfaction: -3,
          },
          successFeedbackRequestId: 'INFO_SUCCESSION_SUCCESS',
          failureFeedbackRequestId: 'INFO_SUCCESSION_FAILURE',
          refundOnSuccessPercent: 80,
          extraLossOnFailure: 0,
          minSuccessChance: 50,
          maxSuccessChance: 80,
        },
      },
      {
        text: 'STAY NEUTRAL',
        effects: {
          authority: -2,
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
          minCommit: 5,
          maxCommit: 20,
          onSuccess: {
            gold: 30,
            satisfaction: 3,
          },
          onFailure: {
            gold: -20,
            satisfaction: -3,
          },
          successFeedbackRequestId: 'INFO_GUILD_SUCCESS',
          failureFeedbackRequestId: 'INFO_GUILD_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 0,
          minSuccessChance: 55,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'FORCE COMPROMISE',
        effects: {
          gold: 10,
          authority: -1,
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
          maxCommit: 40,
          onSuccess: {
            gold: 25,
            authority: 1,
          },
          onFailure: {
            authority: -2,
            satisfaction: -3,
          },
          successFeedbackRequestId: 'INFO_ENVOY_SUCCESS',
          failureFeedbackRequestId: 'INFO_ENVOY_FAILURE',
          refundOnSuccessPercent: 100,
          minSuccessChance: 45,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'ACCEPT THEIR TERMS',
        effects: {
          gold: 10,
          authority: -1,
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
          minCommit: 10,
          maxCommit: 40,
          onSuccess: {
            farmers: 5,
            satisfaction: 5,
            authority: 2,
          },
          onFailure: {
            satisfaction: -3,
            gold: -25,
            farmers: -5,
          },
          successFeedbackRequestId: 'INFO_LAND_SUCCESS',
          failureFeedbackRequestId: 'INFO_LAND_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 0,
          minSuccessChance: 45,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'MAINTAIN STATUS QUO',
        effects: {
          satisfaction: -3,
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
          minCommit: 5,
          maxCommit: 20,
          onSuccess: {
            health: 6,
          },
          onFailure: {
            satisfaction: -5,
          },
          successFeedbackRequestId: 'INFO_TRADITION_SUCCESS',
          failureFeedbackRequestId: 'INFO_TRADITION_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 0,
          minSuccessChance: 55,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'RESPECT TRADITION',
        effects: {
          satisfaction: 3,
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
          minCommit: 5,
          maxCommit: 25,
          onSuccess: {
            landForces: 6,
          },
          onFailure: {
          },
          successFeedbackRequestId: 'INFO_PIRATE_SUCCESS',
          failureFeedbackRequestId: 'INFO_PIRATE_FAILURE',
          refundOnSuccessPercent: 100,
          extraLossOnFailure: 5,
          minSuccessChance: 25,
          maxSuccessChance: 80,
        },
      },
      {
        text: 'IGNORE THEM',
        effects: {
        },
      },
    ],
  },
  {
    id: 'EVT_COMMIT_MARRIAGE_ALLIANCE',
    title: 'Political Marriage',
    text: 'A powerful family offers a rather unbalanced marriage alliance. Securing favorable terms requires authority to negotiate from strength.',
    authorityMin: 34,
    authorityMax: 100,
    options: [
      {
        text: 'NEGOTIATE TERMS',
        effects: {},
        authorityCheck: {
          minCommit: 15,
          maxCommit: 50,
          onSuccess: {
            gold: 45,
            landForces: 5,
          },
          onFailure: {
            gold: -30,
            satisfaction: -5,
          },
          successFeedbackRequestId: 'INFO_MARRIAGE_SUCCESS',
          failureFeedbackRequestId: 'INFO_MARRIAGE_FAILURE',
          refundOnSuccessPercent: 90,
          extraLossOnFailure: 0,
          minSuccessChance: 40,
          maxSuccessChance: 85,
        },
      },
      {
        text: 'ACCEPT AS OFFERED',
        effects: {
          gold: 15,
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
          authority: -1,
          satisfaction: 3,
          gold: 10,
        },
      },
      {
        text: 'PUT HIM IN HIS PLACE',
        effects: {
          authority: 2,
          satisfaction: -3,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_PUBLIC_CRITICISM',
    title: 'Public Criticism',
    text: 'A popular merchant loudly criticizes your recent decisions in the town square. Others are watching to see how you respond.',
    options: [
      {
        text: 'LAUGH IT OFF',
        effects: {
          authority: -1,
          satisfaction: 3,
        },
      },
      {
        text: 'ARREST HIM',
        effects: {
          authority: 2,
          satisfaction: -5,
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
          authority: 2,
          satisfaction: -5,
          landForces: -1,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_FLATTERY',
    title: 'Obvious Flattery',
    text: 'A courtier praises you with absurd exaggerations, calling you "the greatest leader ever to walk the earth."',
    options: [
      {
        text: 'ENJOY THE PRAISE',
        effects: {
          authority: 2,
          satisfaction: -5,
        },
      },
      {
        text: 'CALL OUT THE LIE',
        effects: {
          authority: -2,
          satisfaction: 3,
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
          authority: -2,
          satisfaction: 5,
          gold: -10,
        },
      },
      {
        text: 'BLAME OTHERS',
        effects: {
          authority: 2,
          satisfaction: -5,
        },
      },
    ],
  },
  {
    id: 'EVT_EGO_RIVAL_SUCCESS',
    title: 'Rival\'s Success',
    text: 'A rival leader achieves great success. Your advisors suggest you might publicly congratulate him to show grace, but it would acknowledge their superiority.',
    options: [
      {
        text: 'CONGRATULATE HIM HUMBLY',
        effects: {
          authority: -2,
          gold: 10,
        },
      },
      {
        text: 'DENOUNCE HIM',
        effects: {
          authority: 2,
          satisfaction: -4,
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
          authority: 2,
          satisfaction: -4,
        },
      },
      {
        text: 'REFUSE HUMBLY',
        effects: {
          authority: -2,
          satisfaction: 4,
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
          authority: -1,
          satisfaction: 3,
          gold: -5,
        },
      },
      {
        text: 'DISMISS THE SERVANT',
        effects: {
          authority: 2,
          satisfaction: -4,
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
          gold: -30,
          authority: 4,
          satisfaction: -3,
        },
      },
      {
        text: 'MODEST CELEBRATION',
        effects: {
          gold: -10,
          satisfaction: 3,
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
          authority: -2,
          gold: 15,
        },
      },
      {
        text: 'PROCEED AS PLANNED',
        effects: {
          authority: 2,
          gold: -15,
          satisfaction: -2,
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
          gold: -25,
          authority: 4,
          satisfaction: -3,
        },
      },
      {
        text: 'DECLINE',
        effects: {
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
          authority: 2,
          farmers: -1,
          satisfation: -3,
        },
      },
      {
        text: 'IGNORE IT',
        effects: {
          authority: -1,
        },
      },
    ],
  },
  // EXAMPLE: Authority Boost Follow-Up System
  {
    id: 'EVT_MYSTERIOUS_TRAVELER_ENHANCED',
    title: 'Mysterious Traveler',
    text: 'A hooded stranger arrives at your gates, asking for shelter. He seems educated but evasive about his past.',
    canTriggerRandomly: true,
    authorityMin: 20,
    authorityMax: 100,
    options: [
      {
        text: 'INVITE HIM',
        effects: {
          gold: -5,
        },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 10,
          // No immediate effects - authority commit only affects follow-up probabilities
          // Follow-up probability boosts
          followUpBoosts: [
            {
              targetRequestId: 'EVT_TRAVELER_TEACHES',
              boostType: 'linear',
              boostValue: 4.0,  // At max commit (10): 75% → ~89%
              description: 'Increases chance traveler shares knowledge',
            },
          ],
        },
      },
      {
        text: 'SEND AWAY',
        effects: {
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [
          { requestId: 'EVT_TRAVELER_TEACHES', weight: 2 },
          { requestId: 'EVT_TRAVELER_BETRAYS', weight: 1 },
          // WITH AUTHORITY BOOST (these are old values but I leave them here as example):
          // No commit (0):     TEACHES 75% (3/4),      BETRAYS 25% (1/4)
          // Half commit (5):   TEACHES ~85% (5.5/6.5), BETRAYS ~15% (1/6.5)
          // Full commit (10):  TEACHES ~89% (8/9),     BETRAYS ~11% (1/9)
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
          health: 5,
          authority: 2,
        },
      },
      {
        text: 'POLITELY DECLINE',
        effects: {
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
          authority: -2,
        },
      },
      {
        text: 'ACCEPT THE LOSS',
        effects: {
          gold: -15,
          authority: -2,
          satisfaction: -2,
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
          gold: -15,
          health: -3,
        },
      },
      {
        text: 'IGNORE SUPERSTITION',
        effects: {
          satisfaction: -4,
          health: -3,
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

  // =========================================================
  // CHAIN 1 – Bandit Toll
  // Mechanics: combat outcome, option followUps, weighted random,
  //            chain-gating, maxTriggers
  // =========================================================
  {
    id: 'CHAIN_BANDIT_TOLL_START',
    chainId: 'bandit_toll',
    chainRole: 'start',
    chainRestartCooldownTicks: 80,
    maxTriggers: 3,
    title: 'Blocked Road',
    text: 'A band of armed men has set up a barricade across the only trade road. Their leader steps forward: "Toll is ten gold per cart. Pay or fight."',
    options: [
      { text: 'FIGHT THEM', effects: {} },
      { text: 'PAY THE TOLL', effects: { gold: -10, authority: -1 } },
    ],
    combat: {
      enemyForces: 5,
      prepDelayMinTicks: 2,
      prepDelayMaxTicks: 4,
      onWin: {
        gold: 15,
        authority: 2,
      },
      onLose: {
        gold: -5,
        satisfaction: -3,
        authority: -2,
      },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [
            { requestId: 'CHAIN_BANDIT_TOLL_LOOT', weight: 3 },
            { requestId: 'CHAIN_BANDIT_TOLL_SURVIVOR', weight: 2 },
          ],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [
            { requestId: 'CHAIN_BANDIT_TOLL_REGROUP', weight: 1 },
          ],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 8,
        candidates: [
          { requestId: 'CHAIN_BANDIT_TOLL_RETURN', weight: 3 },
          { requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_BANDIT_TOLL_LOOT',
    chainId: 'bandit_toll',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Spoils of Battle',
    text: 'The bandits are routed. Among their belongings your soldiers find stolen trade goods and a rough map of their hideout.',
    options: [
      { text: 'RAID THE HIDEOUT', effects: { gold: 20, landForces: -2 } },
      { text: 'BURN THE MAP', effects: { satisfaction: 3 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_VICTORY', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_BANDIT_TOLL_SURVIVOR',
    chainId: 'bandit_toll',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'A Bandit Speaks',
    text: 'One of the bandits survived. He offers information about a larger gang in exchange for his life.',
    options: [
      { text: 'SPARE HIM', effects: { authority: -1, satisfaction: 2 } },
      { text: 'EXECUTE HIM', effects: { authority: 1, satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [
          { requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 2 },
          { requestId: 'CHAIN_BANDIT_TOLL_END_VICTORY', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_VICTORY', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_BANDIT_TOLL_REGROUP',
    chainId: 'bandit_toll',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Licking Wounds',
    text: 'The bandits defeated your men but did not press the attack. Feldric advises rebuilding strength before they return.',
    options: [
      { text: 'RECRUIT MORE', effects: { gold: -10, landForces: 4 } },
      { text: 'NEGOTIATE PEACE', effects: { gold: -15, authority: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_RETURN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_BANDIT_TOLL_RETURN',
    chainId: 'bandit_toll',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'They Are Back',
    text: 'The bandits have returned with reinforcements. This time they demand double the toll or blood.',
    options: [
      { text: 'FIGHT AGAIN', effects: {} },
      { text: 'PAY DOUBLE', effects: { gold: -20, authority: -2 } },
    ],
    combat: {
      enemyForces: 8,
      prepDelayMinTicks: 2,
      prepDelayMaxTicks: 3,
      onWin: {
        gold: 25,
        authority: 3,
        satisfaction: 3,
      },
      onLose: {
        gold: -15,
        satisfaction: -5,
        authority: -3,
      },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_VICTORY', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_DEFEAT', weight: 1 }],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_BANDIT_TOLL_END_PEACE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_BANDIT_TOLL_END_VICTORY',
    chainId: 'bandit_toll',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'Road Secured',
    text: 'The trade road is clear at last. Merchants return, and the village prospers from renewed commerce.',
    options: [
      { text: 'CELEBRATE', effects: { satisfaction: 5, gold: 10 } },
      { text: 'FORTIFY THE ROAD', effects: { gold: -10, landForces: 3 } },
    ],
  },
  {
    id: 'CHAIN_BANDIT_TOLL_END_PEACE',
    chainId: 'bandit_toll',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'Uneasy Truce',
    text: 'The bandits move on to easier prey. The road reopens, though travelers remain wary.',
    options: [
      { text: 'POST GUARDS', effects: { landForces: -1, satisfaction: 3 } },
      { text: 'MOVE ON', effects: { satisfaction: 1 } },
    ],
  },
  {
    id: 'CHAIN_BANDIT_TOLL_END_DEFEAT',
    chainId: 'bandit_toll',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'A Costly Lesson',
    text: 'The bandits control the road now. Trade slows to a trickle and your people grow restless.',
    options: [
      { text: 'SEEK ALLIES', effects: { gold: -5, authority: 1 } },
      { text: 'ENDURE', effects: { satisfaction: -5 } },
    ],
  },

  // =========================================================
  // CHAIN 2 – Merchant Guild
  // Mechanics: option followUps, requirements (building:marketplace),
  //            weighted candidates, chain-gating
  // =========================================================
  {
    id: 'CHAIN_MERCHANT_GUILD_START',
    chainId: 'merchant_guild',
    chainRole: 'start',
    chainRestartCooldownTicks: 60,
    requires: ['building:marketplace'],
    title: 'Guild Proposal',
    text: 'A delegation of merchants arrives at the marketplace. They propose forming a guild to regulate trade and share profits — for a founding fee.',
    options: [
      { text: 'ACCEPT', effects: { gold: -25 } },
      { text: 'REJECT', effects: { satisfaction: -3 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 6,
        candidates: [
          { requestId: 'CHAIN_MERCHANT_GUILD_PROSPEROUS', weight: 3 },
          { requestId: 'CHAIN_MERCHANT_GUILD_CORRUPT', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 5,
        delayMaxTicks: 8,
        candidates: [
          { requestId: 'CHAIN_MERCHANT_GUILD_SMUGGLERS', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_MERCHANT_GUILD_PROSPEROUS',
    chainId: 'merchant_guild',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Thriving Commerce',
    text: 'The guild is running smoothly. Goods flow, prices stabilize, and the treasury benefits. The guild master asks to expand operations.',
    options: [
      { text: 'EXPAND', effects: { gold: -15, satisfaction: 5 } },
      { text: 'KEEP CURRENT SIZE', effects: { gold: 10 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_WEALTH', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_STABLE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MERCHANT_GUILD_CORRUPT',
    chainId: 'merchant_guild',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Shady Dealings',
    text: 'Reports surface that guild members are price-fixing and skimming profits. The guild master denies it flatly.',
    options: [
      { text: 'INVESTIGATE', effects: { gold: -5, authority: 1 } },
      { text: 'TURN A BLIND EYE', effects: { gold: 5, satisfaction: -5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_MERCHANT_GUILD_END_REFORM', weight: 2 },
          { requestId: 'CHAIN_MERCHANT_GUILD_END_STABLE', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_STABLE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MERCHANT_GUILD_SMUGGLERS',
    chainId: 'merchant_guild',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Black Market',
    text: 'Without a guild, smugglers fill the void. Cheap goods appear but quality is terrible and crime rises.',
    options: [
      { text: 'CRACK DOWN', effects: { gold: -10, authority: 2 } },
      { text: 'TOLERATE IT', effects: { gold: 5, health: -3, satisfaction: -3 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_REFORM', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_MERCHANT_GUILD_END_STABLE', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_MERCHANT_GUILD_END_WEALTH',
    chainId: 'merchant_guild',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'Golden Age of Trade',
    text: 'The expanded guild brings prosperity. Merchants from distant lands flock to your marketplace.',
    options: [
      { text: 'HOST A TRADE FAIR', effects: { gold: 15, satisfaction: 5 } },
      { text: 'TAX THE PROFITS', effects: { gold: 20, satisfaction: -2 } },
    ],
  },
  {
    id: 'CHAIN_MERCHANT_GUILD_END_STABLE',
    chainId: 'merchant_guild',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'Steady Trade',
    text: 'Trade continues at a modest pace. The guild — or lack thereof — has settled into a routine.',
    options: [
      { text: 'GOOD ENOUGH', effects: { satisfaction: 2 } },
      { text: 'INVEST MORE', effects: { gold: -10, satisfaction: 4 } },
    ],
  },
  {
    id: 'CHAIN_MERCHANT_GUILD_END_REFORM',
    chainId: 'merchant_guild',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'A Fresh Start',
    text: 'With the corrupt elements removed, honest merchants return. The marketplace is cleaner and more trustworthy.',
    options: [
      { text: 'CELEBRATE', effects: { satisfaction: 5, authority: 1 } },
      { text: 'STAY VIGILANT', effects: { authority: 2 } },
    ],
  },

  // =========================================================
  // CHAIN 3 – Plague Rumors
  // Mechanics: option followUps, authority pool-gating
  //            (authorityMin/authorityMax), weighted candidates
  // =========================================================
  {
    id: 'CHAIN_PLAGUE_RUMORS_START',
    chainId: 'plague_rumors',
    chainRole: 'start',
    chainRestartCooldownTicks: 90,
    authorityMin: 20,
    authorityMax: 100,
    title: 'Dark Whispers',
    text: 'Travelers speak of a sickness spreading through neighboring settlements. Your healers urge precautions before it reaches your lands.',
    options: [
      { text: 'QUARANTINE BORDERS', effects: { gold: -15, satisfaction: -3 } },
      { text: 'DISMISS THE RUMORS', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [
          { requestId: 'CHAIN_PLAGUE_RUMORS_CONTAINED', weight: 3 },
          { requestId: 'CHAIN_PLAGUE_RUMORS_BREACH', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_PLAGUE_RUMORS_OUTBREAK', weight: 3 },
          { requestId: 'CHAIN_PLAGUE_RUMORS_NOTHING', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_PLAGUE_RUMORS_CONTAINED',
    chainId: 'plague_rumors',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Quarantine Holds',
    text: 'The border quarantine is working. Sickness has not reached your village, but trade has slowed to a crawl.',
    options: [
      { text: 'MAINTAIN QUARANTINE', effects: { gold: -10, health: 5 } },
      { text: 'REOPEN BORDERS', effects: { gold: 10, health: -3 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 4,
        delayMaxTicks: 6,
        candidates: [{ requestId: 'CHAIN_PLAGUE_RUMORS_END_SAFE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_PLAGUE_RUMORS_END_SAFE', weight: 2 },
          { requestId: 'CHAIN_PLAGUE_RUMORS_END_SICK', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_PLAGUE_RUMORS_BREACH',
    chainId: 'plague_rumors',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Quarantine Breached',
    text: 'Despite your efforts, a merchant slipped through the quarantine. Several villagers have fallen ill.',
    options: [
      { text: 'TREAT THE SICK', effects: { gold: -20, health: 3 } },
      { text: 'ISOLATE THEM', effects: { satisfaction: -5, health: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_PLAGUE_RUMORS_END_SAFE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_PLAGUE_RUMORS_END_SICK', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_PLAGUE_RUMORS_OUTBREAK',
    chainId: 'plague_rumors',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Plague Arrives',
    text: 'The sickness has reached your village. People are falling ill rapidly. The healers plead for resources.',
    options: [
      { text: 'FUND HEALERS', effects: { gold: -25, health: 5 } },
      { text: 'PRAY FOR THE BEST', effects: { health: -8, farmers: -5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 6,
        candidates: [
          { requestId: 'CHAIN_PLAGUE_RUMORS_END_SAFE', weight: 2 },
          { requestId: 'CHAIN_PLAGUE_RUMORS_END_SICK', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_PLAGUE_RUMORS_END_SICK', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_PLAGUE_RUMORS_NOTHING',
    chainId: 'plague_rumors',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'False Alarm',
    text: 'The rumors were overblown. No plague materialized and life continues as before.',
    options: [
      { text: 'RELIEF', effects: { satisfaction: 3 } },
      { text: 'STAY CAUTIOUS', effects: { authority: 1 } },
    ],
  },
  {
    id: 'CHAIN_PLAGUE_RUMORS_END_SAFE',
    chainId: 'plague_rumors',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'Crisis Averted',
    text: 'The sickness passes without major casualties. Your village emerges stronger and more resilient.',
    options: [
      { text: 'CELEBRATE SURVIVAL', effects: { satisfaction: 5, health: 3 } },
      { text: 'BUILD AN INFIRMARY', effects: { gold: -15, health: 8 } },
    ],
  },
  {
    id: 'CHAIN_PLAGUE_RUMORS_END_SICK',
    chainId: 'plague_rumors',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'Scars of Sickness',
    text: 'The plague has taken its toll. Empty homes stand as reminders. Recovery will take time.',
    options: [
      { text: 'MOURN AND REBUILD', effects: { satisfaction: -3, farmers: -5 } },
      { text: 'BURN THE DEAD', effects: { health: 3, satisfaction: -5 } },
    ],
  },

  // =========================================================
  // CHAIN 4 – Noble Feud
  // Mechanics: authority check with followUpBoosts (linear boost),
  //            combat outcome, weighted candidates, chain-gating
  // =========================================================
  {
    id: 'CHAIN_NOBLE_FEUD_START',
    chainId: 'noble_feud',
    chainRole: 'start',
    chainRestartCooldownTicks: 70,
    authorityMin: 34,
    authorityMax: 100,
    title: 'The Rival Lord',
    text: 'Lord Alden of a neighboring fief has laid claim to a strip of borderland that your farmers work. He demands you yield or face consequences.',
    options: [
      {
        text: 'ASSERT YOUR CLAIM',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 20,
          followUpBoosts: [
            {
              targetRequestId: 'CHAIN_NOBLE_FEUD_DIPLOMACY',
              boostType: 'linear',
              boostValue: 4.0,
              description: 'Increases chance of diplomatic resolution',
            },
          ],
        },
      },
      { text: 'YIELD THE LAND', effects: { farmers: -3, satisfaction: -4, authority: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_NOBLE_FEUD_DIPLOMACY', weight: 2 },
          { requestId: 'CHAIN_NOBLE_FEUD_ESCALATE', weight: 3 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 4,
        delayMaxTicks: 7,
        candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_YIELDED', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_NOBLE_FEUD_DIPLOMACY',
    chainId: 'noble_feud',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'A Reasonable Man',
    text: 'Lord Alden agrees to meet. Surprisingly, he is open to negotiation. Perhaps this can be settled without bloodshed.',
    options: [
      { text: 'OFFER COMPROMISE', effects: { gold: -10, authority: 1 } },
      { text: 'DEMAND FULL RIGHTS', effects: { authority: 2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_PEACE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'CHAIN_NOBLE_FEUD_END_PEACE', weight: 1 },
          { requestId: 'CHAIN_NOBLE_FEUD_ESCALATE', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_NOBLE_FEUD_ESCALATE',
    chainId: 'noble_feud',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Swords Drawn',
    text: 'Lord Alden has gathered his men. His banners appear on the borderland. Feldric readies the militia: "This is no bluff."',
    options: [
      { text: 'DEFEND THE BORDER', effects: {} },
      { text: 'OFFER TRIBUTE', effects: { gold: -20, authority: -3 } },
    ],
    combat: {
      enemyForces: 6,
      prepDelayMinTicks: 2,
      prepDelayMaxTicks: 4,
      onWin: {
        authority: 3,
        satisfaction: 3,
      },
      onLose: {
        farmers: -4,
        satisfaction: -4,
        authority: -3,
      },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_TRIUMPH', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_YIELDED', weight: 1 }],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_NOBLE_FEUD_END_YIELDED', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_NOBLE_FEUD_END_PEACE',
    chainId: 'noble_feud',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'Neighborly Accord',
    text: 'You and Lord Alden reach a fair agreement. The border is settled and both fiefs benefit from cooperation.',
    options: [
      { text: 'TOAST TO PEACE', effects: { satisfaction: 4, gold: 5 } },
      { text: 'FORMALIZE THE PACT', effects: { authority: 2 } },
    ],
  },
  {
    id: 'CHAIN_NOBLE_FEUD_END_TRIUMPH',
    chainId: 'noble_feud',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'The Border Stands',
    text: 'Lord Alden retreats in defeat. The borderland remains yours. Your people cheer their victory.',
    options: [
      { text: 'REWARD THE MILITIA', effects: { gold: -10, landForces: 3, satisfaction: 5 } },
      { text: 'FORTIFY THE BORDER', effects: { gold: -15, landForces: 5 } },
    ],
  },
  {
    id: 'CHAIN_NOBLE_FEUD_END_YIELDED',
    chainId: 'noble_feud',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'Land Lost',
    text: 'The borderland now belongs to Lord Alden. Your farmers must find new fields, and your authority has suffered.',
    options: [
      { text: 'ACCEPT THE LOSS', effects: { satisfaction: -3 } },
      { text: 'PLAN REVENGE', effects: { authority: 1, satisfaction: -1 } },
    ],
  },

  // =========================================================
  // CHAIN 5 – Harvest Festival
  // Mechanics: option followUps, requirements (need:beer),
  //            maxTriggers, chain-gating, weighted candidates
  // =========================================================
  {
    id: 'CHAIN_HARVEST_FEST_START',
    chainId: 'harvest_fest',
    chainRole: 'start',
    chainRestartCooldownTicks: 50,
    maxTriggers: 2,
    requires: ['building:brewery'],
    title: 'Festival Season',
    text: 'The harvest is in and the people want a grand festival. Brewers offer their finest ale if you fund the event.',
    options: [
      { text: 'FUND THE FESTIVAL', effects: { gold: -20 } },
      { text: 'CANCEL IT', effects: { satisfaction: -3 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [
          { requestId: 'CHAIN_HARVEST_FEST_GREAT', weight: 3 },
          { requestId: 'CHAIN_HARVEST_FEST_TROUBLE', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_HARVEST_FEST_END_QUIET', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_HARVEST_FEST_GREAT',
    chainId: 'harvest_fest',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Joy and Ale',
    text: 'The festival is a roaring success! Music, dancing, and barrels of ale. But the crowd wants even more entertainment.',
    options: [
      { text: 'HIRE PERFORMERS', effects: { gold: -15, satisfaction: 3 } },
      { text: 'LET THEM ENJOY', effects: { satisfaction: 5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_HARVEST_FEST_END_GLORY', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_HARVEST_FEST_END_GOOD', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_HARVEST_FEST_TROUBLE',
    chainId: 'harvest_fest',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Drunken Brawl',
    text: 'Too much ale has led to a brawl between farmers. Fists fly and tables break. The festival could turn ugly.',
    options: [
      { text: 'RESTORE ORDER', effects: { authority: 2, satisfaction: -2 } },
      { text: 'LET THEM FIGHT', effects: { health: -3, satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [
          { requestId: 'CHAIN_HARVEST_FEST_END_GOOD', weight: 2 },
          { requestId: 'CHAIN_HARVEST_FEST_END_QUIET', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'CHAIN_HARVEST_FEST_END_QUIET', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_HARVEST_FEST_END_GLORY',
    chainId: 'harvest_fest',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'A Festival to Remember',
    text: 'Songs are written about this festival. The people are united, and word of your generosity spreads far.',
    options: [
      { text: 'BASK IN GLORY', effects: { satisfaction: 5, authority: 2 } },
      { text: 'PREPARE NEXT YEAR', effects: { gold: -5, satisfaction: 3 } },
    ],
  },
  {
    id: 'CHAIN_HARVEST_FEST_END_GOOD',
    chainId: 'harvest_fest',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'Fond Memories',
    text: 'The festival winds down peacefully. People head home with warm bellies and good cheer.',
    options: [
      { text: 'REST WELL', effects: { satisfaction: 3, health: 2 } },
      { text: 'CLEAN UP', effects: { satisfaction: 1 } },
    ],
  },
  {
    id: 'CHAIN_HARVEST_FEST_END_QUIET',
    chainId: 'harvest_fest',
    chainRole: 'end',
    canTriggerRandomly: false,
    title: 'Back to Work',
    text: 'Festival or not, the work continues. The village settles back into its daily routine.',
    options: [
      { text: 'CARRY ON', effects: { satisfaction: 1 } },
      { text: 'PROMISE A BETTER ONE', effects: { satisfaction: 2, authority: -1 } },
    ],
  },

  // =========================================================
  // CHAIN 6 – Disease Rumor
  // Mechanics: option followUps, weighted candidates,
  //            global crisis priority via health < 30
  // =========================================================
  {
    id: 'CHAIN_DISEASE_RUMOR_START',
    chainId: 'disease_rumor',
    chainRole: 'start',
    title: 'Feverish Whispers',
    text: 'A peddler collapses at the gate, shivering with fever. The village healer warns that an unknown sickness may already be spreading among the traders\' carts.',
    canTriggerRandomly: true,
    options: [
      { text: 'QUARANTINE EARLY', effects: { gold: -8, satisfaction: -2, health: 2 } },
      { text: 'WAIT', effects: { health: -6 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_DISEASE_CONTAINED', weight: 2 },
          { requestId: 'CHAIN_DISEASE_SPREADS', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_DISEASE_SPREADS', weight: 2 },
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
    options: [
      { text: 'GOOD', effects: { authority: 1 } },
      { text: 'STAY VIGILANT', effects: {} },
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
    options: [
      { text: 'SET UP HEALERS', effects: { gold: -15, health: 4 } },
      { text: 'DO NOTHING', effects: { health: -5, satisfaction: -2 } },
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
    options: [
      { text: 'WHAT A RELIEF', effects: { satisfaction: -1 } },
      { text: 'BETTER SAFE', effects: {} },
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
    options: [
      { text: 'MOVE ON', effects: {} },
      { text: 'STOCK HERBS', effects: {} },
    ],
  },

  // =========================================================
  // CHAIN 7 – Palisade Upgrade
  // Mechanics: option followUps, weighted candidates,
  //            requires token gating (building:marketplace)
  // =========================================================
  {
    id: 'CHAIN_PALISADE_START',
    chainId: 'palisade',
    chainRole: 'start',
    title: 'Rotting Defenses',
    text: 'The outer palisade has deteriorated badly. Gaps in the timber invite wolves and worse. Feldric urges an upgrade before the next raid season.',
    canTriggerRandomly: true,
    options: [
      { text: 'INVEST IN PALISADE', effects: { gold: -15, authority: 1 } },
      { text: 'DELAY', effects: { satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          // This follow-up requires building:marketplace to be unlocked (meetsRequirements).
          { requestId: 'CHAIN_PALISADE_HIRE_CARPENTERS', weight: 1 },
          { requestId: 'CHAIN_PALISADE_LOCAL_BUILD', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'CHAIN_PALISADE_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_PALISADE_HIRE_CARPENTERS',
    chainId: 'palisade',
    chainRole: 'member',
    canTriggerRandomly: false,
    requires: ['building:marketplace'],
    title: 'Guild Carpenters Available',
    text: 'Thanks to the marketplace, a guild of skilled carpenters offers their services. Their work would be superior, but their rates are steep.',
    options: [
      { text: 'PAY GUILD', effects: { gold: -15, authority: 2 } },
      { text: 'HAGGLE', effects: { satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_PALISADE_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_PALISADE_LOCAL_BUILD',
    chainId: 'palisade',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Village Hands',
    text: 'Without guild access, the villagers must do the work themselves. It will take longer and the result may not hold, but it costs nothing beyond sweat.',
    options: [
      { text: 'RALLY VILLAGERS', effects: { satisfaction: -2, authority: 1 } },
      { text: 'PAY OVERTIME', effects: { gold: -10, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_PALISADE_END', weight: 1 }],
      },
    ],
  },
  {
    // WIP: This doesn't make sense. When the player does nothing, this request is also shown and it says the palisade is repaired.
    id: 'CHAIN_PALISADE_END',
    chainId: 'palisade',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 90,
    title: 'Walls Stand Again',
    text: 'The palisade is repaired — or at least patched. Whether it was guild craftsmanship or village grit, the settlement is a little safer tonight.',
    options: [
      { text: 'INSPECT THE WORK', effects: {} },
      { text: 'POST SENTRIES', effects: {} },
    ],
  },

  // =========================================================
  // CHAIN 8 – Arkanat Inspector
  // Mechanics: authority boosts weights (stepped), option followUps,
  //            weighted candidates, authorityMin, advancesTick:false
  // =========================================================
  {
    id: 'CHAIN_ARKANAT_INSPECTOR_START',
    chainId: 'arkanat_inspector',
    chainRole: 'start',
    authorityMin: 20,
    title: 'The Arkanat Arrives',
    text: 'A stern official from the Arkanat — the regional mage council — dismounts at your gate. He carries sealed writs and a cold expression. "I am here to audit your governance."',
    canTriggerRandomly: true,
    options: [
      {
        text: 'ASSERT JURISDICTION',
        effects: { },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
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
    options: [
      { text: 'SEE HIM OUT', effects: { authority: 1 } },
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
    id: 'CHAIN_ARKANAT_RETALIATES',
    chainId: 'arkanat_inspector',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Inspector Strikes Back',
    text: 'The inspector was not bluffing. He produces a decree stripping you of certain privileges and levies a fine. "The Arkanat does not forget defiance."',
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
    options: [
      { text: 'NOTED', effects: {} },
    ],
  },

  // =========================================================
  // CHAIN 9 – Ego Test: Public Insult
  // Mechanics: option followUps, weighted candidates,
  //            maxTriggers=1 (once per game run)
  // =========================================================
  {
    id: 'CHAIN_EGO_INSULT_START',
    chainId: 'ego_insult',
    chainRole: 'start',
    title: 'A Voice from the Crowd',
    text: 'During a public address, a villager shouts: "You call yourself a leader? My goat governs better!" Laughter ripples through the crowd. All eyes turn to you.',
    canTriggerRandomly: true,
    options: [
      { text: 'PUNISH', effects: { authority: 1, satisfaction: -2 } },
      { text: 'LAUGH IT OFF', effects: { satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_EGO_PUNISH_BACKLASH', weight: 1 },
          { requestId: 'CHAIN_EGO_PUNISH_RESPECT', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_EGO_LAUGH_EMBOLDENED', weight: 1 },
          { requestId: 'CHAIN_EGO_LAUGH_RESPECT', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_EGO_PUNISH_BACKLASH',
    chainId: 'ego_insult',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Heavy Hand Backfires',
    text: 'The heckler is dragged away, but the crowd murmurs darkly. "He only spoke what we all think." Your show of force has made things worse.',
    options: [
      { text: 'LEAVE THE SQUARE', effects: { authority: -1 } },
      { text: 'DISPERSE THE CROWD', effects: {satisfaction: -2, authority: 1} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_EGO_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_EGO_PUNISH_RESPECT',
    chainId: 'ego_insult',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Order Restored',
    text: 'The crowd falls silent at first. Then a loud voice rings out: “All hail!” It isn’t long before the whole square erupts in applause. Whether out of fear or awe, you cannot say.',
    options: [
      { text: 'AS IT SHOULD BE', effects: { authority: 1, } },
      { text: 'DEAL OUT COINS', effects: {gold: -5,} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_EGO_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_EGO_LAUGH_EMBOLDENED',
    chainId: 'ego_insult',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Mockery Spreads',
    text: 'Your good humor emboldens others. Soon "the goat lord" becomes a street joke. Children bleat at you in the streets.',
    options: [
      { text: 'IGNORE IT', effects: { authority: -1 } },
      { text: 'IMPRISON THEM', effects: {satisfaction: -5, farmers: -3, authority: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_EGO_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_EGO_LAUGH_RESPECT',
    chainId: 'ego_insult',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Grace Under Fire',
    text: 'Your laughter disarms the moment entirely. The heckler himself grins sheepishly. "Fair enough, my lord." The crowd warms to you — a leader who can take a joke is a leader worth following.',
    options: [
      { text: 'WELL HANDLED', effects: { satisfaction: 1 } },
      { text: 'BUY HIM AN ALE', effects: {gold: -5, satisfaction: 1} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'CHAIN_EGO_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_EGO_END',
    chainId: 'ego_insult',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 100,
    title: 'The Incident Fades',
    text: 'Weeks pass and the incident is mostly forgotten — though some still smirk when they think you are not looking. Such is the burden of leadership.',
    options: [
      { text: 'MOVE FORWARD', effects: {} },
    ],
  },

  // =========================================================
  // CHAIN 10 – River Pirates
  // Mechanics: combat outcome, option followUps, weighted candidates,
  //            authority boosts weights (linear)
  // =========================================================
  {
    id: 'CHAIN_RIVER_PIRATES_START',
    chainId: 'river_pirates',
    chainRole: 'start',
    title: 'Sails on the River',
    text: 'Black-flagged longboats have been spotted on the river. A pirate fleet demands tribute or threatens to burn your docks and seize your coin.',
    canTriggerRandomly: true,
    chainRestartCooldownTicks: 80,
    combat: {
      enemyForces: 10,
      prepDelayMinTicks: 3,
      prepDelayMaxTicks: 6,
      onWin: { authority: 2,},
      onLose: { authority: -2,},
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_AFTER_WIN', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_AFTER_LOSE', weight: 1 }],
        },
      ],
    },
    options: [
      { text: 'FIGHT', effects: {} },
      {
        text: 'PAY TRIBUTE',
        effects: { gold: -15, authority: -1 },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 25,
          followUpBoosts: [
            { targetRequestId: 'CHAIN_RIVER_PIRATES_TRIBUTE_LEAVES', boostType: 'linear', boostValue: 4 },
          ],
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [
          { requestId: 'CHAIN_RIVER_PIRATES_TRIBUTE_LEAVES', weight: 1 },
          { requestId: 'CHAIN_RIVER_PIRATES_TRIBUTE_RETURNS', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'CHAIN_RIVER_PIRATES_AFTER_WIN',
    chainId: 'river_pirates',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'River Cleared',
    text: 'The pirate fleet burns on the riverbank. Your soldiers recover stolen goods from the wreckage. Word of the victory spreads downstream.',
    options: [
      { text: 'SALVAGE WHAT WE CAN', effects: {gold: 15,} },
      { text: 'CELEBRATE', effects: {satisfaction: 3,} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_RIVER_PIRATES_AFTER_LOSE',
    chainId: 'river_pirates',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Docks in Flames',
    text: 'The pirates overwhelmed your defenses and march towards your treasury. Your villagers try to flee.',
    options: [
      { text: 'PEASANTS, DEFEND MY TREASURY!', effects: {farmers: -10, satisfaction: -3,} },
      { text: 'RUN FOR YOUR LIVES!', effects: {gold: -20, satisfaction: 3,} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_RIVER_PIRATES_TRIBUTE_LEAVES',
    chainId: 'river_pirates',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'Pirates Withdraw',
    text: 'The pirate captain counts the tribute and nods. "Wise choice." The black sails disappear downriver. Perhaps your show of authority convinced them to seek easier prey.',
    options: [
      { text: 'BRAG ABOUT IT', effects: { satisfaction: -1, authority: 1,} },
      { text: 'SECURE THE RIVER', effects: {gold: -10, landForces: 3} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_RIVER_PIRATES_TRIBUTE_RETURNS',
    chainId: 'river_pirates',
    chainRole: 'member',
    canTriggerRandomly: false,
    title: 'They Want More',
    text: 'The pirates took the tribute — and came back for more. "give us your coin or we take your wives!" The crew jeers from the deck as their captain extends an open palm.',
    options: [
      { text: 'GIVE COIN', effects: { gold: -10 } },
      { text: 'GIVE UP WIVES', effects: {farmers: -5, satisfaction: -5,} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'CHAIN_RIVER_PIRATES_END', weight: 1 }],
      },
    ],
  },
  {
    id: 'CHAIN_RIVER_PIRATES_END',
    chainId: 'river_pirates',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 100,
    title: 'The River Quiets',
    text: 'The river pirate threat has passed. Fishermen cautiously return to their boats, and trade barges resume their routes.',
    options: [
      { text: 'CURSE PIRATES', effects: {satisfaction: 2, authority: -1} },
      { text: 'SCOLD YOUR SOLDIERS', effects: {satisfaction: -2, authority: 1} },
    ],
  },
];

/**
 * Info-Requests for authority system feedback
 */
export const authorityInfoRequests: Request[] = [
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
    options: [{ text: 'LOSSES', effects: {gold: -15,} }],
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

  // =========================================================
  // BUILDING REMINDER REQUESTS (6)
  // Tickless, no penalty, single "Understood" option.
  // Scheduled by checkBuildingReminders() when buildings are needed.
  // =========================================================
  {
    id: 'REMINDER_FARMSTEAD',
    title: 'The Bailiff Urges: Housing',
    text: 'Your bailiff steps forward with a worried expression: "My lord, our farmers are living in makeshift camps. The camps are a fire hazard and disease is spreading. We desperately need more farmsteads!"',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'Understood', effects: {} }],
  },
  {
    id: 'REMINDER_MARKETPLACE',
    title: 'The Bailiff Suggests: Marketplace',
    text: 'Your bailiff approaches you respectfully: "My lord, the settlement has grown beyond what informal trade can sustain. A proper marketplace would bring order to commerce and attract new merchants."',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'Understood', effects: {} }],
  },
  {
    id: 'REMINDER_BAKERY',
    title: 'The Bailiff Suggests: Bakery',
    text: 'Your bailiff raises a concern: "My lord, our growing population needs a reliable food supply. A bakery would not only feed our people but draw settlers who seek the comfort of fresh bread."',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'Understood', effects: {} }],
  },
  {
    id: 'REMINDER_BREWERY',
    title: 'The Bailiff Suggests: Brewery',
    text: 'Your bailiff clears his throat: "My lord, the workers toil hard and their morale suffers without proper leisure. A brewery would lift spirits and give them a reason to stay."',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'Understood', effects: {} }],
  },
  {
    id: 'REMINDER_FIREWOOD',
    title: 'The Bailiff Warns: Firewood',
    text: 'Your bailiff speaks with urgency: "My lord, without an organized firewood supply, people are collecting wood haphazardly. The fire risk is growing — one spark could burn down the entire settlement!"',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'Understood', effects: {} }],
  },
  {
    id: 'REMINDER_WELL',
    title: 'The Bailiff Warns: Sanitation',
    text: 'Your bailiff approaches with grave concern: "My lord, the people are drinking from stagnant ponds and muddy streams. Without a proper central well, disease will spread unchecked through our settlement."',
    advancesTick: false,
    canTriggerRandomly: false,
    options: [{ text: 'Understood', effects: {} }],
  },
];

/**
 * Validates all requests for common data quality issues.
 * This function runs only in development mode.
 * Throws errors if validation fails.
 */
export function validateRequests(): void {
  const allRequests = [...infoRequests, ...authorityInfoRequests, ...eventRequests, ...fireChainRequests];
  const errors: string[] = [];

  // Collect all request IDs
  const requestIds = new Set<string>();
  const duplicateIds: string[] = [];

  for (const request of allRequests) {
    // Check 1: Info and reminder requests must have exactly 1 option, all others must have exactly 2
    // Fire START requests (FIRE_S*_START) also have exactly 1 option
    const isSingleOptionRequest = request.id.startsWith('INFO_') || request.id.startsWith('REMINDER_') || request.id.match(/^FIRE_S\d+_START$/);
    const expectedOptions = isSingleOptionRequest ? 1 : 2;
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

/**
 * Fire Chain Requests (40)
 * 10 fire chain slots × 4 requests each (START, DECISION, ESCALATE, END).
 * Triggered by the fire system, not randomly.
 */
function generateFireChainRequests(): Request[] {
  const requests: Request[] = [];

  for (let n = 1; n <= 10; n++) {
    const chainId = `CHAIN_FIRE_SLOT_${n}`;

    // START
    requests.push({
      id: `FIRE_S${n}_START`,
      title: `🔥 Fire! (Slot ${n})`,
      text: `A fire has broken out in part of the settlement! Smoke rises and panic spreads among the villagers.`,
      canTriggerRandomly: false,
      advancesTick: false,
      chainId,
      chainRole: 'start',
      options: [
        { text: 'Assess the situation', effects: {} },
      ],
      followUps: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [{ requestId: `FIRE_S${n}_DECISION`, weight: 1 }],
        },
      ],
    });

    // DECISION
    requests.push({
      id: `FIRE_S${n}_DECISION`,
      title: `🔥 Fire Response (Slot ${n})`,
      text: `The fire rages on. You must decide how to respond before it spreads further.`,
      canTriggerRandomly: false,
      advancesTick: false,
      chainId,
      chainRole: 'member',
      options: [
        { text: 'Send a bucket brigade', effects: { satisfaction: -5 } },
        { text: 'Let it burn, focus elsewhere', effects: { fireRisk: 5 } },
      ],
      followUps: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [{ requestId: `FIRE_S${n}_ESCALATE`, weight: 1 }],
        },
        {
          triggerOnOptionIndex: 1,
          delayMinTicks: 2,
          delayMaxTicks: 4,
          candidates: [{ requestId: `FIRE_S${n}_ESCALATE`, weight: 1 }],
        },
      ],
    });

    // ESCALATE
    requests.push({
      id: `FIRE_S${n}_ESCALATE`,
      title: `🔥 Fire Spreads (Slot ${n})`,
      text: `The fire has spread to nearby structures! The situation is becoming dire.`,
      canTriggerRandomly: false,
      advancesTick: false,
      chainId,
      chainRole: 'member',
      options: [
        { text: 'Mobilize all hands', effects: { gold: -20, satisfaction: -5 } },
        { text: 'Salvage what you can', effects: { fireRisk: 10 } },
      ],
      followUps: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 2,
          delayMaxTicks: 3,
          candidates: [{ requestId: `FIRE_S${n}_END`, weight: 1 }],
        },
        {
          triggerOnOptionIndex: 1,
          delayMinTicks: 2,
          delayMaxTicks: 3,
          candidates: [{ requestId: `FIRE_S${n}_END`, weight: 1 }],
        },
      ],
    });

    // END
    requests.push({
      id: `FIRE_S${n}_END`,
      title: `🔥 Fire Resolved (Slot ${n})`,
      text: `The fire is finally under control. Now is the time to deal with the aftermath.`,
      canTriggerRandomly: false,
      advancesTick: true,
      chainId,
      chainRole: 'end',
      options: [
        { text: 'Standard cleanup', effects: { fireRisk: -10 } },
        { text: 'Invest in prevention', effects: { fireRisk: -20, gold: -30 } },
      ],
    });
  }

  return requests;
}

export const fireChainRequests = generateFireChainRequests();
