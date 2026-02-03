import type { Request } from '../types';
import './RequestPanel.css';

interface RequestPanelProps {
  request: Request;
  onChooseOption: (optionIndex: number) => void;
}

export default function RequestPanel({ request, onChooseOption }: RequestPanelProps) {
  return (
    <div className="request-panel">
      <h2>{request.title}</h2>
      <p className="request-description">{request.description}</p>
      <div className="options">
        {request.options.map((option, index) => (
          <button
            key={index}
            className="option-button"
            onClick={() => onChooseOption(index)}
          >
            <span className="option-label">{option.label}</span>
            <div className="option-effects">
              {option.effects.map((effect, effectIndex) => (
                <span
                  key={effectIndex}
                  className={`effect ${effect.change > 0 ? 'positive' : 'negative'}`}
                >
                  {effect.change > 0 ? '+' : ''}{effect.change} {effect.stat}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
