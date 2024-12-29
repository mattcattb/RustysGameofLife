import { useState, useEffect } from 'react'

import Grid from './components/Board'

import './styles/App.css'
import Board from './components/Board';

function App() {
  const basic_grid = [
    ['a', 'b', 'c'],
    ['D', 'E', 'F'],
    ['G', 'H', 'I'],
  ];

  useEffect(() => {
    // generate your random state!
  }, []);

  const [grid, setGrid] = useState<string[][]>(basic_grid)

  const onTileClick = (r:number, c: number) => {
    // do stuf uhhh

    //todo: error checking first!
    console.log(`clicked (${r},${c}) of value ${grid[r][c]}`);
    const newGrid = grid.map((row, rowIndex) => {
      if (rowIndex == r){
        // on the correct row, lets find the specific column
        const newRow = [...row]; 
        newRow[c] = 'x';
        return newRow;
      }
      return row;
    })
    setGrid(newGrid);
  }

  const nextButtonPress = () => {
    // do game next state!
    console.log("Moving to next game state!");
    // get the new grid here with wasm!
  }

  return (
    <div className='app'>
      <div>
        <Board grid={grid} onClick={onTileClick}/>
      </div>
      <button onClick={nextButtonPress}>Next</button>
    </div>
  )
}

export default App
