// =========================================================
// LANDFORCES RECRUITMENT CHAINS — Three Military Arcs
//
// Chain 1: OATHSTONE   (S, 10 requests) — no requirements
//          The Calling of Oaths
//          Ancient oaths bind village men to military service.
//
// Chain 2: IRON_PACT   (M, 11 requests) — requires: garrison
//          Blood Coin
//          A mercenary captain arrives with 20 veterans.
//
// Chain 3: IRON_MEET   (M, 12 requests) — requires: garrison + training_yard
//          The Swordmeet of Brandūn
//          A regional tournament to attract elite fighters.
//
// All effect magnitudes are scaled to their respective
// game stage (early / mid / late).
// =========================================================


// =========================================================
// CHAIN 1: OATHSTONE — The Calling of Oaths
// Size: S (10 requests: 1 start + 3 members + 6 ends)
// No building requirements.
//
// Theme: An ancient village custom binds twelve men to
// military service by oath. The player must choose whether
// to invoke the old words and compel them to serve — or
// call for willing volunteers instead.
//
// Narrative Promise: "Will ancient words bind the living to
// your banner, or must you build loyalty coin by coin?"
//
// Core Resources: LandForces, Gold, Authority, Satisfaction
//
// Characters:
//   Hræfnhild (elder)          — keeper of the Oathstone
//   Celdric    (farmer)        — the resistant oath-bound man
//   Feldric    (military_advisor) — advises on military use
//
// Effect Scale: Early game (~tick 1–50)
//   Gold ~50 | LandForces ~5 | Authority ~20
//   landForces gains: +3 to +12
//
// Branch Map:
//   START (elder)
//   ├── [0] INVOKE THE OATHS (authorityCheck + followUpBoosts)
//   │   Base candidates: COMPLIANCE weight:1 / DEFIANCE weight:2
//   │   Authority boosts COMPLIANCE weight (linear, boostValue:3)
//   │   → MEMBER_COMPLIANCE (farmer) — men accept the calling
//   │   │   ├── [0] HONOR WITH A FEAST → END_SWORN_FEAST
//   │   │   └── [1] MARCH THEM STRAIGHT TO DRILL → END_SWORN_MARCH
//   │   → MEMBER_DEFIANCE (farmer) — Celdric refuses, others waver
//   │       ├── [0] FORCE HIM TO SERVE → END_FORCED_SERVICE
//   │       └── [1] LET HIM GO → END_OATH_BROKEN
//   │
//   └── [1] CALL FOR VOLUNTEERS
//       → MEMBER_VOLUNTEERS (guard) — recruiting begins
//           ├── [0] OFFER STEADY WAGE → END_PROFESSIONAL
//           └── [1] APPEAL TO THEIR HONOR → END_DEVOTED_FEW
// =========================================================

// --- Add to eventRequests ---

{
  id: 'OATHSTONE_START',
  chainId: 'OATHSTONE',
  chainRole: 'start',
  title: 'The Stone of Old Oaths',
  text: 'Old Hræfnhild arrives at your hall carrying something wrapped in oilcloth — the Oathstone, a smooth river rock etched with twelve names and the words "Sworn in blood to the mark\'s defense." These twelve men once pledged military service to your predecessors. The oaths were never formally released. "Invoke the stone, my lord," she says quietly, "and they must answer your call. Or seek willing hands, if you prefer a softer road."',
  portraitId: 'elder',
  options: [
    {
      text: 'INVOKE THE OATHS',
      effects: { gold: -5, authority: -1 },
      authorityCheck: {
        minCommit: 0,
        maxCommit: 20,
        followUpBoosts: [
          {
            targetRequestId: 'OATHSTONE_MEMBER_COMPLIANCE',
            boostType: 'linear',
            boostValue: 3,
            description: 'Stärkt die Überzeugungskraft — mehr Männer akzeptieren den Ruf',
          },
        ],
      },
    },
    { text: 'CALL FOR VOLUNTEERS', effects: { gold: -8 } },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      // Authority investment shifts COMPLIANCE from unlikely (1:2) toward likely (4:2)
      candidates: [
        { requestId: 'OATHSTONE_MEMBER_COMPLIANCE', weight: 1 }, // boosted by authority
        { requestId: 'OATHSTONE_MEMBER_DEFIANCE', weight: 2 },
      ],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'OATHSTONE_MEMBER_VOLUNTEERS', weight: 1 }],
    },
  ],
},

