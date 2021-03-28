import { useContext, useState } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { LoaderCircle } from '../../../components/Loaders/Index';
import { AuthContext } from '../../../hooks/AuthContext';
import { LoadingContext } from '../../../hooks/LoadingContext';
import { ToastContext, ToastMessage } from '../../../hooks/ToastContext';
import { validadeForm } from '../../../utils/validate';
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Input } from '../../../components/Inputs/root/Input';
import { Button } from '../../../components/Button/Index';

export function LoginForm() {

  const { signIn } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { btnIsLoading, setBtnIsLoading } = useContext(LoadingContext);


  function handleUsernameChange(e: any) {
    setUsername(e.target.value)
  }
  function handlePassChange(e: any) {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setBtnIsLoading(true);
    try {
      validadeForm(username, password);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro',
        description: err,
      })
      setBtnIsLoading(false);
      return;
    };
    await signIn({ username, password }).then(() => {
      addToast({
        type: 'success',
        title: 'Bem vindo!',
        description: "Login realizado com sucesso!",
      })
    }
    ).catch(err => {
      let message = '';
      let type = 'error' as ToastMessage['type'];
      if (err.response) {
        message = err.response.data.message ? err.response.data.message : 'Erro desconhecido';
      } else {
        type = 'info';
        message = 'Servidor está dormindo, mas já estamos acordando ele. Tente de novo em alguns segundos.'
      };
      addToast({
        type: type || 'error',
        title: 'Erro',
        description: message,
      })
    })
    setBtnIsLoading(false);
  }

  return (
    <div className='inputs'>
      <div className='form-group formGroup'>
        <Input type='text' placeholder='Username'
          handleChange={handleUsernameChange}
          icon={FiUser}
          value={username} required={true} />
      </div>
      <div className='form-group formGroup'>
        <Input type='password' placeholder='Password'
          handleChange={handlePassChange}
          icon={FiLock}
          value={password} required={true} />
      </div>
      <div className='loginButton d-grid gap-2'>
        {btnIsLoading ?
          <Button disabled type="large"><LoaderCircle /></Button>
          :
          <Button onClick={handleSubmit} type="large">Login</Button>
        }
      </div>
    </div>
  );
}

export function LoginFooter() {
  return (
    <div className='links'>
      <div className='d-flex justify-content-center'>
        <Link to="/forget-password">Esqueci minha senha</Link>
      </div>
      <div className="link-register d-flex justify-content-center">
        <Link to="/register"><FiLogIn /> &nbsp; Criar Conta</Link>
      </div>
    </div>
  )
}