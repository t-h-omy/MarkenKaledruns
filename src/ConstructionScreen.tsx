import { useEffect, useRef, useMemo, useState } from 'react'
import './ConstructionScreen.css'
import BuildingCard from './BuildingCard'
import BuildMultipleModal from './BuildMultipleModal'
import type { BuildingStatus } from './BuildingCard'
import { BUILDING_DEFINITIONS, calculateRequiredBuildings, getBuildingDef } from './game/buildings'
import type { BuildingDefinition, BuildingTracking } from './game/buildings'
import type { FireIncidentSlotState } from './game/models'
import type { ActiveConstruction } from './game/state'
import { DISTRICT_DEFINITIONS, getDistrictDef } from './game/districts'

/** Number of ticks a building is considered "newly unlocked" after its threshold is crossed */
const NEWLY_UNLOCKED_TICKS = 15

interface ConstructionScreenProps {
  isOpen: boolean;
  onClose: () => void;
  farmers: number;
  gold: number;
  buildingTracking: Record<string, BuildingTracking>;
  fireSlots: FireIncidentSlotState[];
  highlightedBuilding?: string;
  onBuild: (buildingId: string) => void;
  onStartRepairChain?: (buildingId: string) => void;
  /** Currently active construction, or null/undefined if nothing is being built */
  activeConstruction?: ActiveConstruction | null;
  /** Current game tick, used to compute remaining construction time */
  currentTick: number;
  /** Set of completed district IDs */
  completedDistricts: Record<string, true>;
}

