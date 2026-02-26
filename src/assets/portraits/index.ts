/**
 * Portrait registry for request screen portraits.
 * Each key maps to an imported portrait image asset.
 */

import advisorPortrait from './advisor.webp'
import farmerPortrait from './farmer.webp'

/** Typed lookup object for portrait images. */
export const PORTRAITS = {
  advisor: advisorPortrait,
  farmer: farmerPortrait,
} as const

/** Union type of valid portrait keys. */
export type PortraitId = keyof typeof PORTRAITS
