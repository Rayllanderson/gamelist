import { ForgetPasswordModal } from '../Modal/ForgetPassModalBody';
import { LoginModalBody } from '../Modal/LoginModalBody';
import { Modal } from '../Modal/Modal';
import { InputGroup } from './InputGroup';
import { LinkGroup } from './LinkGroup';
import { Logo } from './Logo';

export function Login() {
  return (
    <div className="container mt-5">
      <Logo/>
      <InputGroup/>
      <LinkGroup/>
      <Modal title="Cadastrar" id="registerModal" successBtnText="Cadastrar">
        <LoginModalBody/>
      </Modal>
      <Modal title="Esqueceu sua senha?" id="forgetPasswordModal" successBtnText="Enviar Email">
        <ForgetPasswordModal/>
      </Modal>
    </div>
  );
}