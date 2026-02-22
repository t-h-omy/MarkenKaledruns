# FIRE SYSTEM V3 – 1:1 implementierbares Design

0) Ziele & harte Regeln (unverändert)

- Linearer Start-Chance: (FireRisk + baseOffset) * factor (clamped).
- Spread/Destroy im Tick-Loop, auch ohne aktive Chain, aber niemals silent: Info im nächsten Tick.
- Count-based Building States (Variante A).
- State bedeutet: Gebäude zählen nicht (effectiveCount).
- Build Lock pro Typ, sobald irgendein State vorhanden ist (on_fire/destroyed/on_strike).
- Manual Extinguish: wenn global alle Feuer aus → alle Fire-Chains abbrechen + Info next tick.
- Altes EVT_CRISIS_FIRE wird entfernt/ersetzt.
- Deterministisch, reducer-only, seeded RNG.

1) Datenmodell (unverändert)

1.1 BuildingTracking

```ts
interface BuildingTracking {
  buildingCount: number;
  onFireCount: number;
  destroyedCount: number;
  onStrikeCount: number;

  unlockedAtTick?: number;
  lastRequirementTick?: number;
  reminderScheduled: boolean;
  reminderCooldownUntil: number;
}
```

Derived

```ts
effectiveCount = buildingCount - onFireCount - destroyedCount - onStrikeCount
hasAnyState = onFireCount>0 || destroyedCount>0 || onStrikeCount>0
canBuildThisType = !hasAnyState

```

2) FireSystemConfig (angepasst)

2.1 Chain Slots = 10

```ts
interface FireSystemConfig {
  baseOffset: number;
  factor: number;
  chanceMin: number;
  chanceMax: number;

  maxConcurrentChainsByRisk: Array<{ minRisk:number; maxRisk:number; maxChains:number }>;

  spreadChancePerBurningBuilding: number;
  destroyChancePerBurningBuilding: number;

  repairCostPercentOfBuildCost: number;     // default 0.75

  extinguishCost: Effect;                   // global
  repairCostOverride?: Effect;

  chainSlots: number;                       // FIX: 10

  tierRules: Array<{
    tier: 'minor' | 'major' | 'catastrophic';
    minFireRisk: number;
    maxFireRisk: number;
    weight: number;
    initialOnFireMin: number;
    initialOnFireMax: number;
  }>;
}
Balancing-Regel: maxConcurrentChainsByRisk.maxChains darf niemals > chainSlots sein (Validator).

```

3) Fire Chains – Slot-Architektur (angepasst)

3.1 10 fixe Slots / feste chainIds

- CHAIN_FIRE_SLOT_1 … CHAIN_FIRE_SLOT_10
Pro Slot existiert eine statische Request-Kette in requests.ts:

- FIRE_S1_START, FIRE_S1_DECISION, FIRE_S1_ESCALATE, FIRE_S1_END
- …
- FIRE_S10_*
Definition “active” bleibt:

- Slot/Chain aktiv, bis End-Request erreicht oder manuell abgebrochen.
3.2 Slot State im GameState (unverändert, nur N=10)

```ts
interface FireChainSlotState {
  slotIndex: number;               // 1..10
  active: boolean;
  tier?: 'minor' | 'major' | 'catastrophic';
  targetBuildingId?: string;
  startedTick?: number;
  initialOnFireApplied?: number;
  abortedByManualExtinguish?: boolean;
}
```

3.3 Chain Tag / Context Line (unverändert)

UI zeigt:

- Tag: 🔥 Brand (Slot X)
- Context: Betroffen: <BuildingName> | 🔥 <onFireCount> | 🧱 <destroyedCount>

4) Tick-Loop (unverändert, inkl. Synthetic Info Requests)

4.1 Synthetic Info Requests (Empfehlung ist verbindlich)

Es gibt keine statischen Requests für Spread/Destroy, sondern synthetische Info-Requests, erzeugt aus pendingInfoQueue.

- INFO_FIRE_SPREAD_OR_DESTROYED (tickless)
- Text listet konkret die neuen +on_fire und +destroyed je Gebäudetyp.
- Optionen:
- Zum Bau-Menü (öffnet Construction Overlay)
- Weiter
- INFO_FIRE_ALL_EXTINGUISHED_ABORT (tickless)
- erklärt Abbruch aller Brandketten, weil alle Feuer manuell gelöscht wurden.
4.2 Fire Probability (linear)

