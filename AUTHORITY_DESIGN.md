# Authority System Design Document

## 🎯 Philosophy

The **Authority** system represents your political influence and standing as a leader of the Mark. Unlike other stats that measure resources or conditions, authority reflects how much power you can wield when making difficult decisions. It creates a dynamic where your past leadership choices directly impact your ability to enforce your will in future situations.

### Core Design Principles

1. **Authority as Political Capital**: Authority isn't just a number—it's your ability to make bold moves, command respect, and enforce decisions against resistance.

2. **Risk and Reward**: Authority can be committed (risked) on important decisions. Success can yield great rewards, while failure can be costly.

3. **Dynamic Progression**: Your authority level determines which events you encounter, creating distinct gameplay experiences at different power levels.

4. **Character Testing**: The system tests your leadership philosophy through ego challenges—will you be humble or authoritarian, merciful or severe?

## 📊 Authority Bands

Authority ranges from **0 to 100** (displayed to 3 decimal places for precision, shown as 0-999.999 internally). The system divides this range into three distinct bands:

### Low Authority (0-33)
**Experience**: Weakness and vulnerability  
**Events**: Disrespect, sabotage, exploitation, insubordination  
**Gameplay**: You face challenges to your legitimacy. Others question your leadership, take advantage of your weak position, or openly defy you.

**Example Events**:
- Guards mock your orders
- Merchants demand inflated prices
- Citizens leave for settlements with "real leadership"
- Debt collectors sense weakness

**Strategy**: Focus on rebuilding authority through decisive actions, even if they're costly. Small authority gains matter when you're at the bottom.

### Medium Authority (34-66)
**Experience**: Normal governance  
**Events**: Standard political opportunities, balanced challenges  
**Gameplay**: The default state where you have enough authority to govern effectively but aren't dominant. Most events are accessible.

**Example Events**:
- Standard diplomatic negotiations
- Regular crisis management
- Typical leadership decisions

**Strategy**: This is the stable middle ground. You can maintain this level or push toward either extreme based on your playstyle.

### High Authority (67-100)
**Experience**: Power and prestige  
**Events**: Elite opportunities, political intrigue, high-stakes scenarios  
**Gameplay**: You command respect and have access to opportunities unavailable to weaker leaders. But with power comes envy and challenge.

**Example Events**:
- Royal summons and noble alliances
- Political machinations and power plays
- Assassination plots (both defending against and potentially orchestrating)
- Grand tournaments and diplomatic summits

**Strategy**: Maintain your authority through careful choices. Don't become complacent—one major failure can send you tumbling.

## ⚖️ Authority Mechanics

### Basic Authority Changes

Authority changes through event choices, similar to other stats:

```typescript
effects: {
  authority: 5,  // Gain 5 authority
  gold: 10
}
```

**Typical Values**:
- Small decisions: ±1 to ±3
- Moderate leadership: ±3 to ±5
- Major decisions: ±5 to ±10
- Combat victories/defeats: ±5 to ±10
- Crisis responses: ±3 to ±8

### Authority Commits (Advanced)

Some events allow you to **commit** authority—risking it for potential greater rewards:

```typescript
authorityCheck: {
  minCommit: 15,      // Minimum you can commit
  maxCommit: 50,      // Maximum you can commit
  threshold: 30,      // Authority needed for success
  onSuccess: {        // Effects if commit >= threshold
    gold: 35,
    satisfaction: 8
  },
  onFailure: {        // Effects if commit < threshold
    gold: -10,
    satisfaction: -15
  },
  refundOnSuccessPercent: 100,    // Get 100% back on success
  extraLossOnFailurePercent: 35,  // Lose an extra 35% on failure
}
```

**How It Works**:
1. Choose an option with an authority check
2. Use the slider to commit authority (within min/max range)
3. Authority is immediately deducted
4. On the next tick, the check resolves:
   - **Success** (commit ≥ threshold): Apply success effects + refund
   - **Failure** (commit < threshold): Apply failure effects + extra loss
5. A feedback event explains the outcome

**Strategic Depth**:
- Committing exactly the threshold minimizes risk
- Committing more than threshold is wasteful (same success, more risk)
- Committing less is gambling—you might succeed anyway, but failure hurts more
- High refund rates (90-100%) mean success is essentially free
- High extra loss rates (40-50%) make failure devastating

### Follow-Up Probability Boosts (NEW)

