
import { createContext, ReactNode, useContext, useState } from 'react';
import ApiGame from '../services/apiGame';
import { GameContext } from './GameContext';

interface SearchProviderProps {
  children: ReactNode;
}

interface SearchContextData {
  handleChange:(e: any) => void,
  handleSubmit: (e:any) => void,
  search:string;
}

export const SearchContext = createContext<SearchContextData>({} as SearchContextData);

export function SearchProvider({ children }: SearchProviderProps) {
  const [search, setSearch] = useState('');
  const {setGames} = useContext(GameContext)
 
  function handleChange(e:any){
    setSearch(e.target.value);
  }

  function handleSubmit(e:any){
    e.preventDefault();
    new ApiGame().findByName(search)
    .then(response => setGames(response.data))
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

