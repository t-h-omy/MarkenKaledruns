import type { Request } from '../../models';

export const wulfmorPactChainDefs: Request[] = [
  {
    id: 'WULFMOR_PACT_START',
    chainId: 'WULFMOR_PACT',
    chainRole: 'start',
    title: 'The Dying Messenger',
    portraitId: 'traveler',
    text: 'At the western gate your guards drag in a man who collapsed from his horse — two crossbow bolts in his back, Wulfmor fletching. He presses a sealed letter into your hand before losing consciousness. "Skargrim Morborn sends this," he rasps. "Before Thornweard\'s men catch me." He is fading fast. Dunhild gives him hours at best.',
    options: [
      {
        text: 'READ IT',
        effects: {  },
      },
      {
        text: 'LEAVE IT SEALED',
        effects: { satisfaction: -2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_LETTER_READ', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_SEALED_AWAY', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_LETTER_READ',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: false,
    isSingleOptionChainNode: true,
    title: 'The Letter of Skargrim Morborn',
    portraitId: 'advisor',
    text: 'Barnwulf reads it aloud: "My lord — Wulfmor\'s raiding of your roads was not my command. It was Thornweard the Ironhand\'s. His faction grows. If you do nothing, he will unite every band here under his banner and march on you by spring. I offer a different path. Come to the Taern crossing with gold enough to buy my men\'s loyalty, and I will turn Wulfmor\'s spears to face east." Barnwulf sets it down. "Markweard should look at the seal before you trust it fully. But the offer is real enough to consider."',
    options: [
      {
        text: 'CONSIDER IT',
        effects: {  },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_ACT1_CHOICE', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_ACT1_CHOICE',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Wulfmor Question',
    portraitId: 'advisor',
    text: 'Barnwulf lays out the position without sentiment: "Negotiate with Skargrim and we risk being played for gold while Thornweard consolidates. March now and we hit a divided enemy — but we carry the blood of it, and Wulfmor\'s common folk have done nothing to us." Outside, Holbrand Fenwalker breathes his last before dawn. His horse stands riderless at the gate. Wulfmor is two days\' ride west.',
    options: [
      {
        text: 'SEND AN ENVOY',
        effects: { gold: -8 },
      },
      {
        text: 'MARCH ON WULFMOR',
        effects: { landForces: -2, satisfaction: -3 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'WULFMOR_ENVOY_DISPATCHED', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_WAR_COUNCIL', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SEALED_AWAY',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Unopened Letters',
    portraitId: 'traveler',
    text: 'The messenger dies that night, the letter unread. He is buried in the common ground. A week later two grain wagons are found burned on the western road — Wulfmor fletching in the oxen. The message is clear enough without a letter.',
    options: [
      {
        text: 'INVESTIGATE',
        effects: { gold: -6, satisfaction: -2 },
      },
      {
        text: 'REINFORCE THE ROADS',
        effects: { gold: -14, landForces: -1 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'WULFMOR_RAIDS_ESCALATE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'WULFMOR_RAIDS_ESCALATE', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_RAIDS_ESCALATE',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Wulfmor\'s Answer',
    portraitId: 'military_advisor',
    text: 'Feldric rides in dust-covered at dusk. "Six villages in two weeks — coordinated, not opportunistic. Thornweard is testing your resolve. But my scouts spotted a second camp flying a different banner. Two factions. We can still split them — but the window is closing fast." He pauses. "There is also a name I keep hearing from captured outriders. Fennric. Our councilman. The Wulfmor men seem to know when our patrols move before we do."',
    options: [
      {
        text: 'SEND AN ENVOY — NOW',
        effects: { gold: -16, satisfaction: -2 },
      },
      {
        text: 'PREPARE FOR WAR',
        effects: { gold: -12, landForces: -3 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'WULFMOR_ENVOY_DISPATCHED', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_WAR_COUNCIL', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_ENVOY_DISPATCHED',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Envoy Rides West',
    portraitId: 'military_advisor',
    text: 'Feldric selects the envoy personally — a man named Thorntun Gateward, discreet and steady-nerved. "He knows how to read a room," Feldric says. "And how to leave one quickly." The envoy departs before dawn. Three days of silence follow. Hræfnwulf\'s scouts maintain a loose tail on the western road. On the fourth morning, one scout returns alone.',
    options: [
      {
        text: 'HEAR THE REPORT',
        effects: { gold: -4 },
      },
      {
        text: 'SEND MORE SCOUTS',
        effects: { gold: -8, landForces: -1 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_ENVOY_ROAD', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_ENVOY_ROAD', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_ENVOY_ROAD',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Four Days of Silence',
    portraitId: 'scout',
    text: 'Hræfnwulf stands before you with road dust still on his collar. "The envoy reached Wulfmor\'s outer camps. Thornweard\'s men stopped him at the first crossing — we lost sight of him there. But there\'s a second group, moving independently. Skargrim\'s people, I think. They were watching Thornweard\'s men watch our envoy." He hesitates. "It could mean Skargrim is real. It could mean they\'re working together to give us a better trap."',
    options: [
      {
        text: 'HOLD AND WAIT',
        effects: { satisfaction: -2 },
      },
      {
        text: 'SEND HRÆFNWULF IN',
        effects: { gold: -8, landForces: -1 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [
          { requestId: 'WULFMOR_ENVOY_ARRIVES', weight: 3 },
          { requestId: 'WULFMOR_ENVOY_TAKEN', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'WULFMOR_ENVOY_ARRIVES', weight: 3 },
          { requestId: 'WULFMOR_ENVOY_TAKEN', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'WULFMOR_ENVOY_ARRIVES',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Wolf\'s Paw',
    portraitId: 'traveler',
    text: 'Thorntun Gateward rides back carrying a single dried wolf\'s paw — Wulfmor\'s sign of open negotiation, a thing not given lightly. "Skargrim Morborn will meet at the Taern stone crossing in three days, no more than twelve men each side. He was cordial." The envoy pauses. "But I saw something: at the camp\'s edge, a larger armed group under Thornweard\'s banner. They watched us leave. Someone there knew our departure time before we announced it."',
    options: [
      {
        text: 'ACCEPT THE MEETING',
        effects: { gold: -5 },
      },
      {
        text: 'DEMAND MORE ASSURANCES',
        effects: { gold: -5, authority: 2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'WULFMOR_SKARGRIM_ACCEPTS', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_SKARGRIM_ACCEPTS', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SKARGRIM_ACCEPTS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Summit Preparation',
    portraitId: 'advisor',
    text: 'Barnwulf begins preparing the summit arrangements with the care he gives to anything that might get people killed. Provisions, escort selection, the exact wording of your opening position. He pauses over one problem: "The Taern crossing is in open country. If Thornweard\'s outriders hit you on the road, you are two days from the walls." He waits. "So: who goes?"',
    options: [
      {
        text: 'I GO MYSELF',
        effects: { authority: 4 },
        authorityCheck: {
          minCommit: 0,
          maxCommit: 35,
          minSuccessChance: 30,
          maxSuccessChance: 82,
          refundOnSuccessPercent: 65,
          onSuccess: { satisfaction: 3, authority: 4 },
          onFailure: { satisfaction: -3, landForces: -1 },
          successFeedbackRequestId: 'WULFMOR_SUMMIT_PREP_GOOD',
          failureFeedbackRequestId: 'WULFMOR_SUMMIT_PREP_BAD',
          followUpBoosts: [
            {
              targetRequestId: 'WULFMOR_ACCORD_SIGNED',
              boostType: 'linear',
              boostValue: 4,
              description: 'Your personal presence tilts the accord in your favour',
            },
          ],
        },
      },
      {
        text: 'SEND FELDRIC',
        effects: { gold: -6 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_SUMMIT_JOURNEY', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_FELDRIC_GOES', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SUMMIT_PREP_GOOD',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: false,
    isSingleOptionChainNode: true,
    title: 'Word Precedes You',
    portraitId: 'advisor',
    text: 'Word has already spread that you yourself will attend. Barnwulf reports that several of Skargrim\'s moderate supporters sent private messages — they welcome your presence. "They believe you take this seriously, my lord. That matters more than gold to men who have lived a generation without any lord\'s regard."',
    options: [
      {
        text: 'NOTED',
        effects: {  },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_SUMMIT_JOURNEY', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SUMMIT_PREP_BAD',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: false,
    isSingleOptionChainNode: true,
    title: 'Doubts in the Ranks',
    portraitId: 'advisor',
    text: 'Barnwulf returns grim-faced. "The men are uneasy, my lord. Three of your senior soldiers have requested reassignment. They believe it is a trap." The doubt is real — and it will ride with you.',
    options: [
      {
        text: 'RIDE ANYWAY',
        effects: { satisfaction: -2, landForces: -1 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_SUMMIT_JOURNEY', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SUMMIT_JOURNEY',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Two Days West',
    portraitId: 'military_advisor',
    text: 'Feldric rides at your side, saying little. On the second morning you find an outrider\'s body in the ditch — Skargrim\'s mark on the saddle, Thornweard\'s quarrel in the throat. A signal, or a warning, or both. Feldric looks at you. "We can still arrive with a show of force. Or ride in quiet and give Skargrim something to brag about to his people — that you came like a man who trusts."',
    options: [
      {
        text: 'SHOW OF FORCE',
        effects: { landForces: -1, authority: 3 },
      },
      {
        text: 'RIDE IN QUIET',
        effects: { satisfaction: 3 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_SUMMIT_ARRIVAL', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_SUMMIT_ARRIVAL', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SUMMIT_ARRIVAL',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Skargrim Morborn',
    portraitId: 'ruler_enemy_weak',
    text: 'Skargrim Morborn is older than expected — grey-bearded, scarred, with the careful eyes of a man who has survived many lords. He extends a hand without ceremony. "I did not think you would come yourself. That earns you honesty: Thornweard knows of this meeting. We have perhaps two hours." He spreads a map on the crossing stone. "What do you bring me, my lord — gold, or words?"',
    options: [
      {
        text: 'GOLD AND TERMS',
        effects: { gold: -22 },
      },
      {
        text: 'WORDS FIRST',
        effects: { authority: 3 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'WULFMOR_SUMMIT_TALKS', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'WULFMOR_SUMMIT_TALKS', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SUMMIT_TALKS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Negotiation',
    portraitId: 'ruler_enemy_weak',
    text: 'The talks last the better part of an hour, interrupted twice by distant horns that Skargrim\'s men interpret with quick nods and repositioned hands on their swords. The old man drives a hard bargain — not for gold, precisely, but for the shape of the agreement: he wants legitimacy, not charity. "I do not want to be paid," he says at one point. "I want to be recognised." When the final terms appear, they are reasonable. And a horn sounds, closer this time.',
    options: [
      {
        text: 'ACCEPT THE TERMS',
        effects: { gold: -18, satisfaction: 4 },
      },
      {
        text: 'PUSH FOR MORE',
        effects: { authority: 4, satisfaction: -2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_ACCORD_SIGNED', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'WULFMOR_SUMMIT_CRISIS', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SUMMIT_CRISIS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Morborn\'s Patience',
    portraitId: 'ruler_enemy_weak',
    text: 'Skargrim\'s eyes harden. He walks to the river\'s edge and says nothing for a long moment. When he turns back, the horns are closer. "My lord. I have lived thirty years outside every lord\'s grace. I did not come here to be squeezed." His hand is not near his sword — but his men\'s hands are. The situation has reached its tipping point. One word can go either way.',
    options: [
      {
        text: 'YIELD — TAKE HIS TERMS',
        effects: { gold: -18, authority: -2, satisfaction: 3 },
      },
      {
        text: 'HOLD FIRM',
        effects: { authority: 5, satisfaction: -4 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_ACCORD_SIGNED', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 1,
        candidates: [
          { requestId: 'WULFMOR_STANDOFF_HOLDS', weight: 2 },
          { requestId: 'WULFMOR_STANDOFF_BREAKS', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'WULFMOR_STANDOFF_HOLDS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: false,
    isSingleOptionChainNode: true,
    title: 'A Grudging Respect',
    portraitId: 'ruler_enemy_weak',
    text: 'Skargrim studies you for a long, flat moment. Then something in his face settles — not warmth, exactly, but a recalibration. "You don\'t flinch." He returns from the river\'s edge and sits. "Fine. My terms, your wording. Let\'s finish this before Thornweard\'s horns get any louder."',
    options: [
      {
        text: 'SEAL IT',
        effects: {  },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_ACCORD_SIGNED', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_STANDOFF_BREAKS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Crossing Empties',
    portraitId: 'ruler_enemy_weak',
    text: 'Skargrim picks up his map. "I thought you different. Pity." He walks into the treeline without looking back. A horn sounds twenty metres away — not distant anymore. Thornweard\'s advance riders are already on the road. Feldric grabs your arm. "We need to move. Now." The summit is over. Whatever comes next comes with iron.',
    options: [
      {
        text: 'RIDE HARD',
        effects: { landForces: -1, gold: -8, satisfaction: -5 },
      },
      {
        text: 'FIGHT THROUGH',
        effects: { landForces: -3 },
      },
    ],
    combat: {
      enemyForces: 7,
      prepDelayMinTicks: 0,
      prepDelayMaxTicks: 0,
      onWin: { authority: 6, landForces: 2 },
      onLose: { landForces: -5, health: -4, satisfaction: -5 },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 1,
          delayMinTicks: 2,
          delayMaxTicks: 3,
          candidates: [{ requestId: 'WULFMOR_WAR_COUNCIL', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 1,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'WULFMOR_WAR_COUNCIL', weight: 1 }],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_WAR_COUNCIL', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_FELDRIC_GOES',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Feldric at the Taern',
    portraitId: 'military_advisor',
    text: 'Feldric departs before dawn. Four days pass. On the fifth morning he rides back, jaw set in that particular way that means he is suppressing both good and bad news simultaneously.',
    options: [
      {
        text: 'HEAR HIM OUT',
        effects: {  },
      },
      {
        text: 'PREPARE FOR EITHER OUTCOME',
        effects: { gold: -10, landForces: 2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_FELDRIC_REPORT', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_FELDRIC_REPORT', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_FELDRIC_REPORT',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Feldric\'s Report',
    portraitId: 'military_advisor',
    text: '"Skargrim is genuine. I\'m certain of it. But I took liberties — I promised fifteen percent more gold than you authorised, and a written guarantee of non-annexation. It was the only way to hold his moderate faction against Thornweard\'s people who were watching from the treeline the entire time." He sets a signed parchment on the table. "He has already signed. The decision is yours."',
    options: [
      {
        text: 'HONOUR HIS TERMS',
        effects: { gold: -20, satisfaction: 5, authority: -2 },
      },
      {
        text: 'RENEGOTIATE',
        effects: { authority: 4, gold: -5 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_ACCORD_SIGNED', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'WULFMOR_SUMMIT_CRISIS', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_ENVOY_TAKEN',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Envoy Does Not Return',
    portraitId: 'military_advisor',
    text: 'On the sixth day a runner arrives under a white flag bearing a message not from Skargrim — from Thornweard the Ironhand: "Your envoy is alive. He will stay that way if you halt all military movements for thirty days. This is not a negotiation." Feldric reads it twice. "He doesn\'t want peace. He wants time to consolidate while Skargrim\'s faction bleeds. Gateward is leverage, not a prisoner."',
    options: [
      {
        text: 'PAY THE RANSOM',
        effects: { gold: -25, authority: -4, satisfaction: -3 },
      },
      {
        text: 'SEND HRÆFNWULF',
        effects: { landForces: -2, gold: -8 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'WULFMOR_ENVOY_FREED', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'WULFMOR_SCOUT_SUCCEEDS', weight: 2 },
          { requestId: 'WULFMOR_SCOUT_FAILS', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'WULFMOR_SCOUT_SUCCEEDS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Out of the Dark',
    portraitId: 'scout',
    text: 'Hræfnwulf returns after five nights, thin and footsore, with Thorntun Gateward limping at his side. "The camp rotates guards on a two-hour cycle and they have no dogs on the northern perimeter. That is all the information you need." He sets his scout\'s kit on the table and sits down without being invited. Nobody objects. Gateward is alive. He is shaken but functional. "Thornweard talked a great deal," he says. "I\'ll write down everything."',
    options: [
      {
        text: 'DEBRIEF THEM',
        effects: { gold: -5, satisfaction: 4 },
      },
      {
        text: 'REST — THEN DEBRIEF',
        effects: { health: 2, satisfaction: 3 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'WULFMOR_ENVOY_FREED', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'WULFMOR_ENVOY_FREED', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SCOUT_FAILS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Two Men Lost',
    portraitId: 'scout',
    text: 'Hræfnwulf returns alone. He does not speak immediately. When he does, it is brief: "Thornweard moved the envoy before we reached him. I lost two men getting out." He pauses. "Gateward is alive. Thornweard sent a new message — he wants double. And now he knows we tried." He says it without accusation. The facts are enough.',
    options: [
      {
        text: 'PAY THE DOUBLE',
        effects: { gold: -40, authority: -5, satisfaction: -4 },
      },
      {
        text: 'LEAVE HIM',
        effects: { satisfaction: -8, authority: -3, landForces: -1 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_ENVOY_FREED', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_ENVOY_DEAD', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_ENVOY_FREED',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Gateward\'s Intelligence',
    portraitId: 'traveler',
    text: 'Thorntun Gateward\'s written report is three pages of careful observation. Thornweard\'s camp strength, rotation schedules, supply lines — and a detail that makes Barnwulf go still: "During my detention, Thornweard received a written message from inside your settlement. I could not read it, but I saw the seal — your council\'s wax, your council\'s mark." He sets it down. "Someone is feeding him your movements." Skargrim\'s moderate faction, meanwhile, has sent fresh word: the summit offer still stands.',
    options: [
      {
        text: 'ACCEPT THE SUMMIT',
        effects: { gold: -5 },
      },
      {
        text: 'INVESTIGATE FIRST',
        effects: { gold: -8, authority: 3 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'WULFMOR_SKARGRIM_ACCEPTS', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 1,
        candidates: [{ requestId: 'WULFMOR_SKARGRIM_ACCEPTS', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_ENVOY_DEAD',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Gateward\'s End',
    portraitId: 'military_advisor',
    text: 'Hræfnwulf\'s scouts find Thorntun Gateward\'s body on the western road two days later — seated upright against a milestone, hands bound in front of him, no mark of violence. He was left to die of exposure as a lesson. Feldric stands at the map for a long time before he speaks. "That is not a man making rational military calculations. That is a man who wants us angry." He looks at you. "It\'s working."',
    options: [
      {
        text: 'GIVE HIM THE WAR HE WANTS',
        effects: { landForces: -2, satisfaction: -3, authority: 3 },
      },
      {
        text: 'DENY HIM THE SATISFACTION',
        effects: { satisfaction: -5, gold: -10 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_WAR_COUNCIL', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'WULFMOR_WAR_COUNCIL', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_ACCORD_SIGNED',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Pact is Sealed',
    portraitId: 'ruler_enemy_weak',
    text: 'At the Taern crossing, or in Feldric\'s carefully negotiated document, the parchment is signed. It is not a ceremony — it is a transaction between people who have lived long enough to prefer survival. Skargrim looks at you before you part: "Watch your council, my lord. Thornweard knows things he should not know. Someone talks." He says it once and does not repeat it.',
    options: [
      {
        text: 'RETURN TO THE SETTLEMENT',
        effects: { satisfaction: 4, gold: -8 },
      },
      {
        text: 'PRESS SKARGRIM FOR DETAILS',
        effects: { authority: 3, satisfaction: 2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'WULFMOR_MARKWEARD_DISCOVERY', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'WULFMOR_MARKWEARD_DISCOVERY', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_MARKWEARD_DISCOVERY',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: false,
    isSingleOptionChainNode: true,
    title: 'The Wrong Wax',
    portraitId: 'mage_advisor',
    text: 'Markweard enters without knocking. He sets the original letter — the one from Holbrand Fenwalker\'s body — on your table. "I examined the seal. The wax is kaledrunian, not Wulfmor wax. The Morborn mark was pressed into it with a metal cast, not a personal signet." He pauses. "This letter was written by someone who knows Wulfmor\'s marks but is not of Wulfmor. Someone close to you knew of it, and may have forged it to engineer this summit." He waits.',
    options: [
      {
        text: 'SEARCH THE COUNCIL',
        effects: {  },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_SEAL_EXAMINED', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SEAL_EXAMINED',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Council Under Glass',
    portraitId: 'mage_advisor',
    text: 'Markweard\'s search of the council records is methodical and quiet. He takes three days. During that time the council continues its business, unaware — or performing unawareness. On the evening of the third day, Markweard returns with a small wooden box and a very steady voice.',
    options: [
      {
        text: 'OPEN IT',
        effects: {  },
      },
      {
        text: 'CALL THE COUNCIL FIRST',
        effects: { authority: 3 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_FENNRIC_FOUND', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_FENNRIC_FOUND', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_FENNRIC_FOUND',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: false,
    isSingleOptionChainNode: true,
    title: 'Fennric Oathbound',
    portraitId: 'spy_enemy',
    text: 'The box contains a metal cast of the Morborn seal, and three years of correspondence with Thornweard the Ironhand — written in a careful hand recording your troop movements, your treasury levels, your council disagreements, the hour your envoy departed. Fennric Oathbound is in the council hall when you walk in. His face tells you he already knows what you are holding. He does not run. He sits very still, with the composure of a man who prepared for this moment long ago.',
    options: [
      {
        text: 'CONFRONT HIM',
        effects: {  },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_FENNRIC_CONFRONTED', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_FENNRIC_CONFRONTED',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Reckoning of Fennric Oathbound',
    portraitId: 'spy_enemy',
    text: 'Fennric speaks before you do. "You want to understand. I can tell. So I will give you that." He explains without performance: Thornweard had his daughter three years ago. He paid with information to keep her alive. She died anyway, two winters back, and by then the habit of survival had become its own momentum. "I am not a traitor from ideology, my lord. I am one from grief and cowardice. I know the difference." He folds his hands. "I will not beg. Do what you must."',
    options: [
      {
        text: 'PUBLIC TRIAL',
        effects: { authority: 8, satisfaction: -3 },
      },
      {
        text: 'QUIET EXILE',
        effects: { authority: -3, satisfaction: 3, gold: -12 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'WULFMOR_TRIAL_COURT', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_QUIET_REMOVAL', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_TRIAL_COURT',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Trial',
    portraitId: 'spy_enemy',
    text: 'The trial is public — your great hall, benches full, every merchant and farmer and guard who cared to attend. Fennric testifies himself, calmly, without revision. The gallery is divided: some call for his head, some weep openly for a dead girl they never met. Barnwulf presides with the grimness of a man who knows all verdicts here carry cost. The case takes two days. On the evening of the second, the hall goes quiet for the verdict.',
    options: [
      {
        text: 'EXECUTE HIM',
        effects: { authority: 5, satisfaction: -5, landForces: -1 },
      },
      {
        text: 'EXILE HIM',
        effects: { authority: 2, satisfaction: 2, gold: -10 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_EXECUTION', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_EXILE_MARCH', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_EXECUTION',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Morning After',
    portraitId: 'spy_enemy',
    text: 'Fennric is executed at dawn before a quiet crowd. He says nothing at the end. Barnwulf marks it in the record with a notation that will say nothing and communicate everything to anyone who reads it fifty years from now. The council that afternoon is uncomfortable in the particular way of people who agree the right thing was done and cannot look at each other. Word will reach Thornweard before nightfall.',
    options: [
      {
        text: 'PREPARE THE WALLS',
        effects: { gold: -12, landForces: 3, satisfaction: -2 },
      },
      {
        text: 'SEND WORD TO SKARGRIM',
        effects: { gold: -8, satisfaction: 2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_THORNWEARD_LEARNS', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_THORNWEARD_LEARNS', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_EXILE_MARCH',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Road East',
    portraitId: 'spy_enemy',
    text: 'Fennric is escorted east under guard with a purse of coin and a written prohibition from all kaledrunian territories. He walks without looking back. One of the guards reports he wept silently for the first hour, then stopped. Nothing more. Word will reach Thornweard. The question is what he makes of it — mercy he cannot leverage, or weakness he can.',
    options: [
      {
        text: 'ASSUME THE WORST',
        effects: { gold: -14, landForces: 3 },
      },
      {
        text: 'TRUST THE ACCORD',
        effects: { satisfaction: 2, gold: -6 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_THORNWEARD_LEARNS', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_THORNWEARD_LEARNS', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_QUIET_REMOVAL',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'An Empty Chair',
    portraitId: 'spy_enemy',
    text: 'Fennric is gone before the council meets the next morning. His chair stands empty. Barnwulf notes "indisposition" in the record. No one asks. In a settlement this size, people know what they know and weigh what it costs to say it out loud. Thornweard will hear eventually — from the people Fennric sent reports to who will notice he has stopped. How long that takes is uncertain. Hræfnwulf estimates four to six days.',
    options: [
      {
        text: 'USE THE WINDOW',
        effects: { gold: -18, landForces: 4, satisfaction: -2 },
      },
      {
        text: 'HOLD STEADY',
        effects: { satisfaction: 2, gold: -6 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_THORNWEARD_LEARNS', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'WULFMOR_THORNWEARD_LEARNS', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_THORNWEARD_LEARNS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Silence Before the Horn',
    portraitId: 'military_advisor',
    text: 'Feldric arrives before dawn. "Thornweard has assembled every band in Wulfmor under his banner — three hundred spears, marching west. Three days, perhaps four if the road is bad." He unrolls the map. "He is not raiding. This is a siege." His voice is steady, but his hand on the table is white. "We have time to prepare the walls, or time to reach Skargrim. Not both."',
    options: [
      {
        text: 'FORTIFY THE WALLS',
        effects: { gold: -22, landForces: 4, satisfaction: -2 },
      },
      {
        text: 'SEND WORD TO SKARGRIM',
        effects: { gold: -10, satisfaction: 2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_SIEGE_PREPARATION', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [
          { requestId: 'WULFMOR_SKARGRIM_RESPONDS', weight: 3 },
          { requestId: 'WULFMOR_EXILE_PEACE_END', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'WULFMOR_SKARGRIM_RESPONDS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Skargrim\'s Answer',
    portraitId: 'ruler_enemy_weak',
    text: 'Your rider rides hard west. Two days pass. Thornweard\'s outriders have been spotted on the north ridge. The answer, when it comes, arrives by Skargrim\'s own hand — brief: "I will try. I cannot promise. He has more men than I have loyalty left." And then nothing more. Hræfnwulf reports a dust cloud moving east — could be Skargrim\'s people. Could be Thornweard\'s second column.',
    options: [
      {
        text: 'PREPARE THE WALLS — NOW',
        effects: { gold: -18, landForces: 3 },
      },
      {
        text: 'WAIT FOR SKARGRIM',
        effects: { satisfaction: 2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_SIEGE_PREPARATION', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [
          { requestId: 'WULFMOR_SKARGRIM_COMES', weight: 2 },
          { requestId: 'WULFMOR_SKARGRIM_SILENT', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'WULFMOR_SKARGRIM_COMES',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: false,
    isSingleOptionChainNode: true,
    title: 'Forty Spears from the West',
    portraitId: 'ruler_enemy_weak',
    text: 'Skargrim arrives at the gate before dawn with forty men — veterans, quiet, carrying their weapons like tools. "This is what I have," he says without apology. "Thornweard will know I came. He will call me a traitor. After today I have nothing left in Wulfmor except whatever you give me." He walks in through the gate. His men follow. Your garrison watches in silence.',
    options: [
      {
        text: 'WELCOME THEM',
        effects: { landForces: 5, satisfaction: 3 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_SIEGE_PREPARATION', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SKARGRIM_SILENT',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: false,
    isSingleOptionChainNode: true,
    title: 'No Word from the West',
    portraitId: 'military_advisor',
    text: 'No answer comes. Hræfnwulf\'s last report places Skargrim\'s camp disbanded — men scattered north and east, leaderless or already gone to Thornweard\'s banner. Whether Skargrim is dead, captured, or simply out of loyalty to spend is unknown. You are alone on the walls. Feldric says: "It changes nothing tactically. Prepare."',
    options: [
      {
        text: 'PREPARE',
        effects: { gold: -14, landForces: 2, satisfaction: -3 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_SIEGE_PREPARATION', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SIEGE_PREPARATION',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Three Days of Readiness',
    portraitId: 'military_advisor',
    text: 'The settlement prepares with the particular focus of people who have no alternative. Dunhild converts the storehouse into a field hospital. Hræfnwulf\'s scouts range out to give time of approach. Feldric walks the walls twice a day, saying little, noting everything. On the third evening, the valley road fills with torches. From the walls you can count them. Barnwulf stands beside you and does not speak.',
    options: [
      {
        text: 'HOLD THE WALLS',
        effects: { landForces: -2, satisfaction: 2 },
      },
      {
        text: 'ATTEMPT PARLEY',
        effects: { authority: 3, gold: -5 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_SIEGE_CHOICE', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_SIEGE_CHOICE', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SIEGE_CHOICE',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Banners of Thornweard',
    portraitId: 'mercenary',
    text: 'Thornweard rides to the gate himself — alone, unarmed, under a white flag. An act of theatre; his three hundred men are visible on the ridge. "Surrender Wulfmor\'s pact, open your treasury, and kneel. I have no interest in destroying a useful settlement. I have every capability to do so." He waits. He does not repeat himself.',
    options: [
      {
        text: 'DEFEND THE WALLS',
        effects: { landForces: -3 },
      },
      {
        text: 'NEGOTIATE UNDER SIEGE',
        effects: { authority: -5, gold: -12 },
      },
    ],
    combat: {
      enemyForces: 18,
      prepDelayMinTicks: 2,
      prepDelayMaxTicks: 4,
      onWin: { authority: 15, satisfaction: 8, landForces: 5 },
      onLose: { landForces: -10, satisfaction: -10, health: -10, fireRisk: 15 },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'WULFMOR_SIEGE_WON_DIPL', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 0,
          delayMaxTicks: 1,
          candidates: [{ requestId: 'WULFMOR_BREACH_DIPL', weight: 1 }],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [
          { requestId: 'WULFMOR_PARLEY_HOLDS', weight: 2 },
          { requestId: 'WULFMOR_PARLEY_FAILS', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'WULFMOR_PARLEY_HOLDS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Ironhand Hesitates',
    portraitId: 'mercenary',
    text: 'Thornweard comes to the parley tent himself, which surprises everyone including Feldric. He sits across from you and says almost nothing for a long time, studying you with the patience of a man who has watched many lords bluster. Finally: "You\'re not afraid of me." He says it like a finding. He makes no concession. But he does not attack. That night, two thirds of his army simply leave — without Fennric\'s intelligence, he cannot sustain a siege he cannot win quickly. By morning the valley road is empty.',
    options: [
      {
        text: 'SECURE THE ROADS',
        effects: { gold: -10, landForces: -1, satisfaction: 5 },
      },
      {
        text: 'ACCEPT HIS WITHDRAWAL',
        effects: { gold: -8, authority: -3, satisfaction: 3 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_TWIST_REVEAL', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 1,
        candidates: [
          { requestId: 'WULFMOR_THORNWEARD_DEAL_END', weight: 2 },
          { requestId: 'WULFMOR_TWIST_REVEAL', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'WULFMOR_PARLEY_FAILS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Parley Collapses',
    portraitId: 'mercenary',
    text: 'Thornweard stands before you finish speaking. "Pretty words. Empty pockets." He walks back to his lines. Feldric catches your arm. "He\'s going to the walls, my lord. Right now." There is no more time for words. The second attempt at the walls will be harder than the first — Thornweard has used the parley to identify your weakest gate.',
    options: [
      {
        text: 'TO THE WALLS — HOLD EVERYTHING',
        effects: { gold: -14, satisfaction: -4, landForces: 2 },
      },
      {
        text: 'ACCEPT HIS TERMS',
        effects: { gold: -40, authority: -12, satisfaction: -10 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_SIEGE_SECOND', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_PARLEY_TWICE_FAILED_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SIEGE_SECOND',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Eastern Gate',
    portraitId: 'military_advisor',
    text: 'Thornweard hits the eastern gate at dawn — the one his outriders scouted during the parley. The fighting is close and brutal. Feldric holds the breach with reserves. By midday the assault has spent itself, but the gate is damaged and three of your best soldiers are dead. Thornweard withdraws for the second time. This time he does not send a parley flag. This time he sends a burning arrow.',
    options: [
      {
        text: 'REPAIR THE GATE',
        effects: { gold: -18, health: -3, satisfaction: -3 },
      },
      {
        text: 'REINFORCE AND WAIT',
        effects: { gold: -10, landForces: 3, satisfaction: -2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_TWIST_REVEAL', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_TWIST_REVEAL', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SIEGE_WON_DIPL',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Thornweard Breaks',
    portraitId: 'military_advisor',
    text: 'By midday Thornweard\'s assault has cracked — your walls held, your archers harder still. The black wolf banner falls when its bearer falls and does not rise again. Thornweard retreats north with perhaps sixty men. The rest are dead, fled, or kneeling in your courtyard. The valley smells of smoke and iron. Feldric walks the circuit of the walls calling orders in a voice you have never heard before — absolute, enormous. Your people are alive.',
    options: [
      {
        text: 'TEND THE WOUNDED',
        effects: { health: 8, satisfaction: 6, gold: -16 },
      },
      {
        text: 'PRESS THE ADVANTAGE',
        effects: { landForces: -3, gold: -10, authority: 6 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [
          { requestId: 'WULFMOR_TWIST_REVEAL', weight: 3 },
          { requestId: 'WULFMOR_SKARGRIM_ABSENT_END', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [
          { requestId: 'WULFMOR_TWIST_REVEAL', weight: 3 },
          { requestId: 'WULFMOR_SKARGRIM_ABSENT_END', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'WULFMOR_BREACH_DIPL',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Gate Gives',
    portraitId: 'military_advisor',
    text: 'The eastern gate splinters at dawn. Thornweard\'s men pour through — not rampaging, methodical. They are here to take, not burn. Feldric covers your retreat to the keep with the reserves, his sword bloody. You still hold the hall. And Thornweard, you learn from a captured runner, is in the market counting your grain. He wants to harvest you, not bury you. That is a weakness — if you can reach it.',
    options: [
      {
        text: 'DESPERATE SORTIE',
        effects: { landForces: -5 },
      },
      {
        text: 'OPEN TERMS',
        effects: { authority: -10, gold: -35, satisfaction: -8, health: -5 },
      },
    ],
    combat: {
      enemyForces: 10,
      prepDelayMinTicks: 0,
      prepDelayMaxTicks: 1,
      onWin: { authority: 8, satisfaction: 4, landForces: 3 },
      onLose: { landForces: -6, health: -12, satisfaction: -8, gold: -20 },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'WULFMOR_BATTERED_PEACE_DIPL_END', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 0,
          delayMaxTicks: 1,
          candidates: [{ requestId: 'WULFMOR_FALLEN_DIPL_END', weight: 1 }],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_BATTERED_PEACE_DIPL_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_TWIST_REVEAL',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: false,
    isSingleOptionChainNode: true,
    title: 'A Name Without a History',
    portraitId: 'mage_advisor',
    text: 'Markweard enters with a rider\'s message and a second document he holds separately. "From Wulfmor — Skargrim\'s real seal, confirmed." He reads the message aloud: the man calling himself Skargrim Morborn has no record before three years ago in any register of Wulfmor or Grimland. He is, by his own accounting in this letter, Thornweard\'s half-brother. The siege — the letter, the summit, all of it — was Thornweard\'s design. He wanted to see what you would do. He did not expect you to survive it.',
    options: [
      {
        text: 'READ ON',
        effects: {  },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_BROTHERS_TRUTH', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_BROTHERS_TRUTH',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Brothers of Wulfmor',
    portraitId: 'ruler_enemy_weak',
    text: 'Skargrim — whatever his real name is — rides to your gate alone before dawn and is admitted. He looks ten years older than at the Taern crossing. "Thornweard is my brother by blood and my enemy by choice," he says. "I used his plan to build something real. When you negotiated instead of attacking, it disarranged everything he had prepared." He looks at his hands. "I have seventeen people left who trust me. What is Wulfmor to you, my lord — truly?"',
    options: [
      {
        text: 'BACK SKARGRIM',
        effects: { gold: -22, farmers: 5, satisfaction: 4 },
      },
      {
        text: 'ABSORB WULFMOR',
        effects: { gold: -36, authority: 12, farmers: 9, satisfaction: 6 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'WULFMOR_ALLIED_END', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'WULFMOR_ABSORBED_DIPL_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_WAR_COUNCIL',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Council of War',
    portraitId: 'military_advisor',
    text: 'Feldric spreads the maps and does not waste words. "Wulfmor is roughly three hundred men in rough country — infantry, no cavalry, but they know every trail. A swift strike along the main road can reach their central camp in two days hard march. Alternatively, a prolonged siege of their hill-fort at Grimland\'s edge costs more but starves them without risking an ambush in the deep forest." He looks up. "Both have merit. Neither is clean."',
    options: [
      {
        text: 'SWIFT STRIKE',
        effects: { gold: -16, landForces: -3, satisfaction: -2 },
      },
      {
        text: 'PROLONGED SIEGE',
        effects: { gold: -28, satisfaction: -4 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_WAR_PATH_BEGINS', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_SLOW_SIEGE', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_WAR_PATH_BEGINS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The March West',
    portraitId: 'military_advisor',
    text: 'The column moves at dawn — Feldric at the head, Hræfnwulf\'s scouts ranging three hundred metres ahead. Three days of broken country, burned farms at Wulfmor\'s edge, scattered villagers who watch from the trees with expressions you cannot read. On the second evening, Hræfnwulf returns from a ridge with a finding: the main Wulfmor camp is half the size it should be. Thornweard has split his forces. Feldric\'s jaw tightens. "He knew we were coming."',
    options: [
      {
        text: 'PUSH FOR THE CAMP',
        effects: { landForces: -2, gold: -8 },
      },
      {
        text: 'WAIT FOR INTELLIGENCE',
        effects: { gold: -6, satisfaction: -2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_SWIFT_MARCH', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_SWIFT_MARCH', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SWIFT_MARCH',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The First Engagement',
    portraitId: 'military_advisor',
    text: 'The camp is fortified earthwork — nothing permanent, but enough to matter. Thornweard\'s banner flies over the main gate. His missing half is somewhere in the treeline. Feldric outlines two approaches: break the gate directly, or flank through the gully to the northeast and draw out the flanking force before it can hit your column from behind.',
    options: [
      {
        text: 'TAKE THE GATE',
        effects: { landForces: -4 },
      },
      {
        text: 'FLANK THROUGH THE GULLY',
        effects: { gold: -8, landForces: -2 },
      },
    ],
    combat: {
      enemyForces: 14,
      prepDelayMinTicks: 2,
      prepDelayMaxTicks: 4,
      onWin: { authority: 10, satisfaction: 5, landForces: 4 },
      onLose: { landForces: -8, satisfaction: -6, health: -5 },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [
            { requestId: 'WULFMOR_CAMP_TAKEN', weight: 3 },
            { requestId: 'WULFMOR_SWIFT_AMBUSH', weight: 1 },
          ],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 0,
          delayMaxTicks: 1,
          candidates: [{ requestId: 'WULFMOR_RETREAT', weight: 1 }],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [
          { requestId: 'WULFMOR_CAMP_TAKEN', weight: 3 },
          { requestId: 'WULFMOR_SWIFT_AMBUSH', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'WULFMOR_CAMP_TAKEN',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Wulfmor\'s Camp Falls',
    portraitId: 'military_advisor',
    text: 'The camp falls in an afternoon. Among the captured correspondence is a set of letters in a hand you recognise — Fennric Oathbound\'s. Your patrol schedules, treasury levels, council disagreements. And a postscript in Fennric\'s hand: "The letter from Skargrim was mine. He did not write it. I wanted war to bring the settlement low." Feldric sets it on the table. "He\'s in the council hall right now."',
    options: [
      {
        text: 'HOLD THE CAMP — RIDE BACK',
        effects: { gold: -12, landForces: -2, satisfaction: -2 },
      },
      {
        text: 'PURSUE THORNWEARD FIRST',
        effects: { landForces: -3, gold: -8, authority: 3 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_WAR_SEAL_DISCOVERY', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_THORNWEARD_SPLITS', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_THORNWEARD_SPLITS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Pursuit',
    portraitId: 'scout',
    text: 'Hræfnwulf\'s scouts track Thornweard north into the forest margin. He moves fast with a small force — forty men at most, everything else abandoned. After two days, the trail reaches Grimland\'s border. Grimland\'s Ratsältester has already sent word: any armed force entering his lands is an act of aggression. Thornweard knows this. He is using it.',
    options: [
      {
        text: 'CROSS REGARDLESS',
        effects: { landForces: -4, gold: -14, authority: -3 },
      },
      {
        text: 'STOP AT THE BORDER',
        effects: { satisfaction: -3 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'WULFMOR_THORNWEARD_CAUGHT', weight: 2 },
          { requestId: 'WULFMOR_THORNWEARD_ESCAPED', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_WAR_SEAL_DISCOVERY', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_THORNWEARD_CAUGHT',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: false,
    isSingleOptionChainNode: true,
    title: 'The Ironhand in Chains',
    portraitId: 'mercenary',
    text: 'Your men catch Thornweard at a ford, his horse lamed, his forty reduced to eleven. He fights until surrounded and does not beg when taken. In chains, he looks at you with the same measuring expression as always. "I don\'t expect mercy," he says. "But I will tell you everything I know about Fennric Oathbound\'s network if you give me a clean death instead of a cage." He means it. Everything about him means it.',
    options: [
      {
        text: 'BRING HIM HOME',
        effects: { authority: 6 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [
          { requestId: 'WULFMOR_WAR_SEAL_DISCOVERY', weight: 2 },
          { requestId: 'WULFMOR_SWIFT_GLORY_END', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'WULFMOR_THORNWEARD_ESCAPED',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The North Takes Him',
    portraitId: 'scout',
    text: 'The trail vanishes in the broken ridgeline. Thornweard is gone — north, or east, or underground. The last sighting puts him crossing into Grimland with eleven men and no banner. Hræfnwulf reports that local villagers there looked afraid, but also: hopeful. He is not finished. But he is no longer your immediate problem. Feldric marks it on the map. That mark does not go away.',
    options: [
      {
        text: 'FORTIFY THE NORTH ROAD',
        effects: { gold: -16, landForces: 2, satisfaction: -2 },
      },
      {
        text: 'RETURN AND ADDRESS FENNRIC',
        effects: { satisfaction: 2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_WAR_SEAL_DISCOVERY', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_WAR_SEAL_DISCOVERY', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SWIFT_AMBUSH',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Forest Closes',
    portraitId: 'military_advisor',
    text: 'Thornweard\'s second force was waiting — exactly where Fennric\'s reports would have placed your column. Feldric takes an arrow in the shoulder and goes down in the first minute, still shouting orders from the mud. You fight your way back to the road, short forty men. The camp is taken regardless, but the cost is wrong. Feldric grips your arm from the cart: "I need a week. Don\'t do anything final without me. Please." His face is grey.',
    options: [
      {
        text: 'HOLD POSITION',
        effects: { gold: -22, health: -5, satisfaction: -4 },
      },
      {
        text: 'PUSH THROUGH',
        effects: { landForces: -4, health: -8, gold: -12 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 5,
        delayMaxTicks: 7,
        candidates: [{ requestId: 'WULFMOR_WAR_SEAL_DISCOVERY', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_WAR_SEAL_DISCOVERY', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_RETREAT',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Ordered Retreat',
    portraitId: 'military_advisor',
    text: 'The assault fails — not a rout, but a bloody withdrawal to a defensible ridge. Feldric holds the line with the calm of a man who has retreated before and survived it. "We still have numbers," he says at the ridge. "We lost the gate approach, not the campaign." He outlines two paths forward: regroup for a second assault, or redirect to the prolonged siege of the hill-fort. "We can still win this. It costs more now."',
    options: [
      {
        text: 'REGROUP AND STRIKE AGAIN',
        effects: { gold: -14, landForces: -2, health: -3 },
      },
      {
        text: 'SHIFT TO PROLONGED SIEGE',
        effects: { gold: -18, satisfaction: -3 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'WULFMOR_SWIFT_MARCH', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_SLOW_SIEGE', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SLOW_SIEGE',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Hill-Fort at Grimland\'s Edge',
    portraitId: 'military_advisor',
    text: 'The hill-fort siege is patient and miserable in the way only sieges can be: slow hunger replacing fast dying. Thornweard\'s garrison holds longer than expected — they have stockpiled. Feldric coordinates the encirclement methodically, cutting supply lines one by one. By the second week, desertion begins. By the third, sickness. The question is whether your own supply lines hold longer than theirs.',
    options: [
      {
        text: 'PRESS THE BLOCKADE',
        effects: { gold: -20, landForces: -2, satisfaction: -3 },
      },
      {
        text: 'OFFER TERMS TO THE GARRISON',
        effects: { gold: -12, authority: 3 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'WULFMOR_SIEGE_WEEKS', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 4,
        candidates: [{ requestId: 'WULFMOR_SIEGE_WEEKS', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SIEGE_WEEKS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Grinding',
    portraitId: 'scout',
    text: 'Hræfnwulf intercepts a message leaving the fort: the first overture from within, a minor captain offering to open the postern gate in exchange for his life and his family\'s safe passage. Feldric\'s position is tactically improving — but your settlement is three days\' march away and has been running without you for weeks. Barnwulf\'s last rider reported minor unrest in the market district.',
    options: [
      {
        text: 'TAKE THE CAPTAIN\'S OFFER',
        effects: { gold: -14, satisfaction: -2 },
      },
      {
        text: 'CONTINUE THE BLOCKADE',
        effects: { gold: -20, satisfaction: -4, health: -2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_GARRISON_CRACKS', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'WULFMOR_GARRISON_CRACKS', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_GARRISON_CRACKS',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Fort Opens',
    portraitId: 'military_advisor',
    text: 'On the thirty-second day the inner gate opens from within. Thornweard is gone — escaped through a postern three nights prior. The garrison surrenders in small groups, hollow-eyed and ready to be done with it. What remains of the fort is yours. Among the captain\'s intelligence: a name. Fennric Oathbound. Letters. Three years of them.',
    options: [
      {
        text: 'SECURE THE FORT',
        effects: { gold: -16, authority: 9, landForces: -2, satisfaction: 3 },
      },
      {
        text: 'LEAVE IT — RIDE FOR HOME',
        effects: { satisfaction: 3, gold: -6 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [
          { requestId: 'WULFMOR_WAR_SEAL_DISCOVERY', weight: 2 },
          { requestId: 'WULFMOR_SLOW_GLORY_END', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [
          { requestId: 'WULFMOR_WAR_SEAL_DISCOVERY', weight: 2 },
          { requestId: 'WULFMOR_SLOW_GLORY_END', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'WULFMOR_WAR_SEAL_DISCOVERY',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: false,
    isSingleOptionChainNode: true,
    title: 'The Forged Letter',
    portraitId: 'mage_advisor',
    text: 'Markweard meets you on the road back with the captured correspondence laid out on a campaign table. "Fennric forged the original letter — the one Holbrand Fenwalker carried. He did not do it alone. Thornweard supplied the cast and the wax. Fennric supplied the access and the timing." He sets one more document down. "Fennric is in the council hall, my lord. He does not know we have this yet."',
    options: [
      {
        text: 'RIDE HOME',
        effects: { gold: -6 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_FENNRIC_WAR_CONFRONTED', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_FENNRIC_WAR_CONFRONTED',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Fennric at the Table',
    portraitId: 'spy_enemy',
    text: 'Fennric is sitting at the council table when you walk in with the letters. He looks at them — then at you — and does not speak immediately. When he does, his voice is level: "How much do you know?" It is not defiance. It is a man assessing what remains to confess and what is already past saving. He folds his hands. Whatever composure costs him, he is paying it.',
    options: [
      {
        text: 'IMPRISON HIM',
        effects: { authority: 6, satisfaction: -3, gold: -8 },
      },
      {
        text: 'TURN HIM — USE HIS KNOWLEDGE',
        effects: { authority: 3, satisfaction: -2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_FENNRIC_IMPRISONED', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_FENNRIC_TURNED', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_FENNRIC_IMPRISONED',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'A Locked Door',
    portraitId: 'spy_enemy',
    text: 'Fennric goes to a cell without protest. He sleeps the first night, which Barnwulf finds more troubling than weeping would have been. News reaches you two days later through channels you trust: Thornweard has learned of his imprisonment — not through any remaining contact of Fennric\'s, but through the kind of open-secret knowledge that travels in any settlement large enough to have taverns. He is moving.',
    options: [
      {
        text: 'PREPARE THE SETTLEMENT',
        effects: { gold: -18, landForces: 4, satisfaction: -2 },
      },
      {
        text: 'SEND WORD TO SKARGRIM',
        effects: { gold: -10, satisfaction: 2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_THORNWEARD_LEARNS_WAR', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_THORNWEARD_LEARNS_WAR', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_FENNRIC_TURNED',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'A Controlled Asset',
    portraitId: 'spy_enemy',
    text: 'Fennric agrees to send controlled reports to Thornweard — accurate enough to be credible, skewed enough to be useful. He is, as Markweard observes dryly, "very good at this." For three days the deception holds. On the fourth day, Thornweard sends back a message that contains a detail no skewed report could have given him — he has a second source. Somewhere. Fennric, who did not know this, goes pale when you show him. "He never told me," he says quietly. That may even be true.',
    options: [
      {
        text: 'SEAL THE SETTLEMENT',
        effects: { gold: -16, landForces: 3, satisfaction: -3 },
      },
      {
        text: 'USE THE DECEPTION ONE LAST TIME',
        effects: { authority: 4, gold: -8 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [{ requestId: 'WULFMOR_THORNWEARD_LEARNS_WAR', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 2,
        delayMaxTicks: 3,
        candidates: [
          { requestId: 'WULFMOR_THORNWEARD_LEARNS_WAR', weight: 3 },
          { requestId: 'WULFMOR_ENVOY_MARTYRED_END', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'WULFMOR_THORNWEARD_LEARNS_WAR',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Thornweard Moves',
    portraitId: 'military_advisor',
    text: 'Feldric arrives at midnight. "Thornweard has assembled a force — smaller than before, eighty to a hundred men, but moving with purpose. He knows your walls. He knows your garrison size." He pauses. "He is not coming to siege. He is coming to break something specific and leave. We need to be ready." Hræfnwulf gives him three days.',
    options: [
      {
        text: 'MEET HIM IN THE FIELD',
        effects: { landForces: -4, gold: -12 },
      },
      {
        text: 'DEFEND THE WALLS',
        effects: { gold: -14, landForces: 2 },
      },
    ],
    combat: {
      enemyForces: 12,
      prepDelayMinTicks: 2,
      prepDelayMaxTicks: 3,
      onWin: { authority: 12, satisfaction: 8, landForces: 3 },
      onLose: { landForces: -7, satisfaction: -7, health: -6 },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'WULFMOR_SIEGE_WON_WAR', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 0,
          delayMaxTicks: 1,
          candidates: [{ requestId: 'WULFMOR_BREACH_WAR', weight: 1 }],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 1,
        delayMaxTicks: 2,
        candidates: [{ requestId: 'WULFMOR_SIEGE_CHOICE_WAR', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SIEGE_CHOICE_WAR',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The Hundred at the Gate',
    portraitId: 'mercenary',
    text: 'Thornweard\'s force is smaller this time, but more purposeful. He does not ride forward for a parley. He hits the eastern gate directly at dawn. Feldric\'s dispositions hold the first assault. The second comes two hours later. By noon the situation is clear: Thornweard is not trying to take the settlement — he is trying to exhaust it. To bleed you until you open the gate to make it stop.',
    options: [
      {
        text: 'HOLD EVERY WALL',
        effects: { landForces: -3 },
      },
      {
        text: 'OPEN TERMS',
        effects: { authority: -10, gold: -35, satisfaction: -8 },
      },
    ],
    combat: {
      enemyForces: 10,
      prepDelayMinTicks: 1,
      prepDelayMaxTicks: 2,
      onWin: { authority: 10, satisfaction: 7, landForces: 2 },
      onLose: { landForces: -6, satisfaction: -8, health: -5 },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'WULFMOR_SIEGE_WON_WAR', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 0,
          delayMaxTicks: 1,
          candidates: [{ requestId: 'WULFMOR_BREACH_WAR', weight: 1 }],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_BATTERED_PEACE_WAR_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_SIEGE_WON_WAR',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Thornweard Driven Off',
    portraitId: 'military_advisor',
    text: 'Thornweard withdraws at dusk, leaving roughly a third of his force behind — dead, wounded, or simply done. Feldric walks the walls in the long quiet that follows a fight. "That was his last throw," he says. "He hasn\'t the men for another." He says it like a diagnosis. A rider arrives from the west at nightfall: Skargrim, with a note. "The west is yours. Tell me what you want it to be."',
    options: [
      {
        text: 'CLAIM WULFMOR',
        effects: { gold: -30, authority: 14, farmers: 10, satisfaction: 6 },
      },
      {
        text: 'INSTALL SKARGRIM',
        effects: { gold: -20, farmers: 6, satisfaction: 8, authority: 4 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'WULFMOR_AFTERMATH_WAR', weight: 1 }],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [{ requestId: 'WULFMOR_AFTERMATH_WAR', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_AFTERMATH_WAR',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'The West Settles',
    portraitId: 'advisor',
    text: 'Barnwulf administers the settlement\'s new western arrangement with the methodical competence that makes him indispensable. There are disputes over land tenure, arguments about mill rights, and one near-violent confrontation over a debt that predates the war by a decade. He resolves each without summoning you. Skargrim — whether as Ratsältester of an allied Wulfmor or as an advisor under your colors — proves quietly remarkable at administration. Thornweard\'s mark stays on the northern map. That mark does not go away.',
    options: [
      {
        text: 'RECEIVE THE WEST',
        effects: { gold: 20, satisfaction: 6, farmers: 4 },
      },
      {
        text: 'FORTIFY AGAINST HIS RETURN',
        effects: { gold: -16, landForces: 5, satisfaction: 2 },
      },
    ],
    followUps: [
      {
        triggerOnOptionIndex: 0,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'WULFMOR_ABSORBED_WAR_END', weight: 2 },
          { requestId: 'WULFMOR_GLORY_WAR_END', weight: 1 },
        ],
      },
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 3,
        delayMaxTicks: 5,
        candidates: [
          { requestId: 'WULFMOR_OCCUPATION_WAR_END', weight: 2 },
          { requestId: 'WULFMOR_RESTORED_WAR_END', weight: 1 },
        ],
      },
    ],
  },

  {
    id: 'WULFMOR_BREACH_WAR',
    chainId: 'WULFMOR_PACT',
    chainRole: 'member',
    canTriggerRandomly: false,
    advancesTick: true,
    title: 'Through the Wall',
    portraitId: 'military_advisor',
    text: 'The gate holds until the third assault — then it doesn\'t. Feldric holds the inner yard with whatever remains. Thornweard\'s men are not burning; they are taking. Grain, tools, livestock. Feldric looks at you across the chaos: "We still have the keep. We still have men. I can get you out of this — but it will cost everything we have left."',
    options: [
      {
        text: 'EVERYTHING WE HAVE',
        effects: { landForces: -5 },
      },
      {
        text: 'ACCEPT THORNWEARD\'S TERMS',
        effects: { authority: -10, gold: -40, satisfaction: -8, health: -4 },
      },
    ],
    combat: {
      enemyForces: 8,
      prepDelayMinTicks: 0,
      prepDelayMaxTicks: 0,
      onWin: { authority: 8, satisfaction: 5, landForces: 2 },
      onLose: { landForces: -5, health: -12, satisfaction: -10, gold: -20 },
      followUpsOnWin: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: 'WULFMOR_BATTERED_PEACE_WAR_END', weight: 1 }],
        },
      ],
      followUpsOnLose: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 0,
          delayMaxTicks: 1,
          candidates: [{ requestId: 'WULFMOR_FALLEN_WAR_END', weight: 1 }],
        },
      ],
    },
    followUps: [
      {
        triggerOnOptionIndex: 1,
        delayMinTicks: 0,
        delayMaxTicks: 0,
        candidates: [{ requestId: 'WULFMOR_BATTERED_PEACE_WAR_END', weight: 1 }],
      },
    ],
  },

  {
    id: 'WULFMOR_ALLIED_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    title: 'An Ally in the West',
    portraitId: 'ruler_enemy_weak',
    text: 'Skargrim Morborn — whoever he really is — rides west with gold, timber, and a written charter granting Wulfmor the status of allied freeland under your protection. His seventeen become thirty, then eighty, as bands that followed Thornweard drift back toward a leader who survived by being something other than brutal. The raids stop. The western road reopens. Barnwulf marks it in the ledger: "Wulfmor — hostile, resolved to neutral-allied." Skargrim sends no further messages. His silence is its own kind of gratitude.',
    options: [
      {
        text: 'LET THE WEST REST',
        effects: { gold: 16, satisfaction: 7, farmers: 4, authority: 5 },
      },
      {
        text: 'OPEN A TRADE ROUTE',
        effects: { gold: -12, satisfaction: 10, farmers: 6, authority: 3 },
      },
    ],
  },

  {
    id: 'WULFMOR_ABSORBED_DIPL_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    isSingleOptionChainNode: true,
    title: 'The Western March',
    portraitId: 'ruler_enemy_weak',
    text: 'The absorption is messier than the ceremony implies — disputes over land tenure, arguments about mill rights, one near-violent confrontation Barnwulf resolves with the patience of a saint. But by the end of it Wulfmor\'s families are fed from your granaries, their veterans wear your colours, and the western road is the safest it has been in living memory. Skargrim accepts an advisory post, which he performs with quiet and devastating accuracy.',
    options: [
      {
        text: 'RECEIVE THEM AS YOUR OWN',
        effects: { gold: 22, satisfaction: 10, farmers: 10, authority: 12, landForces: 5 },
      },
    ],
  },

  {
    id: 'WULFMOR_BATTERED_PEACE_DIPL_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    title: 'The Cost of Survival',
    portraitId: 'advisor',
    text: 'The terms Thornweard accepts are not generous — a payment, a withdrawal, a promise with no enforcement mechanism. He rides away with your gold and your people\'s dignity. Barnwulf does not comment. Feldric, recovering from his wound, says: "We\'re alive, my lord. That is not nothing." In the weeks that follow you rebuild the gate. The grain is short but survives the winter. Your people ask fewer questions than expected. They have lived through worse.',
    options: [
      {
        text: 'REBUILD AND ENDURE',
        effects: { gold: -22, satisfaction: 4, health: 5, fireRisk: -5 },
      },
      {
        text: 'CALL FOR RECKONING',
        effects: { authority: 6, satisfaction: 6, gold: -12 },
      },
    ],
  },

  {
    id: 'WULFMOR_FALLEN_DIPL_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    isSingleOptionChainNode: true,
    title: 'Thornweard\'s Settlement',
    portraitId: 'mercenary',
    text: 'The Ironhand does not burn your settlement — burning is for men who want nothing from the ashes. He takes instead. Grain, gold, livestock, two thirds of your military stores. He leaves the walls standing and your banner still flying in a gesture of pointed contempt: you are too broken to trouble him and too useful broken to destroy. Barnwulf sets the remaining ledger before you without speaking. The numbers are honest in a way that words cannot be. You are not finished. But the road back is long, and it starts from a very low place.',
    options: [
      {
        text: 'BEGIN AGAIN',
        effects: { gold: -42, satisfaction: -10, health: -8, authority: -14 },
      },
    ],
  },

  {
    id: 'WULFMOR_ABSORBED_WAR_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    title: 'Wulfmor Under Your Colours',
    portraitId: 'military_advisor',
    text: 'Your banner flies over what was Wulfmor\'s central camp. The occupation is organised by Feldric with careful, expensive competence. Skargrim serves in the administration. He proves, in the way that surprises no one who paid attention, quietly remarkable at it. Somewhere north of Grimland, Thornweard is alive. Feldric\'s mark on the map does not go away. But today — today the west is yours.',
    options: [
      {
        text: 'HOLD THE WEST',
        effects: { gold: -16, authority: 12, satisfaction: 6, farmers: 7, landForces: 4 },
      },
      {
        text: 'FORTIFY AGAINST RETURN',
        effects: { gold: -26, authority: 14, landForces: 7, satisfaction: 4 },
      },
    ],
  },

  {
    id: 'WULFMOR_RESTORED_WAR_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    isSingleOptionChainNode: true,
    title: 'Wulfmor Restored',
    portraitId: 'ruler_enemy_weak',
    text: 'Skargrim\'s charter is signed in your hall with no ceremony. He accepts it with a nod and rides back west before sundown. Within a month, the western road is open. Within two, Skargrim\'s eighty have grown to three hundred — Wulfmor\'s scattered people returning to something that looks like order. The raids do not return. That is all anyone was ever asking for. The rest, Skargrim manages himself.',
    options: [
      {
        text: 'TWO SEASONS OF QUIET',
        effects: { gold: 18, satisfaction: 9, farmers: 5, health: 2 },
      },
    ],
  },

  {
    id: 'WULFMOR_OCCUPATION_WAR_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    title: 'An Unfinished War',
    portraitId: 'military_advisor',
    text: 'Wulfmor\'s camp is yours, Thornweard\'s men are scattered, and Skargrim\'s people move back into the west like water finding its level. The western road is open. But Feldric keeps Thornweard\'s position marked on the northern map in red, and he does not remove it. "He will come back," he says, not as a prediction but as a professional observation. "We will be ready." The mark stays on the map.',
    options: [
      {
        text: 'HOLD THE WEST',
        effects: { gold: -14, authority: 10, satisfaction: 5, farmers: 5 },
      },
      {
        text: 'WATCH THE NORTH ROAD',
        effects: { gold: -22, landForces: 6, authority: 8 },
      },
    ],
  },

  {
    id: 'WULFMOR_GLORY_WAR_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    isSingleOptionChainNode: true,
    title: 'The Ironhand in Your Hall',
    portraitId: 'mercenary',
    text: 'Thornweard the Ironhand is brought into your hall in chains and made to kneel — not from cruelty, but because some rituals exist for the people watching, not the man performing them. Your survivors line the walls. The grain stores are low. The gate is newly rebuilt. The faces are not defeated. Thornweard, kneeling, looks up at you with that measuring expression and says: "You\'ll make a good enemy." It is, in its way, a compliment. You give him the clean death he asked for. Wulfmor, in the weeks that follow, becomes yours.',
    options: [
      {
        text: 'RECEIVE THE WEST',
        effects: { gold: 32, authority: 22, satisfaction: 14, farmers: 14, landForces: 8 },
      },
    ],
  },

  {
    id: 'WULFMOR_BATTERED_PEACE_WAR_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    title: 'Terms Paid in Full',
    portraitId: 'advisor',
    text: 'The terms you accept or impose are the terms of a settlement that lost the last round. Thornweard takes his payment and leaves — methodically, without drama. Barnwulf records it without comment. Feldric is sitting in the yard when you find him, sword across his knees, looking at nothing. "We\'re alive," he says, when he hears you. "We can work with alive." He means it. So do you.',
    options: [
      {
        text: 'WORK WITH ALIVE',
        effects: { gold: -20, satisfaction: 3, health: 4, landForces: 2 },
      },
      {
        text: 'REBUILD — ALL OF IT',
        effects: { gold: -30, satisfaction: 5, health: 6, fireRisk: -6, farmers: 3 },
      },
    ],
  },

  {
    id: 'WULFMOR_FALLEN_WAR_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    isSingleOptionChainNode: true,
    title: 'What the Ironhand Takes',
    portraitId: 'mercenary',
    text: 'Thornweard does not gloat. He instructs. His men move through the settlement with the precision of men doing a job, and when they are done they leave it standing — a bruised, stripped thing still upright on its foundations. Barnwulf finds you in the hall when the last Wulfmor boot has left through the gate. He sets the ledger down. The numbers are unambiguous. "We are still here," he says. "That is the only advantage we have. Let\'s use it."',
    options: [
      {
        text: 'USE IT',
        effects: { gold: -40, satisfaction: -12, health: -8, authority: -14 },
      },
    ],
  },

  {
    id: 'WULFMOR_PARLEY_TWICE_FAILED_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    isSingleOptionChainNode: true,
    title: 'The Price of Two Parleys',
    portraitId: 'mercenary',
    text: 'The terms Thornweard dictates in your hall are thorough and precise. He came prepared with a written list, which is either organised thinking or quiet contempt — probably both. He takes what he came for and leaves the structure standing, which is either mercy or calculation — probably both. Barnwulf marks the ledger. You are alive, you are reduced, and Thornweard is gone back to Wulfmor with everything he needed. The road back begins here.',
    options: [
      {
        text: 'PAY AND SURVIVE',
        effects: { gold: -38, authority: -12, satisfaction: -10, health: -4 },
      },
    ],
  },

  {
    id: 'WULFMOR_SKARGRIM_ABSENT_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    title: 'A Victory Without a Witness',
    portraitId: 'advisor',
    text: 'The siege breaks. Thornweard retreats. The west is quiet. Skargrim never came — whether dead, captured, or simply done, no word arrives. The pact exists on paper and nowhere else. Your settlement endures. The western road opens slowly, cautiously, and trade returns in small amounts. There is no one in Wulfmor to thank or punish. There is only absence, and the mild, unresolved feeling of having won something that was never properly finished.',
    options: [
      {
        text: 'TAKE WHAT WAS GIVEN',
        effects: { gold: 14, satisfaction: 5, authority: 6, farmers: 3 },
      },
      {
        text: 'SEND SCOUTS WEST',
        effects: { gold: -10, satisfaction: 3, authority: 4 },
      },
    ],
  },

  {
    id: 'WULFMOR_ENVOY_MARTYRED_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    isSingleOptionChainNode: true,
    title: 'Gateward\'s Price',
    portraitId: 'advisor',
    text: 'The war that began over Thorntun Gateward\'s death ends, somehow, with a peace that works. The western road is open. Wulfmor has a new administration and a name — Skargrim\'s — that means something where it didn\'t before. Barnwulf marks Gateward\'s name in the settlement record with the notation: "Service above the call." It is inadequate. It is also all that is possible. Inadequacy and possibility are most of what governance is.',
    options: [
      {
        text: 'MARK HIS NAME',
        effects: { gold: 10, satisfaction: 8, farmers: 4, authority: 4 },
      },
    ],
  },

  {
    id: 'WULFMOR_EXILE_PEACE_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    isSingleOptionChainNode: true,
    title: 'A Quiet Ending',
    portraitId: 'advisor',
    text: 'Without Fennric\'s intelligence, Thornweard\'s planned siege collapses before it reaches your walls — his outriders cannot find your dispositions, his timing is wrong, his supply lines are cut by Skargrim\'s people in the west. He disperses. The whole structure that depended on Fennric\'s reports simply ceases, and the threat dissolves not with a confrontation but with an absence. Barnwulf writes one line in the ledger: "Wulfmor crisis — resolved." It is the most bureaucratic victory you have ever had. It is also entirely real.',
    options: [
      {
        text: 'ACCEPT THE QUIET',
        effects: { gold: 18, satisfaction: 10, authority: 5, health: 3 },
      },
    ],
  },

  {
    id: 'WULFMOR_SWIFT_GLORY_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    isSingleOptionChainNode: true,
    title: 'The Swift Victory',
    portraitId: 'military_advisor',
    text: 'Feldric\'s swift campaign is already the kind of story that gets retold: two days\' march, one sharp engagement, Thornweard in chains before the week is out. The efficiency of it impresses people who understand these things. Your settlement grows westward into Wulfmor\'s territory over the following months with the calm confidence of a place that has just learned it can defend itself. Skargrim — the man who helped without being asked — is given land and a title, both of which he accepts with exactly as many words as necessary.',
    options: [
      {
        text: 'GROW THE MARCH',
        effects: { gold: 28, authority: 18, satisfaction: 12, farmers: 12, landForces: 6 },
      },
    ],
  },

  {
    id: 'WULFMOR_SLOW_GLORY_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    isSingleOptionChainNode: true,
    title: 'The Patient Victory',
    portraitId: 'military_advisor',
    text: 'The prolonged siege is remembered as the slow kind of victory — less celebrated, more durable. By the time the fort falls, Wulfmor\'s bands have already begun to drift toward whoever will feed them, and that person is Skargrim, and Skargrim is yours. The absorption happens gradually, almost administratively, without a final confrontation. Barnwulf finds it deeply satisfying. Feldric finds it anticlimactic. Both are right. Thornweard is gone — north, into obscurity, into someone else\'s problem, into the map.',
    options: [
      {
        text: 'GOVERN THE WEST',
        effects: { gold: 20, authority: 16, satisfaction: 10, farmers: 10, landForces: 5 },
      },
    ],
  },

  {
    id: 'WULFMOR_THORNWEARD_DEAL_END',
    chainId: 'WULFMOR_PACT',
    chainRole: 'end',
    canTriggerRandomly: false,
    chainRestartCooldownTicks: 200,
    advancesTick: true,
    isSingleOptionChainNode: true,
    title: 'The Ironhand\'s Compact',
    portraitId: 'mercenary',
    text: 'Thornweard withdraws not because you defeated him but because you offered him something worth withdrawing for — not gold, precisely, but acknowledgment. A written recognition that Wulfmor\'s Ratsältester speaks for Wulfmor\'s people, whoever that Ratsältester is. He will hold it as long as it is useful and use it against you the moment it isn\'t. You both know this. The agreement, such as it is, stands on mutual calculation rather than trust, which makes it surprisingly durable.',
    options: [
      {
        text: 'ACCEPT THE CALCULATION',
        effects: { gold: -12, satisfaction: 4, authority: -4, farmers: 4 },
      },
    ],
  },

];
