// =========================================================
// CHAIN: FEVER_PILGRIM – The Sacred Flame
// Size: M (19 requests: 1 start + 7 members + 9 ends + 2 authority info)
//
// Theme: A dying pilgrim collapses at the village gate clutching a sealed clay
// urn he claims holds holy fire from a distant mountain shrine. The healer
// Dunhild warns the fever he carries is lethal and contagious. The priest
// Garthric insists he deserves sanctuary. The player must choose between mercy
// and survival — and find out what is actually inside the urn.
//
// Narrative Promise: "When mercy and survival pull in opposite directions —
// how do you choose?"
//
// Core Resources: Health, Fire Risk, Satisfaction, Authority
// Secondary: Gold (moderate), Farmers (minor)
//
// Characters:
//   The Pilgrim (traveler)        – the feverish stranger
//   Dunhild (healer)              – warns of contagion, treats the sick
//   Garthric (village_priest)     – demands sanctuary and faith
//   Barnwulf (advisor)            – counsels the practical path
//   Oswin (guard)                 – enforces quarantine orders
//
// Branch Map:
//
// START (traveler)
// ├── [0] OPEN THE GATES → HEALER_WARNS (healer)
// │   ├── [0] QUARANTINE HIM → QUARANTINE_DILEMMA (advisor)
// │   │   ├── [0] OPEN URN BY LORD'S ORDER (auth) →
// │   │   │   success → URN_EXAMINED (healer)
// │   │   │     ├── [0] DESTROY IT → END_HARD_MERCY
// │   │   │     └── [1] HONOR THE FLAME → END_FAITHFUL_RISK
// │   │   │   fail → END_FEVER_LOOSE
// │   │   └── [1] LET THE PRIEST TEND TO HIM → SACRED_MOMENT (village_priest)
// │   │       ├── [0] HONOR HIM → END_PEACEFUL_PASSING
// │   │       └── [1] SEAL THE ROOM → END_FIRE_RISK_SEALED
// │   └── [1] TRUST THE PRIEST → FEVER_SPREADS (healer)
// │       ├── [0] FULL QUARANTINE NOW → END_CONTROLLED_OUTBREAK
// │       └── [1] LET THE PRIEST HOLD A CEREMONY → END_DIVINE_GAMBLE
// │
// └── [1] HOLD HIM OUTSIDE → PRIEST_PLEADS (village_priest) [convergent]
//     ├── [0] BRING HIM IN → HEALER_WARNS (convergent ↑ )
//     └── [1] THE GATES STAY SHUT → PILGRIM_WAITS (traveler)
//         ├── [0] SEND DUNHILD TO HIM → END_MERCY_AT_GATES
//         └── [1] MOVE HIM ON → END_COLD_GATES
//
// =========================================================


// ---------------------------------------------------------
// Add the following to the eventRequests array:
// ---------------------------------------------------------

// === ACT 1: THE ARRIVAL ===

{
  id: 'CHAIN_FEVER_PILGRIM_START',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'start',
  title: 'The Sacred Flame',
  text: 'A pilgrim in filthy robes collapses at the village gate just before dusk. He clutches a sealed clay urn to his chest as though his life depends on it — and perhaps it does. Through cracked lips he speaks of "the sacred flame of Marden\'s Hearth," a holy fire he has carried thirty days from a mountain shrine. His forehead blazes with fever. The guards keep their distance, muttering about sickness. Dunhild is already pushing through the crowd, and behind her, Garthric the priest walks with unusual urgency.',
  portraitId: 'traveler',
  options: [
    {
      text: 'OPEN THE GATES',
      effects: {},
    },
    {
      text: 'HOLD HIM OUTSIDE',
      effects: {},
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'FEVER_PILGRIM_HEALER_WARNS', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'FEVER_PILGRIM_PRIEST_PLEADS', weight: 1 }],
    },
  ],
},


// === ACT 2A: OPEN GATES PATH ===

