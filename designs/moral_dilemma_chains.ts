// =========================================================
// MORAL DILEMMA REQUEST CHAINS — Die Marken Kaledruns
// 3 Medium-Sized Chains | Narrative & Mission Design
//
// Chain 1: DROWNING_OATH   — Early Game    (no building required)
// Chain 2: STRANGERS_TAB   — Mid Game      (requires building:tavern)
// Chain 3: SHRINES_SILENCE — Late Game     (requires building:shrine)
// =========================================================

// =========================================================
// CHAIN 1: DROWNING_OATH — The Drowning Oath
// Stage:   Early game, no building requirements
// Moral:   A dead man's orders vs. a living family
// Size:    M (13 requests)
// Central Question: A man died to deliver these orders.
//          Does that make them sacred — or just paper?
// =========================================================

// --- START ---
{
  id: 'CHAIN_DROWNING_OATH_START',
  chainId: 'DROWNING_OATH',
  chainRole: 'start',
  title: 'The Letter from the Dead',
  portraitId: 'farmer',
  text: 'A farmer named Holbrand staggers through your gate at dawn, soaked to the bone and shaking. He says your guard captain, Wulfgar, is dead — a fallen oak, out by the eastern ford. But before he died, Wulfgar made Holbrand swear to deliver a sealed letter to you. Holbrand presses it into your hands. It is addressed in Wulfgar\'s hand: FOR YOUR LORD\'S EYES ONLY. His wife and young boy are still at the farmstead, on the far side of the rising Durn.',
  options: [
    {
      text: 'READ AND OBEY',
      effects: { authority: 1 },
    },
    {
      text: 'BURN IT UNREAD',
      effects: { satisfaction: -2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_DROWNING_OATH_A1', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_DROWNING_OATH_B1_BARNWULF', weight: 1 }],
    },
  ],
},

// ===== PATH A: READ AND OBEY =====

// A1 — You read the letter. Wulfgar's order: evacuate the east bank, seal the ford gate.
// Holbrand's family is on that side of the river. He knows what it means.
{
  id: 'CHAIN_DROWNING_OATH_A1',
  chainId: 'DROWNING_OATH',
  chainRole: 'member',
  canTriggerRandomly: false,
  advancesTick: false,
  title: 'What Wulfgar Knew',
  portraitId: 'farmer',
  text: 'Wulfgar\'s letter is short and precise. He had seen the Durn rise before — in the great flood of his father\'s time. If the eastern fields are not evacuated within a day, the ford will break and the whole lower settlement will flood. Seal the gate. Move everyone. Do not wait.\n\nHolbrand has been reading your face. He says nothing. But his hands are shaking, and not from cold.',
  options: [
    {
      text: 'SEAL THE GATE',
      effects: { satisfaction: -3, health: 1 },
    },
    {
      text: 'LET HIM GO BACK',
      effects: { health: -2, satisfaction: 2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_DROWNING_OATH_A1_SEAL_CONFRONTATION', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_DROWNING_OATH_A3_DELAY', weight: 1 }],
    },
  ],
},

// A1 Seal branch — Holbrand confronts you. Pure emotional beat, no tick advance.
{
  id: 'CHAIN_DROWNING_OATH_A1_SEAL_CONFRONTATION',
  chainId: 'DROWNING_OATH',
  chainRole: 'member',
  canTriggerRandomly: false,
  advancesTick: false,
  title: 'A Farmer\'s Grief',
  portraitId: 'farmer',
  text: 'Holbrand does not shout. He does not strike the table or threaten. He just stands there in the gate\'s shadow and says: "He made me swear. On his blood. I swore. And now you\'re telling me — my wife. My boy." He stops. He cannot finish the sentence. The guards are watching you.',
  options: [
    {
      text: 'HOLD FIRM',
      effects: { authority: 2, satisfaction: -4 },
    },
    {
      text: 'GRANT HIM ONE HOUR',
      effects: { health: -3, authority: -1 },
    },
  ],
  followUps: [
    {
      // Hold firm: fate of the family is now uncertain — did they make it out on their own?
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [
        { requestId: 'CHAIN_DROWNING_OATH_A2_FAMILY_SAFE', weight: 1 },
        { requestId: 'CHAIN_DROWNING_OATH_A2_FAMILY_LOST', weight: 1 },
      ],
    },
    {
      // Grant one hour: he goes, the gate stays open longer, partial flood damage
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 3,
      candidates: [{ requestId: 'CHAIN_DROWNING_OATH_A3_DELAY', weight: 1 }],
    },
  ],
},

