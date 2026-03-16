import type { Request } from '../../models';

export const standaloneEventDefs: Request[] = [
  // A) Military & security (6 events)
  {
    id: 'EVT_RECRUIT_MILITIA',
    title: 'Call to Arms',
    text: 'The borders feel thin. Should we recruit farmers into the militia to bolster defenses, even if the fields suffer from fewer hands?',
    portraitId: 'military_advisor',
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
    portraitId: 'bandit',
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
    portraitId: 'bandit',
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
    portraitId: 'military_advisor',
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
    portraitId: 'military_advisor',
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
    portraitId: 'military_advisor',
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
    portraitId: 'refugee',
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
    portraitId: 'farmer',
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
    portraitId: 'farmer',
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
    portraitId: 'farmer',
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
    portraitId: 'advisor',
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
    portraitId: 'advisor',
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
    portraitId: 'craftsman',
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
    portraitId: 'bard',
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
    portraitId: 'healer',
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
    portraitId: 'military_advisor',
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
    portraitId: 'advisor',
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
    portraitId: 'advisor',
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
    portraitId: 'scout',
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
    portraitId: 'healer',
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
    portraitId: 'guard',
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
    portraitId: 'farmer',
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
    portraitId: 'craftsman',
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
    portraitId: 'farmer',
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

  {
    id: 'EVENT_MARKET_DAY',
    title: 'Market Day',
    text: 'The marketplace is bustling with traders from distant lands. Will you focus on steady profits or take a riskier approach for greater gains?',
    portraitId: 'merchant',
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
          lossOnFailurePercent: 50,
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
    ],
  },

  {
    id: 'EVENT_TAVERN_AFTER_WORK',
    title: 'After-Work at the Tavern',
    text: 'After a long day of labor, the villagers gather at the tavern. Should you subsidize their drinks to boost morale, or let them enjoy at their own expense?',
    requires: ['building:brewery'],
    portraitId: 'farmer',
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
    title: 'Protection Money',
    text: 'With your authority waning, a local mercenary demands protection money. Your weakened position makes this a difficult situation.',
    authorityMin: 0,
    authorityMax: 33,
    portraitId: 'mercenary',
    options: [
      {
        text: 'PAY PROTECTION',
        effects: {
          gold: -10,
          authority: -1,
        },
      },
      {
        text: 'THROW HIM OUT',
        effects: {
          authority: 1,
          landForces: -2,
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
    portraitId: 'guard',
    options: [
      {
        text: 'PUNISH THEM',
        effects: {
          landForces: -2,
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
    portraitId: 'bandit',
    options: [
      {
        text: 'FIND THE NASTY THIEVES',
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
          authority: -2,
        },
      },
    ],
  },

  {
    id: 'EVT_LOW_PETITION_DENIED',
    title: 'Petition Rejected',
    text: 'The harvest was poor, so you petition the neighboring lord for aid, but are turned away at the gates. "We deal only with legitimate leaders," the guards say.',
    authorityMin: 0,
    authorityMax: 33,
    portraitId: 'ruler_neutral',
    options: [
      {
        text: 'BEG ON YOUR KNEES',
        effects: {
          gold: 15,
          satisfaction: 2,
          health: 2,
          authority: -2,
        },
      },
      {
        text: 'LEAVE WITH DIGNITY',
        effects: {
          satisfaction: -2,
          health: -2,
        },
      },
    ],
  },

  {
    id: 'EVT_LOW_DEBT_COLLECTOR',
    title: 'The Debt Collector',
    text: 'A ruthless debt collector arrives, sensing your weakness. He demands that you pay for debts of your poorest villagers - or else he\'ll take what he\'s owed by force.',
    authorityMin: 0,
    authorityMax: 33,
    portraitId: 'merchant',
    options: [
      {
        text: 'PAY THE DEBT',
        effects: {
          gold: -15,
          authority: -1,
          satisfaction: 2,
        },
      },
      {
        text: 'PAY - HIM A VISIT!',
        effects: {
          landForces: -3,
          authority: 2,
          satisfaction: 2
        },
      },
    ],
  },

  {
    id: 'EVT_LOW_COUNCIL_REVOLT',
    title: 'Council Challenge',
    text: 'Your own council openly questions your decisions. "Perhaps we need new leadership," one elder suggests loudly.',
    portraitId: 'elder',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'STAND FIRM',
        effects: {
          satisfaction: -4,
          authority: 2,
        },
      },
      {
        text: 'BRIBE THEM',
        effects: {
          gold: -15,
          satisfaction: 4,
        },
      },
    ],
  },

  {
    id: 'EVT_LOW_BANDITS_MOCK',
    title: 'Mocked by Bandits',
    text: 'A band of thieves leaves mocking notes at your doorstep, daring you to stop them. They know you lack the authority to organize an effective response.',
    portraitId: 'bandit',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'IGNORE THEM',
        effects: {
          authority: -2,
        },
      },
      {
        text: 'HIRE MERCENARIES',
        effects: {
          gold: -10,
          authority: 2,
        },
      },
    ],
  },

  {
    id: 'EVT_LOW_FARMERS_LEAVE',
    title: 'Mass Exodus',
    text: 'A herbalist and her family threaten that they\'re leaving for a neighboring settlement with "real leadership."',
    authorityMin: 0,
    authorityMax: 33,
    portraitId: 'healer',
    options: [
      {
        text: 'BEG THEM TO STAY',
        effects: {
          gold: -10,
          authority: -1,
        },
      },
      {
        text: 'THROW THEM OUT',
        effects: {
          farmers: -4,
          health: -2,
          authority: 1,
        },
      },
    ],
  },

  {
    id: 'EVT_LOW_MERCHANT_EXTORTION',
    title: 'Merchant Extortion',
    text: 'A traveling merchant realizes your position is weak. He demands tusuae the usual prices for urgently needed healing potions, knowing you have very low leverage to refuse.',
    portraitId: 'trader',
    authorityMin: 0,
    authorityMax: 33,
    options: [
      {
        text: 'PAY THE PRICE',
        effects: {
          gold: -20,
          health: 5,
        },
      },
      {
        text: 'REFUSE TO BUY',
        effects: {
          health: -3,
          satisfaction: -2,
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
    portraitId: 'advisor',
    options: [
      {
        text: 'MAKE A GRAND GESTURE',
        effects: {
          gold: -15,
          satisfaction: 4,
          authority: 1,
        },
      },
      {
        text: 'WAIT IT OUT',
        effects: {
          satisfaction: -2,
          authority: -1,
        },
      },
    ],
  },

  {
    id: 'EVT_MEDIUM_AUTHORITY',
    title: 'Political Maneuver',
    text: 'Your moderate influence allows you to negotiate a trade deal with a neighboring settlement.',
    authorityMin: 34,
    authorityMax: 66,
    portraitId: 'merchant',
    options: [
      {
        text: 'ACCEPT DEAL',
        effects: {
          gold: 10,
          authority: 1,
        },
      },
      {
        text: 'SELL ALL WINTER STOCKS',
        effects: {
          gold: 40,
          satisfaction: -4,
          health: -4,
          farmers: -3,
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
    portraitId: 'merchant',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'military_advisor',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'advisor',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'advisor',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'noble',
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
    portraitId: 'noble',
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
    portraitId: 'ruler_allied',
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
    portraitId: 'advisor',
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
    portraitId: 'ruler_allied',
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
    portraitId: 'spy_enemy',
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
    portraitId: 'ruler_enemy_weak',
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
    portraitId: 'noble',
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
    portraitId: 'knight',
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
    portraitId: 'envoy',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'merchant',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'advisor',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'noble',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'military_advisor',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'bandit',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'advisor',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'village_priest',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'advisor',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'advisor',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'noble',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'merchant',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'envoy',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'advisor',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'elder',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'pirate',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'noble',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'elder',
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
    portraitId: 'merchant',
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
    portraitId: 'guard',
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
    portraitId: 'advisor',
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
    portraitId: 'advisor',
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
    portraitId: 'advisor',
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
    portraitId: 'advisor',
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
    portraitId: 'advisor',
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
    portraitId: 'advisor',
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
    portraitId: 'advisor',
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
    portraitId: 'advisor',
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
    portraitId: 'advisor',
    options: [
      {
        text: 'HARSH PUNISHMENT',
        effects: {
          authority: 2,
          farmers: -1,
          satisfaction: -3,
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
    portraitId: 'traveler',
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
          lossOnFailurePercent: 50,
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
    portraitId: 'traveler',
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
    portraitId: 'spy_enemy',
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
    portraitId: 'traveler',
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
    portraitId: 'traveler',
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

  // ══════════════════════════════════════════════════════════════════════
  //  STANDALONE BUILDING EVENTS (12 events)
  // ══════════════════════════════════════════════════════════════════════

  {
    id: 'EVENT_MARKET_BOOM',
    title: 'Market Boom',
    text: 'A caravan of foreign traders has arrived, drawn by the reputation of your marketplace. They bring exotic goods and generous coin, eager to establish long-term trade routes through your village.',
    canTriggerRandomly: true,
    requires: ['building:marketplace'],
    portraitId: 'merchant',
    options: [
      { text: 'WELCOME THEM WARMLY', effects: { gold: 5, satisfaction: 1, farmers: -1 } },
      { text: 'LEVY AN IMPORT TAX', effects: { gold: 3, authority: 1, satisfaction: -1 } },
    ],
  },

  {
    id: 'EVENT_MARKET_FRAUD',
    title: 'Market Fraud',
    text: 'A cunning swindler has been selling counterfeit goods at the market — fake remedies and watered-down ale. Several villagers fell ill, and trust in the marketplace is shaken.',
    canTriggerRandomly: true,
    requires: ['building:marketplace'],
    portraitId: 'merchant',
    options: [
      { text: 'HUNT DOWN THE SWINDLER', effects: { gold: -2, authority: 2, satisfaction: 1 } },
      { text: 'TIGHTEN MARKET REGULATIONS', effects: { gold: -3, satisfaction: -1, health: 1 } },
    ],
  },

  {
    id: 'EVENT_TAVERN_CELEBRATION',
    title: 'Tavern Celebration',
    text: 'A spontaneous festival erupts at the tavern after a bountiful harvest. The bard leads the villagers in song and dance, and for one glorious evening the troubles of the world feel far away.',
    canTriggerRandomly: true,
    requires: ['building:tavern'],
    portraitId: 'bard',
    options: [
      { text: 'JOIN THE FESTIVITIES', effects: { satisfaction: 3, gold: -2, authority: -1 } },
      { text: 'PROVIDE FREE DRINKS', effects: { satisfaction: 2, gold: -4, health: -1 } },
    ],
  },

  {
    id: 'EVENT_TAVERN_BRAWL',
    title: 'Tavern Brawl',
    text: 'A violent brawl erupts between farmers and off-duty guards at the tavern. Tables are smashed, teeth are lost, and the tavernkeeper begs for your intervention before someone is killed.',
    canTriggerRandomly: true,
    requires: ['building:tavern'],
    portraitId: 'guard',
    options: [
      { text: 'SEND IN THE GUARDS', effects: { authority: 2, satisfaction: -2, landForces: -1 } },
      { text: 'LET THEM SETTLE IT', effects: { satisfaction: -1, health: -1 } },
    ],
  },

  {
    id: 'EVENT_GARRISON_PATROL',
    title: 'Successful Patrol',
    text: 'The garrison patrol returns with good news — they intercepted a bandit scouting party at the village borders. The bandits fled at the sight of your well-armed guards, and a cache of stolen goods was recovered.',
    canTriggerRandomly: true,
    requires: ['building:garrison'],
    portraitId: 'guard',
    options: [
      { text: 'DISTRIBUTE THE GOODS', effects: { gold: 3, satisfaction: 2, authority: -1 } },
      { text: 'STOCK THE GARRISON ARMORY', effects: { landForces: 2, gold: 2, satisfaction: -1 } },
    ],
  },

  {
    id: 'EVENT_GARRISON_DEMANDS',
    title: 'Garrison Overreach',
    text: 'The garrison captain demands the right to levy a "security tax" on merchants entering the village. He argues the guards deserve better pay, but the merchants see it as nothing more than a shakedown.',
    canTriggerRandomly: true,
    requires: ['building:garrison'],
    portraitId: 'military_advisor',
    options: [
      { text: 'APPROVE THE TAX', effects: { gold: 3, landForces: 1, satisfaction: -3 } },
      { text: 'DENY THE REQUEST', effects: { satisfaction: 1, landForces: -2, authority: 1 } },
    ],
  },

  {
    id: 'EVENT_TRAINING_EXCELLENCE',
    title: 'Training Excellence',
    text: 'A talented recruit has distinguished herself in the training yard, besting every opponent and mastering sword and bow alike. Her prowess inspires the other recruits, and the drill master beams with pride.',
    canTriggerRandomly: true,
    requires: ['building:training_yard'],
    portraitId: 'military_advisor',
    options: [
      { text: 'PROMOTE HER TO SERGEANT', effects: { landForces: 3, satisfaction: 1, gold: -2 } },
      { text: 'SEND HER TO TRAIN OTHERS', effects: { landForces: 2, farmers: -1, authority: 1 } },
    ],
  },

  {
    id: 'EVENT_TRAINING_INJURY',
    title: 'Training Injury',
    text: 'A training exercise goes wrong when a sparring bout turns too aggressive. A promising recruit suffers a broken arm, and the healer reports the injury could have been far worse. Morale at the training yard has taken a hit.',
    canTriggerRandomly: true,
    requires: ['building:training_yard'],
    portraitId: 'healer',
    options: [
      { text: 'COMPENSATE THE RECRUIT', effects: { gold: -3, satisfaction: 1, health: 1 } },
      { text: 'TOUGHEN THE RULES', effects: { authority: 1, satisfaction: -2, landForces: 1 } },
    ],
  },

  {
    id: 'EVENT_SHRINE_BLESSING',
    title: 'Shrine Blessing',
    text: 'During morning prayers, a shaft of golden light illuminates the shrine\'s altar. The village priest declares it a divine blessing, and villagers flock to the shrine seeking guidance, hope, and healing.',
    canTriggerRandomly: true,
    requires: ['building:shrine'],
    portraitId: 'village_priest',
    options: [
      { text: 'HOLD A PUBLIC CEREMONY', effects: { satisfaction: 3, health: 1, gold: -2 } },
      { text: 'OFFER PRIVATE BLESSINGS', effects: { satisfaction: 1, authority: 2, gold: -1 } },
    ],
  },

  {
    id: 'EVENT_SHRINE_SUPERSTITION',
    title: 'Rising Superstition',
    text: 'Strange omens appear near the shrine — an owl hooting at midday, cracks in the altar stone. Fearful villagers demand elaborate protective rituals, while the priest insists calm reasoning will prevail over superstition.',
    canTriggerRandomly: true,
    requires: ['building:shrine'],
    portraitId: 'village_priest',
    options: [
      { text: 'PERFORM PROTECTIVE RITES', effects: { gold: -3, satisfaction: 2, authority: -1 } },
      { text: 'COUNSEL AGAINST SUPERSTITION', effects: { authority: 2, satisfaction: -2 } },
    ],
  },

  {
    id: 'EVENT_HEALERS_CURE',
    title: 'Miraculous Cure',
    text: 'The village healer discovers a new herbal compound that cures a persistent fever plaguing several families. Word of her skill spreads, and travelers arrive seeking treatment, bringing coin and gratitude.',
    canTriggerRandomly: true,
    requires: ['building:healers_house'],
    portraitId: 'healer',
    options: [
      { text: 'TREAT ALL COMERS', effects: { health: 3, satisfaction: 2, gold: -2 } },
      { text: 'CHARGE FOR TREATMENT', effects: { gold: 4, health: 1, satisfaction: -1 } },
    ],
  },

  {
    id: 'EVENT_HEALERS_SHORTAGE',
    title: 'Medicine Shortage',
    text: 'The healer\'s stores of bandages and poultices are nearly exhausted after treating a string of injuries from fieldwork. Without resupply, the next illness or accident could prove far more dangerous.',
    canTriggerRandomly: true,
    requires: ['building:healers_house'],
    portraitId: 'healer',
    options: [
      { text: 'FUND EMERGENCY SUPPLIES', effects: { gold: -4, health: 2, satisfaction: 1 } },
      { text: 'RATION REMAINING STORES', effects: { health: -1, satisfaction: -1, gold: 1 } },
    ],
  },
];
