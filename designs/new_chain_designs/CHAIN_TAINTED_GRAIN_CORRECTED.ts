// =========================================================
// CHAIN: TAINTED_GRAIN – The Poisoned Grain
// Size: L (49 requests: 1 start + 21 members + 21 ends + 6 authority info)
//
// Theme: A merchant delivers tainted grain that sickens villagers.
// Is it sabotage, negligence, or conspiracy? The player must protect
// their people and decide how far to pursue the truth.
//
// Narrative Promise: "Can you save your people and uncover the truth?"
//
// Core Resources: Health, Gold, Satisfaction, Authority
// Secondary: Land Forces (combat paths), Fire Risk (minor)
//
// Characters:
//   Dunhild (healer)            – reports the illness, treats the sick
//   Barnwulf (advisor)          – counsels the player
//   Feldric (military_advisor)  – advises on military confrontation
//   Markweard (mage_advisor)    – discovers arcane traces
//   Aldric (merchant)           – the grain merchant
//   Edwyn (council_member)      – demands harsh justice
//   Osric (guard)               – investigates and tracks
//   Wulfric of Branscir (noble) – Aldric's patron
//   Hild (farmer)               – a sick villager
//   A stranger (traveler)       – brings outside help
//
// Branch Map:
//
// START
// ├── [0] INVESTIGATE → EXAMINE
// │   ├── [0] SEIZE → GRAIN_ANALYZED
// │   │   ├── [0] SUMMON MERCHANT → CONFRONT
// │   │   │   ├── [0] DEMAND TRUTH (auth) →
// │   │   │   │   success → SUPPLIER_REVEALED
// │   │   │   │     ├── [0] CONFRONT WULFRIC (auth) →
// │   │   │   │     │   success → END_NOBLE_JUSTICE
// │   │   │   │     │   fail → WULFRIC_RETALIATES
// │   │   │   │     │     ├── [0] FIGHT (combat) → win:END_MILITARY_VICTORY / lose:END_BITTER_DEFEAT
// │   │   │   │     │     └── [1] YIELD → END_BITTER_DEFEAT
// │   │   │   │     └── [1] USE AS LEVERAGE → END_SHADOW_DEAL
// │   │   │   │   fail → ALDRIC_PANICS
// │   │   │   │     ├── [0] SEND GUARDS → CHASE → END_ROUGH_JUSTICE
// │   │   │   │     └── [1] LET HIM RUN → END_UNRESOLVED
// │   │   │   └── [1] IMPRISON → IMPRISONED
// │   │   │       ├── [0] HOLD FIRM → PATRON_ARRIVES
// │   │   │       │   ├── [0] DEFY (combat) → win:END_DEFIANT_VICTORY / lose:END_SIEGE_LOST
// │   │   │       │   └── [1] NEGOTIATE (auth) →
// │   │   │       │       success → END_FAIR_TRIAL
// │   │   │       │       fail → END_HUMILIATION
// │   │   │       └── [1] RELEASE → END_PRAGMATIC_RELEASE
// │   │   └── [1] INVESTIGATE SOURCE → DEEPER_PROBE
// │   │       ├── [0] FOLLOW ARCANE TRAIL → CONSPIRACY
// │   │       │   ├── [0] EXPOSE → END_PUBLIC_TRIUMPH
// │   │       │   └── [1] BLACKMAIL → END_BLACKMAIL
// │   │       └── [1] FOCUS ON HEALING → END_HEALER_FOCUS
// │   └── [1] TRACK MERCHANT → TRAIL → MERCHANT_CAMP
// │       ├── [0] AMBUSH → AMBUSH_RESULT → END_AMBUSH_JUDGMENT
// │       └── [1] OBSERVE → OBSERVE → PATRON_MEETING
// │           ├── [0] CONFRONT → END_DIPLOMATIC_VICTORY
// │           └── [1] RETURN WITH EVIDENCE → END_STRATEGIC_ADVANTAGE
// └── [1] QUARANTINE → QUARANTINE
//     ├── [0] STRICT → LOCKDOWN → MERCHANT_RETURNS
//     │   ├── [0] ACCEPT REMEDY → END_GRATEFUL_RECOVERY / END_TRAGIC_BETRAYAL (weighted)
//     │   └── [1] ARREST → END_QUARANTINE_JUSTICE
//     └── [1] GENTLE CARE → GENTLE → CRISIS_DEEPENS
//         ├── [0] SEEK OUTSIDE HELP → END_COMMUNITY_SAVED
//         └── [1] TRUST DUNHILD → END_HEALER_TRIUMPH / END_OVERWHELMED (weighted)
//
// =========================================================


// ---------------------------------------------------------
// Add the following to the eventRequests array:
// ---------------------------------------------------------

// === ACT 1: THE SICKNESS ===

{
  id: 'CHAIN_TAINTED_GRAIN_START',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'start',
  title: 'Bitter Harvest',
  text: 'Dunhild bursts into the hall, her hands still stained with herb-paste. "My lord, seven farmers collapsed this morning — all of them ate from the new grain shipment that merchant Aldric delivered three days ago. I fear the grain is fouled." She steadies herself against the doorframe. "More will sicken before nightfall if we do nothing."',
  portraitId: 'healer',
  options: [
    {
      text: 'INVESTIGATE THE GRAIN',
      effects: { gold: -5 },
    },
    {
      text: 'QUARANTINE THE SICK',
      effects: { satisfaction: -1, health: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'TAINTED_GRAIN_EXAMINE', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'TAINTED_GRAIN_QUARANTINE', weight: 1 }],
    },
  ],
},


// === ACT 2A: INVESTIGATION PATH ===

