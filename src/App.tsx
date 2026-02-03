import { useState } from 'react'
import './App.css'

interface GameStats {
  food: number
  farmers: number
  happiness: number
  treasury: number
}

interface Decision {
  text: string
  effects: Partial<GameStats>
}

function App() {
  const [tick, setTick] = useState(0)
  const [stats, setStats] = useState<GameStats>({
    food: 50,
    farmers: 10,
    happiness: 50,
    treasury: 100
  })
  
  // Generate decisions based on current game state
  const getDecisions = (): Decision[] => {
    const decisions: Decision[] = []
    
    // Vary decisions based on game state
    if (stats.food < 30) {
      decisions.push({
        text: "Focus on farming this season",
        effects: { food: 20, farmers: -1 }
      })
    } else {
      decisions.push({
        text: "Host a royal feast",
        effects: { food: -15, happiness: 15, treasury: -10 }
      })
    }
    
    if (stats.treasury < 50) {
      decisions.push({
        text: "Levy new taxes",
        effects: { treasury: 30, happiness: -10 }
      })
    } else {
      decisions.push({
        text: "Recruit more farmers",
        effects: { farmers: 3, treasury: -20 }
      })
    }
    
    // Return max 2 decisions
    return decisions.slice(0, 2)
  }
  
  const makeDecision = (decision: Decision) => {
    // Apply decision effects
    setStats(prev => {
      const newStats = { ...prev }
      Object.entries(decision.effects).forEach(([key, value]) => {
        if (value !== undefined) {
          newStats[key as keyof GameStats] += value
        }
      })
      return newStats
    })
    setTick(prev => prev + 1)
  }
  
  const decisions = getDecisions()
  
  return (
    <div className="game-container">
      <div className="header">
        <h1>⚔️ MarkenKaledruns</h1>
        <p className="subtitle">Rule your kingdom wisely, one decision at a time</p>
      </div>
      
      <div className="stats-panel">
        <h2>Kingdom Stats - Tick {tick}</h2>
        <div className="stats-grid">
          <div className="stat">
            <span className="stat-icon">🌾</span>
            <span className="stat-label">Food:</span>
            <span className="stat-value">{stats.food}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">👨‍🌾</span>
            <span className="stat-label">Farmers:</span>
            <span className="stat-value">{stats.farmers}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">😊</span>
            <span className="stat-label">Happiness:</span>
            <span className="stat-value">{stats.happiness}</span>
          </div>
          <div className="stat">
            <span className="stat-icon">💰</span>
            <span className="stat-label">Treasury:</span>
            <span className="stat-value">{stats.treasury}</span>
          </div>
        </div>
      </div>
      
      <div className="decisions-panel">
        <h2>Your Decision, Your Majesty</h2>
        <p className="decision-prompt">Choose your action for this turn:</p>
        <div className="decisions-grid">
          {decisions.map((decision, index) => (
            <button
              key={index}
              className="decision-button"
              onClick={() => makeDecision(decision)}
            >
              <div className="decision-text">{decision.text}</div>
              <div className="decision-effects">
                {Object.entries(decision.effects).map(([stat, value]) => (
                  <span 
                    key={stat}
                    className={`effect ${value! > 0 ? 'positive' : 'negative'}`}
                  >
                    {stat}: {value! > 0 ? '+' : ''}{value}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <footer className="footer">
        <p>🎮 Proof-of-Fun Prototype | All decisions are permanent</p>
      </footer>
    </div>
  )
}

export default App
