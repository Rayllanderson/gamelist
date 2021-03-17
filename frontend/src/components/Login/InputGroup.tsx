import styles from '../../../styles/components/login.module.css';
import { LoginInput } from './LoginInput';

export function InputGroup() {
  return (
    <div className={styles.inputs}>
      <LoginInput type="text" placeholder="Username" />
      <LoginInput type="password" placeholder="Password" />
    </div>
  );
}