import { Game, GameStatus } from "../contexts/GameContext";

const formatDate = (data: string) => {
  const date = new Date(data)
  return data && ((date.getUTCDate())) + "/" + ((date.getUTCMonth() + 1)) + "/" + date.getUTCFullYear();
}


export function formartStartDate(game: Game) {
  if (game.status) {
    const gameHasntStarted = game.status.valueOf() === GameStatus.WISH.valueOf();
    return game.startDate ? formatDate(game.startDate) : (
      !!gameHasntStarted ? 'Não iniciado' : 'Desconhecido'
    );
  }
}

export function formartEndDate(game: Game) {
  if (game.status) {
    if (!game.endDate) {
      switch (game.status) {
        case GameStatus.WISH: return 'Não iniciado';
        case GameStatus.PLAYING: return 'Não finalizado';
        case GameStatus.COMPLETED: return 'Desconhecido'
      }
    }
  }
  return formatDate(game.endDate);
}