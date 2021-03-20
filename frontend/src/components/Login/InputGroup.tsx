import { useContext, useState } from 'react';
import '../../styles/components/login.css';
import { AuthContext } from '../../contexts/AuthContext';

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

  async function handleSubmit(e:any) {
    e.preventDefault();
    await signIn({ username, password }).catch(err => alert(err.response.data.error));
  }

  
  return (
    <div className='inputs'>
      <form onSubmit={handleSubmit}>
        <div className='form-group formGroup'>
          <input className="form-control form-control-lg"
            onChange={handleUsernameChange} value={username} type="text" placeholder="Username" />
        </div>
        <div className='form-group formGroup'>
          <input className="form-control form-control-lg"
            onChange={handlePassChange} value={password} type="password" placeholder="Password" />
        </div>
        <div className='loginButton'>
          <button type="submit"
            className="btn btn-pink btn-lg btn-block">Login</button>
        </div>
      </form>
    </div>
  );
}