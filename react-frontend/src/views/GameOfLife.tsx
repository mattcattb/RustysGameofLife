import { useState, useEffect } from 'react'

import '../styles/App.css'
import Board from '../components/Board';
import {SettingsEditor} from '../components/SettingsEditor';

import {GameWasm} from 'GOL-core-rust'

import { CharGrid, GameOfLifeSettings } from '../types';

function GameOfLifeView() {

  const [game, setGame] = useState<GameWasm>();
  const [grid, setGrid] = useState<CharGrid>([]);
  const [gameSettings, setGameSettings] = useState<GameOfLifeSettings>({
    width:10,
    height:10,
    tileOptions:"x0",
    colors:{
      deadColor:"black",
      aliveColor:"white"
    }
  })

  useEffect(() => {
    // generate your random state!

    const initWasm = async () => {
        try {
            const {tileOptions, width, height} = gameSettings;
            const newGame = GameWasm.new_random_game(height,width,tileOptions);
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
    if (!game) return;
    console.log(`clicked (${r},${c}) of value ${grid[r][c]}`);
    game.interact_tile(r,c);
    const newGrid = game.get_grid();
    setGrid(newGrid);
  }

  const onNextPress = () => {
    // do game next state!
    
    if (!game) return;

    game.next_turn();
    const newGrid = game.get_grid();
    setGrid(newGrid);
  }

  const onResetPress = () => {
    const { tileOptions, width, height } = gameSettings;
    const newGame = GameWasm.new_random_game(height, width, tileOptions);
    setGame(newGame);
    setGrid(newGame.get_grid());
  };

  return (
    <div className='app'>
      <div>
        <SettingsEditor gameOfLifeSettings={gameSettings} setGameOfLifeSettings={setGameSettings}/>
        <Board grid={grid} onClick={onTileClick} gameSettings={gameSettings}/>
      </div>
      <button onClick={onNextPress}>Next</button>
      <button onClick = {onResetPress}>Reset Board</button>
    </div>
  )
}

export default GameOfLifeView
