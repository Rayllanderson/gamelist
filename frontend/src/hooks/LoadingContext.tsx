
import { createContext, ReactNode, useState } from 'react';

interface LoadingProviderProps {
  children: ReactNode;
}

interface LoadingContextData {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void,
  btnIsLoading: boolean;
  setBtnIsLoading: (value: boolean) => void

}

export const LoadingContext = createContext<LoadingContextData>({} as LoadingContextData);

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [btnIsLoading, setBtnIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{
      isLoading, btnIsLoading, setBtnIsLoading, setIsLoading
    }}>
      {children}
    </LoadingContext.Provider>
  )
}