{
  id: 'OATHSTONE_MEMBER_COMPLIANCE',
  chainId: 'OATHSTONE',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Men Who Remember',
  text: 'The twelve men receive the summons. Most come without complaint — they remember the oaths they swore and wear them like old armor. Even Celdric arrives at your hall, his young son watching from the doorway. "I said I would come when called," he says, jaw tight. "Here I am." Feldric reviews them with a soldier\'s eye. How will you receive them?',
  portraitId: 'farmer',
  options: [
    { text: 'HONOR THEM WITH A FEAST', effects: { gold: -15, satisfaction: 2 } },
    { text: 'MARCH THEM TO DRILL', effects: { authority: 1 } },
  ],
  followUps: [
    { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'OATHSTONE_END_SWORN_FEAST', weight: 1 }] },
    { triggerOnOptionIndex: 1, delayMinTicks: 1, delayMaxTicks: 3, candidates: [{ requestId: 'OATHSTONE_END_SWORN_MARCH', weight: 1 }] },
  ],
},

{
  id: 'OATHSTONE_MEMBER_DEFIANCE',
  chainId: 'OATHSTONE',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Man Who Refuses',
  text: 'Most of the summoned men arrive quietly. But Celdric does not come. You find him standing in his field with a scythe, wife and two small children at his side. "My oath was to the mark, not to you," he says. "The mark is not in danger. I will not leave my children." The other men who did come watch from a distance to see how you answer.',
  portraitId: 'farmer',
  options: [
    { text: 'FORCE HIM TO SERVE', effects: { gold: -5, satisfaction: -2, authority: 1 } },
    { text: 'LET HIM GO', effects: { satisfaction: 2, authority: -2 } },
  ],
  followUps: [
    { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'OATHSTONE_END_FORCED_SERVICE', weight: 1 }] },
    { triggerOnOptionIndex: 1, delayMinTicks: 1, delayMaxTicks: 3, candidates: [{ requestId: 'OATHSTONE_END_OATH_BROKEN', weight: 1 }] },
  ],
},

{
  id: 'OATHSTONE_MEMBER_VOLUNTEERS',
  chainId: 'OATHSTONE',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Those Who Step Forward',
  text: 'Word spreads through the village that you seek fighters. By the third morning, seven men have knocked at the garrison door — some young and eager, some older with quiet, tested skills. Feldric looks them over carefully. "They\'re raw, most of them. But willing men with proper training are worth more than resentful conscripts." He waits for your decision on how to proceed.',
  portraitId: 'guard',
  options: [
    { text: 'OFFER STEADY WAGE', effects: { gold: -20 } },
    { text: 'APPEAL TO THEIR HONOR', effects: { satisfaction: 1, authority: 1 } },
  ],
  followUps: [
    { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'OATHSTONE_END_PROFESSIONAL', weight: 1 }] },
    { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'OATHSTONE_END_DEVOTED_FEW', weight: 1 }] },
  ],
},

{
  id: 'OATHSTONE_END_SWORN_FEAST',
  chainId: 'OATHSTONE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 35,
  title: 'Bread and Fire',
  text: 'You hold a feast in the village hall. The oath-bound men eat and drink beside your guards. Songs are sung of old victories. Hræfnhild sits in the corner, watching with quiet satisfaction. By dawn they are bound not just by stone and ink, but by the shared warmth of bread and fire. Feldric drills them hard in the weeks that follow, but they take his commands with something approaching pride.',
  portraitId: 'elder',
  options: [
    { text: 'TO THEIR SWORDS', effects: { landForces: 10, satisfaction: 2 } },
    { text: 'AND TO THE MARK', effects: { landForces: 8, authority: 2 } },
  ],
},

{
  id: 'OATHSTONE_END_SWORN_MARCH',
  chainId: 'OATHSTONE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'No Honeyed Words',
  text: 'There is no ceremony. You send the oath-bound men straight to the training yard, where Feldric puts them through their paces without pause. Some resent the lack of recognition and mutter at night. But within a week they are drilled and ready — harder, perhaps, for having no speeches to soften the work.',
  portraitId: 'military_advisor',
  options: [
    { text: 'HARD AND TRUE', effects: { landForces: 12, satisfaction: -1 } },
    { text: 'GIVE THEM A REST DAY', effects: { landForces: 10, health: 1 } },
  ],
},

{
  id: 'OATHSTONE_END_FORCED_SERVICE',
  chainId: 'OATHSTONE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'The Unwilling Sword',
  text: 'Celdric is escorted to the garrison by two guards. His children cry at the gate. The other men say nothing, but they note every detail of how you handled it. In the training yard, Celdric works without complaint, but his eyes are stone-cold. Feldric reports privately that he is one of the most capable fighters in the group — and the most dangerous man to cross.',
  portraitId: 'farmer',
  options: [
    { text: 'HE SERVES THE MARK', effects: { landForces: 6, satisfaction: -3, authority: 2 } },
    { text: 'GIVE HIM EXTRA PAY', effects: { landForces: 6, gold: -10, satisfaction: -1 } },
  ],
},

