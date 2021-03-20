import { Link } from './Link';
import '../../styles/components/login.css';

export function LinkGroup(){
  return (
    <div className='links'>
      <div className='linksContent d-flex justify-content-between'>
        <Link target="registerModal">Cadastrar</Link>
        <Link target="forgetPasswordModal">Esqueceu a senha?</Link>
      </div>
    </div>
  )
} 