chance% = clamp((fireRisk + baseOffset)*factor, min, max)
Start nur, wenn:

- activeFireChains < maxAllowedChains(fireRisk)
- mindestens ein effectiveCount > 0 Gebäudetyp existiert
- mindestens ein Slot frei
4.3 Spread & Destroy (tick loop, unabhängig von Chains)

- Spread: pro brennender Einheit Roll → zufälliges existierendes state-freies Gebäude (effectiveCount > 0) bekommt onFireCount +1
- Destroy: pro brennender Einheit Roll → onFireCount -1, destroyedCount +1
No Silent Damage: jede Änderung sammelt Deltas und triggert Info next tick.


5) Manual Actions im Construction Screen (angepasst: Build-Button wird ersetzt)

5.1 Grundsatz

Wenn hasAnyState === false:

- normaler Build-Button (Single + Bulk etc.) wie bisher.
Wenn hasAnyState === true:

- Build-Button existiert nicht.
- Stattdessen ein großer Primary-Button, der eindeutig den State behandelt.
5.2 Button-Priorität (klar, deterministisch)

Falls mehrere States gleichzeitig möglich sind (z.B. on_fire und destroyed):

- Priorität: on_fire > destroyed > on_strike
- Der Primary-Button zeigt immer die höchstpriorisierte Aktion.
Primary Action Button

- Wenn onFireCount>0 → Button: 🔥 Feuer löschen (1)
- else wenn destroyedCount>0 → Button: 🧱 Reparieren (1)
- else wenn onStrikeCount>0 → Button: ⚑ Streik beenden (1) (falls ihr on_strike später wirklich spielbar macht; sonst disabled + “nicht implementiert”)
Zusätzlich (unter dem Primary Button) optional Secondary Links/Buttons:

- Weitere Zustände… → öffnet Action Sheet/Modal mit allen verfügbaren Aktionen (extinguish/repair/…)
- Das ist UI-Komfort, nicht zwingend – aber verhindert “ich will reparieren, aber card zeigt löschen”.
5.3 Aktionen (Repair nur destroyed reduzieren)

- Extinguish (1):
- Kosten: config.extinguishCost (global)
- Effekt: onFireCount -= 1
- Repair (1):
- Kosten: ceil(buildCost * 0.75) (default) oder repairCostOverride
- Effekt: destroyedCount -= 1
- keine Nebenwirkungen (kein fireRisk/satisfaction/health)
5.4 Globaler Chain-Abbruch nach manueller Löschung

Nach jeder Extinguish-Aktion:

- wenn global sum(onFireCount) == 0:
- setze alle fire.slots[].active = false
- queue INFO_FIRE_ALL_EXTINGUISHED_ABORT für nächsten Tick

6) “Counts zählen nicht” & Build Lock (unverändert)

- Alle Systems, die “Gebäude zählen”, nutzen effectiveCount.
- Build Lock: sobald irgendein State existiert → kein Neubau dieses Typs (UI und Reducer-Guard).

7) Fire Chain End Cleanup (präzise, unverändert)

Am Ende eines Slots gilt:

- mindestens die durch den Slot initial entzündeten Einheiten werden gelöscht:
- onFireCount[target] -= min(onFireCount[target], initialOnFireApplied)
- Spread-Brände sind echt und bleiben ggf. bestehen.
FireRisk Senkung passiert ausschließlich über End-Option Effects:

- Option A: fireRisk: -x
- Option B: fireRisk: -(x+y) + Kosten

8) Implementations-Checkliste (kurz, aber vollständig)

Models

- BuildingTracking erweitern
- GameState.fire hinzufügen (slots[10], pendingInfoQueue)
Reducer / state.ts

- Fire Tick Steps integrieren
- Spread/Destroy + Queue Info
- Start Chain in freien Slot
- Manual Actions: EXTINQUISH_ONE / REPAIR_ONE
- Global abort logic
Requests

- requests.ts: 10 Slot-Chains (4 Requests pro Slot)
- Remove/disable EVT_CRISIS_FIRE
```ts
UI
ConstructionScreen/BuildingCard:
```

- State counts anzeigen
- Build-Button ersetzen durch State-Primary-Button (wenn hasAnyState)
- Secondary “Weitere Zustände…” optional
- Synthetic Info Requests:
- “Zum Bau-Menü” deep-link/overlay öffnen
