/**
 * Generic Building System for Die Marken Kaledruns.
 * Replaces the old Needs system with proactive building mechanics.
 */

/**
 * Definition of a building type that can be constructed by the player.
 */
export interface BuildingDefinition {
  /** Stable unique identifier (e.g. 'farmstead', 'marketplace') */
  id: string;
  /** English display name shown in UI */
  displayName: string;
  /** Emoji icon for the building */
  icon: string;
  /** Flavor text shown in the Build Screen */
  description: string;
  /** Minimum farmers required to unlock this building (0 = available from start) */
  unlockThreshold: number;
  /** Gold cost per instance */
  cost: number;
  /** Additional farmers needed per extra building after the first (undefined = non-scaling, only 1 ever needed) */
  populationPerBuilding?: number;
  /** Identifier for benefit checks (replaces old need booleans) */
  benefitId: string;
  /** Benefit text shown in UI */
  benefitDescription: string;
  /** Unlock token set when first built (for event gating, e.g. 'building:marketplace') */
  unlockToken?: string;
  /** Info request ID scheduled on first build (0→1) */
  firstBuildInfoRequestId?: string;
  /** Reminder request ID shown when building is needed but not built */
  reminderRequestId?: string;
  /** Ticks to wait before showing reminder after unlock/requirement */
  reminderDelayTicks: number;
  /** Display order in Build Screen (lower = higher) */
  sortOrder: number;
}

/**
 * Runtime tracking data for a single building type.
 */
export interface BuildingTracking {
  /** Number of instances built (persistent, never decreases) */
  buildingCount: number;
  /** Tick when this building type was first unlocked */
  unlockedAtTick?: number;
  /** Tick when an additional building last became required (population crossed threshold) */
  lastRequirementTick?: number;
  /** Whether a reminder has already been scheduled this cycle */
  reminderScheduled: boolean;
  /** Earliest tick when the next reminder can be shown */
  reminderCooldownUntil: number;
}

/**
 * All building definitions in the game, sorted by sortOrder.
 */
export const BUILDING_DEFINITIONS: BuildingDefinition[] = [
  {
    id: 'farmstead',
    displayName: 'Farmstead',
    icon: '\u{1F3E0}',
    description: 'A sturdy homestead that houses up to 20 farmers. Without enough farmsteads, excess population resorts to makeshift camps.',
    unlockThreshold: 0,
    cost: 15,
    populationPerBuilding: 20,
    benefitId: 'farmstead',
    benefitDescription: 'Houses 20 farmers',
    reminderRequestId: 'REMINDER_FARMSTEAD',
    reminderDelayTicks: 8,
    sortOrder: 0,
  },
  {
    id: 'marketplace',
    displayName: 'Marketplace',
    icon: '\u{1F3EA}',
    description: 'A bustling center of trade where goods and gossip flow freely.',
    unlockThreshold: 30,
    cost: 20,
    populationPerBuilding: 100,
    benefitId: 'marketplace',
    benefitDescription: 'Unlocks event "Market Day"',
    unlockToken: 'building:marketplace',
    firstBuildInfoRequestId: 'INFO_NEED_MARKETPLACE',
    reminderRequestId: 'REMINDER_MARKETPLACE',
    reminderDelayTicks: 10,
    sortOrder: 1,
  },
  {
    id: 'bakery',
    displayName: 'Bakery',
    icon: '\u{1F35E}',
    description: 'Fresh bread feeds the soul and draws new settlers to the village.',
    unlockThreshold: 60,
    cost: 40,
    populationPerBuilding: 120,
    benefitId: 'bakery',
    benefitDescription: '10% chance per tick for +1 farmer growth',
    firstBuildInfoRequestId: 'INFO_NEED_BREAD',
    reminderRequestId: 'REMINDER_BAKERY',
    reminderDelayTicks: 10,
    sortOrder: 2,
  },
  {
    id: 'brewery',
    displayName: 'Brewery',
    icon: '\u{1F37A}',
    description: 'A place where fine ale is brewed, lifting spirits and fostering camaraderie.',
    unlockThreshold: 100,
    cost: 70,
    populationPerBuilding: 150,
    benefitId: 'brewery',
    benefitDescription: 'Unlocks event "Tavern After Work"',
    unlockToken: 'building:brewery',
    firstBuildInfoRequestId: 'INFO_NEED_BEER',
    reminderRequestId: 'REMINDER_BREWERY',
    reminderDelayTicks: 12,
    sortOrder: 3,
  },
  {
    id: 'firewood',
    displayName: 'Firewood Supply',
    icon: '\u{1FAB5}',
    description: 'An organized supply of firewood reduces the risk of uncontrolled blazes.',
    unlockThreshold: 170,
    cost: 200,
    populationPerBuilding: 180,
    benefitId: 'firewood',
    benefitDescription: '25% chance to halve fire risk increases',
    firstBuildInfoRequestId: 'INFO_NEED_FIREWOOD',
    reminderRequestId: 'REMINDER_FIREWOOD',
    reminderDelayTicks: 12,
    sortOrder: 4,
  },
  {
    id: 'well',
    displayName: 'Central Well',
    icon: '\u{1F4A7}',
    description: 'Clean water from a deep well keeps disease at bay and the population healthy.',
    unlockThreshold: 250,
    cost: 300,
    populationPerBuilding: 200,
    benefitId: 'well',
    benefitDescription: '50% chance for +1 health on health gains',
    firstBuildInfoRequestId: 'INFO_NEED_WELL',
    reminderRequestId: 'REMINDER_WELL',
    reminderDelayTicks: 15,
    sortOrder: 5,
  },
];

/**
 * Check if a building has been built at least once.
 * Replaces all old `needs.firewood`, `needs.bread`, etc. checks.
 */
export function isBuildingActive(
  buildingTracking: Record<string, BuildingTracking>,
  buildingId: string
): boolean {
  return (buildingTracking[buildingId]?.buildingCount ?? 0) > 0;
}

/**
 * Calculate how many instances of a building are required at the current population.
 * Returns 0 if not yet unlocked.
 */
export function calculateRequiredBuildings(def: BuildingDefinition, farmers: number): number {
  if (farmers < def.unlockThreshold) return 0;
  if (!def.populationPerBuilding) return 1;
  return 1 + Math.floor((farmers - def.unlockThreshold) / def.populationPerBuilding);
}

/**
 * Look up a BuildingDefinition by its ID.
 */
export function getBuildingDef(buildingId: string): BuildingDefinition | undefined {
  return BUILDING_DEFINITIONS.find(d => d.id === buildingId);
}

/**
 * Create initial building tracking state for all buildings.
 * Farmstead starts with 1 built (to match starting farmer count of 20).
 */
export function createInitialBuildingTracking(): Record<string, BuildingTracking> {
  const tracking: Record<string, BuildingTracking> = {};
  for (const def of BUILDING_DEFINITIONS) {
    tracking[def.id] = {
      buildingCount: def.id === 'farmstead' ? 1 : 0,
      reminderScheduled: false,
      reminderCooldownUntil: 0,
    };
  }
  return tracking;
}
