import { useCallback, useContext, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";
import { MyModal as Modal } from "../Modal/Modal";
import EditModal from "./modal/Index";
import { ButtonGroup, Container, GameContent, GameInfo, Header } from "./style";
interface RouteParams {
  id: string
}

function GameDetails() {
  const params = useParams<RouteParams>();
  const { edit, handleSubmit, selectedGame, loadGame } = useContext(GameContext);
  const id = params.id;

  const fomartDate = useCallback((data: string) => {
    const date = new Date(data)
    return data && ((date.getUTCDate())) + "/" + ((date.getUTCMonth() + 1)) + "/" + date.getUTCFullYear();
  }, [])

  useEffect(() => {
    loadGame(id);
  }, [id, loadGame])

  return (
    <GameContent className="container">
      <Header>
        <div>&nbsp;</div>
        <Link to="/games">
          <FiChevronLeft size={17} />Voltar
        </Link>
      </Header>
      <Container>
        <GameInfo>
          <header>
            <img src="/game-controler.svg" alt="logo" />
            <div>
              <strong>{selectedGame.name}</strong>
            </div>
          </header>
          <ul>
            <li>
              <span>Status</span>
              <strong>{selectedGame.status}</strong>
            </li>
            <li>
              <span>Iniciado em </span>
              <strong>{fomartDate(selectedGame.startDate)}</strong>
            </li>
            <li>
              <span>Finalizado em</span>
              <strong>{fomartDate(selectedGame.endDate)}</strong>
            </li>
          </ul>
        </GameInfo>
        <ButtonGroup >
          <button className="btn btn-purple btn-lg" onClick={() => edit(selectedGame)}>Editar</button>
          <button className="btn btn-red btn-lg">Deletar</button>
        </ButtonGroup>
      </Container>


      <Modal
        title="Editar Jogo"
        submitEvent={handleSubmit}
        successBtnText="Salvar">
        <EditModal />
      </Modal>

    </GameContent>
  );
};

export default GameDetails;