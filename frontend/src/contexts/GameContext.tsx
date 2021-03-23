import { createContext, ReactNode, useContext, useState } from 'react';
import ApiGame from '../services/apiGame';
import { ModalContext } from './ModalContext';
import { ToastContext } from './ToastContext';

interface GameProviderProps {
  children: ReactNode;
}
interface GameContextData {
  name: string;
  status: string;
  action: string;
  setMethod(action: string): void;
  handleNameChange(e: any): void;
  handleSelectChange(e: any): void;
  handleSubmit(e: any): void;
  onSelectGame: (game: Game) => void;
  selectedGame: Game;
  edit(game: Game): void;
  save(): void;
}
export interface Game {
  id: number;
  name: string;
  status: string;
}

export const GameContext = createContext<GameContextData>({} as GameContextData);

export function GameProvider({ children }: GameProviderProps) {
  const api = new ApiGame();
  const [selectedGame, setSelectedGame] = useState<Game>({} as Game);
  const [action, setAction] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const { addToast } = useContext(ToastContext);
  const { closeModal, showModal} = useContext(ModalContext)
  //const [isLoading, setLoading] = useState(false);
 

  function onSelectGame(game: Game) {
    setSelectedGame(game);
  }
  function handleNameChange(e: any) {
    setName(e.target.value);
  }
  function handleSelectChange(e: any) {
    setStatus(e.target.value)
  }
  function setMethod(action: string) {

  }
  function edit(game: Game) {
    showModal()
    setAction('put');
    setSelectedGame(game)
    setName(game.name)
    setStatus(game.status)
  }
  function save() {
    showModal();
    setAction('post');
    setName('')
    setStatus('')
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const data = {
      name: name,
      status: status
    }
    if (action === 'post') {
      api.post(data).then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: "Jogo adicionado com sucesso!",
        });
        closeModal();
      }
      ).catch(err => {
        console.log(err.response)
        addToast({
          type: 'error',
          title: 'Erro',
          description: err.message,
        })
      })
    } else {
      api.put(selectedGame.id, data).then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: "Jogo editado com sucesso!",
        })
        closeModal();
      }).catch(err => {
        console.log(err.re)
        addToast({
          type: 'error',
          title: 'Erro',
          description: err.message,
        })
      })
    }
  }

  return (
    <GameContext.Provider value={{
      name,
      status,
      setMethod,
      handleNameChange,
      handleSelectChange,
      handleSubmit,
      action,
      onSelectGame,
      selectedGame,
      edit, save
    }} >
      {children}
    </GameContext.Provider>
  )
}

