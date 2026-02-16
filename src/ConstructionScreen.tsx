import { useEffect, useRef, useMemo } from 'react'
import './ConstructionScreen.css'
import BuildingCard from './BuildingCard'
import type { BuildingStatus } from './BuildingCard'
import { BUILDING_DEFINITIONS, calculateRequiredBuildings } from './game/buildings'
import type { BuildingDefinition, BuildingTracking } from './game/buildings'

interface ConstructionScreenProps {
  isOpen: boolean;
  onClose: () => void;
  farmers: number;
  gold: number;
  buildingTracking: Record<string, BuildingTracking>;
  highlightedBuilding?: string;
  onBuild: (buildingId: string) => void;
}

function ConstructionScreen({ 
  isOpen, 
  onClose, 
  farmers, 
  gold, 
  buildingTracking, 
  highlightedBuilding,
  onBuild 
}: ConstructionScreenProps) {
  const highlightedBuildingRef = useRef<HTMLDivElement>(null)
  
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
  
  // Sort buildings by urgency/status priority (memoized to avoid recalculating on every render)
  const sortedBuildings = useMemo(() => {
    // Define status priority (lower number = higher priority)
    const statusPriority: Record<BuildingStatus, number> = {
      'needed': 1,      // Most urgent - needs building and can afford
      'no-gold': 2,     // Urgent but can't afford
      'available': 3,   // Can build but not urgent
      'fulfilled': 4,   // Requirements met
      'locked': 5       // Not yet unlocked
    }
    
    // Create array of buildings with their status
    const buildingsWithStatus = BUILDING_DEFINITIONS.map(def => ({
      definition: def,
      status: getBuildingStatus(def)
    }))
    
    // Sort by status priority, then by original sortOrder for ties
    return [...buildingsWithStatus].sort((a, b) => {
      const priorityDiff = statusPriority[a.status] - statusPriority[b.status]
      if (priorityDiff !== 0) return priorityDiff
      return a.definition.sortOrder - b.definition.sortOrder
    })
  }, [buildingTracking, farmers, gold])
  
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
        
        {/* Building Cards */}
        <div className="construction-content">
          {sortedBuildings.map(({ definition: def, status }) => {
            const tracking = buildingTracking[def.id]
            if (!tracking) return null
            
            const required = calculateRequiredBuildings(def, farmers)
            const isHighlighted = highlightedBuilding === def.id
            
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
                  onBuild={onBuild}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ConstructionScreen
