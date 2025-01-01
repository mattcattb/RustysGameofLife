
import React from 'react'
import { GameOfLifeSettings } from '../types'
import { useState } from 'react'

type Props = {
  gameOfLifeSettings:GameOfLifeSettings;
  setGameOfLifeSettings: (x:GameOfLifeSettings) => void;
}

export const SettingsEditor = (props: Props) => {
  // for now, just change the dead color and alive colors

  const colorOptions: string[] = ["white", "red", "black", "blue", "orange", "purple"];
  
  const deadColorSelected = (deadIdx) => {
    console.log("Selected new dead idx ", deadIdx);
    props.setGameOfLifeSettings({
      ...props.gameOfLifeSettings,
      colors: {
        ...props.gameOfLifeSettings.colors, 
        deadColor: colorOptions[deadIdx],
      }
    })
  }

  const aliveColorSelected = (aliveIdx) => {
    console.log("Selected new alive idx ", aliveIdx);

    props.setGameOfLifeSettings({
      ...props.gameOfLifeSettings,
      colors: {
        ...props.gameOfLifeSettings.colors, 
        aliveColor: colorOptions[aliveIdx],
      }
    })

  }

  return (
    <div>
      <h3>Game Editor</h3>
      <div className='color selector'>
        <ColorDropdown name={"alive color"} dropdownOptions={colorOptions} onSelect={aliveColorSelected} />
        <ColorDropdown name={"dead color"} dropdownOptions={colorOptions} onSelect={deadColorSelected}/>
      </div>
    </div>
  )
}

type PropsDropdown = {
  dropdownOptions:string[];
  name:string
  onSelect:(idx:number) => void;
}

const ColorDropdown = (props:PropsDropdown) => {
  const [open, setOpen] = useState(false);
  const [idxSelected, setIdxSelected] = useState(0); // choose which of the color dropdown to select!

  const handleOpen = () => {
    setOpen(!open);
  }

  const handleClick = (idxClicked:number) => {
    setIdxSelected(idxClicked);
    setOpen(!open);
    props.onSelect(idxClicked);
  }

  return (
    <div>
      <button onClick={handleOpen}>{props.name}: {props.dropdownOptions[idxSelected]}</button>
      {open ? (
        <ul className='menu'>
          {props.dropdownOptions.map((option:string, idx:number) => (
            <DropdownMenuItem val={option} onClick={() => handleClick(idx)}/>
          ))}
        </ul>
      ) : (
        null
      )}
    </div>
  )
}

type PropsItem = {
  val:string;
  onClick: () => void;
}

const DropdownMenuItem = (props:PropsItem) => {
  return (
    <li key={props.val} className='menu-item'>
      <button onClick={props.onClick}>{props.val}</button>
    </li>
  )
}
