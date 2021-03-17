
import styles from '../../../styles/components/login.module.css';
import { Button } from './Button';
import { InputGroup } from './InputGroup';
import { LinkGroup } from './LinkGroup';
import { Logo } from './Logo';

export function Login() {
  return (
    <div className="container mt-5">
      <Logo/>
      <InputGroup/>
      <Button>Login</Button>
      <LinkGroup/>
    </div>
  );
}