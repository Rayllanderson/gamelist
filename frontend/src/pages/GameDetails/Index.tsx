import { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Index";
import { LoaderGame, LoaderGameMobile } from "../../components/Loaders/Index";
import { MyModal as Modal } from "../../components/Modal/Modal";
import { Game, GameContext } from "../../hooks/GameContext";
import { LoadingContext } from "../../hooks/LoadingContext";
import { ModalContext } from "../../hooks/ModalContext";
import { formartEndDate, formartStartDate } from "../../utils/format-data";
import { DeleteModal } from "./DeleteModal";
import EditModal from "./EditModal";
import { ButtonGroup, Container, GameContent, GameInfo } from "./style";
interface RouteParams {
  id: string
}

function GameDetails() {
  const params = useParams<RouteParams>();
  const { edit, handleSubmit, selectedGame, loadGame, remove, handleDeleteSubmit, setSelectedGame } = useContext(GameContext);
  const { showFirst, closeFirstModal: closeModal, showSeccond: showDelete, closeSeccondModal: closeDeleteModal } = useContext(ModalContext)
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

  const hasFoundGame = !(Object.keys(selectedGame).length === 0 && selectedGame.constructor === Object);
  console.log(hasFoundGame)
  return (
    <div>
      <GameContent className="container">
        <Header onClick={resetSelectedGame} />
        <Container>
          {isLoading ? (
            isMobile() ?
              <LoaderGameMobile /> : <LoaderGame />
          ) : (
            hasFoundGame ? (
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
            ) : <div className="text-white text-center" style={{fontSize: 18}}> Nenhum jogo encontrado</div>
          )}
        </Container>

        <Modal
          show={showFirst} closeModal={closeModal}
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