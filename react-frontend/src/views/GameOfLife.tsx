
import { useState } from 'react';

import '../styles/App.css'
import Board from '../components/Board/Board';
import {SettingsEditor} from '../components/Settings/SettingsEditor';
import GameControls from '../components/Controls/GameControls';


function GameOfLifeView() {

  const [settingsOpen, setSettingsOpen] = useState(true);

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <div className="Game-Of-Life-View flex flex-col items-center p-5">
      {/* Settings Section */}
      <div className="w-full mb-5">
        <button
          onClick={toggleSettings}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {settingsOpen ? 'Hide Settings' : 'Show Settings'}
        </button>
        {settingsOpen && (
          <div className="mt-4 border border-gray-300 p-4 rounded-md bg-gray-50">
            <SettingsEditor />
          </div>
        )}
      </div>

      {/* Board Section */}
      <div className="w-full mb-5">
        <div className="board">
          <Board />
        </div>
      </div>

      {/* Controls Section */}
      <div className="w-full">
        <GameControls />
      </div>
    </div>
  );
}

export default GameOfLifeView
