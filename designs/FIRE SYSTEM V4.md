# FIRE SYSTEM V4 — Unit-Targeted Fires + Assigned Fire/Repair Chains (1:1 implementable)

> **File target:** `designs/fire-design-v4.md`  
> **Status:** New design to replace Fire System V3 behavior.

---

## 0) What stays the same (hard constraints)

### 0.1 Determinism + architecture
- Fire logic is **reducer-only** and uses the existing **seeded RNG**.
- Fire incidents are integrated through **scheduled events** and the request system.

### 0.2 Fire outbreak trigger formula (unchanged from V3)
- **Linear start chance** is unchanged:

  `chance% = clamp((fireRisk + baseOffset) * factor, chanceMin, chanceMax)`

- The outbreak attempt occurs only on **tick-advancing** requests (i.e., after a player decision that advances time).

---

## 1) What changes in V4 (high-level summary)

V4 changes the *consequences* of a fire outbreak and the chain model:

1) **A fire outbreak affects exactly one specific building unit** (chosen randomly).  
2) That unit becomes **on_fire** and **does not count** toward effective buildings of that type (same effectiveCount logic as before, now driven by this incident model).  
3) A **fire request chain** is chosen **randomly** from the set allowed for that building type and is **scheduled immediately** with highest priority among non-info scheduled events.  
4) Fire chains gain new mandatory features:
   - Can **start a new fire** (same outbreak logic).
   - Can **destroy the assigned building unit** (on_fire → destroyed).
   - Can **extinguish** (on_fire → functional).
5) Invariant: **Any on_fire unit always has exactly one active fire chain assigned.**
6) Destroyed buildings have repair rules:
   - Destroyed + chain active → **cannot** be manually repaired.
   - Destroyed + chain inactive → player can start a **repair request chain** (“Repair building”).
7) Repair chains must end in either **reconstruction** or **leaving it destroyed** (may be later, may be branched).

---

## 2) Glossary

- **Building type:** A building definition ID (e.g., `farmstead`, `bakery`).
- **Building unit:** One of the counted instances inside a building type (a single “slot” of `buildingCount`).
- **Functional unit:** Neither `on_fire` nor `destroyed`.
- **Incident:** The persistent record that ties *one* building unit to *one* request chain state.
- **Fire chain:** The request chain used to resolve an on_fire incident.
- **Repair chain:** The request chain used to resolve a destroyed (repairable) incident.

---

## 3) Hard invariants (V4 must enforce)

### 3.1 Assignment invariants
- **Each on_fire unit has exactly one active fire chain assigned.**
- **Functional units have no assigned chain.**
- **Destroyed units keep an assigned incident record** (chain active or inactive) until they are reconstructed.

### 3.2 Resolution invariants
- Every fire chain must **guarantee** that the assigned unit becomes either:
  - **extinguished** (functional), OR
  - **destroyed**
- If the unit becomes destroyed while the fire chain is still active, that chain’s future branches must lead to either:
  - **reconstruct** (unit becomes functional), OR
  - **leave destroyed** (chain ends inactive; unit stays destroyed)

### 3.3 UI invariants (from your constraints)
- The **request queue is not visible** → no “Open Incident” button or any queue navigation.
- The request screen must **not show Active/Built numeric counts**. Those remain on the Construction screen only.

---

## 4) Data model (minimal, compatible, slot-driven)

### 4.1 BuildingTracking (unchanged shape)
Keep existing tracking fields per building type:
- `buildingCount`
- `onFireCount`
- `destroyedCount`
- `onStrikeCount`

Effective count remains:
`effectiveCount = buildingCount - onFireCount - destroyedCount - onStrikeCount`

> **Note:** In V4, `onFireCount`/`destroyedCount` must reflect the incident-slot truth (see 4.3).

### 4.2 FireState (extend slot state to represent incidents)
Keep the existing concept of **10 fixed slots**, but treat them as **incident handles**.

