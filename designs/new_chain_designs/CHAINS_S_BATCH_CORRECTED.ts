// =========================================================
// FIVE S-SIZED REQUEST CHAINS — Everyday Life Dilemmas
//
// Chain 1: THE_DRUNKARD    (7 requests: 1 start + 2 members + 4 ends)
// Chain 2: WOLF_PACK       (8 requests: 1 start + 2 members + 4 ends + 1 combat-loss end)
// Chain 3: SACRED_OAK      (7 requests: 1 start + 2 members + 4 ends
//                          + 2 authority info requests)
// Chain 4: THE_DEBT        (7 requests: 1 start + 2 members + 4 ends)
// Chain 5: RUNAWAY_BRIDE   (8 requests: 1 start + 2 members + 4 ends + 1 combat-loss end)
//
// STRUCTURAL ADDITIONS vs. v1:
//   WOLF_PACK       — combat added to WOLF_PACK_HUNT (PURSUE option)
//                     new end: WOLF_PACK_END_WOLVES_EMBOLDENED (combat-loss)
//   SACRED_OAK      — authority check added to SACRED_OAK_AFTERMATH (option 0)
//                     2 authority info requests at the bottom of this file
//   RUNAWAY_BRIDE   — combat added to RUNAWAY_BRIDE_PURSUERS (SHE STAYS option)
//                     new end: RUNAWAY_BRIDE_END_DEFEATED (combat-loss)
//
// EFFECT MAGNITUDE: scaled to narrative weight and chain position,
//   not to chain size. See §3.4 for reference table.
// =========================================================


// =========================================================
// CHAIN 1: THE_DRUNKARD – The Broken Craftsman
// Size: S (7 requests: 1 start + 2 members + 4 ends)
//
// Theme: The village's most skilled craftsman has been drinking
// himself to ruin since his wife's death. He's picking fights,
// missing work, and the village needs his hands.
// Compassion or discipline?
//
// Narrative Promise: "Can you save a broken man — and does
// the village need you to?"
//
// Core Resources: Gold, Satisfaction, Health, Fire Risk
//
// Characters:
//   Aldhelm (craftsman)       – the drunkard
//   Dunhild (healer)          – unique, offers care
//   Edwyn (council_member)    – demands order
//
// Branch Map:
//   START (craftsman)
//   ├── [0] HELP HIM → INTERVENTION (healer)
//   │   ├── [0] GIVE HIM TIME → END_SLOW_RECOVERY
//   │   └── [1] PUT HIM TO WORK → END_FUNCTIONING
//   └── [1] DISCIPLINE HIM → PUNISHMENT (council_member)
//       ├── [0] FINE HIM → END_RESENTFUL
//       └── [1] EXILE HIM → END_LOST_CRAFTSMAN
// =========================================================

// --- Add to eventRequests ---

{
  id: 'CHAIN_DRUNKARD_START',
  chainId: 'THE_DRUNKARD',
  chainRole: 'start',
  title: 'Ale and Ashes',
  text: 'Aldhelm the carpenter lies sprawled in the mud outside the tavern for the third morning in a row. His tools rust in his workshop while half-finished repairs rot in the rain. He was the finest craftsman in the village — until his wife Eadgyth was taken by the winter fever. Now he drinks. Edwyn from the council has lodged a formal complaint. "He swung at a farmer last night, my lord. The man is a danger." But Dunhild shakes her head. "The man is grieving."',
  portraitId: 'craftsman',
  options: [
    {
      text: 'HELP HIM',
      effects: { gold: -10 },
    },
    {
      text: 'DISCIPLINE HIM',
      effects: { satisfaction: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'DRUNKARD_INTERVENTION', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'DRUNKARD_PUNISHMENT', weight: 1 }],
    },
  ],
},

{
  id: 'DRUNKARD_INTERVENTION',
  chainId: 'THE_DRUNKARD',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Healer\'s Approach',
  text: 'Dunhild takes Aldhelm into her care. She brews teas to ease his trembling, sits with him through the worst nights, and — most importantly — listens. After three days, he speaks for the first time about Eadgyth. After five, he asks about his tools. Dunhild finds you in the hall. "He\'s not healed, my lord. He may never be. But there are two paths: give him time and space to mend slowly, or give him work — purpose — even if he\'s not ready. Both carry risk."',
  portraitId: 'healer',
  options: [
    {
      text: 'GIVE HIM TIME',
      effects: { gold: -10 },
    },
    {
      text: 'PUT HIM TO WORK',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'DRUNKARD_END_SLOW_RECOVERY', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'DRUNKARD_END_FUNCTIONING', weight: 1 }],
    },
  ],
},

{
  id: 'DRUNKARD_PUNISHMENT',
  chainId: 'THE_DRUNKARD',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Before the Council',
  text: 'Aldhelm stands before the village council, swaying slightly, eyes red. Edwyn reads the charges: public drunkenness, destruction of property, assault. Aldhelm says nothing. He stares at his hands — hands that built half the roofs in this village. Edwyn turns to you. "A fine will remind him of his obligations. But if he cannot control himself, exile may be the only answer. We cannot have a violent drunkard among our families."',
  portraitId: 'council_member',
  options: [
    {
      text: 'FINE HIM',
      effects: { gold: 5 },
    },
    {
      text: 'EXILE HIM',
      effects: { authority: 2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'DRUNKARD_END_RESENTFUL', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'DRUNKARD_END_LOST_CRAFTSMAN', weight: 1 }],
    },
  ],
},