{
  id: 'FEVER_PILGRIM_HEALER_WARNS',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Dunhild\'s Warning',
  text: 'Dunhild examines the pilgrim and draws you aside before Garthric can follow. Her voice is low, without theatrics. "I\'ve seen this fever before — in Harnewick, twelve years ago. Three families dead in a fortnight before anyone understood what it was. He may not last the week. But if this spreads through the village before it burns itself out..." She glances at the sealed urn still pressed against the pilgrim\'s chest. "I cannot tell you what is in that vessel. But I can tell you what is in his blood. Keep him away from the others."',
  portraitId: 'healer',
  options: [
    {
      text: 'QUARANTINE HIM',
      effects: { authority: 1 },
    },
    {
      text: 'TRUST THE PRIEST',
      effects: { satisfaction: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'FEVER_PILGRIM_QUARANTINE_DILEMMA', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'FEVER_PILGRIM_FEVER_SPREADS', weight: 1 }],
    },
  ],
},

{
  id: 'FEVER_PILGRIM_QUARANTINE_DILEMMA',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Priest Protests',
  text: 'Barnwulf finds you in the hall with troubled news. The quarantine is in place — the pilgrim is in the old fulling shed at the edge of the village — but Garthric has spent two days petitioning, praying, and now blocking the door with his body. "He claims the urn contains living fire from the shrine, my lord. He says to open or confiscate it is desecration." Barnwulf pauses. "Dunhild believes she can determine whether the urn is feeding the fever or helping contain it — but only if she can examine it. The priest will not permit her in without your direct order."',
  portraitId: 'advisor',
  options: [
    {
      text: 'OPEN THE URN — LORD\'S ORDER',
      effects: {},
      authorityCheck: {
        minCommit: 8,
        maxCommit: 30,
        minSuccessChance: 40,
        maxSuccessChance: 82,
        onSuccess: { authority: 3 },
        onFailure: { authority: -3, satisfaction: -2 },
        successFeedbackRequestId: 'FEVER_PILGRIM_AUTH_ENFORCE_SUCC',
        failureFeedbackRequestId: 'FEVER_PILGRIM_AUTH_ENFORCE_FAIL',
        refundOnSuccessPercent: 65,
        lossOnFailurePercent: 50,
      },
    },
    {
      text: 'LET THE PRIEST TEND TO HIM',
      effects: { satisfaction: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'FEVER_PILGRIM_SACRED_MOMENT', weight: 1 }],
    },
  ],
},

{
  id: 'FEVER_PILGRIM_URN_EXAMINED',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Seeds and Smoke',
  text: 'Dunhild sets the opened urn on the workbench and stares. Inside — not dangerous fire, not embers, but a small shrine lamp, its wick still burning with a steady, odorless flame. And beneath it, packed in dry cloth: seeds. Hundreds of them. Pale, small, carefully wrapped. "Mountain rue. Fever bark. Pale hyssop," Dunhild breathes, turning one over in her fingers. "This man walked thirty days to bring us medicines we cannot grow in this climate." The pilgrim, propped against the wall, manages a faint smile. "The flame of Marden heals," he says. "It always has." His fever, Dunhild notes, is already breaking.',
  portraitId: 'healer',
  options: [
    {
      text: 'DESTROY THE URN — STILL A RISK',
      effects: { fireRisk: -2 },
    },
    {
      text: 'HONOR THE FLAME — USE THE SEEDS',
      effects: { health: 2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'FEVER_PILGRIM_END_HARD_MERCY', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'FEVER_PILGRIM_END_FAITHFUL_RISK', weight: 1 }],
    },
  ],
},

