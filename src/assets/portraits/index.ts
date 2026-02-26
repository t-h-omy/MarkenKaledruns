/**
 * Portrait registry for request screen portraits.
 * Each key maps to an imported portrait image asset.
 */

import advisorPortrait from './advisor.webp'
import banditPortrait from './bandit.webp'
import councilMemberPortrait from './council_member.webp'
import farmerPortrait from './farmer.webp'
import merchantPortrait from './merchant.webp'
import militaryAdvisorPortrait from './military_advisor.webp'

/** Typed lookup object for portrait images. */
export const PORTRAITS = {
  advisor: advisorPortrait,
  bandit: banditPortrait,
  council_member: councilMemberPortrait,
  farmer: farmerPortrait,
  merchant: merchantPortrait,
  military_advisor: militaryAdvisorPortrait,
} as const

/** Union type of valid portrait keys. */
export type PortraitId = keyof typeof PORTRAITS
