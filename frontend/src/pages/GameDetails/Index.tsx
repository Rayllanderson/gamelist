import { useCallback, useContext, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { LoaderGame, LoaderGameMobile } from "../../components/Loaders/Index";
import { MyModal as Modal } from "../../components/Modal/Modal";
import { Game, GameContext } from "../../contexts/GameContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import { ModalContext } from "../../contexts/ModalContext";
import { formartEndDate, formartStartDate } from "../../utils/format-data";
import { DeleteModal } from "./DeleteModal";
import EditModal from "./EditModal";
import { ButtonGroup, Container, GameContent, GameInfo, Header } from "./style";
interface RouteParams {
  id: string
}

function GameDetails() {
  const params = useParams<RouteParams>();
  const { edit, handleSubmit, selectedGame, loadGame, remove, handleDeleteSubmit, setSelectedGame } = useContext(GameContext);
  const { show, closeModal, showDelete, closeDeleteModal } = useContext(ModalContext)
  const { isLoading } = useContext(LoadingContext)
  const id = params.id;

  function isMobile() {
    return (window.innerWidth <= 768);
  }
  useEffect(() => {
    loadGame(id);
    document.title = `Game List - ${selectedGame.name}`
  }, [id, loadGame, selectedGame.name])

  const resetSelectedGame = useCallback(() =>
  (setSelectedGame({} as Game)), [setSelectedGame])

  return (
    <div>
      <GameContent className="container">
        <Header>
          <div>&nbsp;</div>
          <Link to="/games" onClick={resetSelectedGame}>
          <FiChevronLeft size={17} />Voltar
          </Link>
        </Header>
      <Container>
        {isLoading ? (
          isMobile() ?
            <LoaderGameMobile /> : <LoaderGame />
        ) : (
          <>
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
                  <strong>{formartStartDate(selectedGame)}</strong>
                </li>
                <li>
                  <span>Finalizado em</span>
                  <strong>{formartEndDate(selectedGame)}</strong>
                </li>
              </ul>
            </GameInfo>
            <ButtonGroup >
              <button className="btn btn-purple btn-lg" onClick={() => edit(selectedGame)}>Editar</button>
              <button className="btn btn-red btn-lg" onClick={() => remove(selectedGame.id)}>Deletar</button>
            </ButtonGroup>
          </>
        )}
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
        <DeleteModal selectedGame={selectedGame} />
      </Modal>
      </GameContent>
    </div >
  );
};

export default GameDetails;