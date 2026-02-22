import { useState, useEffect, useRef } from 'react'
import './BuildingCard.css'
import type { BuildingDefinition, BuildingTracking } from './game/buildings'
import { hasAnyBuildingState, getEffectiveBuildingCount } from './game/buildings'

export type BuildingStatus = 'locked' | 'available' | 'needed' | 'no-gold' | 'fulfilled'

// Animation duration constants (in milliseconds)
const SUCCESS_ANIMATION_DURATION_MS = 1000
const ERROR_ANIMATION_DURATION_MS = 600

interface BuildingCardProps {
  definition: BuildingDefinition;
  tracking: BuildingTracking;
  farmers: number;
  gold: number;
  requiredCount: number;
  status: BuildingStatus;
  isHighlighted?: boolean;
  onBuild: (buildingId: string) => void;
  onBuildMultiple?: (buildingId: string) => void;
  onExtinguish?: (buildingId: string) => void;
  onRepair?: (buildingId: string) => void;
}

function BuildingCard({
  definition,
  tracking,
  farmers,
  gold,
  requiredCount,
  status,
  isHighlighted = false,
  onBuild,
  onBuildMultiple,
  onExtinguish,
  onRepair
}: BuildingCardProps) {
  const built = tracking.buildingCount
  const shortage = Math.max(0, requiredCount - built)
  const canBuild = status !== 'locked' && gold >= definition.cost
  
  // Animation states
  const [showBuildSuccess, setShowBuildSuccess] = useState(false)
  const [showBuildError, setShowBuildError] = useState(false)
  const prevBuiltRef = useRef(built)
  
  // Detect successful build (building count increased)
  useEffect(() => {
    if (built > prevBuiltRef.current) {
      setShowBuildSuccess(true)
      setTimeout(() => setShowBuildSuccess(false), SUCCESS_ANIMATION_DURATION_MS)
    }
    prevBuiltRef.current = built
  }, [built])
  
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
  
  // Handle build button click with error feedback
  const handleBuildClick = () => {
    if (canBuild) {
      onBuild(definition.id)
    } else {
      // Show error animation when trying to build without enough gold or when locked
      setShowBuildError(true)
      setTimeout(() => setShowBuildError(false), ERROR_ANIMATION_DURATION_MS)
    }
  }
  
  const handleBuildMultipleClick = () => {
    if (canBuild && onBuildMultiple) {
      onBuildMultiple(definition.id)
    } else {
      // Show error animation
      setShowBuildError(true)
      setTimeout(() => setShowBuildError(false), ERROR_ANIMATION_DURATION_MS)
    }
  }
  
  // Build animation class names
  const cardClasses = [
    'building-card',
    `building-${status}`,
    isHighlighted ? 'building-highlighted' : '',
    showBuildSuccess ? 'building-success-flash' : '',
    showBuildError ? 'building-error-shake' : ''
  ].filter(Boolean).join(' ')
  
  return (
    <div className={cardClasses}>
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
          
          {/* Build Button / State Action Button */}
          <div className="building-card-actions">
            {hasAnyBuildingState(tracking) ? (
              <>
                {/* State status line */}
                <div className="building-state-status">
                  {tracking.onFireCount > 0 && <span className="state-tag state-fire">🔥 {tracking.onFireCount}</span>}
                  {tracking.destroyedCount > 0 && <span className="state-tag state-destroyed">🧱 {tracking.destroyedCount}</span>}
                  {tracking.onStrikeCount > 0 && <span className="state-tag state-strike">⚑ {tracking.onStrikeCount}</span>}
                  <span className="state-effective">Wirksam: {getEffectiveBuildingCount(tracking)} / {tracking.buildingCount}</span>
                </div>
                {/* Primary state action button */}
                {tracking.onFireCount > 0 ? (
                  <button
                    className="building-state-action-button state-action-fire"
                    onClick={() => onExtinguish?.(definition.id)}
                  >
                    🔥 Feuer löschen (1)
                  </button>
                ) : tracking.destroyedCount > 0 ? (
                  <button
                    className="building-state-action-button state-action-repair"
                    onClick={() => onRepair?.(definition.id)}
                  >
                    🧱 Reparieren (1)
                  </button>
                ) : tracking.onStrikeCount > 0 ? (
                  <button
                    className="building-state-action-button state-action-strike"
                    disabled
                  >
                    ⚑ Streik beenden (1) — nicht implementiert
                  </button>
                ) : null}
              </>
            ) : (
              <>
                <button
                  className="building-build-button"
                  onClick={handleBuildClick}
                >
                  BUILD {definition.displayName.toUpperCase()}
                </button>
                {shortage > 1 && onBuildMultiple && (
                  <button
                    className="building-build-multiple-button"
                    onClick={handleBuildMultipleClick}
                  >
                    BUILD MULTIPLE...
                  </button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default BuildingCard
