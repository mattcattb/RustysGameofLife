import React, { useState } from 'react';
import { 
  Box,
} from '@mui/material';
import { 
  Settings as SettingsIcon,
  Palette as PaletteIcon,
  PlayArrow as PlayIcon
} from '@mui/icons-material';

import Board from '../components/Board/Board';
import { SettingsEditor } from '../components/Settings/SettingsEditor';
import GameControls from '../components/Controls/GameControls';

function GameOfLifeView() {

  return (
    <div className='flex flex-col h-full w-full'>
      <div className='w-full bg-orange-600 flex flex-row justify-center p-4'>
        <GameControls/>
      </div>
      <div className='flex-grow overflow-hidden'>
        <Board />
      </div>
    </div>)
}

export default GameOfLifeView