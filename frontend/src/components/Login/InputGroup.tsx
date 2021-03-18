import { useContext } from 'react';
import styles from '../../../styles/components/login.module.css';
import { LoginContext } from '../../contexts/LoginContext';
import { login } from '../../services/login_service';
import { LoginInputs } from '../../types/types';

export function InputGroup() {

  const { username, password, handleUsernameChange, handlePassChange, handleSubmit} = useContext(LoginContext);
  
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