import { Alert } from 'react-bootstrap'
import './style.css'
interface Props {
  show: boolean;
  message: string;
  close(): void;
}

export default function MyAlert(props: Props) {
  return (
    <Alert show={props.show} variant="danger" className="alert-dismissible fade show alert" transition={false}>
      <strong>
        {props.message}
      </strong>
      <button type="button" className="btn-close" onClick={props.close} aria-label="Close"></button>
    </Alert>
  );
}