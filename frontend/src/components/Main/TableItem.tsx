/* eslint-disable jsx-a11y/anchor-is-valid */

import { useContext } from "react";
import { Game, GameContext } from "../../contexts/GameContext";


interface Props {
  game: Game;
}


export function TableItem({ game }: Props) {
  const { edit } = useContext(GameContext)
  return (
    <tr>
      <td>{game.name}</td>
      <td>{game.status}</td>
      <td className="text-center">
        <a href="#" data-bs-toggle="modal" data-bs-target="#gameModal"
          onClick={() => { edit(game) }}><i className="fas fa-pen"></i></a></td>
      <td className="text-center">
        <a href="#" data-bs-toggle="modal" data-bs-target="#deleteModal"><i className="fas fa-times"></i></a>
      </td>
    </tr>
  )
}