{
  id: 'TAINTED_GRAIN_EXAMINE',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Searching the Stores',
  text: 'Osric and two guards tear open every sack in the storehouse. The grain looks ordinary — golden, dry, well-packed. But Osric holds a handful to the lantern light and frowns. "There are dark specks mixed in, my lord. Could be ergot, could be something worse. The merchant Aldric was seen heading toward the eastern road this morning."',
  portraitId: 'guard',
  options: [
    {
      text: 'SEIZE ALL GRAIN',
      effects: { gold: -10 },
    },
    {
      text: 'TRACK THE MERCHANT',
      effects: { gold: -5 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_GRAIN_ANALYZED', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_TRAIL', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_GRAIN_ANALYZED',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Healer\'s Verdict',
  text: 'Dunhild has spent the night grinding samples and testing them on rats. She looks exhausted but certain. "This is no natural blight, my lord. The grain was treated with something — an extract of nightshade and fellwort, mixed to sicken slowly rather than kill outright. Someone wanted your people weak, not dead." She pauses. "The merchant Aldric still lodges at the inn."',
  portraitId: 'healer',
  options: [
    {
      text: 'SUMMON THE MERCHANT',
      effects: {},
    },
    {
      text: 'INVESTIGATE THE SOURCE',
      effects: { gold: -5 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'TAINTED_GRAIN_CONFRONT', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_DEEPER_PROBE', weight: 1 }],
    },
  ],
},

// --- CONFRONT PATH ---

{
  id: 'TAINTED_GRAIN_CONFRONT',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Merchant\'s Defense',
  text: 'Aldric stands before you, pale but composed. "My lord, I swear on my mother\'s grave — I purchased that grain from my usual supplier in Branscir. I\'ve sold to a dozen villages this season without complaint." He wrings his cap in his hands. "If the grain was fouled, it happened before it reached me. I am as much a victim as your farmers."',
  portraitId: 'merchant',
  options: [
    {
      text: 'DEMAND THE TRUTH',
      effects: {},
      authorityCheck: {
        minCommit: 5,
        maxCommit: 25,
        minSuccessChance: 40,
        maxSuccessChance: 85,
        onSuccess: { authority: 2 },
        onFailure: { authority: -1, satisfaction: -1 },
        successFeedbackRequestId: 'TAINTED_GRAIN_AUTH_TRUTH_SUCC',
        failureFeedbackRequestId: 'TAINTED_GRAIN_AUTH_TRUTH_FAIL',
        refundOnSuccessPercent: 70,
        extraLossOnFailure: 2,
      },
    },
    {
      text: 'THROW HIM IN A CELL',
      effects: { satisfaction: 1, authority: -1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_IMPRISONED', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_SUPPLIER_REVEALED',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'A Name Behind the Poison',
  text: 'Aldric\'s composure finally cracks. He pulls a crumpled letter from his coat — a purchase order bearing the seal of Lord Wulfric of Branscir. "He sold me the grain at half price. I thought it was a surplus bargain. I didn\'t know..." His voice trails off. "Wulfric has been buying up grain routes across the eastern marches. If your village starves, his becomes the only supplier for leagues."',
  portraitId: 'merchant',
  options: [
    {
      text: 'CONFRONT LORD WULFRIC',
      effects: {},
      authorityCheck: {
        minCommit: 10,
        maxCommit: 40,
        minSuccessChance: 30,
        maxSuccessChance: 80,
        onSuccess: { authority: 4, gold: 25 },
        onFailure: { authority: -3 },
        successFeedbackRequestId: 'TAINTED_GRAIN_AUTH_WULFRIC_SUCC',
        failureFeedbackRequestId: 'TAINTED_GRAIN_AUTH_WULFRIC_FAIL',
        refundOnSuccessPercent: 50,
        extraLossOnFailure: 5,
      },
    },
    {
      text: 'USE THIS AS LEVERAGE',
      effects: { authority: 2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_SHADOW_DEAL', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_WULFRIC_RETALIATES',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'A Lord\'s Wrath',
  text: 'Feldric enters with grim news. "Lord Wulfric did not take your accusation kindly. His riders have been spotted on the western road — twenty armed men, flying his banner. He means to silence you by force rather than face the shame." He rests his hand on his sword. "We can meet them in the field, or we can bend the knee and hope his anger cools."',
  portraitId: 'military_advisor',
  options: [
    {
      text: 'MEET THEM IN BATTLE',
      effects: {},
    },
    {
      text: 'YIELD AND SURVIVE',
      effects: { authority: -4, satisfaction: -3 },
    },
  ],
  combat: {
    enemyForces: 12,
    prepDelayMinTicks: 2,
    prepDelayMaxTicks: 4,
    onWin: { authority: 5, satisfaction: 3 },
    onLose: { satisfaction: -4, farmers: -6 },
    followUpsOnWin: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'TAINTED_GRAIN_END_MILITARY_VICTORY', weight: 1 }],
      },
    ],
    followUpsOnLose: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'TAINTED_GRAIN_END_BITTER_DEFEAT', weight: 1 }],
      },
    ],
  },
  followUps: [
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_BITTER_DEFEAT', weight: 1 }],
    },
  ],
},

// --- ALDRIC PANICS (auth fail on DEMAND TRUTH) ---

{
  id: 'TAINTED_GRAIN_ALDRIC_PANICS',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Flight in the Night',
  text: 'Your attempt to press Aldric only made him desperate. Osric reports at dawn: "The merchant\'s room is empty, my lord. He slipped out through the stable window before the second watch. His cart tracks lead east toward Branscir." Barnwulf shakes his head. "A guilty man runs. But without him, we have no answers — only sick farmers and spoiled grain."',
  portraitId: 'advisor',
  options: [
    {
      text: 'SEND GUARDS AFTER HIM',
      effects: { gold: -5 },
    },
    {
      text: 'LET HIM RUN',
      effects: { satisfaction: -2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'TAINTED_GRAIN_CHASE', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_UNRESOLVED', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_CHASE',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Caught on the Road',
  text: 'Osric returns after three days with Aldric in tow — bound, bruised, and terrified. "Found him hiding in a root cellar near Durnscir, my lord. He had this on him." Osric holds up a purse heavy with silver coins. "Thirty pieces. Someone paid him well to deliver that grain and disappear." Aldric weeps openly. "I didn\'t know what was in it! They told me it was just surplus!"',
  portraitId: 'guard',
  options: [
    {
      text: 'WHO PAID YOU?',
      effects: { authority: 1 },
    },
    {
      text: 'YOU\'LL PAY FOR THIS',
      effects: { satisfaction: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_ROUGH_JUSTICE', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_ROUGH_JUSTICE', weight: 1 }],
    },
  ],
},

// --- IMPRISONMENT PATH ---

{
  id: 'TAINTED_GRAIN_IMPRISONED',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Prisoner\'s Fate',
  text: 'Aldric sits in the cellar beneath the hall, chained and silent. Edwyn from the council has been stirring the villagers. "The people want blood, my lord. Three more farmers have taken ill. That merchant poisoned our grain and you let him breathe clean air while our children cough." He leans closer. "Hold him. Let Lord Wulfric — his patron — come and see what happens to those who poison our village."',
  portraitId: 'council_member',
  options: [
    {
      text: 'HOLD FIRM',
      effects: { satisfaction: 1 },
    },
    {
      text: 'RELEASE HIM ON CONDITIONS',
      effects: { authority: -1, gold: 10 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'TAINTED_GRAIN_PATRON_ARRIVES', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_PRAGMATIC_RELEASE', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_PATRON_ARRIVES',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Lord of Branscir',
  text: 'A column of horsemen arrives at your gate under Lord Wulfric\'s banner — the silver wolf on black. Wulfric himself rides at the head, armored and cold-eyed. "You hold one of my merchants without right or cause," he declares from the saddle. "Release Aldric and compensate me for the insult, or I will take him back myself." Feldric counts the riders. "Fifteen men-at-arms, my lord. Trained. He came ready for a fight."',
  portraitId: 'noble',
  options: [
    {
      text: 'DEFY LORD WULFRIC',
      effects: {},
    },
    {
      text: 'NEGOTIATE TERMS',
      effects: {},
      authorityCheck: {
        minCommit: 8,
        maxCommit: 35,
        minSuccessChance: 35,
        maxSuccessChance: 80,
        onSuccess: { authority: 3, satisfaction: 2 },
        onFailure: { authority: -3, satisfaction: -2, gold: -15 },
        successFeedbackRequestId: 'TAINTED_GRAIN_AUTH_NEGOTIATE_SUCC',
        failureFeedbackRequestId: 'TAINTED_GRAIN_AUTH_NEGOTIATE_FAIL',
        refundOnSuccessPercent: 60,
        extraLossOnFailure: 3,
      },
    },
  ],
  combat: {
    enemyForces: 15,
    prepDelayMinTicks: 0,
    prepDelayMaxTicks: 0,
    onWin: { authority: 5, satisfaction: 4, gold: 20 },
    onLose: { satisfaction: -5, farmers: -8, gold: -20 },
    followUpsOnWin: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'TAINTED_GRAIN_END_DEFIANT_VICTORY', weight: 1 }],
      },
    ],
    followUpsOnLose: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'TAINTED_GRAIN_END_SIEGE_LOST', weight: 1 }],
      },
    ],
  },
},

