# Version Display Preview

## What You'll See

After deploying, the version number will appear in the **bottom-right corner** of the screen.

```
┌─────────────────────────────────────────────┐
│ 💰 50  😊 60  ❤️ 60  🔥 20  👨‍🌾 20  ⚔️ 5  │
├─────────────────────────────────────────────┤
│                                             │
│         Game Content / Decisions            │
│                                             │
│                                             │
│                                             │
│                                             │
│                                             │
│                                             │
│                                       ┌────┐│
│                                       │v1.0││
│                                       │.0  ││
└───────────────────────────────────────┴────┘┘
```

## Styling Details

The version footer has:
- **Position**: Fixed to bottom-right corner (0.5rem from edges)
- **Font**: Monospace (e.g., Courier, Monaco)
- **Size**: 0.75rem (smaller on mobile: 0.7rem)
- **Color**: Gray (#666)
- **Background**: Semi-transparent white (rgba(255, 255, 255, 0.1))
- **Padding**: 0.25rem vertical, 0.5rem horizontal
- **Border**: 4px rounded corners
- **Z-index**: 1000 (always on top)
- **Pointer events**: None (clicks pass through)

## How to Verify

1. **Build the project**: `npm run build`
2. **Configure GitHub Pages** to deploy from this branch
3. **Visit your site**: https://t-h-omy.github.io/MarkenKaledruns/
4. **Look at bottom-right corner** - you should see: `v1.0.0`

If you see `v1.0.0`, you're on the new version with combat fixes!
If you see anything else (or no version), you're on an old build.

## Quick Comparison

**OLD VERSION (main branch):**
- No version number displayed
- EVT_RAID_LARGE has "DO NOT FIGHT" option with wrong effects
- CHAIN_BLACKGEAT events have broken options

**NEW VERSION (v1.0.0):**
- Version number shown (v1.0.0)
- EVT_RAID_LARGE has "SURRENDER" with balanced effects
- All combat events work correctly
- Version tracking system in place

## Testing Locally

To see the version number locally:
```bash
npm run dev
# Visit http://localhost:5173/MarkenKaledruns/
# Check bottom-right corner for version
```

## Mobile View

On mobile devices (screens < 768px wide):
- Version footer is slightly smaller (0.7rem font)
- Positioned closer to corner (0.25rem from edges)
- Still readable but unobtrusive
