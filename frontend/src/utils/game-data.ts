import { Game, GameStatus } from "../hooks/GameContext";

export function getQuantityOf(status: GameStatus, games: Game[]){
  return games.filter((game) => game.status === status).length;
}