{
  id: 'OATHSTONE_END_OATH_BROKEN',
  chainId: 'OATHSTONE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 35,
  title: 'Words Without Weight',
  text: 'Celdric returns to his fields and his family. The men who did answer your call are drilled and given their posts, but without Celdric their number is short and their morale uncertain. Some respect your mercy. Others whisper that the Oathstone has been shown to have no teeth — that your word means nothing without the will to enforce it.',
  portraitId: 'farmer',
  options: [
    { text: 'SOME THINGS MATTER MORE', effects: { landForces: 3, satisfaction: 2, authority: -3 } },
    { text: 'THE MARK IS STILL DEFENDED', effects: { landForces: 4, authority: -2 } },
  ],
},

{
  id: 'OATHSTONE_END_PROFESSIONAL',
  chainId: 'OATHSTONE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'Coin Makes Soldiers',
  text: 'The volunteers accept their contracts. Gold changes hands. They are not warriors of great passion, but they are reliable — they show up, follow orders, and do what they are paid to do. Feldric says, only half-joking: "They won\'t die for the mark. But they\'ll fight for it." In the months that follow, they prove steady and capable.',
  portraitId: 'guard',
  options: [
    { text: 'COIN WELL SPENT', effects: { landForces: 8, satisfaction: 1 } },
    { text: 'TRAIN THEM FURTHER', effects: { landForces: 10, gold: -10 } },
  ],
},

{
  id: 'OATHSTONE_END_DEVOTED_FEW',
  chainId: 'OATHSTONE',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 30,
  title: 'Four Hearts, Four Swords',
  text: 'Only four of the seven sign on in the end — but they come with fire in their eyes, inspired by the words you chose about duty and the mark\'s need. Feldric finds himself almost moved. "Fewer than we wanted," he admits. "But they\'ll bleed for this place." A small but fiercely loyal addition to your ranks.',
  portraitId: 'guard',
  options: [
    { text: 'FOUR HEARTS, FOUR SWORDS', effects: { landForces: 5, satisfaction: 3 } },
    { text: 'MAY THEY INSPIRE OTHERS', effects: { landForces: 4, satisfaction: 3, authority: 1 } },
  ],
},


// =========================================================
// CHAIN 2: IRON_PACT — Blood Coin
// Size: M (11 requests: 1 start + 4 members + 6 ends)
// Requires: building:garrison
//
// Theme: Raedwulf, a mercenary captain with twenty veterans,
// arrives at the garrison gate. He claims he broke from
// Grimwulf of Darnscir after a moral dispute. Hire them
// outright, or investigate their past before committing?
//
// Narrative Promise: "Can hired steel become loyal swords —
// or do sellswords serve only the next coin?"
//
// Core Resources: LandForces, Gold, Satisfaction, Authority
//
// Characters:
//   Raedwulf       (mercenary)        — the captain
//   Feldric        (military_advisor) — skeptical but pragmatic
//   Aldric (scout) (scout)            — investigates past
//
// Effect Scale: Mid game (~tick 80–150, garrison built)
//   Gold ~150 | LandForces ~50 | Authority ~80
//   landForces gains: +14 to +22
//
// Branch Map:
//   START (mercenary) [requires: garrison]
//   ├── [0] HIRE THEM OUTRIGHT → MEMBER_ARRIVAL
//   │   ├── [0] FOLD THEM INTO OUR RANKS → END_ELITE_GUARD
//   │   └── [1] LET THEM TRAIN SEPARATELY → END_COLD_CORPS
//   │
//   └── [1] INVESTIGATE FIRST → MEMBER_INQUIRY
//       Probabilistic [3:1] — genuinely uncertain past:
//       ├── 75% → MEMBER_CLEAN_PAST — his story checks out
//       │   ├── [0] HIRE WITH FULL HONORS → END_HONORABLE_HIRE
//       │   └── [1] HIRE AT STANDARD TERMS → END_CAUTIOUS_HIRE
//       └── 25% → MEMBER_DARK_PAST — evidence of atrocity found
//           ├── [0] HIRE ANYWAY → END_DANGEROUS_ALLIES
//           └── [1] TURN THEM AWAY → END_CLEAN_HANDS
// =========================================================

{
  id: 'IRON_PACT_START',
  chainId: 'IRON_PACT',
  chainRole: 'start',
  title: 'Swords at the Gate',
  text: 'Twenty riders stop at the garrison gate at dusk, their horses trail-worn and their armor dented from use. Their captain dismounts — a broad-shouldered man named Raedwulf with a scar across his chin and steady eyes. "We left service with Grimwulf of Darnscir," he says. "He has a talent for unpaid wages and worse orders. We are looking for a lord worth serving." Feldric watches from the wall. "Twenty veterans," he says quietly. "Or twenty liabilities."',
  portraitId: 'mercenary',
  requires: ['building:garrison'],
  options: [
    { text: 'HIRE THEM OUTRIGHT', effects: { gold: -60 } },
    { text: 'INVESTIGATE FIRST', effects: { gold: -20, authority: 1 } },
  ],
  followUps: [
    { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'IRON_PACT_MEMBER_ARRIVAL', weight: 1 }] },
    { triggerOnOptionIndex: 1, delayMinTicks: 3, delayMaxTicks: 5, candidates: [{ requestId: 'IRON_PACT_MEMBER_INQUIRY', weight: 1 }] },
  ],
},

