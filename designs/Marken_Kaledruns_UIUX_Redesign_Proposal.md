# UI/UX Design Analysis & Proposal
## Marken Kaledruns – Medieval Management Game

---

## 1. Current State Analysis

### Strengths
- Clear stat tracking
- Functional layout
- Color-coded feedback
- Mobile-first structure

### Weaknesses
- Text-heavy and visually flat
- No character visuals
- Limited hierarchy
- Generic dark mode aesthetic
- Cramped spacing
- Insufficient contrast in some areas

---

## 2. Core Redesign Vision – “The Throne Room”

The UI should feel like sitting in a medieval throne room receiving petitions, reports, and making weighty decisions.

### Layout Strategy

**Desktop**
- Left: Ledger (Stats + Buildings + Log)
- Right: Petition Panel (Character + Request + Options)

**Mobile**
- Header
- Request Panel
- Compact Stats Bar
- Bottom Tabs

Benefits:
- Clear grouping
- Reduced cognitive overload
- Better spatial memory
- Improved readability

---

## 3. Character Portrait System

### Purpose
- Humanize decision-making
- Increase immersion
- Improve memorability

### Data Model

```ts
export interface CharacterPortrait {
  id: string;
  name: string;
  title: string;
  portraitUrl?: string;
  icon?: string;
  backgroundColor?: string;
}

export interface Request {
  character?: CharacterPortrait;
}
```

### MVP Recommendation
Start with emoji placeholders and upgrade to illustrated portraits later.

---

## 4. Medieval Color System

### Base Palette
- Deep charcoal backgrounds
- Aged parchment panels
- Cream ink text

### Accent Rules
- Gold → Authority & titles only
- Red → Danger / Combat
- Blue → Information
- Green → Growth / Success

Goal: Reduce neon accents and create a heraldic manuscript aesthetic.

---

## 5. Typography System

### Fonts
- Body: Serif (Crimson Text / Merriweather)
- Titles: Display serif (Cinzel / Playfair)
- Numbers: Monospace

### Type Scale
- XS: 0.75rem
- Base: 1rem
- XL: 1.25rem
- 2XL: 1.5rem

Serif typography adds gravitas and historical atmosphere.

---

## 6. Stats Redesign – “The Ledger”

Group stats instead of horizontal overload:

- People (Health, Mood, Fire Risk)
- Treasury (Gold, Farmers)
- Military (Forces, Authority)

Benefits:
- Cognitive grouping
- Reduced clutter
- Stable number alignment

---

## 7. Petition Panel Structure

Sections:
1. Character Header
2. Petition Text
3. Decision Options

Add:
- Drop caps for first letter
- Section dividers
- Clear hierarchy

---

## 8. Interaction Improvements

- Hover shimmer on important decisions
- Decision preview system
- Tooltips for stats
- Optional Undo (Authority cost)

---

## 9. Accessibility Improvements

- WCAG AAA contrast where possible
- ARIA labels for stats
- Visible focus states
- Keyboard navigation
- Minimum 14px body text

---

## 10. Implementation Roadmap

### Phase 1 – Foundation
- Color variables
- Font integration
- Contrast adjustments

### Phase 2 – Layout
- Ledger grouping
- Portrait system
- Request restructuring

### Phase 3 – Polish
- Textures
- Micro-interactions
- Tooltips

### Phase 4 – Accessibility
- ARIA implementation
- Keyboard testing
- Screen reader testing

---

## Summary

This redesign transforms Marken Kaledruns from a functional text interface into a visually distinct medieval governance experience.

It increases immersion, improves hierarchy, strengthens usability, and prepares the UI for future scalability.