// A2a — Family escaped on their own
{
  id: 'CHAIN_DROWNING_OATH_A2_FAMILY_SAFE',
  chainId: 'DROWNING_OATH',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'They Crossed Themselves',
  portraitId: 'farmer',
  text: 'Holbrand\'s wife had seen the Durn rising too. She strapped their boy to her back and crossed the upper stones before the ford broke. They are alive. Holbrand stands with them in the yard, not speaking, not looking at you. Wulfgar\'s plan held. But Holbrand did not need your mercy — and you did not offer it.',
  options: [
    {
      text: 'OFFER THANKS',
      effects: { satisfaction: 2, authority: 1 },
    },
    {
      text: 'SAY NOTHING',
      effects: { authority: 3, satisfaction: -1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 3,
      candidates: [{ requestId: 'CHAIN_DROWNING_OATH_END_BITTER_VICTORY', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 3,
      candidates: [{ requestId: 'CHAIN_DROWNING_OATH_END_BITTER_VICTORY', weight: 1 }],
    },
  ],
},

// A2b — Family lost
{
  id: 'CHAIN_DROWNING_OATH_A2_FAMILY_LOST',
  chainId: 'DROWNING_OATH',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Flood Took Them',
  portraitId: 'farmer',
  text: 'Holbrand\'s wife did not cross in time. The ford broke in the night. Their boy survived — pulled from a tree by a passing trader. His wife did not. Holbrand has not spoken since the body was found downstream. The settlement is dry. Wulfgar\'s plan worked. The cost was one woman who never even knew she was a price paid.',
  options: [
    {
      text: 'BURY HER WITH HONOURS',
      effects: { gold: -5, satisfaction: 1 },
    },
    {
      text: 'LET HOLBRAND GRIEVE ALONE',
      effects: { satisfaction: -3, farmers: -2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_DROWNING_OATH_END_MOURNING', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_DROWNING_OATH_END_MOURNING', weight: 1 }],
    },
  ],
},

// A3 — Delay branch: Holbrand goes back, evacuation delayed, partial flood
{
  id: 'CHAIN_DROWNING_OATH_A3_DELAY',
  chainId: 'DROWNING_OATH',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Ford Breaks',
  portraitId: 'guard',
  text: 'The evacuation was late. By the time Holbrand returned with his family, the Durn had already broken the lower bank. The farmsteads on the eastern edge flooded. Three families lost their stores. No one drowned — but the grain that was to last the winter is rotting in two feet of water. Wulfgar\'s letter lay in your pocket the whole time.',
  options: [
    {
      text: 'DISTRIBUTE RESERVES',
      effects: { gold: -15, health: 2, satisfaction: 3 },
    },
    {
      text: 'LET THEM MANAGE',
      effects: { health: -4, satisfaction: -5 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_DROWNING_OATH_END_FLOOD_PARTIAL', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_DROWNING_OATH_END_FLOOD_PARTIAL', weight: 1 }],
    },
  ],
},

// ===== PATH B: BURN IT UNREAD =====

// B1 — Barnwulf, your advisor, discovers the ash and the broken seal in the fire pit.
{
  id: 'CHAIN_DROWNING_OATH_B1_BARNWULF',
  chainId: 'DROWNING_OATH',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'What Burns in the Hearth',
  portraitId: 'advisor',
  text: 'Barnwulf says nothing at first. He stands at the hearth, turns the half-burned fragment in his fingers, and reads the single legible line: "...seal the ford gate before — ". Then he looks at you. "This was Wulfgar\'s hand," he says. "A man died to deliver this." The question hangs between you like smoke.',
  options: [
    {
      text: 'CONFESS',
      effects: { authority: -3, satisfaction: 2 },
    },
    {
      text: 'DENY IT',
      effects: { authority: 1, satisfaction: -3 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 3,
      candidates: [{ requestId: 'CHAIN_DROWNING_OATH_END_CONFESSION', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      // The lie might hold or not — Barnwulf is not easily fooled
      candidates: [
        { requestId: 'CHAIN_DROWNING_OATH_END_LIE_HOLDS', weight: 2 },
        { requestId: 'CHAIN_DROWNING_OATH_END_LIE_BREAKS', weight: 1 },
      ],
    },
  ],
},

// ===== ENDS =====

{
  id: 'CHAIN_DROWNING_OATH_END_BITTER_VICTORY',
  chainId: 'DROWNING_OATH',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'The Right Thing',
  portraitId: 'elder',
  text: 'The Durn has receded. The settlement stands. Wulfgar\'s name is carved into the gate post by one of the old guards — quietly, without ceremony. Holbrand\'s family survived. But whenever you pass that gate, you remember the look on his face when you told him to stay. You made the correct decision. It does not feel like one.',
  options: [
    {
      text: 'COMMISSION A MARKER',
      effects: { gold: -3, satisfaction: 3, authority: 1 },
    },
    {
      text: 'MOVE FORWARD',
      effects: { satisfaction: 1 },
    },
  ],
},

{
  id: 'CHAIN_DROWNING_OATH_END_MOURNING',
  chainId: 'DROWNING_OATH',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'What the Oath Cost',
  portraitId: 'elder',
  text: 'The settlement endures. Holbrand still lives here — works the land, raises his boy, speaks to no one more than necessary. He never blames you. He never forgives you either. Wulfgar\'s plan worked. A man died to deliver it. A woman died because you followed it. The numbers make sense. The numbers always make sense.',
  options: [
    {
      text: 'PROVIDE FOR THE BOY',
      effects: { gold: -5, satisfaction: 2, farmers: 1 },
    },
    {
      text: 'ACCEPT THE WEIGHT',
      effects: { authority: 2, satisfaction: -2 },
    },
  ],
},

{
  id: 'CHAIN_DROWNING_OATH_END_FLOOD_PARTIAL',
  chainId: 'DROWNING_OATH',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'A Kindness and Its Price',
  portraitId: 'elder',
  text: 'The flood damage is repaired. Holbrand\'s family is whole. People quietly remember that you waited — that you gave a man the chance to save his own. They do not know about the letter, or what it cost the eastern farms. Some debts are invisible. They collect interest just the same.',
  options: [
    {
      text: 'REBUILD THE FORD',
      effects: { gold: -8, health: 2 },
    },
    {
      text: 'LEAVE IT TO CHANCE',
      effects: { fireRisk: 1, health: -1 },
    },
  ],
},

{
  id: 'CHAIN_DROWNING_OATH_END_CONFESSION',
  chainId: 'DROWNING_OATH',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'Spoken Aloud',
  portraitId: 'advisor',
  text: 'Barnwulf listens. He does not interrupt. When you finish, he says: "You made a choice under pressure. That is what rulers do." He pauses. "But the dead captain deserved better." He will tell no one. Holbrand was informed this morning — gently, by Barnwulf himself — that no warning existed. That the river simply rose. Barnwulf carries your secret now. You are not sure that is better.',
  options: [
    {
      text: 'THANK HIM',
      effects: { authority: -1, satisfaction: 2 },
    },
    {
      text: 'ASK HIM TO FORGET',
      effects: { authority: 2, satisfaction: -2 },
    },
  ],
},

{
  id: 'CHAIN_DROWNING_OATH_END_LIE_HOLDS',
  chainId: 'DROWNING_OATH',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'Smooth Ground',
  portraitId: 'advisor',
  text: 'Barnwulf accepts your explanation — or pretends to. He is a careful man. Either way, the matter closes. The settlement does not flood. Wulfgar\'s warning was never acted on. You do not know if you were lucky or wise. Perhaps the two are indistinguishable from where you sit.',
  options: [
    {
      text: 'PAY TRIBUTE TO WULFGAR',
      effects: { gold: -4, authority: 2 },
    },
    {
      text: 'PUT IT BEHIND YOU',
      effects: { satisfaction: 1 },
    },
  ],
},

{
  id: 'CHAIN_DROWNING_OATH_END_LIE_BREAKS',
  chainId: 'DROWNING_OATH',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'What Barnwulf Knows',
  portraitId: 'advisor',
  text: 'Barnwulf does not confront you again. He simply begins, quietly, to tell the story to others — not the lie, but a different version: that a man rode out to find you, and no one was listening. The guards heard it from a stable boy. The elder heard it from the guards. Holbrand heard it last. He has not spoken to you since. Some things, once dropped into a well, keep falling.',
  options: [
    {
      text: 'FACE THE CONSEQUENCES',
      effects: { authority: -5, satisfaction: -3, health: 2 },
    },
    {
      text: 'SILENCE THE RUMOUR',
      effects: { authority: -3, gold: -8, satisfaction: -2 },
    },
  ],
},


// =========================================================
// CHAIN 2: STRANGERS_TAB — The Stranger's Tab
// Stage:   Mid-game (requires building:tavern)
// Moral:   Justice for the murdered vs. mercy for the innocent
// Size:    M (14 requests)
// Central Question: Do you enforce the law when the law
//          will orphan two children for their father's
//          desperate mistake?
// =========================================================

// --- START ---
{
  id: 'CHAIN_STRANGERS_TAB_START',
  chainId: 'STRANGERS_TAB',
  chainRole: 'start',
  requires: ['building:tavern'],
  title: 'What the Tavern-Keeper Heard',
  portraitId: 'bard',
  text: 'Merewyn, who runs your tavern, comes to you before dawn with wine-stained hands and a low voice. A cloth-merchant called Stormric has been drinking himself hollow for four nights. Last night he told her everything: a barn in Brackenham, a sack of grain, an accident with a lantern. A farmhand named Cræcbrand was sleeping inside. He didn\'t know. He ran. He\'s been running since.\n\nTwo small girls are asleep in the storeroom. His daughters. He paid for their beds with his last coin.\n\n"I didn\'t know what to do," Merewyn says. "So I came to you."',
  options: [
    {
      text: 'HEAR HIM MYSELF',
      effects: { authority: 1 },
    },
    {
      text: 'HAND HIM OVER',
      effects: { authority: 3, satisfaction: -4 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_STRANGERS_TAB_A1_MEETING', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_STRANGERS_TAB_B1_BRACKENHAM', weight: 1 }],
    },
  ],
},

// ===== PATH A: HEAR HIM YOURSELF =====

{
  id: 'CHAIN_STRANGERS_TAB_A1_MEETING',
  chainId: 'STRANGERS_TAB',
  chainRole: 'member',
  canTriggerRandomly: false,
  advancesTick: false,
  title: 'The Cloth-Merchant\'s Story',
  portraitId: 'traveler',
  text: 'Stormric is a gaunt man. His hands will not stop moving. He tells you everything without being asked: the hunger, the children, the decision to take the grain, the lantern catching the hay, the scream he heard as he ran. "I didn\'t know anyone was in there. I swear it. I swear on their mothers\' graves." He means his daughters.\n\nHe does not ask for mercy. He asks only that his girls are looked after. "Whatever you decide for me," he says, "they shouldn\'t carry it."',
  options: [
    {
      text: 'BELIEVE HIM',
      effects: { satisfaction: 1 },
    },
    {
      text: 'CRIMINALS LIE',
      effects: { authority: 2, satisfaction: -2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_STRANGERS_TAB_A2_BELIEVE', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_STRANGERS_TAB_A4_DOUBT', weight: 1 }],
    },
  ],
},

// A2 — Believe him: now the harder choice
{
  id: 'CHAIN_STRANGERS_TAB_A2_BELIEVE',
  chainId: 'STRANGERS_TAB',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'What Mercy Costs',
  portraitId: 'traveler',
  text: 'You believe him. You are not sure if that is wisdom or weakness. A man is dead in Brackenham. Cræcbrand had a wife and two sons of his own. His family has been told it was arson. They want the man responsible.\n\nStormric\'s daughters are waking in the storeroom below. You can hear them asking for bread.\n\nA rider arrived this morning from Brackenham. Their reeve is coming. He will be here by evening.',
  options: [
    {
      text: 'HIDE HIM',
      effects: { authority: -3, satisfaction: 3 },
    },
    {
      text: 'OFFER HIM UP',
      effects: { authority: 4, satisfaction: -5, gold: 8 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 3,
      candidates: [{ requestId: 'CHAIN_STRANGERS_TAB_A3_SEARCH', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_STRANGERS_TAB_END_A_SACRIFICE', weight: 1 }],
    },
  ],
},

// A3 — Brackenham searches your settlement
{
  id: 'CHAIN_STRANGERS_TAB_A3_SEARCH',
  chainId: 'STRANGERS_TAB',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Reeve at the Gate',
  portraitId: 'noble',
  text: 'The reeve of Brackenham — a hard man named Skargarth — arrives with six riders and a piece of parchment. He knows who he\'s looking for. Someone talked; probably a merchant who passed through. He asks you, directly, if you are harbouring Stormric. His eyes say he already suspects the answer.\n\nStormric is hidden in your grain store. The girls are in Merewyn\'s back room.',
  options: [
    {
      text: 'DENY EVERYTHING',
      effects: { authority: -2 },
      authorityCheck: {
        minCommit: 5,
        maxCommit: 30,
        minSuccessChance: 30,
        maxSuccessChance: 75,
        onSuccess: { authority: 3 },
        onFailure: { authority: -5, satisfaction: -4 },
        successFeedbackRequestId: 'CHAIN_STRANGERS_TAB_A3_SEARCH_SUCCESS',
        failureFeedbackRequestId: 'CHAIN_STRANGERS_TAB_A3_SEARCH_FAILURE',
      },
    },
    {
      text: 'STAND ASIDE',
      effects: { authority: -4, satisfaction: -4, gold: 5 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_STRANGERS_TAB_END_A_FOUND', weight: 1 }],
    },
  ],
},

{
  id: 'CHAIN_STRANGERS_TAB_A3_SEARCH_SUCCESS',
  chainId: 'STRANGERS_TAB',
  chainRole: 'member',
  canTriggerRandomly: false,
  advancesTick: false,
  title: 'Skargarth Leaves Empty-Handed',
  portraitId: 'noble',
  text: 'Skargarth studies your face for a long moment. Then he tells his riders to stand down. He is not satisfied — but he has no proof. "If he surfaces," he says, "he is ours." He rides out at dusk. In the grain store, Stormric has not moved for two hours.',
  options: [
    {
      text: 'RELEASE HIM QUIETLY',
      effects: { authority: 1, satisfaction: 2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_STRANGERS_TAB_END_A_HIDDEN', weight: 1 }],
    },
  ],
},

{
  id: 'CHAIN_STRANGERS_TAB_A3_SEARCH_FAILURE',
  chainId: 'STRANGERS_TAB',
  chainRole: 'member',
  canTriggerRandomly: false,
  advancesTick: false,
  title: 'The Grain Store',
  portraitId: 'noble',
  text: 'Skargarth does not flinch. He says: "You are a poor liar, my lord." His riders go straight to the grain store. You do not know how he knew. Someone told him — or he simply guessed and pressed. Stormric is dragged out blinking into the yard. The girls hear it from the storeroom.',
  options: [
    {
      text: 'LET THEM TAKE HIM',
      effects: { authority: -2, satisfaction: -3 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_STRANGERS_TAB_END_A_FOUND', weight: 1 }],
    },
  ],
},

// A4 — Doubt him: hesitation means Skargarth arrives before you decide
{
  id: 'CHAIN_STRANGERS_TAB_A4_DOUBT',
  chainId: 'STRANGERS_TAB',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Before You Decide',
  portraitId: 'noble',
  text: 'You are still weighing it when Skargarth arrives. You have not decided. You have not hidden the man — but you have not sent for him either. Skargarth stands in your hall and waits. His riders are already in the yard.\n\nIn your hesitation, the choice has been made for you.',
  options: [
    {
      text: 'HAND HIM OVER',
      effects: { authority: 3, satisfaction: -5 },
    },
    {
      text: 'TURN SKARGARTH AWAY',
      effects: { authority: -4, satisfaction: 2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_STRANGERS_TAB_END_A_FOUND', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_STRANGERS_TAB_END_A_HIDDEN', weight: 1 }],
    },
  ],
},

// ===== PATH B: HAND HIM OVER IMMEDIATELY =====

{
  id: 'CHAIN_STRANGERS_TAB_B1_BRACKENHAM',
  chainId: 'STRANGERS_TAB',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Skargarth\'s Gratitude',
  portraitId: 'noble',
  text: 'Skargarth does not smile, but something in his posture softens. He calls you an honest lord. He says Cræcbrand\'s family will know a name, at last. His riders collect Stormric from your gate without ceremony. The girls watch from the tavern window. Merewyn has taken them inside and does not come out.\n\nSkargarth offers you payment. "For your trouble," he says.',
  options: [
    {
      text: 'ACCEPT',
      effects: { gold: 15, authority: 2, satisfaction: -3 },
    },
    {
      text: 'REFUSE',
      effects: { authority: 4, satisfaction: -2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_STRANGERS_TAB_END_B_CLEAN_HANDS', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_STRANGERS_TAB_END_B_COLD_JUSTICE', weight: 1 }],
    },
  ],
},

// ===== ENDS =====

{
  id: 'CHAIN_STRANGERS_TAB_END_A_HIDDEN',
  chainId: 'STRANGERS_TAB',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 45,
  title: 'Gone by Morning',
  portraitId: 'bard',
  text: 'Stormric and his daughters are gone before the week ends — north, Merewyn says, toward the Taern. Whether Brackenham ever finds him, you do not know. Cræcbrand\'s family has no answer. They grieve without a name. You sit in the tavern some evenings and think about the sound of children asking for bread, and a man who did a terrible thing for the simplest reason.',
  options: [
    {
      text: 'LEAVE A COIN FOR MEREWYN',
      effects: { gold: -2, satisfaction: 2 },
    },
    {
      text: 'DRINK ALONE',
      effects: { satisfaction: -1, authority: 1 },
    },
  ],
},

{
  id: 'CHAIN_STRANGERS_TAB_END_A_FOUND',
  chainId: 'STRANGERS_TAB',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 45,
  title: 'The Girls Stay',
  portraitId: 'children',
  text: 'Stormric was taken. His daughters have nowhere to go. Merewyn keeps them for now, quietly, feeding them from her own table. The elder one does not speak much. The younger doesn\'t seem to understand yet. You provided what you could — mercy where mercy still had purchase. Whether it was enough, you have no way of knowing.',
  options: [
    {
      text: 'ARRANGE FOR THEIR CARE',
      effects: { gold: -6, satisfaction: 4, farmers: 1 },
    },
    {
      text: 'LEAVE THEM TO MEREWYN',
      effects: { satisfaction: -2, health: 1 },
    },
  ],
},

{
  id: 'CHAIN_STRANGERS_TAB_END_A_SACRIFICE',
  chainId: 'STRANGERS_TAB',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 45,
  title: 'The Price of Belief',
  portraitId: 'traveler',
  text: 'You handed Stormric over. You also quietly ensured the girls would not follow — fed, housed, placed in Merewyn\'s care. Skargarth\'s riders didn\'t ask about them, and you didn\'t offer. Somewhere on the road to Brackenham, Stormric knows this. You hope it is a comfort. You are not entirely sure it is.',
  options: [
    {
      text: 'CARE FOR THE GIRLS',
      effects: { gold: -6, satisfaction: 3, farmers: 1 },
    },
    {
      text: 'PAY YOUR DEBT TO CRÆCBRAND',
      effects: { gold: -4, authority: 3, satisfaction: 1 },
    },
  ],
},

{
  id: 'CHAIN_STRANGERS_TAB_END_B_CLEAN_HANDS',
  chainId: 'STRANGERS_TAB',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 45,
  title: 'What Justice Pays',
  portraitId: 'noble',
  text: 'The coin is in your treasury. Brackenham is satisfied. The law is satisfied. Cræcbrand\'s family has a name and a man to blame. The settlement feels no different than it did yesterday. Merewyn has not spoken to you since. The girls were gone by the time you looked for them.',
  options: [
    {
      text: 'SPEND THE COIN ON THE SETTLEMENT',
      effects: { gold: -15, health: 3, satisfaction: 2 },
    },
    {
      text: 'KEEP IT',
      effects: { satisfaction: -3 },
    },
  ],
},

{
  id: 'CHAIN_STRANGERS_TAB_END_B_COLD_JUSTICE',
  chainId: 'STRANGERS_TAB',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 45,
  title: 'A Lord\'s Refusal',
  portraitId: 'noble',
  text: 'You refused the coin. Skargarth seemed unsure whether to admire you or distrust you. The word from Brackenham, reaching you later through a trader, is that Stormric told the truth — he wept at his hearing, kept saying he didn\'t know. Cræcbrand\'s widow accepted the verdict but refused to watch. There is no clean ending to a man burning alive in borrowed grain.',
  options: [
    {
      text: 'SEND SOMETHING TO THE WIDOW',
      effects: { gold: -5, authority: 3, satisfaction: 2 },
    },
    {
      text: 'LET BRACKENHAM CARRY IT',
      effects: { authority: 2, satisfaction: -1 },
    },
  ],
},


// =========================================================
// CHAIN 3: SHRINES_SILENCE — The Shrine's Silence
// Stage:   Late-game (requires building:shrine)
// Moral:   Obligations to the dead vs. survival of the living
// Size:    M (15 requests)
// Central Question: Your priest knows what is killing your
//          people. He cannot tell you. Does his sacred
//          obligation to the dead outweigh the living?
// =========================================================

// --- START ---
{
  id: 'CHAIN_SHRINES_SILENCE_START',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'start',
  requires: ['building:shrine'],
  title: 'What the Priest Cannot Say',
  portraitId: 'village_priest',
  text: 'Garthric, your village priest, comes to you after vespers. He looks like a man who has not slept. Three deaths in seven days: Merewic the tanner, old Thorntun-wife, and young Fennric\'s boy. All three dead of something the healer Dunhild cannot name.\n\n"I know something," Garthric says. He sits down without being invited. "I cannot tell you what. It came to me in confession, from someone who has since died. But I believe — I am certain — that others will follow unless you act." He looks at the floor. "I cannot give you the name. I cannot give you the reason. I can only tell you that I know, and that I am asking you to trust me."',
  options: [
    {
      text: 'DEMAND THE NAME',
      effects: { authority: 2 },
    },
    {
      text: 'TRUST AND SEARCH',
      effects: { authority: -1, health: -1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_A1_DEMAND', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_B1_SEARCH', weight: 1 }],
    },
  ],
},

// ===== PATH A: DEMAND THE NAME =====

{
  id: 'CHAIN_SHRINES_SILENCE_A1_DEMAND',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'member',
  canTriggerRandomly: false,
  advancesTick: false,
  title: 'A Lord\'s Command',
  portraitId: 'village_priest',
  text: 'Garthric does not flinch. He says: "What was told to me under the seal of confession belongs to the dead and to the divine. It is not mine to give — and even if you command it, I do not believe a command can make a wrong thing right." He pauses. "But I know what lives are at stake. I have thought of little else." There are tears in his eyes. He is genuinely torn.',
  options: [
    {
      text: 'BREAK HIM',
      effects: { authority: 3, satisfaction: -4 },
      authorityCheck: {
        minCommit: 10,
        maxCommit: 40,
        minSuccessChance: 35,
        maxSuccessChance: 70,
        onSuccess: { authority: 2 },
        onFailure: { authority: -6, satisfaction: -3 },
        successFeedbackRequestId: 'CHAIN_SHRINES_SILENCE_A1_BREAK_SUCCESS',
        failureFeedbackRequestId: 'CHAIN_SHRINES_SILENCE_A1_BREAK_FAILURE',
      },
    },
    {
      text: 'STEP BACK',
      effects: { authority: -2, satisfaction: 2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_A3_REFUSED', weight: 1 }],
    },
  ],
},

{
  id: 'CHAIN_SHRINES_SILENCE_A1_BREAK_SUCCESS',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'member',
  canTriggerRandomly: false,
  advancesTick: false,
  title: 'The Weight of Authority',
  portraitId: 'village_priest',
  text: 'Garthric breaks. Not because he changes his mind — but because he cannot watch more people die. He tells you the name and the place with the voice of a man giving up something he cannot get back. He will never mention it again. He will never forgive himself. And he will never fully trust you again.',
  options: [
    {
      text: 'ACT ON IT',
      effects: { authority: -1, health: 2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 3,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_A2_TOLD', weight: 1 }],
    },
  ],
},

{
  id: 'CHAIN_SHRINES_SILENCE_A1_BREAK_FAILURE',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'member',
  canTriggerRandomly: false,
  advancesTick: false,
  title: 'He Does Not Break',
  portraitId: 'village_priest',
  text: 'Garthric looks at you steadily through everything you say. At the end, he says only: "Do what you must with me. But the seal holds." He is pale and shaking. But he does not break. You have diminished yourself and gained nothing.',
  options: [
    {
      text: 'FIND ANOTHER WAY',
      effects: { authority: -2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_A3_REFUSED', weight: 1 }],
    },
  ],
},

// A2 — He told you. What the information gives you.
{
  id: 'CHAIN_SHRINES_SILENCE_A2_TOLD',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'A Poisoned Well',
  portraitId: 'healer',
  text: 'Dunhild examines the location Garthric named. A secondary well, behind a long-abandoned croft — someone had been dumping waste there for months. The tanner drew water from it. So did others, occasionally. Dunhild seals it within the hour.\n\nThe deaths stop. Three more people who were already ill recover slowly. The settlement is safe. Garthric sits in the shrine all night, and the next night, and the night after that. He does not come to meals.',
  options: [
    {
      text: 'SPEAK WITH HIM',
      effects: { satisfaction: 2, authority: -1 },
    },
    {
      text: 'GIVE HIM TIME',
      effects: { authority: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_END_A_SAVED_BROKEN', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_END_A_SAVED_BROKEN', weight: 1 }],
    },
  ],
},

// A3 — He refused; now you investigate independently
{
  id: 'CHAIN_SHRINES_SILENCE_A3_REFUSED',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Healer Searches',
  portraitId: 'healer',
  text: 'Dunhild takes up the investigation herself: water sources, stored food, animal carcasses, shared tools. She moves through the settlement at dawn and dusk with that quiet, unhurried focus that makes everyone slightly afraid of her. Garthric watches from the shrine doorway. He does not offer help. But he does not hide his relief that someone is looking.',
  options: [
    {
      text: 'ASSIGN GUARDS TO HELP',
      effects: { gold: -5, health: 2 },
    },
    {
      text: 'LET HER WORK ALONE',
      effects: { health: -1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [
        { requestId: 'CHAIN_SHRINES_SILENCE_A4_FOUND', weight: 2 },
        { requestId: 'CHAIN_SHRINES_SILENCE_A4_TOO_LATE', weight: 1 },
      ],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [
        { requestId: 'CHAIN_SHRINES_SILENCE_A4_FOUND', weight: 1 },
        { requestId: 'CHAIN_SHRINES_SILENCE_A4_TOO_LATE', weight: 2 },
      ],
    },
  ],
},

{
  id: 'CHAIN_SHRINES_SILENCE_A4_FOUND',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Dunhild Finds It',
  portraitId: 'healer',
  text: 'Dunhild finds the same well Garthric could have pointed her to three days ago. She seals it. The sickness does not spread further. She comes to you with soil on her hands and says only: "Done." She does not know what Garthric knew. Garthric does not tell her. The seal held — and the well was found anyway.',
  options: [
    {
      text: 'HONOUR DUNHILD\'S WORK',
      effects: { satisfaction: 3, health: 2, gold: -4 },
    },
    {
      text: 'ACKNOWLEDGE GARTHRIC\'S SACRIFICE',
      effects: { authority: 2, satisfaction: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 3,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_END_A_FOUND_INDEPENDENTLY', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 3,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_END_A_FOUND_INDEPENDENTLY', weight: 1 }],
    },
  ],
},

{
  id: 'CHAIN_SHRINES_SILENCE_A4_TOO_LATE',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Fourth Death',
  portraitId: 'healer',
  text: 'Before Dunhild can close in on the source, another farmer takes ill. He is young — barely older than a boy. His mother brings him to Dunhild at midnight. He survives, barely. Dunhild finds the well the next morning, her face unreadable.\n\nGarthric came out of the shrine when he heard about the boy. He stood in the yard and said nothing. He has not returned to the shrine since.',
  options: [
    {
      text: 'DO NOT BLAME HIM',
      effects: { satisfaction: 2, authority: -1 },
    },
    {
      text: 'TELL HIM WHAT THIS COST',
      effects: { authority: 3, satisfaction: -4 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_END_A_TOO_LATE', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_END_A_TOO_LATE', weight: 1 }],
    },
  ],
},

// ===== PATH B: TRUST HIM — FIND ANOTHER WAY =====

{
  id: 'CHAIN_SHRINES_SILENCE_B1_SEARCH',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Dunhild\'s Hunt',
  portraitId: 'healer',
  text: 'You tell Dunhild everything except the one thing you don\'t know. She listens with the same flat attention she gives to wounds and fevers. Then she says: "Three deaths. Same week. Similar symptoms. Someone, somewhere, touched the same thing." She takes nothing with her and sets off into the settlement before you can say another word. Garthric watches from the shrine doorway and nods once.',
  options: [
    {
      text: 'FUND HER SEARCH',
      effects: { gold: -8, health: 2 },
    },
    {
      text: 'SEND GUARDS TOO',
      effects: { gold: -4, landForces: -1, health: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [
        { requestId: 'CHAIN_SHRINES_SILENCE_B2_HEALER_SUCCEEDS', weight: 2 },
        { requestId: 'CHAIN_SHRINES_SILENCE_B2_HEALER_FAILS', weight: 1 },
      ],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [
        { requestId: 'CHAIN_SHRINES_SILENCE_B2_HEALER_SUCCEEDS', weight: 3 },
        { requestId: 'CHAIN_SHRINES_SILENCE_B2_HEALER_FAILS', weight: 1 },
      ],
    },
  ],
},

{
  id: 'CHAIN_SHRINES_SILENCE_B2_HEALER_SUCCEEDS',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Well Behind the Croft',
  portraitId: 'healer',
  text: 'Dunhild returns before nightfall. She found it herself — an abandoned well, waste-soaked, invisible unless you knew to look. "Old Cræcbrand\'s croft," she says. "No one\'s used the house in two years, but someone was drawing water from the back." She seals it that evening. No further illness follows.\n\nGarthric appears in your doorway. He says: "Thank you." Nothing more. But the way he says it carries the weight of everything he did not say.',
  options: [
    {
      text: 'ACKNOWLEDGE HIM',
      effects: { satisfaction: 3, authority: 1 },
    },
    {
      text: 'LET IT BE ENOUGH',
      effects: { satisfaction: 2, health: 2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 3,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_END_B_HEALER_SAVES', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 3,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_END_B_HEALER_SAVES', weight: 1 }],
    },
  ],
},

{
  id: 'CHAIN_SHRINES_SILENCE_B2_HEALER_FAILS',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Days Pass',
  portraitId: 'healer',
  text: 'Dunhild works for three days and finds nothing clear. "The symptoms match five possible causes," she tells you. "I need more time." On the second night, a fourth person falls ill. On the third morning, he is dead. The settlement is frightened. Garthric is standing in the shrine for hours each day. He looks like a man watching a building burn and holding a key.',
  options: [
    {
      text: 'PRESSURE GARTHRIC AGAIN',
      effects: { authority: 2, satisfaction: -3 },
    },
    {
      text: 'GIVE DUNHILD MORE TIME',
      effects: { health: -3, gold: -6 },
    },
  ],
  followUps: [
    {
      // Loop back into the demand path — the situation has now escalated
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_A1_DEMAND', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'CHAIN_SHRINES_SILENCE_END_B_COST_OF_FAITH', weight: 1 }],
    },
  ],
},

// ===== ENDS =====

{
  id: 'CHAIN_SHRINES_SILENCE_END_A_SAVED_BROKEN',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'Saved and Broken',
  portraitId: 'village_priest',
  text: 'The settlement is safe. The well is sealed. The sick have recovered. Garthric continues his duties — he has not stopped, and will not stop. But something in the shrine is different now. The villagers feel it without being able to name it. A priest who broke a sacred seal under a lord\'s authority is still a priest. Whether he is the same kind of priest is a different question. You do not know if what you did was right. You know it worked.',
  options: [
    {
      text: 'PUBLICLY HONOUR HIM',
      effects: { satisfaction: 3, authority: -1 },
    },
    {
      text: 'KEEP HIS SACRIFICE PRIVATE',
      effects: { authority: 2, satisfaction: 1 },
    },
  ],
},

{
  id: 'CHAIN_SHRINES_SILENCE_END_A_FOUND_INDEPENDENTLY',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'What Was Always Possible',
  portraitId: 'village_priest',
  text: 'Dunhild found the answer on her own. The seal held. The deaths stopped. Garthric spoke at the settlement\'s small ceremony for the victims — slowly, with a grief that felt genuine and unperformed. He catches your eye once, briefly, and does not look away first. You let him keep his dignity. Perhaps that was the right choice. Perhaps it was simply the easier one.',
  options: [
    {
      text: 'INVEST IN THE SHRINE',
      effects: { gold: -6, satisfaction: 3, health: 2 },
    },
    {
      text: 'LET THE DEAD REST',
      effects: { satisfaction: 2, authority: 1 },
    },
  ],
},

{
  id: 'CHAIN_SHRINES_SILENCE_END_A_TOO_LATE',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'The Seal and Its Cost',
  portraitId: 'village_priest',
  text: 'The well is sealed. The illness is over. But someone died who might not have, and everyone who was close to Garthric knows, in some wordless way, that he suffered for a reason. No one knows the reason. No one will. The dead man\'s confession is ash. Garthric carries it forward. He will carry it until he dies, and then it will be gone, and no one will be able to say if the cost was worth it.',
  options: [
    {
      text: 'SPEAK TO GARTHRIC',
      effects: { satisfaction: 2, authority: 1 },
    },
    {
      text: 'OFFER PRAYERS FOR THE DEAD',
      effects: { satisfaction: 3, health: 1, gold: -3 },
    },
  ],
},

{
  id: 'CHAIN_SHRINES_SILENCE_END_B_HEALER_SAVES',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'Faith and Evidence',
  portraitId: 'healer',
  text: 'Dunhild saved them with empirical stubbornness and three sleepless days. Garthric saved nothing and everything simultaneously. The shrine has a new kind of quiet in it now — not emptiness, but the specific silence of an obligation honoured at great personal cost. Villagers come more often. They do not know why it feels different. You do.',
  options: [
    {
      text: 'REBUILD THE SHRINE\'S STORES',
      effects: { gold: -6, health: 3, satisfaction: 3 },
    },
    {
      text: 'THANK BOTH OF THEM',
      effects: { satisfaction: 4, authority: 1 },
    },
  ],
},

{
  id: 'CHAIN_SHRINES_SILENCE_END_B_COST_OF_FAITH',
  chainId: 'SHRINES_SILENCE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'What It Cost to Trust',
  portraitId: 'village_priest',
  text: 'The source was found — eventually. Too late for one man. Dunhild sealed the well three days after the fourth death. Garthric officiated at two more funerals that week. He held each one with the same steady voice, the same unhurried grace. No one blamed him. No one could have. But you sit with the knowledge that somewhere, in his certainty, there was a name — and you chose to honour the silence that held it. You are not sure you chose wrong. You are not sure you chose right.',
  options: [
    {
      text: 'INVEST IN HEALTH INFRASTRUCTURE',
      effects: { gold: -10, health: 4, fireRisk: -1 },
    },
    {
      text: 'SIT WITH THE WEIGHT',
      effects: { authority: 2, satisfaction: -1 },
    },
  ],
},