{
  id: 'IRON_PACT_MEMBER_ARRIVAL',
  chainId: 'IRON_PACT',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Veterans in the Yard',
  text: 'Raedwulf\'s twenty men settle into the garrison. They are lean, quiet, and move like veterans — eyes tracking exits and threat angles by reflex. Feldric is grudgingly impressed but keeps his expression neutral. "They fight well," he tells you privately. "The question is whether they\'ll take orders from you the same way they take gold." You must decide how to integrate them.',
  portraitId: 'mercenary',
  options: [
    { text: 'FOLD THEM INTO OUR RANKS', effects: { gold: -20, satisfaction: -1 } },
    { text: 'LET THEM TRAIN SEPARATELY', effects: { gold: -10, authority: 1 } },
  ],
  followUps: [
    { triggerOnOptionIndex: 0, delayMinTicks: 3, delayMaxTicks: 5, candidates: [{ requestId: 'IRON_PACT_END_ELITE_GUARD', weight: 1 }] },
    { triggerOnOptionIndex: 1, delayMinTicks: 3, delayMaxTicks: 5, candidates: [{ requestId: 'IRON_PACT_END_COLD_CORPS', weight: 1 }] },
  ],
},

{
  id: 'IRON_PACT_MEMBER_INQUIRY',
  chainId: 'IRON_PACT',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Questions Along Old Roads',
  text: 'You send your scout Aldric southeast along the old roads to ask questions in the markets and barracks of Darnscir. A week passes before he returns, a saddlebag full of notes and a troubled look on his face. "Raedwulf\'s story is mostly true," he says. "He did break from Grimwulf. But the reason is less clear than he claims." He sets the pages on your table and waits.',
  portraitId: 'scout',
  options: [
    { text: 'SEND ALDRIC BACK FOR MORE', effects: { gold: -10, authority: 1 } },
    { text: 'THIS IS ENOUGH TO GO ON', effects: { gold: -5, satisfaction: 1 } },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      // Probabilistic: Raedwulf's past is genuinely uncertain. Deeper inquiry is more likely
      // to confirm his story is clean, but 25% chance of finding real evidence of past atrocity.
      candidates: [
        { requestId: 'IRON_PACT_MEMBER_CLEAN_PAST', weight: 3 },
        { requestId: 'IRON_PACT_MEMBER_DARK_PAST', weight: 1 },
      ],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [
        { requestId: 'IRON_PACT_MEMBER_CLEAN_PAST', weight: 3 },
        { requestId: 'IRON_PACT_MEMBER_DARK_PAST', weight: 1 },
      ],
    },
  ],
},

{
  id: 'IRON_PACT_MEMBER_CLEAN_PAST',
  chainId: 'IRON_PACT',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Unpaid Wages of Darnscir',
  text: 'The investigation returns clean. Raedwulf\'s men left Grimwulf of Darnscir after a simple dispute over wages owed — three months unpaid after a border campaign. No massacre, no betrayal, just a lord too proud to settle a debt. Feldric is privately relieved, though he won\'t show it. "They\'ll serve well," he allows. "As long as we pay on time." Raedwulf waits for your answer.',
  portraitId: 'mercenary',
  options: [
    { text: 'HIRE WITH FULL HONORS', effects: { gold: -50, satisfaction: 1 } },
    { text: 'HIRE AT STANDARD TERMS', effects: { gold: -30 } },
  ],
  followUps: [
    { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'IRON_PACT_END_HONORABLE_HIRE', weight: 1 }] },
    { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'IRON_PACT_END_CAUTIOUS_HIRE', weight: 1 }] },
  ],
},

{
  id: 'IRON_PACT_MEMBER_DARK_PAST',
  chainId: 'IRON_PACT',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Ashes in Darnscir',
  text: 'Aldric\'s notes surface something Raedwulf did not mention. Two years prior, his company burned a farmstead near the Darn river and left no survivors — at Grimwulf\'s command. Raedwulf claims he rode against the order and arrived too late to stop it. Your scout is uncertain; the evidence is real, but the question of guilt is not. Feldric stares at the notes for a long moment. "Twenty veteran swords," he says at last. "With a stain we may never wash out."',
  portraitId: 'antagonist_villager',
  options: [
    { text: 'HIRE THEM ANYWAY', effects: { gold: -60, satisfaction: -3 } },
    { text: 'TURN THEM AWAY', effects: { authority: 2, satisfaction: 3 } },
  ],
  followUps: [
    { triggerOnOptionIndex: 0, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'IRON_PACT_END_DANGEROUS_ALLIES', weight: 1 }] },
    { triggerOnOptionIndex: 1, delayMinTicks: 1, delayMaxTicks: 3, candidates: [{ requestId: 'IRON_PACT_END_CLEAN_HANDS', weight: 1 }] },
  ],
},

