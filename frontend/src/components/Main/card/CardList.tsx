import { useContext } from "react"
import Card from "."
import { GameContext } from "../../../contexts/GameContext"

export default function CardList() {
  const { games } = useContext(GameContext)
  return (
    <div>
      {
        games.map(game =>
          <Card game={game} key={game.id} />
        )
      }
    </div>
  )
}