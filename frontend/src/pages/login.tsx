import { Logo } from '../components/Login/Logo';
import { InputGroup } from '../components/Login/InputGroup';
import { LinkGroup } from '../components/Login/LinkGroup';
import { Modal } from '../components/Modal/Modal';
import { LoginModalBody } from '../components/Modal/LoginModalBody';
import { ForgetPasswordModal } from '../components/Modal/ForgetPassModalBody';
import { useEffect } from 'react';

export function Login() {
  useEffect(() => {
    document.title = 'Game List - Login';
  }, [])
  
  return (
    <div className="container mt-5">
      <Logo />
      <InputGroup />
      <LinkGroup />
      <Modal title="Cadastrar" id="registerModal" successBtnText="Cadastrar">
        <LoginModalBody />
      </Modal>
      <Modal title="Esqueceu sua senha?" id="forgetPasswordModal" successBtnText="Enviar Email">
        <ForgetPasswordModal />
      </Modal>
    </div>
  );
}