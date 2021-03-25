import { useCallback, useContext, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";
import { ModalContext } from "../../contexts/ModalContext";
import { MyModal as Modal } from "../Modal/Modal";
import { DeleteModal } from "./modal/DeleteModal";
import EditModal from "./modal/EditModal";
import { ButtonGroup, Container, GameContent, GameInfo, Header } from "./style";
interface RouteParams {
  id: string
}

function GameDetails() {
  const params = useParams<RouteParams>();
  const { edit, handleSubmit, selectedGame, loadGame, remove, handleDeleteSubmit } = useContext(GameContext);
  const { show, closeModal, showDelete, closeDeleteModal } = useContext(ModalContext)
  const id = params.id;

  const fomartDate = useCallback((data: string) => {
    const date = new Date(data)
    return data && ((date.getUTCDate())) + "/" + ((date.getUTCMonth() + 1)) + "/" + date.getUTCFullYear();
  }, [])

  useEffect(() => {
    loadGame(id);
    document.title = `Game List - ${selectedGame.name}`
  }, [id, loadGame, selectedGame.name])

  return (
    <div>
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
          <button className="btn btn-red btn-lg" onClick={() => remove(selectedGame.id)}>Deletar</button>
        </ButtonGroup>
      </Container>


      <Modal
        show={show} closeModal={closeModal}
        title="Editar Jogo"
        submitEvent={handleSubmit}
        successBtnText="Salvar">
        <EditModal />
      </Modal>
      <Modal
        title="Remover Jogo" show={showDelete} closeModal={closeDeleteModal}
        submitEvent={(e) => handleDeleteSubmit(selectedGame.id, e)}
        successBtnText="Deletar">
        <DeleteModal selectedGame={selectedGame}/>
      </Modal>
    </GameContent>
    </div>
  );
};

export default GameDetails;