{
  id: 'IRON_PACT_END_ELITE_GUARD',
  chainId: 'IRON_PACT',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'One Force, One Standard',
  text: 'Within a month, Raedwulf\'s veterans have been folded into your garrison so thoroughly that their former mercenary identity has faded. Tensions ran high in the first two weeks — old habits, old loyalties — but Feldric\'s discipline and Raedwulf\'s own quiet authority held the line. What remains is a harder, deeper fighting force than you had before.',
  portraitId: 'military_advisor',
  options: [
    { text: 'THEY ARE OURS NOW', effects: { landForces: 22, satisfaction: 1 } },
    { text: 'DRILL THEM FURTHER', effects: { landForces: 20, gold: -20, health: -1 } },
  ],
},

{
  id: 'IRON_PACT_END_COLD_CORPS',
  chainId: 'IRON_PACT',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'Useful but Distant',
  text: 'Raedwulf\'s men train apart from your regular garrison — professional, capable, and uninvested. They fight for coin, not for the mark. Feldric shrugs: "They\'ll hold a line. Whether they\'ll hold it until the last man is another matter." The village senses the coldness between the two halves of your military. Useful, but not the army you might have built.',
  portraitId: 'mercenary',
  options: [
    { text: 'COIN BUYS SERVICE', effects: { landForces: 15, authority: -1, satisfaction: -2 } },
    { text: 'TRY TO INTEGRATE SLOWLY', effects: { landForces: 14, gold: -20 } },
  ],
},

{
  id: 'IRON_PACT_END_HONORABLE_HIRE',
  chainId: 'IRON_PACT',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 55,
  title: 'The Pact of Equal Standing',
  text: 'You receive Raedwulf with the ceremony he and his men were denied in Darnscir — a formal commission ceremony, flags raised, names recorded in your service rolls. Raedwulf kneels and swears an oath of his own choosing. It is not the Oathstone\'s words, but it is real. His men follow without hesitation. Feldric watches, surprised. "When you give men respect," he says, "you sometimes get more than soldiers in return."',
  portraitId: 'mercenary',
  options: [
    { text: 'THE PACT IS SEALED', effects: { landForces: 20, satisfaction: 2, authority: 2 } },
    { text: 'ASSIGN THEM TO THE FRONTIER', effects: { landForces: 18, authority: 3 } },
  ],
},

{
  id: 'IRON_PACT_END_CAUTIOUS_HIRE',
  chainId: 'IRON_PACT',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'Swords at a Careful Price',
  text: 'You hire Raedwulf\'s veterans at standard mercenary rates — no honors, no ceremony, a clean contract. They accept without complaint. They are professionals, after all. In the weeks that follow, they integrate without friction and perform their duties well. Nothing extraordinary. Nothing troubled. Feldric calls it "adequate," which, from him, is high praise.',
  portraitId: 'mercenary',
  options: [
    { text: 'ADEQUATE AND STEADY', effects: { landForces: 14, satisfaction: 1 } },
    { text: 'REWARD STRONG PERFORMANCE', effects: { landForces: 12, gold: -15, satisfaction: 2 } },
  ],
},

{
  id: 'IRON_PACT_END_DANGEROUS_ALLIES',
  chainId: 'IRON_PACT',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 55,
  title: 'The Tainted Sword',
  text: 'You hire Raedwulf\'s men. They fight and train well — their effectiveness is undeniable. But whispers spread. Some villagers know what Aldric found. Barnwulf says nothing, but his expression says enough. The garrison is stronger. The village is troubled. You have built power with a stone whose weight you will have to carry for a long time.',
  portraitId: 'antagonist_villager',
  options: [
    { text: 'STRENGTH SERVES THE MARK', effects: { landForces: 22, satisfaction: -3, authority: -2 } },
    { text: 'GIVE THEM A CHANCE TO EARN IT', effects: { landForces: 20, satisfaction: -2 } },
  ],
},

{
  id: 'IRON_PACT_END_CLEAN_HANDS',
  chainId: 'IRON_PACT',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'The Road Not Taken',
  text: 'You turn Raedwulf away. He takes the news without a word, simply nods and rides south with his men before sundown. Feldric stares at the empty road for a long moment. You have no new soldiers. But the mark bears no new shadows. Barnwulf says only: "There are other ways to build an army, my lord. Harder ways, perhaps. But yours." He leaves the decision at that.',
  portraitId: 'advisor',
  options: [
    { text: 'WE FIND ANOTHER WAY', effects: { authority: 3, satisfaction: 3 } },
    { text: 'RECRUIT FROM WITHIN', effects: { authority: 2, satisfaction: 2, landForces: 3 } },
  ],
},


