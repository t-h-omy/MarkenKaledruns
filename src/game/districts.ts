/**
 * District System for Die Marken Kaledruns.
 * Districts are groups of buildings that unlock bonuses when all buildings are completed.
 */

import type { BuildingTracking } from './buildings';

/**
 * Definition of a district — a themed group of buildings.
 * When all buildings in a district are built, the district is considered complete.
 */
export interface DistrictDefinition {
  /** Stable unique identifier (e.g. 'commerce', 'military') */
  id: string;
  /** English display name shown in UI */
  name: string;
  /** Building IDs that belong to this district */
  buildingIds: string[];
  /** Unlock tokens granted when the district is completed */
  completionUnlockTokens: string[];
  /** Event chain IDs unlocked when the district is completed */
  completionEventChainUnlocks: string[];
  /** Info request ID shown when the district is completed */
  completionInfoRequestId?: string;
}

/**
 * All district definitions in the game.
 */
export const DISTRICT_DEFINITIONS: DistrictDefinition[] = [
  {
    id: 'commerce',
    name: 'Commerce District',
    buildingIds: ['marketplace', 'tavern'],
    completionUnlockTokens: ['district:commerce_complete'],
    completionEventChainUnlocks: ['chain:commerce_major'],
    completionInfoRequestId: 'INFO_DISTRICT_COMMERCE_COMPLETE',
  },
  {
    id: 'military',
    name: 'Military District',
    buildingIds: ['garrison', 'training_yard'],
    completionUnlockTokens: ['district:military_complete'],
    completionEventChainUnlocks: ['chain:military_major'],
    completionInfoRequestId: 'INFO_DISTRICT_MILITARY_COMPLETE',
  },
  {
    id: 'faith',
    name: 'Faith/Relief District',
    buildingIds: ['shrine', 'healers_house'],
    completionUnlockTokens: ['district:faith_complete'],
    completionEventChainUnlocks: ['chain:faith_major'],
    completionInfoRequestId: 'INFO_DISTRICT_FAITH_COMPLETE',
  },
];

/**
 * Look up a DistrictDefinition by its ID.
 */
export function getDistrictDef(districtId: string): DistrictDefinition | undefined {
  return DISTRICT_DEFINITIONS.find(d => d.id === districtId);
}

/**
 * Check if all buildings in a district have been built at least once.
 */
export function isDistrictComplete(
  districtId: string,
  buildingTracking: Record<string, BuildingTracking>
): boolean {
  const district = getDistrictDef(districtId);
  if (!district) return false;
  return district.buildingIds.every(
    buildingId => (buildingTracking[buildingId]?.buildingCount ?? 0) >= 1
  );
}
