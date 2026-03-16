// =========================================================
// CHAIN: PRODIGAL_SON – The Prodigal Son
// Size: M (20 requests: 1 start + 7 members + 10 ends + 2 authority info)
//
// Theme: A farmer's son returns to the village after years of absence,
// wearing fine clothes and carrying gold. His father died while he was
// gone, and neighbors who worked the family land now claim rights to it.
// The player must adjudicate the land dispute, manage village jealousy,
// and potentially uncover the dark origin of the son's wealth — he has
// been fencing stolen goods for river pirates.
//
// Narrative Promise: "Who is this man really, and what did he bring
// back with him?"
//
// Core Resources: Gold, Satisfaction, Authority, Farmers
// Secondary: Health (minor)
//
// Characters:
//   Wulfstan (traveler)         – the returning son
//   Eadric (elder)              – the neighbor who worked the land
//   Barnwulf (advisor)          – counsels the player
//   Osric (guard)               – investigates Wulfstan's past
//   Leofwyn (farmer)            – Wulfstan's sister, who stayed
//
// Branch Map:
//
// START (traveler, Wulfstan)
// ├── [0] WELCOME → HOMECOMING (elder, Eadric)
// │   ├── [0] HELP RECLAIM LAND → LAND_DISPUTE (farmer, Leofwyn)
// │   │   ├── [0] RULE FOR WULFSTAN → END_LAND_RESTORED (two options)
// │   │   └── [1] DIVIDE THE LAND → END_UNEASY_PEACE
// │   └── [1] INVESTIGATE → INVESTIGATION (guard, Osric)
// │       ├── [0] CONFRONT (auth) →
// │       │   success → CONFESSION (traveler, Wulfstan)
// │       │   │   ├── [0] ARREST → END_PIRATE_FENCE_CAUGHT
// │       │   │   └── [1] BANISH → END_EXILE
// │       │   fail → END_VANISHED
// │       └── [1] SEARCH HIS ROOM → DISCOVERY (guard, Osric)
// │           ├── [0] EXPOSE → END_PUBLIC_SHAME
// │           └── [1] TAKE A CUT → END_COMPLICIT
// │
// └── [1] QUESTION HIM → SUSPICION (advisor, Barnwulf)
//     ├── [0] WATCH HIM → WATCHED (guard, Osric) → GENEROUS_DISPLAY (traveler)
//     │   ├── [0] ACCEPT → END_GOLDEN_PATRON
//     │   └── [1] DEMAND ANSWERS → END_UNMASKED
//     └── [1] TURN HIM AWAY → END_COLD_GATE
//
// =========================================================


// ---------------------------------------------------------
// Add the following to the eventRequests array:
// ---------------------------------------------------------

// === ACT 1: THE RETURN ===

{
  id: 'CHAIN_PRODIGAL_SON_START',
  chainId: 'PRODIGAL_SON',
  chainRole: 'start',
  title: 'A Familiar Stranger',
  text: 'A man in a fur-lined traveling cloak rides through the village gate on a horse too fine for any farmer. He dismounts at the old Wulfhere farmstead — the one that has stood empty since Wulfhere died two winters ago. "I am Wulfstan, son of Wulfhere," he announces to the gathering crowd. "I have come home." He opens a leather satchel and scatters silver coins among the children. His sister Leofwyn watches from her doorstep, arms folded, saying nothing.',
  portraitId: 'traveler',
  options: [
    {
      text: 'WELCOME HOME',
      effects: { satisfaction: 1 },
    },
    {
      text: 'WHO ARE YOU, REALLY?',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'PRODIGAL_SON_HOMECOMING', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'PRODIGAL_SON_SUSPICION', weight: 1 }],
    },
  ],
},


// === ACT 2A: WELCOME PATH ===

{
  id: 'PRODIGAL_SON_HOMECOMING',
  chainId: 'PRODIGAL_SON',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Neighbor\'s Claim',
  text: 'Old Eadric appears at your hall the next morning, leaning on his staff. His face is weathered from two years of working the Wulfhere fields. "I broke my back keeping that land alive when the boy ran off chasing coin," he says, voice steady but hard. "The crops that fed this village last winter — I grew them. Now this stranger rides in with silver and expects it all back?" He meets your eyes. "I have rights, my lord. The law says a man who works abandoned land for two harvests may claim it."',
  portraitId: 'elder',
  options: [
    {
      text: 'HELP WULFSTAN RECLAIM IT',
      effects: { authority: 1 },
    },
    {
      text: 'INVESTIGATE HIS WEALTH FIRST',
      effects: { gold: -5 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'PRODIGAL_SON_LAND_DISPUTE', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'PRODIGAL_SON_INVESTIGATION', weight: 1 }],
    },
  ],
},

