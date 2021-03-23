import {useContext, useEffect, useState } from "react";
import { Game, GameContext } from "../../contexts/GameContext";
import ApiGame from "../../services/apiGame";
import { TableItem } from "./TableItem";

export function Table() {
  const { games} = useContext(GameContext)
 
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