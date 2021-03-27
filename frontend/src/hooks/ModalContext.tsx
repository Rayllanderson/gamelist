
import { createContext, ReactNode, useContext, useState } from 'react';
import { AlertContext } from './AlertContext';

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextData {
  showFirst: boolean;
  showSeccond: boolean;
  showFirstModal(): void;
  closeFirstModal(): void;
  showSeccondModal(): void;
  closeSeccondModal(): void
}

export const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
  const { closeAlert } = useContext(AlertContext);
  const [showFirst, setShowFirst] = useState(false);
  const [showSeccond, setShowSeccond] = useState(false);
  const showFirstModal = () => { setShowFirst(true) };
  const showSeccondModal = () => { setShowSeccond(true) };
  
  const closeFirstModal = () => {
    closeAlert();
    setShowFirst(false)
  };
  const closeSeccondModal = () => {
    closeAlert();
    setShowSeccond(false)
  };

  return (
    <ModalContext.Provider value={{
      showFirst, showSeccond, showFirstModal, closeFirstModal, showSeccondModal, closeSeccondModal
    }}>
      {children}
    </ModalContext.Provider>
  )
}

