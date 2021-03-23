import { DeleteModal } from "../Modal/DeleteGameModal";
import { MyModal as Modal } from "../Modal/Modal";
import { Footer } from "./Footer";
import { Search } from "./Search";
import { Table } from "./Table";
import { Nav } from "./Nav";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastContext } from "../../contexts/ToastContext";
import { GameContext } from "../../contexts/GameContext";
import { SaveGameModal } from "./SaveModal";


const MainPage = () => {
  const { signOut } = useContext(AuthContext)
  const { addToast } = useContext(ToastContext)
  const { action, handleSubmit } = useContext(GameContext)
  useEffect(() => {
    document.title = "Game List - Home"
  }, []);

  function logout() {
    signOut();
    addToast({
      type: 'info',
      title: 'Logout',
      description: "Você fez logout. Até mais!",
    })
  }

  function getTitle() {
    return action === 'post' ? 'Novo jogo' : 'Editar jogo';
  }

  return (
    <div>
      <div>
        <button onClick={logout}>Logout </button>
        <div className="container mt-5">
          <Nav />
          <Search />
          <Table />
        </div>
        <Footer />
      </div>

      <Modal id="deleteModal" title="Atenção" submitEvent={handleSubmit} successBtnText="Excluir">
        <DeleteModal gameName="Gta v" />
      </Modal>

      <Modal id="gameModal" title={getTitle()} submitEvent={handleSubmit} successBtnText="Salvar">
        <SaveGameModal />
      </Modal>
      
    </div>
  );
}

export default MainPage;

