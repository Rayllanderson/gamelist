import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router'
import GameApi from '../services/game-api';
import { ModalContext } from './ModalContext';
import { ToastContext } from './ToastContext';


interface GameProviderProps {
  children: ReactNode;
}
interface GameContextData {
  name: string;
  status: GameStatus;
  handleNameChange(e: any): void;
  handleSelectChange(e: any): void;
  handleSubmit(e: any): void;
  handleDeleteSubmit(id: string, e: any): void;
  setSelectedGame: (game: Game) => void;
  selectedGame: Game;
  edit(game: Game): void;
  save(): void;
  games: Game[];
  setGames(games: Game[]): void;
  handleStartDateChange(e: any): void;
  handleEndDateChange(e: any): void;
  endDate: string
  startDate: string;
  loadGame(id: string): void;
  remove(id: string): void;
}
export interface Game {
  id: string;
  name: string;
  status: GameStatus;
  startDate: string;
  endDate: string;
}

export enum GameStatus {
  WISH = ("WISH"),
  PLAYING = ("PLAYING"),
  COMPLETED = ("COMPLETED"),
}

export const GameContext = createContext<GameContextData>({} as GameContextData);

export function GameProvider({ children }: GameProviderProps) {

  const [games, setGames] = useState<Game[]>([])
  const [selectedGame, setSelectedGame] = useState<Game>({} as Game);
  const [action, setAction] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<GameStatus>(GameStatus.WISH);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const history = useHistory();
  const { addToast } = useContext(ToastContext);
  const { closeModal, showModal, showDeleteModal, closeDeleteModal } = useContext(ModalContext)

  const loadGame = useCallback(async (id: string) => {
    await new GameApi().findById(id)
      .then(response => setSelectedGame(response.data))
      .catch(err => console.log(err));
  }, []);

  const loadGames = useCallback(async () => {
    await new GameApi().findAll()
      .then(response => {
        setGames(response.data)
      }).catch(err => console.log(err))
  }, [])

  function edit(game: Game) {
    showModal()
    setAction('put');
    setSelectedGame(game)
    setName(game.name)
    setStatus(game.status)
    setStartDate(game.startDate)
    setEndDate(game.endDate)
  }
  function save() {
    showModal();
    setAction('post');
    setName('')
    setStatus(GameStatus.WISH)
  }

  function remove(id: string) {
    showDeleteModal();
  }

  const handleDeleteSubmit = useCallback(async (id: string, e: any) => {
    e.preventDefault();
    const api = new GameApi();
    await api.delete(id).then(() => {
      closeDeleteModal();
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: "Jogo removido com sucesso!",
      });
      history.push('/games')
    }).catch((err) => {
      addToast({
        type: 'error',
        title: 'Erro',
        description: err.response.data.message,
      })
    })
  }, [addToast, closeDeleteModal, history])

  const handleSubmit = useCallback(async (e: any) => {
    e.preventDefault();
    const api = new GameApi();
    const data: Omit<Game, 'id'> = {
      name: name,
      status: status,
      startDate: startDate,
      endDate: endDate
    }
    if (action === 'post') {
      await api.post(data).then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: "Jogo adicionado com sucesso!",
        });
        closeModal();
        loadGames();
      }
      ).catch(err => {
        addToast({
          type: 'error',
          title: 'Erro',
          description: err.response.data.message,
        })
      })
    } else {
      await api.put(selectedGame.id, data).then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: "Jogo editado com sucesso!",
        })
        closeModal();
        loadGame(selectedGame.id);
      }).catch(err => {
        addToast({
          type: 'error',
          title: 'Erro',
          description: err.response.data.message,
        })
      })
    }
  }, [action, addToast, closeModal, endDate, loadGame, loadGames, name, selectedGame.id, startDate, status])

  function handleNameChange(e: any) {
    setName(e.target.value);
  }
  function handleSelectChange(e: any) {
    if (action === 'post') {
      setEndDate('');
      setStartDate('');
    }
    setStatus(e.target.value)
  }
  function handleStartDateChange(e: any) {
    setStartDate(e.target.value);
  }
  function handleEndDateChange(e: any) {
    setEndDate(e.target.value);
  }

  return (
    <GameContext.Provider value={{
      name,
      status,
      handleNameChange,
      handleSelectChange,
      handleSubmit,
      setSelectedGame,
      selectedGame,
      edit, save,
      games, setGames,
      handleStartDateChange, handleEndDateChange,
      endDate, startDate, loadGame, remove, handleDeleteSubmit
    }} >
      {children}
    </GameContext.Provider>
  )
}

