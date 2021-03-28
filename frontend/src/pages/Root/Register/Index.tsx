import { useContext, useState } from 'react';
import { FiEdit2, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Input } from '../../../components/Inputs/root/Input';
import { Button } from '../../../components/Button/Index';
import { LoaderCircle } from '../../../components/Loaders/Index';
import { AuthContext } from '../../../hooks/AuthContext';
import { LoadingContext } from '../../../hooks/LoadingContext';
import { ToastContext } from '../../../hooks/ToastContext';
import { validadeForm } from '../../../utils/validate';
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";


export function RegisterForm() {
  const { signUp } = useContext(AuthContext)
  const { addToast } = useContext(ToastContext)
  const { btnIsLoading, setBtnIsLoading } = useContext(LoadingContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const history = useHistory();


  function handleUsernameChange(e: any) {
    setUsername(e.target.value)
  }
  function handlePassChange(e: any) {
    setPassword(e.target.value)
  }
  function handleEmailChange(e: any) {
    setEmail(e.target.value)
  }
  function handleNameChange(e: any) {
    setName(e.target.value)
  }

  const handleSubmit = async (e: any) => {
    setBtnIsLoading(true);
    e.preventDefault();
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
    await signUp({ name, email, username, password })
      .then(() => {
        history.push('/')
        addToast({
          type: "success",
          title: "Cadastro realizado com sucesso!",
          description: "Você já pode realizar o seu login na aplicação.",
        })
      })
      .catch(err => {
        const message = err.response.data.message ? err.response.data.message : 'Erro desconhecido';
        addToast({
          type: "error",
          title: "Erro",
          description: message,
        })
      });
    setBtnIsLoading(false);
  }


  return (
    <div className='inputs'>

      <form onSubmit={handleSubmit}>
        <div className='form-group formGroup'>
          <Input type='text' placeholder='Nome (Opcional)'
            handleChange={handleNameChange}
            icon={FiEdit2}
            value={name} required={false} />
        </div>
        <div className='form-group formGroup input-group'>
          <Input type='text' placeholder='Email (Opcional)'
            handleChange={handleEmailChange}
            icon={FiMail}
            value={email} required={false} />
        </div>
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
            <Button onClick={handleSubmit} type="large">Registrar</Button>
          }
        </div>
      </form>
    </div>
  );
}

export function RegisterFooter() {
  return (
    <div className='links'>
      <div className='d-flex justify-content-center'>
        <Link to="/"><FiArrowLeft /> &nbsp; Voltar para o login</Link>
      </div>
    </div>
  )
}