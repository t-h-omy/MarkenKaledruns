import type { Request } from '../../models';

  // ─── CHAIN: Market Inspection (market_inspection) ──────────────────────────
  // Large chain (25 events): a market inspection splits into 4 paths:
  // A) False Scales (Fraud Network), B) Watered Ale (Supply Control),
  // C) Thieves (Handler Ring), D) Smugglers (Shadow Trade).
  // Economy goal: most paths end gold-positive. Two optional combat branches.
export const marketInspectionChainDefs: Request[] = [
  {
    id: 'CHAIN_MI_START',
    chainId: 'market_inspection',
    chainRole: 'start',
    canTriggerRandomly: true,
    portraitId: 'advisor',
    title: 'Trouble at the Market',
    text: 'Your bailiff arrives with a worried look. "My lord, the weekly market is rife with complaints — vendors cheating on weights, tavern keepers watering their ale, thieves working the crowd, and shadowy figures shifting goods under cloth. Where shall we begin the inspection?"',
    options: [
      { text: 'INSPECT THE STALLS', effects: {} },
      { text: 'INSPECT THE CROWD', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_MI_A_SCALES', weight: 1 },
          { requestId: 'CHAIN_MI_B_ALE', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'CHAIN_MI_C_THIEVES', weight: 1 },
          { requestId: 'CHAIN_MI_D_SMUGGLERS', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'CHAIN_MI_A_SCALES',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'The False Scales',
    text: 'At the grain stall, your inspector finds a set of weights that tip short by a third. The merchant, a red-faced man named Aldric, sweats under your gaze. "Those weights came with the stall, my lord — I swear it!"',
    options: [
      { text: 'SEIZE THE WEIGHTS', effects: { satisfaction: 1 } },
      { text: 'FINE ON THE SPOT', effects: { gold: 8, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_A_SUPPLIER', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_A_SUPPLIER', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MI_A_SUPPLIER',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'The Weight-Maker\'s Route',
    text: 'Aldric insists the weights were rented from a traveling standard-maker who visits every month. Your inspector has traced the route — the same false weights appear across six villages. A supplier network is at work. You can expose this publicly, or press Aldric directly for the name of his contact.',
    options: [
      { text: 'PUBLIC REWEIGHING', effects: {} },
      {
        text: 'FORCE TESTIMONY',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 20,
          threshold: 10,
          onSuccess: { gold: 5 },
          onFailure: { satisfaction: -2, authority: -2 },
          minSuccessChance: 35,
          maxSuccessChance: 80,
          refundOnSuccessPercent: 80,
          extraLossOnFailure: 2,
          successFeedbackRequestId: 'INFO_MI_TESTIMONY_SUCCESS',
          failureFeedbackRequestId: 'INFO_MI_TESTIMONY_FAILURE',
        },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_A_LOCATED', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_A_LOCATED', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MI_A_LOCATED',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'trader',
    title: 'The Supplier Found',
    text: 'Your guards have cornered the traveling weight-maker in the eastern quarter. His wagon holds enough counterfeit brass to defraud a dozen markets. He offers a licensing arrangement — a cut of his profits to operate legally — or you can simply seize everything.',
    options: [
      { text: 'LICENSE THE TRADE', effects: { gold: -5 } },
      { text: 'CONFISCATE THE STOCK', effects: { gold: 15, satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_A_END_ORDERED', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_A_END_RAID', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MI_A_END_ORDERED',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    title: 'Ordered Measures',
    text: 'The licensing arrangement is formalized. The weight-maker now pays quarterly permit fees and operates under inspection. Stallholders grumble at the new oversight, but honest traders are relieved. The market stabilizes under your authority.',
    options: [
      { text: 'COLLECT PERMIT FEES', effects: { gold: 5, satisfaction: 2 } },
      { text: 'RESTORE ORDER QUIETLY', effects: { gold: 2, satisfaction: 1 } },
    ],
  },

  {
    id: 'CHAIN_MI_A_END_RAID',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'council_member',
    title: 'The Raid Windfall',
    text: 'The counterfeit weights are melted down, the good brass sold to the smith. The weight-maker is expelled from the march. Word spreads quickly — the markets are afraid, but honest. The treasury swells from the auction of seized goods.',
    options: [
      { text: 'AUCTION THE STOCK', effects: { gold: 10, satisfaction: -2 } },
      { text: 'SETTLE FOR HALF', effects: { gold: 5, satisfaction: -1 } },
    ],
  },

  {
    id: 'CHAIN_MI_B_ALE',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Watered Ale',
    text: 'Behind the tavern stall, your inspector tilts a barrel and tastes the contents. River water, mostly. The brewer, a wide woman named Marta, crosses her arms. "The spring is running dry, my lord. A man does what he must." Her kegs supply half the market.',
    options: [
      { text: 'SHUT THE KEGS', effects: { health: 1 } },
      { text: 'TAX IT ANYWAY', effects: { gold: 10, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_B_BREWER', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_B_BREWER', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MI_B_BREWER',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'The Brewer\'s Offer',
    text: 'Marta returns the next day with a proposal. She wants exclusive access to the village\'s spring water — the only reliable source left after the dry season. In exchange, she promises genuine ale at a fair price. You could accept her deal, or put the water supply to public use.',
    options: [
      { text: 'PUBLIC WATER SUPPLY', effects: { gold: -5 } },
      { text: 'EXCLUSIVE CONTRACT', effects: { gold: 8, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_B_FESTIVAL', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_B_FESTIVAL', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MI_B_FESTIVAL',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'farmer',
    title: 'Festival or Enforcement',
    text: 'The village has heard about the clean ale initiative. A local baker proposes a feast to celebrate — a public display of good faith that would restore trust in the market. Alternatively, your guards could enforce stricter standards across all vendors, starting now.',
    options: [
      { text: 'SPONSOR A CLEAN FEAST', effects: { gold: -5, satisfaction: 2 } },
      { text: 'GUARD ENFORCEMENT', effects: { gold: 5, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_B_END_TRUST', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_B_END_QUIET', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MI_B_END_TRUST',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    title: 'Trust Built',
    text: 'The feast was a success. Marta\'s genuine ale flowed freely, the baker\'s bread fed every stall-keeper, and the market has not been so lively in years. Your people see a lord who invests in them — and they remember it.',
    options: [
      { text: 'CELEBRATE WITH THEM', effects: { gold: 5, satisfaction: 2 } },
      { text: 'INVEST IN THE WELLS', effects: { gold: -5, health: 2 } },
    ],
  },

  {
    id: 'CHAIN_MI_B_END_QUIET',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    title: 'Quiet Profits',
    text: 'The enforcement crackdown has silenced complaints. Stall-keepers now operate under tight watch, knowing any infraction costs them their license. The market is orderly, a little fearful — and profitable. Fines and fees fill the ledger.',
    options: [
      { text: 'COLLECT QUIETLY', effects: { gold: 10, satisfaction: -2 } },
      { text: 'ANNOUNCE THE RESULTS', effects: { gold: 5, satisfaction: 1 } },
    ],
  },

  {
    id: 'CHAIN_MI_C_THIEVES',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'bandit',
    title: 'Cutpurses in the Crowd',
    text: 'Three pickpockets are caught red-handed within minutes. Your guard captain notes the pattern — they are working in coordinated shifts, targeting the busiest stalls. This is not opportunism. These are trained operatives with someone directing them.',
    options: [
      { text: 'PUBLIC PUNISHMENT', effects: { satisfaction: 1 } },
      { text: 'QUIET WARNING', effects: {} },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_C_HANDLER', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_C_HANDLER', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MI_C_HANDLER',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'bandit',
    title: 'The Handler Revealed',
    text: 'One of the captives breaks under questioning. There is a handler — a man called Gregor — who runs the pickpocket ring from a rented room near the east gate. He controls at least a dozen operatives across the march. You can put these thieves to work as informants to catch Gregor, or make a public example of them to deter the others.',
    options: [
      {
        text: 'PUT THEM TO WORK',
        effects: {},
        authorityCheck: {
          minCommit: 0,
          maxCommit: 20,
          followUpBoosts: [
            {
              targetRequestId: 'CHAIN_MI_C_STING',
              boostType: 'linear',
              boostValue: 3,
              description: 'Increases chance of sting operation',
            },
          ],
        },
      },
      { text: 'MAKE AN EXAMPLE', effects: { gold: 5 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [
          { requestId: 'CHAIN_MI_C_STING', weight: 1 },
          { requestId: 'CHAIN_MI_C_LOCKDOWN', weight: 2 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_C_LOCKDOWN', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MI_C_STING',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'bandit',
    title: 'The Handler\'s Ambush',
    text: 'Your informants have led Gregor into a trap in the warehouse quarter. But Gregor was not alone — his enforcers are waiting in the alleys. Your guard captain has a choice: spring the trap now and take the fight to them, or pull your people back before blood is spilled.',
    combat: {
      enemyForces: 5,
      prepDelayMinTicks: 0,
      prepDelayMaxTicks: 0,
      onWin: { gold: 15 },
      onLose: { landForces: -2 },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_MI_C_END_CAPTURE', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_MI_C_END_ROUT', weight: 1 }],
        },
      ],
    },
    options: [
      { text: 'SPRING THE TRAP', effects: {} },
      { text: 'BACK OFF', effects: { satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_C_END_RETREAT', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MI_C_LOCKDOWN',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'guard',
    title: 'The District Lockdown',
    text: 'With Gregor still at large, the east quarter is a liability. Your captain proposes sealing the district and interrogating every resident — slow and costly, but thorough. Alternatively, you could send a quiet message through back channels offering Gregor safe passage out of the march.',
    options: [
      { text: 'SEAL THE DISTRICT', effects: { gold: 5, satisfaction: -2 } },
      { text: 'NEGOTIATE QUIETLY', effects: { satisfaction: 1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_C_END_LOCKDOWN', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_C_END_LOCKDOWN', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MI_C_END_CAPTURE',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    title: 'Gregor in Chains',
    text: 'Gregor and his enforcers are captured. His strongbox yields seized coin, stolen jewelry, and ledgers naming contacts in two neighboring marches. Your advisor suggests the seizure be auctioned openly, or shared with the guards as a reward for their bravery.',
    options: [
      { text: 'AUCTION THE GOODS', effects: { gold: 5, satisfaction: 1 } },
      { text: 'SHARE WITH THE GUARDS', effects: { gold: -3, satisfaction: 3 } },
    ],
  },

  {
    id: 'CHAIN_MI_C_END_ROUT',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    title: 'Bloodied and Bruised',
    text: 'The trap turned. Gregor\'s enforcers outnumbered your guards in the alleys, and several men were badly hurt. Gregor escaped into the night. The market grows quieter — vendors are afraid, and so are your guards.',
    options: [
      { text: 'TEND TO THE WOUNDED', effects: { gold: -5, health: 2 } },
      { text: 'REORGANIZE THE WATCH', effects: { authority: 1, satisfaction: -1 } },
    ],
  },

  {
    id: 'CHAIN_MI_C_END_RETREAT',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    title: 'Gregor Slips Away',
    text: 'The order to stand down was the right call — your guards were outnumbered. But Gregor has vanished, and the ring continues to operate. Your bailiff counts the losses: a few purses, some pride. The market will recover, even if the handler does not.',
    options: [
      { text: 'RESUME PATROLS', effects: { gold: 3, satisfaction: 1 } },
      { text: 'HIRE INFORMANTS', effects: { gold: -5, authority: 1 } },
    ],
  },

  {
    id: 'CHAIN_MI_C_END_LOCKDOWN',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    title: 'The Handler Gone',
    text: 'Gregor is gone — either fled or warned off. The district lockdown turned up petty contraband and a few debtors, but no mastermind. Still, the market has been swept clean. Fines and confiscations fill part of the gap in the treasury.',
    options: [
      { text: 'TIGHTEN SECURITY', effects: { gold: 3, satisfaction: -1 } },
      { text: 'REWARD INFORMANTS', effects: { gold: -5, satisfaction: 2 } },
    ],
  },

  {
    id: 'CHAIN_MI_D_SMUGGLERS',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'trader',
    title: 'Goods Under Cloth',
    text: 'Behind a line of legitimate stalls, your inspector finds crates of untaxed silk, undeclared salt, and foreign coin. A nervous young trader insists he is "just moving goods for a friend." The quantities suggest an organized operation with outside backing.',
    options: [
      { text: 'LEGALIZE WITH PERMIT', effects: { gold: 5 } },
      { text: 'SEIZE THE GOODS', effects: { gold: 10, satisfaction: -1 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_D_ESCORT', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_D_ESCORT', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MI_D_ESCORT',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'bandit',
    title: 'The Convoy\'s Handler',
    text: 'By nightfall, a hard-faced man with six armed riders arrives at the gate. He is the convoy\'s handler — and he is willing to discuss "business arrangements." He offers a substantial sum for your silence and continued access. You can refuse and prepare an intercept, or take the coin.',
    options: [
      { text: 'REFUSE THE BRIBE', effects: {} },
      { text: 'ACCEPT THE BRIBE', effects: { gold: 10, satisfaction: -2 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_D_CONFRONTATION', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_D_END_UNDERGROUND', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MI_D_CONFRONTATION',
    chainId: 'market_inspection',
    chainRole: 'member',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    title: 'The Convoy Intercept',
    text: 'Your military advisor has tracked the convoy to the north road. Seven armed riders escort three wagons of contraband. You can intercept them by force — a real fight with real risk — or register the operation as a licensed night trade, collecting fees instead of blood.',
    combat: {
      enemyForces: 7,
      prepDelayMinTicks: 2,
      prepDelayMaxTicks: 4,
      onWin: { gold: 20 },
      onLose: { landForces: -3, satisfaction: -2 },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_MI_D_END_CONTROLLED', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'CHAIN_MI_D_END_ROUT', weight: 1 }],
        },
      ],
    },
    options: [
      { text: 'INTERCEPT THE CONVOY', effects: {} },
      { text: 'REGISTER NIGHT TRADE', effects: { gold: 8 } },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'CHAIN_MI_D_END_UNDERGROUND', weight: 1 }],
      },
    ],
  },

  {
    id: 'CHAIN_MI_D_END_CONTROLLED',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    title: 'Controlled Flow',
    text: 'The convoy is seized and the handler arrested. The contraband is catalogued, the riders imprisoned, and the operation dismantled. Your village controls the trade route now — and word will travel that your borders are not for sale.',
    options: [
      { text: 'CELEBRATE THE BUST', effects: { gold: 5, satisfaction: 1 } },
      { text: 'REFORM TRADE LAWS', effects: { gold: -5, authority: 2 } },
    ],
  },

  {
    id: 'CHAIN_MI_D_END_ROUT',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    title: 'The Convoy Escapes',
    text: 'The escort put up fierce resistance. Your soldiers were driven back with injuries, and the convoy vanished into the forest. The contraband is gone. Your advisor is grave: "We underestimated their numbers, my lord. This will need careful handling."',
    options: [
      { text: 'TEND TO THE WOUNDED', effects: { gold: -5, health: 2 } },
      { text: 'CUT LOSSES', effects: { satisfaction: -2, authority: -1 } },
    ],
  },

  {
    id: 'CHAIN_MI_D_END_UNDERGROUND',
    chainId: 'market_inspection',
    chainRole: 'end',
    chainRestartCooldownTicks: 90,
    canTriggerRandomly: false,
    portraitId: 'merchant',
    title: 'Underground Shift',
    text: 'The trade arrangement continues below the surface. Goods move quietly through side roads, and your treasury grows with each shipment. The people do not ask where the coin comes from — only that the market stays well supplied.',
    options: [
      { text: 'EXPAND THE ARRANGEMENT', effects: { gold: 10, satisfaction: -2 } },
      { text: 'FORMALIZE THE TRADE', effects: { gold: 5, satisfaction: 1 } },
    ],
  },
];
