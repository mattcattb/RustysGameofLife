
import React from 'react'
import { GameOfLifeSettings } from '../types'

import { DimensionEditor } from './SettingsEditor/DimensionEditor'
import { ColorDropdown } from './SettingsEditor/ColorDropdown'

type Props = {
  gameOfLifeSettings:GameOfLifeSettings;
  setGameOfLifeSettings: (x:GameOfLifeSettings) => void;
}

export const SettingsEditor = (props: Props) => {
  // for now, just change the dead color and alive colors

  const colorOptions: string[] = ["white", "red", "black", "blue", "orange", "purple"];
  
  const deadColorSelected = (deadIdx:number) => {
    console.log("Selected new dead idx ", deadIdx);
    props.setGameOfLifeSettings({
      ...props.gameOfLifeSettings,
      colors: {
        ...props.gameOfLifeSettings.colors, 
        deadColor: colorOptions[deadIdx],
      }
    })
  }

  const aliveColorSelected = (aliveIdx:number) => {
    console.log("Selected new alive idx ", aliveIdx);

    props.setGameOfLifeSettings({
      ...props.gameOfLifeSettings,
      colors: {
        ...props.gameOfLifeSettings.colors, 
        aliveColor: colorOptions[aliveIdx],
      }
    })

  }

  //todo allow the changing of size of board!

  return (
    <div>
      <h2 className='m-3'>Game Editor</h2>
      <div className='flex flex-col justify-evenly space-y-5 '>
        <ColorDropdown name={"alive color"} dropdownOptions={colorOptions} onSelect={aliveColorSelected} />
        <ColorDropdown name={"dead color"} dropdownOptions={colorOptions} onSelect={deadColorSelected}/>
      </div>
      <div >
        <DimensionEditor />
        <div className=''></div>
      </div>
    </div>
  )
}