**FireState**
- `slots: FireIncidentSlotState[10]`
- `pendingInfoQueue`: **unused by V4** (kept only if you want to avoid refactors; V4 does not rely on it)

**FireIncidentSlotState (V4)**
- `slotIndex: 1..10`
- `assigned: boolean`  
- `chainActive: boolean` (running right now)
- `chainKind?: 'fire' | 'repair'`  
- `chainVariantId?: string` (e.g. `'A' | 'B'` for fire)
- `targetBuildingId?: string`
- `targetUnitOrdinal?: number` (1..buildingCount for that type)
- `unitStatus?: 'on_fire' | 'destroyed'`
- `assignedTick?: number`
- `startedTick?: number`

### 4.3 Derived counts must be synchronized
Because unit-level incidents now exist, V4 requires one source of truth:

- **Source of truth:** `fire.slots[]` assignments.
- After any fire/repair operation, recompute (or update) per-building:
  - `onFireCount = number of assigned slots with unitStatus='on_fire' and targetBuildingId=...`
  - `destroyedCount = number of assigned slots with unitStatus='destroyed' and targetBuildingId=...`

---

## 5) Outbreak logic (V4)

### 5.1 When outbreaks are attempted
- **Natural outbreaks:** attempted once per tick advance (same placement as V3’s “attempt start” step).
- **Effect outbreaks:** may be triggered by request effects (see 7.2), can bypass the cap.

### 5.2 Maximum simultaneous fires (natural)
Natural max burning buildings depends on `fireRisk`:

- `0–25` → max **1**
- `26–50` → max **2**
- `51–85` → max **3**
- `86–100` → max **4**

**Counting rule:** “Burning buildings” = number of incidents with `unitStatus='on_fire'`.

**Exception:** If an outbreak is triggered by a request effect with `bypassCap=true`, the cap can be exceeded (but the hard slot limit still applies).

### 5.3 Eligibility conditions to start a new fire (natural)
A natural outbreak only starts if all are true:
1) `burningIncidents < maxAllowedByRisk(fireRisk)`
2) At least one building type has `effectiveCount > 0`
3) At least one incident slot is free (`assigned=false`)

### 5.4 Random target selection (unit-level)
**Goal:** pick a random *functional unit* across the entire village.

Algorithm:
1) Build candidate list of building types where `effectiveCount > 0`.
2) Select one building type with probability proportional to `effectiveCount` (so each functional unit is equally likely).
3) Within that building type:
   - Determine the set of unit ordinals `1..buildingCount`
   - Remove ordinals currently assigned in any slot for this building type
   - Randomly choose one remaining ordinal → this is the affected unit

### 5.5 Assign the incident + apply on_fire
On outbreak:
1) Claim the **lowest free slotIndex**.
2) Set slot fields:
   - `assigned=true`
   - `chainKind='fire'`
   - `chainActive=true`
   - `targetBuildingId`, `targetUnitOrdinal`
   - `unitStatus='on_fire'`
3) Synchronize `onFireCount/destroyedCount`.

### 5.6 Choose chain variant + schedule chain start
- For the chosen building type, pick a fire chain variant **randomly** from:
  - `FIRE_CHAIN_VARIANTS_BY_BUILDING[targetBuildingId]`
  - fallback: `DEFAULT_FIRE_CHAIN_VARIANTS = ['A','B']`

Schedule start request:
- Request ID: `FIREV4_S{slotIndex}_{variant}_START`
- Scheduled at `targetTick = currentTick` and inserted at **highest priority among non-info scheduled events**.

---

## 6) Fire chains (requirements and structure)

### 6.1 Multiple chains per building type
Each building type can define multiple valid variants. V4 supports:
- **Global defaults** (A/B for all buildings)
- Optional per-building overrides via config mapping.

### 6.2 Mandatory fire-chain capabilities (must exist in the chain)
Each fire chain must include operations that can:
- **Extinguish assigned unit** (on_fire → functional, clears assignment)
- **Destroy assigned unit** (on_fire → destroyed)
- **Start a new outbreak** (same logic as Section 5; can bypass cap via flag)

