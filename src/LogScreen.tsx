import { useEffect } from 'react'
import './LogScreen.css'
import type { LogEntry } from './game/state'

interface LogScreenProps {
  isOpen: boolean;
  onClose: () => void;
  log: LogEntry[];
}

function LogScreen({ isOpen, onClose, log }: LogScreenProps) {
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
  
  if (!isOpen) return null
  
  const formatDeltaValue = (value: number): string => {
    if (value === 0) return '0'
    return value > 0 ? `+${value}` : `${value}`
  }
  
  // Reverse log to show most recent first
  const reversedLog = [...log].reverse()
  
  return (
    <div className="log-screen-overlay" onClick={onClose}>
      <div className="log-screen-panel" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="log-close-btn" onClick={onClose}>
          ✕
        </button>
        
        {/* Header */}
        <div className="log-header-section">
          <h2>📜 Decision Log</h2>
          <p className="log-subtitle">History of all your choices and their effects</p>
        </div>
        
        {/* Log Content */}
        <div className="log-content">
          {reversedLog.length === 0 ? (
            <div className="log-empty-state">
              <p>No decisions made yet</p>
              <p className="log-empty-hint">Your choices and their effects will appear here</p>
            </div>
          ) : (
            reversedLog.map((entry, index) => (
              <div key={`${entry.tick}-${entry.source}-${index}`} className="log-entry">
                <div className="log-entry-header">
                  <span className="log-tick">Tick {entry.tick}</span>
                  <span className={`log-source log-source-${entry.source.toLowerCase().replace(/\s+/g, '-')}`}>
                    {entry.source}
                  </span>
                </div>
                
                {entry.optionText && (
                  <div className="log-choice">
                    <span className="log-choice-label">Choice:</span>
                    <span className="log-choice-text">{entry.optionText}</span>
                  </div>
                )}
                
                <div className="log-deltas">
                  {Object.entries(entry.deltas).map(([key, value]) => {
                    const displayValue = formatDeltaValue(value as number)
                    
                    return (
                      <span
                        key={key}
                        className={`delta ${(value as number) > 0 ? 'positive' : 'negative'}`}
                      >
                        {key}: {displayValue}
                      </span>
                    )
                  })}
                </div>
                
                {/* Display building modifier effects */}
                {entry.appliedChanges && entry.appliedChanges.length > 0 && (
                  <div className="log-modifiers">
                    {entry.appliedChanges.map((change: any, changeIndex: number) => {
                      // Map source to icon and label
                      const buildingIcons: Record<string, string> = {
                        'building:firewood': '🪵',
                        'building:well': '💧',
                        'building:bakery': '🍞',
                        'overcrowding': '⛺',
                      };
                      const buildingLabels: Record<string, string> = {
                        'building:firewood': 'Firewood',
                        'building:well': 'Well',
                        'building:bakery': 'Bakery',
                        'overcrowding': 'Overcrowding',
                      };

                      const icon = buildingIcons[change.source] || '✨';
                      const label = buildingLabels[change.source] || change.source;
                      const displayValue = formatDeltaValue(change.amount);
                      
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
      </div>
    </div>
  )
}

export default LogScreen
