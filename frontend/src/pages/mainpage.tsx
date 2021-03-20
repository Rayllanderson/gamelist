import { DeleteModal } from "../components/Modal/DeleteGameModal";
import { Modal } from "../components/Modal/Modal";
import { RegisterGameModal } from "../components/Modal/RegisterGameModal";
import { Footer } from "../components/Main/Footer";
import { Search } from "../components/Main/Search";
import { Table } from "../components/Main/Table";
import { Nav } from "../components/Main/Nav";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


const MainPage = () => {
  const {signOut} = useContext(AuthContext)
  return (
    <div>
      <div>
        <button onClick={signOut}>Logout </button>
        <div className="container mt-5">
          <Nav />
          <Search />
          <Table />
        </div>
        <Footer />
      </div>

      <Modal id="deleteModal" title="Atenção" successBtnText="Excluir">
        <DeleteModal gameName="Gta v" />
      </Modal>


      <Modal id="gameModal" title="Novo Jogo" successBtnText="Salvar">
        <RegisterGameModal />
      </Modal>
    </div>
  );
}

export default MainPage;

