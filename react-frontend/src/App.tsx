import { useState, useEffect } from 'react'

import './styles/App.css'
import Board from './components/Board';

import {GameWasm} from 'GOL-core-rust'

function App() {

  const [game, setGame] = useState<GameWasm>();
  const [grid, setGrid] = useState<Array<Array<string>>>([]);

  useEffect(() => {
    // generate your random state!
    const initWasm = async () => {
        try {
            const tile_options = "x0";
            const newGame = GameWasm.new_random_game(20,20,tile_options);
            setGame(newGame);
            setGrid(newGame.get_grid());
        } catch (error) {
            console.error("Error occured: ", error);
        }
    }
    initWasm();
  }, []);

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

  const onNextPress = () => {
    // do game next state!
    console.log("Moving to next game state!");
    // get the new grid here with wasm!
  }

  const onResetPress = () => {

  }

  return (
    <div className='app'>
      <div>
        <Board grid={grid} onClick={onTileClick}/>
      </div>
      <button onClick={onNextPress}>Next</button>
      <button onClick = {onResetPress}>Reset Board</button>
    </div>
  )
}

export default App
