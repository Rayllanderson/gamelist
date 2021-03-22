import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from "react-icons/fi";
import { ToastContext, ToastMessage } from "../../contexts/ToastContext";
import { useContext, useEffect } from 'react';

interface Props {
  type?: string;
  message: ToastMessage;
}
export default function Toast({ message }: Props) {
  const { removeToast } = useContext(ToastContext);
  let background = '#ebf8ff';
  let color = '#3172b7';
  const icons = {
    info: <FiInfo size={20}/>,
    success: < FiCheckCircle size={20}/>,
    error: <FiAlertCircle size={20}/>,
  }
  switch (message.type) {
    case 'success':
      background = '#e6fffa';
      color = '#2e656a';
      break;
    case 'error':
      background = '#fddede';
      color = '#c53030';
      break;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 3500)
    return () => {
      clearTimeout(timer)
    };
  }, [removeToast, message.id])

  return (
    <div className="toast-element toast-right" style={{ background: background, color: color }}>
      {icons[message.type || 'info']}
      <div>
        <strong> {message.title} </strong>
        <p>{message.description}</p>
      </div>
      <button onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </div>
  )
}