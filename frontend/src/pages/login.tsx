import { Logo } from '../components/Login/Logo';
import { Form } from '../components/Login/Form';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Login() {
  useEffect(() => {
    document.title = 'Game List - Login';
  }, [])
  
  return (
    <div className="container mt-5">
      <Logo />
      <Form />
      <div className='links'>
        <div className='linksContent d-flex justify-content-between'>
          <Link to="/register">Cadastrar</Link>
          <Link to="/register">Esqueceu sua senha?</Link>
        </div>
      </div>
    </div>
  );
}