{
  id: 'DRUNKARD_END_SLOW_RECOVERY',
  chainId: 'THE_DRUNKARD',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'A Mended Man',
  text: 'Weeks pass. Aldhelm emerges from Dunhild\'s care thinner, quieter, and sober. He returns to his workshop and picks up a chisel for the first time in months. The work is slow at first — unsteady hands, hesitant cuts. But by month\'s end, he has repaired the grain store roof and carved a small wooden figure of Eadgyth that he keeps on his workbench. He will never be the boisterous craftsman he was. But the village has him back, and that is enough.',
  portraitId: 'craftsman',
  options: [
    {
      text: 'WELCOME BACK, ALDHELM',
      effects: { satisfaction: 4, health: 3 },
    },
    {
      text: 'KEEP DUNHILD CLOSE',
      effects: { satisfaction: 3, health: 4 },
    },
  ],
},

{
  id: 'DRUNKARD_END_FUNCTIONING',
  chainId: 'THE_DRUNKARD',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'Work as Medicine',
  text: 'Aldhelm throws himself into labor with a desperate fury. He repairs, builds, mends — dawn to dusk, without pause. The village benefits. But Dunhild watches with concern. "He\'s not healing, my lord. He\'s hiding." She\'s right. Some evenings, the tavern owner reports he still drinks alone after dark. But the roofs are solid, the fences hold, and the village has its craftsman — functional if not whole.',
  portraitId: 'craftsman',
  options: [
    {
      text: 'THE WORK SPEAKS',
      effects: { satisfaction: 3, fireRisk: -2 },
    },
    {
      text: 'CHECK ON HIM LATER',
      effects: { satisfaction: 2, health: 2 },
    },
  ],
},

{
  id: 'DRUNKARD_END_RESENTFUL',
  chainId: 'THE_DRUNKARD',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'Bitter Sobriety',
  text: 'Aldhelm pays the fine from a pouch he kept hidden — Eadgyth\'s savings, set aside for a future that will never come. He returns to work, but something is broken between him and the village. He does what is asked, nothing more. His craftsmanship is flawless but joyless. When neighbors greet him, he nods and moves on. Edwyn calls it a success. Dunhild calls it a tragedy. Both are right.',
  portraitId: 'craftsman',
  options: [
    {
      text: 'ORDER IS RESTORED',
      effects: { satisfaction: -3, authority: 2 },
    },
    {
      text: 'OFFER HIM A KIND WORD',
      effects: { satisfaction: 2 },
    },
  ],
},

{
  id: 'DRUNKARD_END_LOST_CRAFTSMAN',
  chainId: 'THE_DRUNKARD',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'An Empty Workshop',
  text: 'Aldhelm leaves before dawn, carrying nothing but his tools and Eadgyth\'s wooden comb. The village wakes to an empty workshop and a silence where hammering used to be. Within a week, the first roof leaks. Within a month, Edwyn admits the village has no one who can match Aldhelm\'s skill. "Perhaps we were too harsh," he says, staring at a sagging beam. Dunhild says nothing at all.',
  portraitId: 'council_member',
  options: [
    {
      text: 'WE MADE OUR CHOICE',
      effects: { satisfaction: -4, fireRisk: 4 },
    },
    {
      text: 'HIRE A NEW CRAFTSMAN',
      effects: { gold: -25, satisfaction: -3, fireRisk: -3 },
    },
  ],
},


// =========================================================
// CHAIN 2: WOLF_PACK – Fangs at the Forest Edge
// Size: S (8 requests: 1 start + 2 members + 5 ends)
//   — STRUCTURAL ADDITION: combat on WOLF_PACK_HUNT (PURSUE option)
//     New end: WOLF_PACK_END_WOLVES_EMBOLDENED (combat-loss outcome)
//
// Theme: A wolf pack is killing livestock at night. The village
// must decide how to respond — an active hunt, or defensive
// measures. Each approach has risks and costs.
//
// Narrative Promise: "Can you protect the flocks before the
// wolves grow bolder?"
//
// Core Resources: Gold, Satisfaction, Farmers, Land Forces, Health
//
// Characters:
//   Hild (farmer)       – reports the attacks
//   Osric (scout)       – leads the hunt or scouts
//   Brynric (guard)     – manages defenses
//
// Branch Map:
//   START (farmer)
//   ├── [0] HUNT THEM → THE_HUNT (scout)
//   │   ├── [0] PURSUE DEEP → COMBAT
//   │   │   ├── win  → END_WOLVES_SLAIN
//   │   │   └── lose → END_WOLVES_EMBOLDENED  (new)
//   │   └── [1] SET TRAPS → END_TRAPPED
//   └── [1] FORTIFY THE PENS → FORTIFIED (guard)
//       ├── [0] HIRE A TRAPPER → END_TRAPPER
//       └── [1] WAIT THEM OUT → END_WINTER_LOSSES
// =========================================================

{
  id: 'CHAIN_WOLF_PACK_START',
  chainId: 'WOLF_PACK',
  chainRole: 'start',
  title: 'Blood in the Snow',
  text: 'Hild the shepherdess arrives at your hall before the sun is up, her cloak torn and her hands shaking. "Three sheep dead in the night, my lord. Throats ripped clean. Tracks in the mud — a whole pack, six or more, coming from the Wrenweald forest." She swallows. "They\'re getting bolder. Last week they stayed at the treeline. Last night they came within a stone\'s throw of the cottages. If we don\'t act, they\'ll take a child next."',
  portraitId: 'farmer',
  options: [
    {
      text: 'ORGANIZE A HUNT',
      effects: { gold: -5 },
    },
    {
      text: 'FORTIFY THE PENS',
      effects: { gold: -15 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'WOLF_PACK_HUNT', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'WOLF_PACK_FORTIFIED', weight: 1 }],
    },
  ],
},

