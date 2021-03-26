import { createContext, ReactNode, useState } from 'react';

interface AlertProviderProps {
  children: ReactNode;
}

interface AlertContextData {
  show: boolean;
  message: string;
  showAlert(message: string): void;
  closeAlert(): void;
}

export const AlertContext = createContext<AlertContextData>({} as AlertContextData);

export function AlertProvider({ children }: AlertProviderProps) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const closeAlert = () => { setShow(false) };
  const showAlert = (message: string) => {
    setShow(true);
    setMessage(message);
  };

  return (
    <AlertContext.Provider value={{
      show, showAlert, closeAlert, message
    }}>
      {children}
    </AlertContext.Provider>
  )
}

