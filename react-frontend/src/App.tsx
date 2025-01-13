import { useState } from 'react'

import './styles/App.css'
import GameOfLifeView from './views/GameOfLife';
import { GameProvider } from './contexts/GameContext';

function App() {


  return (
    <div className="h-screen w-screen bg-gray-800 flex justify-center items-center">
      <GameProvider>
        <GameOfLifeView />
      </GameProvider>
    </div>   

  )
}

export default App
