import type { Request } from '../../models';

/**
 * Fire Chain Requests V4
 *
 * Ten chain variants are generated for each of the 10 incident slots.
 *
 *   General chains (all building types):
 *     Variant A — "Community Response"
 *     Variant B — "Raging Inferno"
 *     Variant D — "Night Watch Failure"
 *     Variant E — "Wandering Embers"
 *
 *   Building-specific chains:
 *     Variant C — "Farmstead Emergency"   (farmstead only)
 *     Variant F — "Marketplace Blaze"     (marketplace only)
 *     Variant G — "Bakery Oven Disaster"  (bakery only)
 *     Variant H — "Brewery Explosion"     (brewery only)
 *     Variant I — "Firewood Depot Fire"   (firewood only)
 *     Variant J — "Well Fire"             (well only)
 *
 *   Each variant per slot generates 5 requests:
 *     FIREV4_S{n}_{V}_START    (start, 2 options, tickless)    — immediate player decision
 *     FIREV4_S{n}_{V}_STEP1   (member, 2 options, tickless)   — path from option 0
 *     FIREV4_S{n}_{V}_STEP1B  (member, 2 options, tickless)   — path from option 1
 *     FIREV4_S{n}_{V}_END_EXT  (end, 2 options, advances tick) → extinguish the fire
 *     FIREV4_S{n}_{V}_END_DEST (end, 2 options, advances tick) → building destroyed
 *
 * Rules:
 *  - Every fire START request must present an immediate player decision (2 options).
 *    This ensures the player engages meaningfully from the very first moment of a fire.
 *  - Each option in START leads to a distinct STEP (STEP1 or STEP1B).
 *  - Both STEPs offer a path to extinguish (END_EXT) and to destroy (END_DEST).
 *  - Selected risky options carry triggerFireOutbreak effects so that bad decisions
 *    can spread the fire to another building, rewarding player caution.
 */