{
  id: 'FEVER_PILGRIM_FEVER_SPREADS',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'First Cases',
  text: 'Dunhild finds you before dawn. Her face tells the story before she speaks. "Two farmers in the lower quarter. Same flush, same cough." She closes her eyes briefly. "The pilgrim passed through the market before we could act. I should have insisted." She steadies herself. "We can still contain this — but we must move now, before it reaches the children. Or..." She glances toward the pilgrim\'s chamber, where Garthric has been sitting with him through the night. "He is telling the sick that the sacred flame can cure what it carries. I do not believe him. But frightened people will believe almost anything."',
  portraitId: 'healer',
  options: [
    {
      text: 'FULL QUARANTINE — NOW',
      effects: { gold: -15, authority: 1 },
    },
    {
      text: 'LET THE PRIEST HOLD A CEREMONY',
      effects: { satisfaction: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'FEVER_PILGRIM_END_CONTROLLED_OUTBREAK', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 3,
      delayMaxTicks: 5,
      candidates: [{ requestId: 'FEVER_PILGRIM_END_DIVINE_GAMBLE', weight: 1 }],
    },
  ],
},

{
  id: 'FEVER_PILGRIM_SACRED_MOMENT',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'The Last Vigil',
  text: 'Three days pass. The pilgrim does not worsen, but does not improve. The fever holds him at the edge of consciousness. You find Garthric in the fulling shed one evening, reciting prayers in a language older than the village. The pilgrim\'s breathing is shallow but steady. Garthric looks up without surprise. "He told me the flame was given to be lit in a new hearthstone — a founding gift for a settlement that earns it." He pauses. "I believe he came here for a reason, my lord. He won\'t last another week. What we do now will be remembered — by the village, by the shrine, and by us."',
  portraitId: 'village_priest',
  options: [
    {
      text: 'HONOR HIM — LET GARTHRIC FINISH',
      effects: { satisfaction: 2 },
    },
    {
      text: 'SEAL THE ROOM — NO MORE VISITORS',
      effects: { health: 2 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'FEVER_PILGRIM_END_PEACEFUL_PASSING', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'FEVER_PILGRIM_END_FIRE_RISK_SEALED', weight: 1 }],
    },
  ],
},


// === ACT 2B: HOLD OUTSIDE PATH (convergent at HEALER_WARNS) ===

{
  id: 'FEVER_PILGRIM_PRIEST_PLEADS',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'Garthric\'s Plea',
  text: 'Garthric kneels in the mud outside the gate beside the collapsed pilgrim, pressing a cloth to the man\'s brow. He looks up at you, and his voice carries more iron than you have heard from him before. "He carried this flame thirty days through mountain passes and bandit roads. Marden\'s Hearth sends pilgrims to test those who receive them. Turn him away and you answer to the shrine, not just to me." The pilgrim stirs and opens his eyes. "Please," he whispers. "I only need a roof. One night. So the flame does not die." Garthric says nothing more. He does not need to.',
  portraitId: 'village_priest',
  options: [
    {
      text: 'BRING HIM IN',
      effects: { satisfaction: 1 },
    },
    {
      text: 'THE GATES STAY SHUT',
      effects: { authority: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'FEVER_PILGRIM_HEALER_WARNS', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'FEVER_PILGRIM_PILGRIM_WAITS', weight: 1 }],
    },
  ],
},

{
  id: 'FEVER_PILGRIM_PILGRIM_WAITS',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'member',
  canTriggerRandomly: false,
  title: 'A Night at the Gate',
  text: 'The pilgrim has not moved. He sits with his back against the gate post, the clay urn cradled in his lap, his eyes closed in what may be prayer or may be unconsciousness. The gate guards report he has been perfectly still for two hours. By torchlight, you can see the trembling of his chest as he breathes. A runner brings a note from Dunhild: "His fever is critical. He will not survive another night without shelter. And whatever is in that urn will go out in the rain before dawn."',
  portraitId: 'traveler',
  options: [
    {
      text: 'SEND DUNHILD TO HIM',
      effects: { gold: -5 },
    },
    {
      text: 'MOVE HIM ON',
      effects: { authority: 1 },
    },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 2,
      delayMaxTicks: 4,
      candidates: [{ requestId: 'FEVER_PILGRIM_END_MERCY_AT_GATES', weight: 1 }],
    },
    {
      triggerOnOptionIndex: 1,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'FEVER_PILGRIM_END_COLD_GATES', weight: 1 }],
    },
  ],
},


