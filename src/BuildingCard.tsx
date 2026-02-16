import './BuildingCard.css'
import type { BuildingDefinition, BuildingTracking } from './game/buildings'

export type BuildingStatus = 'locked' | 'available' | 'needed' | 'no-gold' | 'fulfilled'

interface BuildingCardProps {
  definition: BuildingDefinition;
  tracking: BuildingTracking;
  farmers: number;
  gold: number;
  requiredCount: number;
  status: BuildingStatus;
  isHighlighted?: boolean;
  onBuild: (buildingId: string) => void;
}

function BuildingCard({
  definition,
  tracking,
  farmers,
  gold,
  requiredCount,
  status,
  isHighlighted = false,
  onBuild
}: BuildingCardProps) {
  const built = tracking.buildingCount
  const shortage = Math.max(0, requiredCount - built)
  const canBuild = status !== 'locked' && gold >= definition.cost
  
  // Calculate progress percentage for the progress bar
  const progressPercentage = requiredCount > 0 ? (built / requiredCount) * 100 : 100
  
  // Get status badge label
  const getStatusLabel = (): string => {
    switch (status) {
      case 'locked': return 'LOCKED'
      case 'available': return 'AVAILABLE'
      case 'needed': return 'NEEDED!'
      case 'no-gold': return 'NO GOLD'
      case 'fulfilled': return 'FULFILLED'
    }
  }
  
  // Get progress bar color class
  const getProgressColorClass = (): string => {
    if (progressPercentage < 33) return 'progress-low'
    if (progressPercentage < 67) return 'progress-medium'
    return 'progress-high'
  }
  
  return (
    <div className={`building-card building-${status}${isHighlighted ? ' building-highlighted' : ''}`}>
      {/* Header: Icon, Name, Status Badge */}
      <div className="building-card-header">
        <span className="building-card-name">
          {definition.icon} {definition.displayName}
        </span>
        <span className={`building-status-badge status-${status}`}>
          {getStatusLabel()}
        </span>
      </div>
      
      {/* Description */}
      <div className="building-card-description">
        {definition.description}
      </div>
      
      {status === 'locked' ? (
        /* Locked state: show unlock threshold */
        <div className="building-locked-message">
          🔒 Unlocks at {definition.unlockThreshold} farmers
        </div>
      ) : (
        <>
          {/* Stats Section */}
          <div className="building-card-stats">
            {definition.id === 'farmstead' && definition.populationPerBuilding ? (
              <div className="building-stat">
                📊 Capacity: {built * definition.populationPerBuilding} / {farmers} farmers
              </div>
            ) : (
              <div className="building-stat">
                📊 Built: {built} / Required: {requiredCount}
                {shortage > 0 && <span className="shortage-indicator"> (Shortage: {shortage})</span>}
              </div>
            )}
            <div className="building-stat">
              ✨ Benefit: {definition.benefitDescription}
            </div>
            <div className="building-stat">
              💰 Cost: {definition.cost} Gold per building
            </div>
          </div>
          
          {/* Progress Bar */}
          {requiredCount > 0 && (
            <div className="building-progress-section">
              <div className="building-progress-bar">
                <div 
                  className={`building-progress-fill ${getProgressColorClass()}`}
                  style={{ width: `${Math.min(100, progressPercentage)}%` }}
                />
              </div>
              <div className="building-progress-label">
                {Math.round(progressPercentage)}% Complete
              </div>
            </div>
          )}
          
          {/* Build Button */}
          <div className="building-card-actions">
            <button
              className="building-build-button"
              disabled={!canBuild}
              onClick={() => onBuild(definition.id)}
            >
              BUILD {definition.displayName.toUpperCase()}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default BuildingCard
