
import React from 'react'

import Cell from "./Cell"

import { CharGrid, GameOfLifeSettings } from '../types'
import { getCellColor } from '../api/board.api';

type Props = {
    grid: CharGrid;
    gameSettings: GameOfLifeSettings
    onClick: (r:number, c:number) => void;
}

export default function Board(props: Props) {



  if (!props.grid || props.grid.length === 0) {
    return <div>Loading...</div>;  // Show loading while grid is being populated
  }


  return (
    <div 
      className="grid"
      style={
        {
          display: 'grid',
          gridTemplateColumns: `repeat(${props.grid[0].length}, 40px)`,
          gap: '10px'
        }
      }
  >
      {props.grid.map((row, rowIndex) => (
        row.map((value, colIndex) => (
          <Cell key={`${rowIndex}-${colIndex}`} cellElement={value} onClick={()=>props.onClick(rowIndex, colIndex)} color={getCellColor(props.gameSettings, value)}/>
        )
      )))}
    </div>
  )
}