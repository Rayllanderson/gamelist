
import { createContext, ReactNode, useState } from 'react';

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextData {
  show: boolean;
  showModal(): void;
  closeModal(): void
}

export const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
  const [show, setShow] = useState(false);
  const closeModal = () => { setShow(false) };
  const showModal = () => { setShow(true) };

  return (
    <ModalContext.Provider value={{
      show, showModal, closeModal,
    }}>
      {children}
    </ModalContext.Provider>
  )
}

