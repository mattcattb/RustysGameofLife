import React from 'react';

import { useGame } from '../../contexts/GameContext';

import PaletteBlock  from './PaletteBlock';
import { getCellColor } from '../../api/board.api';

export default function BlockPalette() {
  const {tilePaletteSelected, setTilePaletteSelected, GOLSettings} = useGame();

  const onPaletClick = (id:number) => {
    setTilePaletteSelected(GOLSettings.tileOptions[id]);
  }

  return (
    <div className='flex flex-row'>
      {GOLSettings.tileOptions.split('').map((c:string, id:number) => (
        <PaletteBlock onClick={() => onPaletClick(id)} color={getCellColor(GOLSettings, c)} outline={tilePaletteSelected === c}/>
      ))}
    </div>
  )
}