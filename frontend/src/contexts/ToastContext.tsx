import { createContext, ReactNode, useCallback } from 'react';
import ToastContainer from '../components/ToastContainer/ToastContainer';
interface ToastProviderProps {
  children: ReactNode;
}
interface ToastContextData{
  addToast(): void;
  removeToast(): void;
}

export const ToastContext = createContext<ToastContextData> ({} as ToastContextData);

export function ToastProvider({ children }: ToastProviderProps){

  const addToast = useCallback(() => { }, []);
  const removeToast = useCallback(() => { }, []);


  return (
    <ToastContext.Provider value={{ addToast, removeToast}} >
      {children}
      <ToastContainer/>
    </ToastContext.Provider>
  )
}

