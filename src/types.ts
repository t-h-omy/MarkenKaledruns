// Game State Types

export interface GameState {
  // Population
  farmers: number;
  
  // Resources
  gold: number;
  food: number;
  
  // Capacities
  housingCapacity: number;
  foodProduction: number;
  
  // Derived needs (computed)
  housingNeed: number;
  foodNeed: number;
  
  // Game state
  tick: number;
  currentRequest: Request | null;
  lastEffects: Effect[];
  showingFeedback: boolean;
}

export interface Request {
  id: string;
  title: string;
  description: string;
  options: RequestOption[];
}

export interface RequestOption {
  label: string;
  effects: Effect[];
}

export interface Effect {
  stat: string;
  change: number;
}

export type StatKey = 'farmers' | 'gold' | 'food' | 'housingCapacity' | 'foodProduction';
