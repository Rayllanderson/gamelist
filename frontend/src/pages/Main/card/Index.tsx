import { useContext, useEffect } from "react"
import { LoaderCard } from "../../../components/Loaders/Index";
import { GameContext } from "../../../contexts/GameContext"
import { LoadingContext } from "../../../contexts/LoadingContext";
import GameApi from "../../../services/game-api";
import CardItem from './CardItem';

interface Props {
  status: string;
}

export default function CardList({ status }: Props) {
  const { games, setGames } = useContext(GameContext)
  const { isLoading, setIsLoading } = useContext(LoadingContext)
  
  useEffect(() => {
    const url = status === undefined ? 'games' : 'games/status/' + status
    setIsLoading(true);
    async function getGames(url: string) {
      await new GameApi().get(url)
        .then(response => {
          setGames(response.data)
          setIsLoading(false);
        }).catch(err => { console.log(err); setIsLoading(false)});
    }
    getGames(url)
  }, [setGames, setIsLoading, status])

  return (
    <div>
      <div style={{ animation: 'appearFromBottom 1s' }}>
        {isLoading ? <LoaderCard/>
        :
        games.map(game => <CardItem game={game} key={game.id} />)}
      </div>
    </div>
  )
}