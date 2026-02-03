import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>React + TypeScript + Vite PWA</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Ready to implement your Proof-of-Fun prototype!
        </p>
      </div>
      <p className="info">
        This is a clean PWA setup with React, TypeScript, and Vite.
      </p>
    </div>
  )
}

export default App
