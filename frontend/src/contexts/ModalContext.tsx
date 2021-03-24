
import { createContext, ReactNode, useState } from 'react';

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
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false)
  const closeModal = () => { setShow(false) };
  const showModal = () => { setShow(true) };
  const showDeleteModal = () => { setShowDelete(true) };
  const closeDeleteModal = () => { setShowDelete(false) };

  return (
    <ModalContext.Provider value={{
      show, showModal, closeModal, showDelete, showDeleteModal, closeDeleteModal
    }}>
      {children}
    </ModalContext.Provider>
  )
}

