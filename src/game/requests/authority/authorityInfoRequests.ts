import type { Request } from '../../models';

export const authorityInfoRequestDefs: Request[] = [
  {
    id: 'INFO_TRADE_SUCCESS',
    title: 'Negotiation Victory',
    text: 'Your firm negotiating stance paid off. The merchant guild agrees to your terms, and your authority remains intact.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'EXCELLENT', effects: {} }],
  },

  {
    id: 'INFO_TRADE_FAILURE',
    title: 'Negotiation Failure',
    text: 'The merchants walked away from the table, insulted by your overreach. The deal is lost and your reputation damaged.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'ACCEPT DEFEAT', effects: {} }],
  },

  {
    id: 'INFO_RIOT_SUCCESS',
    title: 'Crisis Averted',
    text: 'Your words resonated with the crowd. They disperse peacefully, moved by your leadership and vision.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'WELL DONE', effects: {} }],
  },

  {
    id: 'INFO_RIOT_FAILURE',
    title: 'Riot Erupts',
    text: 'The crowd jeered and threw stones. Violence broke out, and guards had to intervene forcefully. Your authority was not enough.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'REGRET IT', effects: {} }],
  },

  {
    id: 'INFO_JUSTICE_SUCCESS',
    title: 'Justice Served',
    text: 'Both families accept your judgment. Your authority has brought peace and order to the dispute.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'GOOD', effects: {} }],
  },

  {
    id: 'INFO_JUSTICE_FAILURE',
    title: 'Justice Rejected',
    text: 'The families reject your ruling, calling you weak and incompetent. The feud intensifies.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'UNFORTUNATE', effects: {} }],
  },

  {
    id: 'INFO_REFORM_SUCCESS',
    title: 'Reforms Implemented',
    text: 'Despite resistance, your authority prevails. The military is reorganized and strengthened under new leadership.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'PROCEED', effects: {} }],
  },

  {
    id: 'INFO_REFORM_FAILURE',
    title: 'Reforms Rejected',
    text: 'The old guard refuses your changes. Some officers even resign in protest, weakening your forces.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'ACCEPT IT', effects: {} }],
  },

  {
    id: 'INFO_BANDIT_SUCCESS',
    title: 'Bandits Recruited',
    text: 'The bandit chief kneels before you, swearing loyalty. His warriors are now yours to command.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'WELCOME THEM', effects: {} }],
  },

  {
    id: 'INFO_BANDIT_FAILURE',
    title: 'Bandits Betray',
    text: 'The bandits laugh at your offer and raid your settlement. Your weakness has cost you dearly.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'CURSE THEM', effects: {} }],
  },

  {
    id: 'INFO_TAX_SUCCESS',
    title: 'Tax Reform Succeeds',
    text: 'Your authority overcomes the corrupt officials. The new tax system is efficient and fair, filling the coffers.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'CELEBRATE', effects: {} }],
  },

  {
    id: 'INFO_TAX_FAILURE',
    title: 'Tax Reform Fails',
    text: 'The entrenched interests sabotage your reforms. Tax collection collapses into chaos and resentment.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'REGROUP', effects: {} }],
  },

  {
    id: 'INFO_RELIGIOUS_SUCCESS',
    title: 'Unity Achieved',
    text: 'Your decree brings religious harmony. The people unite under your wisdom and authority.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'BLESSED', effects: {} }],
  },

  {
    id: 'INFO_RELIGIOUS_FAILURE',
    title: 'Religious Schism',
    text: 'Your decree inflames the dispute. Families are torn apart, and some flee the settlement in protest.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'DAMAGE DONE', effects: {} }],
  },

  {
    id: 'INFO_BORDER_SUCCESS',
    title: 'Territory Secured',
    text: 'Your claim is recognized. The contested lands are now yours, bringing new farmers and resources.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'EXPAND', effects: {} }],
  },

  {
    id: 'INFO_BORDER_FAILURE',
    title: 'Border War',
    text: 'Your neighbor rejects your claim with force. A brief but bloody skirmish costs you dearly.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'RETREAT', effects: {} }],
  },

  {
    id: 'INFO_CORRUPT_SUCCESS',
    title: 'Corruption Rooted Out',
    text: 'The corrupt official is punished publicly. The recovered funds and restored integrity boost morale.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'JUSTICE', effects: {} }],
  },

  {
    id: 'INFO_CORRUPT_FAILURE',
    title: 'Corruption Persists',
    text: 'The official\'s allies strike back. Your prosecution fails, and the corrupt network retaliates.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'FAILED', effects: {} }],
  },

  {
    id: 'INFO_SUCCESSION_SUCCESS',
    title: 'Succession Secured',
    text: 'Your chosen claimant takes power, grateful for your support. Rich rewards and alliance follow.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'PROFIT', effects: {} }],
  },

  {
    id: 'INFO_SUCCESSION_FAILURE',
    title: 'Succession War',
    text: 'Your candidate loses. The victorious claimant remembers your opposition with hostility.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'COSTLY', effects: {} }],
  },

  {
    id: 'INFO_GUILD_SUCCESS',
    title: 'Guild United',
    text: 'Your choice stands. The favored guild prospers, and trade flourishes under clear leadership.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'PROSPER', effects: {} }],
  },

  {
    id: 'INFO_GUILD_FAILURE',
    title: 'Guild Chaos',
    text: 'Both guilds reject your decision. Trade war erupts, damaging the economy and your standing.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'CHAOS', effects: {} }],
  },

  {
    id: 'INFO_ENVOY_SUCCESS',
    title: 'Equal Partnership',
    text: 'The foreign kingdom accepts your terms. A profitable alliance is formed on equal footing.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'ALLIANCE', effects: {} }],
  },

  {
    id: 'INFO_ENVOY_FAILURE',
    title: 'Diplomatic Insult',
    text: 'The envoy leaves in anger. Your overreach is seen as arrogance, damaging foreign relations.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'ISOLATION', effects: {} }],
  },

  {
    id: 'INFO_LAND_SUCCESS',
    title: 'Land Reform Success',
    text: 'Despite noble resistance, your authority carries the day. Land is redistributed fairly, and the poor rejoice.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'REFORM', effects: {} }],
  },

  {
    id: 'INFO_LAND_FAILURE',
    title: 'Land Reform Disaster',
    text: 'The nobles revolt against your reforms. Chaos ensues as farmers flee and the economy collapses.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'DISASTER', effects: {} }],
  },

  {
    id: 'INFO_TRADITION_SUCCESS',
    title: 'Tradition Abolished',
    text: 'Your authority is sufficient. The harmful tradition ends, and a new era of progress begins.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'PROGRESS', effects: {} }],
  },

  {
    id: 'INFO_TRADITION_FAILURE',
    title: 'Tradition Defended',
    text: 'The people reject your decree. You are branded a heretic, and the tradition continues stronger than ever.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'DEFEATED', effects: {} }],
  },

  {
    id: 'INFO_PIRATE_SUCCESS',
    title: 'Pirates Tamed',
    text: 'The pirates serve you now. River trade is yours to control, bringing gold and security.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'COMMAND', effects: {} }],
  },

  {
    id: 'INFO_PIRATE_FAILURE',
    title: 'Pirates Raid',
    text: 'The pirates scoff at your authority. They raid your docks and escape with your gold.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'LOSSES', effects: {gold: -15,} }],
  },

  {
    id: 'INFO_MARRIAGE_SUCCESS',
    title: 'Marriage Sealed',
    text: 'The alliance is formed on favorable terms. Wealth, troops, and prestige flow from the union.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'ALLIANCE', effects: {} }],
  },

  {
    id: 'INFO_MARRIAGE_FAILURE',
    title: 'Marriage Broken',
    text: 'The family withdraws the offer, insulted by your demands. The alliance opportunity is lost.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'LOST', effects: {} }],
  },

  {
    id: 'INFO_LOW_PLEA_SUCCESS',
    title: 'Merchant Impressed',
    text: 'The merchant sees potential in you. "Perhaps you\'re worth investing in after all," he says, handing over coins and words of support.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'GRATEFUL', effects: {} }],
  },

  {
    id: 'INFO_LOW_PLEA_FAILURE',
    title: 'Merchant Dismisses You',
    text: 'The merchant shakes his head. "You lack the standing I need. Come back when you\'re a real leader." He walks away.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'HUMILIATED', effects: {} }],
  },

  {
    id: 'INFO_LOW_GUARD_SUCCESS',
    title: 'Guards Rallied',
    text: 'Your words strike a chord. The guards stand straighter, remembering their oaths. "We\'ll stand with you, lord," their captain declares.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'UNITED', effects: {} }],
  },

  {
    id: 'INFO_LOW_GUARD_FAILURE',
    title: 'Guards Desert',
    text: 'Your speech falls flat. The guards exchange glances and begin walking away. Some leave the settlement entirely.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'ABANDONED', effects: {} }],
  },

  {
    id: 'INFO_LOW_RESPECT_SUCCESS',
    title: 'Respect Earned',
    text: 'The villagers see your determination and courage. Slowly, they begin to believe in you again. You\'ve turned a corner.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'RENEWED', effects: {} }],
  },

  {
    id: 'INFO_LOW_RESPECT_FAILURE',
    title: 'Respect Lost',
    text: 'Your attempt to assert yourself backfires spectacularly. Villagers laugh openly, and some pack their belongings to leave.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'MOCKED', effects: {} }],
  },

  {
    id: 'INFO_LOW_DEBT_SUCCESS',
    title: 'Debt Reduced',
    text: 'Your negotiating skill surprises the creditors. They agree to reduced terms, impressed by your resolve despite your circumstances.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'RELIEVED', effects: {} }],
  },

  {
    id: 'INFO_LOW_DEBT_FAILURE',
    title: 'Debt Enforced',
    text: 'The creditors laugh at your weak position. They seize assets and spread word of your incompetence throughout the region.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'CRUSHED', effects: {} }],
  },

  {
    id: 'INFO_TRAVELER_INVESTIGATED',
    title: 'Investigation Success',
    text: 'Your investigation reveals the traveler is indeed a respected scholar. Your cautious approach is seen as wise leadership.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'VINDICATED', effects: {} }],
  },

  {
    id: 'INFO_TRAVELER_INVESTIGATION_FAILED',
    title: 'Investigation Failed',
    text: 'Your investigation found nothing, but the traveler is offended by your suspicion. Word spreads that you are paranoid and unwelcoming.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'EMBARRASSED', effects: {} }],
  },

  {
    id: 'REMINDER_FARMSTEAD',
    title: 'The Bailiff Urges: Housing',
    text: 'Your bailiff steps forward with a worried expression: "My lord, our farmers are living in makeshift camps. The camps are a fire hazard and disease is spreading. We desperately need more farmsteads!"',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'Understood', effects: {} }],
  },

  {
    id: 'REMINDER_MARKETPLACE',
    title: 'The Bailiff Suggests: Marketplace',
    text: 'Your bailiff approaches you respectfully: "My lord, the settlement has grown beyond what informal trade can sustain. A proper marketplace would bring order to commerce and attract new merchants."',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'Understood', effects: {} }],
  },

  {
    id: 'REMINDER_BAKERY',
    title: 'The Bailiff Suggests: Bakery',
    text: 'Your bailiff raises a concern: "My lord, our growing population needs a reliable food supply. A bakery would not only feed our people but draw settlers who seek the comfort of fresh bread."',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'Understood', effects: {} }],
  },

  {
    id: 'REMINDER_BREWERY',
    title: 'The Bailiff Suggests: Brewery',
    text: 'Your bailiff clears his throat: "My lord, the workers toil hard and their morale suffers without proper leisure. A brewery would lift spirits and give them a reason to stay."',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'Understood', effects: {} }],
  },

  {
    id: 'REMINDER_FIREWOOD',
    title: 'The Bailiff Warns: Firewood',
    text: 'Your bailiff speaks with urgency: "My lord, without an organized firewood supply, people are collecting wood haphazardly. The fire risk is growing — one spark could burn down the entire settlement!"',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'Understood', effects: {} }],
  },

  {
    id: 'REMINDER_WELL',
    title: 'The Bailiff Warns: Sanitation',
    text: 'Your bailiff approaches with grave concern: "My lord, the people are drinking from stagnant ponds and muddy streams. Without a proper central well, disease will spread unchecked through our settlement."',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'Understood', effects: {} }],
  },

  {
    id: 'INFO_MI_TESTIMONY_SUCCESS',
    title: 'Testimony Secured',
    text: 'Under pressure, Aldric breaks. He names his contact — a man called "the Measurer" — and describes the delivery route. Your inspector now has everything needed to trace the network.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'PRESS ON', effects: {} }],
  },

  {
    id: 'INFO_MI_TESTIMONY_FAILURE',
    title: 'Testimony Retracted',
    text: 'Aldric clams up the moment your tone shifts. "I told you what I know," he mutters, staring at the floor. The stallholder will say nothing more — and the crowd that witnessed your outburst now watches you with wary eyes.',
    advancesTick: false,
    canTriggerRandomly: false,
    portraitId: 'advisor',
    options: [{ text: 'ACCEPT IT', effects: {} }],
  },
];
