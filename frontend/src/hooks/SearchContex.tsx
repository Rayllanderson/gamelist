
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import GameController from '../services/game-api';
import { GameContext } from './GameContext';
import { ToastContext } from './ToastContext';

interface SearchProviderProps {
  children: ReactNode;
}

interface SearchContextData {
  handleChange: (e: any) => void,
  handleSubmit: (e: any) => void,
  search: string;
}

export const SearchContext = createContext<SearchContextData>({} as SearchContextData);

export function SearchProvider({ children }: SearchProviderProps) {
  const [search, setSearch] = useState('');
  const [canSearch, setCanSearch] = useState(false);
  const { setGames } = useContext(GameContext);
  const { addToast } = useContext(ToastContext);

  function handleChange(e: any) {
    const text = e.target.value;
    setSearch(text);
    text.length > 0 && setCanSearch(true);
  }

  const handleEmptyData = useCallback((data: any[], search: string) => {
    data.length === 0 &&
      addToast({
        type: 'info',
        title: 'Nenhum resultado',
        description: 'Não existe nenhum jogo com "' + search + '" na sua lista de jogos.'
      })
  }, [addToast])

  function handleSubmit(e: any) {
    e.preventDefault(); 
    canSearch &&
      new GameController().findByName(search)
        .then(response => {
          setGames(response.data);
          handleEmptyData(response.data, search)
          setCanSearch(true);
          (search.length === 0 && canSearch) && setCanSearch(false);
        })
        .catch(err => console.log(err))
  }

  return (
    <SearchContext.Provider value={{
      handleChange, handleSubmit, search
    }}>
      {children}
    </SearchContext.Provider>
  )
}

