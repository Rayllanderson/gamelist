import { ReactNode, useContext } from "react";
import { Modal } from "react-bootstrap";
import { AlertContext } from "../../hooks/AlertContext";
import { LoadingContext } from "../../hooks/LoadingContext";
import MyAlert from "../Alert/Alert";
import { Button } from "../Button/Index";
import { LoaderCircleButton } from "../Loaders/Index";
import './modal.css'
interface Props {
  title: string;
  successBtnText: string;
  submitEvent: (e: any) => void;
  children: ReactNode;
  show: boolean;
  closeModal(): void;
}
export function MyModal(props: Props) {
  const { message, show, closeAlert } = useContext(AlertContext);
  const { btnIsLoading } = useContext(LoadingContext);
  return (
    <Modal centered show={props.show} animation={false} onHide={props.closeModal}>
      <Modal.Header>
        <Modal.Title className="modal-title">{props.title}</Modal.Title>
        <button type="button" className="btn-close" onClick={props.closeModal} aria-label="Close"></button>
      </Modal.Header>
      <Modal.Body>
        <MyAlert message={message} show={show} close={closeAlert} />
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-comment" onClick={props.closeModal}>Fechar</button>
        {btnIsLoading ?
          <LoaderCircleButton />
          :
          <Button type="modal" onClick={props.submitEvent} > {props.successBtnText} </Button>
        }
      </Modal.Footer>
    </Modal>
  );
}