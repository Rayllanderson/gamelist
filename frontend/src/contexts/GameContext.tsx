import { createContext, ReactNode, useContext, useState } from 'react';
import ApiGame from '../services/apiGame';
import { ModalContext } from './ModalContext';
import { ToastContext } from './ToastContext';

interface GameProviderProps {
  children: ReactNode;
}
interface GameContextData {
  name: string;
  status: GameStatus;
  action: string;
  handleNameChange(e: any): void;
  handleSelectChange(e: any): void;
  handleSubmit(e: any): void;
  onSelectGame: (game: Game) => void;
  selectedGame: Game;
  edit(game: Game): void;
  save(): void;
  updateTable(): void;
  games: Game[];
  setGames(games:Game[]):void;
  handleStartDateChange(e: any): void;
  handleEndDateChange(e: any): void;
  endDate: string
  startDate:string;
}
export interface Game {
  id: number;
  name: string;
  status: GameStatus;
  startDate: string;
  endDate: string;
}

export enum GameStatus{
  WISH,
  PLAYING,
  COMPLETED,
}

export const GameContext = createContext<GameContextData>({} as GameContextData);

export function GameProvider({ children }: GameProviderProps) {
  const api = new ApiGame();
  const [games, setGames] = useState<Game[]>([])
  const [selectedGame, setSelectedGame] = useState<Game>({} as Game);
  const [action, setAction] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<GameStatus>(GameStatus.WISH);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { addToast } = useContext(ToastContext);
  const { closeModal, showModal } = useContext(ModalContext)

  function updateTable() {
    api.findAll()
      .then(response => {
        setGames(response.data)
      }).catch(err => console.log(err))
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
    setStatus(GameStatus.WISH)
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const data: Omit<Game, 'id'> = {
      name: name,
      status: status,
      startDate: startDate,
      endDate: endDate
    }
    if (action === 'post') {
      api.post(data).then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: "Jogo adicionado com sucesso!",
        });
        closeModal();
        updateTable();
      }
      ).catch(err => {
        console.log(err.response)
        console.log(err.message)
        console.log(err.response.message)
        addToast({
          type: 'error',
          title: 'Erro',
          description: JSON.stringify(err.response.data.message),
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
        updateTable();
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

  function onSelectGame(game: Game) {
    setSelectedGame(game);
  }
  function handleNameChange(e: any) {
    setName(e.target.value);
  }
  function handleSelectChange(e: any) {
    setEndDate('');
    setStartDate('');
    setStatus(e.target.value)
  }
  function handleStartDateChange(e:any){
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
      action,
      onSelectGame,
      selectedGame,
      edit, save,
      updateTable, games, setGames,
      handleStartDateChange, handleEndDateChange,
      endDate, startDate
    }} >
      {children}
    </GameContext.Provider>
  )
}