{
  id: 'WOLF_PACK_HUNT',
  chainId: 'WOLF_PACK',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Into the Wrenweald',
  // COMBAT is on option 0 (PURSUE THEM).
  // The player commits landForces; the wolves (enemyForces: 4) represent
  // the pack defending the den.
  // Option 1 (SET TRAPS) is the non-combat alternative — followUps handles it.
  text: 'Osric leads the hunting party to the forest edge. The tracks are easy to follow — deep prints in the soft earth, heading northeast into the dense timber. He kneels by a half-eaten carcass. "The den is deeper in — maybe half a day\'s march. We can go after them and finish this. But the Wrenweald is thick and the pack is large." He points to the game trail. "Or we set snares here along their route and let the traps do the work. Slower, but nobody risks a wolf bite in the dark."',
  portraitId: 'scout',
  options: [
    {
      text: 'PURSUE THEM',
      effects: {},
      // Combat triggers on this option. followUpsOnWin / followUpsOnLose
      // in the combat spec below replace the regular followUp for index 0.
    },
    {
      text: 'SET TRAPS',
      effects: { gold: -8 },
    },
  ],
  combat: {
    enemyForces: 4,
    prepDelayMinTicks: 0,
    prepDelayMaxTicks: 2,
    onWin: { gold: 8, satisfaction: 2 },
    onLose: { health: -3, landForces: -2, satisfaction: -2 },
    followUpsOnWin: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WOLF_PACK_END_SLAIN', weight: 1 }],
      },
    ],
    followUpsOnLose: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WOLF_PACK_END_WOLVES_EMBOLDENED', weight: 1 }],
      },
    ],
  },
  followUps: [
    // Only option 1 (SET TRAPS) — option 0 is handled by combat spec above
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'WOLF_PACK_END_TRAPPED', weight: 1 }],
    },
  ],
},

{
  id: 'WOLF_PACK_FORTIFIED',
  chainId: 'WOLF_PACK',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Walls Against the Wild',
  text: 'Brynric and a crew of farmers spend two days reinforcing the livestock pens — double stakes, iron fastenings, a new fence around the northern pasture. The work is solid. But on the third night, the wolves return. They circle the pens, howling, and the sheep panic so badly that two break their legs against the walls. Brynric finds you at dawn. "The pens held, my lord. But the beasts aren\'t giving up. We can hire a professional trapper from Grentun — he knows these forests. Or we can wait. Wolves move on when prey is scarce."',
  portraitId: 'guard',
  options: [
    {
      text: 'HIRE THE TRAPPER',
      effects: { gold: -8 },
    },
    {
      text: 'WAIT THEM OUT',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'WOLF_PACK_END_TRAPPER', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'WOLF_PACK_END_WINTER_LOSSES', weight: 1 }],
    },
  ],
},

{
  id: 'WOLF_PACK_END_SLAIN',
  chainId: 'WOLF_PACK',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 25,
  title: 'The Pack Broken',
  text: 'Osric\'s hunters find the den at dusk — a hollow beneath a fallen oak, littered with bones. The fight is brief and brutal. Six wolves, including a scarred old alpha, lie dead by morning. The hunters return to cheers, dragging pelts that will fetch a fair price. Hild counts her remaining sheep with a lighter heart. "My lord, the forest is ours again." Osric cleans his blade and allows himself a rare smile.',
  portraitId: 'scout',
  options: [
    {
      text: 'SELL THE PELTS',
      effects: { gold: 20, satisfaction: 3 },
    },
    {
      text: 'REWARD THE HUNTERS',
      effects: { gold: 10, satisfaction: 4 },
    },
  ],
},

{
  id: 'WOLF_PACK_END_WOLVES_EMBOLDENED',
  chainId: 'WOLF_PACK',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 25,
  title: 'The Pack Grows Bold',
  text: 'The hunters return at dusk, two men carrying a third between them. Osric\'s face is dark with shame. They found the den and met the pack head-on — but the wolves were larger, fiercer, and faster than anyone had expected. The hunters fled. That night, the pack circles the village itself, howling beneath the stars. Hild finds you at dawn, her eyes red. "One more sheep taken, my lord. Right from the pen." They won. They know it. Something must change before it gets worse.',
  portraitId: 'farmer',
  options: [
    {
      text: 'REINFORCE EVERYTHING',
      effects: { gold: -20, satisfaction: -2 },
    },
    {
      text: 'IT WON\'T HAPPEN AGAIN',
      effects: { satisfaction: -3, farmers: -4 },
    },
  ],
},

{
  id: 'WOLF_PACK_END_TRAPPED',
  chainId: 'WOLF_PACK',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 25,
  title: 'The Snares Hold',
  text: 'Over the next week, the traps do their work. Three wolves are caught — including a large female that Osric suspects was leading the raids. The rest of the pack, wary now, retreats deeper into the Wrenweald. No more sheep are lost. Hild brings a basket of cheese to the hall as thanks. "Slower than a sword, my lord, but just as final." The traps remain set as a precaution, and the forest edge falls quiet.',
  portraitId: 'scout',
  options: [
    {
      text: 'GOOD WORK',
      effects: { gold: 10, satisfaction: 3 },
    },
    {
      text: 'KEEP THE TRAPS SET',
      effects: { gold: 8, satisfaction: 2, farmers: 3 },
    },
  ],
},

{
  id: 'WOLF_PACK_END_TRAPPER',
  chainId: 'WOLF_PACK',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 25,
  title: 'The Professional',
  text: 'The trapper from Grentun arrives — a lean, silent man called Ecgbert who smells of pine resin and carries more knives than a butcher. He disappears into the Wrenweald for four days. When he returns, he carries the ears of seven wolves and a map of their routes. "Your problem is solved, my lord. But you\'ll want to burn the den — it\'ll attract a new pack within the year if you don\'t." Hild sleeps soundly for the first time in weeks.',
  portraitId: 'scout',
  options: [
    {
      text: 'BURN THE DEN',
      effects: { satisfaction: 3, fireRisk: 3 },
    },
    {
      text: 'LEAVE IT — WE\'RE DONE',
      effects: { satisfaction: 3 },
    },
  ],
},

