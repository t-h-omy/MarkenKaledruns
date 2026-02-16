import { useEffect } from 'react'
import './ConstructionScreen.css'

interface ConstructionScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

function ConstructionScreen({ isOpen, onClose }: ConstructionScreenProps) {
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
  
  return (
    <div className="construction-screen-overlay" onClick={onClose}>
      <div className="construction-screen-panel" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="construction-close-btn" onClick={onClose}>
          ✕
        </button>
        
        {/* Header */}
        <div className="construction-header">
          <h2>🏗️ Settlement Construction</h2>
        </div>
        
        {/* Placeholder for construction content */}
        <div className="construction-content">
          <p className="construction-placeholder">
            Construction content coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConstructionScreen
