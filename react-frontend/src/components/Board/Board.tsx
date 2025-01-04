import { useRef, useEffect, useState } from "react"

import Cell from './Cell';
import { useGame } from "../../contexts/GameContext";
import { getCellColor } from '../../api/board.api';

export default function Board() {

  const {grid, setGrid, GOLSettings, game} = useGame();

  const boardRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState<number>(40); // Default cell size

  useEffect(() => {
    // Resize cells based on the container size
    const handleResize = () => {
      if (!boardRef.current) return;

      const containerWidth = boardRef.current.offsetWidth;
      const containerHeight = boardRef.current.offsetHeight;

      // Calculate the max cell size that fits the grid within the container
      const maxCellWidth = containerWidth / GOLSettings.width;
      const maxCellHeight = containerHeight / GOLSettings.height;

      // Use the smaller of the two to ensure cells remain square
      const newCellSize = Math.min(maxCellWidth, maxCellHeight);
      setCellSize(newCellSize);
    };
    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize); // Recalculate on window resize

    return () => window.removeEventListener("resize", handleResize);
  }, [GOLSettings.width, GOLSettings.height]);


  const onTileClick = (r: number, c: number) => {
    if (!game) return;
    game.interact_tile(r, c);
    const newGrid = game.get_grid();
    setGrid(newGrid);
  };


  if (!grid || grid.length === 0) {
    return <div>Loading...</div>;  // Show loading while grid is being populated
  }

  return (
    <div 
      ref={boardRef}
      className="board"
      style={
        {
          display: 'grid',
          gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)`,
          gap:"5px",
          width:"100%",
          height:"100%",
        }
      }
  >
      {grid.map((row, rowIndex) => (
        row.map((value, colIndex) => (
          <Cell 
            key={`${rowIndex}-${colIndex}`} 
            onClick={()=>onTileClick(rowIndex, colIndex)} 
            color={getCellColor(GOLSettings, value)}
            size={cellSize}
          />
        )
      )))}
    </div>
  )
}