{
  id: 'WOLF_PACK_END_WINTER_LOSSES',
  chainId: 'WOLF_PACK',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 25,
  title: 'The Price of Patience',
  text: 'The wolves don\'t move on. Over the following weeks, they take four more sheep, two goats, and a calf. The pens hold, but the livestock inside are thin and terrified. Hild\'s flock is halved. When the pack finally drifts north with the changing season, the damage is done. "We should have hunted them," Hild says, staring at her depleted pasture. She\'s right. You saved coin, but the village\'s flocks will take a season to recover.',
  portraitId: 'farmer',
  options: [
    {
      text: 'WE LEARNED OUR LESSON',
      effects: { satisfaction: -3, farmers: -6 },
    },
    {
      text: 'REPLACE THE LIVESTOCK',
      effects: { gold: -25, satisfaction: -2, farmers: 3 },
    },
  ],
},


// =========================================================
// CHAIN 3: SACRED_OAK – The Old Tree
// Size: S (7 requests: 1 start + 2 members + 4 ends
//         + 2 authority info requests)
//   — STRUCTURAL ADDITION: authority check on SACRED_OAK_AFTERMATH
//     option 0 ("IT'S YOUR AUTHORITY"). Player uses political weight
//     to silence the priest's protest.
//     Info requests: SACRED_OAK_AUTH_SUCCESS, SACRED_OAK_AUTH_FAILURE
//
// Theme: Workers need timber and want to fell an ancient oak
// at the village edge. The village priest declares it sacred.
// Progress or tradition?
//
// Narrative Promise: "What matters more — the village's
// future or its past?"
//
// Core Resources: Gold, Satisfaction, Authority, Fire Risk, Health
//
// Characters:
//   Wulfgar (craftsman)           – needs lumber
//   Garthric (village_priest)     – unique, defends the tree
//   Barnwulf (advisor)            – unique, counsels the player
//
// Branch Map:
//   START (craftsman)
//   ├── [0] CUT IT DOWN → AFTERMATH (village_priest)
//   │   ├── [0] IT'S YOUR AUTHORITY (auth check) → END_LUMBER_GAINED
//   │   └── [1] PLANT A SAPLING → END_COMPROMISE
//   └── [1] PROTECT THE TREE → FAITHFUL (village_priest)
//       ├── [0] CONSECRATE IT → END_BLESSED
//       └── [1] BUY LUMBER INSTEAD → END_COSTLY_FAITH
// =========================================================

{
  id: 'CHAIN_SACRED_OAK_START',
  chainId: 'SACRED_OAK',
  chainRole: 'start',
  title: 'The Old Oak',
  text: 'Wulfgar the carpenter waits outside your hall, sawdust in his beard and frustration on his face. "My lord, the great oak at the north edge — it would yield enough timber for a dozen repairs. Good heartwood, seasoned by a hundred winters. I need your leave to fell it." Before you can answer, Garthric the priest appears behind him, staff in hand. "That tree stood before this village was born. The old rites were held beneath its boughs. If you cut it, you cut the roots of this community\'s soul."',
  portraitId: 'craftsman',
  options: [
    {
      text: 'CUT IT DOWN',
      effects: { gold: 15 },
    },
    {
      text: 'PROTECT THE TREE',
      effects: { satisfaction: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'SACRED_OAK_AFTERMATH', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'SACRED_OAK_FAITHFUL', weight: 1 }],
    },
  ],
},

{
  id: 'SACRED_OAK_AFTERMATH',
  chainId: 'SACRED_OAK',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Priest\'s Rebuke',
  // AUTHORITY CHECK on option 0.
  // The player invokes their authority to silence the priest's protest.
  // Success: community defers to the lord; authority reinforced.
  // Failure: Garthric's sermon resonates; village mood sours badly.
  // Both outcomes still lead to END_LUMBER_GAINED — the tree is already down.
  // The check decides how cleanly you can close the chapter.
  text: 'The great oak falls with a sound like thunder. Wulfgar\'s men cheer as they begin stripping branches. But Garthric stands at the stump, silent and ashen. That evening, he addresses the village. "Our lord has chosen timber over tradition. The old roots are severed." Half the village nods pragmatically. The other half averts their eyes. Garthric finds you privately. "Plant a sapling in the stump\'s place, my lord. Give the people a sign that you respect what was lost. Otherwise, this wound will fester."',
  portraitId: 'village_priest',
  options: [
    {
      text: 'IT\'S YOUR AUTHORITY',
      effects: { satisfaction: -2 },
      authorityCheck: {
        minCommit: 0,
        maxCommit: 20,
        threshold: 10,
        minSuccessChance: 35,
        maxSuccessChance: 75,
        onSuccess: { authority: 4 },
        onFailure: { satisfaction: -3, authority: -2 },
        successFeedbackRequestId: 'SACRED_OAK_AUTH_SUCCESS',
        failureFeedbackRequestId: 'SACRED_OAK_AUTH_FAILURE',
        refundOnSuccessPercent: 60,
        lossOnFailurePercent: 50,
      },
    },
    {
      text: 'PLANT A SAPLING',
      effects: { gold: -5 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'SACRED_OAK_END_LUMBER_GAINED', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'SACRED_OAK_END_COMPROMISE', weight: 1 }],
    },
  ],
},

{
  id: 'SACRED_OAK_FAITHFUL',
  chainId: 'SACRED_OAK',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Priest\'s Gratitude',
  text: 'Garthric beams when he hears your decision. "You honor the old ways, my lord." He proposes marking the tree with carved runes and holding a small ceremony to consecrate it as a village shrine. Wulfgar grumbles but accepts — he can find timber elsewhere, just at greater cost. Barnwulf raises an eyebrow. "A consecration would lift spirits. But the lumber shortage remains real. You could buy timber from Grentun — it\'s not cheap, but it keeps both the priest and the carpenter satisfied."',
  portraitId: 'village_priest',
  options: [
    {
      text: 'CONSECRATE THE OAK',
      effects: { satisfaction: 2 },
    },
    {
      text: 'BUY LUMBER INSTEAD',
      effects: { gold: -15 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'SACRED_OAK_END_BLESSED', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'SACRED_OAK_END_COSTLY_FAITH', weight: 1 }],
    },
  ],
},

