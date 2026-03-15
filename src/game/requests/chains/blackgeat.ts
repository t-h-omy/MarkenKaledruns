import type { Request } from '../../models';

  // =========================================================
  // BLACKGEAT CHAIN - The Black March
  // =========================================================
  // CHAIN START
export const BLACKGEATChainDefs: Request[] = [
  {
    id: 'CHAIN_BLACKGEAT_START',
    title: 'The Black March',
    text: 'Brimwulf, envoy of the County of Wulfham, introduces himself: "The Sigilmark of Blackgeat is raising troops. Join forces with us - only together can we defeat them."',
    portraitId: 'envoy',
    chainId: 'BLACKGEAT',
    chainRole: 'start',
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

  {
    id: 'CHAIN_BLACKGEAT_PREP_FELDRIC',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    portraitId: 'military_advisor',
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
    portraitId: 'military_advisor',
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
    portraitId: 'envoy',
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
    portraitId: 'envoy',
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
    portraitId: 'ruler_enemy_weak',
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
    portraitId: 'ruler_enemy_weak',
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
    chainRestartCooldownTicks: 100,
    title: 'A Hard-Won Quiet',
    text: 'After the tribute talks and threats, the border holds—for now. Brimwulf\'s riders patrol beside yours. Feldric\'s last words: "This quiet came from the Blackgeat situation. It won\'t stay quiet forever."',
    canTriggerRandomly: false,
    portraitId: 'advisor',
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
    portraitId: 'military_advisor',
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
    chainRestartCooldownTicks: 100,
    title: 'Echoes of Liberty',
    text: 'The Sigilmark Blackgeat has retreated! Against all odds, you held the line. Feldric raises a toast: "The land is ours once more, and our gold stays in our pockets. We are truly free."',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
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
    chainRestartCooldownTicks: 100,
    title: 'Picking Up the Pieces',
    text: 'The shadow of Blackgeat finally recedes, leaving behind a weary but resilient village. The conflict is lost, but it is over now. It is time to look toward the future.',
    canTriggerRandomly: false,
    portraitId: 'advisor',
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
    portraitId: 'envoy',
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
    portraitId: 'envoy',
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
    portraitId: 'envoy',
    options: [
      { text: 'PREPARE FOR WAR', effects: { farmers: -5, landForces: 5 } },
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
    portraitId: 'military_advisor',
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
    chainRestartCooldownTicks: 100,
    title: 'A Scar, Not a Grave',
    text: 'Wulfham withdraws — you are victorious! Feldric\'s verdict: "You\'ll remember this every time an ally asks for \'help\'."',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    options: [
      { text: 'DEMAND GOLD', effects: { gold: 30, satisfaction: 1, authority: 2} },
      { text: 'DEMAND SWORDS', effects: { landForces: 5, satisfaction: 1, authority: 2} },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_EXTORT_END_TRIBUTE',
    chainId: 'BLACKGEAT',
    chainRole: 'end',
    chainRestartCooldownTicks: 100,
    title: 'The Hollow Peace',
    text: 'Brimwulf accepted your last payment as final. Wulfham\'s riders turn back toward their own borders. Feldric watches them go: "We have bought peace, but sold our pride."',
    canTriggerRandomly: false,
    portraitId: 'envoy',
    options: [
      { text: 'RECOVER', effects: { health: 5 } },
      { text: 'REPAIR', effects: { fireRisk: -5 } },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_WULFHAM_FALLS',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Wulfham Overrun',
    text: 'Because you refused Brimwulf\'s alliance request earlier, he returns in defeat. "Wulfham burns. Blackgeat\'s march turns toward you."',
    canTriggerRandomly: false,
    portraitId: 'envoy',
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
    portraitId: 'ruler_enemy_weak',
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
    portraitId: 'advisor',
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

  {
    id: 'CHAIN_BLACKGEAT_WAR_PREP_FELDRIC',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    portraitId: 'military_advisor',
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
    portraitId: 'military_advisor',
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
    portraitId: 'military_advisor',
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
    portraitId: 'military_advisor',
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
    chainRestartCooldownTicks: 100,
    title: 'Blackgeat Recoils',
    text: 'After three war rounds, Blackgeat pulls back and the war finally ends. Feldric wipes blood from his lip: "This is what resisting Blackgeat costs—and what it buys."',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
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
    portraitId: 'ruler_allied',
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
    chainRestartCooldownTicks: 100,
    title: 'A Bitter Retreat',
    text: 'The Blackgeat war ends badly. You live, but they loot the village. Feldric\'s eyes are stone: "A bitter defeat! What should we do now?"',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
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
    chainRestartCooldownTicks: 100,
    title: 'A Line Held',
    text: 'A fierce last battle against Blackgeat ends well with the barony\'s help. Feldric nods once: "Next time Blackgeat comes, we\'ll be ready sooner."',
    canTriggerRandomly: false,
    portraitId: 'military_advisor',
    options: [
      { text: 'PURSUE THE FLEEING', effects: { landForces: -5, gold: 30 } },
      { text: 'HOLD A FEAST', effects: { health: 4, satisfaction: 3 } },
    ],
  },

  {
    id: 'CHAIN_BLACKGEAT_TRIBUTE_1',
    chainId: 'BLACKGEAT',
    chainRole: 'member',
    title: 'Tribute I',
    text: 'This tribute demand comes from Hrycgwulf\'s earlier ultimatum. His messenger waits: "The first payment." Feldric murmurs: "This is how Blackgeat turns a threat into routine."',
    canTriggerRandomly: false,
    portraitId: 'envoy',
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
    portraitId: 'ruler_enemy_weak',
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
    portraitId: 'ruler_enemy_weak',
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
    portraitId: 'ruler_enemy_weak',
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
    portraitId: 'ruler_enemy_weak',
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
    chainRestartCooldownTicks: 100,
    title: 'A Bought Breath',
    text: 'Hrycgwulf visits you one last time: "You paid for safety. Now you shall have peace". Feldric: "This peace seems temporary. For next time, we will prepare."',
    canTriggerRandomly: false,
    portraitId: 'ruler_enemy_weak',
    options: [
      { text: 'CELEBRATE PEACE', effects: { health: 4, satisfaction: 4 } },
      { text: 'START PREPARING', effects: { gold: -10, landForces: 6 } },
    ],
  },
];