// =========================================================
// CHAIN 3: IRON_MEET — The Swordmeet of Brandūn
// Size: M (12 requests: 1 start + 3 members + 6 ends)
// Requires: building:garrison, building:training_yard
//
// Theme: With a full military district behind you, Feldric
// proposes hosting a regional tournament — the Swordmeet —
// to attract elite warriors to your service. Authority
// investment determines whether prestigious fighters arrive.
// A champion named Stonegar issues a personal challenge.
//
// Narrative Promise: "Can glory draw great warriors to your
// banner — or will the tournament reveal the limits of your
// reach?"
//
// Core Resources: LandForces, Gold, Authority, Satisfaction
//
// Characters:
//   Feldric  (military_advisor) — proposes the Swordmeet
//   Stonegar (knight)           — the arriving champion
//   Aldren   (bard)             — announcer, hype-man
//
// Effect Scale: Late game (~tick 180–250, full military district)
//   Gold ~1000 | LandForces ~100 | Authority ~150
//   landForces gains: +15 to +40
//
// Branch Map:
//   START (military_advisor) [requires: garrison, training_yard]
//   ├── [0] HOST THE GRAND SWORDMEET (authorityCheck + followUpBoosts)
//   │   Base: [MEMBER_GRAND_TOURNEY weight:1, MEMBER_POOR_TURNOUT weight:2]
//   │   Authority boosts MEMBER_GRAND_TOURNEY (linear, boostValue:4)
//   │   → MEMBER_GRAND_TOURNEY (knight) — elite warriors arrive
//   │   │   ├── [0] ACCEPT STONEGAR'S CHALLENGE (combat)
//   │   │   │   win  → END_LEGEND_MADE
//   │   │   │   lose → END_HUMBLED_HOST
//   │   │   └── [1] OFFER HIM A COMMISSION → END_CHAMPION_SIGNED
//   │   │
//   │   → MEMBER_POOR_TURNOUT (bard) — few worthy fighters come
//   │       ├── [0] MAKE THE BEST OF IT → END_MODEST_GAINS
//   │       └── [1] POSTPONE & REINVEST → END_DELAYED_GLORY
//   │
//   └── [1] MODEST LOCAL COMPETITION → MEMBER_LOCAL_MEET (guard)
//       ├── [0] REWARD THE WINNERS RICHLY → END_LOCAL_PRIDE
//       └── [1] RECRUIT ALL FINALISTS → END_MASS_RECRUIT
// =========================================================

{
  id: 'IRON_MEET_START',
  chainId: 'IRON_MEET',
  chainRole: 'start',
  title: 'Feldric\'s Proposal',
  text: 'Feldric rolls out a hand-drawn map of the Marken Kaledruns on your table and taps it with a scarred finger. "We have a garrison and a training yard, my lord. We have the infrastructure. What we lack are fighters worthy of it — men with real experience who would choose us over the next lord who calls." He looks up. "A Swordmeet. Host a tournament. Let the best fighters in the region come and prove themselves. Some will want to stay." He pauses. "The greater the prestige of the invitation, the greater the fighters who respond."',
  portraitId: 'military_advisor',
  requires: ['building:garrison', 'building:training_yard'],
  options: [
    {
      text: 'HOST THE GRAND SWORDMEET',
      effects: { gold: -100 },
      authorityCheck: {
        minCommit: 5,
        maxCommit: 50,
        followUpBoosts: [
          {
            targetRequestId: 'IRON_MEET_MEMBER_GRAND_TOURNEY',
            boostType: 'linear',
            boostValue: 4,
            description: 'Erhöht die Wahrscheinlichkeit, dass hochrangige Kämpfer anreisen',
          },
        ],
      },
    },
    { text: 'MODEST LOCAL COMPETITION', effects: { gold: -50 } },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      // Without authority, poor turnout is more likely (2:1).
      // With max authority committed, grand tourney becomes ~71% likely (weight 5:2).
      candidates: [
        { requestId: 'IRON_MEET_MEMBER_GRAND_TOURNEY', weight: 1 }, // boosted by authority
        { requestId: 'IRON_MEET_MEMBER_POOR_TURNOUT', weight: 2 },
      ],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'IRON_MEET_MEMBER_LOCAL_MEET', weight: 1 }],
    },
  ],
},

