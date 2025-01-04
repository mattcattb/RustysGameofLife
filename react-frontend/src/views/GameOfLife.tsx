import '../styles/App.css'
import Board from '../components/Board/Board';
import {SettingsEditor} from '../components/Settings/SettingsEditor';
import GameControls from '../components/Controls/GameControls';


function GameOfLifeView() {

  return (
  <div className="Game-Of-Life-View">
    <div className='mb-5'>
      <h1>Game Of Life</h1>
    </div>
    <div className="flex flex-row justify-evenly ">
      <div className='flex flex-col justify-start items-start items-center m-5'>
        <SettingsEditor/>
        <GameControls/>
      
      </div>
      
      <div className="board">
        <Board />
      </div>
      
    </div>

  </div>

  )
}

export default GameOfLifeView
