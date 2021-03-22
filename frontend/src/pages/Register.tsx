import { Logo } from '../components/Login/Logo';
import { useEffect } from 'react';
import { Form } from '../components/Register/Form';
import { Link } from 'react-router-dom';

export function Register() {
  useEffect(() => {
    document.title = 'Game List - Register';
  }, [])

  return (
    <div className="container mt-5">
      <Logo />
      <Form />
      <div className='links'>
        <div className='linksContent d-flex justify-content-center'>
          <Link to="/">Já possui uma conta?</Link>
        </div>
      </div>
    </div>
  );
}