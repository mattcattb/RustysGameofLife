import { useState, useEffect } from 'react'

import '../styles/App.css'
import Board from '../components/Board';
import {SettingsEditor} from '../components/SettingsEditor';

import {GameWasm} from 'GOL-core-rust'

import { CharGrid, GameOfLifeSettings } from '../types';

function GameOfLifeView() {

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [game, setGame] = useState<GameWasm>();
  const [grid, setGrid] = useState<CharGrid>([]);
  const [gameSettings, setGameSettings] = useState<GameOfLifeSettings>({
    width:20,
    height:20,
    tileOptions:"x0",
    colors:{
      deadColor:"black",
      aliveColor:"white"
    },
    speedMS:1000,
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


  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        onNextPress();
      }, gameSettings.speedMS);
      return () => clearInterval(interval);
    }
  }, [isPlaying, gameSettings.speedMS]);

  const onSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameSettings({
      ...gameSettings,
      speedMS:Number(event.target.value)
    });
  }

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

  const onRandomizePress = () => {
    setIsPlaying(false); // stop playing
    const { tileOptions, width, height } = gameSettings;
    const newGame = GameWasm.new_random_game(height, width, tileOptions);
    setGame(newGame);
    setGrid(newGame.get_grid());
  };

  const onWipePress = () => {
    // <button onClick ={onWipePress}>Wipe Board</button> 

    const {tileOptions, width, height } = gameSettings;
    // const newGame = GameWasm.new_blank_game(height, width, tileOptions);
    // setGame(newGame);
    // setGrid(newGame.get_grid());
  }

  const onPlayPress = () => {
    setIsPlaying(!isPlaying);
  }

  return (
  <div className="Game-Of-Life-View">
    <div className='title'>
      <h1>Game Of Life</h1>
    </div>
    <div className="flex flex-row items-start">
      <div className='flex flex-col items-start space-x-9 m-5 justify-center items-center'>
        <div className="settings">
            <SettingsEditor gameOfLifeSettings={gameSettings} setGameOfLifeSettings={setGameSettings} />
            <div className='m-1'>
              <label className=''>
                Speed (ms): {''}
                <input
                  type="number"
                  value={gameSettings.speedMS}
                  onChange={onSpeedChange}
                  min="50"
                  max="2000"
                  step="50"
                ></input>
              </label>
            </div>

        </div>
        <div className="flex flex-col items-start mt-5 justify-center items-center">
          <button onClick={onNextPress}>Next</button>
          <button onClick={onPlayPress}>{isPlaying ? "Pause" : "Play"}</button>
          <button onClick={onRandomizePress}>Randomize Board</button>
        </div>
      </div>
      
      <div className="board">
        <Board grid={grid} onClick={onTileClick} gameSettings={gameSettings} />
      </div>
      
    </div>

  </div>

  )
}

export default GameOfLifeView
