import { ReactNode } from "react";
import { Modal } from "react-bootstrap";
import './modal.css'
interface Props {
  title: string;
  successBtnText: string;
  submitEvent: (e: any) => void;
  children: ReactNode;
  show: boolean;
  closeModal():void;
}
export function MyModal(props: Props) {
  return (
    <Modal centered show={props.show} animation={false} onHide={props.closeModal}>
      <Modal.Header>
        <Modal.Title className="modal-title">{props.title}</Modal.Title>
        <button type="button" className="btn-close" onClick={props.closeModal} aria-label="Close"></button>
      </Modal.Header>
      <Modal.Body>
       {props.children}
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-comment" onClick={props.closeModal}>Fechar</button>
        <button type="button" className="btn btn-pink" onClick={props.submitEvent}>  {props.successBtnText}</button>
      </Modal.Footer>
    </Modal>
  );
}