// === ACT 3: ENDINGS ===

// --- Open Gates → Quarantine → Auth Success → Destroy the Urn ---
{
  id: 'FEVER_PILGRIM_END_HARD_MERCY',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'Ashes and Safety',
  text: 'The urn is buried outside the village walls at dawn — ashes, seeds, oil, and all. The pilgrim survives his fever. When he recovers enough to stand, he goes to the place where it was buried and stands there for a long time in silence. "It was the last lamp of its kind," he says finally, without accusation. "But you saved your village." He limps out the east gate the next morning, carrying nothing. Dunhild watches him go. "He\'s not wrong," she says quietly. "But I keep thinking about those seeds."',
  portraitId: 'healer',
  options: [
    {
      text: 'HE UNDERSTOOD',
      effects: { health: 1, fireRisk: -3, satisfaction: -1, authority: 1 },
    },
    {
      text: 'WE HAD NO CHOICE',
      effects: { health: 1, fireRisk: -4, authority: 2, satisfaction: -2 },
    },
  ],
},

// --- Open Gates → Quarantine → Auth Success → Honor the Flame ---
{
  id: 'FEVER_PILGRIM_END_FAITHFUL_RISK',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'The Flame Finds a Home',
  text: 'The pilgrim plants his seeds in the village garden before he leaves — each one pressed into the soil with a reverence that makes even Dunhild pause and say nothing. Garthric names the patch Marden\'s Corner. The herbs that grow there over the following months carry a scent sharp enough to wake the sleeping. Three of them turn out to be the most potent fever medicines Dunhild has ever handled. The pilgrim does not stay to see it. He leaves one morning without notice, his urn empty, his task complete. The shrine lamp burns on, lit now in the village hearthstone.',
  portraitId: 'village_priest',
  options: [
    {
      text: 'THE FLAME BURNS STILL',
      effects: { health: 3, satisfaction: 2, authority: 1 },
    },
    {
      text: 'MARK THE CORNER WELL',
      effects: { health: 4, satisfaction: 1, gold: -5, authority: 1 },
    },
  ],
},

// --- Open Gates → Quarantine → Auth Fail (fever spreads before urn examined) ---
{
  id: 'FEVER_PILGRIM_END_FEVER_LOOSE',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'What Dunhild Feared',
  text: 'The fever moves through the village in the night, finding the families who gathered at the gate when the pilgrim first arrived. Dunhild works without rest for six days. Seven fall ill. Two die — an old man and a small girl whose father brought her to see "the sacred flame." The pilgrim himself recovers and is gone before anyone thinks to ask him more questions. He leaves the clay urn at the gate, still sealed. Garthric buries it in the churchyard. Dunhild says nothing for three days after. When she finally speaks again, it is only to ask for more supplies.',
  portraitId: 'healer',
  options: [
    {
      text: 'THIS CANNOT HAPPEN AGAIN',
      effects: { health: -5, satisfaction: -3, authority: -2, farmers: -2 },
    },
    {
      text: 'SUPPORT DUNHILD',
      effects: { health: -4, satisfaction: -2, authority: -1, gold: -15, farmers: -2 },
    },
  ],
},

