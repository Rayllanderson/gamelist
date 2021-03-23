import {useEffect, useState } from "react";
import { Game } from "../../contexts/GameContext";
import ApiGame from "../../services/apiGame";
import { TableItem } from "./TableItem";

export function Table() {
 
  const [games, setGames] = useState<Game[]>([])
  useEffect(() => {
    const api = new ApiGame();
    api.findAll()
      .then(response => {
        setGames(response.data)
      }).catch(err => console.log(err))
  }, [])


  return (
    <table className='table table-hover table-borderless'>
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Status</th>
          <th scope="col" className="text-center">Editar</th>
          <th scope="col" className="text-center">Excluir</th>
        </tr>
      </thead>
      <tbody>
        {games.map(game => (
          <TableItem game={game} key={game.id} />
        ))}
      </tbody>
    </table>
  );
}