{
  id: 'PRODIGAL_SON_LAND_DISPUTE',
  chainId: 'PRODIGAL_SON',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Blood or Sweat',
  text: 'The dispute has split the village. Leofwyn, Wulfstan\'s own sister, stands before you with clenched fists. "My brother left when our father was dying. I begged him to stay. He chose the road and its promises." She swallows hard. "Eadric fed me through the worst winter in memory. He earned that land with his hands. Wulfstan earned his silver — wherever it came from — somewhere else." Half the village nods. The other half eyes Wulfstan\'s coin purse and stays quiet.',
  portraitId: 'farmer',
  options: [
    {
      text: 'RULE FOR WULFSTAN',
      effects: { authority: 1, satisfaction: -1 },
    },
    {
      text: 'DIVIDE THE LAND',
      effects: { satisfaction: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'PRODIGAL_SON_END_LAND_RESTORED', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'PRODIGAL_SON_END_UNEASY_PEACE', weight: 1 }],
    },
  ],
},

// --- INVESTIGATION SUB-PATH (from HOMECOMING) ---

{
  id: 'PRODIGAL_SON_INVESTIGATION',
  chainId: 'PRODIGAL_SON',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Questions Without Answers',
  text: 'Osric returns from his inquiries, looking troubled. "The story doesn\'t add up, my lord. Wulfstan claims he made his fortune trading furs in Eirleah — but no fur trader in the capital has heard his name. His horse bears a brand from Eadstrand, a harbor town known for smuggling. And the silver he\'s been spending? Some of the coins carry a stamp I\'ve seen before — on plunder recovered from river pirate raids." He waits for your order.',
  portraitId: 'guard',
  options: [
    {
      text: 'CONFRONT WULFSTAN',
      effects: {},
      authorityCheck: {
        minCommit: 5,
        maxCommit: 20,
        minSuccessChance: 45,
        maxSuccessChance: 85,
        onSuccess: { authority: 2 },
        onFailure: { authority: -2, satisfaction: -1 },
        successFeedbackRequestId: 'PRODIGAL_SON_AUTH_CONFRONT_SUCC',
        failureFeedbackRequestId: 'PRODIGAL_SON_AUTH_CONFRONT_FAIL',
        refundOnSuccessPercent: 75,
        lossOnFailurePercent: 50,
      },
    },
    {
      text: 'SEARCH HIS ROOM',
      effects: { gold: -3 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'PRODIGAL_SON_DISCOVERY', weight: 1 }],
    },
  ],
},

{
  id: 'PRODIGAL_SON_CONFESSION',
  chainId: 'PRODIGAL_SON',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Pirate\'s Middleman',
  text: 'Wulfstan sinks to his knees. The fine clothes suddenly look like a costume. "I never hurt anyone," he whispers. "I bought goods from the river crews and sold them in the port markets. Stolen grain, tools, cloth — I didn\'t ask where it came from. I just... I wanted to come home with something. To prove I wasn\'t the failure my father said I was." Tears streak his face. "Every coin I carry was earned on the backs of people just like the ones in this village." Leofwyn turns away. The hall is silent.',
  portraitId: 'traveler',
  options: [
    {
      text: 'ARREST HIM',
      effects: { authority: 2, satisfaction: 1 },
    },
    {
      text: 'BANISH HIM',
      effects: { authority: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'PRODIGAL_SON_END_PIRATE_FENCE_CAUGHT', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'PRODIGAL_SON_END_EXILE', weight: 1 }],
    },
  ],
},

{
  id: 'PRODIGAL_SON_DISCOVERY',
  chainId: 'PRODIGAL_SON',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Locked Chest',
  text: 'While Wulfstan dines at the tavern, Osric slips into the Wulfhere farmstead. He returns within the hour, pale-faced. "He has a chest hidden beneath the floorboards, my lord. Inside — a ledger of transactions, contacts along the river, and a small fortune in marked coins. He\'s a fence. A middleman for the river pirates." He sets the ledger on your table. "Also found a letter. The pirates expect a new shipment route — through our village. Wulfstan didn\'t just come home. He came to set up shop."',
  portraitId: 'guard',
  options: [
    {
      text: 'EXPOSE HIM PUBLICLY',
      effects: { authority: 2, satisfaction: 1 },
    },
    {
      text: 'KEEP QUIET — TAKE A CUT',
      effects: { gold: 15, authority: -2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'PRODIGAL_SON_END_PUBLIC_SHAME', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'PRODIGAL_SON_END_COMPLICIT', weight: 1 }],
    },
  ],
},


