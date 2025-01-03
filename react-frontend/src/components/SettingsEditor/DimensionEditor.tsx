import React from 'react'
import { GameOfLifeSettings } from '../../types';

type Props = {
  gameSettings: GameOfLifeSettings
  setGameSettings: (x:GameOfLifeSettings) => void;

};

export const DimensionEditor = (props: Props) => {
  
  const onHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setGameSettings({
      ...props.gameSettings,
      height:Number(event.target.value),
    });
  }

  const onWidthHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setGameSettings({
      ...props.gameSettings,
      width:Number(event.target.value),
    });
  }
  
  return (
    <div>
      <label className='changeHeight'>
        Height: {''}
        <input
          type="number"
          value={props.gameSettings.height}
          onChange={onHeightChange}
          min="4"
          max="40"
          step="2"
        ></input>
      </label>

      <label className='changeWidth'>
        Width: {''}
        <input
          type="number"
          value={props.gameSettings.width}
          onChange={onWidthHeight}
          min="4"
          max="40"
          step="2"
        ></input>
      </label>

    </div>
  )
}