function generateFireV4ChainRequests(): Request[] {
  const requests: Request[] = [];

  for (let n = 1; n <= 10; n++) {
    // ── VARIANT A: Community Response (all building types) ─────────────────
    // Character: Alderman Gerber — community leader who organises the response
    {
      const v = 'A';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: public alarm vs quiet handling
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'elder',
        title: '🔥 Fire!',
        text: 'Alderman Gerber hammers on your door. "Fire! One of our buildings is ablaze — what are your orders, my lord?"',
        options: [
          { text: 'Ring the alarm — rouse the whole settlement!', effects: { satisfaction: -1 } },
          { text: 'Handle it quietly first — no panic in the streets', effects: {} },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — alarm raised, organised response
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'elder',
        title: '🔥 The Alarm is Raised',
        text: 'Villagers pour into the street. Gerber rallies them. The building is still standing — barely. How should the effort be directed?',
        options: [
          { text: 'Form a bucket brigade under Gerber\'s command', effects: { satisfaction: -2 } },
          { text: 'Sacrifice this building — shield the surrounding ones', effects: { fireRisk: 2, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — quiet attempt, risky
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'elder',
        title: '🔥 A Quiet Struggle',
        text: 'Your household crew fights without alarming the village — but the fire is stronger than expected. Smoke drifts across the rooftops. This will not stay secret.',
        options: [
          { text: 'Sound the alarm now — swallow your pride, call for help', effects: { satisfaction: -5, gold: -10 } },
          { text: 'Let it burn quietly — deny all knowledge of the delay', effects: { authority: -10, triggerFireOutbreak: true, fireOutbreakBypassCap: true } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'elder',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'extinguish' as const,
        title: '🔥 Fire Extinguished',
        text: 'The bucket brigade worked through the night. The fire is out and the building stands — battered but intact. Gerber nods approvingly.',
        options: [
          { text: 'Begin repairs', effects: { fireRisk: -5 } },
          { text: 'Invest in fire prevention measures', effects: { fireRisk: -12, gold: -20 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'elder',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'destroy' as const,
        title: '💥 Building Lost to Fire',
        text: 'The building is gone. The surrounding structures were spared, but the loss weighs on the settlement. Gerber stands silently in the ashes.',
        options: [
          { text: 'Clear the rubble', effects: { fireRisk: -3, satisfaction: -3 } },
          { text: 'Leave it for now', effects: { satisfaction: -6 } },
        ],
      });
    }

    // ── VARIANT B: Raging Inferno (all building types) ─────────────────────
    // Character: Captain Bärtraud — a tough, experienced fire captain
    {
      const v = 'B';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: all-out fight vs defensive retreat
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'guard',
        title: '🔥 Raging Fire!',
        text: 'Captain Bärtraud shouts over the roar of flames: "It\'s bad — raging fast! Do we fight it head-on or fall back and protect the perimeter?"',
        options: [
          { text: 'Fight it — throw everything we have at those flames!', effects: { gold: -5 } },
          { text: 'Pull back — protect lives and the perimeter, not property', effects: { satisfaction: -4 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — all-out fight, but losing ground
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'guard',
        title: '🔥 The All-Out Fight',
        text: 'Bärtraud rallies the crew with iron will. The fire is immense, but they are not retreating yet.',
        options: [
          { text: 'Spend more gold — hire emergency help to turn the tide', effects: { gold: -10, satisfaction: 2 } },
          { text: 'It\'s out of control — abandon the fight now!', effects: { satisfaction: -6, triggerFireOutbreak: true, fireOutbreakBypassCap: true } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — defensive line
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'guard',
        title: '🔥 The Defensive Line',
        text: 'Bärtraud holds the perimeter, watching the building burn. "We can establish a controlled fire break," she says grimly, "or cut our losses entirely."',
        options: [
          { text: 'Establish a fire break — controlled, steady', effects: { fireRisk: -8, satisfaction: -2 } },
          { text: 'Cut losses — let the whole area go', effects: { satisfaction: -10, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'guard',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'extinguish' as const,
        title: '🔥 Fire Defeated',
        text: 'The crew held the line. The building survived — scorched but standing. Bärtraud wipes soot from her brow. "We\'ve done harder."',
        options: [
          { text: 'Recover and rebuild', effects: { fireRisk: -6 } },
          { text: 'Commission a permanent fire watch', effects: { fireRisk: -15, gold: -25 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'guard',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'destroy' as const,
        title: '💥 Building Destroyed by Fire',
        text: 'The inferno consumed the building. The surrounding structures were spared, but the loss weighs heavily on the people.',
        options: [
          { text: 'Organize salvage crews', effects: { fireRisk: -4, satisfaction: -4 } },
          { text: 'Mourn and move on', effects: { satisfaction: -8 } },
        ],
      });
    }

    // ── VARIANT C: Farmstead Emergency (farmstead only) ────────────────────
    // Character: Hildegard — a farmer's wife, sharp-minded and protective of her family
    {
      const v = 'C';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: save animals vs save grain
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'farmer',
        title: '🔥 Farmstead Ablaze!',
        text: 'Hildegard bursts through your gate: "My Lord — the farmstead is burning! The animals are still in their pens! The grain stores are full!" She looks at you desperately.',
        options: [
          { text: 'Open the pens — save the animals first!', effects: { satisfaction: 2 } },
          { text: 'Get to the grain stores — we need that food for winter!', effects: { gold: 8 } },
        ],
        fireChainAllowedBuildingTypes: ['farmstead'],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — animals rescued path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'farmer',
        title: '🔥 Animals Safe — Now the Fire',
        text: 'The animals stampede to safety. The farmstead still burns. Hildegard: "We got everyone out — can we save the building too?"',
        options: [
          { text: 'Form a bucket chain — fight to save the farmstead!', effects: { satisfaction: -2, fireRisk: -8 } },
          { text: 'Everyone is safe — let the building burn', effects: { farmers: -1, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — grain saved path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'farmer',
        title: '🔥 Grain is Safe — But the Fire Grows',
        text: 'The grain is hauled clear. But while you were busy, the fire spread to the roof timbers. Hildegard: "The building — it\'s still fighting us!"',
        options: [
          { text: 'Now fight the fire — workers to the bucket line!', effects: { gold: 5, satisfaction: -3 } },
          { text: 'Evacuate — the building is too far gone', effects: { satisfaction: -5, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'farmer',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'extinguish' as const,
        title: '🔥 Farmstead Saved',
        text: 'The workers held back the flames. The farmstead stands — battered but intact. Hildegard weeps with relief.',
        options: [
          { text: 'Patch the roof and carry on', effects: { fireRisk: -5 } },
          { text: 'Build a stone fire break', effects: { fireRisk: -12, gold: -15 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'farmer',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'destroy' as const,
        title: '💥 Farmstead Destroyed',
        text: 'The farmstead is ash. Hildegard\'s family survived — but their home and harvest are gone. They stand in the ruins, silent.',
        options: [
          { text: 'Distribute emergency provisions', effects: { gold: -10, satisfaction: 3, fireRisk: -3 } },
          { text: 'Appeal for help from neighboring families', effects: { fireRisk: -2, satisfaction: -4 } },
        ],
      });
    }

    // ── VARIANT D: Night Watch Failure (all building types) ─────────────────
    // Character: Rolf — the night watchman who dozed off on duty
    {
      const v = 'D';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: public alarm vs quiet cover-up
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'guard',
        title: '🔥 Dawn Fire',
        text: 'Night watchman Rolf stumbles to your door at dawn, face pale with shame: "I... I think I dozed off. There\'s fire in the settlement. No one else knows yet."',
        options: [
          { text: 'Ring the bell — rouse the whole district immediately!', effects: { satisfaction: -2 } },
          { text: 'Handle it quietly — protect Rolf\'s honor for now', effects: {} },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — public alarm path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'guard',
        title: '🔥 The District Awakes',
        text: 'Villagers pour into the streets in various states of undress. Rolf leads them toward the fire, red-faced with guilt. The crowd is large — but chaotic.',
        options: [
          { text: 'Organize the crowd into brigades — systematic and steady', effects: { satisfaction: -3, fireRisk: -8 } },
          { text: 'Let the panicking crowd do their best — too chaotic to direct now', effects: { satisfaction: -5, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — quiet cover-up path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'guard',
        title: '🔥 Rolf\'s Small Crew',
        text: 'Rolf and your household try to contain it quietly. But the fire is stronger than expected. Smoke drifts across rooftops. Neighbors are beginning to stir.',
        options: [
          { text: 'Swallow pride — raise the alarm now, whatever the cost', effects: { satisfaction: -6, gold: -12 } },
          { text: 'Let it burn quietly — cut Rolf loose as a scapegoat later', effects: { authority: -8, satisfaction: -8, triggerFireOutbreak: true, fireOutbreakBypassCap: true } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'guard',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'extinguish' as const,
        title: '🔥 Dawn Fire Contained',
        text: 'The fire is out. The building survived. Now the question of Rolf\'s punishment hangs in the air.',
        options: [
          { text: 'Assign Rolf extra duties — let him earn back trust', effects: { satisfaction: 1, authority: 2 } },
          { text: 'Forgive Rolf — it was an honest mistake', effects: { satisfaction: 3 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'guard',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'destroy' as const,
        title: '💥 Building Lost at Dawn',
        text: 'The building burned while the night watch slept. The people are angry and they know who is to blame.',
        options: [
          { text: 'Dismiss Rolf — make an example of negligence', effects: { authority: 5, satisfaction: -4 } },
          { text: 'Reassign Rolf to daylight duties — waste not', effects: { satisfaction: -2 } },
        ],
      });
    }

    // ── VARIANT E: Wandering Embers (all building types) ───────────────────
    // Character: Elsbeth — a careless cook whose night fire started the blaze
    {
      const v = 'E';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: broad protection of nearby buildings vs focused attack on the fire
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 Embers on the Wind',
        text: 'Elsbeth the cook rushes to you: "I left the night fire too long — sparks flew on the wind and a building has caught! I\'m so sorry, my lord!" Embers still drift in the air.',
        options: [
          { text: 'Spread the crew out — protect all nearby buildings at once!', effects: { gold: -8 } },
          { text: 'Focus everything on the burning building itself', effects: {} },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — broad protection path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 The Perimeter Holds',
        text: 'The crew holds the perimeter — no other buildings have caught. Now the primary fire itself must be dealt with.',
        options: [
          { text: 'Move in now and douse the primary fire — finish it!', effects: { satisfaction: 1, fireRisk: -8 } },
          { text: 'The perimeter held — let the burning building go', effects: { satisfaction: -3, fireRisk: -3 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — focused attack path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 One Fight, One Fire',
        text: 'The crew battles the blaze hard — but embers keep drifting on the wind. Elsbeth shouts: "They\'re landing on the next building!"',
        options: [
          { text: 'Hold the line — pour water until this fire dies', effects: { gold: -10, satisfaction: -2 } },
          { text: 'Embers are spreading — the crew must pull back!', effects: { triggerFireOutbreak: true, fireOutbreakBypassCap: true } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'extinguish' as const,
        title: '🔥 Embers Quenched',
        text: 'The fire is out. Elsbeth wrings her hands, waiting for your judgment.',
        options: [
          { text: 'Discipline Elsbeth for her carelessness', effects: { authority: 3, satisfaction: -2 } },
          { text: 'Forgive her — accidents happen, she came forward honestly', effects: { satisfaction: 2 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'destroy' as const,
        title: '💥 Building Lost to Embers',
        text: 'The building is gone. Elsbeth sobs openly. The village knows it was her cook fire that started it.',
        options: [
          { text: 'Fine Elsbeth for the damage — set an example', effects: { gold: 5, satisfaction: -4, authority: 2 } },
          { text: 'Move on without assigning blame', effects: { satisfaction: -3 } },
        ],
      });
    }

    // ── VARIANT F: Marketplace Blaze (marketplace only) ────────────────────
    // Character: Konrad — a self-interested merchant who wants to save his goods
    {
      const v = 'F';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: people first vs bribe Konrad for his trade guards
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'merchant',
        title: '🔥 The Marketplace Burns!',
        text: 'Konrad the merchant grabs your sleeve: "My silks! My spices! You MUST save my stall — or I\'ll pull my trade routes!" Behind him, the marketplace blazes.',
        options: [
          { text: 'Ignore Konrad — clear everyone out, people before goods!', effects: { satisfaction: 3 } },
          { text: 'Pay Konrad now — secure his trade guards to help fight the fire', effects: { gold: -15 } },
        ],
        fireChainAllowedBuildingTypes: ['marketplace'],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — people-first path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'merchant',
        title: '🔥 The Market Square Clears',
        text: 'The buyers and sellers flee. Konrad fumes but the square is clear. Now the market structure itself can be addressed.',
        options: [
          { text: 'Coordinate a firefighting effort — save the structure!', effects: { satisfaction: 2, fireRisk: -8 } },
          { text: 'The stalls are lost — contain the perimeter and hold', effects: { satisfaction: -4 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — Konrad's trade guards path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'merchant',
        title: '🔥 Konrad\'s Guards Respond',
        text: 'Konrad\'s trade guards arrive — well-armed but directing most effort toward saving his goods, not fighting the fire. Konrad smirks.',
        options: [
          { text: 'Override Konrad — make the guards fight the fire, not save goods!', effects: { authority: -5, fireRisk: -10, satisfaction: 1 } },
          { text: 'Let Konrad prioritize his goods — the market structure burns', effects: { gold: 10, satisfaction: -6, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'merchant',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'extinguish' as const,
        title: '🔥 Marketplace Saved',
        text: 'The marketplace stands. Trade can resume — though the stalls will need rebuilding. Konrad, grudgingly, tips his hat.',
        options: [
          { text: 'Impose fire-safety regulations on all merchants', effects: { fireRisk: -8, authority: 3, satisfaction: -2 } },
          { text: 'Thank the merchants and traders for their cooperation', effects: { gold: 5, satisfaction: 3 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'merchant',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'destroy' as const,
        title: '💥 Marketplace Destroyed',
        text: 'The marketplace is rubble. Konrad stands pale and furious, tallying his losses. Trade will suffer until it is rebuilt.',
        options: [
          { text: 'Promise Konrad compensation to keep his trade routes open', effects: { gold: -15, satisfaction: 2 } },
          { text: 'Demand Konrad contribute to reconstruction costs', effects: { gold: 10, authority: 5, satisfaction: -4 } },
        ],
      });
    }

    // ── VARIANT G: Bakery Oven Disaster (bakery only) ──────────────────────
    // Character: Master Wendelin — the baker, guilty but knowledgeable about his own building
    {
      const v = 'G';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: force entry without expert vs wait for Wendelin
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 The Bakery is on Fire!',
        text: 'Black smoke pours from the bakery chimney. Master Wendelin the baker is nowhere to be found — but the grease oven is clearly the source. Do you send your crew in blind, or wait for the expert?',
        options: [
          { text: 'Break in now — every second the fire grows!', effects: {} },
          { text: 'Find Wendelin first — he knows that building\'s dangers', effects: { gold: -5 } },
        ],
        fireChainAllowedBuildingTypes: ['bakery'],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — force entry, no expert guidance
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 Inside Without Guidance',
        text: 'Your crew enters the smoke-filled bakery. The grease oven blazes. Someone reaches for a bucket of water...',
        options: [
          { text: 'Stop! Use sand and dirt on the grease fire — careful approach!', effects: { gold: -8, satisfaction: -2 } },
          { text: 'Pour water on everything!', effects: { satisfaction: -3, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — Wendelin arrives with expertise
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 Wendelin Has a Plan',
        text: 'Master Wendelin arrives, face white with guilt. "There\'s a grease valve behind the oven — I can seal the chamber and starve the fire. Give me two minutes."',
        options: [
          { text: 'Trust Wendelin — let him seal the chamber!', effects: { fireRisk: -10, satisfaction: 2 } },
          { text: 'No time — drag Wendelin out before it collapses!', effects: { satisfaction: -3 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'extinguish' as const,
        title: '🔥 Bakery Saved',
        text: 'The fire is out. The bakery stands. Wendelin — singed but alive — bows his head in shame and relief.',
        options: [
          { text: 'Order Wendelin to install proper fire guards on his ovens', effects: { fireRisk: -8, authority: 2 } },
          { text: 'Gift Wendelin a commendation — his knowledge saved the day', effects: { satisfaction: 4, gold: -5 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'destroy' as const,
        title: '💥 Bakery Destroyed',
        text: 'The bakery is gone. Wendelin stands in the ashes, wringing his apron. The village will miss the bread.',
        options: [
          { text: 'Hold Wendelin responsible — fine him for the loss', effects: { gold: 8, authority: 3, satisfaction: -3 } },
          { text: 'Take pity on Wendelin — let him rebuild at his own pace', effects: { satisfaction: 2, fireRisk: -3 } },
        ],
      });
    }

    // ── VARIANT H: Brewery Explosion (brewery only) ────────────────────────
    // Character: Braumeister Kaspar — a bold brewmaster whose barrels are exploding
    {
      const v = 'H';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: send teams to move barrels vs hold the perimeter
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 The Brewery Erupts!',
        text: 'A series of muffled BOOMS shakes the village. Braumeister Kaspar appears, soot-covered: "Fermentation barrels — they\'re going off one by one! More will blow. Do we risk going in to move them, or hold outside?"',
        options: [
          { text: 'Risk it — send teams to move the remaining barrels!', effects: { satisfaction: 2 } },
          { text: 'Hold the perimeter — let the barrels safely detonate', effects: {} },
        ],
        fireChainAllowedBuildingTypes: ['brewery'],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — brave barrel-moving attempt
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 Desperate Barrel Run',
        text: 'Teams plunge into the heat. Some barrels are dragged clear. Kaspar shouts: "Use them as a fire break!" But another barrel teeters near the flames.',
        options: [
          { text: 'Kaspar\'s plan — use the barrels as a fire break, crush the fire line!', effects: { gold: -15, satisfaction: 3 } },
          { text: 'Too dangerous — fall back immediately, leave the rest!', effects: { satisfaction: -2, triggerFireOutbreak: true, fireOutbreakBypassCap: true } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — controlled detonation wait
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 Controlled Detonation',
        text: 'Kaspar counts the blasts from a safe distance. "Five... three... one." Silence. "Last barrel. Now — move in before the fire finds new fuel."',
        options: [
          { text: 'Move in and extinguish the remaining fire — controlled and steady', effects: { fireRisk: -12, satisfaction: 1 } },
          { text: 'The structure is too damaged — let it burn out safely', effects: { satisfaction: -5, gold: 5 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'extinguish' as const,
        title: '🔥 Brewery Saved',
        text: 'The brewery stands. Kaspar grins through soot: "First round\'s on me. Or it would be, if the barrels hadn\'t gone off."',
        options: [
          { text: 'Commission explosion-proof barrel storage for the future', effects: { fireRisk: -10, gold: -20 } },
          { text: 'Celebrate — the brewery lives to brew another day!', effects: { satisfaction: 5, gold: -5 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'destroy' as const,
        title: '💥 Brewery Destroyed',
        text: 'The brewery is gone. Kaspar stands in the ruins, nudging a scorched barrel with his boot. The village mourns — in more ways than one.',
        options: [
          { text: 'Help Kaspar source materials to rebuild quickly', effects: { gold: -10, satisfaction: 3 } },
          { text: 'Let Kaspar rebuild at his own pace and expense', effects: { satisfaction: -4, gold: 5 } },
        ],
      });
    }

    // ── VARIANT I: Firewood Depot Fire (firewood only) ─────────────────────
    // Character: Holzmann — the no-nonsense firewood foreman
    {
      const v = 'I';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: defend the depot vs scatter the wood piles
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 The Firewood Stores Burn!',
        text: 'Holzmann the foreman barks: "The firewood depot is ablaze! If we lose those stores, every hearth goes cold before winter. But fighting a wood fire this size is brutal — the whole pile could go up!"',
        options: [
          { text: 'Defend the depot — fight to save what we can!', effects: {} },
          { text: 'Scatter the wood piles now — stop the fire spreading through the stores!', effects: { satisfaction: -2 } },
        ],
        fireChainAllowedBuildingTypes: ['firewood'],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — defend path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 Holding the Line at the Depot',
        text: 'Workers throw sand and swing shovels. The heat is punishing. Holzmann shouts over the roar: "We can hold it — but not for long!"',
        options: [
          { text: 'Hold the line — sand and buckets, systematic!', effects: { fireRisk: -10, satisfaction: -2 } },
          { text: 'Too dangerous — pull everyone back before it explodes!', effects: { fireRisk: 8, triggerFireOutbreak: true, fireOutbreakBypassCap: false } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — scatter path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'craftsman',
        title: '🔥 Embers Fly Across the Yard',
        text: 'Workers scatter the piles — the main depot fire slows. But burning fragments arc across the yard. Holzmann: "The embers are going wide!"',
        options: [
          { text: 'Chase the embers — protect surrounding buildings!', effects: { satisfaction: -3, fireRisk: -5 } },
          { text: 'The embers are beyond control — evacuate!', effects: { triggerFireOutbreak: true, fireOutbreakBypassCap: true, fireRisk: 5 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'extinguish' as const,
        title: '🔥 Firewood Depot Saved',
        text: 'The depot is singed but standing. Holzmann counts the surviving stacks grimly. "Could\'ve been worse."',
        options: [
          { text: 'Reorganize the storage to be safer in future', effects: { fireRisk: -8, gold: -10 } },
          { text: 'Sell some extra firewood to recover costs', effects: { gold: 10, satisfaction: 1 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'craftsman',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'destroy' as const,
        title: '💥 Firewood Depot Destroyed',
        text: 'The depot is ash. Every hearth in the village will feel the cold this winter. Holzmann stares at the sky, jaw set.',
        options: [
          { text: 'Emergency purchase of firewood from traveling traders', effects: { gold: -20, fireRisk: -5 } },
          { text: 'Send workers to collect wood from the forest — it will take time', effects: { fireRisk: 3, satisfaction: -4 } },
        ],
      });
    }

    // ── VARIANT J: Well Fire (well only) ────────────────────────────────────
    // Character: Brunnenmeister Ilse — the well keeper, calm under pressure
    {
      const v = 'J';
      const chainId = `FIREV4_S${n}_${v}`;

      // START — decision: protect the well vs use it immediately
      requests.push({
        id: `FIREV4_S${n}_${v}_START`,
        chainId,
        chainRole: 'start',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'elder',
        title: '🔥 Fire at the Well!',
        text: 'Brunnenmeister Ilse runs to you: "Fire near the well-house! If the wooden structure burns, the water will be fouled for weeks — but we need that water to fight the very fire in front of us! What do we do?"',
        options: [
          { text: 'Protect the well-house first — without clean water, we lose everything!', effects: {} },
          { text: 'Draw water from the well now — use it to fight the fire immediately!', effects: { health: -1 } },
        ],
        fireChainAllowedBuildingTypes: ['well'],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_STEP1B`, weight: 1 }],
          },
        ],
      });

      // STEP1 — protect well path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'elder',
        title: '🔥 Ilse Defends the Well',
        text: 'Ilse leads a team to wet down the well-house and build a firebreak. The nearby fire grows briefly hotter — but the well is protected. Now the fire itself must be faced.',
        options: [
          { text: 'Hold the line — protect both well and building!', effects: { health: 2, fireRisk: -10 } },
          { text: 'The building is already lost — but the well survived. Enough.', effects: { health: 3, satisfaction: -4 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // STEP1B — use well water path
      requests.push({
        id: `FIREV4_S${n}_${v}_STEP1B`,
        chainId,
        chainRole: 'member',
        canTriggerRandomly: false,
        advancesTick: false,
        portraitId: 'elder',
        title: '🔥 Water from the Well',
        text: 'Buckets fly from the well in a desperate rhythm. Ilse warns: "I can already smell smoke in the water. We are fouling our own supply. How far do we push this?"',
        options: [
          { text: 'Stop drawing before full contamination — switch to dirt and sand', effects: { health: -2, fireRisk: -6 } },
          { text: 'Keep drawing — the fire must be stopped at any cost!', effects: { health: -5, satisfaction: -3 } },
        ],
        followUps: [
          {
            triggerOnOptionIndex: 0,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_EXT`, weight: 1 }],
          },
          {
            triggerOnOptionIndex: 1,
            delayMinTicks: 1,
            delayMaxTicks: 2,
            candidates: [{ requestId: `FIREV4_S${n}_${v}_END_DEST`, weight: 1 }],
          },
        ],
      });

      // END_EXT — extinguish path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_EXT`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'elder',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'extinguish' as const,
        title: '🔥 Well Fire Defeated',
        text: 'The fire is out. The well survived — or is at least repairable. Ilse is already inspecting the water for contamination.',
        options: [
          { text: 'Commission a stone roof for the well-house', effects: { fireRisk: -8, gold: -15, health: 1 } },
          { text: 'Thank Ilse — her quick thinking saved the water supply', effects: { satisfaction: 3, health: 1 } },
        ],
      });

      // END_DEST — destroy path
      requests.push({
        id: `FIREV4_S${n}_${v}_END_DEST`,
        chainId,
        chainRole: 'end',
        canTriggerRandomly: false,
        advancesTick: true,
        portraitId: 'elder',
        chainRestartCooldownTicks: 0,
        fireChainOutcome: 'destroy' as const,
        title: '💥 Well Structure Damaged',
        text: 'The building is gone and the well is fouled. Ilse kneels at the rim, testing the water with a grim expression.',
        options: [
          { text: 'Rush emergency repairs on the well to restore water quality', effects: { gold: -15, health: 3 } },
          { text: 'Draw water from the river until the well can be repaired', effects: { health: -2, satisfaction: -3 } },
        ],
      });
    }
  }

  return requests;
}

/**
 * Repair Chain Requests V4 (4 requests per slot, 10 slots = 40 requests)
 *
 * For each slot n=1..10:
 *   REPAIRV4_S{n}_START           (start, 1 option, no tick)
 *   REPAIRV4_S{n}_PROGRESS        (member, 2 options, no tick)
 *   REPAIRV4_S{n}_END_RECONSTRUCT (end, 1 option, advances tick) → reconstruct
 *   REPAIRV4_S{n}_END_LEAVE       (end, 1 option, advances tick) → leave destroyed
 */
function generateRepairV4ChainRequests(): Request[] {
  const requests: Request[] = [];

  for (let n = 1; n <= 10; n++) {
    const chainId = `REPAIRV4_S${n}`;

    requests.push({
      id: `REPAIRV4_S${n}_START`,
      chainId,
      chainRole: 'start',
      canTriggerRandomly: false,
      advancesTick: false,
      portraitId: 'advisor',
      isSingleOptionChainNode: true,
      repairChainSlotIndex: n,
      title: '🛠 Repair Work Begins',
      text: 'Your workers have started assessing the destroyed building. Plans are being drawn up for reconstruction.',
      options: [
        { text: 'Review the damage', effects: {} },
      ],
      followUps: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: `REPAIRV4_S${n}_PROGRESS`, weight: 1 }],
        },
      ],
    });

    requests.push({
      id: `REPAIRV4_S${n}_PROGRESS`,
      chainId,
      chainRole: 'member',
      canTriggerRandomly: false,
      advancesTick: false,
      portraitId: 'advisor',
      title: '🛠 Repair Progress',
      text: 'The repair work is underway. The craftsmen need direction on how to proceed.',
      options: [
        { text: 'Push for full reconstruction', effects: { satisfaction: 2 } },
        { text: 'Conserve resources', effects: { gold: 5 } },
      ],
      followUps: [
        {
          triggerOnOptionIndex: 0,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: `REPAIRV4_S${n}_END_RECONSTRUCT`, weight: 1 }],
        },
        {
          triggerOnOptionIndex: 1,
          delayMinTicks: 1,
          delayMaxTicks: 2,
          candidates: [{ requestId: `REPAIRV4_S${n}_END_LEAVE`, weight: 1 }],
        },
      ],
    });

    // END: Reconstruct
    requests.push({
      id: `REPAIRV4_S${n}_END_RECONSTRUCT`,
      chainId,
      chainRole: 'end',
      canTriggerRandomly: false,
      advancesTick: true,
      portraitId: 'advisor',
      chainRestartCooldownTicks: 0,
      repairChainOutcome: 'reconstruct' as const,
      isSingleOptionChainNode: true,
      title: '🛠 Repair Outcome',
      text: 'The time has come to decide the fate of the destroyed building.',
      options: [
        {
          text: 'Reconstruct the building',
          effects: { gold: -15, satisfaction: 5 },
        },
      ],
    });

    // END: Leave destroyed
    requests.push({
      id: `REPAIRV4_S${n}_END_LEAVE`,
      chainId,
      chainRole: 'end',
      canTriggerRandomly: false,
      advancesTick: true,
      portraitId: 'advisor',
      chainRestartCooldownTicks: 0,
      repairChainOutcome: 'leave' as const,
      isSingleOptionChainNode: true,
      title: '🛠 Ruins Left Standing',
      text: 'The ruins will remain for now. The slot stays open for a future repair attempt.',
      options: [
        {
          text: 'Leave it as ruins for now',
          effects: { satisfaction: -3 },
        },
      ],
    });
  }

  return requests;
}

export const fireChainRequestDefs = [
  ...generateFireV4ChainRequests(),
  ...generateRepairV4ChainRequests(),
];