// === ACT 2B: SUSPICION PATH ===

{
  id: 'PRODIGAL_SON_SUSPICION',
  chainId: 'PRODIGAL_SON',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'A Careful Welcome',
  text: 'Barnwulf pulls you aside after Wulfstan\'s arrival. "A farmer\'s son who left with nothing and returns with a horse and silver? In my experience, such stories end with someone in chains." He watches Wulfstan through the window, handing out gifts to wide-eyed villagers. "The people are already warming to him — silver has that effect. But we have a choice: let him stay and watch what he does, or send him away before his roots take hold."',
  portraitId: 'advisor',
  options: [
    {
      text: 'LET HIM STAY — UNDER WATCH',
      effects: { gold: -3 },
    },
    {
      text: 'TURN HIM AWAY',
      effects: { satisfaction: -2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'PRODIGAL_SON_WATCHED', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'PRODIGAL_SON_END_COLD_GATE', weight: 1 }],
    },
  ],
},

{
  id: 'PRODIGAL_SON_WATCHED',
  chainId: 'PRODIGAL_SON',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Generous Stranger',
  text: 'Over the following days, Wulfstan makes himself indispensable. He pays to repair the village well. He buys a round at the tavern every evening. He hires idle farmers to clear his father\'s fields. The people adore him. Osric, watching from the shadows, reports nothing suspicious — yet. But then Wulfstan comes to your hall with a proposal: "Let me fund a new storehouse, my lord. This village gave me life — let me give something back." The offer is generous. Perhaps too generous.',
  portraitId: 'traveler',
  options: [
    {
      text: 'ACCEPT HIS GENEROSITY',
      effects: { gold: 10, satisfaction: 2 },
    },
    {
      text: 'WHERE DOES THIS COME FROM?',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'PRODIGAL_SON_END_GOLDEN_PATRON', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'PRODIGAL_SON_END_UNMASKED', weight: 1 }],
    },
  ],
},


// === ACT 3: ENDINGS ===

// --- Welcome → Land Dispute → Rule for Wulfstan ---
{
  id: 'PRODIGAL_SON_END_LAND_RESTORED',
  chainId: 'PRODIGAL_SON',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'A Son\'s Inheritance',
  text: 'You award the Wulfhere farmstead to Wulfstan by blood right. Eadric accepts your ruling, but his silence speaks louder than any protest. He returns to his own smaller plot without a word. Leofwyn refuses to speak to her brother. Wulfstan throws himself into the work — plowing, planting, mending fences — as if trying to earn through labor what the law gave him freely. The village watches, divided. Some see justice; others see a rich man buying his way home.',
  portraitId: 'traveler',
  options: [
    {
      text: 'COMPENSATE EADRIC',
      effects: { gold: -10, satisfaction: 2, authority: 1, farmers: 2 },
    },
    {
      text: 'THE LAW IS CLEAR',
      effects: { authority: 2, satisfaction: -2, farmers: 1 },
    },
  ],
},

// --- Welcome → Land Dispute → Divide ---
{
  id: 'PRODIGAL_SON_END_UNEASY_PEACE',
  chainId: 'PRODIGAL_SON',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'Half a Home',
  text: 'You draw the boundary yourself — the eastern fields to Eadric, the farmstead and western plot to Wulfstan. Neither man is satisfied. Eadric mutters about half-measures. Wulfstan stares at the split fields with something between gratitude and resentment. But Leofwyn, surprisingly, nods. "At least you didn\'t pretend there was an easy answer, my lord." The village settles into an uneasy equilibrium. Two men working side by side on land that was once one family\'s whole world.',
  portraitId: 'farmer',
  options: [
    {
      text: 'PEACE IS ENOUGH',
      effects: { satisfaction: 1, authority: 1, farmers: 2 },
    },
    {
      text: 'KEEP AN EYE ON THEM',
      effects: { gold: -3, satisfaction: 1, farmers: 2, authority: 1 },
    },
  ],
},

