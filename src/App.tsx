import { useReducer } from 'react'
import './App.css'
import { gameReducer, initializeGame } from './pof/state'
import type { GameState } from './pof/state'
import { needRequests, eventRequests } from './pof/requests'

function App() {
  const [gameState, dispatch] = useReducer(gameReducer, null as unknown as GameState, initializeGame)

  const currentRequest = [...needRequests, ...eventRequests].find(
    (r) => r.id === gameState.currentRequestId
  )

  const handleOptionClick = (optionIndex: number) => {
    dispatch({ type: 'CHOOSE_OPTION', optionIndex })
  }

  // Get last 8 log entries
  const recentLogs = gameState.log.slice(-8).reverse()

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
        <div className="panel request-panel">
          <h2>Decision Required</h2>
          {currentRequest ? (
            <>
              <p className="request-text">{currentRequest.text}</p>
              <div className="options-container">
                {currentRequest.options.map((option, index) => (
                  <button
                    key={index}
                    className="option-button"
                    onClick={() => handleOptionClick(index)}
                  >
                    {option.text}
                  </button>
                ))}
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
              recentLogs.map((entry, index) => (
                <div key={`${entry.tick}-${index}`} className="log-entry">
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
