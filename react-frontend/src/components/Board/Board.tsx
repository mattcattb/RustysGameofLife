import { useRef, useEffect, useState } from "react";
import Cell from './Cell';
import { useGame } from "../../contexts/GameContext";
import { getCellColor } from '../../api/board.api';

export default function Board() {
  const { grid, setGrid, GOLSettings, game } = useGame();
  const boardRef = useRef<HTMLDivElement>(null);

  const [cellSize] = useState<number>(40); // Fixed cell size

  const onTileClick = (r: number, c: number) => {
    if (!game) return;
    game.interact_tile(r, c);
    const newGrid = game.get_grid();
    setGrid(newGrid);
  };

  if (!grid || grid.length === 0) {
    return <div>Loading...</div>; // Show loading while grid is being populated
  }

  return (
    <div
      ref={boardRef}
      className="grid gap-1 overflow-hidden w-full h-full"
      style={{
        gridTemplateColumns: `repeat(${GOLSettings.gridSizing.width}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${GOLSettings.gridSizing.height}, ${cellSize}px)`,
      }}
    >
      {grid.map((row, rowIndex) => (
        row.map((value, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onTileClick(rowIndex, colIndex)}
            color={getCellColor(GOLSettings, value)}
            size={cellSize}
          />
        ))
      ))}
    </div>
  );
}