// --- Open Gates → Trust Priest → Full Quarantine Now ---
{
  id: 'FEVER_PILGRIM_END_CONTROLLED_OUTBREAK',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'The Fever Line Holds',
  text: 'The quarantine houses fill within two days. Dunhild does not sleep. You deploy resources you cannot spare — food, clean water, medicines — to keep the sick from the healthy. Three more fall ill before the fever stops spreading. The village emerges thinner and more careful about strangers at the gate. Garthric tends to the sick throughout, and comes out of it with a grim authority of his own. "Faith doesn\'t stop illness," he tells the recovering. "But it carries people through it." The pilgrim, recovered, quietly helps tend the last patients until the final bed empties.',
  portraitId: 'healer',
  options: [
    {
      text: 'WE HELD THE LINE',
      effects: { health: -2, satisfaction: -2, gold: -20, authority: 2, farmers: -3 },
    },
    {
      text: 'FREE THE PILGRIM',
      effects: { health: -1, satisfaction: 1, gold: -20, authority: 1, farmers: -3 },
    },
  ],
},

// --- Open Gates → Trust Priest → Let the Ceremony Happen ---
{
  id: 'FEVER_PILGRIM_END_DIVINE_GAMBLE',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'Marden\'s Answer',
  text: 'Garthric leads the ceremony through the night, burning something fragrant in the clay urn. The smell of it carries across the village, and the sick breathe it in through open windows. And then — nothing. Nothing that can be named. The fever takes three people. The rest recover, as fevers will, in their own time. Whether the ceremony helped, or the illness was already burning itself out, no one can say. Garthric does not claim a miracle. He claims only that Marden was present. The pilgrim is gone by morning. The clay urn stands on the hearthstone of the church, empty.',
  portraitId: 'village_priest',
  options: [
    {
      text: 'THE FEVER BROKE',
      effects: { health: -3, satisfaction: 1, farmers: -4 },
    },
    {
      text: 'THREE DEAD — LEARN FROM THIS',
      effects: { health: -4, satisfaction: -2, authority: 1, farmers: -5 },
    },
  ],
},

// --- Open Gates → Quarantine → Let Priest Tend → Honor Him ---
{
  id: 'FEVER_PILGRIM_END_PEACEFUL_PASSING',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'The Flame Goes Out',
  text: 'The pilgrim dies on the sixth night, his fever finally winning what his faith could not. Garthric was with him when it happened and reports that the man asked for only one thing: that the seeds in the urn be planted somewhere they would grow well. The village buries him in the churchyard, a small marker with his name — which nobody knew until then — at his head. Garthric plants the seeds in spring. Three years later, the herbs of Marden\'s Hearth will be known across the march. But that is a story for another season.',
  portraitId: 'village_priest',
  options: [
    {
      text: 'HONOR HIS MEMORY',
      effects: { health: 2, satisfaction: 2, authority: 1 },
    },
    {
      text: 'PLANT THE SEEDS YOURSELF',
      effects: { health: 3, satisfaction: 1, authority: 1, gold: -5 },
    },
  ],
},

// --- Open Gates → Quarantine → Seal the Room ---
{
  id: 'FEVER_PILGRIM_END_FIRE_RISK_SEALED',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'Safe and Silent',
  text: 'The pilgrim spends his final days in isolation. Oswin keeps the door sealed; food and water pass through a gap in the boards. The fever breaks on the ninth day, and when the door opens at last, the pilgrim walks out blinking into the sun. The clay urn is intact. Whatever was inside, only Garthric ever saw it — and he is not sharing. The pilgrim accepts a horse and road rations without comment and leaves by the east gate. Garthric does not speak to you for a week. The village is safe, and healthy, and a little quieter than it used to be.',
  portraitId: 'guard',
  options: [
    {
      text: 'SAFETY FIRST',
      effects: { health: 1, satisfaction: -1, authority: 2, fireRisk: -2 },
    },
    {
      text: 'INVITE GARTHRIC TO SPEAK',
      effects: { health: 1, satisfaction: 1, authority: 1, fireRisk: -2 },
    },
  ],
},

