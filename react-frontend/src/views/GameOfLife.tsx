import { useState, useEffect } from 'react'
import { FaPlay, FaPause, FaStepForward, FaRandom } from "react-icons/fa"; // Importing icons

import '../styles/App.css'
import Board from '../components/Board';
import {SettingsEditor} from '../components/SettingsEditor';

import init, {GameWasm} from 'GOL-core-rust'

import { CharGrid, GameOfLifeSettings } from '../types';

function GameOfLifeView() {

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [game, setGame] = useState<GameWasm>();
  const [grid, setGrid] = useState<CharGrid>([]);
  const [gameSettings, setGameSettings] = useState<GameOfLifeSettings>({
    width:10,
    height:10,
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
            await init();
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

  useEffect(()=> {
    if (!game) return;
    // edit the dimension
    game.edit_dimensions(gameSettings.height, gameSettings.width);
    setGrid(game.get_grid());

  }, [gameSettings.height, gameSettings.width]);


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
    // turn all tiles to dead
    if (!game) return;
    game.wipe_board();
    setGrid(game.get_grid());
  }

  const onPlayPress = () => {
    setIsPlaying(!isPlaying);
  }

  return (
  <div className="Game-Of-Life-View">
    <div className='mb-5'>
      <h1>Game Of Life</h1>
    </div>
    <div className="flex flex-row justify-evenly ">
      <div className='flex flex-col justify-start items-start items-center m-5'>
        <div className="flex flex-col justify-center space-x-4">
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

        <div className="flex flex-row justify-center items-center space-x-4 mt-5">
          <button className='px-4 py-2 bg-{color} text-white rounded' onClick={onNextPress}><FaStepForward/></button>
          <button className='px-4 py-2 bg-{color} text-white rounded' onClick={onPlayPress}>{isPlaying ? <FaPause/> : <FaPlay/>}</button>
          <button className='px-4 py-2 bg-{color} text-white rounded' onClick={onRandomizePress}>{<FaRandom/>}</button>
          <button className='px-4 py-2 bg-{color} text-white rounded' onClick ={onWipePress}>Wipe Board</button>
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
