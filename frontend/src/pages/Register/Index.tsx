import { Logo } from '../Login/Logo';
import { useEffect } from 'react';
import { Form } from './Form';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export function Register() {
  useEffect(() => {
    document.title = 'Game List - Register';
  }, [])

  return (
    <div>
      <div className="container container-register mt-5">
        <Logo />
        <Form />
        <div className='links'>
          <div className='d-flex justify-content-center'>
            <Link to="/"><FiArrowLeft /> &nbsp; Voltar para o login</Link>
          </div>
        </div>
      </div>
    </div>

  );
}