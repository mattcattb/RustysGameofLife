import { FaPlay, FaPause, FaStepForward, FaRandom, FaEraser } from "react-icons/fa"; // Importing icons

import CustomButton from '../ui/Button'
import CustomSlider from '../ui/Slider'

import {GameWasm} from 'GOL-core-rust'
import { useGame } from '../../contexts/GameContext';

export default function GameControls() {
  const {game, setGrid, isPlaying, setIsPlaying, GOLSettings, setGame, setGOLSettings} = useGame();


  const onStepPress = () => {
    // do game next state!
    
    if (!game) return;

    game.next_turn();
    const newGrid = game.get_grid();
    setGrid(newGrid);
  }

  const onWipePress = () => {
    // turn all tiles to dead
    if (!game) return;
    game.wipe_board();
    setGrid(game.get_grid());
  }

  const onRandomizePress = () => {
    setIsPlaying(false);
    const { tileOptions, width, height } = GOLSettings;
    const newGame = GameWasm.new_random_game(height, width, tileOptions);
    setGame(newGame);
    setGrid(newGame.get_grid());
  }

  const onPlayPress = () => {
    setIsPlaying(!isPlaying)
  }

  const onSpeedChange = (value:number) => {
    // TODO make it so that when increases, becomes faster!
    setGOLSettings({
      ...GOLSettings,
      speedMS: value
    });
  };  


  return (
    <div>
      <div className = "flex flex-row justify-center items-center space-x-4 mt-5">
        <CustomButton icon={isPlaying ? <FaPause/> : <FaPlay/>} label='' onClick={onPlayPress} color="primary"/>
        <CustomButton icon={<FaRandom/>} label='' onClick={onRandomizePress} color="primary"/>
        <CustomButton icon={<FaEraser/>} label='' onClick={onWipePress} color="primary"/>
        <CustomButton icon={<FaStepForward/>} label='' onClick={onStepPress} color="primary"/>
      </div>
      <CustomSlider
        value={GOLSettings.speedMS}
        onChange={onSpeedChange}
        label="Speed (ms)"
        min={50}
        max={2000}
        step={50}
      />
    </div>

  )
}