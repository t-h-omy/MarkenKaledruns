import { useState, useEffect } from 'react'
import './BuildMultipleModal.css'
import type { BuildingDefinition } from './game/buildings'

interface BuildMultipleModalProps {
  isOpen: boolean;
  onClose: () => void;
  building: BuildingDefinition | null;
  currentGold: number;
  shortage: number;
  onConfirm: (buildingId: string, quantity: number) => void;
}

function BuildMultipleModal({
  isOpen,
  onClose,
  building,
  currentGold,
  shortage,
  onConfirm
}: BuildMultipleModalProps) {
  const [quantity, setQuantity] = useState(1)
  
  // Calculate max affordable quantity (up to 10 max as per design)
  const maxAffordable = building ? Math.floor(currentGold / building.cost) : 0
  const maxQuantity = Math.min(maxAffordable, shortage, 10)
  
  // Reset quantity when modal opens or building changes
  useEffect(() => {
    if (isOpen && building) {
      setQuantity(Math.min(1, maxQuantity))
    }
  }, [isOpen, building, maxQuantity])
  
  // Handle Escape key
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
  
  if (!isOpen || !building) return null
  
  const totalCost = quantity * building.cost
  const goldAfter = currentGold - totalCost
  
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }
  
  const handleIncrement = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1)
  }
  
  const handleConfirm = () => {
    onConfirm(building.id, quantity)
    onClose()
  }
  
  return (
    <div className="build-multiple-overlay" onClick={onClose}>
      <div className="build-multiple-modal" onClick={(e) => e.stopPropagation()}>
        <button className="build-multiple-close" onClick={onClose}>✕</button>
        
        <h2 className="build-multiple-title">
          Build Multiple {building.displayName}s
        </h2>
        
        <div className="build-multiple-content">
          <p className="build-multiple-question">How many would you like to build?</p>
          
          <div className="build-multiple-stepper">
            <button
              className="stepper-button"
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              &lt;
            </button>
            <div className="stepper-value">{quantity}</div>
            <button
              className="stepper-button"
              onClick={handleIncrement}
              disabled={quantity >= maxQuantity}
            >
              &gt;
            </button>
          </div>
          
          <div className="build-multiple-cost">
            <div className="cost-line">
              <span>Total Cost:</span>
              <span className="cost-value">{totalCost} Gold</span>
            </div>
            <div className="cost-line">
              <span>Gold After:</span>
              <span className="cost-value">{currentGold} → {goldAfter}</span>
            </div>
          </div>
          
          <div className="build-multiple-warning">
            ⚠️ This will build {quantity} {building.displayName}{quantity > 1 ? 's' : ''}
          </div>
          
          <div className="build-multiple-actions">
            <button className="confirm-button" onClick={handleConfirm}>
              CONFIRM
            </button>
            <button className="cancel-button" onClick={onClose}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuildMultipleModal
