import Form from './Form';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Logo } from '../Login/Logo';

export default function ResetPassword() {
  return (
    <div className="container container-login mt-5">
      <Logo />
      <Form />
      <div className='links'>
        <div className='d-flex justify-content-center'>
          <Link to="/"><FiArrowLeft /> &nbsp; Voltar para o login</Link>
        </div>
      </div>
    </div>
  );
}