import { MyModal as Modal } from "../Modal/Modal";
import { Footer } from "./Footer";
import { Search } from "./Search";
import { Nav } from "./nav/Index";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastContext } from "../../contexts/ToastContext";
import { GameContext } from "../../contexts/GameContext";
import CardList from "./card/Index";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from "react-router";
import { SaveGameModal } from "./modal/Index";

interface RouteParams {
  status: string;
}

function Home() {
  const { signOut } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const { handleSubmit } = useContext(GameContext);
  const params = useParams<RouteParams>();
  function logout() {
    signOut();
    addToast({
      type: 'info',
      title: 'Logout',
      description: "Você fez logout. Até mais!",
    })
  }
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=0.95" />
          <title>Game List - Home</title>
        </Helmet>
      </HelmetProvider>
      <div>
        <button onClick={logout}>Logout </button>
        <div className="container mt-5 main-content" style={{ minHeight: '100vh' }}>
          <Nav />
          <Search />
          <CardList status={params.status} />
        </div>
        <div style={{ marginTop: '5rem' }}>&nbsp;</div>
        <Footer />
      </div>

      <Modal
        title='Novo jogo'
        submitEvent={handleSubmit}
        successBtnText="Salvar">
        <SaveGameModal />
      </Modal>

    </div>
  );
}

export default Home;

