# POF Game Specification

This file is the single source of truth for the Proof-of-Fun game. Do not implement new features beyond this spec.

## Stats (all visible)

- **gold** (>=0)
- **satisfaction** (0..100, higher is better)
- **health** (0..100, higher is better)
- **fireRisk** (0..100, higher is worse)
- **farmers** (>=0)
- **landForces** (>=0, optionally clamp to 0..100)

## Start values

- gold=50
- satisfaction=60
- health=60
- fireRisk=20
- farmers=50
- landForces=5

## Needs (boolean flags)

- marketplace
- bread
- beer
- firewood
- well

**Clarification:** "Needs per 100 farmers" means that even for the first 100 farmers, each need can be fulfilled once via its need-request. Needs have no automatic effects; all effects are encoded in the requests.

## Baseline rules applied AFTER each chosen request

- **Gold income per tick:** gold += floor(0.1 * (farmers * (satisfaction / 100)))
- **Farmer growth per tick:** farmers += floor(health / 10)

## One tick loop

1. Each tick shows exactly 1 request.
2. Player chooses 1 of max 2 options.
3. Apply option effects permanently.
4. Apply baseline rules.
5. Pick next request (see selection rules).

## Request selection rules

**Crisis requests if eligible:**
- if satisfaction < 30: show crisis event "Unrest escalates" (event 11)
- if health < 30: show crisis event "Disease wave" (event 12)
- if fireRisk > 70: show crisis event "Fire danger acute" (event 13)

**Else, if any needs are unfulfilled:** randomly pick one of the 5 need-requests for an unfulfilled need.

**Else** pick a random event request from the 25 events.

**Never show the same request twice in a row.**

## Need-Requests (5)

1. **Marketplace:** BUILD -> satisfaction +3; gold -15; marketplace=true. DECLINE -> satisfaction -5
2. **Bread:** SUPPORT BAKERY -> farmers +15; gold -10; bread=true. IGNORE -> health -8
3. **Beer:** ALLOW -> gold -5; beer=true; satisfaction +5. FORBID -> no effect
4. **Firewood:** ORGANIZE -> gold -8; firewood=true; fireRisk -5. DO NOTHING -> fireRisk +10
5. **Well:** BUILD -> gold -12; well=true; health +5. DECLINE -> health -5

## Event-Requests (25)

### A) Military & security

1. **Recruit militia:** YES landForces +3, farmers -3, satisfaction -2; NO satisfaction -3
2. **Small raid:** FIGHT landForces -2; DO NOT FIGHT gold -10
3. **Large raid:** FIGHT landForces -4, satisfaction -5; DO NOT FIGHT gold -20, satisfaction -8
4. **Militia demands pay:** PAY gold -10, satisfaction +3; REFUSE landForces -2
5. **Restless night:** PATROL landForces -1, fireRisk -2; IGNORE satisfaction -3
6. **Veterans leave:** COMPENSATE gold -8; DO NOTHING landForces -2

### B) Population & growth

7. **New farmers want to settle:** ALLOW farmers +20, fireRisk +5; DECLINE satisfaction -5
8. **Emigration threatens:** CONCEDE gold -5, satisfaction +4; IGNORE farmers -10
9. **Big family asks for help:** HELP gold -5, satisfaction +3; DECLINE satisfaction -3
10. **Harvest helpers missing:** HIRE gold -6, farmers +10; DO NOTHING health -4

### C) Crisis events (only via selection rules above)

11. **Unrest escalates:** CONCESSIONS gold -10, satisfaction +8; CRACK DOWN landForces -2
12. **Disease wave:** HEALER gold -10, health +8; IGNORE farmers -10
13. **Fire danger acute:** PREPARE gold -8, fireRisk -10; DO NOTHING farmers -10

### D) Improve stats

14. **Build fire watch:** BUILD gold -10, fireRisk -10; DECLINE no effect
15. **Hold village festival:** HOLD gold -8, satisfaction +6; DECLINE no effect
16. **Buy medical herbs:** BUY gold -6, health +6; DECLINE no effect
17. **Train militia:** TRAIN gold -8, landForces +5; DECLINE no effect
18. **Clean up storage:** ORGANIZE gold -5, fireRisk -5; DECLINE no effect
19. **Tax reform:** LOWER taxes gold -10, satisfaction +7; RAISE taxes gold +20, satisfaction -5

### E) Worsen stats

20. **Nearby forest fire:** FIGHT gold -8; DO NOTHING fireRisk +10
21. **Plague from nearby village:** QUARANTINE satisfaction -3; IGNORE health -8
22. **Thefts increase:** MORE GUARDS landForces -2; DO NOTHING gold -8
23. **Bad harvest:** COMPENSATE gold -10; DO NOTHING satisfaction -6, health -4
24. **Firewood got wet:** REPLACE gold -6; IGNORE fireRisk +6
25. **Farmers quarrel (comic relief):** MEDIATE gold -1; IGNORE farmers -1

## DoD (Definition of Done)

- POF_SPEC.md ist vollständig, präzise
- Agent kann später ohne externe Infos weiterarbeiten
