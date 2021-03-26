import Header from "../../components/Header/Index";
import { Container, AccountContent, ButtonGroup } from "./style";
import { FcLandscape } from "react-icons/fc";
import { Chart } from '../../components/Chart/Index'
import './style.css'
import { useCallback, useContext, useState } from "react";
import api from "../../services/api";
import { ToastContext } from "../../hooks/ToastContext";
import { MyModal } from "../../components/Modal/Modal";
import { UpdateDataModal } from "./Modals";
import { ModalContext } from "../../hooks/ModalContext";
import { GameContext } from "../../hooks/GameContext";

export default function Account() {
  const { show, closeModal, showModal } = useContext(ModalContext);
  const { games } = useContext(GameContext);
  const { addToast } = useContext(ToastContext);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback(async () => {
    api.put('/update', {}) //todo: criar user controller...
  }, [])

  function handleNameChange(e: any) {
    setName(e.target.value);
  }
  function handleUsernameChange(e: any) {
    setUsername(e.target.value);
  }
  function handleEmailChange(e: any) {
    setEmail(e.target.value);
  }

  function editData() {
    showModal();
  }

  const user = JSON.parse(localStorage.getItem('@GameList:user') || '');
  const userName = user.name ? user.name : 'Convidado';
  /*
  const containsGames = !(games.length === 0);
        {containsGames ? (
            <div className="stats">
              <strong className="d-flex justify-content-center">Estatísticas breves</strong>
              <div className="chart d-flex justify-content-center">
                <Chart />
              </div>
            </div>
          ) : null}
  */
  return (
    <div>
      <Container className="container">
        <Header />
        <AccountContent >
          <div className="d-flex justify-content-center">
            <div className="image">
              <FcLandscape size={76} />
            </div>
          </div>
          <div className="user-infos mt-2">
            <strong className="name">{userName}</strong>
            <p className="email">useremail@email.com</p>
          </div>
          <ButtonGroup>
            <button className="btn btn-comment" onClick={editData}>Editar dados</button>
            <button className="btn btn-red" onClick={() => (null)}>Trocar senha</button>
          </ButtonGroup>
          <div className="mb-3"></div>
        </AccountContent>

        <MyModal show={show} submitEvent={handleSubmit}
          successBtnText="Editar"
          title="Editar dados"
          closeModal={closeModal}>
          <UpdateDataModal handleUsernameChange={handleUsernameChange}
            handleEmailChange={handleEmailChange} handleNameChange={handleNameChange}
            name={name} email={email} username={username} />
        </MyModal>
      </Container>
    </div>
  )
}