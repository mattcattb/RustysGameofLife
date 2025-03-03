import React, { createContext, useContext, useState, useEffect } from 'react';
import init, { GameWasm } from 'GOL-core-rust';
import { CharGrid, GameOfLifeSettings } from '../types';

interface GameContextType {
  game: GameWasm | undefined;
  setGame: (game:GameWasm | undefined) => void

  grid: CharGrid;
  setGrid: React.Dispatch<React.SetStateAction<CharGrid>>;

  GOLSettings: GameOfLifeSettings;
  setGOLSettings: React.Dispatch<React.SetStateAction<GameOfLifeSettings>>;

  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;

  tilePaletteSelected: string | null;
  setTilePaletteSelected: (tilePalette:string|null) => void;
  
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [game, setGame] = useState<GameWasm | undefined>(undefined);
  const [grid, setGrid] = useState<CharGrid>([]);
  const [GOLSettings, setGOLSettings] = useState<GameOfLifeSettings>({
    gridSizing:{
      width:10,
      maxWidth:30,
      height: 10,
      maxHeight:30
      
    },
    tileOptions: "x0",
    colors: {
      deadColor: "black",
      aliveColor: "white"
    },
    speedMS: 1000,
  });

  const [tilePaletteSelected, setTilePaletteSelected] = useState<string|null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const initWasm = async () => {
      try {
        await init();
        const { tileOptions, gridSizing } = GOLSettings;
        const {height, width} = gridSizing;
        const newGame = GameWasm.new_random_game(height, width, tileOptions);
        setGame(newGame);
        setGrid(newGame.get_grid());
      } catch (error) {
        console.error('Error occurred: ', error);
      }
    };
    initWasm();
  }, [GOLSettings]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (game){
          game.next_turn();
          const newGrid = game.get_grid();
          setGrid(newGrid);
        }
      }, GOLSettings.speedMS);
      return () => clearInterval(interval);
    }
  }, [isPlaying, GOLSettings.speedMS]);

  useEffect(() => {
    if (!game) return;
    game.edit_dimensions(GOLSettings.gridSizing.height, GOLSettings.gridSizing.width);
    setGrid(game.get_grid());
  }, [GOLSettings.gridSizing.height, GOLSettings.gridSizing.width]);

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,

        grid,
        setGrid,

        GOLSettings,
        setGOLSettings,

        isPlaying,
        setIsPlaying,

        tilePaletteSelected,
        setTilePaletteSelected
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