Authority commits can now influence future events in request chains. Higher commitment increases the probability of beneficial follow-up events, creating a **dual-layer authority system**:

1. **Immediate Layer** (existing): Success/failure effects resolve next tick
2. **Strategic Layer** (new): Commitment level influences future event probabilities

**How It Works**:
```typescript
authorityCheck: {
  minCommit: 0,
  maxCommit: 40,
  threshold: 25,
  onSuccess: { authority: 3, satisfaction: 5 },  // Immediate effects
  onFailure: { authority: -5, satisfaction: -3 },
  followUpBoosts: [  // NEW: Influence follow-up probabilities
    {
      targetRequestId: 'EVT_TRAVELER_TEACHES',
      boostType: 'linear',
      boostValue: 2,  // Max +2 weight at full commit
      description: 'Increases chance traveler is helpful',
    },
  ],
}
```

**Boost Types**:

- **Linear**: Weight increases smoothly with commitment amount
  - Formula: `weight += (committed / maxCommit) * boostValue`
  - Example: `boostValue=2` means +2 weight at max commit, +1 at 50% commit
  - Use for: Gradual improvements where every bit of investment helps

- **Threshold**: Binary - crosses threshold or doesn't
  - Formula: `weight += boostValue if committed >= threshold, else +0`
  - Example: `boostValue=3` means +3 weight only if threshold met
  - Use for: All-or-nothing scenarios where partial commitment doesn't help

- **Stepped**: Discrete tiers based on commitment percentage
  - Formula: `weight += floor((committed / maxCommit) * steps) * boostValue`
  - Example: `steps=3, boostValue=1` means +0/+1/+2/+3 at 0%/33%/66%/100%
  - Use for: Tier-based systems (low/medium/high investment)

**Example: Mysterious Traveler**:
```
Base probabilities:
- Helpful outcome: 75% (weight: 3)
- Betrayal outcome: 25% (weight: 1)

With linear boost (boostValue=2):
- No commit (0):      Helpful 75% (3/4),  Betrayal 25% (1/4)
- Half commit (20):   Helpful 80% (4/5),  Betrayal 20% (1/5)
- Full commit (40):   Helpful 83% (5/6),  Betrayal 17% (1/6)
```

**Strategic Implications**:
- Players now face a richer decision: "Do I commit more authority for immediate safety AND better long-term outcomes?"
- Authority becomes an investment in future event chains, not just immediate results
- Different boost types create varied risk/reward profiles across events
- Backward compatible: events without `followUpBoosts` work exactly as before

### Event Filtering

Events can be restricted to authority bands:

```typescript
{
  id: 'EVT_LOW_AUTHORITY',
  authorityMin: 0,
  authorityMax: 33,
  // Only appears when authority is 0-33
}
```

This creates **band-specific content**:
- Low authority events only appear when you're weak
- High authority events require substantial power
- Creates different game experiences based on your choices

## 🎮 Gameplay Guide

### Starting Position
You begin with **20 authority**—low-medium range. This reflects your initial standing as a newly established leader.

### Building Authority

**Positive Actions**:
- Win combat encounters (+5 to +10)
- Make decisive crisis decisions (+3 to +8)
- Invest in military/infrastructure (+2 to +5)
- Successfully complete authority commits (+5 to +15)
- Show strong leadership in ego tests (+3 to +8)

**Authority Drains**:
- Lose combat encounters (-5 to -10)
- Ignore crises or make weak choices (-3 to -8)
- Decline opportunities (-1 to -3)
- Failed authority commits (-10 to -30 with extra loss)
- Make cowardly choices in ego tests (-2 to -8)

### Ego Tests

Special events that test your character and leadership philosophy:

**Humility vs Authority**:
- Listen to peasant advice → -2 authority, +10 satisfaction
- Assert your station → +3 authority, -8 satisfaction

**Honesty vs Image**:
- Admit public mistake → -5 authority, +15 satisfaction  
- Deflect blame → +8 authority, -10 satisfaction

**Proportionality vs Severity**:
- Ignore minor slight → -1 authority, +3 satisfaction
- Punish severely → +3 authority, -8 satisfaction

These test what kind of leader you want to be. There's no "right" answer—just tradeoffs.

### Recovery Strategies

**From Low Authority** (0-33):
1. Accept the temporary disadvantage
2. Make incremental gains through small, safe decisions
3. Avoid authority commits until you rebuild
4. Focus on satisfaction and gold to stabilize
5. One major victory can swing you back up

