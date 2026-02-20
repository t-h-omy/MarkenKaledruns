# UI/UX Redesign — Current Implementation vs. Proposal
## Marken Kaledruns – Medieval Management Game

**Document Version:** 1.0  
**Created:** 2026-02-20  
**Based on:** UIUX_Redesign_Proposal_v2.md + codebase analysis  
**Status:** Reference

---

## 🎨 Visual Identity & Aesthetic

| | Current | Proposed |
|---|---|---|
| **Theme** | Generic dark mode (`#2a2a2a` backgrounds, neon-ish accents) | Medieval "heraldic manuscript" — charcoal, aged parchment, cream ink |
| **Typography** | System/sans-serif fonts, no defined type scale | Display serif (Cinzel/Playfair) for titles, body serif (Crimson Text), monospace for numbers |
| **Color language** | Ad-hoc per component | Semantic palette: Gold=authority, Red=danger/fire, Orange=warning, Green=growth, Purple=specialists |

---

## 📊 Stats Bar — "The Ledger"

| | Current | Proposed |
|---|---|---|
| **Layout** | Flat horizontal row of icons+values (`flex`, `justify-content: space-around`) — 7 stats side by side | Collapsible grouped sections: People / Treasury / Military / Settlement |
| **Scalability** | Breaks down visually beyond ~7 stats | Designed for up to 15 resources |
| **Population tiers** | Only Farmers tracked | All tiers (Farmers, Workers, + 2 more) shown as rows; locked tiers greyed with tooltip |
| **Stat changes** | Flying delta animations (`+/-` numbers floating up) ✅ — keep | Same, enhanced with tooltip on hover per stat |

---

## 📜 Petition / Request Panel

| | Current | Proposed |
|---|---|---|
| **Character** | No portraits — only plain text title + request text | Portrait card with emoji (→ illustrated art), name, title, heraldic tint |
| **Request chain** | `chainId` exists in data model but is **never displayed to the player** | Visible **chain name tag** (parchment ribbon banner) above every petition from a named chain |
| **Structure** | `<h2>Decision Required</h2>` + `<h3>` title + `<p>` text | Drop cap on first letter, section dividers, clear visual hierarchy |
| **Drop-caps / styling** | None | Drop cap on petition text, serif typography throughout |

---

## 🏗️ Construction Screen

| | Current | Proposed |
|---|---|---|
| **Implementation** | Already a full-screen overlay (`ConstructionScreen.tsx`) with building cards, status badges, bulk build modal ✅ | Same foundation — extend, not rebuild |
| **Scale** | 6 buildings | Designed for ~26 buildings with **search bar + filter tabs + sort options** |
| **Building states** | Not yet implemented | State badges per card: 🔥 On Fire, 🪧 On Strike, ⚡ Damaged — plus "States ⚠️" filter tab and main UI badge count |
| **Population-aware locking** | Unlocks based on farmer count only | Unlock threshold will reference population tier (farmers, workers, etc.) |

---

## 👑 Specialists & Royal Court

| | Current | Proposed |
|---|---|---|
| **Specialists** | Not implemented | New "Royal Court" full-screen overlay — council panels, slot-based assignment, specialist card pool |
| **Portrait reuse** | N/A | Specialist portraits use the exact same `CharacterPortrait` data model as petitioners — consistent visual language |

---

## 🔗 Request Chains (player-facing)

| | Current | Proposed |
|---|---|---|
| **`chainId` in data** | ✅ Exists — e.g. `chainId: 'BLACKGEAT'`, `chainId: 'noble_feud'` | Unchanged |
| **Displayed to player** | ❌ Never shown — player has no way to know a request belongs to a chain | ✅ Chain name tag rendered above every petition from a named chain |

---

## 🌍 Diplomacy

| | Current | Proposed |
|---|---|---|
| **Status** | Not implemented, no placeholder | Locked nav tab reserved — no design committed until concept is defined |

---

## ♿ Accessibility & Interactions

| | Current | Proposed |
|---|---|---|
| **Keyboard nav** | Escape closes overlays | Full keyboard navigation across all screens, visible focus states |
| **ARIA** | Minimal | ARIA labels on all stat rows and controls; state badges must not rely on color alone |
| **Tooltips** | None | Hover tooltips on stats, building benefits, locked tiers |
| **Decision preview** | Effect values shown on option buttons ✅ | Extended with hover shimmer, optional undo (Authority cost) |

---

## 🗺️ Implementation Scope

The current codebase is in **better shape than the original proposal assumed** �� the Construction screen, building cards, bulk build modal, and even chain-gating logic are already implemented. The redesign therefore focuses on:

1. **Visual/aesthetic overhaul** (color, typography, parchment theme) — largely CSS work
2. **Ledger restructure** for scalability
3. **Portrait + chain tag** additions to the petition panel
4. **Building state badges** as the next construction feature
5. **Royal Court screen** — the one genuinely new component needed