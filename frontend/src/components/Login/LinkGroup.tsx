import styles from '../../../styles/components/login.module.css';
import { Link } from './Link';

export function LinkGroup(){
  return (
    <div className={styles.links}>
      <div className={`${styles.linksContent} d-flex justify-content-between`}>
        <Link target="registerModal">Cadastrar</Link>
        <Link target="forgetPasswordModal">Esqueceu a senha?</Link>
      </div>
    </div>
  )
} 