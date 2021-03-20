import { useContext, useState } from 'react';
import '../../styles/components/login.css';
import { AuthContext } from '../../contexts/AuthContext';
import { FiLock, FiUser } from 'react-icons/fi';
import { Icon } from './Icon';
import { Input } from './Input';

export function InputGroup() {

  const { signIn } = useContext(AuthContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(e: any) {
    setUsername(e.target.value)
  }
  function handlePassChange(e: any) {
    setPassword(e.target.value)
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    await signIn({ username, password }).catch(err => alert(err.response.data.error));
  }


  return (
    <div className='inputs'>

      <form onSubmit={handleSubmit}>
        <div className='form-group formGroup'>
          <Input type='text' placeholder='Username'
            handleChange={handleUsernameChange}
            icon={FiUser}
            value={username} />
        </div>
        <div className='form-group formGroup'>
          <Input type='password' placeholder='Password'
            handleChange={handlePassChange}
            icon={FiLock}
            value={password} />
        </div>
        <div className='loginButton'>
          <button type="submit"
            className="btn btn-pink btn-lg btn-block">Login</button>
        </div>
      </form>
    </div>
  );
}