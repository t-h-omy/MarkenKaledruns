import { useState } from 'react';
import type { GameState } from '../types';
import { createInitialState, startGame, chooseOption, continueGame } from '../gameLogic';
import StatsPanel from './StatsPanel';
import RequestPanel from './RequestPanel';
import FeedbackPanel from './FeedbackPanel';
import './Game.css';

export default function Game() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const initial = createInitialState();
    return startGame(initial);
  });

  const handleChooseOption = (optionIndex: number) => {
    const newState = chooseOption(gameState, optionIndex);
    setGameState(newState);
  };

  const handleContinue = () => {
    const newState = continueGame(gameState);
    setGameState(newState);
  };

  const handleRestart = () => {
    const initial = createInitialState();
    setGameState(startGame(initial));
  };

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>Realm of Decisions</h1>
        <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button>
      </header>
      
      <StatsPanel state={gameState} />
      
      <div className="game-content">
        {gameState.showingFeedback ? (
          <FeedbackPanel
            effects={gameState.lastEffects}
            onContinue={handleContinue}
          />
        ) : gameState.currentRequest ? (
          <RequestPanel
            request={gameState.currentRequest}
            onChooseOption={handleChooseOption}
          />
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>

      <footer className="game-footer">
        <p>Every decision matters. All consequences are permanent.</p>
      </footer>
    </div>
  );
}
