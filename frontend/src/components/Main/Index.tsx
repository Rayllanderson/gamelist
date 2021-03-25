import { MyModal as Modal } from "../Modal/Modal";
import { Footer } from "./Footer";
import { Search } from "./Search";
import { Nav } from "./nav/Index";
import { useContext } from "react";
import { GameContext } from "../../contexts/GameContext";
import CardList from "./card/Index";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from "react-router";
import { SaveGameModal } from "./modal/Index";
import { ModalContext } from "../../contexts/ModalContext";

interface RouteParams {
  status: string;
}

function Home() {
  const { handleSubmit } = useContext(GameContext);
  const {show, closeModal} = useContext(ModalContext)
  const params = useParams<RouteParams>();
  console.log('heeey')
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=0.95" />
          <title>Game List - Home</title>
        </Helmet>
      </HelmetProvider>
      <div>
        <div className="container mt-5 main-content" style={{ minHeight: '100vh' }}>
          <Nav />
          <Search />
          <CardList status={params.status} />
        </div>
        <div style={{ marginTop: '6rem' }}>&nbsp;</div>
        <Footer />
      </div>

      <Modal show={show} closeModal={closeModal}
        title='Novo jogo'
        submitEvent={handleSubmit}
        successBtnText="Salvar">
        <SaveGameModal />
      </Modal>

    </div>
  );
}

export default Home;

