import { useContext, useEffect } from "react"
import { GameContext } from "../../../contexts/GameContext"
import GameApi from "../../../services/game-api";
import CardItem from './CardItem';

interface Props{
  status:string;
}

export default function CardList({ status}: Props) {
  const { games, setGames } = useContext(GameContext)
  
  useEffect(() => {
    const url = status === undefined ? 'games' : 'games/status/' + status
    new GameApi().get(url)
      .then(response => {
        setGames(response.data)
      }).catch(err => console.log(err))
  }, [setGames, status])

  return (
    <div style={{animation: 'appearFromBottom 1s'}}>
      {
        games.map(game =>
          <CardItem game={game} key={game.id} />
        )
      }
    </div>
  )
}