// --- Welcome → Investigate → Confront (auth success) → Arrest ---
{
  id: 'PRODIGAL_SON_END_PIRATE_FENCE_CAUGHT',
  chainId: 'PRODIGAL_SON',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'The Fence Unmasked',
  text: 'Wulfstan is led through the village in chains. The children who scrambled for his silver watch in confused silence. Leofwyn does not come out of her house. Osric confiscates the marked coins and the pirate ledger — evidence that will serve you well if the river crews ever come calling. Barnwulf counts the seized silver. "His ill-gotten gains will feed the village through the lean months, my lord. And his arrest sends a message to any pirate thinking of using our roads." Eadric, quietly, takes over the Wulfhere fields for good.',
  portraitId: 'guard',
  options: [
    {
      text: 'DISTRIBUTE THE SILVER',
      effects: { gold: 15, satisfaction: 2, authority: 2 },
    },
    {
      text: 'SAVE IT FOR DEFENSES',
      effects: { gold: 20, authority: 3, satisfaction: 1 },
    },
  ],
},

// --- Welcome → Investigate → Confront (auth success) → Banish ---
{
  id: 'PRODIGAL_SON_END_EXILE',
  chainId: 'PRODIGAL_SON',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'The Road Again',
  text: 'You give Wulfstan until sunrise. He rides out the way he came — on his fine horse, in his fine clothes, but with empty saddlebags and hollow eyes. "I only wanted to come home," he says at the gate. Nobody answers. Leofwyn watches from her window until the dust settles. The village is quieter afterward. Poorer in silver, richer in something harder to name. Barnwulf finds you that evening. "Mercy and justice walked the same road today, my lord. That doesn\'t happen often."',
  portraitId: 'advisor',
  options: [
    {
      text: 'HE MADE HIS CHOICE',
      effects: { satisfaction: 1, authority: 1, farmers: 1 },
    },
    {
      text: 'LOOK AFTER LEOFWYN',
      effects: { satisfaction: 2, health: 1, farmers: 1 },
    },
  ],
},

// --- Welcome → Investigate → Confront (auth fail) ---
{
  id: 'PRODIGAL_SON_END_VANISHED',
  chainId: 'PRODIGAL_SON',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'Gone Before Dawn',
  text: 'Your confrontation spooked him. By morning, the Wulfhere farmstead is empty again — the fine horse gone, the saddlebags gone, and with them every scrap of evidence. Osric curses himself for not posting a guard. The village buzzes with rumors: some say Wulfstan was innocent and you drove him off, others whisper he fled because the truth was worse than anyone guessed. Leofwyn sits alone on her brother\'s abandoned doorstep. "He always was better at leaving than staying," she says.',
  portraitId: 'farmer',
  options: [
    {
      text: 'WE\'LL BE MORE CAREFUL',
      effects: { satisfaction: -2, authority: -1 },
    },
    {
      text: 'GIVE THE FARM TO EADRIC',
      effects: { satisfaction: 1, farmers: 2, authority: -1 },
    },
  ],
},

// --- Welcome → Investigate → Search → Expose ---
{
  id: 'PRODIGAL_SON_END_PUBLIC_SHAME',
  chainId: 'PRODIGAL_SON',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'The Ledger Speaks',
  text: 'You read Wulfstan\'s pirate ledger aloud in the village square. Names, dates, quantities — stolen grain, iron, cloth, all passed through his hands for a cut of the profit. The crowd that cheered his silver now stares in disgust. Wulfstan tries to speak, but Leofwyn steps forward first. "You fed us with stolen bread," she says, and the words cut deeper than any judgment you could pass. Wulfstan is driven from the village by the people who embraced him days ago. His silver stays behind.',
  portraitId: 'farmer',
  options: [
    {
      text: 'THE TRUTH SET US FREE',
      effects: { gold: 15, authority: 3, satisfaction: 1 },
    },
    {
      text: 'BURN THE LEDGER',
      effects: { gold: 10, authority: 2, satisfaction: 2 },
    },
  ],
},

// --- Welcome → Investigate → Search → Take a Cut ---
{
  id: 'PRODIGAL_SON_END_COMPLICIT',
  chainId: 'PRODIGAL_SON',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'A Private Arrangement',
  text: 'You lock the ledger in your own chest and summon Wulfstan after dark. He understands immediately — he\'s been in this conversation before. "Fifteen percent," he offers. You settle on twenty. Over the following weeks, a quiet trickle of coin flows into the village coffers from Wulfstan\'s "trade ventures." Nobody asks questions. The village prospers, the fields are worked, and Eadric gets his compensation. Only you and Osric know the price. Barnwulf, if he suspects, says nothing — but his eyes are troubled.',
  portraitId: 'traveler',
  options: [
    {
      text: 'EVERYONE BENEFITS',
      effects: { gold: 20, authority: -2, satisfaction: 1, farmers: 2 },
    },
    {
      text: 'FOR NOW',
      effects: { gold: 25, authority: -3, satisfaction: 1, farmers: 1 },
    },
  ],
},

