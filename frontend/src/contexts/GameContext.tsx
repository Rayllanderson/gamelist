import { createContext, ReactNode, useCallback, useState } from 'react';
import api from '../services/api';

interface GameProviderProps {
  children: ReactNode;
}
interface GameContextData{
}

export const GameContext = createContext<GameContextData> ({} as GameContextData);

export function GameProvider({ children }: GameProviderProps){



  return (
    <GameContext.Provider value={{ }} >
      {children}
    </GameContext.Provider>
  )
}

