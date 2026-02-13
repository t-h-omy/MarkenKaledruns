import { useReducer, useState, useEffect } from 'react'
import './App.css'
import { gameReducer, initializeGame, isNeedUnlocked, calculateRequiredBuildings, isNeedRequired, getCurrentRequest } from './game/state'
import type { Effect, Needs } from './game/models'
import { NEED_UNLOCK_THRESHOLDS } from './game/models'

function App() {
  const [gameState, dispatch] = useReducer(gameReducer, undefined, initializeGame)
  const [bottomTab, setBottomTab] = useState<'needs' | 'log'>('needs')
  
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
  
  // Floating feedback for authority changes
  const [authorityFeedback, setAuthorityFeedback] = useState<Array<{ id: number; amount: number }>>([])
  const [previousAuthority, setPreviousAuthority] = useState(gameState.stats.authority)
  
  // Universal flying feedback system for health, satisfaction, fireRisk (and authority)
  type FlyingFeedback = {
    id: number;
    stat: 'health' | 'satisfaction' | 'fireRisk' | 'authority';
    amount: number;
    startX: number;
    startY: number;
  }
  const [flyingFeedbacks, setFlyingFeedbacks] = useState<FlyingFeedback[]>([])
  const [previousHealth, setPreviousHealth] = useState(gameState.stats.health)
  const [previousSatisfaction, setPreviousSatisfaction] = useState(gameState.stats.satisfaction)
  const [previousFireRisk, setPreviousFireRisk] = useState(gameState.stats.fireRisk)
  const [lastClickedOption, setLastClickedOption] = useState<{ index: number; rect: DOMRect } | null>(null)
  
  // Track stat changes and show flying feedback
  useEffect(() => {
    const changes: Array<{ stat: 'health' | 'satisfaction' | 'fireRisk' | 'authority'; delta: number }> = []
    
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
    
    // Create flying feedback for all changes
    if (changes.length > 0 && lastClickedOption) {
      const startX = lastClickedOption.rect.left + lastClickedOption.rect.width / 2
      const startY = lastClickedOption.rect.top + lastClickedOption.rect.height / 2
      
      const newFeedbacks = changes.map(change => ({
        id: Date.now() + Math.random(),
        stat: change.stat,
        amount: change.delta,
        startX,
        startY
      }))
      
      setFlyingFeedbacks(prev => [...prev, ...newFeedbacks])
      
      // Remove after 5 seconds (increased from 3s for better visibility)
      newFeedbacks.forEach(feedback => {
        setTimeout(() => {
          setFlyingFeedbacks(prev => prev.filter(f => f.id !== feedback.id))
        }, 5000)
      })
    }
  }, [gameState.stats.health, gameState.stats.satisfaction, gameState.stats.fireRisk, gameState.stats.authority])
  
  // Track authority changes and show floating feedback (kept for backward compatibility)
  useEffect(() => {
    const currentAuthority = gameState.stats.authority
    const delta = currentAuthority - previousAuthority
    
    if (delta !== 0 && previousAuthority !== 0) {
      const feedbackId = Date.now()
      setAuthorityFeedback(prev => [...prev, { id: feedbackId, amount: delta }])
      
      // Remove after 3 seconds
      setTimeout(() => {
        setAuthorityFeedback(prev => prev.filter(f => f.id !== feedbackId))
      }, 3000)
    }
    
    setPreviousAuthority(currentAuthority)
  }, [gameState.stats.authority])

  // Handle delayed request transitions (1.5s delay to see feedback)
  useEffect(() => {
    const actualRequest = getCurrentRequest(gameState)
    
    // If we're showing feedback, don't update the display immediately
    if (isShowingFeedback) {
      return
    }
    
    // If the request has changed, show it after delay
    if (actualRequest?.id !== displayedRequest?.id) {
      // Only delay if coming from a previous request (not initial load)
      if (displayedRequest !== null) {
        setIsShowingFeedback(true)
        
        // After 1.5 seconds, show the new request
        const timer = setTimeout(() => {
          setDisplayedRequest(actualRequest)
          setIsShowingFeedback(false)
        }, 1500)
        
        return () => clearTimeout(timer)
      } else {
        // Initial load - show immediately
        setDisplayedRequest(actualRequest)
      }
    }
  }, [gameState.currentRequestId, gameState.tick])

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

  const handleOptionClick = (optionIndex: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const option = currentRequest?.options[optionIndex]
    
    // Capture button position for flying feedback
    const buttonRect = event.currentTarget.getBoundingClientRect()
    setLastClickedOption({ index: optionIndex, rect: buttonRect })
    
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

  // Get last 3 log entries
  const recentLogs = gameState.log.slice(-3).reverse()

  // Check if current request is a crisis event
  const isCrisis = currentRequest?.id.startsWith('EVT_CRISIS_') ?? false

  // Check if gold is negative (bankruptcy warning)
  const showBankruptcyWarning = gameState.stats.gold < 0 && gameState.stats.gold > -50

  // Get need display state (locked, fulfilled, or required)
  const getNeedState = (needKey: keyof Needs) => {
    const unlocked = isNeedUnlocked(needKey, gameState.stats.farmers)
    
    if (!unlocked) {
      return {
        status: 'locked' as const,
        label: `Locked until ${NEED_UNLOCK_THRESHOLDS[needKey]} farmers`,
      }
    }
    
    const tracking = gameState.needsTracking[needKey]
    const builtBuildings = tracking.buildingCount
    const requiredBuildings = calculateRequiredBuildings(needKey, gameState.stats.farmers)
    const required = isNeedRequired(needKey, gameState.stats.farmers, builtBuildings)
    
    if (required) {
      return {
        status: 'required' as const,
        label: `Built: ${builtBuildings} / Required: ${requiredBuildings}`,
      }
    } else {
      return {
        status: 'fulfilled' as const,
        label: `Built: ${builtBuildings} / Required: ${requiredBuildings}`,
      }
    }
  }

  // Need display names
  const needDisplayNames: Record<keyof Needs, string> = {
    marketplace: 'Marketplace',
    bread: 'Bread',
    beer: 'Beer',
    firewood: 'Firewood',
    well: 'Well',
  }

  // Need effect descriptions
  const needEffectDescriptions: Record<keyof Needs, string> = {
    marketplace: 'Unlocks event "Market Day"',
    bread: '10% chance per tick for +1 farmer growth',
    beer: 'Unlocks event "Feierabend in der Kneipe"',
    firewood: '25% chance to halve fireRisk increases from events',
    well: '50% chance to gain +1 extra health when an event grants health',
  }

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

  // Configurable thresholds for effect tiers
  const EFFECT_THRESHOLDS = {
    small: 5,   // |delta| < 5: slight impact
    medium: 15, // 5 <= |delta| < 15: medium impact
    // |delta| >= 15: strong impact
  }

  // Check if a stat key should use fuzzy indicators
  const isFuzzyStatKey = (key: string): boolean => {
    return key === 'satisfaction' || key === 'health' || key === 'fireRisk'
  }

  // Convert numeric delta to fuzzy indicator (for satisfaction, health, fireRisk)
  const getFuzzyIndicator = (delta: number): string => {
    const absDelta = Math.abs(delta)
    const isPositive = delta > 0
    
    if (absDelta === 0) return ''
    
    if (absDelta < EFFECT_THRESHOLDS.small) {
      return isPositive ? '+' : '−'
    } else if (absDelta < EFFECT_THRESHOLDS.medium) {
      return isPositive ? '++' : '−−'
    } else {
      return isPositive ? '+++' : '−−−'
    }
  }

  // Get stat icon for feedback
  const getStatIcon = (stat: 'health' | 'satisfaction' | 'fireRisk' | 'authority'): string => {
    switch (stat) {
      case 'health': return '❤️'
      case 'satisfaction': return '😊'
      case 'fireRisk': return '🔥'
      case 'authority': return '👑'
    }
  }

  // Format effects for display
  const formatEffects = (effects: Effect, excludeAuthority = false, excludeFeedbackStats = false): Array<{ label: string; value: number | string; isPositive: boolean; isFuzzy: boolean }> => {
    const formatted: Array<{ label: string; value: number | string; isPositive: boolean; isFuzzy: boolean }> = []
    
    if (effects.gold !== undefined) {
      formatted.push({ 
        label: 'Gold', 
        value: effects.gold, 
        isPositive: effects.gold > 0,
        isFuzzy: false
      })
    }
    if (effects.satisfaction !== undefined && !excludeFeedbackStats) {
      formatted.push({ 
        label: 'Satisfaction', 
        value: getFuzzyIndicator(effects.satisfaction), 
        isPositive: effects.satisfaction > 0,
        isFuzzy: true
      })
    }
    if (effects.health !== undefined && !excludeFeedbackStats) {
      formatted.push({ 
        label: 'Health', 
        value: getFuzzyIndicator(effects.health), 
        isPositive: effects.health > 0,
        isFuzzy: true
      })
    }
    if (effects.fireRisk !== undefined && !excludeFeedbackStats) {
      formatted.push({ 
        label: 'Fire Risk', 
        value: getFuzzyIndicator(effects.fireRisk), 
        // For fire risk, lower is better
        isPositive: effects.fireRisk < 0,
        isFuzzy: true
      })
    }
    if (effects.farmers !== undefined) {
      formatted.push({ 
        label: 'Farmers', 
        value: effects.farmers, 
        isPositive: effects.farmers > 0,
        isFuzzy: false
      })
    }
    if (effects.landForces !== undefined) {
      formatted.push({ 
        label: 'Land Forces', 
        value: effects.landForces, 
        isPositive: effects.landForces > 0,
        isFuzzy: false
      })
    }
    if (effects.authority !== undefined && !excludeAuthority) {
      formatted.push({ 
        label: 'Authority', 
        value: effects.authority, 
        isPositive: effects.authority > 0,
        isFuzzy: false
      })
    }
    
    // Add need fulfillment indicators
    if (effects.marketplace) formatted.push({ label: '✓ Marketplace', value: '', isPositive: true, isFuzzy: false })
    if (effects.bread) formatted.push({ label: '✓ Bread', value: '', isPositive: true, isFuzzy: false })
    if (effects.beer) formatted.push({ label: '✓ Beer', value: '', isPositive: true, isFuzzy: false })
    if (effects.firewood) formatted.push({ label: '✓ Firewood', value: '', isPositive: true, isFuzzy: false })
    if (effects.well) formatted.push({ label: '✓ Well', value: '', isPositive: true, isFuzzy: false })
    
    return formatted
  }

  return (
    <div className="app">
      <div className="game-container">
        {/* Top Compact Stats Bar */}
        <div className="stats-bar">
          <div className="stat-compact" data-stat="gold">
            <span className="stat-icon">💰</span>
            <span className="stat-value">{gameState.stats.gold}</span>
          </div>
          <div className="stat-compact" data-stat="satisfaction">
            <span className="stat-icon">😊</span>
            <span className="stat-value">{gameState.stats.satisfaction}</span>
          </div>
          <div className="stat-compact" data-stat="health">
            <span className="stat-icon">❤️</span>
            <span className="stat-value">{gameState.stats.health}</span>
          </div>
          <div className="stat-compact stat-warning" data-stat="fireRisk">
            <span className="stat-icon">🔥</span>
            <span className="stat-value">{gameState.stats.fireRisk}</span>
          </div>
          <div className="stat-compact" data-stat="farmers">
            <span className="stat-icon">👨‍🌾</span>
            <span className="stat-value">{gameState.stats.farmers}</span>
          </div>
          <div className="stat-compact" data-stat="landForces">
            <span className="stat-icon">⚔️</span>
            <span className="stat-value">{gameState.stats.landForces}</span>
          </div>
          <div className="stat-compact stat-authority" data-stat="authority">
            <span className="stat-icon">👑</span>
            <span className="stat-value">{Math.floor(gameState.stats.authority)}</span>
            {/* Floating Feedback for Authority Changes */}
            {authorityFeedback.map(feedback => (
              <div 
                key={feedback.id} 
                className={`authority-floating-feedback ${feedback.amount > 0 ? 'positive' : 'negative'}`}
              >
                {feedback.amount > 0 ? '+' : ''}{feedback.amount}
              </div>
            ))}
          </div>
        </div>

        {/* Flying Feedback Overlay */}
        {flyingFeedbacks.map(feedback => {
          // Get target stat element position
          const targetElement = document.querySelector(`[data-stat="${feedback.stat}"]`)
          const targetRect = targetElement?.getBoundingClientRect()
          
          if (!targetRect) return null
          
          const targetX = targetRect.left + targetRect.width / 2
          const targetY = targetRect.top + targetRect.height / 2
          
          return (
            <div
              key={feedback.id}
              className={`flying-feedback ${feedback.amount > 0 ? 'positive' : 'negative'}`}
              style={{
                '--start-x': `${feedback.startX}px`,
                '--start-y': `${feedback.startY}px`,
                '--end-x': `${targetX}px`,
                '--end-y': `${targetY}px`,
              } as React.CSSProperties}
            >
              <span className="feedback-icon">{getStatIcon(feedback.stat)}</span>
              <span className="feedback-amount">
                {feedback.amount > 0 ? '+' : ''}{Math.round(feedback.amount)}
              </span>
            </div>
          )
        })}

        {/* Bankruptcy Warning */}
        {showBankruptcyWarning && !gameState.gameOver && (
          <div className="bankruptcy-warning">
            ⚠️ Bankruptcy imminent ⚠️
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
                          className={`option-button ${disabled ? 'option-disabled' : ''}`}
                          onClick={(e) => !disabled && handleOptionClick(index, e)}
                          disabled={disabled}
                        >
                          <div className="option-text">{option.text}</div>
                          {effects.length > 0 && (
                            <div className="option-consequences">
                              {effects.map((effect, i) => (
                                <span 
                                  key={i} 
                                  className={`consequence ${effect.isFuzzy ? 'fuzzy-indicator' : ''} ${effect.isPositive ? 'positive' : 'negative'}`}
                                >
                                  {effect.isFuzzy && effect.value !== '' && (
                                    <>
                                      {effect.label}: {effect.value}
                                    </>
                                  )}
                                  {!effect.isFuzzy && typeof effect.value === 'number' && effect.value !== 0 && (
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
                </div>
              </>
            ) : (
              <p className="request-text">No request available</p>
            )}
          </div>
        )}

        {/* Bottom Bar with Toggle */}
        <div className="bottom-bar">
          <div className="toggle-buttons">
            <button 
              className={`toggle-btn ${bottomTab === 'needs' ? 'active' : ''}`}
              onClick={() => setBottomTab('needs')}
            >
              Needs
            </button>
            <button 
              className={`toggle-btn ${bottomTab === 'log' ? 'active' : ''}`}
              onClick={() => setBottomTab('log')}
            >
              Log
            </button>
          </div>
          
          <div className="bottom-content">
            {bottomTab === 'needs' ? (
              <div className="needs-panel">
                {gameState.newlyUnlockedNeed && (
                  <div className="need-unlock-message">
                    🎉 New need unlocked: {needDisplayNames[gameState.newlyUnlockedNeed]}!
                  </div>
                )}
                {(['marketplace', 'bread', 'beer', 'firewood', 'well'] as Array<keyof Needs>).map((needKey) => {
                  const state = getNeedState(needKey)
                  return (
                    <div 
                      key={needKey} 
                      className={`need-item need-${state.status}`}
                    >
                      <div className="need-header">
                        <span className="need-name">{needDisplayNames[needKey]}</span>
                        <span className="need-status">{state.label}</span>
                      </div>
                      <div className="need-effect">Effect: {needEffectDescriptions[needKey]}</div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="log-compact">
                {recentLogs.length === 0 ? (
                  <p className="log-empty">No decisions yet</p>
                ) : (
                  recentLogs.map((entry, index) => (
                    <div key={`${entry.tick}-${entry.source}-${index}`} className="log-entry">
                      <div className="log-header">
                        <span className={`log-source log-source-${entry.source.toLowerCase().replace(/\s+/g, '-')}`}>
                          {entry.source}
                        </span>
                        {entry.optionText && (
                          <span className="log-option">{entry.optionText}</span>
                        )}
                      </div>
                      <div className="log-deltas">
                        {Object.entries(entry.deltas).map(([key, value]) => {
                          const displayValue = isFuzzyStatKey(key) ? getFuzzyIndicator(value) : `${value > 0 ? '+' : ''}${value}`
                          
                          return (
                            <span
                              key={key}
                              className={`delta ${isFuzzyStatKey(key) ? 'fuzzy-indicator' : ''} ${value > 0 ? 'positive' : 'negative'}`}
                            >
                              {key}: {displayValue}
                            </span>
                          )
                        })}
                      </div>
                      {/* Display need modifier effects */}
                      {entry.appliedChanges && entry.appliedChanges.length > 0 && (
                        <div className="log-modifiers">
                          {entry.appliedChanges.map((change, changeIndex) => {
                            // Map source to icon and label
                            const needIcons: Record<string, string> = {
                              'need:firewood': '🪵',
                              'need:well': '💧',
                              'need:bread': '🍞',
                            };
                            const needLabels: Record<string, string> = {
                              'need:firewood': 'Firewood',
                              'need:well': 'Well',
                              'need:bread': 'Bread',
                            };
                            
                            const icon = needIcons[change.source] || '✨';
                            const label = needLabels[change.source] || change.source;
                            const displayValue = isFuzzyStatKey(change.stat) 
                              ? getFuzzyIndicator(change.amount) 
                              : `${change.amount > 0 ? '+' : ''}${change.amount}`;
                            
                            return (
                              <div key={changeIndex} className="modifier-effect">
                                <span className="modifier-icon">{icon}</span>
                                <span className="modifier-label">{label}:</span>
                                <span className={`modifier-value ${change.amount > 0 ? 'positive' : 'negative'}`}>
                                  {change.stat}: {displayValue}
                                </span>
                                {change.note && (
                                  <span className="modifier-note" title={change.note}>ℹ️</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
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
                
                const threshold = config.threshold || 0
                const willSucceed = currentCommit >= threshold
                // Safely calculate success chance, handling 0 threshold edge case
                const successChance = threshold === 0 ? 100 : 
                  (currentCommit >= threshold ? 100 : 
                    Math.floor((currentCommit / threshold) * 100))
                
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
                        <div className={`authority-outcome ${willSucceed ? 'success' : 'failure'}`}>
                          {willSucceed ? '✓ SUCCESS' : '✗ UNCERTAIN'}
                        </div>
                      )}
                    </div>
                    
                    <div className="authority-commit-display">
                      <div className="commit-value">
                        <span className="commit-label">Committing:</span>
                        <span className="commit-amount">{currentCommit}</span>
                      </div>
                      {hasImmediateEffects && (
                        <>
                          <div className="commit-threshold">
                            <span className="threshold-label">Threshold:</span>
                            <span className="threshold-amount">{config.threshold}</span>
                          </div>
                          <div className={`commit-probability ${willSucceed ? 'success' : 'uncertain'}`}>
                            <span className="probability-label">Chance:</span>
                            <span className="probability-amount">{successChance}%</span>
                          </div>
                        </>
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
                      className={`authority-slider ${willSucceed ? 'success' : 'uncertain'}`}
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
                                {eff.label}: {eff.isFuzzy ? eff.value : (typeof eff.value === 'number' ? (eff.value > 0 ? '+' : '') + eff.value : eff.value)}
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
                                {eff.label}: {eff.isFuzzy ? eff.value : (typeof eff.value === 'number' ? (eff.value > 0 ? '+' : '') + eff.value : eff.value)}
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
        
        {/* Version display */}
        <div className="version-footer">
          v{__APP_VERSION__} ({__GIT_BRANCH__})
        </div>
      </div>
    </div>
  )
}

export default App