### 6.3 Fire-chain resolution rule (must be true for every branch)
Every branch must lead to either:
- `EXTINGUISH_ASSIGNED` at some point, OR
- `DESTROY_ASSIGNED` at some point

If `DESTROY_ASSIGNED` happens while chain is still active:
- Later in the chain there must be a branch to either:
  - reconstruct (unit → functional), OR
  - end and leave destroyed (unit stays destroyed; chainActive=false)

### 6.4 Slot binding rule (how requests know their target)
All fire-chain requests are slot-specific by ID.
- The **slotIndex is encoded** in request IDs (e.g., `FIREV4_S3_A_*`).
- Effects operate on “the assigned unit of this slot” (never random).

### 6.5 Naming + request authoring rules (per guide)
For every fire-chain request:
- `id` must be unique
- `portraitId` must be set
- `chainId` must be consistent per chain
- `chainRole` must be correct (`start`/`member`/`end`)
- `canTriggerRandomly: false` on all members/ends (starts follow the usual chain conventions)
- Start requests should set `chainRestartCooldownTicks` (for validation consistency)

**Recommended minimal chain size per variant:** Small (4–6 requests).

---

## 7) Request effects needed (fire/repair ops)

> These are conceptual operations that must be representable as Effects and handled in the reducer.
> The exact Effect encoding is implementation detail, but the behavior is not.

### 7.1 Fire ops (slot-bound)
- `FIREV4_EXTINGUISH_ASSIGNED(slotIndex)`
  - Preconditions: slot assigned, unitStatus='on_fire'
  - Result: clear slot (assigned=false), unit becomes functional

- `FIREV4_DESTROY_ASSIGNED(slotIndex)`
  - Preconditions: slot assigned, unitStatus='on_fire'
  - Result: unitStatus='destroyed' (no longer on_fire), slot remains assigned, chainActive continues

- `FIREV4_END_KEEP_DESTROYED(slotIndex)`
  - Preconditions: slot assigned, unitStatus='destroyed'
  - Result: chainActive=false, slot remains assigned and stays destroyed

- `FIREV4_END_CLEAR_ASSIGNMENT(slotIndex)`
  - Preconditions: slot assigned, unit is functional (or just extinguished)
  - Result: clear slot (assigned=false)

### 7.2 Fire ops (global)
- `FIREV4_START_OUTBREAK({ bypassCap: boolean })`
  - Runs the outbreak logic (Section 5)
  - If no free slot exists: outbreak fails safely (no-op, log)

---

## 8) Destroyed buildings & repair rules (V4)

### 8.1 Destroyed building cannot be manually repaired while chainActive=true
If a unit is destroyed and its incident slot has `chainActive=true`, then:
- Construction UI must not offer “Repair building” for that unit.

### 8.2 Destroyed building can start repair chain when chainActive=false
If a unit is destroyed and its incident slot has `chainActive=false`, then:
- Construction UI shows “Repair building” action which schedules a repair chain for that exact incident.

---

## 9) Repair request chains (V4)

### 9.1 Repair chain starts only via Construction UI action
Repair chains never start randomly.

Start conditions:
- There exists at least one incident slot for this building type where:
  - `assigned=true`
  - `unitStatus='destroyed'`
  - `chainActive=false`

### 9.2 Selecting which destroyed unit to repair (when multiple exist)
Because the Construction screen does not list individual units:
- “Repair building” starts repair for the **lowest unitOrdinal** among repairable destroyed incidents of that building type.

### 9.3 Repair chain requirements
Repair chains must lead to either:
- **Reconstruct assigned unit** (destroyed → functional, clears assignment)
- **Leave destroyed** (ends with chainActive=false, keeps assignment)

### 9.4 Repair chain slot binding
Repair chain request IDs are also slot-specific:
- Start ID: `REPAIRV4_S{slotIndex}_START`

On repair start:
- Set slot:
  - `chainKind='repair'`
  - `chainActive=true`

---

## 10) UI/UX integration (V4)

