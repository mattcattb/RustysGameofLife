import { useState } from 'react'

import './styles/App.css'
import GameOfLifeView from './views/GameOfLife';
import ElementsView from './views/Elements';

function App() {

  const [page, setPage] = useState<string>("gol");

  return (
    <div className='app'>
      {page === "gol" && ( 
        <GameOfLifeView />
      )}
      {page === "elements" && (
        <ElementsView />
      )}
    </div>
  )
}

export default App