{
  id: 'SACRED_OAK_END_LUMBER_GAINED',
  chainId: 'SACRED_OAK',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'Practical Minds',
  text: 'The oak\'s timber is put to good use — repaired fences, a new roof for the grain store, solid beams for the watchtower. Wulfgar works with renewed energy. But Garthric\'s sermons turn colder, and some of the elders no longer bring offerings to the shrine. A small price, Barnwulf assures you. "Timber keeps rain off heads, my lord. Traditions can be rebuilt." Perhaps. But the stump at the north edge stands as a quiet reproach.',
  portraitId: 'craftsman',
  options: [
    {
      text: 'PROGRESS DEMANDS SACRIFICE',
      effects: { fireRisk: -3, satisfaction: -3 },
    },
    {
      text: 'THANK WULFGAR',
      effects: { fireRisk: -2, satisfaction: -2, gold: 12 },
    },
  ],
},

{
  id: 'SACRED_OAK_END_COMPROMISE',
  chainId: 'SACRED_OAK',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'Old Roots, New Growth',
  text: 'The sapling is planted in the old stump\'s hollow — a tiny sprig of oak, bound with a cloth ribbon by Garthric\'s own hand. The village gathers to watch. It is a small thing, easily broken. But when Garthric speaks of renewal, of honoring the past while building the future, even Wulfgar nods grudgingly. The timber shortage remains, but the mood in the village lifts. "You found the middle road, my lord," Barnwulf says. "That is rarer than good oak."',
  portraitId: 'village_priest',
  options: [
    {
      text: 'A FAIR BALANCE',
      effects: { satisfaction: 4, authority: 3 },
    },
    {
      text: 'WE STILL NEED TIMBER',
      effects: { satisfaction: 3, authority: 2, gold: -12 },
    },
  ],
},

{
  id: 'SACRED_OAK_END_BLESSED',
  chainId: 'SACRED_OAK',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'The Village Shrine',
  text: 'Garthric carves runes of protection into the oak\'s bark and leads the village in a ceremony beneath its spreading branches. Wildflowers are placed at its roots. Children hang colored cloth from the lower limbs. It becomes a gathering place — somewhere villagers come to sit, to think, to pray. Wulfgar patches his roofs with inferior timber and curses under his breath. But even he admits the village feels different now. Warmer somehow. "Spirit won\'t fix a leaking barn," he mutters. But he\'s smiling.',
  portraitId: 'village_priest',
  options: [
    {
      text: 'BLESS THIS VILLAGE',
      effects: { satisfaction: 5, health: 3 },
    },
    {
      text: 'THE FAITH IS STRONG',
      effects: { satisfaction: 4, authority: 3, health: 2 },
    },
  ],
},

{
  id: 'SACRED_OAK_END_COSTLY_FAITH',
  chainId: 'SACRED_OAK',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'Faith and Finance',
  text: 'The lumber wagons arrive from Grentun within the week — good timber, properly seasoned, but at twice the price of what the oak would have yielded for free. Wulfgar is satisfied with the quality. Garthric is satisfied with the oak\'s survival. Your treasury is the only thing that suffers. Barnwulf tallies the cost. "You kept the peace, my lord. Garthric preaches your wisdom, Wulfgar builds with good wood, and the old oak stands. A fine outcome — if you can afford it."',
  portraitId: 'advisor',
  options: [
    {
      text: 'WORTH EVERY COIN',
      effects: { satisfaction: 3, authority: 2 },
    },
    {
      text: 'DON\'T REMIND ME',
      effects: { satisfaction: 2, authority: 2, health: 2 },
    },
  ],
},


// =========================================================
// CHAIN 4: THE_DEBT – The Farmer's Burden
// Size: S (7 requests: 1 start + 2 members + 4 ends)
//
// Theme: A farmer owes money to a visiting merchant and begs
// the player to intervene. The debt is real, but the terms are
// harsh. Should the player pay, negotiate, or stay out of
// private business?
//
// Narrative Promise: "How far will you go for one farmer's
// problems?"
//
// Core Resources: Gold, Satisfaction, Authority, Farmers
//
// Characters:
//   Eadmund (farmer)        – the debtor
//   Hrothgar (merchant)     – the creditor
//   Barnwulf (advisor)      – unique, counsels the player
//
// Branch Map:
//   START (farmer)
//   ├── [0] INTERVENE → NEGOTIATION (merchant)
//   │   ├── [0] PAY THE DEBT → END_GENEROUS
//   │   └── [1] OFFER LABOR → END_LABOR_DEAL
//   └── [1] STAY OUT OF IT → CONSEQUENCES (advisor)
//       ├── [0] TAKE EADMUND IN → END_COMPASSION
//       └── [1] LET IT PLAY OUT → END_HARSH_LESSON
// =========================================================

{
  id: 'CHAIN_DEBT_START',
  chainId: 'THE_DEBT',
  chainRole: 'start',
  title: 'A Farmer\'s Plea',
  text: 'Eadmund the farmer waits outside your hall with his cap in his hands and shame in his eyes. "My lord, I owe the merchant Hrothgar twelve gold for seed grain I bought last spring. The crop failed — you remember the rains — and now he\'s come to collect. He says if I can\'t pay by week\'s end, he\'ll take my plough-ox. Without the ox, I can\'t work the fields. Without the fields..." He trails off. "I know it\'s not your burden, my lord. But I have nowhere else to turn."',
  portraitId: 'farmer',
  options: [
    {
      text: 'I\'LL SPEAK TO HROTHGAR',
      effects: {},
    },
    {
      text: 'THIS ISN\'T MY AFFAIR',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'DEBT_NEGOTIATION', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'DEBT_CONSEQUENCES', weight: 1 }],
    },
  ],
},

