import { Game } from "../../hooks/GameContext"

type Props = {
  selectedGame: Game;
}
export function DeleteModal(props: Props) {
  return (
    <p>
      Você tem certeza que deseja excluir o jogo<strong><span> {props.selectedGame.name} </span></strong>?
    </p>
  )
}