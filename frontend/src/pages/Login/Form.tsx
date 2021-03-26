import { useContext, useState } from 'react';
import '../../styles/components/login.css';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastContext } from '../../contexts/ToastContext';
import { FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { Input } from '../../components/Inputs/login/Input';
import { LoadingContext } from '../../contexts/LoadingContext';
import { Button } from '../../components/Button/Index';
import { LoaderCircle } from '../../components/Loaders/Index';

export function Form() {

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
    const schema = Yup.object().shape({
      username: Yup.string().required('Username obrigatório'),
      password: Yup.string().min(1, 'Senha no mínimo 1 digito')
    })
    try {
      await schema.validate({ username, password }, {
        abortEarly: false,
      })
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro',
        description: err.message,
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
      addToast({
        type: 'error',
        title: 'Erro',
        description: err.response.data.error,
      })
    });
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