{
  id: 'DEBT_NEGOTIATION',
  chainId: 'THE_DEBT',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Creditor\'s Terms',
  text: 'Hrothgar is a heavyset man with a ledger thicker than a prayer book and no patience for sentiment. "Twelve gold, my lord. Fair price, fair terms. The farmer agreed. That his crop failed is regrettable but not my concern." He closes his ledger. "If you wish to settle his account, I will accept your coin. Or — if coin is scarce — I would accept the farmer\'s labor for three months. He works my supply wagons, I forgive the debt. But the choice is yours. I am a merchant, not a charity."',
  portraitId: 'merchant',
  options: [
    {
      text: 'PAY THE DEBT',
      effects: { gold: -12 },
    },
    {
      text: 'OFFER EADMUND\'S LABOR',
      effects: { farmers: -2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'DEBT_END_GENEROUS', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'DEBT_END_LABOR_DEAL', weight: 1 }],
    },
  ],
},

{
  id: 'DEBT_CONSEQUENCES',
  chainId: 'THE_DEBT',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Merchant Collects',
  text: 'By week\'s end, Hrothgar\'s men lead Eadmund\'s plough-ox away. Eadmund stands in his empty field, watching them go. His children cluster around his legs. Barnwulf finds you that evening. "The village is talking, my lord. Some say you did right — a lord shouldn\'t pay farmers\' debts. Others say you abandoned a man who had nowhere else to turn." He pauses. "Eadmund still has his house and his hands. He can\'t plough, but he can still earn. Unless you\'d rather take him on directly — give him village work to get back on his feet."',
  portraitId: 'advisor',
  options: [
    {
      text: 'GIVE HIM VILLAGE WORK',
      effects: { gold: -8 },
    },
    {
      text: 'HE\'LL MANAGE',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'DEBT_END_COMPASSION', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'DEBT_END_HARSH_LESSON', weight: 1 }],
    },
  ],
},

{
  id: 'DEBT_END_GENEROUS',
  chainId: 'THE_DEBT',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 25,
  title: 'A Lord\'s Generosity',
  text: 'Eadmund weeps when he hears. His ox stays, his fields will be ploughed, and his children will eat. He swears he will repay you — not in gold, but in grain and loyalty. Hrothgar pockets the coin with a satisfied nod and moves on. Barnwulf watches him go. "You bought one farmer\'s devotion, my lord. But word will spread. Every debtor in the village will soon be at your door, expecting the same." A fair warning. But Eadmund\'s grateful face is hard to regret.',
  portraitId: 'farmer',
  options: [
    {
      text: 'ONE MAN AT A TIME',
      effects: { satisfaction: 3, farmers: 3 },
    },
    {
      text: 'HE\'LL REPAY US',
      effects: { satisfaction: 2, farmers: 4 },
    },
  ],
},

{
  id: 'DEBT_END_LABOR_DEAL',
  chainId: 'THE_DEBT',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 25,
  title: 'The Working Debt',
  text: 'Eadmund spends three months hauling cargo for Hrothgar\'s wagons — backbreaking work that takes him away from his family and his fields. But when he returns, the debt is cleared and his ox still stands in the barn. He is thinner, harder, and he does not quite meet your eyes. "Thank you, my lord," he says. The words are sincere. But there\'s something else in them — the quiet ache of a man who learned exactly how much his dignity is worth.',
  portraitId: 'farmer',
  options: [
    {
      text: 'DEBT IS DEBT',
      effects: { satisfaction: 2, authority: 3 },
    },
    {
      text: 'WELCOME HOME, EADMUND',
      effects: { satisfaction: 3, farmers: 1 },
    },
  ],
},

{
  id: 'DEBT_END_COMPASSION',
  chainId: 'THE_DEBT',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 25,
  title: 'A Hand Extended',
  text: 'Eadmund works the village stores, mends fences, clears ditches — anything you ask. He is not a proud man anymore, but he is a grateful one. Within two months, he has saved enough from the village wages to buy a second-hand ox from a trader passing through. He returns to his fields, poorer but standing. His children wave to you when you pass. Barnwulf notes it quietly: "You didn\'t pay his debt, my lord. But you gave him the means to survive it. That\'s a different kind of generosity."',
  portraitId: 'advisor',
  options: [
    {
      text: 'HE EARNED IT',
      effects: { satisfaction: 3, farmers: 2 },
    },
    {
      text: 'THE VILLAGE TAKES CARE OF ITS OWN',
      effects: { satisfaction: 4 },
    },
  ],
},

{
  id: 'DEBT_END_HARSH_LESSON',
  chainId: 'THE_DEBT',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 25,
  title: 'The Cold Calculus',
  text: 'Without his ox, Eadmund\'s fields lie fallow. He hires himself out as a laborer to neighboring farms, earning barely enough to keep his family fed. His children grow thinner. His wife\'s eyes follow you whenever you pass. The village says nothing openly, but the mood shifts — a subtle coldness from those who remember that you could have helped and chose not to. Barnwulf shrugs. "A lord cannot save every farmer from his own decisions, my lord. But the people have long memories."',
  portraitId: 'farmer',
  options: [
    {
      text: 'LIFE IS HARD',
      effects: { satisfaction: -4, authority: 2 },
    },
    {
      text: 'MAYBE I WAS WRONG',
      effects: { satisfaction: -2, gold: -12, farmers: 3 },
    },
  ],
},


