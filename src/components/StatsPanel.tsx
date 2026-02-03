import type { GameState } from '../types';
import './StatsPanel.css';

interface StatsPanelProps {
  state: GameState;
}

export default function StatsPanel({ state }: StatsPanelProps) {
  const housingStatus = state.housingCapacity >= state.housingNeed ? 'met' : 'warning';
  const foodProductionStatus = state.foodProduction >= state.foodNeed ? 'met' : 'warning';
  
  return (
    <div className="stats-panel">
      <h2>Realm Status</h2>
      <div className="stats-grid">
        <div className="stat">
          <span className="stat-label">Farmers:</span>
          <span className="stat-value">{state.farmers}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Gold:</span>
          <span className="stat-value">{state.gold}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Food:</span>
          <span className="stat-value">{state.food}</span>
        </div>
        <div className={`stat ${housingStatus}`}>
          <span className="stat-label">Housing:</span>
          <span className="stat-value">{state.housingCapacity} / {state.housingNeed}</span>
        </div>
        <div className={`stat ${foodProductionStatus}`}>
          <span className="stat-label">Food Production:</span>
          <span className="stat-value">{state.foodProduction} / {state.foodNeed} per tick</span>
        </div>
        <div className="stat">
          <span className="stat-label">Tick:</span>
          <span className="stat-value">{state.tick}</span>
        </div>
      </div>
    </div>
  );
}