function ConstructionScreen({ 
  isOpen, 
  onClose, 
  farmers, 
  gold, 
  buildingTracking, 
  fireSlots,
  highlightedBuilding,
  onBuild,
  onStartRepairChain,
  activeConstruction,
  currentTick,
  completedDistricts,
}: ConstructionScreenProps) {
  const highlightedBuildingRef = useRef<HTMLDivElement>(null)
  const [buildMultipleModalOpen, setBuildMultipleModalOpen] = useState(false)
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null)
  
  // Get selected building definition and data
  const selectedBuilding = selectedBuildingId ? (getBuildingDef(selectedBuildingId) ?? null) : null
  const selectedTracking = selectedBuildingId ? buildingTracking[selectedBuildingId] : null
  const selectedRequired = selectedBuilding ? calculateRequiredBuildings(selectedBuilding, farmers) : 0
  const selectedShortage = selectedTracking 
    ? Math.max(0, selectedRequired - selectedTracking.buildingCount) 
    : 0
  
  // Handle Escape key to close
  useEffect(() => {
    if (!isOpen) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])
  
  // Scroll to highlighted building when screen opens
  useEffect(() => {
    if (isOpen && highlightedBuilding && highlightedBuildingRef.current) {
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        highlightedBuildingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  }, [isOpen, highlightedBuilding])
  
  // Handlers for build multiple
  const handleOpenBuildMultiple = (buildingId: string) => {
    setSelectedBuildingId(buildingId)
    setBuildMultipleModalOpen(true)
  }
  
  const handleCloseBuildMultiple = () => {
    setBuildMultipleModalOpen(false)
    setSelectedBuildingId(null)
  }
  
  const handleConfirmBuildMultiple = (buildingId: string, quantity: number) => {
    // Dispatch multiple BUILD_BUILDING actions
    // Note: Each action validates gold availability, so failed builds are prevented
    for (let i = 0; i < quantity; i++) {
      onBuild(buildingId)
    }
    // Close modal after batch build
    handleCloseBuildMultiple()
  }
  
  /** Whether Build Multiple should be offered for this building */
  const shouldShowBuildMultiple = (def: BuildingDefinition, shortage: number) =>
    def.repeatable && shortage > 1
  
  /** Whether a building was recently unlocked */
  const isBuildingNewlyUnlocked = (buildingId: string): boolean => {
    const tracking = buildingTracking[buildingId]
    if (!tracking?.unlockedAtTick) return false
    return currentTick - tracking.unlockedAtTick < NEWLY_UNLOCKED_TICKS
  }
  
  // Calculate building status
  const getBuildingStatus = (def: BuildingDefinition): BuildingStatus => {
    const tracking = buildingTracking[def.id]
    if (!tracking) return 'locked'

    if (farmers < def.unlockThreshold) return 'locked'

    const required = calculateRequiredBuildings(def, farmers)
    const built = tracking.buildingCount

    if (built < required) {
      return gold >= def.cost ? 'needed' : 'no-gold'
    }

    return 'fulfilled'
  }
  
  // Group buildings by section: capacity vs district, sorted within each group
  const { capacityBuildings, districtSections } = useMemo(() => {
    const statusPriority: Record<BuildingStatus, number> = {
      'needed': 1,
      'no-gold': 2,
      'available': 3,
      'fulfilled': 4,
      'locked': 5
    }
    
    const sortByStatus = (
      a: { definition: BuildingDefinition; status: BuildingStatus },
      b: { definition: BuildingDefinition; status: BuildingStatus }
    ) => {
      const priorityDiff = statusPriority[a.status] - statusPriority[b.status]
      if (priorityDiff !== 0) return priorityDiff
      return a.definition.sortOrder - b.definition.sortOrder
    }
    
    const capacity = BUILDING_DEFINITIONS
      .filter(def => def.category === 'capacity')
      .map(def => ({ definition: def, status: getBuildingStatus(def) }))
      .sort(sortByStatus)
    
    const sections = DISTRICT_DEFINITIONS.map(district => {
      const buildings = BUILDING_DEFINITIONS
        .filter(def => def.districtId === district.id)
        .map(def => ({ definition: def, status: getBuildingStatus(def) }))
        .sort(sortByStatus)
      
      const builtCount = district.buildingIds.filter(
        id => (buildingTracking[id]?.buildingCount ?? 0) >= 1
      ).length
      const complete = !!completedDistricts[district.id]
      
      return { district, buildings, builtCount, complete }
    })
    
    return { capacityBuildings: capacity, districtSections: sections }
  }, [buildingTracking, farmers, gold, completedDistricts])
  
  if (!isOpen) return null
  
  return (
    <div className="construction-screen-overlay" onClick={onClose}>
      <div className="construction-screen-panel" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="construction-close-btn" onClick={onClose}>
          ✕
        </button>
        
        {/* Header */}
        <div className="construction-header">
          <h2>🏗️ Settlement Construction</h2>
          <div className="construction-stats">
            <span>👨‍🌾 Farmers: {farmers}</span>
            <span>💰 Gold: {gold}</span>
          </div>
        </div>
        
        {/* Active Construction Panel */}
        {activeConstruction && (() => {
          const activeDef = getBuildingDef(activeConstruction.buildingId);
          const remainingTicks = Math.max(0, activeConstruction.completionTick - currentTick);
          const totalDuration = activeConstruction.completionTick - activeConstruction.startedAtTick;
          const elapsed = totalDuration - remainingTicks;
          const progressPercent = totalDuration > 0 ? Math.min(100, (elapsed / totalDuration) * 100) : 100;
          const districtDef = activeDef?.districtId ? getDistrictDef(activeDef.districtId) : undefined;
          
          return (
            <div className="active-construction-panel">
              <div className="active-construction-header">
                <span className="active-construction-icon">{activeDef?.icon ?? '🏗️'}</span>
                <div className="active-construction-info">
                  <span className="active-construction-title">
                    Building: {activeDef?.displayName ?? activeConstruction.buildingId}
                  </span>
                  {districtDef && (
                    <span className="active-construction-district">
                      📍 {districtDef.name}
                    </span>
                  )}
                </div>
                <span className="active-construction-ticks">
                  ⏱ {remainingTicks} tick{remainingTicks !== 1 ? 's' : ''} remaining
                </span>
              </div>
              <div className="active-construction-progress-bar">
                <div
                  className="active-construction-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="active-construction-progress-label">
                {Math.round(progressPercent)}% complete
              </div>
            </div>
          );
        })()}

        {/* Building Cards — grouped by section */}
        <div className="construction-content">
          {/* Capacity Buildings Section */}
          <div className="capacity-section">
            <div className="district-section-header">
              🏠 Capacity Buildings
            </div>
            {capacityBuildings.map(({ definition: def, status }) => {
              const tracking = buildingTracking[def.id]
              if (!tracking) return null
              
              const required = calculateRequiredBuildings(def, farmers)
              const isHighlighted = highlightedBuilding === def.id
              const shortage = Math.max(0, required - tracking.buildingCount)
              
              const slotsForBuilding = fireSlots.filter(
                s => s.assigned && s.targetBuildingId === def.id && s.unitStatus === 'destroyed'
              )
              const lockedDestroyedCount = slotsForBuilding.filter(s => s.chainActive).length
              const repairableDestroyedCount = slotsForBuilding.filter(s => !s.chainActive).length
              
              return (
                <div 
                  key={def.id} 
                  id={`building-card-${def.id}`}
                  ref={isHighlighted ? highlightedBuildingRef : null}
                >
                  <BuildingCard
                    definition={def}
                    tracking={tracking}
                    farmers={farmers}
                    gold={gold}
                    requiredCount={required}
                    status={status}
                    isHighlighted={isHighlighted}
                    lockedDestroyedCount={lockedDestroyedCount}
                    repairableDestroyedCount={repairableDestroyedCount}
                    onBuild={onBuild}
                    onBuildMultiple={shouldShowBuildMultiple(def, shortage) ? handleOpenBuildMultiple : undefined}
                    onStartRepairChain={onStartRepairChain}
                    constructionActive={!!activeConstruction}
                    activelyBuilding={activeConstruction?.buildingId === def.id}
                    isNewlyUnlocked={isBuildingNewlyUnlocked(def.id)}
                  />
                </div>
              )
            })}
          </div>
          
          {/* District Sections */}
          {districtSections.map(({ district, buildings, builtCount, complete }) => {
            const hasNewlyUnlocked = buildings.some(b => isBuildingNewlyUnlocked(b.definition.id))
            
            return (
            <div 
              key={district.id} 
              className={`district-section${complete ? ' district-complete' : ''}`}
            >
              <div className="district-section-header">
                🏛️ {district.name}
              </div>
              <div className="district-section-progress">
                {complete 
                  ? '✅ District Complete' 
                  : `${builtCount}/${district.buildingIds.length} buildings complete`}
              </div>
              <div className="district-section-hint">
                Completing this district unlocks advanced event chains
              </div>
              {hasNewlyUnlocked && !complete && (
                <div className="district-new-banner">
                  🆕 New buildings available! Choose your village's direction
                </div>
              )}
              
              {buildings.map(({ definition: def, status }) => {
                const tracking = buildingTracking[def.id]
                if (!tracking) return null
                
                const required = calculateRequiredBuildings(def, farmers)
                const isHighlighted = highlightedBuilding === def.id
                const shortage = Math.max(0, required - tracking.buildingCount)
                
                const slotsForBuilding = fireSlots.filter(
                  s => s.assigned && s.targetBuildingId === def.id && s.unitStatus === 'destroyed'
                )
                const lockedDestroyedCount = slotsForBuilding.filter(s => s.chainActive).length
                const repairableDestroyedCount = slotsForBuilding.filter(s => !s.chainActive).length
                
                const isAlreadyBuilt = !def.repeatable && tracking.buildingCount >= 1
                
                return (
                  <div 
                    key={def.id} 
                    id={`building-card-${def.id}`}
                    ref={isHighlighted ? highlightedBuildingRef : null}
                    className={isAlreadyBuilt ? 'building-already-built-wrapper' : undefined}
                  >
                    {isAlreadyBuilt && (
                      <div className="building-already-built-overlay">✅ Built</div>
                    )}
                    <BuildingCard
                      definition={def}
                      tracking={tracking}
                      farmers={farmers}
                      gold={gold}
                      requiredCount={required}
                      status={status}
                      isHighlighted={isHighlighted}
                      lockedDestroyedCount={lockedDestroyedCount}
                      repairableDestroyedCount={repairableDestroyedCount}
                      onBuild={onBuild}
                      onBuildMultiple={shouldShowBuildMultiple(def, shortage) ? handleOpenBuildMultiple : undefined}
                      onStartRepairChain={onStartRepairChain}
                      constructionActive={!!activeConstruction}
                      activelyBuilding={activeConstruction?.buildingId === def.id}
                      isNewlyUnlocked={isBuildingNewlyUnlocked(def.id)}
                    />
                  </div>
                )
              })}
            </div>
            )
          })}
        </div>
      </div>
      
      {/* Build Multiple Modal */}
      <BuildMultipleModal
        isOpen={buildMultipleModalOpen}
        onClose={handleCloseBuildMultiple}
        building={selectedBuilding}
        currentGold={gold}
        shortage={selectedShortage}
        onConfirm={handleConfirmBuildMultiple}
      />
    </div>
  )
}

export default ConstructionScreen