**From High Authority** (67-100):
1. Protect your position—avoid risky commits unless necessary
2. Small losses can be absorbed
3. Don't become overconfident—hubris events can punish arrogance
4. Use your authority to secure alliances and resources

### Winning Strategies

**Aggressive Authority Build**:
- Focus on military and combat
- Take authority commits when you have buffer
- Assert dominance in ego tests
- High risk, high reward

**Balanced Approach**:
- Mix authority gains with satisfaction/gold
- Take selective commits
- Make pragmatic ego choices
- Lower risk, steady progression

**Humble Leader**:
- Prioritize satisfaction over authority
- Decline most authority commits
- Choose humility in ego tests
- Works, but locks out high-authority content

## 🛠️ Developer Tuning Guide

### Balancing Authority Values

**General Guidelines**:

1. **Event Effects** (±authority):
   - Trivial: ±1 to ±2
   - Minor: ±2 to ±4
   - Moderate: ±4 to ±7
   - Major: ±7 to ±12
   - Critical: ±10 to ±20

2. **Authority Commits**:
   - Threshold should be in middle of min/max range
   - Success refund: 80-100% (makes success nearly free)
   - Failure extra loss: 30-50% (makes failure hurt)
   - Min commit: 10-30 (low barrier to entry)
   - Max commit: 40-70 (prevent excessive gambling)

3. **Band Thresholds**:
   - Current: 0-33 (low), 34-66 (med), 67-100 (high)
   - Low band: 25-40% of range for "weakness" feel
   - High band: 25-40% of range for "elite" feel
   - Medium: Remaining middle ground

### Common Pitfalls to Avoid

❌ **Too Many Authority Drains**: If authority constantly decreases, players feel helpless  
✅ **Balanced Opportunities**: Provide both gains and losses, with slight positive bias

❌ **Degenerate Strategies**: One action shouldn't infinitely gain authority  
✅ **Diminishing Returns**: High-impact events should be rare or have cooldowns

❌ **Inescapable Bands**: Players should be able to move between bands  
✅ **Band Mobility**: Ensure paths exist to climb from low or descend from high

❌ **Unclear Commits**: Players shouldn't guess what threshold means  
✅ **Clear UI**: Show probability, outcomes, and risks explicitly

### Testing Checklist

- [ ] Can players reach all three bands in normal play?
- [ ] Is recovery from low authority possible?
- [ ] Can high authority be maintained without grinding?
- [ ] Are commit thresholds intuitive?
- [ ] Do refund percentages feel fair?
- [ ] Are failure penalties meaningful but not crushing?
- [ ] Do ego tests present interesting dilemmas?
- [ ] Is band-specific content distinct and engaging?

## 📈 System Evolution

### Phase 1: Core Logic (Completed)
- Basic authority stat (0-999.999 range)
- Authority effects on options
- Authority check mechanics
- State management and reducer logic
- Basic UI display

### Phase 2: UI Enhancement (Completed)
- Enhanced stats bar with label and icon
- Authority slider with probability display
- Inline fork preview (success/failure outcomes)
- Floating feedback animations
- Visual color coding

### Phase 3: Content Expansion (Completed)
- 10 low authority events
- 10 high authority events
- 15 authority commit events
- 12 ego test events
- 30+ feedback events
- Updated existing events with authority

### Phase 4: Follow-Up Probability Boosts (Completed)
- New `AuthorityFollowUpBoost` interface
- Enhanced `AuthorityCheck` with `followUpBoosts` field
- Updated `ScheduledEvent` with authority commit context
- `applyAuthorityBoosts` function for weight calculations
- Updated `scheduleFollowUps` to apply boosts
- Example event: Mysterious Traveler with follow-up boosts
- Three boost types: linear, threshold, stepped
- Full backward compatibility with existing events

### Phase 5: Finalization (This Document)
- Comprehensive documentation
- Balance verification
- Code quality review
- Final testing and polish

## 📚 Technical Reference

### Type Definitions

