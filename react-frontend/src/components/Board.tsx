
import React from 'react'

import Cell from "./Cell"

import { CharGrid } from '../types'

type Props = {
    grid: CharGrid;
    onClick: (r:number, c:number) => void;
}

export default function Board(props: Props) {
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
                <Cell key={`${rowIndex}-${colIndex}`} cellElement={value} onClick={()=>props.onClick(rowIndex, colIndex)}/>
            )
        )))}
    </div>
  )
}