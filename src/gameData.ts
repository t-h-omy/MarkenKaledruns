import type { Request } from './types';

// Request pool based on POF_SPEC.md
export const REQUESTS: Request[] = [
  {
    id: 'expand-housing',
    title: 'Expand Housing',
    description: 'Your advisors propose building new housing to accommodate more farmers.',
    options: [
      {
        label: 'Build modest housing',
        effects: [
          { stat: 'gold', change: -50 },
          { stat: 'housingCapacity', change: 10 }
        ]
      },
      {
        label: 'Build spacious housing',
        effects: [
          { stat: 'gold', change: -100 },
          { stat: 'housingCapacity', change: 15 }
        ]
      }
    ]
  },
  {
    id: 'improve-farming',
    title: 'Improve Farming',
    description: 'A new farming technique could improve food production.',
    options: [
      {
        label: 'Adopt new technique',
        effects: [
          { stat: 'gold', change: -80 },
          { stat: 'foodProduction', change: 5 }
        ]
      },
      {
        label: 'Research better methods',
        effects: [
          { stat: 'gold', change: -150 },
          { stat: 'foodProduction', change: 10 }
        ]
      }
    ]
  },
  {
    id: 'recruit-farmers',
    title: 'Recruit Farmers',
    description: 'Merchants arrive offering to bring farmers to your realm.',
    options: [
      {
        label: 'Welcome modest group',
        effects: [
          { stat: 'gold', change: -30 },
          { stat: 'farmers', change: 10 }
        ]
      },
      {
        label: 'Welcome large group',
        effects: [
          { stat: 'gold', change: -60 },
          { stat: 'farmers', change: 20 }
        ]
      }
    ]
  },
  {
    id: 'tax-collection',
    title: 'Tax Collection',
    description: 'The tax collector suggests increasing taxes to fill the treasury.',
    options: [
      {
        label: 'Moderate taxes',
        effects: [
          { stat: 'gold', change: 100 },
          { stat: 'farmers', change: -5 }
        ]
      },
      {
        label: 'Heavy taxes',
        effects: [
          { stat: 'gold', change: 200 },
          { stat: 'farmers', change: -15 }
        ]
      }
    ]
  },
  {
    id: 'festival',
    title: 'Festival',
    description: 'The farmers request a festival to boost morale.',
    options: [
      {
        label: 'Simple celebration',
        effects: [
          { stat: 'gold', change: -40 },
          { stat: 'farmers', change: 5 }
        ]
      },
      {
        label: 'Grand festival',
        effects: [
          { stat: 'gold', change: -100 },
          { stat: 'farmers', change: 15 }
        ]
      }
    ]
  },
  {
    id: 'pest-control',
    title: 'Pest Control',
    description: 'Pests threaten the crops. You must act quickly.',
    options: [
      {
        label: 'Basic protection',
        effects: [
          { stat: 'gold', change: -30 },
          { stat: 'foodProduction', change: 2 }
        ]
      },
      {
        label: 'Comprehensive measures',
        effects: [
          { stat: 'gold', change: -70 },
          { stat: 'foodProduction', change: 5 }
        ]
      }
    ]
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure',
    description: 'Roads and wells need improvement.',
    options: [
      {
        label: 'Basic repairs',
        effects: [
          { stat: 'gold', change: -50 },
          { stat: 'housingCapacity', change: 5 },
          { stat: 'foodProduction', change: 2 }
        ]
      },
      {
        label: 'Major renovation',
        effects: [
          { stat: 'gold', change: -120 },
          { stat: 'housingCapacity', change: 10 },
          { stat: 'foodProduction', change: 5 }
        ]
      }
    ]
  },
  {
    id: 'emergency-aid',
    title: 'Emergency Aid',
    description: 'Farmers are struggling and need immediate help.',
    options: [
      {
        label: 'Provide food',
        effects: [
          { stat: 'food', change: 50 },
          { stat: 'gold', change: -20 }
        ]
      },
      {
        label: 'Provide gold',
        effects: [
          { stat: 'gold', change: -80 },
          { stat: 'farmers', change: 10 }
        ]
      }
    ]
  },
  {
    id: 'labor-shortage',
    title: 'Labor Shortage',
    description: 'Too few workers are available for the harvest.',
    options: [
      {
        label: 'Hire seasonal workers',
        effects: [
          { stat: 'gold', change: -40 },
          { stat: 'foodProduction', change: 3 }
        ]
      },
      {
        label: 'Invest in tools',
        effects: [
          { stat: 'gold', change: -80 },
          { stat: 'foodProduction', change: 6 }
        ]
      }
    ]
  },
  {
    id: 'housing-maintenance',
    title: 'Housing Maintenance',
    description: 'Some housing has fallen into disrepair.',
    options: [
      {
        label: 'Minimal repairs',
        effects: [
          { stat: 'gold', change: -30 },
          { stat: 'housingCapacity', change: 3 }
        ]
      },
      {
        label: 'Full restoration',
        effects: [
          { stat: 'gold', change: -70 },
          { stat: 'housingCapacity', change: 8 }
        ]
      }
    ]
  }
];

export function getRandomRequest(): Request {
  const index = Math.floor(Math.random() * REQUESTS.length);
  return REQUESTS[index];
}