## 10.1 Request screen (fire/repair requests)
### Fire tag and context (no numeric counts)
For any request that is part of a fire chain:
- Show a tag like: `🔥 Brand`
- Show a context line (no counts):
  - `Affected: {buildingIcon} {buildingName} • Unit {unitOrdinal} • Status: 🔥`
  - Add an **Inactive** chip to communicate: “this unit does not count toward active buildings”

For destroyed-unit requests inside a fire/repair chain:
- Same format but with status `💥 Destroyed` and Inactive chip.

> No “Active/Built” numbers appear in requests.

## 10.2 Construction screen (BuildingCard)
### Built/effective display remains here
- Continue showing effective vs built on the building card (existing behavior).

### Show mixed-state clarity for the same building type
Add status breakdown:
- `🔥 On fire: F`
- `💥 Destroyed: D`
- Split destroyed into:
  - `🔒 Locked: L` (destroyed incidents with chainActive=true)
  - `🛠 Repairable: R` (destroyed incidents with chainActive=false)

### Action buttons (no queue navigation)
- **No “Open Incident” button** (no queue visibility).
- For on_fire:
  - No direct action button required (resolution is via request chain on the request screen).
- For destroyed:
  - If `R > 0` show button: **Repair building**
    - Starts the repair chain for one repairable incident (Section 9.2)
  - If `R == 0` and `D > 0` show disabled hint:
    - “Repair locked until incident resolves”

---

## 11) Request set blueprint (IDs & expected structure)

### 11.1 Fire chains (per slot, per variant)
For each slot `n = 1..10`, and for each variant `A/B`:
- ChainId: `FIREV4_S{n}_{A|B}`
- Requests (example small chain, 4–6 total):
  - `FIREV4_S{n}_{V}_START` (start)
  - `FIREV4_S{n}_{V}_STEP1` (member)
  - `FIREV4_S{n}_{V}_STEP2` (member) *(optional)*
  - One or more ends:
    - `FIREV4_S{n}_{V}_END_EXT` (end → extinguish + clear assignment)
    - `FIREV4_S{n}_{V}_END_DEST` (end → leave destroyed, keep assignment inactive)

Variant requirements:
- At least one option somewhere provides `FIREV4_START_OUTBREAK({ bypassCap:true|false })`.

### 11.2 Repair chains (per slot)
For each slot `n = 1..10`:
- ChainId: `REPAIRV4_S{n}`
- Requests (example small chain):
  - `REPAIRV4_S{n}_START` (start)
  - `REPAIRV4_S{n}_PROGRESS` (member) *(optional)*
  - `REPAIRV4_S{n}_END` (end; outcome chosen in options)

---

## 12) Edge cases and required behaviors

- **No eligible units** (all effectiveCount=0) → outbreak does nothing.
- **No free incident slot** → outbreak does nothing (including effect outbreaks).
- **Destroyed incidents can persist indefinitely** (assigned slot remains reserved) until reconstruction.
- **Cap bypass** only affects the natural max-fires limit; it does not override the hard slot count.
- If a request tries to extinguish/destroy but the unit is already in the wrong state, reducer must fail safely (no-op + log).

---

## 13) Acceptance checklist (V4)

1) Natural outbreak uses unchanged formula and attempts once per tick-advance.
2) Outbreak selects one **functional unit** randomly across the whole village.
3) The selected unit becomes **on_fire**, is **inactive** (not counted), and a fire chain starts immediately via scheduled event.
4) While unit is on_fire, exactly one fire chain is active and assigned.
5) Fire chain contains effects that can:
   - start new fire,
   - destroy assigned unit,
   - extinguish assigned unit
6) Destroyed + chainActive=true → no manual repair.
7) Destroyed + chainActive=false → “Repair building” starts a repair request chain.
8) Repair chain ends in either reconstruction (clears assignment) or leaving destroyed (assignment remains inactive).
9) Request screen shows target + status (no numeric active/built counts). Construction screen shows counts and locked vs repairable destroyed.

---