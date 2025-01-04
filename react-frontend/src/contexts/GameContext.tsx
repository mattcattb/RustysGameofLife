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
    width: 10,
    height: 10,
    tileOptions: "x0",
    colors: {
      deadColor: "black",
      aliveColor: "white"
    },
    speedMS: 1000,
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const initWasm = async () => {
      try {
        await init();
        const { tileOptions, width, height } = GOLSettings;
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
    game.edit_dimensions(GOLSettings.height, GOLSettings.width);
    setGrid(game.get_grid());
  }, [GOLSettings.height, GOLSettings.width]);

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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
