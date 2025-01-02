
import Cell from "./Cell"

import { CharGrid, GameOfLifeSettings } from '../types'
import { getCellColor } from '../api/board.api';
import { useRef, useEffect, useState } from "react"

type Props = {
    grid: CharGrid;
    gameSettings: GameOfLifeSettings
    onClick: (r:number, c:number) => void;
}

export default function Board(props: Props) {

  if (!props.grid || props.grid.length === 0) {
    return <div>Loading...</div>;  // Show loading while grid is being populated
  }
  const boardRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState<number>(40); // Default cell size

  useEffect(() => {
    // Resize cells based on the container size
    const handleResize = () => {
      if (!boardRef.current) return;

      const containerWidth = boardRef.current.offsetWidth;
      const containerHeight = boardRef.current.offsetHeight;

      // Calculate the max cell size that fits the grid within the container
      const maxCellWidth = containerWidth / props.grid[0].length;
      const maxCellHeight = containerHeight / props.grid.length;

      // Use the smaller of the two to ensure cells remain square
      const newCellSize = Math.min(maxCellWidth, maxCellHeight);
      setCellSize(newCellSize);
    };
    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize); // Recalculate on window resize

    return () => window.removeEventListener("resize", handleResize);
  }, [props.grid]);


  return (
    <div 
      ref={boardRef}
      className="board"
      style={
        {
          display: 'grid',
          gridTemplateColumns: `repeat(${props.grid[0].length}, ${cellSize}px)`,
          gap:"1px",
          width:"100%",
          height:"100%",
        }
      }
  >
      {props.grid.map((row, rowIndex) => (
        row.map((value, colIndex) => (
          <Cell 
            key={`${rowIndex}-${colIndex}`} 
            onClick={()=>props.onClick(rowIndex, colIndex)} 
            color={getCellColor(props.gameSettings, value)}
            size={cellSize}
          />
        )
      )))}
    </div>
  )
}