// --- Hold Outside → Priest Pleads → Gates Stay Shut → Send Dunhild ---
{
  id: 'FEVER_PILGRIM_END_MERCY_AT_GATES',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'The Kind Distance',
  text: 'Dunhild tends to the pilgrim through the night from the other side of the gate — medicines passed through the iron bars, instructions called softly through the wood. It is an awkward and imperfect mercy, and the pilgrim accepts it without complaint. At dawn, his fever breaks. He takes the road east, pausing only to press something small through the bars into Dunhild\'s hand: a single seed wrapped in a scrap of cloth. She plants it in the corner of her herb garden. It grows into something she has never seen before. She names it Gate Mercy. It turns out to be an uncommonly good remedy for sleeplessness.',
  portraitId: 'healer',
  options: [
    {
      text: 'MERCY FOUND A WAY',
      effects: { health: 1, satisfaction: 1, fireRisk: -1, gold: -5 },
    },
    {
      text: 'STUDY THE SEED',
      effects: { health: 2, satisfaction: 1, gold: -5 },
    },
  ],
},

// --- Hold Outside → Priest Pleads → Gates Stay Shut → Move Him On ---
{
  id: 'FEVER_PILGRIM_END_COLD_GATES',
  chainId: 'FEVER_PILGRIM',
  chainRole: 'end',
  canTriggerRandomly: false,
  chainRestartCooldownTicks: 40,
  title: 'The Road East',
  text: 'The pilgrim is escorted down the eastern road at first light — far enough that he cannot turn back without being seen. He goes without argument. He does not invoke the shrine or curse the village. He simply walks until the road takes him. Oswin reports, in a tone that carries something heavier than a report, that the clay urn broke when the pilgrim stumbled on a loose stone. He gathered the pieces carefully and kept walking. The gate closes. The village is safe. The thing that was lost has no name and leaves no record.',
  portraitId: 'guard',
  options: [
    {
      text: 'THE VILLAGE IS SAFE',
      effects: { authority: 2, satisfaction: -2, fireRisk: -1 },
    },
    {
      text: 'IT HAD TO BE DONE',
      effects: { authority: 1, satisfaction: -1 },
    },
  ],
},


// ---------------------------------------------------------
// Add the following to the authorityInfoRequests array:
// ---------------------------------------------------------

// Authority feedback for OPEN URN BY LORD'S ORDER (at QUARANTINE_DILEMMA)
{
  id: 'FEVER_PILGRIM_AUTH_ENFORCE_SUCC',
  title: 'The Door Opens',
  text: 'Garthric steps aside. Not willingly — the set of his jaw makes that clear — but when he meets your eyes, he sees something there that he has learned, over the years, not to argue with. He moves. Dunhild enters the fulling shed. The pilgrim watches from his cot, breathing hard, but does not resist. He reaches out and sets the urn on the floor in front of her. "If you must know what the shrine carries," he says quietly, "then look."',
  portraitId: 'village_priest',
  advancesTick: false,
  options: [
    { text: 'CONTINUE', effects: {} },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 0,
      candidates: [{ requestId: 'FEVER_PILGRIM_URN_EXAMINED', weight: 1 }],
    },
  ],
},

{
  id: 'FEVER_PILGRIM_AUTH_ENFORCE_FAIL',
  title: 'Garthric Holds the Line',
  text: 'Garthric plants himself in the doorway and does not move. His voice is quiet but absolute. "You will open that urn over my body, my lord." For a long moment the village watches — and does not move to clear the priest from your path. They watch, and they wait. Your authority meets something older than authority, and falters. The moment passes. The door stays closed. The urn stays sealed.',
  portraitId: 'village_priest',
  advancesTick: false,
  options: [
    { text: 'STAND DOWN', effects: {} },
  ],
  followUps: [
    {
      triggerOnOptionIndex: 0,
      delayMinTicks: 0,
      delayMaxTicks: 2,
      candidates: [{ requestId: 'FEVER_PILGRIM_END_FEVER_LOOSE', weight: 1 }],
    },
  ],
},
  canTriggerRandomly: false,
  canTriggerRandomly: false,
