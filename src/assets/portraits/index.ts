/**
 * Portrait registry for request screen portraits.
 * Each key maps to an imported portrait image asset.
 */

import advisorPortrait from './advisor.webp'
import antagonistVillagerPortrait from './antagonist_villager.webp'
import arkanatMagePortrait from './arkanat_mage.webp'
import banditPortrait from './bandit.webp'
import bardPortrait from './bard.webp'
import childrenPortrait from './children.webp'
import councilMemberPortrait from './council_member.webp'
import craftsmanPortrait from './craftsman.webp'
import elderPortrait from './elder.webp'
import envoyPortrait from './envoy.webp'
import farmerPortrait from './farmer.webp'
import guardPortrait from './guard.webp'
import healerPortrait from './healer.webp'
import knightPortrait from './knight.webp'
import mageAdvisorPortrait from './mage_advisor.webp'
import mercenaryPortrait from './mercenary.webp'
import merchantPortrait from './merchant.webp'
import militaryAdvisorPortrait from './military_advisor.webp'
import noblePortrait from './noble.webp'
import piratePortrait from './pirate.webp'
import refugeePortrait from './refugee.webp'
import rulerAlliedPortrait from './ruler_allied.webp'
import rulerEnemyStrongPortrait from './ruler_enemy_strong.webp'
import rulerEnemyWeakPortrait from './ruler_enemy_weak.webp'
import rulerNeutralPortrait from './ruler_neutral.webp'
import scoutPortrait from './scout.webp'
import spyEnemyPortrait from './spy_enemy.webp'
import traderPortrait from './trader.webp'
import travelerPortrait from './traveler.webp'
import villagePriestPortrait from './village_priest.webp'

/** Typed lookup object for portrait images. */
export const PORTRAITS = {
  advisor: advisorPortrait,
  antagonist_villager: antagonistVillagerPortrait,
  arkanat_mage: arkanatMagePortrait,
  bandit: banditPortrait,
  bard: bardPortrait,
  children: childrenPortrait,
  council_member: councilMemberPortrait,
  craftsman: craftsmanPortrait,
  elder: elderPortrait,
  envoy: envoyPortrait,
  farmer: farmerPortrait,
  guard: guardPortrait,
  healer: healerPortrait,
  knight: knightPortrait,
  mage_advisor: mageAdvisorPortrait,
  mercenary: mercenaryPortrait,
  merchant: merchantPortrait,
  military_advisor: militaryAdvisorPortrait,
  noble: noblePortrait,
  pirate: piratePortrait,
  refugee: refugeePortrait,
  ruler_allied: rulerAlliedPortrait,
  ruler_enemy_strong: rulerEnemyStrongPortrait,
  ruler_enemy_weak: rulerEnemyWeakPortrait,
  ruler_neutral: rulerNeutralPortrait,
  scout: scoutPortrait,
  spy_enemy: spyEnemyPortrait,
  trader: traderPortrait,
  traveler: travelerPortrait,
  village_priest: villagePriestPortrait,
} as const

/** Union type of valid portrait keys. */
export type PortraitId = keyof typeof PORTRAITS
