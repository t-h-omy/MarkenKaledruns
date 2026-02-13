import { useReducer, useState, useEffect } from 'react'
import './App.css'
import { gameReducer, initializeGame, isNeedUnlocked, calculateRequiredBuildings, isNeedRequired, getCurrentRequest } from './game/state'
import type { Effect, Needs } from './game/models'
import { NEED_UNLOCK_THRESHOLDS } from './game/models'

function App() {
  const [gameState, dispatch] = useReducer(gameReducer, undefined, initializeGame)
  const [bottomTab, setBottomTab] = useState<'needs' | 'log'>('needs')

  const currentRequest = getCurrentRequest(gameState)

  // Combat commit state for slider
  const maxForces = gameState.stats.landForces
  const [combatCommit, setCombatCommit] = useState(Math.min(5, maxForces))

  // Authority commit state for slider
  const maxAuthority = gameState.stats.authority
  const [authorityCommit, setAuthorityCommit] = useState(10)
  
  // Floating feedback for authority changes
  const [authorityFeedback, setAuthorityFeedback] = useState<Array<{ id: number; amount: number }>>([])
  const [previousAuthority, setPreviousAuthority] = useState(gameState.stats.authority)
  
  // Track authority changes and show floating feedback
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

  const handleOptionClick = (optionIndex: number) => {
    const option = currentRequest?.options[optionIndex]
    
    // If combat request and Option A (index 0), pass combatCommit
    if (currentRequest?.combat && optionIndex === 0) {
      dispatch({ type: 'CHOOSE_OPTION', optionIndex, combatCommit })
    } else if (option?.authorityCheck) {
      // If option has authority check, pass authorityCommit
      dispatch({ type: 'CHOOSE_OPTION', optionIndex, authorityCommit })
    } else {
      dispatch({ type: 'CHOOSE_OPTION', optionIndex })
    }
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

  // Format effects for display
  const formatEffects = (effects: Effect, excludeAuthority = false): Array<{ label: string; value: number | string; isPositive: boolean; isFuzzy: boolean }> => {
    const formatted: Array<{ label: string; value: number | string; isPositive: boolean; isFuzzy: boolean }> = []
    
    if (effects.gold !== undefined) {
      formatted.push({ 
        label: 'Gold', 
        value: effects.gold, 
        isPositive: effects.gold > 0,
        isFuzzy: false
      })
    }
    if (effects.satisfaction !== undefined) {
      formatted.push({ 
        label: 'Satisfaction', 
        value: getFuzzyIndicator(effects.satisfaction), 
        isPositive: effects.satisfaction > 0,
        isFuzzy: true
      })
    }
    if (effects.health !== undefined) {
      formatted.push({ 
        label: 'Health', 
        value: getFuzzyIndicator(effects.health), 
        isPositive: effects.health > 0,
        isFuzzy: true
      })
    }
    if (effects.fireRisk !== undefined) {
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
          <div className="stat-compact">
            <span className="stat-icon">💰</span>
            <span className="stat-value">{gameState.stats.gold}</span>
          </div>
          <div className="stat-compact">
            <span className="stat-icon">😊</span>
            <span className="stat-value">{gameState.stats.satisfaction}</span>
          </div>
          <div className="stat-compact">
            <span className="stat-icon">❤️</span>
            <span className="stat-value">{gameState.stats.health}</span>
          </div>
          <div className="stat-compact stat-warning">
            <span className="stat-icon">🔥</span>
            <span className="stat-value">{gameState.stats.fireRisk}</span>
          </div>
          <div className="stat-compact">
            <span className="stat-icon">👨‍🌾</span>
            <span className="stat-value">{gameState.stats.farmers}</span>
          </div>
          <div className="stat-compact">
            <span className="stat-icon">⚔️</span>
            <span className="stat-value">{gameState.stats.landForces}</span>
          </div>
          <div className="stat-compact stat-authority">
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
                
                {/* Authority Slider UI */}
                {currentRequest.options.some(opt => opt.authorityCheck) && (
                  <div className="authority-slider-container">
                    {currentRequest.options.map((option, index) => {
                      if (!option.authorityCheck) return null
                      const config = option.authorityCheck
                      const maxCommittable = Math.floor(maxAuthority)
                      const currentCommit = Math.min(authorityCommit, maxCommittable)
                      
                      // Check if this authority check has immediate effects (onSuccess/onFailure)
                      const hasImmediateEffects = !!(config.onSuccess || config.onFailure)
                      const hasFollowUpBoosts = !!(config.followUpBoosts && config.followUpBoosts.length > 0)
                      
                      const willSucceed = currentCommit >= config.threshold
                      // Safely calculate success chance, handling 0 threshold edge case
                      const successChance = config.threshold === 0 ? 100 : 
                        (currentCommit >= config.threshold ? 100 : 
                          Math.floor((currentCommit / config.threshold) * 100))
                      
                      return (
                        <div key={index}>
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
                                {config.followUpBoosts?.map((boost, i) => (
                                  <div key={i} className="boost-description">
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
                        </div>
                      )
                    })}
                  </div>
                )}
                
                <div className="options-container">
                  {currentRequest.options.map((option, index) => {
                    const effects = formatEffects(option.effects, true)
                    let { disabled, reason } = isOptionDisabled(option.effects)
                    
                    // For combat requests, disable Option A if no forces available
                    if (currentRequest.combat && index === 0 && maxForces < 1) {
                      disabled = true
                      reason = 'No land forces available'
                    }
                    
                    return (
                      <button
                        key={index}
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
        
        {/* Version display */}
        <div className="version-footer">
          v{__APP_VERSION__} ({__GIT_BRANCH__})
        </div>
      </div>
    </div>
  )
}

export default App
