import { ReactNode, useContext } from "react";
import { Modal } from "react-bootstrap";
import { ModalContext } from "../../contexts/ModalContext";
import './modal.css'
interface Props {
  title: string;
  successBtnText: string;
  submitEvent: (e: any) => void;
  children: ReactNode;
}
export function MyModal(props: Props) {

  const { show, closeModal } = useContext(ModalContext)

  return (
    <Modal  centered show={show} animation={false} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title className="modal-title">{props.title}</Modal.Title>
        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
      </Modal.Header>
      <Modal.Body>
       {props.children}
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-comment"onClick={closeModal}>Fechar</button>
        <button type="submit" className="btn btn-pink" onClick={props.submitEvent}>  {props.successBtnText}</button>
      </Modal.Footer>
    </Modal>
  );
}