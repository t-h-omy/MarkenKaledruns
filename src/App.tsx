import { useReducer, useState } from 'react'
import './App.css'
import { gameReducer, initializeGame, isNeedUnlocked, calculateRequiredBuildings, isNeedRequired } from './game/state'
import { needRequests, eventRequests } from './game/requests'
import type { Effect, Needs } from './game/models'
import { NEED_UNLOCK_THRESHOLDS } from './game/models'

function App() {
  const [gameState, dispatch] = useReducer(gameReducer, undefined, initializeGame)
  const [bottomTab, setBottomTab] = useState<'needs' | 'log'>('needs')

  const currentRequest = [...needRequests, ...eventRequests].find(
    (r) => r.id === gameState.currentRequestId
  )

  const handleOptionClick = (optionIndex: number) => {
    dispatch({ type: 'CHOOSE_OPTION', optionIndex })
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

  // Format effects for display
  const formatEffects = (effects: Effect): Array<{ label: string; value: number; isPositive: boolean }> => {
    const formatted: Array<{ label: string; value: number; isPositive: boolean }> = []
    
    if (effects.gold !== undefined) {
      formatted.push({ 
        label: 'Gold', 
        value: effects.gold, 
        isPositive: effects.gold > 0 
      })
    }
    if (effects.satisfaction !== undefined) {
      formatted.push({ 
        label: 'Satisfaction', 
        value: effects.satisfaction, 
        isPositive: effects.satisfaction > 0 
      })
    }
    if (effects.health !== undefined) {
      formatted.push({ 
        label: 'Health', 
        value: effects.health, 
        isPositive: effects.health > 0 
      })
    }
    if (effects.fireRisk !== undefined) {
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
    
    // Add need fulfillment indicators
    if (effects.marketplace) formatted.push({ label: '✓ Marketplace', value: 0, isPositive: true })
    if (effects.bread) formatted.push({ label: '✓ Bread', value: 0, isPositive: true })
    if (effects.beer) formatted.push({ label: '✓ Beer', value: 0, isPositive: true })
    if (effects.firewood) formatted.push({ label: '✓ Firewood', value: 0, isPositive: true })
    if (effects.well) formatted.push({ label: '✓ Well', value: 0, isPositive: true })
    
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
                <div className="options-container">
                  {currentRequest.options.map((option, index) => {
                    const effects = formatEffects(option.effects)
                    const { disabled, reason } = isOptionDisabled(option.effects)
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
                                className={`consequence ${effect.isPositive ? 'positive' : 'negative'}`}
                              >
                                {effect.value !== 0 && (
                                  <>
                                    {effect.label}: {effect.value > 0 ? '+' : ''}{effect.value}
                                  </>
                                )}
                                {effect.value === 0 && effect.label}
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
                      <span className="need-name">{needDisplayNames[needKey]}</span>
                      <span className="need-status">{state.label}</span>
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
                        {Object.entries(entry.deltas).map(([key, value]) => (
                          <span
                            key={key}
                            className={`delta ${value > 0 ? 'positive' : 'negative'}`}
                          >
                            {key}: {value > 0 ? '+' : ''}{value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
