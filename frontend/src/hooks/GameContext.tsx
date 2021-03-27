import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router'
import GameController from '../services/game-api';
import { getFirstError } from '../utils/fomart-error';
import { AlertContext } from './AlertContext';
import { LoadingContext } from './LoadingContext';
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
  endDate: string;
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
  WISH = ("Em espera"),
  PLAYING = ("Jogando"),
  COMPLETED = ("Completo"),
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
  const { showAlert } = useContext(AlertContext);
  const { setIsLoading, setBtnIsLoading } = useContext(LoadingContext)
  const { closeFirstModal: closeModal, showFirstModal: showModal, showSeccondModal: showDeleteModal, closeSeccondModal: closeDeleteModal } = useContext(ModalContext)
 
  const loadGame = useCallback(async (id: string) => {
    setIsLoading(true)
    await new GameController().findById(id)
      .then(response => {
        setSelectedGame(response.data);
      }).catch(err => console.log(err));
    setIsLoading(false)
  }, [setIsLoading]);

  const loadGames = useCallback(async () => {
    setIsLoading(true);
    await new GameController().findAll()
      .then(response => {
        setGames(response.data)
      }).catch(err => {
        console.log(err)
      })
    setIsLoading(false)
  }, [setIsLoading])

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
    setStartDate('')
    setEndDate('')
    setStatus(GameStatus.WISH)
  }

  function remove() {
    showDeleteModal();
  }

  const handleDeleteSubmit = useCallback(async (id: string, e: any) => {
    e.preventDefault();
    const api = new GameController();
    setBtnIsLoading(true);
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
    setBtnIsLoading(false);
  }, [addToast, closeDeleteModal, history, setBtnIsLoading])

  const handleSubmit = useCallback(async (e: any) => {
    e.preventDefault();
    const api = new GameController();
    const data: Omit<Game, 'id'> = {
      name: name,
      status: status,
      startDate: startDate,
      endDate: endDate
    }
    if (action === 'post') {
      setBtnIsLoading(true);
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
        showAlert(getFirstError(err.response.data.message));
      })
      setBtnIsLoading(false);
    } else {
      setBtnIsLoading(true);
      await api.put(selectedGame.id, data).then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: "Jogo editado com sucesso!",
        })
        closeModal();
        loadGame(selectedGame.id);
      }).catch(err => {
        showAlert(getFirstError(err.response.data.message));
      })
      setBtnIsLoading(false);
    }
  }, [action, addToast, closeModal, endDate, loadGame, loadGames, name, selectedGame.id, setBtnIsLoading, showAlert, startDate, status])

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
      endDate, startDate, loadGame, remove, handleDeleteSubmit,
    }} >
      {children}
    </GameContext.Provider>
  )
}