{
  id: 'IRON_MEET_MEMBER_GRAND_TOURNEY',
  chainId: 'IRON_MEET',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Best of the Marken Kaledruns',
  text: 'They come. From Eorlmark, from Branland, from towns whose names you barely know — riders and footsoldiers and warriors who have spent their lives proving themselves in other lords\' service. The training yard fills with the sound of steel on steel for three days. And then Aldren the bard appears at your hall and announces the one who has distinguished himself above all others: Stonegar of Grimhrycg, a scarred knight with a reputation the size of his broadsword. He has a condition before he agrees to anything. "I want to face your garrison\'s champion in the yard. If you have no champion worth facing, I have no interest in serving."',
  portraitId: 'knight',
  combat: {
    enemyForces: 12,
    prepDelayMinTicks: 0,
    prepDelayMaxTicks: 1,
    onWin: { authority: 4, satisfaction: 3 },
    onLose: { authority: -3, satisfaction: -2 },
    followUpsOnWin: [
      { triggerOnOptionIndex: 0, delayMinTicks: 1, delayMaxTicks: 2, candidates: [{ requestId: 'IRON_MEET_END_LEGEND_MADE', weight: 1 }] },
    ],
    followUpsOnLose: [
      { triggerOnOptionIndex: 0, delayMinTicks: 1, delayMaxTicks: 2, candidates: [{ requestId: 'IRON_MEET_END_HUMBLED_HOST', weight: 1 }] },
    ],
  },
  options: [
    { text: 'ACCEPT HIS CHALLENGE', effects: { gold: -30 } },
    { text: 'OFFER HIM A COMMISSION', effects: { gold: -150 } },
  ],
  followUps: [
    { triggerOnOptionIndex: 1, delayMinTicks: 1, delayMaxTicks: 2, candidates: [{ requestId: 'IRON_MEET_END_CHAMPION_SIGNED', weight: 1 }] },
  ],
},

{
  id: 'IRON_MEET_MEMBER_POOR_TURNOUT',
  chainId: 'IRON_MEET',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Half-Empty Stands',
  text: 'The Swordmeet opens, but the great names did not come. Aldren the bard does his best to lend excitement to the proceedings, but the training yard holds mostly local fighters and one bored mercenary who heard about the prize money. Feldric stands with you and says nothing for a long moment. "Our prestige was not enough to draw the right men," he says at last. "We can make the best of what we have, or postpone the finals and reinvest for next season."',
  portraitId: 'bard',
  options: [
    { text: 'MAKE THE BEST OF IT', effects: { gold: 20, satisfaction: -2 } },
    { text: 'POSTPONE THE FINALS', effects: { gold: -50, authority: 2 } },
  ],
  followUps: [
    { triggerOnOptionIndex: 0, delayMinTicks: 1, delayMaxTicks: 2, candidates: [{ requestId: 'IRON_MEET_END_MODEST_GAINS', weight: 1 }] },
    { triggerOnOptionIndex: 1, delayMinTicks: 2, delayMaxTicks: 4, candidates: [{ requestId: 'IRON_MEET_END_DELAYED_GLORY', weight: 1 }] },
  ],
},

{
  id: 'IRON_MEET_MEMBER_LOCAL_MEET',
  chainId: 'IRON_MEET',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Village Tests Itself',
  text: 'The competition draws only local fighters — village guards, young men with more courage than skill, and a few seasoned farmers who haven\'t held a sword in years. But the mood is celebratory, the crowd enthusiastic. Feldric watches the bouts with honest interest. "These are your people," he says. "Some of them are better than you\'d think." You watch three finalists in particular and wonder whether to reward the best or recruit them all.',
  portraitId: 'guard',
  options: [
    { text: 'REWARD THE WINNERS RICHLY', effects: { gold: -80, satisfaction: 2 } },
    { text: 'RECRUIT ALL FINALISTS', effects: { gold: -120, satisfaction: -1 } },
  ],
  followUps: [
    { triggerOnOptionIndex: 0, delayMinTicks: 1, delayMaxTicks: 3, candidates: [{ requestId: 'IRON_MEET_END_LOCAL_PRIDE', weight: 1 }] },
    { triggerOnOptionIndex: 1, delayMinTicks: 1, delayMaxTicks: 3, candidates: [{ requestId: 'IRON_MEET_END_MASS_RECRUIT', weight: 1 }] },
  ],
},

{
  id: 'IRON_MEET_END_LEGEND_MADE',
  chainId: 'IRON_MEET',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 55,
  title: 'The Name of Brandūn',
  text: 'Your champion defeats Stonegar in the yard. The crowd erupts. Stonegar rises from the dust, wipes blood from his lip, and laughs — a short, genuine sound. "You have a real garrison," he says. He signs your contract that evening, and his fighters, who watched the bout in silence, follow without being asked. Aldren begins composing a ballad before the ink is dry. Word will spread. The name of Brandūn will mean something now.',
  portraitId: 'knight',
  options: [
    { text: 'WELCOME STONEGAR\'S COMPANY', effects: { landForces: 35, satisfaction: 4, authority: 3 } },
    { text: 'MAKE STONEGAR YOUR CAPTAIN', effects: { landForces: 32, authority: 5, gold: -50 } },
  ],
},