```typescript
interface Stats {
  authority: number;  // 0-999.999 (displayed as 0-100)
  // ... other stats
}

interface AuthorityFollowUpBoost {
  targetRequestId: string;  // Follow-up event ID to boost
  boostType: "linear" | "threshold" | "stepped";
  boostValue: number;  // Weight increase amount
  steps?: number;  // For stepped boost type (default: 3)
  description?: string;  // Optional UI hint
}

interface AuthorityCheck {
  minCommit: number;
  maxCommit: number;
  threshold: number;
  onSuccess?: Effect;
  onFailure?: Effect;
  successFeedbackRequestId?: string;
  failureFeedbackRequestId?: string;
  refundOnSuccessPercent?: number;  // Default: 100
  extraLossOnFailurePercent?: number;  // Default: 0
  followUpBoosts?: AuthorityFollowUpBoost[];  // NEW: Influence follow-up probabilities
}

interface Request {
  authorityMin?: number;  // Minimum authority to see event
  authorityMax?: number;  // Maximum authority to see event
  // ... other fields
}

interface ScheduledEvent {
  targetTick: number;
  requestId: string;
  scheduledAtTick: number;
  priority?: "info" | "normal";
  authorityCommitContext?: {  // NEW: Tracking authority investment
    committed: number;
    originRequestId: string;
  };
}
```

### State Management

**Pending Checks**:
Authority checks don't resolve immediately. They're stored in state and resolved on the next tick:

```typescript
interface PendingAuthorityCheck {
  committed: number;
  threshold: number;
  onSuccess?: Effect;
  onFailure?: Effect;
  successFeedbackRequestId?: string;
  failureFeedbackRequestId?: string;
  refundOnSuccessPercent: number;
  extraLossOnFailurePercent: number;
  resolveTick: number;  // When to resolve
}
```

**Resolution Flow**:
1. Player commits authority → deducted immediately
2. Check added to `pendingAuthorityChecks` array
3. On next tick (resolveTick), check is resolved
4. Effects applied, refund/extra loss calculated
5. Feedback event scheduled (if configured)

### UI Components

**Stats Bar**:
- Crown icon (👑)
- "AUTHORITY" label in gold (#ffd700)
- Numeric value display

**Slider Interface**:
- Commit value selector (min to max range)
- Threshold indicator
- Probability percentage
- Success/failure fork preview
- Color coding (green for success, orange for uncertain)

**Floating Feedback**:
- Appears on authority change
- Green for gains, red for losses
- Slides up and fades over 3 seconds
- Can stack multiple messages

## 🌍 Appendix: Original Design Notes

### Design Philosophy (Translated)

The authority system emerged from a desire to create meaningful political gameplay beyond simple resource management. The goal was to make players feel the weight of their decisions—not just in immediate effects, but in how those decisions shaped their political standing and future options.

### Band Design Rationale

The three-band system (low/medium/high) was chosen to create distinct gameplay phases:

1. **Low Band**: Simulates the struggle of weak leadership. Events should feel oppressive and unfair, motivating players to climb out.

2. **Medium Band**: The "normal" game. Most content lives here, providing a stable baseline experience.

3. **High Band**: Rewards for success, but with new challenges (envy, betrayal, high stakes).

The asymmetry is intentional—low band should feel worse than high band feels good, creating a slight upward pull.

### Commit Mechanic Origins

The commit mechanic was inspired by:
- Poker betting (committing resources for uncertain outcomes)
- Political capital expenditure (spending influence to get things done)
- Risk management games (balancing potential gains against losses)

The delayed resolution (tick+1) adds tension and prevents instant gratification.

### Ego Tests Concept

Ego tests were added to prevent authority from being purely numerical optimization. They force players to consider:
- What kind of leader do I want to be?
- Is authority worth sacrificing satisfaction/morality?
- Can I be successful while maintaining principles?

This adds character development and role-playing depth to what could otherwise be pure strategy.

---

## 🎓 Learning Resources

### For Players
- Start with medium authority (20) and experiment
- Try different leadership styles across multiple games
- Don't be afraid to fail authority commits—learn the thresholds
- Band-specific content is worth experiencing—try reaching both extremes

### For Developers
- Study existing authority events for patterns
- Test new events at all three band levels
- Balance authority changes against other stat effects
- Consider narrative consistency—does the authority change make sense?
- Use commit mechanics sparingly—they're powerful but complex

### For Content Creators
- Write distinct narrative for each band
- Low authority: disrespect, vulnerability, desperation
- High authority: power, intrigue, responsibility
- Ego tests: moral dilemmas without clear answers
- Commits: high stakes, clear success/failure outcomes

---

**Document Version**: 1.0  
**Last Updated**: February 2026  
**System Version**: Authority System Phase 4 (Finalization)
