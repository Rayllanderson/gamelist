import { useContext, useEffect } from 'react';
import { RadialChart } from 'react-vis';
import { GameContext, GameStatus } from '../../hooks/GameContext';
import GameController from '../../services/game-api';
import { getQuantityOf } from '../../utils/game-data';

export function Chart() {
  const { games, setGames } = useContext(GameContext)

  useEffect(() => {
    new GameController().findAll()
      .then(response => {
        setGames(response.data)
      }).catch(err => {
        console.log(err)
      })
  }, [setGames])

  const gamesCompleted = getQuantityOf(GameStatus.COMPLETED, games);
  const gamesWished = getQuantityOf(GameStatus.WISH, games);
  const gamesPlaying = getQuantityOf(GameStatus.PLAYING, games);
  const myData = [
    { angle: gamesCompleted, label: `Concluídos (${gamesCompleted})` },
    { angle: gamesWished, label: `Em espera (${gamesWished})` },
    { angle: gamesPlaying, label: `Jogando (${gamesPlaying})` }]
  return (
    <RadialChart colorRange={['#ff79c6', '#1ca9c9', '#ffb86c']}
      data={myData}
      width={250}
      height={250}
      showLabels
      animation
    />
  )
}