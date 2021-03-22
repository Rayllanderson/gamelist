import { Logo } from '../components/Login/Logo';
import { Form } from '../components/Login/Form';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

export function Login() {
  useEffect(() => {
    document.title = 'Game List - Login';
  }, [])
  
  return (
    <div className="container container-login mt-5">
      <Logo />
      <Form />
      <div className='links'>
        <div className='d-flex justify-content-center'>
          <Link to="/register">Esqueci minha senha</Link>
        </div>
        <div className="link-register d-flex justify-content-center">
          <Link to="/register"><FiLogIn/> &nbsp; Criar Conta</Link>
        </div>
      </div>
    </div>
  );
}