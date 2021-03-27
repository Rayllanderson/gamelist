import Header from "../../components/Header/Index";
import { Container, AccountContent, ButtonGroup } from "./style";
import { FcLandscape } from "react-icons/fc";
import './style.css'
import { useCallback, useContext, useState } from "react";
import { ToastContext } from "../../hooks/ToastContext";
import { MyModal } from "../../components/Modal/Modal";
import { ChangePasswordModal, UpdateDataModal } from "./Modals";
import { ModalContext } from "../../hooks/ModalContext";
import UserController from "../../services/user-controller";
import { AlertContext } from "../../hooks/AlertContext";

export default function Account() {
  const { showFirst, closeFirstModal, showFirstModal, showSeccond, 
  closeSeccondModal, showSeccondModal } = useContext(ModalContext);
  // const { games } = useContext(GameContext);
  const { addToast } = useContext(ToastContext);
  const { showAlert } = useContext(AlertContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateUserData = useCallback(() => {
    const api = new UserController();
    api.getUserDetails()
      .then(response => {
        localStorage.setItem('@GameList:user',
        JSON.stringify(response.data))
      })
  }, [])

  const handleSubmit = useCallback(async () => {
    const api = new UserController();
    await api.put('update', {
      name: name,
      email: email
    }).then(() => {
      addToast({
        type: 'success',
        title: 'Feito!',
        description: "Seus dados foram atualizados!",
      })
      closeFirstModal();
      updateUserData();
    }).catch(err =>
      showAlert(err.response.data.message)
    )
  }, [addToast, closeFirstModal, email, name, showAlert, updateUserData])
  
  const handlePassSubmit = useCallback(async () => {
    const api = new UserController();
    await api.updatePassword(password).then(() => {
      addToast({
        type: 'success',
        title: 'Feito!',
        description: "Sua senha foi atualizada!",
      })
      closeSeccondModal();
    }).catch(err =>
      showAlert(err.response.data.message)
    )
  }, [addToast, closeSeccondModal, password, showAlert])


  function handleNameChange(e: any) {
    setName(e.target.value);
  }
  function handleEmailChange(e: any) {
    setEmail(e.target.value);
  }
  function handlePassChange(e: any) {
    setPassword(e.target.value);
  }

  const user = JSON.parse(localStorage.getItem('@GameList:user') || '');
  const userName = user.name ? user.name : 'Convidado';
  const userEmail = user.email;

  function editData() {
    showFirstModal();
    setName(user.name);
    setEmail(user.email);
  }

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
            <p className="email">{userEmail}</p>
          </div>
          <ButtonGroup>
            <button className="btn btn-comment" onClick={editData}>Editar dados</button>
            <button className="btn btn-red" onClick={showSeccondModal}>Trocar senha</button>
          </ButtonGroup>
          <div className="mb-3"></div>
        </AccountContent>

        <MyModal show={showFirst} submitEvent={handleSubmit}
          successBtnText="Editar"
          title="Editar dados"
          closeModal={closeFirstModal}>
          <UpdateDataModal
            handleEmailChange={handleEmailChange} handleNameChange={handleNameChange}
            name={name} email={email} />
        </MyModal>

        <MyModal show={showSeccond} submitEvent={handlePassSubmit}
          successBtnText="Alterar"
          title="Alterar Senha"
          closeModal={closeSeccondModal}>
          <ChangePasswordModal password={password} handlePassChange={handlePassChange} />
        </MyModal>

      </Container>
    </div>
  )
}