// =========================================================
// CHAIN 5: RUNAWAY_BRIDE – The Unwilling Bride
// Size: S (8 requests: 1 start + 2 members + 5 ends)
//   — STRUCTURAL ADDITION: combat on RUNAWAY_BRIDE_PURSUERS
//     (SHE STAYS option). Cynric's three armored riders are
//     an immediate military threat at the gate.
//     New end: RUNAWAY_BRIDE_END_DEFEATED (combat-loss outcome)
//
// Theme: A young woman flees an arranged marriage to a lord
// in a neighboring territory and seeks sanctuary in the
// player's village. Her father's men follow within days.
// The player must choose between compassion and diplomacy.
//
// Narrative Promise: "Will you shelter her — and at what cost?"
//
// Core Resources: Gold, Satisfaction, Authority, Land Forces
//
// Characters:
//   Aelswith (refugee)        – the runaway
//   Cynric (knight)           – her father's enforcer
//   Barnwulf (advisor)        – unique, counsels the player
//
// Branch Map:
//   START (refugee)
//   ├── [0] GRANT SANCTUARY → PURSUERS (knight)
//   │   ├── [0] SHE STAYS → COMBAT
//   │   │   ├── win  → END_SHELTERED
//   │   │   └── lose → END_DEFEATED  (new)
//   │   └── [1] NAME YOUR PRICE → END_BOUGHT_FREEDOM
//   └── [1] HEAR HER STORY → HER_TALE (refugee)
//       ├── [0] HELP HER ESCAPE → END_NEW_BEGINNING
//       └── [1] SEND WORD TO HER FAMILY → END_RECONCILIATION
// =========================================================

{
  id: 'CHAIN_RUNAWAY_BRIDE_START',
  chainId: 'RUNAWAY_BRIDE',
  chainRole: 'start',
  title: 'The Woman at the Gate',
  text: 'A young woman in a muddied traveling dress collapses at the village gate, exhausted and trembling. She gives her name as Aelswith, daughter of Thane Godric of Hrothscir. "My father has promised me to Lord Beornwulf of Cynweald," she says, fighting tears. "A man three times my age who buried two wives before me. I will not be the third." She clutches your sleeve. "Please, my lord. I need sanctuary. My father\'s men are half a day behind me."',
  portraitId: 'refugee',
  options: [
    {
      text: 'YOU ARE SAFE HERE',
      effects: { satisfaction: 1 },
    },
    {
      text: 'TELL ME EVERYTHING',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'RUNAWAY_BRIDE_PURSUERS', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'RUNAWAY_BRIDE_HER_TALE', weight: 1 }],
    },
  ],
},

{
  id: 'RUNAWAY_BRIDE_PURSUERS',
  chainId: 'RUNAWAY_BRIDE',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Father\'s Men',
  // COMBAT is on option 0 (SHE STAYS).
  // Cynric's three armored riders are an immediate armed threat
  // at the village gate. The player commits landForces.
  // Win → END_SHELTERED. Lose → END_DEFEATED (new).
  // Option 1 (NAME YOUR PRICE) is the non-combat alternative.
  text: 'Three armored riders appear at the gate, led by a scarred man who introduces himself as Cynric, sworn sword to Thane Godric. "You harbor a runaway, my lord. The girl belongs to her father, and her father has given her in lawful marriage to Lord Beornwulf of Cynweald. Hand her over and there will be no trouble." His hand rests on his sword hilt. Behind you, Aelswith watches through a crack in the shutters. Barnwulf whispers: "Refusing will mean steel. But you could offer gold to settle the matter — buy her freedom outright."',
  portraitId: 'knight',
  options: [
    {
      text: 'SHE STAYS',
      effects: {},
      // Combat triggers on this option. followUpsOnWin / followUpsOnLose
      // in the combat spec below replace the regular followUp for index 0.
    },
    {
      text: 'NAME YOUR PRICE',
      effects: { gold: -20 },
    },
  ],
  combat: {
    enemyForces: 3,
    prepDelayMinTicks: 0,
    prepDelayMaxTicks: 0,
    onWin: { authority: 2, satisfaction: 3 },
    onLose: { authority: -4, landForces: -3, satisfaction: -2 },
    followUpsOnWin: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'RUNAWAY_BRIDE_END_SHELTERED', weight: 1 }],
      },
    ],
    followUpsOnLose: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'RUNAWAY_BRIDE_END_DEFEATED', weight: 1 }],
      },
    ],
  },
  followUps: [
    // Only option 1 (NAME YOUR PRICE) — option 0 is handled by combat spec above
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'RUNAWAY_BRIDE_END_BOUGHT_FREEDOM', weight: 1 }],
    },
  ],
},

{
  id: 'RUNAWAY_BRIDE_HER_TALE',
  chainId: 'RUNAWAY_BRIDE',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Aelswith\'s Story',
  text: 'Aelswith speaks quietly, hands folded in her lap. "Lord Beornwulf offered my father fifty gold and a trade agreement for my hand. My father is deep in debt — he could not refuse." She looks up. "I am not foolish, my lord. I know a daughter is a coin in the game of alliances. But Beornwulf\'s second wife died with bruises they blamed on a fall from a horse." Her voice hardens. "I will not go to that house." Barnwulf clears his throat. "You could send her further — to Grentun, where she might start fresh. Or send word to Godric with a compromise. Either way, his men arrive tomorrow."',
  portraitId: 'refugee',
  options: [
    {
      text: 'HELP HER ESCAPE FURTHER',
      effects: { gold: -8, satisfaction: 2 },
    },
    {
      text: 'SEND WORD TO HER FATHER',
      effects: { authority: 3 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'RUNAWAY_BRIDE_END_NEW_BEGINNING', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'RUNAWAY_BRIDE_END_RECONCILIATION', weight: 1 }],
    },
  ],
},

{
  id: 'RUNAWAY_BRIDE_END_SHELTERED',
  chainId: 'RUNAWAY_BRIDE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'Defiance at the Gate',
  text: 'Cynric\'s jaw tightens when he sees your guards standing firm and your blade drawn. He is outnumbered, bruised, and knows it. "Thane Godric will hear of this," he says coldly. "And Lord Beornwulf." He wheels his horse and rides east without another word. Aelswith sinks to her knees in relief. Over the following weeks, she makes herself useful — tending the sick with Dunhild, teaching the children letters. The village adopts her quietly. Somewhere in Hrothscir, a thane curses your name. But here, a woman sleeps safely.',
  portraitId: 'refugee',
  options: [
    {
      text: 'LET THEM CURSE',
      effects: { satisfaction: 4, authority: -3, health: 2 },
    },
    {
      text: 'STRENGTHEN THE WATCH',
      effects: { satisfaction: 2, gold: -15, authority: -3, health: 3 },
    },
  ],
},

