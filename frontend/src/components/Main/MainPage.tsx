import { DeleteModal } from "../Modal/DeleteGameModal";
import { Modal } from "../Modal/Modal";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { Search } from "./Search";
import { Table } from "./Table";

export function MainPage() {
  return (
    <div>
      <div>
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
    </div>
  );
}