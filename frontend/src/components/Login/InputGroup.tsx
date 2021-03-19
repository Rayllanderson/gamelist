import { useContext, useState } from 'react';
import styles from '../../../styles/components/login.module.css';
import { AuthContext } from '../../contexts/AuthContext';

export function InputGroup() {

  const { signIn } = useContext(AuthContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(e) {
    setUsername(e.target.value)
  }
  function handlePassChange(e) {
    setPassword(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await signIn({ username, password });
  }

  
  return (
    <div className={styles.inputs}>
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${styles.formGroup}`}>
          <input className="form-control form-control-lg"
            onChange={handleUsernameChange} value={username} type="text" placeholder="Username" />
        </div>
        <div className={`form-group ${styles.formGroup}`}>
          <input className="form-control form-control-lg"
            onChange={handlePassChange} value={password} type="password" placeholder="Password" />
        </div>
        <div className={styles.loginButton}>
          <button type="submit"
            className="btn btn-pink btn-lg btn-block">Login</button>
        </div>
      </form>
    </div>
  );
}