{
  id: 'IRON_MEET_END_HUMBLED_HOST',
  chainId: 'IRON_MEET',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 55,
  title: 'Stonegar\'s Price',
  text: 'Your champion is defeated. The crowd goes quiet. Stonegar offers a hand to help him up — no gloating, just professional respect. "Your fighter is good," he says. "Good enough that I\'ll serve you. But my terms have changed." His price is higher now, and he wants it known he was not beaten. Feldric says nothing on the walk back. It cost more than expected. But Stonegar is here, and so are his men.',
  portraitId: 'knight',
  options: [
    { text: 'PAY HIS PRICE', effects: { landForces: 20, gold: -150, authority: -2 } },
    { text: 'NEGOTIATE THE TERMS DOWN', effects: { landForces: 18, gold: -100, authority: -3 } },
  ],
},

{
  id: 'IRON_MEET_END_CHAMPION_SIGNED',
  chainId: 'IRON_MEET',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 55,
  title: 'The Commission Accepted',
  text: 'You bypass the duel entirely and offer Stonegar a formal commission at a price that respects his reputation. He considers for a moment, then nods. "Fair enough. I\'ve had enough sport. I came looking for work." His fighters follow, and the other tournament participants — seeing where Stonegar goes — ask about terms of their own. The Swordmeet has done exactly what Feldric hoped, only through gold rather than glory.',
  portraitId: 'knight',
  options: [
    { text: 'WELCOME THE COMPANY', effects: { landForces: 38, satisfaction: 2 } },
    { text: 'NEGOTIATE DETAILS FURTHER', effects: { landForces: 35, gold: -30, authority: 2 } },
  ],
},

{
  id: 'IRON_MEET_END_MODEST_GAINS',
  chainId: 'IRON_MEET',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 55,
  title: 'What We Had',
  text: 'You make the most of the turnout. Some prize money changes hands; the bored mercenary signs on; three local fighters impress Feldric enough that he drafts them on the spot. It is not the grand windfall you envisioned, but the garrison grows. Feldric rolls up the scorecards and says: "Next time we hold this, our reputation will have grown from it." He means it as comfort. It almost works.',
  portraitId: 'military_advisor',
  options: [
    { text: 'WE BUILD FROM HERE', effects: { landForces: 15, satisfaction: -2 } },
    { text: 'INVEST IN BETTER PRIZES', effects: { landForces: 12, gold: -40, authority: 1 } },
  ],
},

{
  id: 'IRON_MEET_END_DELAYED_GLORY',
  chainId: 'IRON_MEET',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 55,
  title: 'A Promise Made',
  text: 'You halt the tournament before the finals and announce a postponement, citing the need for a more fitting stage. Some fighters leave disappointed. Aldren diplomatically frames it as "ambition demanding a grander canvas." The gold spent on preparations is gone. But the announcement goes out — the Swordmeet of Brandūn will be held again, properly. Feldric says: "We have one chance to do this right." It had better be right.',
  portraitId: 'bard',
  options: [
    { text: 'NEXT TIME WE STRIKE RIGHT', effects: { authority: 3, satisfaction: -3 } },
    { text: 'COMPENSATE THOSE WHO CAME', effects: { authority: 2, gold: -60, satisfaction: -1 } },
  ],
},

{
  id: 'IRON_MEET_END_LOCAL_PRIDE',
  chainId: 'IRON_MEET',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'Heroes of the Mark',
  text: 'The winners are rewarded handsomely and their names spoken at the feast that follows. Two of them are offered positions in the garrison; both accept. The village has found heroes it did not know it had, and the event becomes a story that grows in the retelling — the day the mark tested itself and found it had more strength than it thought. Feldric, for once, does not find something to criticize.',
  portraitId: 'guard',
  options: [
    { text: 'OUR PEOPLE HAVE HEART', effects: { landForces: 18, satisfaction: 3, authority: 2 } },
    { text: 'MAKE IT AN ANNUAL TRADITION', effects: { landForces: 15, satisfaction: 4, gold: -30 } },
  ],
},

{
  id: 'IRON_MEET_END_MASS_RECRUIT',
  chainId: 'IRON_MEET',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 50,
  title: 'Quantity Over Quality',
  text: 'You recruit every finalist regardless of their performance. The garrison swells with warm bodies — enthusiastic, but unevenly skilled. Some are genuinely capable; others will need months of work to be useful. Feldric surveys the new intake with the expression of a man who has been handed too many things at once. "Give me a year," he says, "and I\'ll make soldiers of them. Give me three months and I\'ll make excuses."',
  portraitId: 'military_advisor',
  options: [
    { text: 'QUANTITY HAS ITS OWN QUALITY', effects: { landForces: 25, satisfaction: -2, health: -1 } },
    { text: 'QUALITY-TEST THEM ALL', effects: { landForces: 20, gold: -30, satisfaction: -1 } },
  ],
},
