import { useReducer, useState, useEffect, useRef } from 'react'
import './App.css'
import { gameReducer, initializeGame, getCurrentRequest } from './game/state'
import type { Effect } from './game/models'
import { BUILDING_DEFINITIONS, calculateRequiredBuildings } from './game/buildings'
import type { BuildingDefinition } from './game/buildings'
import ConstructionScreen from './ConstructionScreen'
import LogScreen from './LogScreen'

function App() {
  const [gameState, dispatch] = useReducer(gameReducer, undefined, initializeGame)
  
  // Construction screen state
  const [constructionScreenOpen, setConstructionScreenOpen] = useState(false)
  const [highlightedBuildingId, setHighlightedBuildingId] = useState<string | null>(null)
  
  // Log screen state
  const [logScreenOpen, setLogScreenOpen] = useState(false)
  
  // Request display delay state
  const [displayedRequest, setDisplayedRequest] = useState(getCurrentRequest(gameState))
  const [isShowingFeedback, setIsShowingFeedback] = useState(false)

  const currentRequest = displayedRequest

  // Combat commit state for slider
  const maxForces = gameState.stats.landForces
  const [combatCommit, setCombatCommit] = useState(Math.min(5, maxForces))

  // Authority commit state for slider
  const maxAuthority = gameState.stats.authority
  const [authorityCommit, setAuthorityCommit] = useState(10)
  
  // Authority modal state
  const [authorityModalOpen, setAuthorityModalOpen] = useState<number | null>(null) // null or option index
  const [authorityCommitments, setAuthorityCommitments] = useState<{ [optionIndex: number]: number }>({})
  const [currentTick, setCurrentTick] = useState(gameState.tick)
  
  // Reset authority commitments when tick changes
  useEffect(() => {
    if (gameState.tick !== currentTick) {
      setAuthorityCommitments({})
      setCurrentTick(gameState.tick)
    }
  }, [gameState.tick, currentTick])
  
  // Lock body scroll when construction screen is open
  useEffect(() => {
    if (constructionScreenOpen || logScreenOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [constructionScreenOpen, logScreenOpen])
  
  // Pulsating resource bar animation system
  type StatAnimation = {
    stat: 'health' | 'satisfaction' | 'fireRisk' | 'authority' | 'gold' | 'farmers' | 'landForces';
    delta: number;
    timestamp: number;
  }
  const [statAnimations, setStatAnimations] = useState<StatAnimation[]>([])
  const [previousHealth, setPreviousHealth] = useState(gameState.stats.health)
  const [previousSatisfaction, setPreviousSatisfaction] = useState(gameState.stats.satisfaction)
  const [previousFireRisk, setPreviousFireRisk] = useState(gameState.stats.fireRisk)
  const [previousAuthority, setPreviousAuthority] = useState(gameState.stats.authority)
  const [previousGold, setPreviousGold] = useState(gameState.stats.gold)
  const [previousFarmers, setPreviousFarmers] = useState(gameState.stats.farmers)
  const [previousLandForces, setPreviousLandForces] = useState(gameState.stats.landForces)
  const [previousCombatRound, setPreviousCombatRound] = useState(gameState.activeCombat?.round ?? -1)
  
  // Flying delta indicators state
  type FlyingDelta = {
    id: number;
    resourceType: 'satisfaction' | 'health' | 'fireRisk' | 'authority';
    value: number;
    startX: number; // X position (horizontally aligned with resource bar)
    startY: number; // Y position (at option button)
    timestamp: number;
  }
  const [flyingDeltas, setFlyingDeltas] = useState<FlyingDelta[]>([])
  const optionButtonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const statsBarRef = useRef<HTMLDivElement>(null)
  
  // Track stat changes and trigger pulsating animations in resource bar
  useEffect(() => {
    const changes: Array<{ stat: 'health' | 'satisfaction' | 'fireRisk' | 'authority' | 'gold' | 'farmers' | 'landForces'; delta: number }> = []
    
    // Check health
    const currentHealth = gameState.stats.health
    const healthDelta = currentHealth - previousHealth
    if (healthDelta !== 0 && previousHealth !== 0) {
      changes.push({ stat: 'health', delta: healthDelta })
    }
    setPreviousHealth(currentHealth)
    
    // Check satisfaction
    const currentSatisfaction = gameState.stats.satisfaction
    const satisfactionDelta = currentSatisfaction - previousSatisfaction
    if (satisfactionDelta !== 0 && previousSatisfaction !== 0) {
      changes.push({ stat: 'satisfaction', delta: satisfactionDelta })
    }
    setPreviousSatisfaction(currentSatisfaction)
    
    // Check fireRisk
    const currentFireRisk = gameState.stats.fireRisk
    const fireRiskDelta = currentFireRisk - previousFireRisk
    if (fireRiskDelta !== 0 && previousFireRisk !== 0) {
      changes.push({ stat: 'fireRisk', delta: fireRiskDelta })
    }
    setPreviousFireRisk(currentFireRisk)
    
    // Check authority
    const currentAuthority = gameState.stats.authority
    const authorityDelta = currentAuthority - previousAuthority
    if (authorityDelta !== 0 && previousAuthority !== 0) {
      changes.push({ stat: 'authority', delta: authorityDelta })
    }
    setPreviousAuthority(currentAuthority)
    
    // Check gold
    const currentGold = gameState.stats.gold
    const goldDelta = currentGold - previousGold
    if (goldDelta !== 0 && previousGold !== 0) {
      changes.push({ stat: 'gold', delta: goldDelta })
    }
    setPreviousGold(currentGold)
    
    // Check farmers (population)
    const currentFarmers = gameState.stats.farmers
    const farmersDelta = currentFarmers - previousFarmers
    if (farmersDelta !== 0 && previousFarmers !== 0) {
      changes.push({ stat: 'farmers', delta: farmersDelta })
    }
    setPreviousFarmers(currentFarmers)
    
    // Check landForces
    const currentLandForces = gameState.stats.landForces
    const landForcesDelta = currentLandForces - previousLandForces
    if (landForcesDelta !== 0 && previousLandForces !== 0) {
      changes.push({ stat: 'landForces', delta: landForcesDelta })
    }
    setPreviousLandForces(currentLandForces)
    
    // Add animations for all changes
    if (changes.length > 0) {
      const timestamp = Date.now()
      const newAnimations = changes.map(change => ({
        stat: change.stat,
        delta: change.delta,
        timestamp
      }))
      
      setStatAnimations(prev => [...prev, ...newAnimations])
      
      // Remove after animation completes (2 seconds)
      setTimeout(() => {
        setStatAnimations(prev => prev.filter(a => a.timestamp !== timestamp))
      }, 2000)
    }
  }, [gameState.stats.health, gameState.stats.satisfaction, gameState.stats.fireRisk, gameState.stats.authority, gameState.stats.gold, gameState.stats.farmers, gameState.stats.landForces, previousHealth, previousSatisfaction, previousFireRisk, previousAuthority, previousGold, previousFarmers, previousLandForces])

  // Handle delayed request transitions (0.5s delay to see feedback)
  useEffect(() => {
    const actualRequest = getCurrentRequest(gameState)
    
    // If we're showing feedback, don't update the display immediately
    if (isShowingFeedback) {
      return
    }
    
    // Check if request changed OR if we're in combat and the round changed
    const requestChanged = actualRequest?.id !== displayedRequest?.id
    const currentCombatRound = gameState.activeCombat?.round ?? -1
    const combatRoundChanged = gameState.activeCombat && 
      displayedRequest?.id.startsWith('COMBAT_ROUND::') &&
      actualRequest?.id.startsWith('COMBAT_ROUND::') &&
      actualRequest?.id === displayedRequest?.id &&
      currentCombatRound !== previousCombatRound
    
    // Update previous combat round
    if (currentCombatRound !== previousCombatRound) {
      setPreviousCombatRound(currentCombatRound)
    }
    
    // If the request has changed or combat round progressed, show it after delay
    if (requestChanged || combatRoundChanged) {
      // Only delay if coming from a previous request (not initial load)
      if (displayedRequest !== null) {
        setIsShowingFeedback(true)
        
        // After 0.5 seconds, show the new request
        const timer = setTimeout(() => {
          setDisplayedRequest(actualRequest)
          setIsShowingFeedback(false)
        }, 500)
        
        return () => clearTimeout(timer)
      } else {
        // Initial load - show immediately
        setDisplayedRequest(actualRequest)
      }
    }
  }, [gameState.currentRequestId, gameState.tick, gameState.activeCombat?.round])

  // Update combatCommit when maxForces changes or when a new request appears
  useEffect(() => {
    const effectiveMax = Math.max(1, maxForces)
    const defaultCommit = Math.min(5, effectiveMax)
    if (combatCommit > effectiveMax) {
      setCombatCommit(effectiveMax)
    } else if (currentRequest?.combat && combatCommit === 0) {
      // Reset to default when a new combat request appears
      setCombatCommit(defaultCommit)
    }
  }, [maxForces, currentRequest?.id, currentRequest?.combat, combatCommit])

  // Update authorityCommit when maxAuthority changes or when a new request with authority check appears
  useEffect(() => {
    const hasAuthorityCheck = currentRequest?.options.some(opt => opt.authorityCheck)
    if (hasAuthorityCheck) {
      const option = currentRequest?.options.find(opt => opt.authorityCheck)
      if (option?.authorityCheck) {
        const config = option.authorityCheck
        // Allow 0 commitment (optional spend). Clamp to valid range: at least minCommit (can be 0), at most min(maxCommit, available authority)
        const defaultCommit = Math.max(config.minCommit, Math.min(config.maxCommit, Math.floor(maxAuthority)))
        if (authorityCommit < config.minCommit || authorityCommit > config.maxCommit) {
          setAuthorityCommit(defaultCommit)
        }
      }
    }
  }, [maxAuthority, currentRequest?.id, authorityCommit, currentRequest?.options])

  // Function to spawn flying delta indicators
  const spawnFlyingDeltas = (optionIndex: number, effects: Effect) => {
    const buttonElement = optionButtonRefs.current[optionIndex]
    const statsBar = statsBarRef.current
    
    if (!buttonElement || !statsBar) return
    
    const buttonRect = buttonElement.getBoundingClientRect()
    const deltas: FlyingDelta[] = []
    const timestamp = Date.now()
    let deltaId = timestamp
    
    // Filter resources to only show satisfaction, health, fireRisk, authority
    // Exclude: gold, farmers (population), landForces
    const resourceTypes: Array<keyof Effect> = ['satisfaction', 'health', 'fireRisk', 'authority']
    
    resourceTypes.forEach((resourceType) => {
      const value = effects[resourceType]
      if (value === undefined || value === 0 || typeof value !== 'number') return
      
      // Find the corresponding stat element in the stats bar to get its X position
      const statElement = statsBar.querySelector(`[data-stat="${resourceType}"]`)
      if (!statElement) return
      
      const statRect = statElement.getBoundingClientRect()
      
      // Calculate positions:
      // - X: horizontally aligned with the resource in the resource bar
      // - Y: at the option button's vertical position
      const startX = statRect.left + statRect.width / 2
      const startY = buttonRect.top + buttonRect.height / 2
      
      deltas.push({
        id: deltaId++,
        resourceType: resourceType as 'satisfaction' | 'health' | 'fireRisk' | 'authority',
        value: value as number,
        startX,
        startY,
        timestamp
      })
    })
    
    if (deltas.length > 0) {
      setFlyingDeltas(prev => [...prev, ...deltas])
      
      // Remove deltas after 2 seconds (matching the CSS animation duration)
      setTimeout(() => {
        setFlyingDeltas(prev => prev.filter(d => d.timestamp !== timestamp))
      }, 2000)
    }
  }

  const handleOptionClick = (optionIndex: number) => {
    const option = currentRequest?.options[optionIndex]
    
    // Spawn flying deltas for this option's effects
    if (option) {
      spawnFlyingDeltas(optionIndex, option.effects)
    }
    
    // If combat request and Option A (index 0), pass combatCommit
    if (currentRequest?.combat && optionIndex === 0) {
      dispatch({ type: 'CHOOSE_OPTION', optionIndex, combatCommit })
    } else if (option?.authorityCheck) {
      // If option has authority check, use the committed value from modal
      const committedAmount = authorityCommitments[optionIndex] ?? 0
      dispatch({ type: 'CHOOSE_OPTION', optionIndex, authorityCommit: committedAmount })
    } else {
      dispatch({ type: 'CHOOSE_OPTION', optionIndex })
    }
  }
  
  const handleOpenAuthorityModal = (optionIndex: number) => {
    const option = currentRequest?.options[optionIndex]
    if (!option?.authorityCheck) return
    
    // Set initial slider value: previous commitment or minimum (0)
    const previousCommit = authorityCommitments[optionIndex]
    const initialValue = previousCommit ?? option.authorityCheck.minCommit
    setAuthorityCommit(initialValue)
    setAuthorityModalOpen(optionIndex)
  }
  
  const handleConfirmAuthority = () => {
    if (authorityModalOpen === null) return
    
    // Save the commitment for this option
    setAuthorityCommitments(prev => ({
      ...prev,
      [authorityModalOpen]: authorityCommit
    }))
    
    // Close modal
    setAuthorityModalOpen(null)
  }

  // Construction screen handlers
  const openConstructionScreen = (buildingId?: string) => {
    setConstructionScreenOpen(true)
    setHighlightedBuildingId(buildingId ?? null)
  }

  const closeConstructionScreen = () => {
    setConstructionScreenOpen(false)
    setHighlightedBuildingId(null)
  }

  const openLogScreen = () => {
    setLogScreenOpen(true)
  }

  const closeLogScreen = () => {
    setLogScreenOpen(false)
  }

  // Check if current request is a crisis event
  const isCrisis = currentRequest?.id.startsWith('EVT_CRISIS_') ?? false

  // Check if gold is negative (bankruptcy warning)
  const showBankruptcyWarning = gameState.stats.gold < 0 && gameState.stats.gold > -50

  // Get building display status
  type BuildingStatus = 'locked' | 'available' | 'needed' | 'no-gold' | 'fulfilled'
  const getBuildingStatus = (def: BuildingDefinition): BuildingStatus => {
    const tracking = gameState.buildingTracking[def.id]
    if (!tracking) return 'locked'

    if (gameState.stats.farmers < def.unlockThreshold) return 'locked'

    const required = calculateRequiredBuildings(def, gameState.stats.farmers)
    const built = tracking.buildingCount

    if (built < required) {
      return gameState.stats.gold >= def.cost ? 'needed' : 'no-gold'
    }

    return gameState.stats.gold >= def.cost ? 'fulfilled' : 'fulfilled'
  }

  // Calculate buildings needing attention (consolidate filtering)
  const buildingsNeedingAttentionList = BUILDING_DEFINITIONS.filter(def => {
    const status = getBuildingStatus(def)
    return status === 'needed' || status === 'no-gold'
  }).map(def => {
    const tracking = gameState.buildingTracking[def.id]
    const built = tracking?.buildingCount ?? 0
    const required = calculateRequiredBuildings(def, gameState.stats.farmers)
    const shortage = Math.max(0, required - built)
    return {
      id: def.id,
      name: def.displayName,
      icon: def.icon,
      shortage
    }
  })

  const buildingsNeedingAttention = buildingsNeedingAttentionList.length

  // Calculate overcrowding info (removed build panel, overcrowding tier not needed here)
  const farmsteadCount = gameState.buildingTracking['farmstead']?.buildingCount ?? 0
  const farmsteadCapacity = farmsteadCount * 20
  const farmsteadOverflow = Math.max(0, gameState.stats.farmers - farmsteadCapacity)

  // Check if an option would cause invalid state (negative farmers or landForces)
  const isOptionDisabled = (effects: Effect): { disabled: boolean; reason?: string } => {
    if (effects.farmers !== undefined) {
      const newFarmers = gameState.stats.farmers + effects.farmers
      if (newFarmers < 0) {
        return { disabled: true, reason: 'Not enough farmers' }
      }
    }
    if (effects.landForces !== undefined) {
      const newLandForces = gameState.stats.landForces + effects.landForces
      if (newLandForces < 0) {
        return { disabled: true, reason: 'Not enough land forces' }
      }
    }
    return { disabled: false }
  }

  // Helper function to format numeric delta values
  const formatDeltaValue = (delta: number): string => {
    return `${delta > 0 ? '+' : ''}${delta}`
  }

  // Helper function to get icon for a resource type
  const getResourceIcon = (resourceType: 'satisfaction' | 'health' | 'fireRisk' | 'authority' | 'gold' | 'farmers' | 'landForces'): string => {
    const iconMap: Record<typeof resourceType, string> = {
      gold: '💰',
      satisfaction: '😊',
      health: '❤️',
      fireRisk: '🔥',
      farmers: '👨‍🌾',
      landForces: '⚔️',
      authority: '👑'
    }
    return iconMap[resourceType]
  }

  // Get stat icon for feedback

  // Format effects for display
  const formatEffects = (effects: Effect, excludeAuthority = false, excludeFeedbackStats = false): Array<{ label: string; value: number | string; isPositive: boolean }> => {
    const formatted: Array<{ label: string; value: number | string; isPositive: boolean }> = []
    
    if (effects.gold !== undefined) {
      formatted.push({ 
        label: 'Gold', 
        value: effects.gold, 
        isPositive: effects.gold > 0
      })
    }
    if (effects.satisfaction !== undefined && !excludeFeedbackStats) {
      formatted.push({ 
        label: 'Satisfaction', 
        value: effects.satisfaction, 
        isPositive: effects.satisfaction > 0
      })
    }
    if (effects.health !== undefined && !excludeFeedbackStats) {
      formatted.push({ 
        label: 'Health', 
        value: effects.health, 
        isPositive: effects.health > 0
      })
    }
    if (effects.fireRisk !== undefined && !excludeFeedbackStats) {
      formatted.push({ 
        label: 'Fire Risk', 
        value: effects.fireRisk, 
        // For fire risk, lower is better
        isPositive: effects.fireRisk < 0
      })
    }
    if (effects.farmers !== undefined) {
      formatted.push({ 
        label: 'Farmers', 
        value: effects.farmers, 
        isPositive: effects.farmers > 0
      })
    }
    if (effects.landForces !== undefined) {
      formatted.push({ 
        label: 'Land Forces', 
        value: effects.landForces, 
        isPositive: effects.landForces > 0
      })
    }
    if (effects.authority !== undefined && !excludeAuthority) {
      formatted.push({ 
        label: 'Authority', 
        value: effects.authority, 
        isPositive: effects.authority > 0
      })
    }
    
    
    return formatted
  }

  // Helper function to get animation class for a stat
  const getStatAnimationClass = (statName: 'health' | 'satisfaction' | 'fireRisk' | 'authority' | 'gold' | 'farmers' | 'landForces') => {
    const animation = statAnimations.find(a => a.stat === statName)
    if (!animation) return ''
    
    // For fireRisk, the logic is inverted: increase is bad, decrease is good
    const isWorsening = statName === 'fireRisk' ? animation.delta > 0 : animation.delta < 0
    return isWorsening ? 'stat-animate-worse' : 'stat-animate-better'
  }

  return (
    <div className="app">
      <div className="game-container">
        {/* Top Compact Stats Bar */}
        <div className="stats-bar" ref={statsBarRef}>
          <div className={`stat-compact ${getStatAnimationClass('gold')}`} data-stat="gold">
            <span className="stat-icon">💰</span>
            <span className="stat-value">{gameState.stats.gold}</span>
          </div>
          <div className={`stat-compact ${getStatAnimationClass('satisfaction')}`} data-stat="satisfaction">
            <span className="stat-icon">😊</span>
            <span className="stat-value">{gameState.stats.satisfaction}</span>
          </div>
          <div className={`stat-compact ${getStatAnimationClass('health')}`} data-stat="health">
            <span className="stat-icon">❤️</span>
            <span className="stat-value">{gameState.stats.health}</span>
          </div>
          <div className={`stat-compact stat-warning ${getStatAnimationClass('fireRisk')}`} data-stat="fireRisk">
            <span className="stat-icon">🔥</span>
            <span className="stat-value">{gameState.stats.fireRisk}</span>
          </div>
          <div className={`stat-compact ${getStatAnimationClass('farmers')}${farmsteadOverflow > 0 ? ' farmer-overflow' : ''}`} data-stat="farmers">
            <span className="stat-icon">👨‍🌾</span>
            <span className="stat-value">{farmsteadOverflow > 0 ? `${gameState.stats.farmers}/${farmsteadCapacity}` : gameState.stats.farmers}</span>
          </div>
          <div className={`stat-compact ${getStatAnimationClass('landForces')}`} data-stat="landForces">
            <span className="stat-icon">⚔️</span>
            <span className="stat-value">{gameState.stats.landForces}</span>
          </div>
          <div className={`stat-compact stat-authority ${getStatAnimationClass('authority')}`} data-stat="authority">
            <span className="stat-icon">👑</span>
            <span className="stat-value">{Math.floor(gameState.stats.authority)}</span>
          </div>
        </div>

        {/* Bankruptcy Warning */}
        {showBankruptcyWarning && !gameState.gameOver && (
          <div className="bankruptcy-warning">
            ⚠️ Bankruptcy imminent ⚠️
          </div>
        )}

        {/* Building Shortage Mini-Banner */}
        {buildingsNeedingAttention > 0 && !gameState.gameOver && !constructionScreenOpen && (
          <div className="building-shortage-banner" onClick={() => openConstructionScreen()}>
            <span className="shortage-icon">⚠️</span>
            <span className="shortage-text">
              {buildingsNeedingAttentionList.map((b, i) => (
                <span key={b.id}>
                  {i > 0 && ', '}
                  {b.shortage} {b.icon} {b.name}
                </span>
              ))}
              {' needed'}
            </span>
            <span className="shortage-action">→ Click to build</span>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState.gameOver ? (
          <div className="panel game-over-panel">
            <h2>Game Over</h2>
            <p className="game-over-message">{gameState.gameOverReason}</p>
            <p className="game-over-stats">Final Stats:</p>
            <div className="game-over-stats-grid">
              <div>💰 Gold: {gameState.stats.gold}</div>
              <div>😊 Satisfaction: {gameState.stats.satisfaction}</div>
              <div>❤️ Health: {gameState.stats.health}</div>
              <div>🔥 Fire Risk: {gameState.stats.fireRisk}</div>
              <div>👨‍🌾 Farmers: {gameState.stats.farmers}</div>
              <div>⚔️ Land Forces: {gameState.stats.landForces}</div>
              <div>👑 Authority: {Math.floor(gameState.stats.authority)}</div>
            </div>
            <button 
              className="restart-button" 
              onClick={() => window.location.reload()}
            >
              Restart Game
            </button>
          </div>
        ) : (
          /* Center Decision Panel */
          <div className={`panel request-panel ${isCrisis ? 'crisis-panel' : ''}`}>
            {isCrisis && (
              <div className="crisis-banner">
                ⚠️ CRISIS EVENT ⚠️
              </div>
            )}
            <h2>Decision Required</h2>
            {currentRequest ? (
              <>
                <h3 className="request-title">{currentRequest.title}</h3>
                <p className="request-text">{currentRequest.text}</p>
                
                {/* Combat Slider UI */}
                {currentRequest.combat && (
                  <div className="combat-slider-container">
                    <div className="combat-info">
                      <span>Deploy: {combatCommit} Land Forces</span>
                      <span>Enemy: {currentRequest.combat.enemyForces}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max={Math.max(1, maxForces)}
                      value={combatCommit}
                      onChange={(e) => setCombatCommit(Number(e.target.value))}
                      disabled={maxForces < 1}
                      className="combat-slider"
                    />
                  </div>
                )}
                
                <div className="options-container">
                  {currentRequest.options.map((option, index) => {
                    const effects = formatEffects(option.effects, true, true)
                    let { disabled, reason } = isOptionDisabled(option.effects)
                    
                    // For combat requests, disable Option A if no forces available
                    if (currentRequest.combat && index === 0 && maxForces < 1) {
                      disabled = true
                      reason = 'No land forces available'
                    }
                    
                    const hasAuthorityCheck = !!option.authorityCheck
                    const committedAmount = authorityCommitments[index]
                    
                    return (
                      <div key={index} className="option-row">
                        <button
                          ref={(el) => { optionButtonRefs.current[index] = el }}
                          className={`option-button ${disabled ? 'option-disabled' : ''}`}
                          onClick={() => !disabled && handleOptionClick(index)}
                          disabled={disabled}
                        >
                          <div className="option-text">{option.text}</div>
                          {effects.length > 0 && (
                            <div className="option-consequences">
                              {effects.map((effect, i) => (
                                <span 
                                  key={i} 
                                  className={`consequence ${effect.isPositive ? 'positive' : 'negative'}`}
                                >
                                  {typeof effect.value === 'number' && effect.value !== 0 && (
                                    <>
                                      {effect.label}: {effect.value > 0 ? '+' : ''}{effect.value}
                                    </>
                                  )}
                                  {effect.value === '' && effect.label}
                                </span>
                              ))}
                            </div>
                          )}
                          {disabled && reason && (
                            <div className="option-disabled-reason">{reason}</div>
                          )}
                        </button>
                        {hasAuthorityCheck && (
                          <button
                            className="authority-button"
                            onClick={() => handleOpenAuthorityModal(index)}
                          >
                            {committedAmount !== undefined ? `👑 ${committedAmount}` : 'Use 👑'}
                          </button>
                        )}
                      </div>
                    )
                  })}
                  
                  {/* Add "Go to Construction" button for reminder requests */}
                  {currentRequest.id.startsWith('REMINDER_') && (() => {
                    // Extract building ID from reminder request ID (e.g., REMINDER_FARMSTEAD -> farmstead)
                    const buildingId = currentRequest.id.replace('REMINDER_', '').toLowerCase()
                    // Validate that the building ID exists
                    const buildingExists = BUILDING_DEFINITIONS.some(def => def.id === buildingId)
                    
                    if (!buildingExists) {
                      console.warn(`Building ID "${buildingId}" extracted from reminder "${currentRequest.id}" does not exist`)
                      return null
                    }
                    
                    return (
                      <div className="option-row">
                        <button
                          className="option-button"
                          onClick={() => {
                            // Dismiss the request first
                            dispatch({ type: 'CHOOSE_OPTION', optionIndex: 0 })
                            // Then open construction screen with highlighted building
                            openConstructionScreen(buildingId)
                          }}
                        >
                          <div className="option-text">🏗️ Go to Construction</div>
                        </button>
                      </div>
                    )
                  })()}
                </div>
              </>
            ) : (
              <p className="request-text">No request available</p>
            )}
          </div>
        )}

        {/* Bottom Bar with Buttons Only */}
        <div className="bottom-bar">
          <div className="toggle-buttons">
            <button
              className="toggle-btn"
              onClick={openLogScreen}
            >
              📜 Log
            </button>
            <button
              className={`toggle-btn${buildingsNeedingAttention > 0 ? ' toggle-btn-notify' : ''}`}
              onClick={() => openConstructionScreen()}
            >
              🏗️ Construction
              {buildingsNeedingAttention > 0 && (
                <span className="notification-badge">{buildingsNeedingAttention}</span>
              )}
            </button>
          </div>
        </div>
        
        {/* Authority Commitment Modal */}
        {authorityModalOpen !== null && currentRequest && (
          <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && null}>
            <div className="modal-content authority-modal">
              {(() => {
                const optionIndex = authorityModalOpen
                const option = currentRequest.options[optionIndex]
                if (!option?.authorityCheck) return null
                
                const config = option.authorityCheck
                const maxCommittable = Math.floor(maxAuthority)
                const currentCommit = Math.min(authorityCommit, maxCommittable)
                
                // Check if this authority check has immediate effects (onSuccess/onFailure)
                const hasImmediateEffects = !!(config.onSuccess || config.onFailure)
                const hasFollowUpBoosts = !!(config.followUpBoosts && config.followUpBoosts.length > 0)
                
                // Probabilistic success chance: each authority check defines its own min/max
                const MIN_SUCCESS_CHANCE = Math.floor((config.minSuccessChance ?? 0.5) * 100)
                const MAX_SUCCESS_CHANCE = Math.floor((config.maxSuccessChance ?? 0.5) * 100)
                const effectiveMaxCommit = config.maxPossibleCommit ?? config.maxCommit
                const commitRatio = effectiveMaxCommit > 0 ? currentCommit / effectiveMaxCommit : 0
                const successChance = Math.floor(MIN_SUCCESS_CHANCE + commitRatio * (MAX_SUCCESS_CHANCE - MIN_SUCCESS_CHANCE))
                
                // Calculate overall probability for follow-up boosts
                let followUpProbability = 0
                if (hasFollowUpBoosts && !hasImmediateEffects && currentRequest.followUps) {
                  // Find the follow-up for this option
                  const followUp = currentRequest.followUps.find(fu => fu.triggerOnOptionIndex === optionIndex)
                  if (followUp && config.followUpBoosts && config.followUpBoosts.length > 0) {
                    // NOTE: Currently only displays the impact of the first boost.
                    // In practice, events typically have only one boost per authority check.
                    const boost = config.followUpBoosts[0]
                    
                    // Find the target candidate in the follow-up
                    const targetCandidate = followUp.candidates.find(c => c.requestId === boost.targetRequestId)
                    if (targetCandidate) {
                      // Calculate base probability (no boost)
                      const totalBaseWeight = followUp.candidates.reduce((sum, c) => sum + c.weight, 0)
                      
                      // Calculate boosted probability
                      const commitRatio = config.maxCommit > 0 ? currentCommit / config.maxCommit : 0
                      const weightIncrease = commitRatio * boost.boostValue
                      const boostedWeight = targetCandidate.weight + weightIncrease
                      const totalBoostedWeight = totalBaseWeight + weightIncrease
                      const boostedProbability = (boostedWeight / totalBoostedWeight) * 100
                      
                      // Store the overall probability (not the increase)
                      followUpProbability = boostedProbability
                    }
                  }
                }
                
                return (
                  <>
                    <div className="authority-header">
                      <div className="authority-title">
                        <span className="authority-icon">👑</span>
                        <span>Authority Commitment</span>
                      </div>
                      {hasImmediateEffects && (
                        <div className="authority-outcome uncertain">
                          ✗ UNCERTAIN ({successChance}%)
                        </div>
                      )}
                    </div>
                    
                    <div className="authority-commit-display">
                      <div className="commit-value">
                        <span className="commit-label">Committing:</span>
                        <span className="commit-amount">{currentCommit}</span>
                      </div>
                      {hasImmediateEffects && (
                          <div className="commit-probability uncertain">
                            <span className="probability-label">Chance:</span>
                            <span className="probability-amount">{successChance}%</span>
                          </div>
                      )}
                      {hasFollowUpBoosts && !hasImmediateEffects && (
                        <div className="commit-boost-info">
                          <div className="boost-impact">
                            <span className="impact-label">Outcome chance:</span>
                            <span className="impact-amount">{followUpProbability.toFixed(0)}%</span>
                          </div>
                          {config.followUpBoosts?.map((boost) => (
                            <div key={boost.targetRequestId} className="boost-description">
                              {boost.description || `Affects follow-up: ${boost.targetRequestId}`}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <input
                      type="range"
                      min={config.minCommit}
                      max={Math.min(config.maxCommit, maxCommittable)}
                      value={currentCommit}
                      onChange={(e) => setAuthorityCommit(Number(e.target.value))}
                      className="authority-slider uncertain"
                    />
                    
                    <div className="authority-range-labels">
                      <span>{config.minCommit} min</span>
                      <span>{Math.min(config.maxCommit, maxCommittable)} max</span>
                    </div>
                    
                    {/* Fork Preview - only show when there are immediate effects */}
                    {hasImmediateEffects && (
                      <div className="authority-fork-preview">
                        <div className="fork-section fork-success">
                          <div className="fork-header">
                            <span className="fork-icon">✓</span>
                            <span className="fork-title">On Success:</span>
                          </div>
                          <div className="fork-effects">
                            {option.effects && Object.keys(option.effects).length > 0 && (
                              <span className="fork-effect">Base effects apply</span>
                            )}
                            {config.onSuccess && formatEffects(config.onSuccess).map((eff, i) => (
                              <span key={i} className={`fork-effect ${eff.isPositive ? 'positive' : 'negative'}`}>
                                {eff.label}: {typeof eff.value === 'number' ? (eff.value > 0 ? '+' : '') + eff.value : eff.value}
                              </span>
                            ))}
                            {config.refundOnSuccessPercent !== undefined && config.refundOnSuccessPercent > 0 && (
                              <span className="fork-effect positive">
                                Refund: {config.refundOnSuccessPercent}% ({Math.floor(currentCommit * config.refundOnSuccessPercent / 100)} authority)
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="fork-section fork-failure">
                          <div className="fork-header">
                            <span className="fork-icon">✗</span>
                            <span className="fork-title">On Failure:</span>
                          </div>
                          <div className="fork-effects">
                            {option.effects && Object.keys(option.effects).length > 0 && (
                              <span className="fork-effect">Base effects apply</span>
                            )}
                            {config.onFailure && formatEffects(config.onFailure).map((eff, i) => (
                              <span key={i} className={`fork-effect ${eff.isPositive ? 'positive' : 'negative'}`}>
                                {eff.label}: {typeof eff.value === 'number' ? (eff.value > 0 ? '+' : '') + eff.value : eff.value}
                              </span>
                            ))}
                            <span className="fork-effect negative">
                              Authority Lost: {currentCommit}
                            </span>
                            {config.extraLossOnFailure !== undefined && config.extraLossOnFailure > 0 && (
                              <span className="fork-effect negative">
                                Extra Loss: {config.extraLossOnFailure} authority
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <button 
                      className="confirm-button"
                      onClick={handleConfirmAuthority}
                    >
                      Confirm
                    </button>
                  </>
                )
              })()}
            </div>
          </div>
        )}
        
        {/* Flying Delta Indicators */}
        {flyingDeltas.map((delta) => {
          // Get the icon for the resource type
          const icon = getResourceIcon(delta.resourceType)
          // Format the delta value - always use numeric format
          const displayValue = formatDeltaValue(delta.value)
          
          // Determine if it's positive or negative (fireRisk is inverted)
          const isPositive = delta.resourceType === 'fireRisk' 
            ? delta.value < 0 
            : delta.value > 0
          
          return (
            <div
              key={delta.id}
              className={`flying-delta ${isPositive ? 'positive' : 'negative'}`}
              style={{
                left: `${delta.startX}px`,
                top: `${delta.startY}px`
              }}
            >
              {icon} {displayValue}
            </div>
          )
        })}
        
        {/* Construction Screen Overlay */}
        <ConstructionScreen 
          isOpen={constructionScreenOpen}
          onClose={closeConstructionScreen}
          farmers={gameState.stats.farmers}
          gold={gameState.stats.gold}
          buildingTracking={gameState.buildingTracking}
          highlightedBuilding={highlightedBuildingId ?? undefined}
          onBuild={(buildingId) => dispatch({ type: 'BUILD_BUILDING', buildingId })}
        />
        
        {/* Log Screen Overlay */}
        <LogScreen 
          isOpen={logScreenOpen}
          onClose={closeLogScreen}
          log={gameState.log}
        />
        
        {/* Version display */}
        <div className="version-footer">
          v{__APP_VERSION__} ({__GIT_BRANCH__})
        </div>
      </div>
    </div>
  )
}

export default App
