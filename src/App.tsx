import { useReducer } from 'react'
import './App.css'
import { gameReducer, initializeGame } from './pof/state'
import { needRequests, eventRequests } from './pof/requests'
import type { Effect } from './pof/models'

function App() {
  const [gameState, dispatch] = useReducer(gameReducer, undefined, initializeGame)

  const currentRequest = [...needRequests, ...eventRequests].find(
    (r) => r.id === gameState.currentRequestId
  )

  const handleOptionClick = (optionIndex: number) => {
    dispatch({ type: 'CHOOSE_OPTION', optionIndex })
  }

  // Get last 8 log entries
  const recentLogs = gameState.log.slice(-8).reverse()

  // Check if current request is a crisis event
  const isCrisis = currentRequest?.id.startsWith('EVT_CRISIS_') ?? false

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
        {/* Stats Panel */}
        <div className="panel stats-panel">
          <h2>Village Stats</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Gold:</span>
              <span className="stat-value">{gameState.stats.gold}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Satisfaction:</span>
              <span className="stat-value">{gameState.stats.satisfaction}/100</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Health:</span>
              <span className="stat-value">{gameState.stats.health}/100</span>
            </div>
            <div className="stat-item stat-warning">
              <span className="stat-label">Fire Risk (⚠️ higher is worse):</span>
              <span className="stat-value">{gameState.stats.fireRisk}/100</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Farmers:</span>
              <span className="stat-value">{gameState.stats.farmers}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Land Forces:</span>
              <span className="stat-value">{gameState.stats.landForces}</span>
            </div>
          </div>
        </div>

        {/* Needs Panel */}
        <div className="panel needs-panel">
          <h2>Village Needs</h2>
          <div className="needs-list">
            <div className="need-item">
              <span className="need-checkbox">{gameState.needs.marketplace ? '✓' : '☐'}</span>
              <span className="need-label">Marketplace</span>
            </div>
            <div className="need-item">
              <span className="need-checkbox">{gameState.needs.bread ? '✓' : '☐'}</span>
              <span className="need-label">Bread</span>
            </div>
            <div className="need-item">
              <span className="need-checkbox">{gameState.needs.beer ? '✓' : '☐'}</span>
              <span className="need-label">Beer</span>
            </div>
            <div className="need-item">
              <span className="need-checkbox">{gameState.needs.firewood ? '✓' : '☐'}</span>
              <span className="need-label">Firewood</span>
            </div>
            <div className="need-item">
              <span className="need-checkbox">{gameState.needs.well ? '✓' : '☐'}</span>
              <span className="need-label">Well</span>
            </div>
          </div>
        </div>

        {/* Request Panel */}
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
                  return (
                    <button
                      key={index}
                      className="option-button"
                      onClick={() => handleOptionClick(index)}
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
                    </button>
                  )
                })}
              </div>
            </>
          ) : (
            <p className="request-text">No request available</p>
          )}
        </div>

        {/* Log Panel */}
        <div className="panel log-panel">
          <h2>Decision Log (Last 8)</h2>
          <div className="log-entries">
            {recentLogs.length === 0 ? (
              <p className="log-empty">No decisions yet</p>
            ) : (
              recentLogs.map((entry) => (
                <div key={entry.tick} className="log-entry">
                  <div className="log-header">
                    <span className="log-tick">Turn {entry.tick}</span>
                    <span className="log-option">{entry.optionText}</span>
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
        </div>
      </div>
    </div>
  )
}

export default App