{
  id: 'RUNAWAY_BRIDE_END_DEFEATED',
  chainId: 'RUNAWAY_BRIDE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'The Gate Falls',
  text: 'Cynric\'s men are veterans. By the time your guards realize what is happening, two of them are down and Cynric has Aelswith by the arm. "Your mistake, my lord," he says coldly. He ties her horse to his and rides east without looking back. Aelswith does not cry out. She looks at you as she is led away, and in that look is not accusation, but something worse: understanding. You tried. The village watches in silence. Barnwulf says nothing all morning.',
  portraitId: 'knight',
  options: [
    {
      text: 'THIS WILL NOT BE FORGOTTEN',
      effects: { satisfaction: -4, authority: -4 },
    },
    {
      text: 'SEND WORD TO HER FATHER',
      effects: { satisfaction: -2, authority: -2, gold: -15 },
    },
  ],
},

{
  id: 'RUNAWAY_BRIDE_END_BOUGHT_FREEDOM',
  chainId: 'RUNAWAY_BRIDE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'Freedom\'s Price',
  text: 'Cynric counts the gold twice, bites a coin, and nods. "The thane\'s debt is settled. The girl is no longer promised." He rides away without looking back. Aelswith stares at the closed gate, disbelief slowly giving way to something fragile — hope. "You bought my freedom," she says. "I don\'t know how to repay that." Barnwulf watches her go. "Twenty gold for one woman\'s life, my lord. Some would call it extravagant. Others would call it the cheapest thing you ever purchased."',
  portraitId: 'advisor',
  options: [
    {
      text: 'WORTH EVERY COIN',
      effects: { satisfaction: 3, authority: 2 },
    },
    {
      text: 'SHE\'LL REPAY US IN KIND',
      effects: { satisfaction: 2, authority: 2, farmers: 2 },
    },
  ],
},

{
  id: 'RUNAWAY_BRIDE_END_NEW_BEGINNING',
  chainId: 'RUNAWAY_BRIDE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'The Road to Grentun',
  text: 'Before dawn, Osric escorts Aelswith along the western road with provisions, a warm cloak, and a letter of introduction to a cloth merchant in Grentun who owes you a favor. She turns at the crossroads to look back one last time. "If I have a daughter someday, I\'ll name her after this village," she says. Then she is gone. Cynric arrives at noon to find an empty guest room and a lord who professes ignorance. He searches, finds nothing, and rides away furious. A small victory, quietly won.',
  portraitId: 'refugee',
  options: [
    {
      text: 'SAFE TRAVELS, AELSWITH',
      effects: { satisfaction: 3, authority: 2 },
    },
    {
      text: 'WE NEVER SAW HER',
      effects: { satisfaction: 2, gold: 8 },
    },
  ],
},

{
  id: 'RUNAWAY_BRIDE_END_RECONCILIATION',
  chainId: 'RUNAWAY_BRIDE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'A Father\'s Reckoning',
  text: 'Your letter reaches Thane Godric before his men do. You write plainly: his daughter is safe, Beornwulf\'s reputation precedes him, and a forced marriage will bring shame rather than alliance. Godric arrives in person two days later — not with soldiers, but alone. He speaks with Aelswith behind closed doors for an hour. When they emerge, her eyes are red but her shoulders are straight. "The marriage is off," Godric says gruffly. "My daughter will return home — on her own terms." He does not thank you. But as he rides away, Aelswith does.',
  portraitId: 'refugee',
  options: [
    {
      text: 'A GOOD OUTCOME',
      effects: { satisfaction: 4, authority: 4 },
    },
    {
      text: 'DIPLOMACY WINS',
      effects: { satisfaction: 3, authority: 5 },
    },
  ],
},


// =========================================================
// AUTHORITY INFO REQUESTS — SACRED_OAK chain
// Add these to the authorityInfoRequests array.
// These are tickless (advancesTick: false) feedback screens
// shown on the tick after the authority check resolves.
// =========================================================

// --- Add to authorityInfoRequests ---

{
  id: 'SACRED_OAK_AUTH_SUCCESS',
  chainId: 'SACRED_OAK',
  chainRole: 'member',
  canTriggerRandomly: false,
  advancesTick: false,
  title: 'The Priest Falls Silent',
  text: 'Garthric stares at you for a long moment, his staff still raised. Then, slowly, he lowers it. The crowd that had gathered to watch shuffles and looks away. Whatever protest had been forming in their hearts, it dies. Your authority has spoken — quietly but unmistakably. Garthric withdraws to his shrine without another word. The stump at the north edge stands in silence. Whatever the village thinks of the loss, no one says it to your face.',
  portraitId: 'village_priest',
  options: [
    {
      text: 'THE MATTER IS SETTLED',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 1,
      candidates: [{ requestId: 'SACRED_OAK_END_LUMBER_GAINED', weight: 1 }],
    },
  ],
},

{
  id: 'SACRED_OAK_AUTH_FAILURE',
  chainId: 'SACRED_OAK',
  chainRole: 'member',
  canTriggerRandomly: false,
  advancesTick: false,
  title: 'The Sermon of the Stump',
  text: 'Garthric\'s sermon the following morning draws the largest congregation in memory. He says nothing inflammatory — nothing you could punish. But the silence in the hall afterward is different. At the market, people speak more quietly when you pass. The oak may be timber now. But Garthric\'s silence has become louder than the tree ever was. You asserted your authority. He responded with his faith. The village chose its side.',
  portraitId: 'village_priest',
  options: [
    {
      text: 'NOTED',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 1,
      candidates: [{ requestId: 'SACRED_OAK_END_LUMBER_GAINED', weight: 1 }],
    },
  ],
},
