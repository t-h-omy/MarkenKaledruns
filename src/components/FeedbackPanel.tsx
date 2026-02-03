import type { Effect } from '../types';
import './FeedbackPanel.css';

interface FeedbackPanelProps {
  effects: Effect[];
  onContinue: () => void;
}

export default function FeedbackPanel({ effects, onContinue }: FeedbackPanelProps) {
  return (
    <div className="feedback-panel">
      <h2>Effects Applied</h2>
      <div className="effects-list">
        {effects.map((effect, index) => (
          <div
            key={index}
            className={`feedback-effect ${effect.change > 0 ? 'positive' : 'negative'}`}
          >
            <span className="effect-stat">{effect.stat}:</span>
            <span className="effect-change">
              {effect.change > 0 ? '+' : ''}{effect.change}
            </span>
          </div>
        ))}
      </div>
      <button className="continue-button" onClick={onContinue}>
        Continue
      </button>
    </div>
  );
}
