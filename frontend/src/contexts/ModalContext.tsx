
import { createContext, ReactNode, useContext, useState } from 'react';
import { AlertContext } from './AlertContext';

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextData {
  show: boolean;
  showDelete: boolean;
  showModal(): void;
  closeModal(): void;
  showDeleteModal(): void;
  closeDeleteModal(): void
}

export const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
  const { closeAlert } = useContext(AlertContext)
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false)
  const showModal = () => { setShow(true) };
  const showDeleteModal = () => { setShowDelete(true) };
  const closeModal = () => {
    closeAlert();
    setShow(false)
  };
  const closeDeleteModal = () => {
    closeAlert();
    setShowDelete(false)
  };

  return (
    <ModalContext.Provider value={{
      show, showModal, closeModal, showDelete, showDeleteModal, closeDeleteModal
    }}>
      {children}
    </ModalContext.Provider>
  )
}

