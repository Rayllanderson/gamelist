import { useCallback, useEffect, useState } from "react";
import api, { getGames } from "../../services/api";
import { TableItem } from "./TableItem";

export interface Game {
  id: number;
  name: string;
  status: string;
}

export function Table() {

  const [games, setGames] = useState<Game[]>([])
  useEffect(() => {
    getGames().then(response => {
      setGames(response.data)
    }).catch(err => console.log(err))
  }, [])


  return (
    <table className='table table-hover table-borderless'>
      <thead>
        <tr>
          <th scope="col">Nome</th>
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