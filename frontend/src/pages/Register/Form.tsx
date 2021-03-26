import { useContext, useState } from 'react';
import '../../styles/components/login.css';
import { AuthContext } from '../../contexts/AuthContext';
import { FiEdit2, FiLock, FiMail, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { ToastContext } from '../../contexts/ToastContext';
import { Input } from '../../components/Inputs/login/Input';
import { LoadingContext } from '../../contexts/LoadingContext';
import { Button } from '../../components/Button/Index';
import { LoaderCircle } from '../../components/Loaders/Index';


export function Form() {
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
    const schema = Yup.object().shape({
      username: Yup.string().required('Username obrigatório'),
      password: Yup.string().min(1, 'Senha no mínimo 1 digito')
    })
    try {
      await schema.validate({ username, password }, {
        abortEarly: false,
      })
    } catch (err) {
      console.log(err)
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
        addToast({
          type: "error",
          title: "Erro",
          description: err.response.data.message,
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