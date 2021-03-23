import { DeleteModal } from "../Modal/DeleteGameModal";
import { MyModal as Modal } from "../Modal/Modal";
import { Footer } from "./Footer";
import { Search } from "./Search";
import { Nav } from "./nav/Index";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastContext } from "../../contexts/ToastContext";
import { GameContext } from "../../contexts/GameContext";
import { SaveGameModal } from "./SaveModal";
import CardList from "./card/CardList";
import { Helmet} from 'react-helmet';
interface ViewPortData extends Element{
  element: Element;
}

const MainPage = () => {
  const { signOut } = useContext(AuthContext)
  const { addToast } = useContext(ToastContext)
  const { action, handleSubmit } = useContext(GameContext)

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
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=0.95" />
        <title>Game List - Home"</title>
      </Helmet>
      <div>
        <button onClick={logout}>Logout </button>
        <div className="container mt-5" style={{minHeight: '100vh'}}>
          <Nav />
          <Search />
        {/*  <Table/> */ }
          <CardList/>
        </div>
        <div style={{marginTop: '5rem'}}>&nbsp;</div>
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