// --- Suspicion → Watch → Accept Generosity ---
{
  id: 'PRODIGAL_SON_END_GOLDEN_PATRON',
  chainId: 'PRODIGAL_SON',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'The Village Patron',
  text: 'Wulfstan\'s storehouse is built within the fortnight — sturdy oak timbers, a proper stone foundation. The village celebrates. More gifts follow: a new plough for Eadric, seedlings for the orchard, blankets for the children. Whatever shadows cling to Wulfstan\'s past, the village chooses not to look too closely. Barnwulf watches the celebration from the hall steps. "Every village needs a patron, my lord. Let us hope the cost of this one never comes due." Wulfstan catches your eye across the square and raises his cup. His smile is warm. His eyes are not.',
  portraitId: 'traveler',
  options: [
    {
      text: 'PROSPERITY IS WELCOME',
      effects: { gold: 10, satisfaction: 3, farmers: 2 },
    },
    {
      text: 'KEEP OSRIC ON WATCH',
      effects: { gold: 8, satisfaction: 2, farmers: 2, authority: 1 },
    },
  ],
},

// --- Suspicion → Watch → Demand Answers ---
{
  id: 'PRODIGAL_SON_END_UNMASKED',
  chainId: 'PRODIGAL_SON',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'The Mask Slips',
  text: 'Your direct question catches Wulfstan off guard. He hesitates — and in that hesitation, you see it all: the practiced smile, the rehearsed generosity, the careful performance of a man who has something to hide. "I think you should leave," you say quietly. Wulfstan\'s mask crumbles. He doesn\'t argue. He packs his things and rides out before the village wakes. Only his sister comes to the gate. "Thank you," Leofwyn says. "He would have brought trouble. He always did." Eadric takes over the land without complaint. The village is poorer but intact.',
  portraitId: 'farmer',
  options: [
    {
      text: 'BETTER SAFE THAN SORRY',
      effects: { satisfaction: -1, authority: 2, farmers: 1 },
    },
    {
      text: 'HELP LEOFWYN',
      effects: { gold: -5, satisfaction: 1, farmers: 2, health: 1 },
    },
  ],
},

// --- Suspicion → Turn Away ---
{
  id: 'PRODIGAL_SON_END_COLD_GATE',
  chainId: 'PRODIGAL_SON',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'No Room at the Gate',
  text: 'You tell Wulfstan to leave. His face hardens — not with anger, but with the resigned bitterness of a man who expected exactly this. "I understand, my lord. A stranger with silver is more dangerous than a stranger with a sword." He mounts his horse and rides east without looking back. The children who caught his coins stare after him. Some villagers grumble that you turned away a benefactor. Others nod at your caution. Leofwyn says nothing. She simply goes back to work in her father\'s fields, as she always has.',
  portraitId: 'traveler',
  options: [
    {
      text: 'WE DON\'T NEED HIS COIN',
      effects: { satisfaction: -2, authority: 1 },
    },
    {
      text: 'LOOK AFTER HIS SISTER',
      effects: { gold: -5, satisfaction: 1, farmers: 1 },
    },
  ],
},


// ---------------------------------------------------------
// Add the following to the authorityInfoRequests array:
// ---------------------------------------------------------

// Authority feedback for CONFRONT WULFSTAN (at INVESTIGATION)
{
  id: 'PRODIGAL_SON_AUTH_CONFRONT_SUCC',
  title: 'The Mask Cracks',
  text: 'Under the weight of your authority and the evidence against him, Wulfstan\'s composure crumbles. He sees that the game is up. "I\'ll tell you everything," he says, voice barely a whisper. "Just — let my sister hear it from me, not from the town crier."',
  portraitId: 'traveler',
  advancesTick: false,
  options: [
    { text: 'CONTINUE', effects: {} },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'PRODIGAL_SON_CONFESSION', weight: 1 }],
    },
  ],
},

{
  id: 'PRODIGAL_SON_AUTH_CONFRONT_FAIL',
  title: 'A Step Too Slow',
  text: 'Wulfstan reads the accusation in your eyes before you finish speaking. His mask doesn\'t crack — it simply falls away, replaced by the calculating gaze of a man who has talked his way out of tighter corners than this. "I think there has been a misunderstanding, my lord. One I will not stay to clarify." By the time Osric reaches the stable, the fine horse is gone.',
  portraitId: 'traveler',
  advancesTick: false,
  options: [
    { text: 'CONTINUE', effects: {} },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'PRODIGAL_SON_END_VANISHED', weight: 1 }],
    },
  ],
},
  canTriggerRandomly: false,
  canTriggerRandomly: false,
