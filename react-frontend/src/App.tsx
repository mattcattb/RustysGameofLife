import './styles/App.css'

import GameOfLifeView from './views/GameOfLife';
import { GameProvider } from './contexts/GameContext';

function App() {

  return (
  <GameProvider>
    <GameOfLifeView />
  </GameProvider>
  )
}

export default App