// --- DEEPER INVESTIGATION PATH (via mage advisor) ---

{
  id: 'TAINTED_GRAIN_DEEPER_PROBE',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Traces in the Grain',
  text: 'Markweard runs his fingers over the tainted grain, muttering incantations. His eyes widen. "This is no simple poison, my lord. The nightshade was prepared using an alchemical process — distilled, concentrated, then bound to the grain with a fixative that only an apothecary or trained alchemist could produce." He brushes the dust from his robes. "Someone with resources and knowledge planned this. I can trace the alchemical signature if you give me time and coin."',
  portraitId: 'mage_advisor',
  options: [
    {
      text: 'FOLLOW THE ARCANE TRAIL',
      effects: { gold: -15 },
    },
    {
      text: 'FOCUS ON HEALING INSTEAD',
      effects: { health: 2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'TAINTED_GRAIN_CONSPIRACY', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_HEALER_FOCUS', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_CONSPIRACY',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Wolf\'s Design',
  text: 'Markweard lays his findings before you: a map of grain routes, purchase records traced through three intermediaries, and the alchemical formula matched to a known apothecary in Branscir. "It all leads to Lord Wulfric," he says quietly. "He\'s been poisoning grain shipments to independent settlements along the eastern trade road. Those who sicken buy from him at triple the price. Those who die — their land falls vacant." He rolls up the parchment. "You have proof. The question is what you do with it."',
  portraitId: 'mage_advisor',
  options: [
    {
      text: 'EXPOSE HIM PUBLICLY',
      effects: { authority: 3, satisfaction: 2 },
    },
    {
      text: 'KEEP IT — AND USE IT',
      effects: { authority: 2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_PUBLIC_TRIUMPH', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_BLACKMAIL', weight: 1 }],
    },
  ],
},


// === ACT 2A-TRACK: TRACKING PATH ===

{
  id: 'TAINTED_GRAIN_TRAIL',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Eastern Road',
  text: 'Osric returns from scouting with mud on his boots and worry in his eyes. "The merchant\'s cart tracks are fresh, my lord — heading straight east toward Branscir. But he\'s not alone. A second set of hoofprints joined him half a league out. Someone was waiting for him." He draws a rough map in the dirt. "There\'s a crossroads camp two days east. If we move fast, we can catch him before he reaches Branscir\'s walls."',
  portraitId: 'scout',
  options: [
    {
      text: 'RIDE AFTER HIM',
      effects: { gold: -5 },
    },
    {
      text: 'UNDERSTOOD',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'TAINTED_GRAIN_MERCHANT_CAMP', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'TAINTED_GRAIN_MERCHANT_CAMP', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_MERCHANT_CAMP',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Crossroads Camp',
  text: 'Your scouts have found Aldric\'s camp near the crossroads — a fire burning low, his cart half-loaded. But Osric signals caution: "He\'s not alone, my lord. A rider in a dark cloak arrived an hour ago. They\'re talking by the fire. I couldn\'t hear the words, but the stranger handed him a purse." He looks to you. "We can take them by surprise, or we can watch and learn who this stranger is."',
  portraitId: 'scout',
  options: [
    {
      text: 'AMBUSH THEM',
      effects: {},
    },
    {
      text: 'OBSERVE QUIETLY',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'TAINTED_GRAIN_AMBUSH_RESULT', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'TAINTED_GRAIN_OBSERVE', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_AMBUSH_RESULT',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Caught by Firelight',
  text: 'Your guards burst from the treeline. The cloaked stranger bolts into the darkness on horseback, but Aldric is seized before he can reach his cart. He falls to his knees, blubbering. "Please — I\'ll tell you everything! Lord Wulfric paid me to deliver the grain. He said it would just make people tired, that nobody would be harmed!" The silver from the purse spills across the muddy ground. "I swear, I didn\'t know it was poison!"',
  portraitId: 'guard',
  options: [
    {
      text: 'YOU\'LL ANSWER FOR THIS',
      effects: { authority: 1 },
    },
    {
      text: 'TELL ME ABOUT WULFRIC',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_AMBUSH_JUDGMENT', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_AMBUSH_JUDGMENT', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_OBSERVE',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Patience Rewarded',
  text: 'You wait in the cold darkness. Osric\'s sharp ears catch fragments of conversation carried on the wind. The cloaked stranger\'s voice is clear: "Wulfric says the southern villages will fold within the month. Once they\'re dependent on his grain, he\'ll double the price." Aldric protests weakly, but the stranger cuts him off: "You were paid. Do your part." Before dawn, the stranger rides north. Osric turns to you. "That was no common agent. That cloak bore the Branscir wolf."',
  portraitId: 'scout',
  options: [
    {
      text: 'FOLLOW THE AGENT',
      effects: { gold: -5 },
    },
    {
      text: 'WE HAVE ENOUGH',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'TAINTED_GRAIN_PATRON_MEETING', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_PATRON_MEETING', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_PATRON_MEETING',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Spider\'s Web',
  text: 'Barnwulf reviews Osric\'s report with a grave expression. "Lord Wulfric of Branscir is poisoning grain routes to create a monopoly. We have witnesses, we have Aldric\'s testimony, and we have the agent\'s words overheard by your own scout." He taps the table. "You could ride to Branscir and confront Wulfric directly — bold, but dangerous. Or you could send this evidence to the Graf of Durnscir and let the law handle a lord who poisons his neighbors."',
  portraitId: 'advisor',
  options: [
    {
      text: 'RIDE TO BRANSCIR',
      effects: { authority: 2 },
    },
    {
      text: 'SEND THE EVIDENCE',
      effects: { gold: -5 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 5,
      delayMaxTicks: 7,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_DIPLOMATIC_VICTORY', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 5,
      delayMaxTicks: 7,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_STRATEGIC_ADVANTAGE', weight: 1 }],
    },
  ],
},


// === ACT 2B: QUARANTINE PATH ===

{
  id: 'TAINTED_GRAIN_QUARANTINE',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Sick Ward',
  text: 'Barnwulf has cleared the grain hall and turned it into a makeshift ward. Twelve farmers lie on straw pallets, pale and groaning. Dunhild moves between them with poultices and broth, but her face tells you everything. "I can slow the sickness, my lord, but I cannot cure what I don\'t understand. If we lock down tight, fewer will fall ill — but the people will fear us as much as the plague. A gentler hand might keep their spirits, but more may sicken."',
  portraitId: 'advisor',
  options: [
    {
      text: 'STRICT LOCKDOWN',
      effects: { satisfaction: -2, health: 1 },
    },
    {
      text: 'GENTLE CARE',
      effects: { gold: -5, satisfaction: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_LOCKDOWN', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_GENTLE', weight: 1 }],
    },
  ],
},

// --- STRICT LOCKDOWN SUB-PATH ---

{
  id: 'TAINTED_GRAIN_LOCKDOWN',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Behind Closed Doors',
  text: 'The village is eerily quiet. Guards stand at every lane, turning people back to their homes. No market. No gatherings. Children press their faces to shuttered windows. Dunhild reports from the ward: "The lockdown is working — no new cases in two days. But the sick are not improving. I need something I don\'t have." She hesitates. "There\'s a remedy I\'ve read about, but the ingredients are rare."',
  portraitId: 'healer',
  options: [
    {
      text: 'WHAT DO YOU NEED?',
      effects: {},
    },
    {
      text: 'DO YOUR BEST',
      effects: { health: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_MERCHANT_RETURNS', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_MERCHANT_RETURNS', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_MERCHANT_RETURNS',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'An Unexpected Visitor',
  text: 'The guards bring word that a merchant has arrived at the gate — Aldric, the very man who sold you the grain. He carries a leather satchel and wears a penitent expression. "My lord, I heard about the sickness. I did not know the grain was tainted — I swear it on all I hold dear. But I have brought something that may help: a tincture from an apothecary in Branscir, prepared for exactly this kind of poisoning." He holds out a dark glass bottle. "No charge. My conscience demands it."',
  portraitId: 'merchant',
  options: [
    {
      text: 'ACCEPT THE REMEDY',
      effects: { gold: -10 },
    },
    {
      text: 'SEIZE HIM',
      effects: { satisfaction: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [
        { requestId: 'TAINTED_GRAIN_END_GRATEFUL_RECOVERY', weight: 3 },
        { requestId: 'TAINTED_GRAIN_END_TRAGIC_BETRAYAL', weight: 1 },
      ],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_QUARANTINE_JUSTICE', weight: 1 }],
    },
  ],
},

// --- GENTLE CARE SUB-PATH ---

{
  id: 'TAINTED_GRAIN_GENTLE',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Holding Together',
  text: 'Your gentle approach keeps spirits high. Neighbors bring food to the sick. Children sing songs outside the ward. But Dunhild looks increasingly strained. "The kindness helps their hearts, my lord, but not their bodies. Three more fell ill this morning — whatever was in that grain, it spreads through shared stores. I\'m running low on herbs, and the worst cases are getting worse."',
  portraitId: 'healer',
  options: [
    {
      text: 'WE\'LL MANAGE',
      effects: { satisfaction: 1 },
    },
    {
      text: 'WHAT DO YOU NEED?',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_CRISIS_DEEPENS', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_CRISIS_DEEPENS', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_CRISIS_DEEPENS',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Breaking Point',
  text: 'Hild — the farmer\'s wife who was among the first to sicken — dies at dawn. Her husband carries her body through the village in silence. Nobody speaks, but you can feel the fear like a living thing. Dunhild finds you in the hall. "I can save the rest, my lord. I believe I can. But I need time and I need your trust." Barnwulf interjects: "There is a traveling healer camped near Thrammere. He could be here in two days — but his services won\'t come cheap."',
  portraitId: 'farmer',
  options: [
    {
      text: 'SEND FOR THE HEALER',
      effects: { gold: -15 },
    },
    {
      text: 'TRUST DUNHILD',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_COMMUNITY_SAVED', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [
        { requestId: 'TAINTED_GRAIN_END_HEALER_TRIUMPH', weight: 2 },
        { requestId: 'TAINTED_GRAIN_END_OVERWHELMED', weight: 1 },
      ],
    },
  ],
},


// === ACT 3: ENDINGS ===

// --- Investigation → Confront → Auth Success → Confront Wulfric → Auth Success ---
{
  id: 'TAINTED_GRAIN_END_NOBLE_JUSTICE',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'Justice Served',
  text: 'Lord Wulfric bows before the weight of your evidence and authority. His grain monopoly is broken, his reputation shattered. The Graf of Durnscir strips him of his eastern trade rights and awards them to your village as compensation. Aldric, freed and shaken, pledges to deliver clean grain at a fair price for a year. Dunhild reports the last of the sick have recovered. The village breathes again — and your name is spoken with new respect across the marches.',
  portraitId: 'noble',
  options: [
    {
      text: 'JUSTICE IS SERVED',
      effects: { gold: 30, authority: 5, satisfaction: 3, health: 2 },
    },
    {
      text: 'LET THIS BE A WARNING',
      effects: { gold: 20, authority: 7, satisfaction: 2, health: 2 },
    },
  ],
},

// --- Investigation → Confront → Auth Success → Confront Wulfric → Auth Fail → Combat Win ---
{
  id: 'TAINTED_GRAIN_END_MILITARY_VICTORY',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'The Wolf Brought Low',
  text: 'Wulfric\'s men break against your defenders like a wave against stone. The lord of Branscir is dragged from his horse, his silver wolf banner trampled in the mud. "You dare," he snarls, but there is fear in his eyes now. Feldric plants your banner over the field. "His force is scattered, my lord. Word of this will spread." The grain routes are yours. The poisoner has been answered in a language all lords understand.',
  portraitId: 'military_advisor',
  options: [
    {
      text: 'VICTORY!',
      effects: { gold: 25, authority: 4, satisfaction: 3 },
    },
    {
      text: 'TEND THE WOUNDED',
      effects: { gold: 15, health: 3, satisfaction: 2 },
    },
  ],
},

// --- Investigation → Confront → Auth Success → Confront Wulfric → Auth Fail → Combat Loss / Yield ---
{
  id: 'TAINTED_GRAIN_END_BITTER_DEFEAT',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'A Bitter Reckoning',
  text: 'Wulfric\'s forces overwhelm your defenses. The village smolders, and your people look at you with hollow eyes. Wulfric rides through your gate as if he owns it — and for now, perhaps he does. "You should have kept your mouth shut," he says, tossing a purse of silver at your feet. "Compensation. For the grain." He rides away laughing, leaving you to count the cost of a truth that brought only ruin.',
  portraitId: 'noble',
  options: [
    {
      text: 'REBUILD',
      effects: { gold: -15, satisfaction: -3, health: -2, authority: -3 },
    },
    {
      text: 'REMEMBER THIS',
      effects: { gold: -10, satisfaction: -4, authority: -2, fireRisk: 2 },
    },
  ],
},

// --- Investigation → Confront → Auth Success → Leverage ---
{
  id: 'TAINTED_GRAIN_END_SHADOW_DEAL',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'A Quiet Arrangement',
  text: 'You send Aldric\'s letter and Dunhild\'s findings to Lord Wulfric — not as an accusation, but as an invitation to negotiate. A week later, a cart arrives bearing fine grain, salted meat, and a sealed pouch of gold. No letter accompanies it. None is needed. Barnwulf raises an eyebrow as you count the coins. "A lord\'s silence is expensive, my lord. Let us hope his gratitude outlasts his memory." The sick recover. The village prospers. And somewhere in Branscir, a wolf remembers your name.',
  portraitId: 'advisor',
  options: [
    {
      text: 'POWER HAS ITS PRICE',
      effects: { gold: 25, authority: 3, health: 2 },
    },
    {
      text: 'DISTRIBUTE THE GOODS',
      effects: { gold: 15, satisfaction: 3, health: 3, authority: 1 },
    },
  ],
},

// --- Investigation → Confront → Auth Fail → Chase ---
{
  id: 'TAINTED_GRAIN_END_ROUGH_JUSTICE',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'Rough Justice',
  text: 'Aldric confesses everything — Lord Wulfric\'s scheme, the payments, the poisoned grain. You strip him of his goods and send word to every village along the eastern road. Wulfric denies it all, of course, but the damage to his reputation is done. Aldric is put to work in your fields as penance. Dunhild uses the confiscated silver to buy proper medicines. The sick recover slowly, and the village learns to check its grain more carefully.',
  portraitId: 'guard',
  options: [
    {
      text: 'JUSTICE IS DONE',
      effects: { gold: 15, authority: 2, satisfaction: 2, health: 2 },
    },
    {
      text: 'WARN THE OTHER VILLAGES',
      effects: { gold: 10, authority: 3, satisfaction: 1, health: 2 },
    },
  ],
},

// --- Investigation → Confront → Auth Fail → Let Go ---
{
  id: 'TAINTED_GRAIN_END_UNRESOLVED',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'The One That Got Away',
  text: 'Aldric vanishes into the east, and with him goes your best chance at the truth. The sick recover in time — Dunhild\'s herbs do their work, slowly — but the village is changed. People test their bread before eating it. Mothers sniff the flour. Trust, once broken, mends poorly. Barnwulf sighs over his evening ale. "We know someone poisoned our grain, my lord. We just don\'t know who or why. That uncertainty will cost us more than the sickness ever did."',
  portraitId: 'advisor',
  options: [
    {
      text: 'WE\'LL BE MORE CAREFUL',
      effects: { satisfaction: -2, health: 1, authority: -1 },
    },
    {
      text: 'DOUBLE THE WATCH',
      effects: { gold: -10, satisfaction: -1, health: 1 },
    },
  ],
},

// --- Investigation → Imprison → Defy → Combat Win ---
{
  id: 'TAINTED_GRAIN_END_DEFIANT_VICTORY',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'The Village Stands',
  text: 'Wulfric\'s men flee the field, their lord\'s arrogance shattered against your walls. Aldric, still in chains, watches from the cellar window as his patron\'s banner burns. "I should have told you everything from the start," he whispers. The village celebrates — a hard victory, won with blood and stubbornness. Feldric claps you on the shoulder. "No lord will trifle with us lightly after this." The grain crisis is forgotten in the glow of triumph.',
  portraitId: 'military_advisor',
  options: [
    {
      text: 'WE STOOD FIRM',
      effects: { gold: 20, authority: 5, satisfaction: 4, health: 1 },
    },
    {
      text: 'HONOR THE FALLEN',
      effects: { gold: 10, authority: 3, satisfaction: 3, health: 2 },
    },
  ],
},

// --- Investigation → Imprison → Defy → Combat Loss ---
{
  id: 'TAINTED_GRAIN_END_SIEGE_LOST',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'The Price of Defiance',
  text: 'Wulfric\'s men-at-arms overwhelm your defenders. The lord of Branscir rides through your broken gate and takes Aldric from the cellar himself. "This merchant is under my protection," he announces for all to hear. "And your village will pay for the insult of holding him." He extracts a humiliating toll and rides away with Aldric in tow. Feldric tends to his wounds in silence. The sick are still sick. The village is poorer. But you learned something about Lord Wulfric that he may come to regret.',
  portraitId: 'noble',
  options: [
    {
      text: 'WE WILL RECOVER',
      effects: { gold: -20, satisfaction: -3, authority: -4, health: -1 },
    },
    {
      text: 'REMEMBER HIS FACE',
      effects: { gold: -15, satisfaction: -4, authority: -2, health: -1 },
    },
  ],
},

// --- Investigation → Imprison → Negotiate → Auth Success ---
{
  id: 'TAINTED_GRAIN_END_FAIR_TRIAL',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'A Fair Accord',
  text: 'Your words find their mark. Lord Wulfric, faced with your resolve and the evidence of Aldric\'s poisoned cargo, agrees to a fair trial before the Graf of Durnscir. Aldric confesses his role and is sentenced to five years of labor. Wulfric pays compensation — not as much as you deserve, but enough. Barnwulf nods approvingly. "You held a lord accountable without spilling a drop of blood, my lord. That takes more courage than swinging a sword."',
  portraitId: 'advisor',
  options: [
    {
      text: 'JUSTICE PREVAILS',
      effects: { gold: 20, authority: 4, satisfaction: 3, health: 2 },
    },
    {
      text: 'INVEST IN DEFENSES',
      effects: { gold: 10, authority: 3, satisfaction: 2, health: 2, fireRisk: -1 },
    },
  ],
},

// --- Investigation → Imprison → Negotiate → Auth Fail ---
{
  id: 'TAINTED_GRAIN_END_HUMILIATION',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'A Lord\'s Contempt',
  text: 'Wulfric sees through your bluster and calls it for what it is — weakness dressed as diplomacy. He takes Aldric, demands gold for the "wrongful imprisonment," and rides away without a backward glance. Edwyn spits in the dirt. "We held the poisoner and let him walk. The village will remember this." The sick recover, eventually. But the taste of humiliation lingers longer than any poison.',
  portraitId: 'council_member',
  options: [
    {
      text: 'SWALLOW THE SHAME',
      effects: { gold: -15, satisfaction: -3, authority: -4, health: 1 },
    },
    {
      text: 'LEARN FROM THIS',
      effects: { gold: -10, satisfaction: -2, authority: -3, health: 1 },
    },
  ],
},

// --- Investigation → Imprison → Release ---
{
  id: 'TAINTED_GRAIN_END_PRAGMATIC_RELEASE',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'A Calculated Mercy',
  text: 'You release Aldric with conditions: he reveals his supplier, pays for the ruined grain, and never sets foot in your village again. He agrees to everything with pathetic gratitude. The silver he pays buys medicine for the sick. His whispered name — Lord Wulfric — gives you a new enemy to watch. Barnwulf approves, quietly. "Not the most satisfying justice, my lord. But the most practical. The village is whole, the coffers are replenished, and you made no enemy you cannot handle."',
  portraitId: 'advisor',
  options: [
    {
      text: 'PRAGMATISM WINS',
      effects: { gold: 10, satisfaction: 1, health: 2, authority: 1 },
    },
    {
      text: 'HEAL THE VILLAGE',
      effects: { gold: 5, satisfaction: 2, health: 3 },
    },
  ],
},

// --- Investigation → Deeper Probe → Expose ---
{
  id: 'TAINTED_GRAIN_END_PUBLIC_TRIUMPH',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'The Truth Laid Bare',
  text: 'You send Markweard\'s findings to every settlement along the eastern trade road and to the Graf of Durnscir himself. The evidence is irrefutable. Within a fortnight, Lord Wulfric is summoned before the council at Eirleah. His grain monopoly is dismantled, his lands fined, and his name becomes a byword for treachery. Traders who once feared his influence now flock to your village as a safe haven. Markweard permits himself a rare smile. "The truth is the most powerful weapon, my lord. It cost you only patience."',
  portraitId: 'mage_advisor',
  options: [
    {
      text: 'THE TRUTH ALWAYS WINS',
      effects: { gold: 25, authority: 5, satisfaction: 4, health: 3 },
    },
    {
      text: 'REWARD MARKWEARD',
      effects: { gold: 15, authority: 4, satisfaction: 3, health: 3 },
    },
  ],
},

// --- Investigation → Deeper Probe → Blackmail ---
{
  id: 'TAINTED_GRAIN_END_BLACKMAIL',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'The Secret Ledger',
  text: 'You keep Markweard\'s evidence locked in your personal chest and send a single, carefully worded letter to Lord Wulfric. The response comes within days: a wagonload of provisions, a year of free grain, and a promise that your village will never appear on his list again. Markweard watches the wagons arrive with an uneasy expression. "You\'ve made a wolf into a debtor, my lord. He\'ll pay — for now. But wolves remember who holds their leash." The village thrives on Wulfric\'s guilty conscience. How long that lasts is another question.',
  portraitId: 'mage_advisor',
  options: [
    {
      text: 'KNOWLEDGE IS POWER',
      effects: { gold: 20, authority: 3, satisfaction: 2, health: 2 },
    },
    {
      text: 'SHARE WITH THE VILLAGE',
      effects: { gold: 10, satisfaction: 4, health: 3, authority: 1 },
    },
  ],
},

// --- Investigation → Deeper Probe → Focus on Healing ---
{
  id: 'TAINTED_GRAIN_END_HEALER_FOCUS',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'The Healer\'s Choice',
  text: 'You abandon the investigation and pour every resource into Dunhild\'s hands. She works through the night for a week, brewing antidotes, changing poultices, whispering encouragement to the dying. When the last fever breaks, the village gathers around her in silent gratitude. The poisoner remains unknown, the conspiracy undiscovered — but your people are alive. Dunhild wipes her hands and looks at you with tired, proud eyes. "You chose your people over your pride, my lord. That is what a true leader does."',
  portraitId: 'healer',
  options: [
    {
      text: 'OUR PEOPLE COME FIRST',
      effects: { health: 4, satisfaction: 3, authority: 1 },
    },
    {
      text: 'REST NOW, DUNHILD',
      effects: { health: 5, satisfaction: 2 },
    },
  ],
},

// --- Track → Ambush → Judgment ---
{
  id: 'TAINTED_GRAIN_END_AMBUSH_JUDGMENT',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'The Merchant\'s Fate',
  text: 'Aldric kneels before you in the village square, his confession echoing off the stone walls. The village watches. Edwyn demands the harshest punishment. Dunhild quietly notes that Aldric was a pawn, not a mastermind. The silver he carried buys medicine for the sick. What remains is the question of his fate — mercy or severity, compassion or example.',
  portraitId: 'council_member',
  options: [
    {
      text: 'SHOW MERCY',
      effects: { gold: 10, satisfaction: 2, health: 2, authority: 1 },
    },
    {
      text: 'MAKE AN EXAMPLE',
      effects: { gold: 15, authority: 4, satisfaction: -1, health: 2 },
    },
  ],
},

// --- Track → Observe → Ride to Branscir ---
{
  id: 'TAINTED_GRAIN_END_DIPLOMATIC_VICTORY',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'A Lord Confronted',
  text: 'You ride to Branscir with your evidence and your guards. Lord Wulfric receives you in his cold stone hall, surrounded by his own men. But when you lay out Aldric\'s testimony, Osric\'s report, and the overheard conversation, the color drains from his face. His own advisors exchange uneasy glances. Wulfric has no choice but to negotiate — publicly, before witnesses. He pays compensation, dismantles his grain scheme, and watches you ride home with the grudging respect of a predator recognizing another.',
  portraitId: 'noble',
  options: [
    {
      text: 'WELL WORTH THE RIDE',
      effects: { gold: 30, authority: 5, satisfaction: 3, health: 2 },
    },
    {
      text: 'HE WON\'T FORGET THIS',
      effects: { gold: 25, authority: 6, satisfaction: 2, health: 2 },
    },
  ],
},

// --- Track → Observe → Send Evidence ---
{
  id: 'TAINTED_GRAIN_END_STRATEGIC_ADVANTAGE',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'The Long Game',
  text: 'The Graf of Durnscir receives your evidence with keen interest. An investigation is launched. Wulfric\'s grain scheme unravels over the following weeks, quietly, methodically. No dramatic confrontation, no battle — just the slow grinding of justice. Compensation arrives by wagon. Trade routes are redistributed. Barnwulf reviews the accounts with satisfaction. "You played the patient game, my lord. Wulfric is diminished, and you never had to risk a single life. The sick will recover. The village will prosper. And your name is whispered in the right ears."',
  portraitId: 'advisor',
  options: [
    {
      text: 'PATIENCE PAYS',
      effects: { gold: 20, authority: 4, satisfaction: 2, health: 2 },
    },
    {
      text: 'INVEST THE COMPENSATION',
      effects: { gold: 10, authority: 3, satisfaction: 3, health: 3, fireRisk: -1 },
    },
  ],
},

// --- Quarantine → Strict → Accept Remedy (success) ---
{
  id: 'TAINTED_GRAIN_END_GRATEFUL_RECOVERY',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'The Remedy Works',
  text: 'Dunhild administers Aldric\'s tincture with cautious hope. Within hours, the color returns to the farmers\' faces. By morning, the worst cases are sitting up, asking for food. Aldric watches from the doorway, tears on his cheeks. "I didn\'t know," he keeps saying. "I didn\'t know." Whether you believe him or not, the remedy was real. Dunhild clasps your hand. "You trusted a stranger when your people needed it most, my lord. That takes a different kind of courage."',
  portraitId: 'healer',
  options: [
    {
      text: 'THANK ALDRIC',
      effects: { health: 4, satisfaction: 3, gold: 5 },
    },
    {
      text: 'THE VILLAGE HEALS',
      effects: { health: 5, satisfaction: 2, authority: 1 },
    },
  ],
},

// --- Quarantine → Strict → Accept Remedy (failure — weighted 1/4 chance) ---
{
  id: 'TAINTED_GRAIN_END_TRAGIC_BETRAYAL',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'The Second Poison',
  text: 'The tincture makes everything worse. Within hours, three farmers who were recovering begin to convulse. Dunhild works frantically to purge the substance, but old Hild dies before sunrise. Aldric is gone by the time Osric reaches the inn — vanished into the night, his penitence as false as his remedy. Dunhild does not sleep for three days. She saves the rest, barely. The village mourns, and you carry the weight of a trust misplaced.',
  portraitId: 'healer',
  options: [
    {
      text: 'WE WERE FOOLED',
      effects: { health: -4, satisfaction: -3, farmers: -3, authority: -2 },
    },
    {
      text: 'NEVER AGAIN',
      effects: { health: -3, satisfaction: -4, farmers: -2, authority: -1 },
    },
  ],
},

// --- Quarantine → Strict → Arrest Returning Merchant ---
{
  id: 'TAINTED_GRAIN_END_QUARANTINE_JUSTICE',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'The Poisoner Seized',
  text: 'Aldric is thrown into the cellar before he can protest. The "remedy" he brought is tested on a rat — it dies within the hour. Dunhild\'s face goes white. "He came to finish what he started." Under questioning, Aldric breaks quickly. He was sent by Lord Wulfric to ensure the sickness remained — and deepened. Edwyn demands execution. Barnwulf counsels restraint. Either way, you have your poisoner, your proof, and your people are safe because you trusted no one.',
  portraitId: 'council_member',
  options: [
    {
      text: 'LOCK HIM AWAY',
      effects: { gold: 10, authority: 3, satisfaction: 2, health: 2 },
    },
    {
      text: 'BANISH HIM',
      effects: { gold: 5, authority: 2, satisfaction: 3, health: 2 },
    },
  ],
},

// --- Quarantine → Gentle → Outside Help ---
{
  id: 'TAINTED_GRAIN_END_COMMUNITY_SAVED',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'Salvation from Beyond',
  text: 'The traveling healer arrives — a weathered man named Aldhelm with a satchel full of strange herbs. He takes one look at the sick and nods. "Fellwort poisoning. I\'ve seen it in three villages along the eastern road." He works alongside Dunhild for two days, teaching her remedies she\'d never learned. Every patient recovers. When Aldhelm leaves, he clasps your hand. "Someone is poisoning the grain routes, my lord. You\'re not the first and you won\'t be the last. Watch the merchants from Branscir." The village is saved, and you have a new enemy to name.',
  portraitId: 'traveler',
  options: [
    {
      text: 'WE OWE HIM MUCH',
      effects: { health: 4, satisfaction: 3, gold: -5 },
    },
    {
      text: 'REMEMBER BRANSCIR',
      effects: { health: 3, satisfaction: 2, authority: 2 },
    },
  ],
},

// --- Quarantine → Gentle → Trust Dunhild (success — weighted 2/3) ---
{
  id: 'TAINTED_GRAIN_END_HEALER_TRIUMPH',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'Dunhild\'s Miracle',
  text: 'Dunhild discovers the antidote through sheer determination — boiling willow bark with goldenseal root in a mixture she invents through trial and desperate prayer. One by one, the sick rise from their pallets. The village gathers at the ward to watch the last fever break. Dunhild stands in the doorway, swaying with exhaustion, and the crowd parts for her like she is something holy. "Your healer saved your village, my lord," Barnwulf says quietly. "And you gave her the trust to do it."',
  portraitId: 'healer',
  options: [
    {
      text: 'HONOR DUNHILD',
      effects: { health: 5, satisfaction: 4, authority: 2 },
    },
    {
      text: 'CELEBRATE THE RECOVERY',
      effects: { health: 4, satisfaction: 5, gold: -5 },
    },
  ],
},

// --- Quarantine → Gentle → Trust Dunhild (failure — weighted 1/3) ---
{
  id: 'TAINTED_GRAIN_END_OVERWHELMED',
  chainId: 'TAINTED_GRAIN',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 90,
  title: 'Beyond Her Skill',
  text: 'Dunhild does everything she can, but the poison is beyond her knowledge. Four farmers die before the sickness finally burns itself out. Dunhild sits in the empty ward, staring at her hands. "I failed them, my lord." You tell her she didn\'t, but the words ring hollow. The village mourns its dead and carries on, as villages do. Barnwulf finds you that evening. "Some wounds teach us. The next time poison comes to our door, we\'ll be ready." It is thin comfort, but it is all you have.',
  portraitId: 'healer',
  options: [
    {
      text: 'WE ENDURE',
      effects: { health: -3, satisfaction: -3, farmers: -4, authority: -1 },
    },
    {
      text: 'PREPARE FOR NEXT TIME',
      effects: { health: -2, satisfaction: -4, farmers: -3, gold: -5 },
    },
  ],
},


// ---------------------------------------------------------
// Add the following to the authorityInfoRequests array:
// ---------------------------------------------------------

// Authority feedback for DEMAND TRUTH (at CONFRONT)
{
  id: 'TAINTED_GRAIN_AUTH_TRUTH_SUCC',
  title: 'The Merchant Breaks',
  text: 'Your authority presses down on Aldric like a physical weight. He crumbles, pulling a crumpled letter from his coat with shaking hands. "I\'ll tell you everything — just don\'t destroy me."',
  portraitId: 'merchant',
  advancesTick: false,
  options: [
    { text: 'CONTINUE', effects: {} },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'TAINTED_GRAIN_SUPPLIER_REVEALED', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_AUTH_TRUTH_FAIL',
  title: 'The Merchant Panics',
  text: 'Your pressure backfires. Aldric\'s eyes dart to the door, his composure cracking — not into honesty, but into fear. He sees not justice in your face but a threat to his life. Before your guards can react, he bolts.',
  portraitId: 'merchant',
  advancesTick: false,
  options: [
    { text: 'CONTINUE', effects: {} },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'TAINTED_GRAIN_ALDRIC_PANICS', weight: 1 }],
    },
  ],
},

// Authority feedback for CONFRONT WULFRIC (at SUPPLIER_REVEALED)
{
  id: 'TAINTED_GRAIN_AUTH_WULFRIC_SUCC',
  title: 'A Lord Brought to Heel',
  text: 'Your evidence and your resolve are undeniable. Lord Wulfric, confronted with proof of his poisoning scheme and the weight of your political will, has no choice but to answer for his crimes. Word reaches you that the Graf of Durnscir has agreed to hear the case.',
  portraitId: 'noble',
  advancesTick: false,
  options: [
    { text: 'CONTINUE', effects: {} },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_NOBLE_JUSTICE', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_AUTH_WULFRIC_FAIL',
  title: 'A Lord\'s Fury',
  text: 'Wulfric does not take kindly to your accusations. Without sufficient political weight behind your words, he treats them as an insult — one that demands an answer by force. His riders are already on the road.',
  portraitId: 'noble',
  advancesTick: false,
  options: [
    { text: 'CONTINUE', effects: {} },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'TAINTED_GRAIN_WULFRIC_RETALIATES', weight: 1 }],
    },
  ],
},

// Authority feedback for NEGOTIATE (at PATRON_ARRIVES)
{
  id: 'TAINTED_GRAIN_AUTH_NEGOTIATE_SUCC',
  title: 'Terms Accepted',
  text: 'Your words carry the weight of a ruler who will not be bullied. Lord Wulfric studies you for a long moment, then dismounts. "Very well. Let us talk — as equals." His men stand down. A trial will be held.',
  portraitId: 'noble',
  advancesTick: false,
  options: [
    { text: 'CONTINUE', effects: {} },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_FAIR_TRIAL', weight: 1 }],
    },
  ],
},

{
  id: 'TAINTED_GRAIN_AUTH_NEGOTIATE_FAIL',
  title: 'Terms Rejected',
  text: 'Wulfric laughs — a cold, dismissive sound. "You hold my merchant and offer me words? I came with steel, not patience." He turns his horse and barks an order. His men surge forward. There is nothing left to negotiate.',
  portraitId: 'noble',
  advancesTick: false,
  options: [
    { text: 'CONTINUE', effects: {} },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'TAINTED_GRAIN_END_HUMILIATION', weight: 1 }],
    },
  ],
},
  canTriggerRandomly: false,
  canTriggerRandomly: false,
  canTriggerRandomly: false,
  canTriggerRandomly: false,
  canTriggerRandomly: false,
  canTriggerRandomly: false,
