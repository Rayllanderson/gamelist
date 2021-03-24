import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Game } from "../../contexts/GameContext";
import ApiGame from "../../services/apiGame";
import { Container } from "./style";
interface RouteParams {
  id: string
}

function GameDetails() {
  const params = useParams<RouteParams>();
  const [selectedGame, setSelectedGame] = useState<Game>({} as Game)
  const id = params.id;
  const fomartDate = useCallback((data: string) => {
    const date = new Date(data)
    return data && ((date.getDate())) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear();
  }, [])
  useEffect(() => {
    new ApiGame().findById(id)
      .then(response => setSelectedGame(response.data))
      .catch(err => console.log(err));
  }, [id])
  return (
    <Container className="container">
      <div className="data">
        <h3>{selectedGame.name} </h3>
        <p>Status atual: <span>{selectedGame.status}</span></p>
        <p>Iniciado em : {fomartDate(selectedGame.startDate)}</p>
        <p>Finalizado em: {fomartDate(selectedGame.endDate)} </p>
      </div>
    </Container>
  );
};
/*
class GameDetails extends React.Component<RouteParams> {
  render() {
    console.log(this.props); // Prints all props including routing-related
    console.log(this.props.match.params.id); // Prints 'abc'
    return <div></div>
  }
}
*/

export default GameDetails;